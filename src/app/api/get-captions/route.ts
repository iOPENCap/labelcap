
import fs from 'fs';
import { CaptionItem } from '@/types';
import { NextResponse } from 'next/server';

export async function POST(
    req: Request,
) {
    try {
        const { user } = await req.json();

        const data = fs.readFileSync(`public/data/${user}/captions/raw.json`, 'utf8')
        const captions = await JSON.parse(data);

        const itemList: CaptionItem[] = [];
        for (const caption of captions) {
            const category = caption['filename'].substring(0, caption['filename'].lastIndexOf('_'));

            itemList.push({
                title: caption['filename'],
                image_id: caption['imgid'],
                image_src: `/data/server/NWPU-RESISC45/${category}/${caption['filename']}`,
                caption_en: caption['caption_en'],
                caption_zh: caption['caption_zh'],
                // raw_captions: caption['raw_captions'],
            })
        }
        return NextResponse.json({ itemList: itemList });
    } catch (err: any) {
        console.log(err);
        return new NextResponse('Internal Error', { status: 500 });
    }
}