import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title:
    "Revenue Operations Consulting for B2B SaaS | GTM Systems & Forecasting",
  description:
    "RevOps consulting for B2B SaaS. GTM stack design, AI-driven forecasting, pipeline analytics, Salesforce implementation. Nav Singh has architected RevOps for companies from $5M to $200M ARR.",
  keywords: [
    "revenue operations consulting",
    "RevOps consultant",
    "B2B SaaS RevOps",
    "Salesforce consultant",
    "GTM systems architecture",
    "pipeline analytics",
    "sales operations",
    "marketing operations",
    "forecasting",
    "Nav Singh",
  ],
  alternates: {
    canonical: "https://nplus1ventures.com/services/revenue-operations",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://nplus1ventures.com/services/revenue-operations",
    siteName: "nPlus1 Ventures",
    title: "Revenue Operations Consulting for B2B SaaS | nPlus1 Ventures",
    description:
      "Build the systems infrastructure that makes your GTM predictable, efficient, and scalable.",
  },
};

const RO_SCHEMA = JSON.stringify({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://nplus1ventures.com" },
        { "@type": "ListItem", position: 2, name: "Services", item: "https://nplus1ventures.com/services/revenue-operations" },
        { "@type": "ListItem", position: 3, name: "Revenue Operations", item: "https://nplus1ventures.com/services/revenue-operations" },
      ],
    },
    {
      "@type": "Service",
      "@id": "https://nplus1ventures.com/services/revenue-operations#service",
      name: "Revenue Operations Consulting",
      description: "RevOps consulting for B2B SaaS covering GTM systems architecture, AI-driven forecasting, pipeline analytics, PLG-to-sales motion design, and Salesforce/HubSpot implementation. Built for companies from $5M to $200M ARR.",
      provider: { "@id": "https://nplus1ventures.com/#organization" },
      areaServed: { "@type": "Country", name: "United States" },
      serviceType: "Revenue Operations Consulting",
      url: "https://nplus1ventures.com/services/revenue-operations",
    },
    {
      "@type": "FAQPage",
      "@id": "https://nplus1ventures.com/services/revenue-operations#faq",
      mainEntity: [
        {
          "@type": "Question",
          name: "What does a RevOps consultant actually do for a B2B SaaS company?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "A RevOps consultant designs and builds the systems, data flows, and processes that connect Marketing, Sales, and Customer Success into a single revenue engine. In practice this means GTM stack architecture, forecasting models, pipeline analytics, lead routing, attribution, and the operational logic that makes your CRM and MarTech work together. I have built these systems for companies at $5M, $50M, and $100M+ ARR.",
          },
        },
        {
          "@type": "Question",
          name: "How long does a RevOps engagement typically take?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "A full RevOps buildout typically runs 3 to 6 months: audit and architecture in month one, implementation in months two through four, and optimization and handoff in months five and six. For companies that need ongoing embedded RevOps leadership, I also offer fractional engagements where I act as your Head of RevOps on a monthly retainer.",
          },
        },
        {
          "@type": "Question",
          name: "Do you work with Salesforce, HubSpot, or both?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Both. I have implemented and optimized Salesforce at HeyGen and Egnyte, and HubSpot at earlier-stage companies. The CRM recommendation depends on your stage, sales motion, and the complexity of your data model. I also work across the broader MarTech stack: Marketo, Customer.io, Braze, PostHog, Amplitude, Snowflake, and 50+ other tools.",
          },
        },
        {
          "@type": "Question",
          name: "Is RevOps consulting worth it for a company under $10M ARR?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "At under $10M ARR, the highest-value RevOps investments are clean CRM data, basic attribution, and a simple lead routing process. A full RevOps buildout is usually premature. I offer focused diagnostic engagements for earlier-stage companies that identify the three to five highest-leverage improvements without over-building for your current scale.",
          },
        },
      ],
    },
  ],
});

