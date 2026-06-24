"use client";

import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { WaitlistButton } from "@/features/waitlist/waitlist-button";

const SHOWCASE_TEMPLATES = [
  {
    id: "minimal",
    name: "Minimal",
    description: "Clean lines and generous whitespace for a focused first impression.",
    category: "professional",
    gradient: "from-stone-100 to-stone-200",
  },
  {
    id: "developer",
    name: "Developer",
    description: "Terminal-inspired layout built for engineers and builders.",
    category: "technical",
    gradient: "from-green-500/40 to-emerald-400/30",
  },
  {
    id: "modern",
    name: "Modern",
    description: "Bold gradients and sharp typography that stands out.",
    category: "creative",
    gradient: "from-violet-500/50 to-cyan-400/40",
  },
  {
    id: "corporate",
    name: "Corporate",
    description: "Polished and professional for traditional industries.",
    category: "professional",
    gradient: "from-sky-500/40 to-slate-300/30",
  },
  {
    id: "creative",
    name: "Creative",
    description: "Expressive color and layout for designers and artists.",
    category: "creative",
    gradient: "from-pink-500/40 to-orange-400/30",
  },
  {
    id: "retro",
    name: "Retro",
    description: "Nostalgic vibes with a contemporary twist.",
    category: "creative",
    gradient: "from-[#ff90e8]/80 to-[#ffc900]/80",
  },
  {
    id: "blueprint",
    name: "Blueprint",
    description: "Technical drawing aesthetic for architects and engineers.",
    category: "technical",
    gradient: "from-[#003366] to-[#002244]",
  },
  {
    id: "spotlight",
    name: "Spotlight",
    description: "Hero-first layout that puts your story front and center.",
    category: "professional",
    gradient: "from-[#fc3]/50 to-[#fbfffe]",
  },
] as const;

function TemplatePreview({ gradient }: { gradient: string }) {
  return (
    <div className={cn("aspect-4/3 bg-linear-to-br rounded-2xl p-3", gradient)}>
      <div className="h-full rounded-xl border border-white/20 bg-black/10 p-3">
        <div className="h-3 w-24 rounded-full bg-white/40" />
        <div className="mt-4 h-16 rounded-2xl bg-white/15" />
        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="h-16 rounded-2xl bg-white/15" />
          <div className="h-16 rounded-2xl bg-white/15" />
        </div>
      </div>
    </div>
  );
}

function ShowcaseCard({
  template,
}: {
  template: (typeof SHOWCASE_TEMPLATES)[number];
}) {
  return (
    <div className="group flex w-[280px] shrink-0 snap-start flex-col overflow-hidden rounded-[var(--radius-xl)] glass-panel outline-none transition-all duration-200 ease-[var(--ease-out)] hover:-translate-y-1 hover:border-border-strong">
      <div className="border-b border-border-default p-4">
        <TemplatePreview gradient={template.gradient} />
      </div>

      <div className="flex flex-1 flex-col gap-3 px-4 py-4">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="text-h4 text-text-primary">{template.name}</p>
            <p className="mt-1 line-clamp-2 text-body-sm text-text-secondary">
              {template.description}
            </p>
          </div>
          <ArrowUpRight
            className="mt-0.5 h-4 w-4 shrink-0 text-text-muted transition-colors group-hover:text-brand-primary"
            aria-hidden
          />
        </div>
        <Badge variant="neutral" className="w-fit capitalize">
          {template.category}
        </Badge>
      </div>
    </div>
  );
}

export function TemplateShowcase() {
  return (
    <section
      id="showcase"
      className="scroll-mt-16 bg-surface-raised px-6 py-[var(--space-9)]"
    >
      <div className="mx-auto max-w-[1200px]">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow uppercase">Examples</p>
            <h2 className="mt-3 text-h1 text-text-primary">
              See what Foliofy creates
            </h2>
            <p className="prose-measure mt-4 text-body text-text-secondary">
              Real layouts generated from a resume. Same content, your choice of
              personality.
            </p>
          </div>
          <WaitlistButton
            variant="ghost"
            className="inline-flex shrink-0 items-center gap-1 text-body-sm font-medium text-brand-primary hover:text-brand-dark"
          >
            Browse all 30+ templates
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </WaitlistButton>
        </div>
      </div>

      <div className="mt-[var(--space-6)]">
        <div className="mx-auto flex max-w-[1200px] snap-x gap-[var(--space-5)] overflow-x-auto px-6 pb-4 [scrollbar-width:thin]">
          {SHOWCASE_TEMPLATES.map((template) => (
            <ShowcaseCard key={template.id} template={template} />
          ))}
        </div>
      </div>
    </section>
  );
}
