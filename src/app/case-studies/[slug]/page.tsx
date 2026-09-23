import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import RelatedCaseStudies from "@/components/RelatedCaseStudies";
import {
  DATA_DRIVEN_CASE_STUDIES,
  getCaseStudy,
} from "@/lib/case-studies";
import { SITE_CONFIG } from "@/lib/constants";

type Props = { params: Promise<{ slug: string }> };

// Only studies without a hand-built route render here. /case-studies/heygen has
// its own file, and a static segment always wins over this dynamic one.
export function generateStaticParams() {
  return DATA_DRIVEN_CASE_STUDIES.map((study) => ({ slug: study.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};

  const url = `https://${SITE_CONFIG.domain}/case-studies/${study.slug}`;

  return {
    title: `${study.metaTitle} | n+α Ventures`,
    description: study.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: study.metaTitle,
      description: study.metaDescription,
      url,
      publishedTime: study.publishDate,
      modifiedTime: study.dateModified,
    },
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study || study.hasCustomPage) notFound();

  return (
    <>
      <JsonLd
        type="Article"
        title={study.metaTitle}
        description={study.metaDescription}
        path={`/case-studies/${study.slug}`}
        datePublished={study.publishDate}
        dateModified={study.dateModified}
        faqs={study.faqs}
        breadcrumbs={[
          { name: "Home", item: "/" },
          { name: "Case Studies", item: "/case-studies" },
          { name: study.client, item: `/case-studies/${study.slug}` },
        ]}
      />
      <Navbar />
      <main id="main-content" className="pt-32 pb-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="max-w-4xl">
            <nav
              className="flex items-center gap-2 text-sm text-muted mb-8"
              aria-label="Breadcrumb"
            >
              <Link href="/" className="hover:text-foreground transition-colors">
                Home
              </Link>
              <span className="text-white/20">/</span>
              <Link
                href="/case-studies"
                className="hover:text-foreground transition-colors"
              >
                Case Studies
              </Link>
              <span className="text-white/20">/</span>
              <span className="text-foreground/60">{study.client}</span>
            </nav>

            <span className="inline-flex items-center rounded-full border border-orange-400/30 bg-orange-400/10 px-3 py-1 text-xs font-medium text-orange-400 mb-6">
              {study.badge}
            </span>
            <h1 className="text-4xl lg:text-7xl font-extrabold tracking-tight mb-8">
              {study.title}{" "}
              <span className="text-muted">{study.titleAccent}</span>
            </h1>
            <p className="text-xl lg:text-2xl text-muted leading-relaxed mb-12">
              {study.summary}
            </p>

            {/* At a glance */}
            <dl className="grid grid-cols-2 lg:grid-cols-4 gap-6 rounded-3xl border border-white/10 bg-white/[0.02] p-8 mb-16">
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

            {/* Engagement facts, useful for both readers and crawlers */}
            <dl className="grid sm:grid-cols-3 gap-6 text-sm border-y border-white/5 py-6 mb-16">
              <div>
                <dt className="text-muted mb-1">Client</dt>
                <dd className="font-semibold">
                  {study.clientUrl ? (
                    <a
                      href={study.clientUrl}
                      className="hover:text-accent transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {study.client}
                    </a>
                  ) : (
                    study.client
                  )}
                </dd>
              </div>
              <div>
                <dt className="text-muted mb-1">Role</dt>
                <dd className="font-semibold">{study.engagement}</dd>
              </div>
              <div>
                <dt className="text-muted mb-1">Industry</dt>
                <dd className="font-semibold">{study.industry}</dd>
              </div>
            </dl>

            <div className="space-y-16">
              {study.sections.map((section) => (
                <section key={section.heading}>
                  <h2 className="text-3xl font-bold mb-6">{section.heading}</h2>
                  <div className="space-y-5">
                    {section.body.map((paragraph) => (
                      <p
                        key={paragraph.slice(0, 40)}
                        className="text-muted leading-relaxed text-lg"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                  {section.bullets && (
                    <ul className="grid sm:grid-cols-3 gap-6 mt-10 list-none p-0">
                      {section.bullets.map((bullet) => (
                        <li
                          key={bullet.title}
                          className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
                        >
                          <h3 className="text-orange-400 font-bold mb-2 text-sm">
                            {bullet.title}
                          </h3>
                          <p className="text-sm text-muted leading-relaxed">
                            {bullet.text}
                          </p>
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}
            </div>

            {study.faqs.length > 0 && (
              <section className="mt-20">
                <h2 className="text-3xl font-bold mb-8">
                  Questions people ask about this work
                </h2>
                <div className="space-y-4">
                  {study.faqs.map((faq) => (
                    <details
                      key={faq.question}
                      className="group rounded-xl border border-white/[0.06] bg-white/[0.02] overflow-hidden"
                    >
                      <summary className="flex items-center justify-between gap-4 px-5 lg:px-6 py-5 cursor-pointer list-none font-semibold">
                        <h3 className="text-base font-semibold">
                          {faq.question}
                        </h3>
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
            )}

            {/* Service cross-links: the money pages this work maps to */}
            <section className="mt-20 rounded-3xl border border-white/10 bg-white/[0.02] p-8">
              <h2 className="text-sm font-bold uppercase tracking-widest text-muted mb-5">
                Services behind this engagement
              </h2>
              <div className="flex flex-wrap gap-3">
                {study.services.map((service) => (
                  <Link
                    key={service.href}
                    href={service.href}
                    className="rounded-full border border-white/10 px-5 py-2.5 text-sm font-medium hover:border-accent/40 hover:text-accent transition-colors"
                  >
                    {service.label}
                  </Link>
                ))}
                <Link
                  href={`/case-studies/${study.slug}/md`}
                  className="rounded-full border border-white/10 px-5 py-2.5 text-sm font-medium text-muted hover:border-accent/40 hover:text-accent transition-colors"
                >
                  Read as markdown
                </Link>
              </div>
            </section>

            <RelatedCaseStudies currentSlug={study.slug} />

            <div className="mt-20 text-center">
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-8 py-4 text-base font-semibold text-[#0B1221] hover:shadow-[0_0_40px_rgba(46,204,113,0.4)] hover:brightness-110 transition-all duration-300"
              >
                Apply these frameworks to your company
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