export default function RevenueOperationsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: RO_SCHEMA }} />
      <Navbar />
      <main id="main-content">
        {/* Hero */}
        <section className="pt-32 pb-20 border-b border-white/5">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold text-orange-400 tracking-wide uppercase mb-4">
                Revenue Operations
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground tracking-tight">
                Revenue Operations Consulting for B2B SaaS
              </h1>
              <p className="mt-6 text-xl text-muted max-w-2xl leading-relaxed">
                Build the systems infrastructure that makes your GTM
                predictable, efficient, and scalable.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/#contact"
                  className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-[#0B1221] hover:brightness-110 transition-all duration-300"
                >
                  Book a RevOps Audit
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

        {/* What Modern RevOps Is */}
        <section className="py-20 border-b border-white/5">
          <div className="mx-auto max-w-4xl px-6 lg:px-10">
            <h2 className="text-3xl font-bold text-foreground mb-6">
              What Modern RevOps Actually Is
            </h2>
            <div className="space-y-5 text-[15px] text-muted leading-relaxed">
              <p>
                Revenue Operations is not Salesforce administration. It is the
                discipline of designing and operating the systems, data, and
                processes that connect Marketing, Sales, and Customer Success
                into a single, efficient revenue machine.
              </p>
              <p>Done right, RevOps gives you:</p>
            </div>
            <ul className="mt-4 space-y-3">
              {[
                "A single source of truth for pipeline, forecast, and revenue",
                "Predictable forecasting (I have built models achieving 95% accuracy)",
                "Faster sales cycles (reduced deal cycles by 35% through process and automation)",
                "A GTM tech stack that scales with you, not against you",
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
                  title: "GTM Systems Architecture",
                  desc: "I design the full GTM tech stack, not just tool selection, but integration architecture, data flows, and the operational logic that makes it all work together. At HeyGen, I architected the RevOps stack for 40M users and $100M ARR.",
                  bullets: [
                    "CRM implementation and optimization (Salesforce, HubSpot)",
                    "Marketing automation integration (Marketo, HubSpot, Customer.io, Braze)",
                    "Product analytics integration (PostHog, Amplitude, Mixpanel)",
                    "Data warehouse setup (Snowflake, BigQuery) and reverse ETL",
                    "50+ system integrations and migrations completed",
                  ],
                },
                {
                  title: "AI-Driven Forecasting & Pipeline Analytics",
                  desc: "I build forecasting systems that give leadership confidence in the number, not gut feels.",
                  bullets: [
                    "Predictive revenue models (95% forecast accuracy at HeyGen)",
                    "Real-time pipeline dashboards with deal health indicators",
                    "Capacity planning and hiring models tied to pipeline targets",
                    "Board-level reporting with automated KPI tracking",
                    "Scenario modeling for fundraising and planning cycles",
                  ],
                },
                {
                  title: "PLG-to-Sales Motion Design",
                  desc: "The hardest RevOps problem in modern SaaS is building the bridge between a self-serve PLG motion and an enterprise sales motion. I have done this at both Semgrep and HeyGen.",
                  bullets: [
                    "Product Qualified Lead (PQL) scoring models",
                    "Automated lead routing (reduced response time from 24 hours to 30 minutes)",
                    "Product usage triggers for sales engagement",
                    "Self-serve to sales-assist handoff workflows",
                    "Enterprise pipeline generation from PLG user base",
                  ],
                },
                {
                  title: "Pipeline & Sales Operations",
                  bullets: [
                    "Territory planning and account segmentation",
                    "Compensation design and quota setting",
                    "SLA frameworks for Marketing to Sales handoffs (improved efficiency by 60%)",
                    "CPQ implementation (reduced quote generation time by 75%)",
                    "Conversation intelligence integration (Gong, Chorus)",
                  ],
                },
                {
                  title: "Marketing & Attribution Operations",
                  bullets: [
                    "Multi-touch attribution modeling (90% coverage at scale)",
                    "Lead scoring (behavioral plus firmographic)",
                    "Data enrichment and hygiene (CRM accuracy from 60% to 95%)",
                    "Campaign analytics and budget optimization",
                    "MarTech stack rationalization (reduced costs 25%)",
                  ],
                },
                {
                  title: "Customer Success Operations",
                  bullets: [
                    "Customer health scoring (85% churn prediction accuracy)",
                    "Automated renewal playbooks (50% improvement in renewal rates)",
                    "Expansion opportunity identification systems",
                    "CS capacity planning and efficiency modeling",
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
                  {item.desc && (
                    <p className="text-sm text-muted leading-relaxed mb-4">
                      {item.desc}
                    </p>
                  )}
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

        {/* AI-Native RevOps Advantage */}
        <section className="py-20 border-b border-white/5">
          <div className="mx-auto max-w-4xl px-6 lg:px-10">
            <h2 className="text-3xl font-bold text-foreground mb-6">
              The AI-Native RevOps Advantage
            </h2>
            <p className="text-[15px] text-muted leading-relaxed mb-8">
              I approach RevOps the way the best operators in 2025 do: with AI
              embedded in every system, not bolted on afterward. At HeyGen, we
              automated 70% of previously manual processes, saving thousands of
              hours annually.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                {
                  label: "AI-driven forecasting",
                  desc: "Learns from your deal patterns, not just CRM stage probability",
                },
                {
                  label: "Automated data enrichment",
                  desc: "Via Clay, Apollo, and similar tools. Your CRM stays current without manual updates",
                },
                {
                  label: "Intelligent lead routing",
                  desc: "Uses firmographic, behavioral, and intent signals",
                },
                {
                  label: "LLM-powered reporting",
                  desc: "Surfaces insights from unstructured data: call recordings, emails, support tickets",
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

        {/* Engagement Model */}
        <section className="py-20 border-b border-white/5">
          <div className="mx-auto max-w-4xl px-6 lg:px-10">
            <h2 className="text-3xl font-bold text-foreground mb-6">
              Engagement Model
            </h2>
            <p className="text-[15px] text-muted leading-relaxed mb-8">
              RevOps engagements typically run 3 to 6 months for a full
              buildout, or on an ongoing fractional basis if you need embedded
              leadership.
            </p>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                <h3 className="text-base font-bold text-foreground mb-2">
                  Project-Based
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  Full stack audit, architecture design, implementation, and
                  handoff. Good for companies that have an ops team but need
                  senior design and direction.
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                <h3 className="text-base font-bold text-foreground mb-2">
                  Fractional
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  Ongoing monthly engagement. I act as your Head of RevOps,
                  attending leadership and board meetings, owning the stack,
                  reporting on pipeline health. Good for companies that do not
                  yet have a dedicated RevOps leader.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Results */}
        <section className="py-20 border-b border-white/5">
          <div className="mx-auto max-w-4xl px-6 lg:px-10">
            <h2 className="text-3xl font-bold text-foreground mb-8">
              Results
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                "AI-driven forecasting at HeyGen: 95% accuracy, 50% reduction in planning cycle time",
                "Data architecture handling 10M+ monthly events with real-time processing",
                "50+ system integrations and migrations completed",
                "Automated 70% of manual processes saving 10,000+ hours annually",
                "CRM data accuracy improved from 60% to 95%",
                "Predictive lead scoring at Semgrep: 35% improvement in MQL-to-SQL conversion",
                "CPQ quote generation time reduced by 75%",
                "Marketing-to-Sales handoff SLA efficiency improved by 60%",
              ].map((result) => (
                <div
                  key={result}
                  className="flex items-start gap-3 text-sm text-muted"
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
                  {result}
                </div>
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
                  href: "/services/demand-generation",
                  label: "Demand Generation",
                  desc: "ABM, content, SEO, paid, and lifecycle programs that build predictable pipeline.",
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
              Ready to audit your{" "}
              <span className="text-orange-400">RevOps stack?</span>
            </h2>
            <p className="text-muted text-lg mb-8 max-w-xl mx-auto">
              Let&apos;s talk about how to make your GTM infrastructure
              predictable, efficient, and scalable.
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
