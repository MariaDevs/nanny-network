import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import AdminClient from "./AdminClient";

export const dynamic = "force-dynamic";
export const metadata = { title: "Admin Panel | Nanny Network" };

export default async function AdminPage() {
  const session = await auth();
  if (!session?.user) redirect("/nanny-login");
  const role = (session.user as { role?: string }).role;
  if (role !== "admin") redirect("/");

  const nannies = await prisma.nanny.findMany({
    include: { user: { select: { email: true } } },
    orderBy: { createdAt: "desc" },
  });

  const messages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
    take: 20,
  });

  return <AdminClient nannies={nannies} messages={messages} />;
}
