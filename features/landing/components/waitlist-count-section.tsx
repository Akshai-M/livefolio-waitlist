import { WaitlistCounter } from "@/features/landing/components/waitlist-counter";
import { getWaitlistCount } from "@/lib/waitlist";

export async function WaitlistCountSection() {
  const count = await getWaitlistCount();

  return (
    <section
      aria-label="Waitlist members"
      className="border-y mt-20 border-border-default bg-surface-raised px-6 py-[var(--space-7)]"
    >
      <div className="mx-auto max-w-[1200px]">
        <p className="eyebrow mb-4 text-center uppercase font-bold">Growing fast</p>
        <WaitlistCounter initialCount={count} />
      </div>
    </section>
  );
}
