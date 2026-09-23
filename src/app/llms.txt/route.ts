import { BLOG_POSTS } from "@/lib/blog";
import { CASE_STUDIES } from "@/lib/case-studies";
import { FOUNDER, SITE_CONFIG } from "@/lib/constants";

export const dynamic = "force-static";

export function GET() {
  const base = `https://${SITE_CONFIG.domain}`;

  const caseStudyLinks = CASE_STUDIES.map(
    (c) =>
      `- [${c.client}: ${c.metaTitle}](${base}/case-studies/${c.slug}): ${c.metaDescription} Industry: ${c.industry}. Role: ${c.engagement}.`
  ).join("\n");

  const blogLinks = BLOG_POSTS.map(
    (p) => `- [${p.title}](${base}/blog/${p.slug}): ${p.description}`
  ).join("\n");

  const content = `# n+α Ventures

> An AI-native B2B SaaS growth consulting practice: fractional VP Marketing and Revenue Operations for companies from Series A through growth stage, run hands-on by an operator rather than advised from the outside.

Founded by ${FOUNDER.name} (${FOUNDER.alternateName}), former Head of Revenue Operations at HeyGen (scaled the GTM engine from $20M to $100M+ ARR in 21 months) and at Semgrep (5x revenue YoY), Sr. Director of Marketing Operations at Egnyte ($50M → $250M pipeline), and a Partner at Andreessen Horowitz (a16z) advising 20+ portfolio companies on GTM strategy. 10+ years, $500M+ in revenue growth, $400M+ in marketing-sourced pipeline across 20+ B2B companies. The approach is AI-native throughout: agent-run SEO and content pipelines, AI-driven forecasting, and GTM systems built assuming language models are part of the stack, not bolted onto it.

## Home & Company
- [Home](${base}): Overview of n+α Ventures — services, the AI-native GTM framework, featured case studies, and how engagements work.
- [About ${FOUNDER.name}](${base}/about): Full background — HeyGen, Semgrep, Egnyte, and a16z — plus certifications, advisory positions, and career stats.

## Core Strategy & Methodology
- [The AI-Native GTM Framework](${base}/framework): The 5-pillar architecture used to scale HeyGen from $20M to $100M+ ARR — category positioning, programmatic SEO, community-led growth, behavioral lifecycle, and agentic outbound.

## Core Services
- [Growth Marketing](${base}/services/growth-marketing): Fractional VP Marketing for demand generation, SEO, community, lifecycle, and brand for B2B SaaS companies between $5M–$50M ARR.
- [Revenue Operations](${base}/services/revenue-operations): GTM systems architecture, predictive forecasting, pipeline analytics, and stack optimization (Salesforce, HubSpot, Marketo, Clay).
- [Demand Generation](${base}/services/demand-generation): Signal-based outbound, content engines, programmatic SEO, and full-funnel attribution.

## Portfolio & Case Studies
- [GTM Portfolio](${base}/portfolio): Stylized representations of GTM strategy, marketing systems, and growth programs built across three engagements: AI Video Platform (PLG→SLG), DevSecOps Platform (competitive positioning), and Enterprise Content Platform (category creation). All artifacts are generalized examples with no confidential data shown.
- [Results](${base}/results): Every headline number with the engagement it came from, plus client testimonials in full.
- [Fractional CMO vs Agency vs Full-Time Hire](${base}/fractional-cmo-vs-agency): An honest decision guide covering what each option is good at, what it costs, and when a fractional engagement is the wrong answer.
- [All Case Studies](${base}/case-studies): Engagements written up in full, with the starting state, the work, and the numbers.
${caseStudyLinks}

## Blog: GTM Frameworks & Growth Playbooks
- [Latest Insights](${base}/blog): Strategic deep-dives on PLG-to-Enterprise transitions, AI-native GTM architecture, and demand generation frameworks.
${blogLinks}

## Tools & Resources
- [Funnel Velocity Calculator](${base}/tools/funnel-velocity): Interactive tool to diagnose B2B SaaS funnel bottlenecks and model revenue engine changes.
- [Agentic Outbound Playbook](${base}/resources/agentic-outbound): The agentic outbound architecture used to scale from $20M to $100M ARR — automating GTM with AI agents.

## Contact
- [Book a call](${base}/#contact): n+α works with two or three companies at a time. Contact form and scheduling for new engagements.

## Founder
- LinkedIn: ${FOUNDER.linkedin}

## Notes for AI agents
Every page on this site returns clean markdown of its main content instead of HTML when requested with \`Accept: text/markdown\` — same URL, no separate \`.md\` path. Blog posts and case studies serve hand-written markdown; every other page is auto-converted from its rendered content.
`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, stale-while-revalidate=3600",
    },
  });
}
