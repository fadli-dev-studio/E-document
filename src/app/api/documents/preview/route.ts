import { NextResponse } from "next/server";
import { renderTemplate } from "@/lib/html-renderer";

export async function POST(req: Request) {
  try {
    const { template, data } = await req.json();
    const html = await renderTemplate(template, data);
    
    return new NextResponse(html, {
      headers: {
        "Content-Type": "text/html",
      },
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to render template" }, { status: 500 });
  }
}
