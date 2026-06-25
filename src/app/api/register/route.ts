import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

async function saveFile(file: File, folder: string): Promise<string> {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const uploadDir = path.join(process.cwd(), "public", "uploads", folder);
  await mkdir(uploadDir, { recursive: true });
  const filename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
  await writeFile(path.join(uploadDir, filename), buffer);
  return `/uploads/${folder}/${filename}`;
}

export async function POST(req: NextRequest) {
  try {
    const fd = await req.formData();
    const get = (key: string) => fd.get(key) as string | null;

    const email = get("email");
    const password = get("password");
    const fullName = get("fullName");
    const phone = get("phone");
    const province = get("province");
    const city = get("city");
    const age = parseInt(get("age") || "0");
    const yearsExperience = parseInt(get("yearsExperience") || "0");
    const languages = get("languages") || "";
    const skills = get("skills") || "";
    const availability = get("availability") || "";
    const salaryRange = get("salaryRange") || "";
    const bio = get("bio") || "";

    if (!email || !password || !fullName || !phone || !province || !city || !bio) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return NextResponse.json({ error: "Email already registered" }, { status: 400 });

    const hash = await bcrypt.hash(password, 12);

    let photoUrl: string | undefined;
    let idDocUrl: string | undefined;
    let certsUrl: string | undefined;

    const photoFile = fd.get("photoFile") as File | null;
    const idFile = fd.get("idFile") as File | null;
    const certsFile = fd.get("certsFile") as File | null;

    if (photoFile && photoFile.size > 0) photoUrl = await saveFile(photoFile, "photos");
    if (idFile && idFile.size > 0) idDocUrl = await saveFile(idFile, "private");
    if (certsFile && certsFile.size > 0) certsUrl = await saveFile(certsFile, "private");

    const user = await prisma.user.create({
      data: {
        email,
        password: hash,
        role: "nanny",
        nanny: {
          create: {
            fullName,
            phone,
            province,
            city,
            age,
            yearsExperience,
            languages,
            skills,
            availability,
            salaryRange,
            bio,
            photoUrl,
            idDocUrl,
            certsUrl,
            status: "pending",
          },
        },
      },
    });

    return NextResponse.json({ ok: true, userId: user.id });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
