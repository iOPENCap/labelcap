"use client";

import Image from "next/image";
import Textarea from "@/components/Textarea";
import { twMerge } from "tailwind-merge";
import { useState } from "react";
import { CaptionItem } from "@/types";
import { Switch } from '@headlessui/react'

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

    const [isFixed, setIsFixed] = useState(false);

    const imageStyle = isFixed
        ? {
            position: "fixed",
            top: "10px",
            left: "10px",
            boxShadow: "0px 7px 7px rgba(0, 0, 0, 0.3)"
        }
        : {};

    return (
        // TODO: 添加卡片关闭动画
        <div
            className={twMerge(
                'w-full flex-col flex items-start rounded-md border p-4 hover:bg-slate-100 shadow-md hover:shadow-lg',
                className)}>
            <div className="flex flex-col md:flex-row mt-6 ">
                <Image className="hover:brightness-110 z-10 left-4 top-4" src={image_src}
                    alt="image" width={300} height={300}
                    style={imageStyle} />
                {
                    isFixed && <div className="w-[300px] h-[300px]" />
                }
                <div className="pl-0 mt-4 md:mt-0 md:pl-8 flex flex-col">
                    <h1 className="md:text-xl w-full text-md font-bold mb-2 break-words">{title}</h1>
                    <p>Image ID: {image_id}</p>
                    <p>Category: {category}</p>
                </div>
            </div>
            <div className="flex flex-row mt-4 items-center">

                <Switch
                    checked={isFixed}
                    onChange={setIsFixed}
                    className={`
                        ${isFixed ? 'bg-zinc-800' : 'bg-zinc-500'}
                        relative 
                        inline-flex 
                        h-[28px] w-[74px]
                        cursor-pointer 
                        rounded-full 
                        border-2 
                        border-transparent 
                        transition-colors 
                        duration-200 
                        ease-in-out 
                        focus:outline-none 
                        focus-visible:ring-2 
                        focus-visible:ring-white 
                        focus-visible:ring-opacity-75
                    `}
                >
                    <span
                        aria-hidden="true"
                        className={`${isFixed ? 'translate-x-9' : 'translate-x-0'}
                    pointer-events-none inline-block h-[24px] w-[34px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                    />
                </Switch>

                <p className="ml-4 text-lg">固定图片</p>
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

            <div className="flex justify-between w-full mt-4 pr-4">
                <div className="flex flex-row mt-4 items-center">

                    <Switch
                        checked={isFixed}
                        onChange={setIsFixed}
                        className={`
                            ${isFixed ? 'bg-zinc-800' : 'bg-zinc-500'}
                            relative 
                            inline-flex 
                            h-[28px] w-[74px]
                            cursor-pointer 
                            rounded-full 
                            border-2 
                            border-transparent 
                            transition-colors 
                            duration-200 
                            ease-in-out 
                            focus:outline-none 
                            focus-visible:ring-2 
                            focus-visible:ring-white 
                            focus-visible:ring-opacity-75
                        `}
                    >
                        <span
                            aria-hidden="true"
                            className={`
                                ${isFixed ? 'translate-x-9' : 'translate-x-0'}
                                pointer-events-none inline-block h-[24px] w-[34px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out
                            `}
                        />
                    </Switch>

                    <p className="ml-4 text-lg">固定图片</p>
                </div>
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