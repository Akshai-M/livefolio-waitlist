import { Logo } from "@/components/logo";
import { siteConfig } from "@/lib/site";
import { WaitlistButton } from "@/features/waitlist/waitlist-button";

export function Footer() {
  return (
    <footer
      className="px-6 py-[var(--space-8)]"
      style={{ background: "var(--color-footer-bg)" }}
    >
      <div className="mx-auto flex max-w-[1200px] flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left">
        <div>
          <Logo variant="light" />
          <p className="mt-2 max-w-sm text-body-sm text-white/60">
            {siteConfig.tagline}
          </p>
        </div>

        <WaitlistButton variant="accent">Join waitlist</WaitlistButton>
      </div>

      <p className="mx-auto mt-8 max-w-[1200px] border-t border-white/10 pt-6 text-center text-body-sm text-white/40">
        &copy; {new Date().getFullYear()} {siteConfig.legalEntity}. All rights
        reserved.
      </p>
    </footer>
  );
}
