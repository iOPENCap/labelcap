import { User } from "@/types";
import { NextResponse } from "next/server";
import fs from 'fs';

export async function POST(req: Request) {
    try {
        const { user } = await req.json();
        
        const data = fs.readFileSync('config.json', 'utf8')
        const users = await JSON.parse(data).users;

        const authed = users.find((item: User) => item.username === user.username && item.password === user.password);

        return NextResponse.json({ authed: !!authed });
    } catch (err: any) {
        console.log(err);
        return new NextResponse('Internal Error', { status: 500 });
    }
}