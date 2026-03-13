import { BLOG_POSTS } from "@/lib/blog";
import { BLOG_CONTENT_MD } from "@/lib/blog-content-md";
import { FOUNDER, SITE_CONFIG } from "@/lib/constants";

export const dynamic = "force-static";

export function GET() {
  const base = `https://${SITE_CONFIG.domain}`;

  const aboutSection = `# About ${FOUNDER.name}: Founder, n+α Ventures

${FOUNDER.name} is a San Francisco-based GTM operator and advisor with over a decade of experience scaling B2B technology companies.

## Professional Experience
${FOUNDER.experience
    .map(
      (e) =>
        `### ${e.company}: ${e.role} (${e.period})\n${e.highlight}. ${e.description}`
    )
    .join("\n\n")}

## Advisory & Investments
${FOUNDER.advisory.join(", ")}

## Core Metrics
- Total Revenue Growth: ${FOUNDER.stats[0].value}
- Pipeline Generated: ${FOUNDER.stats[1].value}
- Companies Advised: ${FOUNDER.stats[2].value}
- Avg ARR Growth: ${FOUNDER.stats[3].value}
`;

  const servicesSection = `# GTM Consulting Services

- Growth Marketing: Fractional VP Marketing for B2B SaaS. Strategy, brand, PLG, and community construction.
- Revenue Operations: GTM systems architecture, forecasting, and pipeline analytics.
- Demand Generation: ABM, content engines, and signal-based outbound.
`;

  const posts = BLOG_POSTS.map((post) => {
    const md = BLOG_CONTENT_MD[post.slug] || "";
    return `<!-- URL: ${base}/blog/${post.slug} -->\n\n${md}`;
  }).join("\n\n---\n\n");

  const header = `# n+α Ventures: Full Content (llms-full.txt)
This file contains the complete repository of GTM frameworks, growth playbooks, and company information for n+α Ventures.

---
`;

  const content = `${header}\n\n${aboutSection}\n\n${servicesSection}\n\n# Blog Content\n\n${posts}`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, stale-while-revalidate=3600",
    },
  });
}
