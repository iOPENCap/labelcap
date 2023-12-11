import { CaptionItem } from '@/types';
import fs from 'fs';
import { NextResponse } from 'next/server';

export async function POST(
    req: Request,
) {
    try {
        const { user } = await req.json();

        const directoryPath = `public/data/${user}/captions/new`;
        const files = fs.readdirSync(directoryPath);

        const itemList: CaptionItem[] = [];
        for (const file of files) {
            const data = fs.readFileSync(`${directoryPath}/${file}`, 'utf8')
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