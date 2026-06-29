import { Logo } from "@/components/logo";
import { siteConfig } from "@/lib/site";
import { WaitlistButton } from "@/features/waitlist/waitlist-button";

export function Footer() {
  return (
    <footer className="border-t border-border-default bg-surface-raised px-6 py-[var(--space-8)]">
      <div className="mx-auto flex max-w-[1200px] flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left">
        <div>
          <Logo />
          <p className="mt-2 max-w-sm text-body-sm text-text-secondary">
            {siteConfig.tagline}
          </p>
        </div>

        <WaitlistButton variant="accent">Join waitlist</WaitlistButton>
      </div>

      <p className="mx-auto mt-8 max-w-[1200px] border-t border-border-default pt-6 text-center text-body-sm text-text-muted">
        &copy; {new Date().getFullYear()} {siteConfig.legalEntity}. All rights
        reserved.
      </p>
    </footer>
  );
}
