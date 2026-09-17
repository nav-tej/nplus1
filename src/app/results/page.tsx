import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { CASE_STUDIES } from "@/lib/case-studies";
import { FOUNDER, SITE_CONFIG, TESTIMONIALS } from "@/lib/constants";

const TITLE = "Results";
const DESCRIPTION =
  "Every number behind n+α Ventures in one place: $500M+ in revenue growth, $400M+ in sourced pipeline, and the engagements each figure came from.";

export const metadata: Metadata = {
  title: `${TITLE}: The Numbers Behind the Work | n+α Ventures`,
  description: DESCRIPTION,
  alternates: { canonical: `https://${SITE_CONFIG.domain}/results` },
  openGraph: {
    title: `${TITLE}: The Numbers Behind the Work`,
    description: DESCRIPTION,
    url: `https://${SITE_CONFIG.domain}/results`,
  },
};

const FAQS = [
  {
    question: "What size company do you usually work with?",
    answer:
      "B2B companies between roughly $1M and $100M ARR, most often after product-market fit and before the GTM function has been properly built. Below that the constraint is usually the product. Above it you want a permanent team, and the right move is hiring, not consulting.",
  },
  {
    question: "How quickly do results show up?",
    answer:
      "Measurement and operations work lands in weeks, because a definition or a fixed funnel step takes effect the day it ships. Organic and category work takes quarters. Any consultant promising compounding search results inside a quarter is selling you something.",
  },
  {
    question: "Do you do the work or advise on it?",
    answer:
      "I do it. Every engagement on this page was run hands-on, most of them from inside the company as an operator rather than from the outside as an advisor. That is the whole reason the numbers below exist.",
  },
];

export default function ResultsPage() {
  return (
    <>
      <JsonLd
        type="WebPage"
        title={`${TITLE}: The Numbers Behind the Work`}
        description={DESCRIPTION}
        path="/results"
        faqs={FAQS}
        breadcrumbs={[
          { name: "Home", item: "/" },
          { name: "Results", item: "/results" },
        ]}
      />
      <Navbar />
      <main id="main-content" className="pt-32 pb-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <nav
            className="flex items-center gap-2 text-sm text-muted mb-8"
            aria-label="Breadcrumb"
          >
            <Link href="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
            <span className="text-white/20">/</span>
            <span className="text-foreground/60">Results</span>
          </nav>

          <div className="max-w-3xl">
            <p className="text-accent text-sm font-medium tracking-wider uppercase mb-4">
              Results
            </p>
            <h1 className="text-4xl lg:text-6xl font-extrabold tracking-tight mb-6">
              Ten years of work,{" "}
              <span className="text-muted">totaled up.</span>
            </h1>
            <p className="text-lg lg:text-xl text-muted leading-relaxed">
              Consultants quote numbers without saying where they came from.
              Here is every figure I use, and the engagement behind each one.
            </p>
          </div>

          {/* Career totals */}
          <dl className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-6">
            {FOUNDER.stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-3xl border border-white/10 bg-white/[0.02] p-8"
              >
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <span className="block text-3xl lg:text-5xl font-extrabold text-accent">
                    {stat.value}
                  </span>
                  <span className="block text-sm text-muted mt-2 leading-snug">
                    {stat.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>

          {/* Per-engagement breakdown */}
          <section className="mt-24">
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mb-4">
              Where the numbers come from
            </h2>
            <p className="text-muted max-w-2xl mb-12">
              Each row links to the case study explaining what was built, in
              what order, and what it cost to learn.
            </p>

            <div className="space-y-6">
              {CASE_STUDIES.map((study) => (
                <div
                  key={study.slug}
                  className="rounded-3xl border border-white/10 bg-white/[0.02] p-8"
                >
                  <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2 mb-6">
                    <h3 className="text-xl font-bold">
                      <Link
                        href={`/case-studies/${study.slug}`}
                        className="hover:text-accent transition-colors"
                      >
                        {study.client}
                      </Link>
                    </h3>
                    <span className="text-sm text-muted">
                      {study.engagement}
                    </span>
                    <span className="text-white/20">·</span>
                    <span className="text-sm text-muted">{study.period}</span>
                  </div>
                  <dl className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                    {study.metrics.map((metric) => (
                      <div key={metric.label}>
                        <dt className="sr-only">{metric.label}</dt>
                        <dd>
                          <span className="block text-2xl font-extrabold text-accent">
                            {metric.value}
                          </span>
                          <span className="block text-xs text-muted mt-1 leading-snug">
                            {metric.label}
                          </span>
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              ))}
            </div>
          </section>

          {/* What clients said */}
          <section className="mt-24">
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mb-12">
              In their words
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {TESTIMONIALS.map((testimonial) => (
                <blockquote
                  key={testimonial.company}
                  className="rounded-3xl border border-white/10 bg-white/[0.02] p-8"
                >
                  <p className="text-muted leading-relaxed mb-6">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                  <footer className="text-sm font-semibold text-accent">
                    {testimonial.company}
                  </footer>
                </blockquote>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section className="mt-24 max-w-3xl">
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mb-8">
              Before you ask
            </h2>
            <div className="space-y-4">
              {FAQS.map((faq) => (
                <details
                  key={faq.question}
                  className="group rounded-xl border border-white/[0.06] bg-white/[0.02] overflow-hidden"
                >
                  <summary className="flex items-center justify-between gap-4 px-5 lg:px-6 py-5 cursor-pointer list-none">
                    <h3 className="text-base font-semibold">{faq.question}</h3>
                    <span className="text-accent text-xl transition-transform duration-300 group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <div className="px-5 lg:px-6 pb-5 lg:pb-6 text-muted leading-relaxed">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </section>

          <div className="mt-24 rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-accent/[0.06] p-10 lg:p-14 text-center">
            <h2 className="text-2xl lg:text-3xl font-bold mb-3">
              Want your company on this page?
            </h2>
            <p className="text-muted max-w-xl mx-auto mb-8">
              I take on two or three engagements at a time. Tell me where your
              funnel is stuck and I will tell you whether I am the right person
              for it.
            </p>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-8 py-4 text-base font-semibold text-[#0B1221] hover:shadow-[0_0_40px_rgba(46,204,113,0.4)] hover:brightness-110 transition-all duration-300"
            >
              Start a conversation
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
