import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "How HeyGen Grew from $20M to $100M ARR | GTM Case Study",
  description:
    "How Nav Singh helped scale HeyGen from $20M to $100M ARR through integrated marketing, rebrand, SEO, community-led growth, and lifecycle automation. Full GTM case study.",
  keywords: [
    "HeyGen case study",
    "B2B SaaS growth case study",
    "HeyGen ARR growth",
    "GTM case study",
    "community-led growth",
    "AI startup marketing",
    "Nav Singh HeyGen",
    "revenue operations case study",
  ],
  alternates: {
    canonical: "https://nplus1ventures.com/case-studies/heygen",
  },
  openGraph: {
    type: "article",
    locale: "en_US",
    url: "https://nplus1ventures.com/case-studies/heygen",
    siteName: "nPlus1 Ventures",
    title: "How HeyGen Scaled from $20M to $100M ARR | nPlus1 Ventures",
    description:
      "The GTM playbook behind one of AI's fastest-growing companies. Full case study on rebrand, SEO, community, ABM, and lifecycle automation.",
  },
};

const RESULTS = [
  { metric: "5x", label: "ARR growth: $20M to $100M+" },
  { metric: "200%", label: "Increase in brand awareness" },
  { metric: "50%+", label: "YoY organic traffic growth, reversing a declining baseline" },
  { metric: "100K", label: "Community members in 6 months" },
  { metric: "$XXM", label: "ABM pipeline, 25% win rate improvement" },
  { metric: "50%", label: "Improvement in customer retention" },
  { metric: "200%", label: "Increase in international revenue" },
  { metric: "1M+", label: "Organic views per month" },
];

