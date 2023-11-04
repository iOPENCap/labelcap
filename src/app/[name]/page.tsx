"use client";

import Box from "@/components/Box";
import { Switch } from "@/components/ui/switch";
import { CaptionItem } from "@/types";
import { useEffect, useState } from "react";

const getCaptions = async (user: string) => {
    try {
        const res: Response = await fetch(`/api/get-captions`, {
            method: 'POST',
            headers: new Headers({ 'content-type': 'application/json' }),
            body: JSON.stringify({ user: user }),
        });

        if (!res.ok) {
            console.log('error when fetching captions');
            throw new Error(res.statusText);
        }

        const data = await res.json();
        return data.itemList;
    } catch (error) {
        console.log(error);
        return ['error'];
    }
}

const postCaptions = async (captionItem: CaptionItem, user: string) => {
    try {
        const res: Response = await fetch(`/api/post-captions`, {
            method: 'POST',
            headers: new Headers({ 'content-type': 'application/json' }),
            body: JSON.stringify({ captionItem: captionItem, user: user }),
        });

        if (!res.ok) {
            console.log('error when posting captions');
            throw new Error(res.statusText);
        }

    } catch (error) {
        console.log(error);
    }
}
import React, { FC } from 'react';

interface LabelProps {
    params: { name: string }
}

const Label: FC<LabelProps> = ({ params }) => {
    const [captions, setCaptions] = useState<CaptionItem[]>([]);
    const [isChinese, setIsChinese] = useState<boolean>(true);
    const user = params.name;

    const onSubmit = async (captionItem: CaptionItem, index: number) => {
        // 发送验证后的caption
        postCaptions(captionItem, user).then(
            () => {
                // 更新caption
                const newCaptions = [...captions];
                newCaptions.splice(index, 1);
                setCaptions(newCaptions);
            }
        ).catch(
            (error) => { console.log(error) }
        )
    }

    const onCaptionChange = async (captions_en: string[], captions_zh: string[], index: number) => {
        // 更新caption
        const newCaptions = [...captions];
        newCaptions[index].captions_en = captions_en;
        newCaptions[index].captions_zh = captions_zh;
        setCaptions(newCaptions);
    }

    useEffect(() => {
        getCaptions(user).then(
            (data) => {
                setCaptions(data);
            }
        );
    }, []);

    return (
        <div className="px-12 flex flex-col min-h-screen w-full mt-8 space-y-8">
            <div className="flex flex-row">
                <p>英</p>
                <Switch className="mx-2" checked={ isChinese } onCheckedChange={ setIsChinese }/>
                <p>中</p>
            </div>

            {captions.length > 0 && captions.slice(0, 4).map((item, index) => (
                <Box key={index} title={item.title}
                    user = {user}
                    id={index}
                    image_src={item.image_src}
                    image_id={item.image_id}
                    captions_en={item.captions_en}
                    captions_zh={item.captions_zh}
                    isChinese={isChinese}
                    category={item.title.substring(0, item.title.lastIndexOf('_'))}
                    onSubmit={() => onSubmit({
                        title: item.title,
                        image_id: item.image_id,
                        image_src: item.image_src,
                        captions_en: item.captions_en,
                        captions_zh: item.captions_zh,
                        isZh: isChinese,
                        // raw_captions: item.raw_captions,
                    }, index)}
                    onCaptionChange={(captions_en, captions_zh) => onCaptionChange(captions_en, captions_zh, index)}
                />
            ))}
        </div>
    )
}

export default Label;