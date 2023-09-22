import { CaptionItem } from '@/types';
import fs from 'fs';
import { NextResponse } from 'next/server';

export async function POST(
    req: Request,
) {

    try {
        const { captionItem, user } = await req.json();
        
        // 将新caption写入到new文件夹中
        const newCaption = {
            'filename': captionItem.title,
            'imgid': captionItem.image_id,
            'caption_en': captionItem.caption_en,
            'caption_zh': captionItem.caption_zh,
            'image_src': captionItem.image_src,
            'legal': captionItem.isZh? 'zh': 'en',
        }

        if (!fs.existsSync(`public/data/${user}/captions/new`)) {
            fs.mkdirSync(`public/data/${user}/captions/new`, { recursive: true });
        }
        fs.writeFileSync(`public/data/${user}/captions/new/${captionItem.title}.json`, JSON.stringify(newCaption));

        // 在origin中删除该caption
        fs.unlinkSync(`public/data/${user}/captions/origin/${captionItem.title}.json`);

    } catch (err: any) {
        console.log(err);
        return new NextResponse('Internal Error', { status: 500 });
    }

}