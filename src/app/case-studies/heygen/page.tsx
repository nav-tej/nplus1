import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import VideoEmbed from "@/components/VideoEmbed";
import RelatedCaseStudies from "@/components/RelatedCaseStudies";
import { getCaseStudy } from "@/lib/case-studies";
import { SITE_CONFIG } from "@/lib/constants";

const HEYGEN_METRICS = getCaseStudy("heygen")!.metrics;

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
      "@type": "WebPage",
      "@id": "https://nplusalpha.com/case-studies/heygen#webpage",
      "url": "https://nplusalpha.com/case-studies/heygen",
      "name": "HeyGen GTM Case Study: $20M to $100M ARR",
      "mainEntity": { "@id": "https://nplusalpha.com/case-studies/heygen#video" },
      "isPartOf": { "@id": "https://nplusalpha.com/#website" },
    },
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
      mainEntityOfPage: { "@id": "https://nplusalpha.com/case-studies/heygen#webpage" },
    },
    {
      "@type": "VideoObject",
      "@id": "https://nplusalpha.com/case-studies/heygen#video",
      "name": "How I Scaled B2B SaaS from $20M to $100M+ ARR",
      "description": "The inside story of scaling HeyGen from $20M to $100M+ ARR through rebrand, SEO, and community.",
      "thumbnailUrl": "https://img.youtube.com/vi/ogk5uMVFJh0/maxresdefault.jpg",
      "uploadDate": "2026-03-17T08:00:00Z",
      "contentUrl": "https://www.youtube.com/watch?v=ogk5uMVFJh0",
      "embedUrl": "https://www.youtube-nocookie.com/embed/ogk5uMVFJh0",
      "publisher": {
        "@type": "Organization",
        "name": "n+α Ventures",
        "logo": {
          "@type": "ImageObject",
          "url": "https://nplusalpha.com/logo.png"
        }
      }
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://nplusalpha.com" },
        { "@type": "ListItem", "position": 2, "name": "Case Studies", "item": "https://nplusalpha.com/case-studies" },
        { "@type": "ListItem", "position": 3, "name": "HeyGen: $20M to $100M+ ARR", "item": "https://nplusalpha.com/case-studies/heygen" },
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
              <Link href="/case-studies" className="hover:text-foreground transition-colors">Case Studies</Link>
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

            {/* Featured Video — Prominent layout to fix GSC "Video isn't on a watch page" issue */}
            <div className="mb-20">
              <div className="relative group overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]">
                <div className="absolute -inset-1 bg-gradient-to-r from-orange-400/20 to-accent/20 blur opacity-25 group-hover:opacity-40 transition-opacity duration-500" />
                <div className="relative aspect-video max-w-4xl mx-auto shadow-2xl">
                  <VideoEmbed 
                    videoId="ogk5uMVFJh0" 
                    title="Scaling B2B SaaS to $100M" 
                  />
                </div>
                <div className="p-6 bg-black/40 backdrop-blur-sm border-t border-white/5">
                  <h3 className="text-sm font-bold text-orange-400 uppercase tracking-widest mb-1 text-center">Featured Playbook Video</h3>
                  <p className="text-white text-center font-medium mb-4">Inside the HeyGen GTM Engine with Nav Singh</p>
                  <div className="text-center">
                    <Link 
                      href="/videos/scaling-heygen-gtm"
                      className="inline-flex items-center gap-2 text-xs font-bold text-muted hover:text-orange-400 transition-colors"
                    >
                      Watch on dedicated page →
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* At a glance */}
            <dl className="grid grid-cols-2 lg:grid-cols-4 gap-6 rounded-3xl border border-white/10 bg-white/[0.02] p-8 mb-16">
              {HEYGEN_METRICS.map((metric) => (
                <div key={metric.label}>
                  <dt className="sr-only">{metric.label}</dt>
                  <dd>
                    <span className="block text-2xl lg:text-3xl font-extrabold text-accent">{metric.value}</span>
                    <span className="block text-xs text-muted mt-1 leading-snug">{metric.label}</span>
                  </dd>
                </div>
              ))}
            </dl>

            <div className="prose prose-invert prose-orange max-w-none space-y-12">
              <section>
                <h2 className="text-3xl font-bold mb-4">What I walked into</h2>
                <p>
                  In April 2024 HeyGen had product-market fit most companies never get near, a user base in the tens of millions, and almost no marketing infrastructure underneath it. No SEO program, no content engine, no community, no structured lifecycle automation, and no enterprise motion at all.
                </p>
                <p>
                  The brand had also outgrown its own positioning. HeyGen had spread virally as an AI video tool, which is a category that undersells what an enterprise buyer is actually purchasing, and the revenue operations architecture was not built for the motion the company was moving toward.
                </p>
                <p>
                  What followed was 21 months of building five systems that had to work together.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-4">The five pillars</h2>
                <ul className="grid sm:grid-cols-2 gap-6 mt-8 list-none p-0">
                  <li className="bg-white/[0.03] border border-white/10 rounded-2xl p-6">
                    <h3 className="text-orange-400 font-bold mb-2">1. Repositioning for enterprise</h3>
                    <p className="text-sm text-muted">ICP moved from individual creators to enterprise communications teams, with the messaging hierarchy rebuilt around training, marketing, localization and HR. The site had to serve enterprise buyers without breaking the PLG top of funnel, so the brand architecture carried both motions at once.</p>
                  </li>
                  <li className="bg-white/[0.03] border border-white/10 rounded-2xl p-6">
                    <h3 className="text-orange-400 font-bold mb-2">2. SEO from zero</h3>
                    <p className="text-sm text-muted">Organic was not a channel when I arrived. Technical foundation first, then programmatic content against real use-case demand, which produced over 50% year-on-year organic traffic growth.</p>
                  </li>
                  <li className="bg-white/[0.03] border border-white/10 rounded-2xl p-6">
                    <h3 className="text-orange-400 font-bold mb-2">3. A 100,000 member community</h3>
                    <p className="text-sm text-muted">Built from nothing to six figures of members in six months, on a dedicated platform rather than Discord so the content stayed discoverable. Weekly tips, user showcases, AMAs and a 50+ creator ambassador program. Community members retained materially better than everyone else, and enterprise deals started coming out of relationships that began there.</p>
                  </li>
                  <li className="bg-white/[0.03] border border-white/10 rounded-2xl p-6">
                    <h3 className="text-orange-400 font-bold mb-2">4. AI-native lifecycle</h3>
                    <p className="text-sm text-muted">Free-to-paid conversion was strong and unsystematic. We segmented on behavior instead of plan type, fired sequences off specific product actions, and built a product-qualified lead model so sales reached people at the moment it helped rather than the moment it annoyed.</p>
                  </li>
                  <li className="bg-white/[0.03] border border-white/10 rounded-2xl p-6">
                    <h3 className="text-orange-400 font-bold mb-2">5. Enterprise ABM</h3>
                    <p className="text-sm text-muted">An enterprise motion built on top of the PLG base: intent data and ICP criteria combined with existing user presence inside target accounts, hyper-personalized outreach at a scale manual research cannot reach, and the enterprise content that unblocks procurement. ROI calculators, SOC 2 and SSO documentation, video case studies.</p>
                  </li>
                  <li className="bg-accent/5 border border-accent/20 rounded-2xl p-6">
                    <h3 className="text-accent font-bold mb-2">Why five and not one</h3>
                    <p className="text-sm text-muted">Each pillar fed the next. Repositioning made the SEO content credible to enterprise readers. SEO and community filled the top of the funnel. Lifecycle converted it. ABM harvested the accounts already full of free users. Any one of them alone would have produced a fraction of the result.</p>
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-4">What I would tell a founder</h2>
                <p>
                  Build the infrastructure before you need it. Every one of those five systems took months to compound, and the companies that start them at the moment they are needed spend that entire window flat.
                </p>
                <p>
                  The full write-up, with the sequencing and what each pillar cost to learn, is in{" "}
                  <Link href="/blog/heygen-gtm-playbook-20m-to-100m-arr" className="text-accent hover:underline">
                    the long-form playbook
                  </Link>
                  .
                </p>
              </section>

              <section className="bg-accent/5 border border-accent/20 rounded-3xl p-8 lg:p-12 text-center">
                <h2 className="text-2xl font-bold mb-4 italic text-accent">
                  &ldquo;Building the infrastructure before you need it is the only way to sustain 5× growth.&rdquo;
                </h2>
                <p className="text-muted">– Nav Singh</p>
              </section>
            </div>

            <RelatedCaseStudies currentSlug="heygen" />

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
