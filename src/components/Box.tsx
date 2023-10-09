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
    image_src: string[],
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
        <div
            className={twMerge(
                'w-full bg-gray-100 pl-0 md:pl-8 flex-col flex items-start rounded-md border p-4 shadow-md',
                className)}>
            <div className="flex flex-col md:flex-row mt-6 ">
                <div className="mt-4 md:mt-0 flex flex-col">
                    <h1 className="md:text-xl w-full text-lg font-bold mb-2 break-words">{title}</h1>
                    <p><span className="text-neutral-400">Image ID<br /></span>{image_id}</p>
                    <p><span className="text-neutral-400">Category<br /></span>{category}</p>
                    <p><br /></p>
                    <p><span className="text-neutral-400">Source<br /></span>public/data/{user}/ captions/orgin/{title}.json</p>
                    <p><span className="text-neutral-400">Target &#40;will be&#41;<br /></span>public/data/{user}/ captions/new/{title}.json</p>
                </div>

                {/* 若图片个数小于3，则一行排完；否则按3个为一行排列 */}
                <div className={`ml-0 md:ml-4 grid grid-cols-${image_src.length >= 3 ? '3' : image_src.length} gap-4 ${isFixed ? 'fixed top-24 right-8' : ''}`}>
                    {image_src.map((item, index) => (
                        <Image
                            className='hover:brightness-110 z-10'
                            src={item}
                            alt="image"
                            width={300}
                            height={300}
                        />
                    ))}
                </div>
            </div>
            <div className="flex flex-row mt-8 items-center">
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
                <button className="bg-zinc-800 hover:bg-zinc-600 text-white rounded-md w-24 h-10"
                    onClick={onSubmit}>
                    提交
                </button>
            </div>

        </div>
    )
}

export default Box;