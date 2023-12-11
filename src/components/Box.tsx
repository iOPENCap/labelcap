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
    caption_filename: string,
    title: string,
    dataset: string,
    category: string,
    image_id: number,
    captions_en: string[],
    captions_zh: string[],
    isChinese: boolean | null,
    // raw_captions: string[],
    onSubmit: () => Promise<void>,
    onCaptionChange: (captions_en: string[], captions_zh: string[]) => Promise<void>,
}

const Box: React.FC<BoxProps> = ({
    user,
    id,
    className,
    image_src,
    title,
    caption_filename,
    category,
    image_id,
    dataset,
    captions_en,
    captions_zh,
    isChinese,
    onSubmit,
    onCaptionChange,
}) => {
    const [isFixed, setIsFixed] = useState(false);

    return (
        <div
            className={twMerge(
                'w-full bg-gray-100 pl-0 md:pl-8 flex-col flex items-start rounded-md border p-4 shadow-md',
                className)}>
            <h1 className="md:text-xl w-full text-lg font-bold mb-2 mt-8 break-words">{title}</h1>
            <div className="flex w-full">
                <div className="flex w-1/3 flex-col mt-6 ">
                    <div className="mt-4 md:mt-0 flex flex-col">
                        <p><span className="text-neutral-400">Dataset<br /></span>{dataset}</p>
                        <p><span className="text-neutral-400">Image ID<br /></span>{image_id}</p>
                        {category.length > 0 && <p><span className="text-neutral-400">Category<br /></span>{category}</p>}
                        <p><span className="text-neutral-400">Source<br /></span>public/data/{user}/captions/orgin/{caption_filename}</p>
                        <p><span className="text-neutral-400">Target &#40;will be&#41;<br /></span>public/data/{user}/captions/new/{caption_filename}</p>
                    </div>

                    {/* 若图片个数小于3，则一行排完；否则按3个为一行排列 */}
                    <div className={`mt-8 grid grid-cols-${image_src.length >= 3 ? '3' : image_src.length} gap-4 ${isFixed ? 'fixed top-24 right-8' : ''}`}>
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

                <div className="flex w-2/3 md:flex-row md:space-x-8 mt-6 flex-col space-y-8 md:space-y-0">
                    <div className="flex-col w-full space-y-4">
                        {isChinese ? (
                            /* 如果 toggle 切换为中文，则用 textare 显示中文，
                            并在上面用 text 显示英文以辅助（如有） */
                            <>
                                <h1 className="text-xl font-bold">Chinese</h1>
                                {captions_zh.length > 0 ? captions_zh.map((item, index) => (
                                    <div>
                                        <p className="p-2 text-neutral-400">{captions_en[index]}</p>
                                        <textarea
                                            className="p-2 border border-gray-300 rounded-md h-14 w-full"
                                            key={index}
                                            value={item}
                                            onChange={(event) => {
                                                const newcaptions_zh = [...captions_zh];
                                                newcaptions_zh[index] = (event.target as HTMLTextAreaElement).value;
                                                onCaptionChange(captions_en, newcaptions_zh);
                                            }}
                                        />
                                    </div>
                                )) : (
                                    <div>
                                        <p className="text-red-500 text-lg">No Chinese Captions</p>
                                    </div>)}
                            </>
                        ) : (
                            /* 如果 toggle 切换为英文，则用 textare 显示英文，
                            并在上面用 text 显示中文以辅助（如有） */
                            <>
                                <h1 className="text-xl font-bold">English</h1>
                                {captions_en.length > 0 ? captions_en.map((item, index) => (
                                    <div>
                                        <p className="p-2 text-neutral-400">{captions_zh[index]}</p>
                                        <textarea
                                            className="p-4 border border-gray-300 rounded-md md:h-auto h-32 w-full"
                                            key={index}
                                            value={item}
                                            onChange={(event) => {
                                                const newcaptions_en = [...captions_en];
                                                newcaptions_en[index] = (event.target as HTMLTextAreaElement).value;
                                                onCaptionChange(newcaptions_en, captions_zh);
                                            }}
                                        />
                                    </div>
                                )) : (<div>
                                    <p className="text-red-500 text-lg">No English Captions</p>
                                </div>)}
                            </>
                        )}
                    </div>
                </div>
            </div>

            <div className="flex flex-row mt-8 items-center">
                <Switch checked={isFixed} onCheckedChange={setIsFixed} />

                <p className="ml-4 text-lg">固定图片</p>
            </div>



            <div className="flex justify-between w-full mt-4 pr-4">
                <div className="flex flex-row mt-4 items-center" />
                <button className="bg-zinc-800 hover:bg-zinc-600 text-white rounded-md w-24 h-10"
                    onClick={onSubmit}>
                    提交
                </button>
            </div>

        </div>
    )
}

export default Box;