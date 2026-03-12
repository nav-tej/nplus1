import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title:
    "Demand Generation Consulting for B2B SaaS | $400M Pipeline Generated",
  description:
    "B2B SaaS demand generation consulting. ABM, content, SEO, paid, and lifecycle. Nav Singh has created $400M+ in marketing-sourced pipeline across Egnyte, Semgrep, and HeyGen.",
  keywords: [
    "demand generation consulting",
    "B2B demand gen",
    "ABM consulting",
    "content marketing B2B SaaS",
    "SEO for SaaS",
    "pipeline generation",
    "lead generation B2B",
    "marketing-sourced pipeline",
    "Nav Singh",
  ],
  alternates: {
    canonical: "https://nplusalpha.com/services/demand-generation",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://nplusalpha.com/services/demand-generation",
    siteName: "nPlus1 Ventures",
    title: "Demand Generation Consulting for B2B SaaS | nPlus1 Ventures",
    description:
      "$400M+ in marketing-sourced pipeline built. ABM, content, SEO, paid, and lifecycle programs for B2B SaaS.",
  },
};

const DG_SCHEMA = JSON.stringify({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://nplusalpha.com" },
        { "@type": "ListItem", position: 2, name: "Services", item: "https://nplusalpha.com/services/demand-generation" },
        { "@type": "ListItem", position: 3, name: "Demand Generation", item: "https://nplusalpha.com/services/demand-generation" },
      ],
    },
    {
      "@type": "Service",
      "@id": "https://nplusalpha.com/services/demand-generation#service",
      name: "Demand Generation Consulting",
      description: "B2B SaaS demand generation consulting covering ABM, content marketing, SEO, paid acquisition, and lifecycle programs. Nav Singh has created $400M+ in marketing-sourced pipeline across HeyGen, Semgrep, and Egnyte.",
      provider: { "@id": "https://nplusalpha.com/#organization" },
      areaServed: { "@type": "Country", name: "United States" },
      serviceType: "Demand Generation Consulting",
      url: "https://nplusalpha.com/services/demand-generation",
    },
    {
      "@type": "FAQPage",
      "@id": "https://nplusalpha.com/services/demand-generation#faq",
      mainEntity: [
        {
          "@type": "Question",
          name: "What demand generation channels do you focus on for B2B SaaS?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The right channel mix depends on your motion and stage. For mid-market and enterprise, ABM on LinkedIn combined with intent data (6sense or Demandbase) typically delivers the highest ROI. For PLG companies, SEO and lifecycle automation are the core. At HeyGen and Egnyte I built full-stack programs covering ABM, content, SEO, paid search, and lifecycle, and then prioritized based on what the unit economics supported.",
          },
        },
        {
          "@type": "Question",
          name: "How long does it take to see results from a demand generation program?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Paid and lifecycle programs can show results within 30 to 60 days. SEO and content compound over 6 to 12 months. ABM programs targeting enterprise accounts typically run on a 90-day cycle before showing meaningful pipeline. I set realistic timelines at the start of every engagement so expectations are calibrated correctly.",
          },
        },
        {
          "@type": "Question",
          name: "Do you build demand gen programs in-house or bring your own team?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Both. I can embed within your existing marketing team as fractional demand gen leadership, or I can bring in specialized contractors (SEO, paid, content, design) from my network if you need to build from scratch. Most engagements involve a combination of coaching your existing team and filling gaps with vetted specialists.",
          },
        },
        {
          "@type": "Question",
          name: "What stage of company do you typically work with on demand generation?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Primarily Series A through C B2B SaaS companies between $5M and $100M ARR. This is the stage where demand gen programs have the most leverage: the product is proven, ICP is reasonably clear, but the systematic pipeline engine has not yet been built. I have also worked with post-Series C companies needing to scale specific channels.",
          },
        },
      ],
    },
  ],
});

