import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import fs from 'fs';
import { User } from "@/types";

export const authOptions: AuthOptions = {
    // TODO: Custom Session Object
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.username || !credentials?.password) {
                    throw new Error("Invalid credentials");
                }

                const data = fs.readFileSync('config.json', 'utf8')
                const users = await JSON.parse(data).users;

                const user = users.find(
                    (item: User) =>
                        item.username === credentials.username && item.password === credentials.password
                );

                if (!user) {
                    throw new Error("Invalid credentials");
                }

                return user;
            }
        })
    ],
    // debug: process.env.NODE_ENV === 'development',
    secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };