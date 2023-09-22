/**
 * @brief 导出新标注的数据集
 * @response 无
 * @request { exportPath: string }
 */

import fs from 'fs';
import { NextResponse } from 'next/server';

export async function POST(
    req: Request,
) {
    try {
        const { exportPath } = await req.json();

        const users = fs.readdirSync('public/data');
        const newCaptionsData = [];

        // 整合所有 user 的 new 目录下的 json 文件并导出
        for (const user of users) {
            if (user == 'server')
                continue;
            if (!fs.existsSync(`public/data/${user}/captions/new`))
                continue;

            const newCaptions = fs.readdirSync(`public/data/${user}/captions/new`);
            for (const newCaption of newCaptions) {
                const data = fs.readFileSync(`public/data/${user}/captions/new/${newCaption}`);
                newCaptionsData.push(JSON.parse(data.toString()));
            }
        }

        // 导出到 exportPath
        if (!fs.existsSync(exportPath)) {
            fs.mkdirSync(exportPath, { recursive: true });
        }
        // 以当前时间命名
        const date = new Date();
        const filename = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}-${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}`;
        fs.writeFileSync(`${exportPath}/${filename}.json`, JSON.stringify(newCaptionsData));

        return new NextResponse('OK', { status: 200 });
        
    } catch (err: any) {
        console.log(err);
        return new NextResponse('Internal Error', { status: 500 });
    }
}