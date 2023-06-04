import { CaptionItem } from '@/types';
import fs from 'fs';
import { NextResponse } from 'next/server';

export async function POST(
    req: Request,
) {

    try {
        const { captionItem, user } = await req.json();
        
        // write new caption to file
        const newCaption = {
            'filename': captionItem.title,
            'imgid': captionItem.image_id,
            'sentences': captionItem.caption_en,
        }

        if (!fs.existsSync(`public/data/${user}/captions`)) {
            fs.mkdirSync(`public/data/${user}/captions`, { recursive: true });
        }
        fs.writeFileSync(`public/data/${user}/captions/${captionItem.title}.json`, JSON.stringify(newCaption));

    } catch (err: any) {
        console.log(err);
        return new NextResponse('Internal Error', { status: 500 });
    }

}