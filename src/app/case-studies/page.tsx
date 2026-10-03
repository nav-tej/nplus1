import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { CASE_STUDIES } from "@/lib/case-studies";
import { SITE_CONFIG } from "@/lib/constants";
import { CASES } from "@/lib/brand-data";
import { Breadcrumbs, CaseIndex, CaseStudyCard, CTASection, MobileStickyCTA } from "@/components/brand";

const TITLE = "B2B SaaS Growth & SEO Case Studies";
const DESCRIPTION =
  "Case studies from inside the work: scaling HeyGen from $20M to $100M+ ARR, rebuilding organic growth and analytics at Comfy, and building an AI-agent SEO engine at Charta Health.";

export const metadata: Metadata = {
  // The root layout template appends " | n+α Ventures"; absolute stops it doubling.
  title: { absolute: `${TITLE} | n+α Ventures` },
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
      <main id="main-content" className="na">
        <div className="na-wrap">
          <header className="na-cs-head">
            <Breadcrumbs
              items={[
                ["Home", "/"],
                ["Case studies", "/case-studies"],
              ]}
            />
            <h1 className="na-h1" style={{ maxWidth: 1000 }}>
              The work, <span className="muted">with the numbers attached.</span>
            </h1>
            <p className="na-lede">
              Every engagement below was run hands-on, not advised from the outside. Each one covers what the company
              looked like on day one, what we built, and what moved.
            </p>
          </header>
          <div className="na-cards" style={{ marginBottom: 8 }}>
            <CaseStudyCard index="01" wide headingLevel={2} {...CASES[0]} />
          </div>
          <CaseIndex cases={CASES.slice(1)} start={2} />
        </div>
        <section className="na-section" style={{ marginTop: 64 }}>
          <div className="na-wrap">
            <CTASection
              title="Your funnel, with the same treatment."
              body="I work with two or three companies at a time. If the problems above sound like yours, tell me where it is stuck."
              primary={["Book a GTM audit", "/book"]}
            />
          </div>
        </section>
        <MobileStickyCTA href="/book" />
      </main>
      <Footer />
    </>
  );
}
