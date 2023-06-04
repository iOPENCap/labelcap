"use client";

import React, { useState, useEffect } from 'react';
import Box from "@/components/Box";
import { CaptionItem } from '@/types';

const getCaptions = async () => {
    try {
        const res: Response = await fetch(`/api/get-captions`, {
            method: 'POST',
            headers: new Headers({ 'content-type': 'application/json' }),
            // TODO: change user
            body: JSON.stringify({ user: 'gcx' }),
        });

        if (!await res.ok) {
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

        if (!await res.ok) {
            console.log('error when posting caption');
            throw new Error(res.statusText);
        }

    } catch (error) {
        console.log(error);
    }
}

export default function Home() {
    const [captions, setCaptions] = useState<CaptionItem[]>([]);

    const onSubmit = async (index: number) => {
        
        // 发送验证后的caption
        // TODO: change user
        postCaptions(captions[index], 'gcx').then(
            () => {
                setCaptions((prevItems) => {
                    const newItems = [...prevItems];
                    newItems.splice(index, 1);
                    return newItems;
                });
            }
        )
    }

    useEffect(() => {
        const fetchCaptions = async () => {
            getCaptions().then(
                (data) => {
                    setCaptions(data);
                }
            );
        };
        fetchCaptions();
    }, []);


    return (
        <main className="flex flex-col min-h-screen w-full mt-8 space-y-8">
            {captions.length > 0 && captions.slice(0, 4).map((item, index) => (
                <Box key={index} title={item.title}
                    image_src={item.image_src}
                    image_id={item.image_id}
                    caption_en={item.caption_en.join('\n')}
                    caption_zh={item.caption_zh.join('\n')}
                    category={item.title.substring(0, item.title.lastIndexOf('_'))}
                    onSubmit={() => onSubmit(index)} />
            ))}
        </main>
    )
}
