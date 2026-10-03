import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import {
  Breadcrumbs,
  CTASection,
  MobileStickyCTA,
  ProcessSteps,
  SectionHeader,
} from "@/components/brand";
import { ENGAGEMENTS, ENGAGEMENT_TERMS, SERVICE_AREAS, SITE_CONFIG } from "@/lib/constants";

const TITLE = "Fractional VP Marketing, GTM Systems and Advisory for B2B SaaS";
const DESCRIPTION =
  "Three ways to work with Nav Singh: a fractional VP Marketing + RevOps seat, a scoped GTM system build, or weekly advisory. Every engagement starts with a three-month commitment.";
const URL = `https://${SITE_CONFIG.domain}/services`;

const SERVICE_FAQS = [
  {
    question: "Which engagement fits?",
    answer:
      "Start with the gap. If you have no GTM leader yet, the fractional seat. If you have a leader but a missing system, a build. If you have a strong team that wants a second opinion every week, advisory. Most companies start with the 15-minute call and we work it out there.",
  },
  {
    question: "How is this different from hiring an agency?",
    answer:
      "Agencies execute campaigns. I own the strategy and the system, run it with your team, and stay long enough to hire the people who take it over.",
  },
  {
    question: "Do you work remotely or in person?",
    answer:
      "Both. I am based in San Francisco and available for on-site time with Bay Area companies. I work remotely with companies across the US and travel for workshops.",
  },
  {
    question: "How do you charge?",
    answer:
      "A monthly fee with a three-month minimum, scoped to the engagement type. For companies I believe in, I take part of the fee as equity. I share numbers on the first call.",
  },
];

export const metadata: Metadata = {
  // The root layout template appends " | n+α Ventures"; absolute stops it doubling.
  title: { absolute: `${TITLE} | n+α Ventures` },
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: { title: `${TITLE} | n+α Ventures`, description: DESCRIPTION, url: URL },
};

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        type="Service"
        serviceType="Go-to-market consulting for B2B SaaS"
        title={TITLE}
        description={DESCRIPTION}
        path="/services"
        faqs={SERVICE_FAQS}
        breadcrumbs={[
          { name: "Home", item: "/" },
          { name: "Services", item: "/services" },
        ]}
      />
      <Navbar />
      <main id="main-content" className="na">
        <div className="na-wrap">
          <header className="na-cs-head">
            <Breadcrumbs
              items={[
                ["Home", "/"],
                ["Services", "/services"],
              ]}
            />
            <h1 className="na-h1" style={{ maxWidth: 1000 }}>
              Three ways to work together. <span className="muted">One person doing the work.</span>
            </h1>
            <p className="na-lede">
              I take two or three companies at a time. Every engagement starts with the same diagnosis and ends with a
              system your team owns. What changes is how much of my week goes into your company.
            </p>
          </header>
        </div>

        <section className="na-section flush" aria-labelledby="engagements-heading">
          <div className="na-wrap">
            <SectionHeader id="engagements-heading" index="01" eyebrow="Engagements" title="Pick the shape of the work." />
            <div className="na-pillars">
              {ENGAGEMENTS.map((e, i) => (
                <div className="na-pillar" id={e.id} key={e.id}>
                  <div className="na-pillar-n na-num">{String(i + 1).padStart(2, "0")}</div>
                  <div>
                    <h3 className="na-pillar-t">{e.label}</h3>
                    <span className="na-eyebrow">{e.terms}</span>
                  </div>
                  <p>
                    {e.summary} {e.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="na-section" aria-labelledby="areas-heading">
          <div className="na-wrap">
            <SectionHeader
              id="areas-heading"
              index="02"
              eyebrow="What the work covers"
              title="Three functions, run as one system."
              lede="Most companies need two of these at once. The engagement decides how deep I go in each."
            />
            <div className="na-pillars">
              {SERVICE_AREAS.map((a, i) => (
                <div className="na-pillar" id={a.id} key={a.id}>
                  <div className="na-pillar-n na-num">{String(i + 1).padStart(2, "0")}</div>
                  <h3 className="na-pillar-t">{a.label}</h3>
                  <p>{a.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="na-section" aria-labelledby="process-heading">
          <div className="na-wrap">
            <SectionHeader
              id="process-heading"
              index="03"
              eyebrow="How it runs"
              title="Diagnose, architect, accelerate."
              lede="A milestone every two weeks, whichever engagement you choose."
            />
            <ProcessSteps />
          </div>
        </section>

        <section id="terms" className="na-section" aria-labelledby="terms-heading">
          <div className="na-wrap">
            <SectionHeader id="terms-heading" index="04" eyebrow="Terms" title="How engagements are priced." />
            <div className="na-pillars">
              {ENGAGEMENT_TERMS.map((t, i) => (
                <div className="na-pillar" key={t.title}>
                  <div className="na-pillar-n na-num">{String(i + 1).padStart(2, "0")}</div>
                  <h3 className="na-pillar-t">{t.title}</h3>
                  <p>{t.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="na-section" aria-labelledby="services-faq-heading">
          <div className="na-wrap">
            <SectionHeader id="services-faq-heading" index="05" eyebrow="FAQ" title="Before the first call." />
            <div className="na-faq">
              {SERVICE_FAQS.map((faq) => (
                <details key={faq.question}>
                  <summary>
                    <h3 className="na-faq-q">{faq.question}</h3>
                  </summary>
                  <p>{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="na-section">
          <div className="na-wrap">
            <CTASection
              title="Tell me where the funnel is stuck."
              body="A 15-minute call. You bring the numbers, I tell you which engagement fits, or whether you need one at all."
              primary={["Book a GTM audit", SITE_CONFIG.calendarLink]}
            />
          </div>
        </section>
        <MobileStickyCTA href={SITE_CONFIG.calendarLink} />
      </main>
      <Footer />
    </>
  );
}
