import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import DashboardClient from "./DashboardClient";

export const metadata = { title: "My Dashboard | Nanny Network" };

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user) redirect("/nanny-login");

  const nanny = await prisma.nanny.findUnique({
    where: { userId: session.user.id },
  });

  if (!nanny) redirect("/register");

  return <DashboardClient nanny={nanny} userEmail={session.user.email!} />;
}
