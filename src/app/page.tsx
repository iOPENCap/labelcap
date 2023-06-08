"use client";

import React, { useState, useEffect } from 'react';
import { User } from '@/types';
import { Label } from "@/components/ui/label";
import { useToast } from '@/components/ui/use-toast';


const getAuth = async (user: User): Promise<boolean> => {
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
    const { toast } = useToast();

    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const onLogin = async () => {
        const user: User = {
            username: username,
            password: password,
        }
        getAuth(user).then(
            (authed) => {
                if (authed) {
                    window.location.href = '/label';
                } else {
                    toast({
                        title: '登陆失败',
                        description: '用户名或密码错误',
                    });
                }
            }
        )

    }

    return (
        <main className="flex flex-col min-h-screen w-full mt-8 space-y-8">
            <div className="flex h-screen w-full flex-col items-center justify-center">
                <div className="grid md:py-20 md:w-full max-w-sm md:p-12 w-5/6 items-center gap-1.5 border-black border-2 p-6 rounded-xl">
                    <Label htmlFor="Username">Username</Label>
                    <input type="text" className='border border-black rounded-xl bg-transparent h-10 text-sm pl-2' placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} />
                    <Label htmlFor="Password" className='mt-6'>Password</Label>
                    <input type="password" className='border border-black rounded-xl bg-transparent h-10 text-sm pl-2' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                    <div>
                        <button className=" bg-zinc-800 hover:bg-zinc-600 text-white py-2 px-4 rounded-md mt-8"
                            onClick={onLogin}>
                            Login
                        </button>
                    </div>
                </div>
            </div>
        </main>
    )
}
