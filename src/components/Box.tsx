"use client";

import Image from "next/image";
import Textarea from "@/components/Textarea";
import { twMerge } from "tailwind-merge";
import { useState } from "react";
import { CaptionItem } from "@/types";
import { Switch } from '@/components/ui/switch'

interface BoxProps {
    user: string,
    id: number,
    className?: string,
    image_src: string,
    title: string,
    category: string,
    image_id: number,
    caption_en: string[],
    caption_zh: string[],
    isChinese: boolean | null,
    // raw_captions: string[],
    onSubmit: () => Promise<void>,
    onCaptionChange: (caption_en: string[], caption_zh: string[]) => Promise<void>,
}

const Box: React.FC<BoxProps> = ({
    user,
    id,
    className,
    image_src,
    title,
    category,
    image_id,
    caption_en,
    caption_zh,
    isChinese,
    // raw_captions,
    onSubmit,
    onCaptionChange,
}) => {
    const [isFixed, setIsFixed] = useState(false);

    return (
        // TODO: 添加卡片关闭动画
        <div
            className={twMerge(
                'w-full bg-gray-100 flex-col flex items-start rounded-md border p-4 hover:bg-slate-100 shadow-md hover:shadow-lg',
                className)}>
            <div className="flex flex-col md:flex-row mt-6 ">
                <Image className={`hover:brightness-110 z-10 ${isFixed ? 'fixed top-24 left-8' : ''}`} src={image_src}
                    alt="image" width={300} height={300} />
                {
                    isFixed && <div className="w-[300px] h-[300px]" />
                }
                <div className="pl-0 mt-4 md:mt-0 md:pl-8 flex flex-col">
                    <h1 className="md:text-xl w-full text-lg font-bold mb-2 break-words">{title}</h1>
                    <p>Image ID: {image_id}</p>
                    <p>Category: {category}</p>
                    <p><br/></p>
                    <p>Source: public/data/{user}/captions/orgin/{title}.json</p>
                    <p>Target &#40;will be&#41;: public/data/{user}/captions/new/{title}.json</p>
                    {/* How to inter '()' in <p>? */}


                    {/* <h2 className="text-md font-bold mt-4">Raw Caption</h2>
                    <div>
                        {raw_captions.map((caption, index) => (
                            <p key={index}>{caption}</p>
                        ))}
                    </div> */}
                </div>
            </div>
            <div className="flex flex-row mt-4 items-center">
                <Switch checked={isFixed} onCheckedChange={setIsFixed} />

                <p className="ml-4 text-lg">固定图片</p>
            </div>

            <div className="flex w-full md:flex-row md:space-x-8 mt-6
            flex-col space-y-8 md:space-y-0">
                <div className="flex-col w-full space-y-4">
                    {isChinese ? (
                        <>
                            <h1 className="text-xl font-bold">Chinese</h1>
                            {caption_zh.map((item, index) => (
                                <textarea
                                    className="p-4 border border-gray-300 rounded-md md:h-auto h-32 w-full"
                                    key={index}
                                    value={item}
                                    onChange={(event) => {
                                        const newCaption_zh = [...caption_zh];
                                        newCaption_zh[index] = (event.target as HTMLTextAreaElement).value;
                                        onCaptionChange(caption_en, newCaption_zh);
                                    }}
                                />
                            ))}
                        </>
                    ) : (
                        <>
                            <h1 className="text-xl font-bold">English</h1>
                            {caption_en.map((item, index) => (
                                <textarea
                                    className="p-4 border border-gray-300 rounded-md md:h-auto h-32 w-full"
                                    key={index}
                                    value={item}
                                    onChange={(event) => {
                                        const newCaption_en = [...caption_en];
                                        newCaption_en[index] = (event.target as HTMLTextAreaElement).value;
                                        onCaptionChange(newCaption_en, caption_zh);
                                    }}
                                />
                            ))}
                        </>
                    )}
                </div>
            </div>

            <div className="flex justify-between w-full mt-4 pr-4">
                <div className="flex flex-row mt-4 items-center">
                    <Switch checked={isFixed} onCheckedChange={setIsFixed} />

                    <p className="ml-4 text-lg">固定图片</p>
                </div>
                <button className=" bg-zinc-800 hover:bg-zinc-600 text-white rounded-md w-24 h-10"
                    onClick={onSubmit}>
                    提交
                </button>
            </div>

        </div>
    )
}

export default Box;