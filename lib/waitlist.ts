import { getPrisma } from "@/lib/prisma";

export async function getWaitlistCount(): Promise<number> {
  try {
    const prisma = getPrisma();
    return await prisma.waitlistEntry.count();
  } catch {
    return 0;
  }
}
