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

        // 在raw中删除该caption
        const raw = fs.readFileSync(`public/data/${user}/captions/raw.json`, 'utf8')
        const raw_captions = await JSON.parse(raw);
        const new_raw_captions = raw_captions.filter((caption: any) => caption['filename'] !== captionItem.title);
        fs.writeFileSync(`public/data/${user}/captions/raw.json`, JSON.stringify(new_raw_captions));

    } catch (err: any) {
        console.log(err);
        return new NextResponse('Internal Error', { status: 500 });
    }

}