import { NextResponse } from "next/server";
import { z } from "zod";
import { getPrisma } from "@/lib/prisma";
import { getWaitlistCount } from "@/lib/waitlist";

export async function GET() {
  const count = await getWaitlistCount();
  return NextResponse.json({ count });
}

const bodySchema = z.object({
  email: z.string().trim().email("Enter a valid email address."),
});

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const parsed = bodySchema.safeParse(json);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Invalid email." },
        { status: 400 },
      );
    }

    const email = parsed.data.email.toLowerCase();

    const prisma = getPrisma();
    const existing = await prisma.waitlistEntry.findUnique({
      where: { email },
    });

    if (existing) {
      return NextResponse.json({ status: "exists" as const });
    }

    await prisma.waitlistEntry.create({ data: { email } });

    return NextResponse.json({ status: "created" as const });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
