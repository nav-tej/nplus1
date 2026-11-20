import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import CvDownloads from "@/components/CvDownloads";

const DESCRIPTION =
  "Download Nav Singh's CV in two versions, growth and revenue operations. HeyGen ($20M to $130M+ ARR), Comfy, Semgrep, Egnyte and Andreessen Horowitz.";

export const metadata: Metadata = {
  title: { absolute: "Nav Singh CV | n+α Ventures" },
  description: DESCRIPTION,
  alternates: { canonical: "https://nplusalpha.com/cv" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://nplusalpha.com/cv",
    siteName: "n+α Ventures",
    title: "Nav Singh CV | n+α Ventures",
    description: DESCRIPTION,
  },
};

export default function CvPage() {
  return (
    <>
      <JsonLd
        type="WebPage"
        title="Nav Singh CV | n+α Ventures"
        description={DESCRIPTION}
        path="/cv"
        breadcrumbs={[
          { name: "Home", item: "/" },
          { name: "About", item: "/about" },
          { name: "CV", item: "/cv" },
        ]}
      />
      <Navbar />
      <main id="main-content">
        <section className="pt-32 pb-16 border-b border-line" aria-label="Download CV">
          <div className="mx-auto max-w-4xl px-6 lg:px-10">
            <p className="font-mono text-xs uppercase tracking-[0.12em] text-alpha-text">
              CV · Updated November 2026
            </p>
            <h1 className="mt-4 text-5xl sm:text-6xl text-foreground leading-[1.05]">
              Nav Singh, CV
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-muted leading-relaxed">
              Ten years of work, from my first stint at Egnyte in 2016
              through a16z, Semgrep, HeyGen and Comfy to nPlusAlpha today.
              One version leads with growth, the other with revenue
              operations.
            </p>
            <div className="mt-10">
              <CvDownloads location="cv" />
            </div>
          </div>
        </section>

        <section className="py-16" aria-label="More context">
          <div className="mx-auto max-w-4xl px-6 lg:px-10 space-y-5 text-[15px] text-muted leading-relaxed">
            <p>
              The case studies tell the full story behind the numbers:{" "}
              <Link href="/case-studies/heygen" className="text-foreground underline underline-offset-4 hover:text-alpha-text">HeyGen</Link>,{" "}
              <Link href="/case-studies/comfy" className="text-foreground underline underline-offset-4 hover:text-alpha-text">Comfy</Link>,{" "}
              <Link href="/case-studies/semgrep" className="text-foreground underline underline-offset-4 hover:text-alpha-text">Semgrep</Link> and{" "}
              <Link href="/case-studies/egnyte" className="text-foreground underline underline-offset-4 hover:text-alpha-text">Egnyte</Link>.
              More about how I work is on the{" "}
              <Link href="/about" className="text-foreground underline underline-offset-4 hover:text-alpha-text">about page</Link>.
            </p>
            <div className="pt-4">
              <Link
                prefetch={false}
                href="/book"
                className="inline-flex items-center gap-2 h-11 rounded-lg bg-accent px-5 text-sm font-medium text-[var(--on-alpha)] hover:bg-[var(--alpha-fill-hover)] transition-colors"
              >
                Book a GTM audit <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
