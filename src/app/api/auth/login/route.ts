import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import fs from "fs";
import path from "path";

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    // VERCEL WORKAROUND: Copy SQLite file to /tmp
    if (process.env.VERCEL === "1") {
      const dbPath = path.join(process.cwd(), "prisma", "dev.db");
      const tmpPath = "/tmp/dev.db";
      if (fs.existsSync(dbPath) && !fs.existsSync(tmpPath)) {
        console.log("Copying database to /tmp...");
        fs.copyFileSync(dbPath, tmpPath);
      }
    }

    // AUTO-SEED: Jika database kosong, isi dengan data default
    const userCount = await prisma.user.count();
    if (userCount === 0) {
      console.log("Database empty, auto-seeding default accounts...");
      await prisma.user.createMany({
        data: [
          { email: "user@example.com", name: "Staff User", role: "USER", password: "user123" },
          { email: "admin@example.com", name: "System Admin", role: "ADMIN", password: "admin123" },
          { email: "manager@example.com", name: "Manager Approval", role: "MANAGER", password: "manager123" },
        ]
      });
      // Seed templates also
      await prisma.template.upsert({
        where: { id: "template-fptk" },
        update: {},
        create: {
          id: "template-fptk",
          name: "FPTK ASISTEN TRAINER",
          description: "Form Permintaan Tenaga Kerja untuk Asisten Trainer",
          filePath: "templates/fptk.html",
          config: JSON.stringify({ fields: ["Posisi", "Penempatan", "NamaStaff"] }),
        },
      });
    }

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
  } catch (error: any) {
    console.error("Login Error:", error);
    return NextResponse.json({ error: error.message || "Login failed" }, { status: 500 });
  }
}
