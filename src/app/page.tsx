import type { Metadata } from "next";
import Link from "next/link";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import {
  CaseStudyGrid,
  CTASection,
  Button,
  Hero,
  HeroPanel,
  MetricRow,
  MobileStickyCTA,
  ProcessSteps,
  ProofStrip,
  SectionHeader,
  TrackRecord,
} from "@/components/brand";
import { SERVICE_PAGES, SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

// The form hydrates as its own client island, below the fold.
const ContactForm = dynamic(() => import("@/components/ContactForm"));

const BOOK = SITE_CONFIG.calendarLink;

export default function Home() {
  return (
    <>
      <JsonLd />
      <Navbar />
      <main id="main-content" className="na">
        <Hero
          eyebrow="Fractional VP Marketing + RevOps · B2B SaaS"
          title={
            <>
              Growth systems for B2B SaaS scaling to <em>$100M+</em> ARR.
            </>
          }
          lede="I scaled HeyGen from $20M to $100M+ ARR in 21 months. Before that, Semgrep, Egnyte and a16z. Now I build the same systems inside your company, with AI agents doing the ops work."
          primary={["Book a free GTM audit", BOOK]}
          secondary={["See the work", "/case-studies"]}
          note="Working with 2 to 3 companies at a time."
          panel={<HeroPanel />}
        />

        <div className="na-wrap">
          <ProofStrip />
        </div>

        <section className="na-section flush" aria-label="Results">
          <div className="na-wrap">
            <MetricRow
              items={[
                { value: "$500M", unit: "+", label: "Revenue growth", context: "across operating roles" },
                { value: "$400M", unit: "+", label: "Pipeline generated", context: "marketing-sourced" },
                { value: "20", unit: "+", label: "Companies advised", context: "a16z portfolio and clients" },
                { value: "5", unit: "×", label: "Average ARR growth", context: "in operating roles" },
              ]}
            />
          </div>
        </section>

        <section className="na-section" aria-labelledby="track-heading">
          <div className="na-wrap">
            <SectionHeader
              id="track-heading"
              index="01"
              eyebrow="Track record"
              title="Where the playbook comes from."
              lede="Venture, then four operating seats. Each one added a system I now install for clients."
            />
            <TrackRecord />
          </div>
        </section>

        <section className="na-section" aria-labelledby="work-heading">
          <div className="na-wrap">
            <SectionHeader
              id="work-heading"
              index="02"
              eyebrow="Selected work"
              title="Case studies, with the numbers left in."
              action={
                <Button variant="secondary" href="/case-studies" arrow>
                  All work
                </Button>
              }
            />
            <CaseStudyGrid />
          </div>
        </section>

        <section id="services" className="na-section" aria-labelledby="services-heading">
          <div className="na-wrap">
            <SectionHeader
              id="services-heading"
              index="03"
              eyebrow="Services"
              title="Three ways to work together."
              lede="Most engagements combine two. All of them start with the audit."
            />
            <div className="na-steps" style={{ "--n": 3 } as React.CSSProperties}>
              {SERVICE_PAGES.map((s, i) => (
                <Link key={s.href} href={s.href} className="na-step na-step-link">
                  <span className="na-step-n">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="na-step-t">{s.label}</h3>
                  <p>{s.description}</p>
                  <span className="na-step-w">
                    How it works <span aria-hidden="true">→</span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section id="process" className="na-section" aria-labelledby="process-heading">
          <div className="na-wrap">
            <SectionHeader
              id="process-heading"
              index="04"
              eyebrow="How it works"
              title="Diagnose, architect, accelerate."
              lede="Engagements run 3 to 6 months with a milestone every two weeks."
            />
            <ProcessSteps />
          </div>
        </section>

        <section className="na-section" aria-labelledby="tool-heading">
          <div className="na-wrap">
            <SectionHeader
              id="tool-heading"
              index="05"
              eyebrow="Free tool"
              title="How fast does your funnel turn into revenue?"
              lede="Four inputs. Benchmarked by stage. Tells you which lever is worth the most."
              action={
                <Button variant="secondary" href="/tools/funnel-velocity" arrow>
                  Open the calculator
                </Button>
              }
            />
          </div>
        </section>

        <FAQ />

        <section id="contact" className="na-section">
          <div className="na-wrap">
            <CTASection>
              <div className="na-cta-form">
                <ContactForm />
              </div>
            </CTASection>
          </div>
        </section>
      </main>
      <Footer />
      <MobileStickyCTA href={BOOK} />
    </>
  );
}
