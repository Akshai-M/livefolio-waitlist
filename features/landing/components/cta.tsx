import { ArrowRight } from "lucide-react";
import { WaitlistButton } from "@/features/waitlist/waitlist-button";

export function CTA() {
  return (
    <section className="px-6 py-[var(--space-9)]">
      <div className="relative mx-auto max-w-[1200px] overflow-hidden rounded-[var(--radius-xl)] bg-brand-light px-6 py-[var(--space-8)] text-center">
        <div className="hero-blob" aria-hidden />
        <div className="relative mx-auto max-w-2xl">
          <h2 className="text-h1 text-text-primary">
            Be first to build your portfolio
          </h2>
          <p className="prose-measure mx-auto mt-4 text-body-lg text-text-secondary">
            Join the waitlist for early access. No credit card required.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <WaitlistButton variant="accent" size="lg">
              Join waitlist
              <ArrowRight className="h-4 w-4" aria-hidden />
            </WaitlistButton>
          </div>
        </div>
      </div>
    </section>
  );
}
