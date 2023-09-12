/**
 * @brief   获取所有用户的统计信息
 * @response   { statInfo: StatInfo }
 */

import { StatInfo } from '@/types';
import fs from 'fs';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const statInfo: StatInfo = {
            labeled_num: 0,
            last_week_labeled_num: 0,
            user_stat: {},
        }
        const users: string[] = fs.readdirSync('public/data');

        // public/data/ 目录下，除了server目录，
        // 其他的目录都是用户目录
        for (const user of users) {
            // 跳过server目录
            if (user === 'server') {
                continue;
            }
            // 跳过非目录
            if (!fs.statSync(`public/data/${user}`).isDirectory()) {
                continue;
            }

            let files: string[] = [];
            if (fs.existsSync(`public/data/${user}/captions/new`)) {
                files = fs.readdirSync(`public/data/${user}/captions/new`);
            }

            // 总标注数量
            const total_num = files.length;

            // 过去一周的标注数量
            let last_week_num = 0;
            for (const file of files) {
                const stat = fs.statSync(`public/data/${user}/captions/new/${file}`);
                const mtime = new Date(stat.mtime);
                const now = new Date();
                const diff = now.getTime() - mtime.getTime();
                const diff_days = diff / (1000 * 3600 * 24);
                if (diff_days <= 7) {
                    last_week_num++;
                }
            }

            // 更新统计信息
            statInfo.labeled_num += total_num;
            statInfo.last_week_labeled_num += last_week_num;
            statInfo.user_stat[user] = {
                labeled_num: total_num,
                last_week_labeled_num: last_week_num,
            }
        }

        return NextResponse.json({ statInfo: statInfo });
    } catch (err: any) {
        console.log(err);
        return new NextResponse('Internal Error', { status: 500 });
    }
}