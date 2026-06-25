import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { fullName, phone, email, city, service, message } = body;
    if (!fullName || !phone || !email || !city || !service || !message) {
      return NextResponse.json({ error: "All fields required" }, { status: 400 });
    }
    await prisma.contactMessage.create({ data: { fullName, phone, email, city, service, message } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
