import { NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma";
import { waitlistEmailSchema } from "@/lib/waitlist-schema";
import { getWaitlistCount } from "@/lib/waitlist";

export const dynamic = "force-dynamic";

export async function GET() {
  const count = await getWaitlistCount();
  return NextResponse.json(
    { count },
    { headers: { "Cache-Control": "no-store, max-age=0" } },
  );
}

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const parsed = waitlistEmailSchema.safeParse(json);

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
    const count = await getWaitlistCount();

    return NextResponse.json({ status: "created" as const, count });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
