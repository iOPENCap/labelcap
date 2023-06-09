import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";

export default async function getSession() {
  const req = new NextRequest ({} as any);
  const token = await getToken({ req, secret: process.env.SECRET });
  console.log(token);
  // return await getServerSession(authOptions);
  return null;
}
