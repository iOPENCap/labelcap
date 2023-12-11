
import fs from 'fs';
import { CaptionItem } from '@/types';
import { NextResponse } from 'next/server';

export async function POST(
    req: Request,
) {
    try {
        const { user } = await req.json();

        // Get the first 20 captions from `public/data/${user}/captions/origin`
        const filesDir = `public/data/${user}/captions/origin`;
        const topFiles = fs.readdirSync(filesDir).slice(0, 20);

        // Read the captions
        const itemList: CaptionItem[] = [];
        for (const file of topFiles) {
            const data = fs.readFileSync(`${filesDir}/${file}`, 'utf8');
            const caption = await JSON.parse(data);

            itemList.push({
                caption_filename: file,
                title: caption['title'],
                dataset: caption['dataset'],
                image_id: caption['imgid'],
                image_src: caption['filepath'],
                captions_en: caption['caption_en'],
                captions_zh: caption['caption_zh'],
                isZh: null,
            })
        }
        
        return NextResponse.json({ itemList: itemList });
    } catch (err: any) {
        console.log(err);
        return new NextResponse('Internal Error', { status: 500 });
    }
}