
export interface CaptionItem {
    title: string,
    image_src: string,
    image_id: number,
    caption_en: string[],
    caption_zh: string[],
    // raw_captions: string[],
}

export interface User {
    username: string,
    password: string,
}

// 统计信息
export interface StatInfo {
    // 综合统计信息
    labeled_num: number,
    last_week_labeled_num: number,

    // 每个用户的统计信息
    user_stat: {
        [username: string]: {
            labeled_num: number,
            last_week_labeled_num: number,
        }
    }
}