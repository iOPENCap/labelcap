"use client";

import React, { useState, useEffect } from 'react';
import Box from "@/components/Box";
import { CaptionItem, User } from '@/types';
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

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

const getAuth = async (user: User) => {
    try {

        const res: Response = await fetch(`/api/auth`, {
            method: 'POST',
            headers: new Headers({ 'content-type': 'application/json' }),
            body: JSON.stringify({ user: user }),
        });

        if (!await res.ok) {
            console.log('error when fetching auth');
            throw new Error(res.statusText);
        }

        const data = await res.json();
        return data.authed;
    } catch (error) {
        console.log(error);
        return false;
    }
}

export default function Home() {
    const [captions, setCaptions] = useState<CaptionItem[]>([]);
    const [authed, setAuthed] = useState<boolean>(false);
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const onSubmit = async (index: number) => {

        // 发送验证后的caption
        // TODO: change user
        // FIXME: 修改的信息没有更新
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
            <div className="flex flex-col items-center justify-center">
                <div className="grid w-full max-w-sm items-center gap-1.5 border-black border-2 p-20 rounded-xl">
                    <Label htmlFor="Username">Username</Label>
                    <Input type="Username" id="Username" placeholder="Username" />
                    <Label htmlFor="Password" className='mt-6'>Password</Label>
                    <Input type="Password" id="Password" placeholder="Password" />
                    <div>
                        <button className=" bg-zinc-800 hover:bg-zinc-600 text-white py-2 px-4 rounded-md mt-8"
                            onClick={() => { getAuth({ username: 'gcx', password: 'gcx@iopen' }) }}>
                            Login
                        </button>
                    </div>
                </div>
            </div>

            {captions.length > 0 && authed && captions.slice(0, 4).map((item, index) => (
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
