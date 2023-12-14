
export interface CaptionItem {
    title: string,
    dataset: string,
    image_src: string[],
    image_id: number,
    captions_en: string[],
    captions_zh: string[],
    isZh: boolean | null,
    caption_filename: string,
}

export interface User {
    username: string,
    password: string,
}

// 统计信息
export interface StatInfo {
    // 综合统计信息
    labeled_num: number,            // 已标注数
    last_week_labeled_num: number,  // 上周标注数
    total_to_label_num: number,     // 所有标注的数量
    user_num: number,               // 用户数量

    // 每个用户的统计信息
    user_stat: {
        [username: string]: {
            labeled_num: number,
            last_week_labeled_num: number,
        }
    }
}