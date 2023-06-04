
import fs from 'fs';
import { CaptionItem } from '@/types';
import { NextResponse } from 'next/server';

export async function POST(
    req: Request,
) {
    try {
        const data = fs.readFileSync('public/data/server/captions/airplane_raw.json', 'utf8')
        const captions = await JSON.parse(data);

        const itemList: CaptionItem[] = [];
        for (const caption of captions) {
            itemList.push({
                title: caption['filename'],
                image_id: caption['imgid'],
                image_src: '/data/server/NWPU-RESISC45/airplane/' + caption['filename'],
                caption_en: caption['sentences'],
                caption_zh: caption['sentences'],
            })
        }
        console.log('ok')
        return NextResponse.json({ itemList: itemList });
    } catch (err: any) {
        console.log(err);
        return new NextResponse('Internal Error', { status: 500 });
    }
}