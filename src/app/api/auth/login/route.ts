import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || user.password !== password) {
      return NextResponse.json({ error: "Email atau password salah" }, { status: 401 });
    }

    // Set simple cookie
    cookies().set("user_id", user.id, { path: "/" });
    cookies().set("user_role", user.role, { path: "/" });

    return NextResponse.json({ 
      id: user.id, 
      name: user.name, 
      role: user.role 
    });
  } catch (error) {
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}
