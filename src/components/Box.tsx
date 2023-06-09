"use client";

import Image from "next/image";
import Textarea from "@/components/Textarea";
import { twMerge } from "tailwind-merge";
import { useState } from "react";
import { CaptionItem } from "@/types";

interface BoxProps {
    id: number,
    className?: string,
    image_src: string,
    title: string,
    category: string,
    image_id: number,
    caption_en: string[],
    caption_zh: string[],
    onSubmit: (captionItem: CaptionItem) => Promise<void>,
}

const Box: React.FC<BoxProps> = ({
    id,
    className,
    image_src,
    title,
    category,
    image_id,
    caption_en,
    caption_zh,
    onSubmit,
}) => {
    const [caption_en_value, setCaption_en_value] = useState(caption_en);
    const [caption_zh_value, setCaption_zh_value] = useState(caption_zh);

    return (
        // TODO: 添加卡片关闭动画
        <div className={twMerge('w-full flex-col flex items-start rounded-md border p-4 hover:bg-slate-100 shadow-md hover:shadow-lg',
            className)}>
            <div className="flex flex-row mt-6 ">
                <Image className="hover:brightness-110" src={image_src}
                    alt="commercial_area_001.jpg" width={300} height={300} />
                <div className="pl-8 flex flex-col">
                    <h1 className="text-xl font-bold mb-2">{title}</h1>
                    <p>Image ID: {image_id}</p>
                    <p>Category: {category}</p>
                </div>

            </div>

            <div className="flex w-full md:flex-row md:space-x-8 mt-6
            flex-col space-y-8 md:space-y-0">
                <div className="flex-col w-full space-y-4">
                    <h1 className="text-xl font-bold">English</h1>
                    {caption_en.map((item, index) => (
                        <textarea
                            className="p-4 border border-gray-300 rounded-md md:h-auto h-32 w-full"
                            key={index}
                            value={caption_en_value[index]}
                            onChange={(event) => {
                                const newCaption_en = [...caption_en_value];
                                newCaption_en[index] = (event.target as HTMLTextAreaElement).value;
                                setCaption_en_value(newCaption_en);
                            }} />
                    ))}
                </div>

                <div className="flex-col w-full space-y-4">
                    <h1 className="text-xl font-bold">Chinese</h1>
                    {caption_zh.map((item, index) => (

                        <textarea
                            className="p-4 border border-gray-300 rounded-md md:h-auto h-32 w-full"
                            key={index}
                            value={caption_zh_value[index]}
                            onChange={(event) => {
                                const newCaption_zh = [...caption_zh_value];
                                newCaption_zh[index] = (event.target as HTMLTextAreaElement).value;
                                setCaption_zh_value(newCaption_zh);
                            }} />
                    ))}
                </div>
            </div>

            <div className="flex justify-end w-full mt-4 pr-4">
                <button className=" bg-zinc-800 hover:bg-zinc-600 text-white rounded-md w-24 h-10"
                    onClick={() => {
                        onSubmit({
                            title: title,
                            image_id: image_id,
                            image_src: image_src,
                            caption_en: caption_en_value,
                            caption_zh: caption_zh_value,
                        });
                    }}>
                    提交
                </button>
            </div>

        </div>
    )
}

export default Box;