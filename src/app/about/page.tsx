import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FOUNDER, TESTIMONIALS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Nav Singh, Founder | nPlus1 Ventures",
  description:
    "Nav Singh (Navtej Singh) is the founder of nPlus1 Ventures, a San Francisco-based B2B GTM consulting firm. 10+ years driving $500M+ in revenue growth across HeyGen, Semgrep, Egnyte, and a16z.",
  keywords: [
    "Nav Singh",
    "Navtej Singh",
    "Nav Singh San Francisco",
    "Nav Singh tech executive",
    "Nav Singh marketing executive",
    "Nav Singh startups San Francisco",
    "GTM consultant San Francisco",
    "B2B startup consultant",
    "nPlus1 Ventures founder",
    "Nav Singh revenue operations",
    "Nav Singh HeyGen",
    "Nav Singh a16z",
  ],
  alternates: { canonical: "https://nplus1ventures.com/about" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://nplus1ventures.com/about",
    siteName: "nPlus1 Ventures",
    title: "Nav Singh, Founder | nPlus1 Ventures | GTM Consulting",
    description:
      "San Francisco-based GTM executive. 10+ years, $500M+ revenue growth, $400M+ pipeline generated across HeyGen, Semgrep, Egnyte, and a16z portfolio companies.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nav Singh, Founder | nPlus1 Ventures",
    description:
      "San Francisco-based GTM executive. 10+ years, $500M+ revenue growth across HeyGen, Semgrep, Egnyte, and a16z.",
  },
};

