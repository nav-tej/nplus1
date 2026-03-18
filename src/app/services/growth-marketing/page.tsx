import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DirectAnswer from "@/components/DirectAnswer";
import JsonLd from "@/components/JsonLd";
import VideoEmbed from "@/components/VideoEmbed";

export const metadata: Metadata = {
  title:
    "Fractional VP Marketing for B2B SaaS | Growth Marketing Consulting",
  description:
    "Fractional VP Marketing and growth marketing consulting for B2B SaaS companies. Nav Singh scaled HeyGen from $20M to $100M ARR. Available for Series A-C engagements in San Francisco and remote.",
  keywords: [
    "fractional VP marketing",
    "fractional CMO",
    "B2B SaaS marketing",
    "growth marketing consulting",
    "startup marketing leader",
    "San Francisco marketing consultant",
    "demand generation",
    "PLG marketing",
    "Nav Singh",
  ],
  alternates: { canonical: "https://nplusalpha.com/services/growth-marketing" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://nplusalpha.com/services/growth-marketing",
    siteName: "n+α Ventures",
    title: "Fractional VP Marketing for B2B SaaS | n+α Ventures",
    description:
      "Build the integrated growth engine that takes you from $5M to $50M ARR without a $300K full-time CMO hire.",
  },
};

const GROWTH_MARKETING_FAQS = [
  {
    question: "How is this different from hiring a marketing agency?",
    answer: "Agencies execute campaigns. I own the strategy, build the team, and take accountability for pipeline outcomes, just like a full-time VP would. I also stay long enough to make permanent hires and hand off a working system.",
  },
  {
    question: "Do you work remotely or in-person?",
    answer: "Both. I am based in San Francisco and available for on-site time with Bay Area companies. I work remotely with companies across the US and am open to traveling for workshops.",
  },
  {
    question: "What does pricing look like?",
    answer: "Engagements are monthly retainers scoped to the work. I share a pricing range on our first call after understanding your situation. Most engagements fall between $15K to $30K per month depending on hours and scope.",
  },
  {
    question: "How quickly can we see results?",
    answer: "LinkedIn and outbound programs can generate leads within 30 days. Content and SEO compound over 3 to 6 months. Pipeline attribution and demand gen results typically show material improvement by month 2 to 3.",
  },
];

