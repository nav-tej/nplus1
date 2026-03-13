import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "HeyGen GTM Case Study: $20M to $100M ARR | n+α Ventures",
  description: "How n+α helped scale HeyGen from $20M to $100M+ ARR through a complete GTM rebrand, SEO, and community construction.",
  alternates: { canonical: `https://${SITE_CONFIG.domain}/case-studies/heygen` },
  openGraph: {
    title: "HeyGen GTM Case Study: Scaling to $100M ARR",
    description: "The complete playbook for scaling a B2B SaaS company from $20M to $100M+ ARR.",
    url: `https://${SITE_CONFIG.domain}/case-studies/heygen`,
  },
};

const CASE_STUDY_SCHEMA = JSON.stringify({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": "https://nplusalpha.com/case-studies/heygen#article",
      url: "https://nplusalpha.com/case-studies/heygen",
      headline: "HeyGen GTM Case Study: $20M to $100M+ ARR",
      description:
        "How Nav Singh scaled HeyGen from $20M to $100M+ ARR through a complete GTM rebrand, SEO program, 100K-member community, enterprise ABM, and lifecycle automation.",
      image: "https://nplusalpha.com/opengraph-image",
      datePublished: "2024-04-01",
      author: { "@id": "https://nplusalpha.com/about#navsingh" },
      publisher: { "@id": "https://nplusalpha.com/#organization" },
      mainEntityOfPage: { "@type": "WebPage", "@id": "https://nplusalpha.com/case-studies/heygen" },
      isPartOf: { "@id": "https://nplusalpha.com/#website" },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://nplusalpha.com" },
        { "@type": "ListItem", position: 2, name: "Case Studies", item: "https://nplusalpha.com/case-studies/heygen" },
        { "@type": "ListItem", position: 3, name: "HeyGen: $20M to $100M+ ARR", item: "https://nplusalpha.com/case-studies/heygen" },
      ],
    },
  ],
});

export default function CaseStudyPage() {
  return (
    <>
      {/* Static JSON-LD — no user input */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: CASE_STUDY_SCHEMA }} />
      <Navbar />
      <main id="main-content" className="pt-32 pb-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="max-w-4xl">
            <nav className="flex items-center gap-2 text-sm text-muted mb-8" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
              <span className="text-white/20">/</span>
              <span className="text-foreground/60">Case Studies</span>
              <span className="text-white/20">/</span>
              <span className="text-foreground/60">HeyGen</span>
            </nav>

            <span className="inline-flex items-center rounded-full border border-orange-400/30 bg-orange-400/10 px-3 py-1 text-xs font-medium text-orange-400 mb-6">
              $20M → $100M+ ARR
            </span>
            <h1 className="text-4xl lg:text-7xl font-extrabold tracking-tight mb-8">
              Scaling HeyGen: <span className="text-muted">The GTM Playbook.</span>
            </h1>
            <p className="text-xl lg:text-2xl text-muted leading-relaxed mb-12">
              Building the systems that drove 5× growth for the leader in AI video. Rebranding, community building, and enterprise operations at scale.
            </p>

            <div className="prose prose-invert prose-orange max-w-none space-y-12">
              <section>
                <h2 className="text-3xl font-bold mb-4">The Challenge</h2>
                <p>
                  In April 2024, HeyGen had extraordinary product-market fit but limited marketing infrastructure. To reach the next stage of growth, they needed systematic programs to capture, convert, and expand the massive demand they were generating.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-4">The Solution</h2>
                <p>
                  We built five interlocking pillars: a strategic rebrand for enterprise credibility, a high-volume SEO engine, a 100,000-member community, AI-native lifecycle automation, and a targeted enterprise ABM motion.
                </p>
                <ul className="grid sm:grid-cols-2 gap-8 mt-8 list-none p-0">
                  <li className="bg-white/[0.03] border border-white/10 rounded-2xl p-6">
                    <h3 className="text-orange-400 font-bold mb-2">SEO from Zero</h3>
                    <p className="text-sm text-muted">Generated 50%+ YoY organic traffic growth through technical audits and programmatic content.</p>
                  </li>
                  <li className="bg-white/[0.03] border border-white/10 rounded-2xl p-6">
                    <h3 className="text-orange-400 font-bold mb-2">Community Led</h3>
                    <p className="text-sm text-muted">Launched and grew a 100K+ member community that drove 30% lift in new customer acquisition.</p>
                  </li>
                </ul>
              </section>

              <section className="bg-accent/5 border border-accent/20 rounded-3xl p-8 lg:p-12 text-center">
                <h2 className="text-2xl font-bold mb-4 italic text-accent">
                  &ldquo;Building the infrastructure before you need it is the only way to sustain 5× growth.&rdquo;
                </h2>
                <p className="text-muted">– Nav Singh</p>
              </section>
            </div>

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
