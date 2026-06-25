import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const existing = await prisma.user.findUnique({
    where: { email: "admin@nannynetwork.co.za" },
  });
  if (!existing) {
    await prisma.user.create({
      data: {
        email: "admin@nannynetwork.co.za",
        password: await bcrypt.hash("Admin@NannyNetwork2024!", 12),
        role: "admin",
      },
    });
    console.log("✅ Admin created: admin@nannynetwork.co.za");
    console.log("   Password: Admin@NannyNetwork2024!");
  } else {
    console.log("ℹ️  Admin already exists.");
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
