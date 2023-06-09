"use client";

import Box from "@/components/Box";
import { CaptionItem } from "@/types";
import { getSession, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import getCurrentUser from "../actions/getCurrentUser";

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
            console.log('error when posting caption');
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
    const user = params.name;

    const onSubmit = async (captionItem: CaptionItem, index: number) => {
        console.log(captionItem);
        // 发送验证后的caption
        postCaptions(captionItem, user).then(
            () => {
                // 更新caption
                const newCaptions = [...captions];
                newCaptions[index] = captionItem;
                setCaptions(newCaptions);
            }
        )
    }

    useEffect(() => {
        const fetchCaptions = async () => {
            getCaptions(user).then(
                (data) => {
                    setCaptions(data);
                }
            );
        };
        fetchCaptions();
    }, []);

    return (
        <div className="flex flex-col min-h-screen w-full mt-8 space-y-8">
            {captions.length > 0 && captions.slice(0, 4).map((item, index) => (
                <Box key={index} title={item.title}
                    id={index}
                    image_src={item.image_src}
                    image_id={item.image_id}
                    caption_en={item.caption_en}
                    caption_zh={item.caption_zh}
                    category={item.title.substring(0, item.title.lastIndexOf('_'))}
                    onSubmit={(captionItem) => onSubmit(captionItem, index)} />
            ))}
        </div>
    )
}

export default Label;