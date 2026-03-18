import { BLOG_POSTS } from "@/lib/blog";
import { FOUNDER, SITE_CONFIG } from "@/lib/constants";

export const dynamic = "force-static";

export function GET() {
  const base = `https://${SITE_CONFIG.domain}`;

  const blogLinks = BLOG_POSTS.map(
    (p) => `- [${p.title}](${base}/blog/${p.slug}): ${p.description}`
  ).join("\n");

  const content = `# n+α Ventures
n+α Ventures helps ambitious B2B SaaS companies build and execute repeatable go-to-market strategies that drive revenue growth. Founded by ${FOUNDER.name}, former Head of Revenue Operations at HeyGen ($20M → $100M+ ARR) and ex-Andreessen Horowitz partner. 10+ years, $500M+ in revenue growth, $400M+ in marketing-sourced pipeline across 20+ B2B companies.

## Core Strategy & Methodology
- [The AI-Native GTM Framework](${base}/framework): Our proprietary 5-pillar architecture for scaling B2B SaaS from $10M to $100M+ ARR. Built on shipping velocity and distribution loops.

## Core Services
- [Growth Marketing](${base}/services/growth-marketing): Fractional VP Marketing for demand generation, SEO, community, lifecycle, and brand for B2B SaaS companies between $5M–$50M ARR.
- [Revenue Operations](${base}/services/revenue-operations): GTM systems architecture, predictive forecasting, pipeline analytics, and stack optimization (Salesforce, HubSpot, Marketo, Clay).
- [Demand Generation](${base}/services/demand-generation): Signal-based outbound, content engines, programmatic SEO, and full-funnel attribution.

## Portfolio & Case Studies
- [GTM Portfolio](${base}/portfolio): Stylized representations of GTM strategy, marketing systems, and growth programs built across three engagements: AI Video Platform (PLG→SLG), DevSecOps Platform (competitive positioning), and Enterprise Content Platform (category creation). All artifacts are generalized examples with no confidential data shown.
- [HeyGen GTM Case Study](${base}/case-studies/heygen): How ${FOUNDER.name} helped scale HeyGen from $20M to $100M+ ARR through a complete rebrand, SEO from zero, 100K+ member community, enterprise ABM, and full RevOps transformation. Written by the Head of RevOps who built it.

## Blog: GTM Frameworks & Growth Playbooks
- [Latest Insights](${base}/blog): Strategic deep-dives on PLG-to-Enterprise transitions, AI-native GTM architecture, and demand generation frameworks.

All blog posts are available in clean markdown format at \`${base}/blog/[slug]/md\` with no HTML or styling, just the content.

## Founder
- [About ${FOUNDER.name}](${base}/about): ${FOUNDER.name} (${FOUNDER.alternateName}) is the founder of n+α Ventures. ${FOUNDER.experience[0].highlight} at ${FOUNDER.experience[0].company}. ${FOUNDER.experience[3].highlight} at ${FOUNDER.experience[3].company}. San Francisco-based operator and GTM executive with 10+ years building revenue engines at high-growth B2B companies.
- LinkedIn: ${FOUNDER.linkedin}
`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, stale-while-revalidate=3600",
    },
  });
}
