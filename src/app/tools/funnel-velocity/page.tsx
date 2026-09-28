import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import VelocityCalculator from "@/components/VelocityCalculator";
import JsonLd from "@/components/JsonLd";
import { Button, CTASection, Eyebrow, MobileStickyCTA } from "@/components/brand";
import { SITE_CONFIG } from "@/lib/constants";

const BOOK = SITE_CONFIG.calendarLink;

const TITLE = "SaaS Funnel Velocity Calculator";
const DESCRIPTION =
  "Calculate your B2B SaaS funnel velocity, compare win rate and sales cycle to your funding stage, and see which lever is worth the most. Free, no signup to see results.";

const FAQS = [
  {
    question: "What is SaaS funnel velocity?",
    answer:
      "Funnel velocity is the new revenue your pipeline produces per day. Multiply qualified opportunities by win rate and average contract value, then divide by the length of your sales cycle in days.",
  },
  {
    question: "What counts as a qualified opportunity?",
    answer:
      "An opportunity your sales team has accepted and is actively working. Use your stage 1 or SQL definition, and keep it the same quarter to quarter so the trend means something.",
  },
  {
    question: "Which lever should I pull first?",
    answer:
      "Every input moves velocity by the same percentage, so start with the one furthest behind your stage median. That gap is usually the cheapest to close. The calculator names it and puts a dollar value on it.",
  },
  {
    question: "Where do the benchmarks come from?",
    answer:
      "Median and top-performer win rates and median sales cycle by funding stage, from 2025 to 2026 GTM indices by PeerSignal, Growth Unhinged and Gartner. Last refreshed March 13, 2026.",
  },
];

export const metadata: Metadata = {
  // The root layout template appends " | n+α Ventures"; absolute stops it doubling.
  title: { absolute: `${TITLE} | n+α Ventures` },
  description: DESCRIPTION,
  alternates: { canonical: "https://nplusalpha.com/tools/funnel-velocity" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "https://nplusalpha.com/tools/funnel-velocity",
  },
};

export default function FunnelVelocityPage() {
  return (
    <>
      <JsonLd
        type="WebPage"
        title={`${TITLE} | n+α Ventures`}
        description={DESCRIPTION}
        path="/tools/funnel-velocity"
        faqs={FAQS}
        breadcrumbs={[
          { name: "Home", item: "/" },
          { name: "Funnel Velocity Calculator", item: "/tools/funnel-velocity" },
        ]}
      />
      <Navbar />
      <main id="main-content" className="na pt-24">
        <div className="na-wrap">
          <header className="na-cs-head" style={{ paddingBottom: 40 }}>
            <nav className="na-crumbs" aria-label="Breadcrumb">
              <ol>
                <li><Link href="/">Home</Link></li>
                <li><span aria-current="page">Funnel velocity calculator</span></li>
              </ol>
            </nav>
            <h1 className="na-h1" style={{ maxWidth: 900 }}>SaaS funnel velocity calculator</h1>
            <p className="na-lede">
              See how fast your pipeline turns into revenue, how your win rate and sales cycle compare to companies at your stage, and which single lever is worth the most. Free. No signup to see results.
            </p>
          </header>
          <VelocityCalculator />
        </div>

        <section className="na-section" style={{ marginTop: 64 }}>
          <div className="na-wrap" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 48 }}>
            <div style={{ display: "grid", gap: 16, alignContent: "start" }}>
              <Eyebrow>Method</Eyebrow>
              <h2 className="na-h3">How funnel velocity works</h2>
              <div className="na-body">
                <p>
                  Velocity is qualified opportunities times win rate times average contract value, divided by sales cycle length in days. The result is the new revenue your funnel produces per day.
                </p>
                <p>
                  Each input moves velocity by the same percentage. So the lever to pull is the one furthest behind your stage benchmark, since that gap is the cheapest to close.
                </p>
              </div>
            </div>
            <div style={{ display: "grid", gap: 16, alignContent: "start" }}>
              <Eyebrow>FAQ</Eyebrow>
              <div className="na-faq">
                {FAQS.map((f) => (
                  <details key={f.question}>
                    <summary>{f.question}</summary>
                    <p>{f.answer}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="na-section">
          <div className="na-wrap">
            <CTASection title="Want the plan to close the gap?">
              <div className="na-cta-act">
                <Button href={BOOK} arrow>
                  Book a free GTM audit
                </Button>
              </div>
            </CTASection>
          </div>
        </section>
        <MobileStickyCTA href={BOOK} />
      </main>
      <Footer />
    </>
  );
}
