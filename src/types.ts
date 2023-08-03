
export interface CaptionItem {
    title: string,
    image_src: string,
    image_id: number,
    caption_en: string[],
    caption_zh: string[],
    raw_captions: string[],
}

export interface User {
    username: string,
    password: string,
}