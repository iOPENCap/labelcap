import fs from 'fs';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const data = fs.readFileSync('config.json', 'utf8')
        const users = await JSON.parse(data).users;

        return NextResponse.json({ users: users });
    } catch (err: any) {
        console.log(err);
        return new NextResponse('Internal Error', { status: 500 });
    }
}