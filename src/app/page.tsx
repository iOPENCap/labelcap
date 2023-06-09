"use client";

import React, { useState, useEffect } from 'react';
import { Label } from "@/components/ui/label";
import { useToast } from '@/components/ui/use-toast';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Home() {
    const { toast } = useToast();

    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const router = useRouter();
    const session = useSession();

    // useEffect(() => {
    //     if (session?.status === 'authenticated') {
    //         router.push('/main')
    //     }
    // }, [session?.status, router]);

    const onLogin = async () => {

        signIn('credentials', {
            username: username,
            password: password,
            redirect: false,
        })
            .then((callback) => {
                if (callback?.error) {
                    toast({
                        title: 'Login failed',
                        description: callback.error,
                    })
                }

                else if (callback?.ok) {
                    router.push(`/${username}`);
                }
            })

    }

    return (
        <div className="
        flex 
        min-h-screen
        flex-col 
        justify-center 
        items-center
        py-12 
        sm:px-6 
        lg:px-8 
        bg-gray-100
        ">
            <h2 className="
            mt-6 
            text-center 
            text-3xl 
            font-bold 
            tracking-tight 
            text-gray-900
            mb-12
            ">
                Sign in to your account
            </h2>
            <div className="grid bg-white md:py-20 md:w-full max-w-sm md:p-12 w-5/6 items-center gap-1.5 shadow-lg border p-6 rounded-xl">
                <Label htmlFor="Username">Username</Label>
                <input type="text" className='form-input rounded-lg text-sm' placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} />
                <Label htmlFor="Password" className='mt-6'>Password</Label>
                <input type="password" className='form-input rounded-lg text-sm' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                <div>
                    <button className=" bg-zinc-800 hover:bg-zinc-600 text-white py-2 px-4 rounded-md mt-8 w-full"
                        onClick={onLogin}>
                        Login
                    </button>
                </div>
            </div>
        </div>
    )
}
