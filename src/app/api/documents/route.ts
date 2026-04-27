import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const documents = await prisma.document.findMany({
      include: {
        template: true,
        user: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(documents);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch documents" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, templateId, userId, data } = body;

    const document = await prisma.document.create({
      data: {
        title,
        templateId,
        userId,
        data: JSON.stringify(data),
        status: "PENDING",
      },
    });

    return NextResponse.json(document);
  } catch (error) {
    return NextResponse.json({ error: "Failed to create document" }, { status: 500 });
  }
}
