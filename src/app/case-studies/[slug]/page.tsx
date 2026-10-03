import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import Byline from "@/components/Byline";
import {
  DATA_DRIVEN_CASE_STUDIES,
  getCaseStudy,
} from "@/lib/case-studies";
import { SITE_CONFIG } from "@/lib/constants";
import { CASES } from "@/lib/brand-data";
import {
  AlphaCurve,
  ArtifactFrame,
  Breadcrumbs,
  CaseIndex,
  CTASection,
  MetricRow,
  MobileStickyCTA,
  Pillars,
  SectionHeader,
  TableOfContents,
  splitMetric,
} from "@/components/brand";

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
    // The root layout template appends " | n+α Ventures"; absolute stops it doubling.
    title: { absolute: `${study.metaTitle} | n+α Ventures` },
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

const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study || study.hasCustomPage) notFound();

  const card = CASES.find((c) => c.slug === study.slug);
  const more = CASES.filter((c) => c.slug !== study.slug).slice(0, 3);
  const sections = study.sections.map((sec) => ({ ...sec, id: slugify(sec.heading) }));
  const toc: [string, string][] = [
    ...(card ? ([["shape", "The shape of it"]] as [string, string][]) : []),
    ...sections.map((sec) => [sec.id, sec.heading] as [string, string]),
    ...(study.faqs.length ? ([["questions", "Questions"]] as [string, string][]) : []),
  ];

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
      <Navbar theme="paper" />
      <main id="main-content" className="na" data-theme="paper">
        <div className="na-wrap">
          <header className="na-cs-head">
            <Breadcrumbs
              items={[
                ["Home", "/"],
                ["Case studies", "/case-studies"],
                [study.client, `/case-studies/${study.slug}`],
              ]}
            />
            <h1 className="na-h1" style={{ maxWidth: 1000 }}>
              {study.title} <span className="muted">{study.titleAccent}</span>
            </h1>
            <p className="na-lede">{study.summary}</p>
            <Byline published={study.publishDate} updated={study.dateModified} />
            <dl className="na-cs-meta">
              <div>
                <dt>Client</dt>
                <dd>
                  {study.clientUrl ? (
                    <a href={study.clientUrl} target="_blank" rel="noopener noreferrer">
                      {study.client}
                    </a>
                  ) : (
                    study.client
                  )}
                </dd>
              </div>
              <div>
                <dt>Role</dt>
                <dd>{study.engagement}</dd>
              </div>
              <div>
                <dt>Years</dt>
                <dd>{study.period}</dd>
              </div>
              <div>
                <dt>Category</dt>
                <dd>{study.industry}</dd>
              </div>
            </dl>
            <MetricRow small items={study.metrics.map((m) => ({ ...splitMetric(m.value), label: m.label }))} />
          </header>
        </div>

        <div className="na-wrap na-article">
          <aside className="na-article-rail">
            <TableOfContents items={toc} />
          </aside>
          <div className="na-article-body">
            {card && (
              <section id="shape" className="na-article-sec">
                <ArtifactFrame
                  kind="Artifact 01"
                  title={card.variant === "steps" ? "Foundation, built in steps" : "Growth above a steady baseline"}
                  caption={
                    <>
                      <b>{card.metrics[0][0]}: {card.metrics[0][1]}.</b> The shape is stylized. It shows the kind of
                      result, not client data.
                    </>
                  }
                >
                  <AlphaCurve
                    values={card.curve}
                    variant={card.variant}
                    width={760}
                    height={240}
                    ariaLabel={`${study.client}: stylized ${card.variant === "steps" ? "stepped foundation build" : "growth curve above a baseline"}`}
                  />
                </ArtifactFrame>
              </section>
            )}

            {sections.map((sec) => (
              <section key={sec.id} id={sec.id} className="na-article-sec">
                <h2 className="na-h3">{sec.heading}</h2>
                <div className="na-prose">
                  {sec.body.map((paragraph) => (
                    <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                  ))}
                </div>
                {sec.bullets && <Pillars items={sec.bullets.map((b) => ({ title: b.title, body: b.text }))} />}
              </section>
            ))}

            {study.faqs.length > 0 && (
              <section id="questions" className="na-article-sec">
                <h2 className="na-h3">Questions people ask about this work</h2>
                <div className="na-faq">
                  {study.faqs.map((faq) => (
                    <details key={faq.question}>
                      <summary>
                        <h3 className="na-faq-q">{faq.question}</h3>
                      </summary>
                      <p>{faq.answer}</p>
                    </details>
                  ))}
                </div>
              </section>
            )}

            <section className="na-article-sec" aria-labelledby="services-behind">
              <span className="na-eyebrow" id="services-behind">
                Services behind this engagement
              </span>
              <div className="na-services">
                {study.services.map((service) => (
                  <a key={service.href} href={service.href}>
                    {service.label.charAt(0) + service.label.slice(1).toLowerCase()}
                  </a>
                ))}
                <a href={`/case-studies/${study.slug}/md`}>Read as markdown</a>
              </div>
            </section>
          </div>
        </div>

        <section className="na-section">
          <div className="na-wrap">
            <SectionHeader eyebrow="Keep reading" title="More work" />
            <CaseIndex cases={more} start={1} />
          </div>
        </section>
        <section className="na-section">
          <div className="na-wrap">
            <CTASection title="Want these systems at your company?" primary={["Book a GTM audit", "/book"]} />
          </div>
        </section>
        <MobileStickyCTA href="/book" />
      </main>
      <Footer />
    </>
  );
}
