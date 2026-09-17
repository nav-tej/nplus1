import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { CASE_STUDIES } from "@/lib/case-studies";
import { SITE_CONFIG } from "@/lib/constants";

const TITLE = "B2B SaaS Growth & SEO Case Studies";
const DESCRIPTION =
  "Case studies from inside the work: scaling HeyGen from $20M to $100M+ ARR, rebuilding organic growth and analytics at Comfy, and building an AI-agent SEO engine at Charta Health.";

export const metadata: Metadata = {
  title: `${TITLE} | n+α Ventures`,
  description: DESCRIPTION,
  alternates: { canonical: `https://${SITE_CONFIG.domain}/case-studies` },
  openGraph: {
    title: `${TITLE} | n+α Ventures`,
    description: DESCRIPTION,
    url: `https://${SITE_CONFIG.domain}/case-studies`,
  },
};

export default function CaseStudiesIndexPage() {
  const itemList = CASE_STUDIES.map((study) => ({
    name: `${study.client}: ${study.metaTitle}`,
    url: `https://${SITE_CONFIG.domain}/case-studies/${study.slug}`,
  }));

  return (
    <>
      <JsonLd
        type="CollectionPage"
        title={TITLE}
        description={DESCRIPTION}
        path="/case-studies"
        itemList={itemList}
        breadcrumbs={[
          { name: "Home", item: "/" },
          { name: "Case Studies", item: "/case-studies" },
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
            <span className="text-foreground/60">Case Studies</span>
          </nav>

          <div className="max-w-3xl">
            <p className="text-accent text-sm font-medium tracking-wider uppercase mb-4">
              Case Studies
            </p>
            <h1 className="text-4xl lg:text-6xl font-extrabold tracking-tight mb-6">
              The work,{" "}
              <span className="text-muted">with the numbers attached.</span>
            </h1>
            <p className="text-lg lg:text-xl text-muted leading-relaxed">
              Every engagement below was run hands-on, not advised from the
              outside. Each one covers what the company looked like on day one,
              what we built, and what moved.
            </p>
          </div>

          <div className="mt-16 grid gap-6 lg:gap-8">
            {CASE_STUDIES.map((study) => (
              <article
                key={study.slug}
                className="group relative rounded-3xl border border-white/10 bg-white/[0.02] p-8 lg:p-10 transition-colors hover:border-accent/30 hover:bg-white/[0.04]"
              >
                <div className="flex flex-wrap items-center gap-3 mb-5">
                  <span className="inline-flex items-center rounded-full border border-orange-400/30 bg-orange-400/10 px-3 py-1 text-xs font-medium text-orange-400">
                    {study.badge}
                  </span>
                  <span className="text-xs text-muted">{study.industry}</span>
                  <span className="text-white/20">·</span>
                  <span className="text-xs text-muted">{study.period}</span>
                </div>

                <h2 className="text-2xl lg:text-4xl font-bold tracking-tight mb-4">
                  <Link
                    href={`/case-studies/${study.slug}`}
                    className="before:absolute before:inset-0 hover:text-accent transition-colors"
                  >
                    {study.client}: {study.titleAccent}
                  </Link>
                </h2>

                <p className="text-muted leading-relaxed max-w-3xl mb-8">
                  {study.summary}
                </p>

                <dl className="grid grid-cols-2 lg:grid-cols-4 gap-6 border-t border-white/5 pt-8">
                  {study.metrics.map((metric) => (
                    <div key={metric.label}>
                      <dt className="sr-only">{metric.label}</dt>
                      <dd>
                        <span className="block text-2xl lg:text-3xl font-extrabold text-accent">
                          {metric.value}
                        </span>
                        <span className="block text-xs text-muted mt-1 leading-snug">
                          {metric.label}
                        </span>
                      </dd>
                    </div>
                  ))}
                </dl>

                <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-foreground group-hover:text-accent transition-colors">
                  Read the case study
                  <span aria-hidden="true">→</span>
                </span>
              </article>
            ))}
          </div>

          <div className="mt-20 rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-accent/[0.06] p-10 lg:p-14 text-center">
            <h2 className="text-2xl lg:text-3xl font-bold mb-3">
              Your funnel, with the same treatment.
            </h2>
            <p className="text-muted max-w-xl mx-auto mb-8">
              I work with two or three companies at a time. If the problems
              above sound like yours, tell me where it is stuck.
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
