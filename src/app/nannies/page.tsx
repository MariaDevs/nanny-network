import { prisma } from "@/lib/prisma";
import NanniesClient from "./NanniesClient";

export const metadata = {
  title: "Browse Nannies | Nanny Network South Africa",
  description: "Browse verified nanny profiles across South Africa. Find the perfect nanny for your family.",
};

export default async function NanniesPage() {
  const nannies = await prisma.nanny.findMany({
    where: { status: "approved" },
    orderBy: { createdAt: "desc" },
  });
  return <NanniesClient nannies={nannies} />;
}
