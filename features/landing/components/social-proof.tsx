import { integrations } from "@/lib/site";

export function SocialProof() {
  return (
    <section
      aria-label="Product highlights"
      className="border-y border-border-default bg-surface-raised"
    >
      <div className="mx-auto flex max-w-[1200px] flex-col items-center gap-4 px-6 py-6 text-center md:flex-row md:justify-between md:gap-8 md:text-left">
        <p className="text-body-sm text-text-muted">
          Start with your{" "}
          <span className="font-medium text-text-secondary">resume</span>
          <span className="mx-2 text-border-strong" aria-hidden>
            &middot;
          </span>
          enrich with{" "}
          <span className="font-medium text-text-secondary">integrations</span>
        </p>

        <ul className="flex flex-wrap items-center justify-center gap-x-7 gap-y-2">
          {integrations.map((platform) => (
            <li
              key={platform.id}
              className="font-display text-body-sm font-medium text-text-muted opacity-80 transition-opacity hover:opacity-100"
            >
              {platform.name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