export default function AboutPage() {
  const testimonialSubset = TESTIMONIALS.slice(0, 3);

  return (
    <>
      <Navbar />
      <main id="main-content">
        {/* ── Hero ── */}
        <section
          className="pt-32 pb-16 border-b border-white/5"
          aria-label="Nav Singh introduction"
        >
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="flex flex-col sm:flex-row gap-10 items-start">
              <Image
                src="/nav-singh.jpg"
                alt="Nav Singh, Founder & Managing Partner of nPlus1 Ventures"
                width={96}
                height={96}
                className="flex-shrink-0 w-24 h-24 rounded-full object-cover ring-2 ring-white/10"
                priority
              />

              {/* Identity */}
              <div className="flex-1">
                <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground tracking-tight">
                  {FOUNDER.name}
                </h1>
                <p className="mt-2 text-lg font-semibold text-orange-400">
                  {FOUNDER.title}
                </p>
                <p className="mt-1 text-sm text-muted">
                  {FOUNDER.location} · nPlus1 Ventures
                </p>

                {/* Social + CTA */}
                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href={FOUNDER.linkedin}
                    target="_blank"
                    rel="me noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold text-foreground hover:border-orange-400/60 hover:text-orange-400 transition-colors"
                  >
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                    LinkedIn
                  </a>
                  <a
                    href={FOUNDER.twitter}
                    target="_blank"
                    rel="me noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold text-foreground hover:border-orange-400/60 hover:text-orange-400 transition-colors"
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 300 300"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M178.57 127.15 290.27 0h-26.46l-97.03 110.38L89.34 0H0l117.13 166.93L0 300.25h26.46l102.4-116.59 81.8 116.59h89.34M36.01 19.54H76.66l187.13 262.13h-40.66" />
                    </svg>
                    @navtejs
                  </a>
                  <Link
                    href="/#contact"
                    className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-[#0B1221] hover:brightness-110 transition-all duration-300"
                  >
                    Work Together →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Bio ── */}
        <section
          className="py-16 border-b border-white/5"
          aria-label="About Nav Singh"
        >
          <div className="mx-auto max-w-4xl px-6 lg:px-10 space-y-5 text-[15px] text-muted leading-relaxed">
            <p>
              <strong className="text-foreground">Nav Singh</strong> is a
              San&nbsp;Francisco-based marketing and revenue operations executive
              with over a decade of experience scaling B2B technology companies
              from early growth through market leadership. Professionally also
              known as{" "}
              <strong className="text-foreground">Navtej Singh</strong>, Nav
              founded <strong className="text-foreground">nPlus1 Ventures</strong>{" "}
              to bring operator-grade GTM expertise directly to ambitious startups
              and growth-stage companies.
            </p>
            <p>
              Most recently, Nav served as Head of Revenue Operations at{" "}
              <strong className="text-foreground">HeyGen</strong>, where he
              drove 5× ARR growth from $20M to over $100M and reported directly
              to the CEO. Before that, he led revenue operations at{" "}
              <strong className="text-foreground">Semgrep</strong>, hitting 5×
              year-over-year revenue growth and cutting customer acquisition
              costs by 40%. At{" "}
              <strong className="text-foreground">Egnyte</strong>, he built a
              15-person marketing operations team and grew marketing-sourced
              pipeline from $50M to $250M. Earlier in his career, Nav spent
              several years as a Partner at{" "}
              <strong className="text-foreground">
                Andreessen Horowitz&nbsp;(a16z)
              </strong>
              , working directly with more than 20 portfolio companies on their
              go-to-market strategy.
            </p>
            <p>
              Navtej Singh started nPlus1 Ventures to give venture-backed
              startups and PE portfolio companies access to the same GTM
              playbook that helped scale category leaders. He works directly
              with{" "}
              <strong className="text-foreground">startup founders</strong>,{" "}
              <strong className="text-foreground">venture investors</strong>,
              and{" "}
              <strong className="text-foreground">private equity teams</strong>{" "}
              to build revenue engines that grow over time, not just campaigns
              that burn through budget.
            </p>
          </div>
        </section>

        {/* ── Impact Stats ── */}
        <section
          className="py-14 border-b border-white/5"
          aria-label="Impact metrics"
        >
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {FOUNDER.stats.map((stat) => (
                <div key={stat.label}>
                  <p className="text-3xl sm:text-4xl font-extrabold text-orange-400">
                    {stat.value}
                  </p>
                  <p className="mt-1.5 text-sm text-muted">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Experience ── */}
        <section
          className="py-20 border-b border-white/5"
          aria-label="Work experience"
        >
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <h2 className="text-2xl font-bold text-foreground mb-10">
              GTM Leadership in San Francisco &amp; Beyond
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {FOUNDER.experience.map((exp) => (
                <article
                  key={exp.company}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 hover:border-orange-400/25 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <p className="text-lg font-bold text-foreground">
                        {exp.company}
                      </p>
                      <p className="text-sm text-muted">{exp.role}</p>
                    </div>
                    <span className="flex-shrink-0 mt-0.5 text-xs font-semibold text-orange-400 bg-orange-400/10 px-3 py-1 rounded-full whitespace-nowrap">
                      {exp.highlight}
                    </span>
                  </div>
                  <p className="text-xs text-muted/60 mb-3">
                    {exp.period} · {exp.location}
                  </p>
                  <p className="text-sm text-muted leading-relaxed">
                    {exp.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── Advisory + Certs ── */}
        <section
          className="py-16 border-b border-white/5"
          aria-label="Advisory and certifications"
        >
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="flex flex-col md:flex-row gap-12">
              <div className="flex-1">
                <h2 className="text-xl font-bold text-foreground mb-3">
                  Advisory &amp; Investments
                </h2>
                <p className="text-sm text-muted mb-5 max-w-xs">
                  Nav advises early-stage B2B SaaS companies across enterprise
                  software, developer tools, and AI infrastructure.
                </p>
                <div className="flex flex-wrap gap-2">
                  {[...FOUNDER.advisory, "10+ B2B SaaS companies"].map(
                    (co) => (
                      <span
                        key={co}
                        className="text-sm font-medium text-foreground bg-white/[0.05] border border-white/10 px-3 py-1.5 rounded-full"
                      >
                        {co}
                      </span>
                    )
                  )}
                </div>
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-foreground mb-3">
                  Platforms &amp; Certifications
                </h2>
                <p className="text-sm text-muted mb-5 max-w-xs">
                  Certified and deeply experienced across the modern B2B MarTech
                  and RevOps stack.
                </p>
                <div className="flex flex-wrap gap-2">
                  {FOUNDER.certifications.map((cert) => (
                    <span
                      key={cert}
                      className="text-sm font-medium text-muted bg-white/[0.03] border border-white/10 px-3 py-1.5 rounded-full"
                    >
                      {cert}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Why nPlus1 ── */}
        <section
          className="py-20 border-b border-white/5"
          aria-label="Why work with nPlus1 Ventures"
        >
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Building Revenue Engines from $0–$200M+
            </h2>
            <p className="text-muted mb-10 max-w-2xl">
              What makes working with Nav different: operators who have done it,
              not advisors who theorize about it.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: "Operator, Not Just Advisor",
                  body: "Nav has built and led GTM functions inside high-growth companies. Every framework is battle-tested from first-hand experience, not theory.",
                },
                {
                  title: "Hands-On Through Execution",
                  body: "Strategy without execution is wallpaper. Nav and the nPlus1 team stay involved through implementation so deliverables become results.",
                },
                {
                  title: "Founder & Investor Fluent",
                  body: "With a background spanning a16z and multiple high-growth startups, Nav speaks the language of founders, VCs, and board members.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
                >
                  <h3 className="font-bold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted leading-relaxed">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Testimonials teaser ── */}
        <section
          className="py-20 border-b border-white/5"
          aria-label="Client testimonials"
        >
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <h2 className="text-2xl font-bold text-foreground mb-10">
              What clients say
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {testimonialSubset.map((t) => (
                <blockquote
                  key={t.company}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 flex flex-col gap-4"
                >
                  <p className="text-sm text-muted leading-relaxed flex-1">
                    &ldquo;
                    {t.quote.length > 220
                      ? t.quote.slice(0, 220) + "\u2026"
                      : t.quote}
                    &rdquo;
                  </p>
                  <footer className="text-sm font-semibold text-foreground">
                    {t.company}
                  </footer>
                </blockquote>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="py-24" aria-label="Contact call to action">
          <div className="mx-auto max-w-3xl px-6 lg:px-10 text-center">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-4">
              Working with a VC-backed startup or{" "}
              <span className="text-orange-400">PE portfolio company?</span>
            </h2>
            <p className="text-muted text-lg mb-8 max-w-xl mx-auto">
              Nav works directly with founders, investors, and executive teams.
              No pitch decks, just a conversation about fit.
            </p>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-8 py-4 text-base font-semibold text-[#0B1221] hover:shadow-[0_0_30px_rgba(46,204,113,0.3)] hover:brightness-110 transition-all duration-300"
            >
              Get in Touch →
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