export default function DemandGenerationPage() {
  return (
    <>
      {/* Static JSON-LD structured data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: DG_SCHEMA }} />
      <Navbar />
      <main id="main-content">
        {/* Hero */}
        <section className="pt-32 pb-20 border-b border-white/5">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold text-orange-400 tracking-wide uppercase mb-4">
                Demand Generation
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground tracking-tight">
                Demand Generation Consulting for B2B SaaS
              </h1>
              <p className="mt-6 text-xl text-muted max-w-2xl leading-relaxed">
                I have built $400M+ in marketing-sourced pipeline. Let me build
                yours.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/#contact"
                  className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-[#0B1221] hover:brightness-110 transition-all duration-300"
                >
                  Book a Demand Gen Audit
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M1 7h12m0 0L8 2m5 5L8 12"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
                <Link
                  href="/case-studies/heygen"
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 px-7 py-3.5 text-sm font-semibold text-foreground hover:border-orange-400/60 hover:text-orange-400 transition-colors"
                >
                  See HeyGen Case Study
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* What Demand Gen Means */}
        <section className="py-20 border-b border-white/5">
          <div className="mx-auto max-w-4xl px-6 lg:px-10">
            <h2 className="text-3xl font-bold text-foreground mb-6">
              What Demand Generation Actually Means in 2025
            </h2>
            <div className="space-y-5 text-[15px] text-muted leading-relaxed">
              <p>
                Demand generation in 2025 is not about running campaigns. It is
                about building a system that creates awareness, captures intent,
                and converts pipeline predictably, month after month, regardless
                of whether you are running a specific campaign.
              </p>
              <p>
                I have built demand gen programs from scratch at HeyGen,
                Semgrep, and Egnyte. Here is what the system looks like:
              </p>
            </div>
          </div>
        </section>

        {/* The Stack */}
        <section className="py-20 border-b border-white/5">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <h2 className="text-3xl font-bold text-foreground mb-12">
              The Demand Generation Stack
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  title: "1. ICP & Segmentation Foundation",
                  desc: "Everything starts with a tight ICP. I have seen companies improve pipeline quality 3x just by narrowing their ICP and killing programs targeting the wrong accounts. Before spending a dollar on demand gen, I run an ICP sprint with your sales and CS teams.",
                },
                {
                  title: "2. Account-Based Marketing (ABM)",
                  desc: "For mid-market and enterprise motion, ABM is the highest-ROI demand gen investment. I have built ABM programs that generated $25M in enterprise pipeline at HeyGen and drove 3x pipeline efficiency improvement at Egnyte.",
                  bullets: [
                    "Tier 1: 50 to 200 named accounts with fully personalized outreach",
                    "Tier 2: 500 to 2,000 accounts with automated personalization using Clay",
                    "Infrastructure: 6sense or Demandbase for intent data, LinkedIn plus display for ABM ads",
                  ],
                },
                {
                  title: "3. Content Engine",
                  desc: "Content is the fuel for every other demand gen channel. I build content operations that produce consistently at scale, not one-off blog posts.",
                  bullets: [
                    "Editorial calendar tied to keyword and pipeline targets",
                    "Content types by funnel stage: awareness, consideration, decision",
                    "Distribution across organic, paid, email, and partner channels",
                    "Content operations producing 1,000+ assets annually",
                  ],
                },
                {
                  title: "4. SEO Program",
                  desc: "SEO is the only demand gen channel with compounding returns. I built HeyGen's first structured SEO program, reversing a declining organic baseline and driving 50%+ YoY organic traffic growth within 12 months.",
                  bullets: [
                    "Technical SEO audit and remediation",
                    "Keyword strategy by funnel stage and buyer persona",
                    "On-page optimization across all commercial pages",
                    "AI/LLM search optimization (GEO) for ChatGPT and Perplexity",
                  ],
                },
                {
                  title: "5. Paid Acquisition",
                  desc: "I run paid programs only where the unit economics work. My standard is a 4:1 LTV:CAC ratio minimum.",
                  bullets: [
                    "LinkedIn: Best for B2B ABM and enterprise targeting",
                    "Google Search: High-intent bottom-of-funnel capture",
                    "Paid social retargeting: Convert intent signals into pipeline",
                  ],
                },
                {
                  title: "6. Lifecycle & Nurture",
                  desc: "The majority of leads do not convert on first touch. Lifecycle campaigns warm prospects over weeks and months.",
                  bullets: [
                    "Lead scoring (behavioral plus firmographic) improving MQL-to-SQL by 35%",
                    "Automated email nurture sequences by segment",
                    "In-app messaging for PLG products (PostHog, Customer.io)",
                    "Retargeting sequences for high-intent content consumers",
                  ],
                },
                {
                  title: "7. Partner & Ecosystem Demand",
                  desc: "Partner-sourced pipeline is often the highest-conversion and lowest-CAC demand gen channel. I have built partner programs that contributed 20% of total pipeline.",
                },
              ].map((item) => (
                <article
                  key={item.title}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-7"
                >
                  <h3 className="text-lg font-bold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted leading-relaxed mb-4">
                    {item.desc}
                  </p>
                  {item.bullets && (
                    <ul className="space-y-2">
                      {item.bullets.map((b) => (
                        <li
                          key={b}
                          className="flex items-start gap-2 text-sm text-muted"
                        >
                          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-orange-400 flex-shrink-0" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* AI-Native Advantage */}
        <section className="py-20 border-b border-white/5">
          <div className="mx-auto max-w-4xl px-6 lg:px-10">
            <h2 className="text-3xl font-bold text-foreground mb-6">
              The AI-Native Demand Gen Advantage
            </h2>
            <p className="text-[15px] text-muted leading-relaxed mb-8">
              The companies pulling ahead in demand generation right now are
              doing it with AI, not more headcount. At HeyGen, we built
              AI-native systems that let a lean team outperform competitors with
              3x the marketing staff:
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                {
                  label: "AI-driven content production",
                  desc: "Scaling from 5 to 50+ pieces per month without hiring proportionally",
                },
                {
                  label: "Personalization at scale",
                  desc: "Clay-powered research and personalization for ABM outreach",
                },
                {
                  label: "Automated signal-to-action",
                  desc: "PostHog product usage events triggering targeted lifecycle campaigns",
                },
                {
                  label: "Predictive scoring",
                  desc: "AI-driven lead scoring that prioritized the 20% of leads generating 80% of pipeline",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl border border-white/10 bg-white/[0.03] p-5"
                >
                  <p className="text-sm font-bold text-foreground mb-1">
                    {item.label}
                  </p>
                  <p className="text-xs text-muted leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Results by Company */}
        <section className="py-20 border-b border-white/5">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <h2 className="text-3xl font-bold text-foreground mb-10">
              Results by Company
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  company: "HeyGen",
                  start: "No SEO, no content engine, no lifecycle",
                  built:
                    "Full GTM system: SEO, community, content, lifecycle, ABM",
                  outcome:
                    "$20M to $100M ARR, 50% organic growth year-over-year",
                },
                {
                  company: "Egnyte",
                  start: "$50M marketing pipeline",
                  built:
                    "Double-funnel ABM, attribution model, ICP refinement",
                  outcome: "$250M marketing pipeline (5x), ARPA 3.4x",
                },
                {
                  company: "Semgrep",
                  start: "Early-stage demand gen",
                  built:
                    "Integrated campaigns: paid search, LinkedIn, content, webinars",
                  outcome:
                    "5x revenue growth, 500+ enterprise leads per month via webinars",
                },
              ].map((r) => (
                <article
                  key={r.company}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
                >
                  <p className="text-lg font-bold text-foreground mb-4">
                    {r.company}
                  </p>
                  <div className="space-y-3 text-sm">
                    <div>
                      <p className="text-xs font-semibold text-orange-400 uppercase tracking-wide mb-1">
                        Starting Point
                      </p>
                      <p className="text-muted">{r.start}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-orange-400 uppercase tracking-wide mb-1">
                        What We Built
                      </p>
                      <p className="text-muted">{r.built}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-orange-400 uppercase tracking-wide mb-1">
                        Outcome
                      </p>
                      <p className="text-foreground font-semibold">
                        {r.outcome}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        {/* Related Services */}
        <section className="py-16 border-b border-white/5">
          <div className="mx-auto max-w-4xl px-6 lg:px-10">
            <p className="text-sm font-semibold text-orange-400 tracking-wide uppercase mb-6">
              Related Services
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                {
                  href: "/services/growth-marketing",
                  label: "Growth Marketing",
                  desc: "Fractional VP Marketing for B2B SaaS — strategy, brand, PLG, and community.",
                },
                {
                  href: "/services/revenue-operations",
                  label: "Revenue Operations",
                  desc: "GTM systems architecture, forecasting, and pipeline analytics.",
                },
              ].map((s) => (
                <Link
                  key={s.href}
                  href={s.href}
                  className="group rounded-2xl border border-white/10 bg-white/[0.03] p-5 hover:border-white/20 hover:bg-white/[0.05] transition-all duration-300"
                >
                  <p className="text-sm font-bold text-foreground group-hover:text-orange-400 transition-colors mb-1">
                    {s.label} →
                  </p>
                  <p className="text-xs text-muted leading-relaxed">{s.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24" aria-label="Contact call to action">
          <div className="mx-auto max-w-3xl px-6 lg:px-10 text-center">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-4">
              Ready to build your{" "}
              <span className="text-orange-400">demand engine?</span>
            </h2>
            <p className="text-muted text-lg mb-8 max-w-xl mx-auto">
              Let&apos;s talk about how to create predictable, scalable
              pipeline for your business.
            </p>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-8 py-4 text-base font-semibold text-[#0B1221] hover:shadow-[0_0_30px_rgba(46,204,113,0.3)] hover:brightness-110 transition-all duration-300"
            >
              Get in Touch
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M1 7h12m0 0L8 2m5 5L8 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