export default function HeyGenCaseStudyPage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        {/* Hero */}
        <section className="pt-32 pb-20 border-b border-white/5">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold text-orange-400 tracking-wide uppercase mb-4">
                Case Study
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground tracking-tight">
                How HeyGen Scaled from $20M to $100M ARR
              </h1>
              <p className="mt-6 text-xl text-muted max-w-2xl leading-relaxed">
                The GTM playbook behind one of AI&apos;s fastest-growing
                companies.
              </p>
            </div>

            {/* Meta bar */}
            <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {[
                { label: "Company", value: "HeyGen" },
                { label: "Role", value: "Head of Revenue Operations & Growth" },
                { label: "Duration", value: "April 2024 - Jan 2026" },
                { label: "ARR at Start", value: "~$20M" },
                { label: "ARR at End", value: "$100M+" },
              ].map((item) => (
                <div key={item.label}>
                  <p className="text-xs font-semibold text-orange-400 uppercase tracking-wide mb-1">
                    {item.label}
                  </p>
                  <p className="text-sm font-semibold text-foreground">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* The Challenge */}
        <section className="py-20 border-b border-white/5">
          <div className="mx-auto max-w-4xl px-6 lg:px-10">
            <h2 className="text-3xl font-bold text-foreground mb-6">
              The Challenge
            </h2>
            <div className="space-y-5 text-[15px] text-muted leading-relaxed">
              <p>
                HeyGen had product-market fit and strong organic traction, but
                the GTM motion was not built to scale. There was no SEO program,
                no structured content engine, no community, no lifecycle
                automation, and no clear segmentation across the company&apos;s
                fast-growing user base.
              </p>
              <p>
                When I joined, HeyGen had 15-20 million registered users
                globally but fewer than 1 million were regularly active. The product had
                viral reach but was not converting or retaining at the rate the
                growth required. The brand also needed to evolve. HeyGen had
                outgrown its early positioning and needed a rebrand that
                reflected its ambition and market leadership.
              </p>
            </div>
          </div>
        </section>

        {/* What We Built */}
        <section className="py-20 border-b border-white/5">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <h2 className="text-3xl font-bold text-foreground mb-12">
              What We Built
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  title: "2 Full Company Rebrands",
                  desc: "Led two end-to-end rebranding initiatives at HeyGen: each required rebuilding the visual identity, messaging architecture, and market positioning from scratch. The result was a 200% increase in brand awareness metrics and a repositioning that made HeyGen credible as an enterprise AI platform, not just a consumer-friendly video tool.",
                },
                {
                  title: "5 Major Product Launches",
                  desc: "Drove go-to-market for five major product launches spanning new product lines, expansion into enterprise, and international markets. Each launch included launch strategy, sales enablement, co-marketing, lifecycle activation, and cross-channel campaign execution.",
                },
                {
                  title: "SEO From Zero",
                  desc: "Built and launched HeyGen's first structured SEO program from a declining organic baseline. Full keyword strategy, technical SEO foundation, content production system, and link-building program. Result: 50%+ year-over-year organic traffic growth.",
                },
                {
                  title: "Community Platform: 100K Members in 6 Months",
                  desc: "Designed and launched a community platform that became the hub for HeyGen power users: creators, marketers, and enterprise teams. 100,000 active members in 6 months. The community drove a 30% lift in new customer acquisition through peer education, events, and word-of-mouth referrals.",
                },
                {
                  title: "Localization & International Expansion",
                  desc: "Led the localization strategy that expanded HeyGen into 5 new international markets. Result: 200% increase in international revenue.",
                },
                {
                  title: "Content Machine",
                  desc: "Built content operations that scaled HeyGen's production to 50+ pieces per month, generating over 1 million organic views. This content engine fed SEO, social, email, and partner channels.",
                },
                {
                  title: "Enterprise ABM & Signal-Based Outbound",
                  desc: "Built a full ABM motion targeting Global 2000 accounts across Agency, L&D, and API/LiveAvatar segments, plus a signal-based outbound program that used intent data and product signals to trigger automated and SDR-led sequences. Result: $XXM in enterprise pipeline, with win rates improving 25% through dedicated sales enablement and enterprise marketing collateral.",
                },
                {
                  title: "Lifecycle & Retention",
                  desc: "Implemented HeyGen's first automated lifecycle campaigns using PostHog and Customer.io across social, ads, email, and in-app messaging. 50% improvement in customer retention. Upsell and cross-sell programs expanded revenue from existing accounts by 30%.",
                },
                {
                  title: "RevOps Architecture",
                  desc: "Architected the full revenue operations stack: Salesforce, Customer.io, Gong, Polytomic, and PostHog integrated into a unified data architecture handling 10M+ monthly events. Built AI-driven forecasting achieving 95% accuracy.",
                },
              ].map((item) => (
                <article
                  key={item.title}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-7"
                >
                  <h3 className="text-lg font-bold text-foreground mb-3">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted leading-relaxed">
                    {item.desc}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Results */}
        <section className="py-20 border-b border-white/5">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <h2 className="text-3xl font-bold text-foreground mb-10">
              The Results
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {RESULTS.map((r) => (
                <div
                  key={r.label}
                  className="rounded-xl border border-white/10 bg-white/[0.03] p-5 text-center"
                >
                  <p className="text-2xl sm:text-3xl font-extrabold text-orange-400 mb-1">
                    {r.metric}
                  </p>
                  <p className="text-xs text-muted leading-relaxed">
                    {r.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24" aria-label="Contact call to action">
          <div className="mx-auto max-w-3xl px-6 lg:px-10 text-center">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-4">
              Let&apos;s build something like this{" "}
              <span className="text-orange-400">for your company.</span>
            </h2>
            <p className="text-muted text-lg mb-8 max-w-xl mx-auto">
              Whether you are scaling from $5M to $50M ARR or building your GTM
              engine from scratch, I can help.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
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
              <Link
                href="/services/growth-marketing"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-8 py-4 text-base font-semibold text-foreground hover:border-orange-400/60 hover:text-orange-400 transition-colors"
              >
                View Services
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