export default function GrowthMarketingPage() {
  return (
    <>
      <JsonLd 
        type="Service"
        serviceType="Fractional VP Marketing"
        path="/services/growth-marketing"
        title={metadata.title as string}
        description={metadata.description as string}
        faqs={GROWTH_MARKETING_FAQS}
        video={{
          name: "The AI-Native GTM Engine: Scale B2B SaaS Past $100M ARR",
          description: "Learn the proprietary 5-pillar architecture used to scale B2B SaaS companies from $20M to $100M+ ARR.",
          thumbnailUrl: "https://img.youtube.com/vi/VT0Zgj23p1s/maxresdefault.jpg",
          uploadDate: "2026-03-17T08:00:00Z",
          contentUrl: "https://www.youtube.com/watch?v=VT0Zgj23p1s",
          embedUrl: "https://www.youtube-nocookie.com/embed/VT0Zgj23p1s",
        }}
      />
      <Navbar />
      <main id="main-content">
        {/* Hero */}
        <section className="pt-32 pb-20 border-b border-white/5">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold text-orange-400 tracking-wide uppercase mb-4">
                Growth Marketing
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground tracking-tight">
                Fractional VP Marketing for B2B SaaS
              </h1>
              <p className="mt-6 text-xl text-muted max-w-2xl leading-relaxed mb-12">
                Build the integrated growth engine that takes you from $5M to
                $50M ARR. We don&apos;t just advise—we start shipping within 
                the first 14 days. Distribution wins markets, and timing is 
                everything.
              </p>

              <DirectAnswer 
                category="Fractional Leadership"
                question="What does a Fractional VP of Marketing do for B2B SaaS?"
                answer="A Fractional VP of Marketing provides senior-level leadership and GTM strategy without the $300K+ full-time headcount cost. They own the revenue engine, from brand positioning and demand generation to scaling the marketing team and architecting AI-native distribution systems for Series A to Series C companies."
              />

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/#contact"
                  className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-[#0B1221] hover:brightness-110 transition-all duration-300"
                >
                  Book a Free Strategy Call
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

        {/* The Methodology Video */}
        <section className="py-20 border-b border-white/5 bg-white/[0.01]">
          <div className="mx-auto max-w-5xl px-6 lg:px-10 text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Our Methodology
            </h2>
            <p className="text-muted mb-10 max-w-2xl mx-auto">
              How we architect the AI-native GTM engine to drive repeatable, scalable revenue.
            </p>
            <VideoEmbed 
              videoId="VT0Zgj23p1s" 
              title="The AI-Native GTM Engine" 
            />
          </div>
        </section>

        {/* The Problem */}
        <section className="py-20 border-b border-white/5">
          <div className="mx-auto max-w-4xl px-6 lg:px-10">
            <h2 className="text-3xl font-bold text-foreground mb-6">
              The Problem I Solve
            </h2>
            <div className="space-y-5 text-[15px] text-muted leading-relaxed">
              <p>
                Most Series A and B SaaS companies hit the same wall: you have
                found product-market fit, you have a sales team starting to
                close deals, but marketing is still scattered. A mix of ad hoc
                content, one-off campaigns, and no clear attribution. You need
                senior marketing leadership, but you are not ready to commit to
                a full-time CMO at $250K to $350K plus equity.
              </p>
              <p>That is where I come in.</p>
              <p>
                I embed as your fractional VP of Marketing, owning the full
                growth motion, building the team and systems, and driving
                measurable pipeline until you are ready to hire a permanent
                leader or scale the function yourself.
              </p>
            </div>
          </div>
        </section>

        {/* What I Build */}
        <section className="py-20 border-b border-white/5">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <h2 className="text-3xl font-bold text-foreground mb-12">
              What I Build
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  title: "Brand & Positioning",
                  desc: "Every growth motion starts with clarity on who you are, who you serve, and why you win. I run rapid brand positioning sprints that get the whole GTM team aligned, then build the messaging framework that runs across every channel.",
                  bullets: [
                    "ICP definition and ideal buyer profiling",
                    "Competitive positioning and differentiation",
                    "Messaging architecture by segment and persona",
                    "Brand refresh and visual identity direction",
                  ],
                },
                {
                  title: "Demand Generation Engine",
                  desc: "I build integrated demand generation systems that create predictable pipeline, not one-off campaigns.",
                  bullets: [
                    "Content marketing strategy and production system",
                    "SEO program buildout from zero (launched HeyGen's first SEO program: 50%+ YoY organic growth, reversing a declining baseline)",
                    "Paid acquisition: LinkedIn, Google, Meta with proper attribution",
                    "Account-Based Marketing for mid-market and enterprise",
                    "Webinar and virtual event programs",
                  ],
                },
                {
                  title: "Product-Led Growth (PLG)",
                  desc: "For companies with a self-serve motion, I build the systems that convert free users into paid customers at scale.",
                  bullets: [
                    "Onboarding flow design and optimization",
                    "PQL scoring and product usage triggers",
                    "Self-serve to sales-assist transition workflows",
                    "In-app messaging and lifecycle campaigns",
                  ],
                },
                {
                  title: "Community & Ecosystem",
                  desc: "I launched a community platform at HeyGen that hit 100,000 active members in six months and drove a 30% lift in new customer acquisition.",
                  bullets: [
                    "Community platform strategy and launch",
                    "Ambassador and user champion programs",
                    "Influencer and creator partnerships",
                  ],
                },
                {
                  title: "AI-Native GTM Systems",
                  desc: "Modern growth does not mean more headcount. It means smarter systems. I build marketing operations on AI-native tooling that multiplies output per person.",
                  bullets: [
                    "AI-driven content operations and SEO",
                    "Automated lifecycle campaigns (PostHog, Customer.io, n8n)",
                    "Personalization at scale with Clay and similar tools",
                    "Predictive lead scoring and attribution modeling",
                  ],
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
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Engagement Model */}
        <section className="py-20 border-b border-white/5">
          <div className="mx-auto max-w-4xl px-6 lg:px-10">
            <h2 className="text-3xl font-bold text-foreground mb-6">
              The High-Velocity Engagement Model
            </h2>
            <p className="text-[15px] text-muted leading-relaxed mb-8">
              We operate with extreme shipping velocity. Most consultants spend the 
              first month interviewing stakeholders. We spend the first 14 days 
              shipping your first high-impact GTM experiments. Distribution wins 
              markets, and timing is your greatest competitive advantage.
            </p>
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
              {[
                {
                  period: "Week 1–2",
                  label: "Initial Shipments",
                  desc: "Rapid audit and execution of your first high-impact growth experiments.",
                },
                {
                  period: "Day 30",
                  label: "Foundation Build",
                  desc: "Full demand gen engine, content ops, and marketing systems architecture.",
                },
                {
                  period: "Day 60",
                  label: "Scale Distribution",
                  desc: "Aggressive paid channels, ABM programs, and attribution modeling.",
                },
                {
                  period: "Ongoing",
                  label: "Optimize & Hand-off",
                  desc: "Board-level reporting, hiring, and scaling for the path to $100M ARR.",
                },
              ].map((step) => (
                <div
                  key={step.period}
                  className="rounded-xl border border-white/10 bg-white/[0.03] p-5"
                >
                  <p className="text-xs font-semibold text-orange-400 uppercase tracking-wide mb-1">
                    {step.period}
                  </p>
                  <p className="text-sm font-bold text-foreground mb-1">
                    {step.label}
                  </p>
                  <p className="text-xs text-muted leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-6 text-sm text-muted italic">
              I work with 1 to 2 companies at a time to ensure full engagement
              quality. Spots are limited.
            </p>
          </div>
        </section>

        {/* Results */}
        <section className="py-20 border-b border-white/5">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <h2 className="text-3xl font-bold text-foreground mb-10">
              Results
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  company: "HeyGen",
                  results: [
                    "5x ARR growth: $20M to $100M",
                    "Complete company rebrand, 200% brand awareness increase",
                    "50%+ YoY organic traffic growth",
                    "100K community members in 6 months",
                  ],
                },
                {
                  company: "Egnyte",
                  results: [
                    "Marketing-sourced pipeline: $50M to $250M (5x)",
                    "ARPA 3.4x through ICP refinement and ABM",
                    "15-person team built and led",
                  ],
                },
                {
                  company: "Semgrep",
                  results: [
                    "5x revenue growth year-over-year",
                    "50% increase in product activation through PLG onboarding",
                    "40% customer acquisition cost reduction",
                  ],
                },
              ].map((r) => (
                <article
                  key={r.company}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
                >
                  <p className="text-lg font-bold text-foreground mb-3">
                    {r.company}
                  </p>
                  <ul className="space-y-2">
                    {r.results.map((line) => (
                      <li
                        key={line}
                        className="flex items-start gap-2 text-sm text-muted"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-orange-400 flex-shrink-0" />
                        {line}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Is This a Fit? */}
        <section className="py-20 border-b border-white/5">
          <div className="mx-auto max-w-4xl px-6 lg:px-10">
            <h2 className="text-3xl font-bold text-foreground mb-6">
              Is This a Fit?
            </h2>
            <p className="text-[15px] text-muted leading-relaxed mb-6">
              This engagement works well if you are:
            </p>
            <ul className="space-y-3 mb-8">
              {[
                "A B2B SaaS company with $3M to $30M ARR looking to scale GTM",
                "Post-Series A or Series B, building out the marketing function for the first time",
                "Running a PLG or hybrid PLG plus sales motion",
                "Looking for someone who can lead and build, not just advise",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-[15px] text-muted"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    className="text-accent flex-shrink-0 mt-0.5"
                    aria-hidden="true"
                  >
                    <path
                      d="M3 8l3 3 7-7"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-sm text-muted italic">
              It is probably not a fit if you need only tactical execution (I
              can refer you to agencies for that) or if you are
              pre-product-market fit.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 border-b border-white/5">
          <div className="mx-auto max-w-4xl px-6 lg:px-10">
            <h2 className="text-3xl font-bold text-foreground mb-10">
              Frequently Asked Questions
            </h2>
            <div className="space-y-8">
              {[
                {
                  q: "How is this different from hiring a marketing agency?",
                  a: "Agencies execute campaigns. I own the strategy, build the team, and take accountability for pipeline outcomes, just like a full-time VP would. I also stay long enough to make permanent hires and hand off a working system.",
                },
                {
                  q: "Do you work remotely or in-person?",
                  a: "Both. I am based in San Francisco and available for on-site time with Bay Area companies. I work remotely with companies across the US and am open to traveling for workshops.",
                },
                {
                  q: "What does pricing look like?",
                  a: "Engagements are monthly retainers scoped to the work. I share a pricing range on our first call after understanding your situation. Most engagements fall between $15K to $30K per month depending on hours and scope.",
                },
                {
                  q: "How quickly can we see results?",
                  a: "LinkedIn and outbound programs can generate leads within 30 days. Content and SEO compound over 3 to 6 months. Pipeline attribution and demand gen results typically show material improvement by month 2 to 3.",
                },
              ].map((faq) => (
                <div key={faq.q}>
                  <h3 className="text-base font-bold text-foreground mb-2">
                    {faq.q}
                  </h3>
                  <p className="text-sm text-muted leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Related Services */}
        <section className="py-16 border-b border-white/5">
          <div className="mx-auto max-w-4xl px-6 lg:px-10">
            <p className="text-sm font-semibold text-orange-400 tracking-wide uppercase mb-6">
              Related Services
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                {
                  href: "/services/demand-generation",
                  label: "Demand Generation",
                  desc: "ABM, content, SEO, paid, and lifecycle programs that build predictable pipeline.",
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

        {/* CTA */}
        <section className="py-24" aria-label="Contact call to action">
          <div className="mx-auto max-w-3xl px-6 lg:px-10 text-center">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-4">
              Ready to build your{" "}
              <span className="text-orange-400">growth engine?</span>
            </h2>
            <p className="text-muted text-lg mb-8 max-w-xl mx-auto">
              Let&apos;s talk about your GTM challenges and see if there is a
              fit.
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
