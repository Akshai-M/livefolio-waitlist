export interface PricingFeature {
  label: string;
  included: boolean;
}

export interface PlanAmount {
  usd: number;
  inr: number;
}

export interface PricingPlan {
  slug: string;
  name: string;
  eyebrow: string;
  description: string;
  monthlyAmount: PlanAmount;
  pricePeriod?: string;
  ctaLabel: string;
  highlight?: boolean;
  badge?: string;
  features: PricingFeature[];
}

export const PRO_PRICING = {
  monthly: { usd: 7, inr: 599 },
} as const;

export function formatUsd(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: amount % 1 === 0 ? 0 : 2,
  }).format(amount);
}

export function formatInr(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: amount % 1 === 0 ? 0 : 2,
  }).format(amount);
}

export const pricingPlans: PricingPlan[] = [
  {
    slug: "starter",
    name: "Starter",
    eyebrow: "Start building",
    description:
      "Try every workflow free for one month, then continue on the essentials.",
    monthlyAmount: { usd: 0, inr: 0 },
    pricePeriod: "for 1 month",
    ctaLabel: "Join waitlist",
    features: [
      { label: "Public portfolio at your Livefolio link", included: true },
      { label: "Resume, GitHub, and LeetCode imports during free month", included: true },
      { label: "Editor, live preview, and publish", included: true },
      { label: "All templates during free month", included: true },
      { label: "Priority email support", included: false },
    ],
  },
  {
    slug: "pro",
    name: "Pro",
    eyebrow: "Stand out",
    description:
      "For active job search and a stronger public presence—with room to grow.",
    monthlyAmount: PRO_PRICING.monthly,
    pricePeriod: "/month",
    ctaLabel: "Join waitlist",
    highlight: true,
    badge: "Popular",
    features: [
      { label: "Everything in Starter", included: true },
      { label: "Portfolio visit analytics", included: true },
      { label: "Priority email support", included: true },
      { label: "Early access to new templates and tools", included: true },
      { label: "AI-assisted polish where it speeds you up", included: true },
      { label: "Best for frequent updates before interviews", included: true },
      { label: "Dedicated success touchpoints", included: false },
    ],
  },
];
