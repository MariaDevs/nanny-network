import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    const { city, province, bio, availability, salaryRange, skills, languages, yearsExperience } = body;

    await prisma.nanny.update({
      where: { userId: session.user.id },
      data: { city, province, bio, availability, salaryRange, skills, languages, yearsExperience },
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
