export interface BlogPost {
  slug: string;
  title: string;
  metaTitle: string;
  description: string;
  category: BlogCategory;
  readTime: number; // minutes
  publishDate: string; // ISO date
}

export type BlogCategory =
  | "Growth Marketing"
  | "Revenue Operations"
  | "Demand Generation"
  | "Product-Led Growth"
  | "AI & GTM";

export const BLOG_CATEGORIES: BlogCategory[] = [
  "Growth Marketing",
  "Revenue Operations",
  "Demand Generation",
  "Product-Led Growth",
  "AI & GTM",
];

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "heygen-gtm-playbook-20m-to-100m-arr",
    title: "How HeyGen Scaled from $20M to $100M ARR: The GTM Playbook",
    metaTitle: "How HeyGen Scaled $20M to $100M ARR: The GTM Playbook",
    description:
      "The full GTM playbook behind HeyGen's 5× ARR growth — rebrand, SEO from zero, 100K community, AI-native lifecycle, and enterprise ABM. Written by the Head of RevOps who built it.",
    category: "Growth Marketing",
    readTime: 12,
    publishDate: "2026-01-15",
  },
  {
    slug: "ai-native-gtm-marketing-operations-2025",
    title: "What \"AI-Native GTM\" Actually Means (And How to Build It)",
    metaTitle: "Building an AI-Native GTM Stack in 2025 | B2B SaaS",
    description:
      "What it actually means to build AI-native marketing and RevOps — the stack, the workflows, and the results from doing it at HeyGen and Semgrep.",
    category: "AI & GTM",
    readTime: 9,
    publishDate: "2026-01-22",
  },
  {
    slug: "plg-to-enterprise-gtm-transition-playbook",
    title: "PLG to Enterprise: The GTM Transition Playbook",
    metaTitle: "PLG to Enterprise: The GTM Transition Playbook for B2B SaaS",
    description:
      "How to successfully transition from a product-led growth motion to an enterprise sales motion without breaking what's working. Lessons from Semgrep and HeyGen.",
    category: "Product-Led Growth",
    readTime: 10,
    publishDate: "2026-01-29",
  },
  {
    slug: "demand-generation-b2b-saas-pipeline-framework",
    title: "The Demand Generation Framework Behind $400M+ in Marketing Pipeline",
    metaTitle: "How to Build $50M+ Marketing Pipeline in B2B SaaS",
    description:
      "The demand generation framework behind $400M+ in marketing-sourced pipeline. ABM, content, SEO, lifecycle — and how they work together to build predictable pipeline.",
    category: "Demand Generation",
    readTime: 11,
    publishDate: "2026-02-05",
  },
  {
    slug: "revenue-operations-ai-forecasting-2025",
    title: "Revenue Operations in 2025: What Actually Moves the Needle",
    metaTitle:
      "Revenue Operations in the AI Era: Forecasting, Stack Design & What Moves the Needle",
    description:
      "How to build a modern RevOps function in 2025 — AI-driven forecasting, GTM stack architecture, PLG-to-sales motion design, and what I learned building these at HeyGen.",
    category: "Revenue Operations",
    readTime: 10,
    publishDate: "2026-02-12",
  },
  {
    slug: "community-led-growth-b2b-saas-strategy",
    title:
      "Community-Led Growth: How We Went from Zero to 100,000 Members in 6 Months",
    metaTitle:
      "Community-Led Growth in B2B SaaS: 0 to 100K Members in 6 Months",
    description:
      "How we launched HeyGen's community platform and grew it to 100,000 active members in 6 months — and what community-led growth actually looks like as a B2B acquisition channel.",
    category: "Growth Marketing",
    readTime: 8,
    publishDate: "2026-02-19",
  },
  {
    slug: "abm-strategy-b2b-saas-enterprise-pipeline",
    title: "The ABM Playbook That Generated $XXM+ in Enterprise Pipeline",
    metaTitle: "ABM Strategy for B2B SaaS: How to Build Enterprise Pipeline at Scale",
    description:
      "The ABM playbook behind $XXM+ in enterprise pipeline at HeyGen and 3× pipeline efficiency at Egnyte. Tiered ABM, Clay personalization, intent signals, and what actually converts.",
    category: "Demand Generation",
    readTime: 9,
    publishDate: "2026-02-26",
  },
  {
    slug: "seo-from-zero-b2b-saas-organic-growth",
    title:
      "SEO From Zero: The Exact Process I Used to Build HeyGen's Organic Growth",
    metaTitle: "SEO From Zero: How I Built HeyGen's Organic Search Program",
    description:
      "How to build a B2B SaaS SEO program from scratch — the exact process I used at HeyGen to drive 50%+ YoY organic growth, and what I've learned building SEO programs across multiple SaaS companies.",
    category: "Growth Marketing",
    readTime: 10,
    publishDate: "2026-03-05",
  },
];
