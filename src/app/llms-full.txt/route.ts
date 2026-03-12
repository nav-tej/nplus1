import { BLOG_POSTS } from "@/lib/blog";
import { BLOG_CONTENT_MD } from "@/lib/blog-content-md";
import { FOUNDER, SITE_CONFIG } from "@/lib/constants";

export const dynamic = "force-static";

export function GET() {
  const base = `https://${SITE_CONFIG.domain}`;

  const aboutSection = `# About ${FOUNDER.name} — Founder, nPlus1 Ventures

${FOUNDER.name} (also known as ${FOUNDER.alternateName}) is the founder of nPlus1 Ventures, a San Francisco-based B2B go-to-market consulting firm. He is a marketing and revenue operations executive with 10+ years of experience building GTM systems at high-growth B2B SaaS companies.

## Career

${FOUNDER.experience
  .map(
    (e) =>
      `### ${e.company} — ${e.role} (${e.period})\n${e.highlight}. ${e.description}`
  )
  .join("\n\n")}

## Impact

- $500M+ in revenue growth driven
- $400M+ in marketing-sourced pipeline generated
- 20+ B2B companies advised
- 5× average ARR growth across engagements

## Services

- **Growth Marketing:** Fractional VP Marketing for B2B SaaS
- **Demand Generation:** ABM, content, SEO, paid, lifecycle
- **Revenue Operations:** GTM systems, forecasting, pipeline analytics

## Advisory

${FOUNDER.advisory.join(", ")} (and 15+ others)

## Certifications & Tools

${FOUNDER.certifications.join(" · ")}

---

`;

  const blogSection = BLOG_POSTS.map((post) => {
    const md = BLOG_CONTENT_MD[post.slug] ?? `# ${post.title}\n\n${post.description}`;
    return `<!-- URL: ${base}/blog/${post.slug} -->\n\n${md}`;
  }).join("\n\n---\n\n");

  const header = `# nPlus1 Ventures — Full Content (llms-full.txt)

Source: ${base}
Generated: ${new Date().toISOString()}

This file contains the full text content of nPlus1 Ventures for use by AI assistants and language models.
See ${base}/llms.txt for a structured index of all pages.

---

`;

  const content = header + aboutSection + blogSection;

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, stale-while-revalidate=3600",
    },
  });
}
