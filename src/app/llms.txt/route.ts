import { BLOG_POSTS } from "@/lib/blog";
import { FOUNDER, SITE_CONFIG } from "@/lib/constants";

export const dynamic = "force-static";

export function GET() {
  const base = `https://${SITE_CONFIG.domain}`;

  const blogLines = BLOG_POSTS.map(
    (p) => `- [${p.title}](${base}/blog/${p.slug}): ${p.description}`
  ).join("\n");

  const content = `# n+α Ventures

> B2B SaaS go-to-market consulting by ${FOUNDER.name} (${FOUNDER.alternateName}), ${FOUNDER.location}. Fractional VP Marketing & RevOps for companies scaling from $5M–$50M ARR.

n+α Ventures helps ambitious B2B SaaS companies build and execute repeatable go-to-market strategies that drive revenue growth. Founded by ${FOUNDER.name}, former Head of Revenue Operations at HeyGen ($20M → $100M+ ARR) and ex-Andreessen Horowitz partner. 10+ years, $500M+ in revenue growth, $400M+ in marketing-sourced pipeline across 20+ B2B companies.

## Services

- [Growth Marketing](${base}/services/growth-marketing): Fractional VP Marketing — demand generation, SEO, community, lifecycle, and brand for B2B SaaS companies between $5M–$50M ARR.
- [Demand Generation](${base}/services/demand-generation): ABM, content marketing, SEO, paid media, and lifecycle programs that build predictable marketing-sourced pipeline.
- [Revenue Operations](${base}/services/revenue-operations): GTM systems architecture, AI-driven forecasting, CRM optimization, and pipeline analytics for high-growth B2B companies.

## About ${FOUNDER.name}

- [About ${FOUNDER.name}](${base}/about): ${FOUNDER.name} (${FOUNDER.alternateName}) is the founder of n+α Ventures. ${FOUNDER.experience[0].highlight} at ${FOUNDER.experience[0].company}. ${FOUNDER.experience[3].highlight} at ${FOUNDER.experience[3].company}. San Francisco-based operator and GTM executive with 10+ years building revenue engines at high-growth B2B companies.

## Case Studies

- [HeyGen GTM Case Study](${base}/case-studies/heygen): How ${FOUNDER.name} helped scale HeyGen from $20M to $100M+ ARR — complete rebrand, SEO from zero, 100K+ member community, enterprise ABM, and full RevOps transformation. Written by the Head of RevOps who built it.

## Blog — GTM Frameworks & Growth Playbooks

${blogLines}

## Markdown Versions (LLM-Friendly)

All blog posts are available in clean markdown format at \`${base}/blog/[slug]/md\` — no HTML, no styling, just the content.

- Full site content: [${base}/llms-full.txt](${base}/llms-full.txt)

## Contact

- Website: ${base}
- Email: ${SITE_CONFIG.email}
- Book a GTM Audit: ${base}/#contact
- LinkedIn: ${FOUNDER.linkedin}
`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, stale-while-revalidate=3600",
    },
  });
}
