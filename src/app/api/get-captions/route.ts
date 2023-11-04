
import fs from 'fs';
import { CaptionItem } from '@/types';
import { NextResponse } from 'next/server';

export async function POST(
    req: Request,
) {
    try {
        const { user } = await req.json();

        // Get the first 20 captions from `public/data/${user}/captions/origin`
        const captionsDir = `public/data/${user}/captions/origin`;
        const topCaptions = fs.readdirSync(captionsDir).slice(0, 20);

        // Read the captions
        const data: string[] = [];
        for (const caption of topCaptions) {
            data.push(fs.readFileSync(`${captionsDir}/${caption}`, 'utf8'));
        }
        const captions = await JSON.parse(`[${data}]`);

        const itemList: CaptionItem[] = [];
        for (const caption of captions) {
            itemList.push({
                title: caption['title'],
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