import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import VideoEmbed from "@/components/VideoEmbed";
import Byline from "@/components/Byline";
import { getCaseStudy } from "@/lib/case-studies";
import { SITE_CONFIG } from "@/lib/constants";
import { CASES, HEYGEN_ARR, HEYGEN_ARR_ANNOTATIONS, HEYGEN_NAV_JOINS } from "@/lib/brand-data";
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

const HEYGEN = getCaseStudy("heygen")!;
const HEYGEN_METRICS = HEYGEN.metrics;

export const metadata: Metadata = {
  // The root layout template appends " | n+α Ventures"; absolute stops it doubling.
  title: { absolute: "HeyGen GTM Case Study: $20M to $100M ARR | n+α Ventures" },
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
      datePublished: HEYGEN.publishDate,
      dateModified: HEYGEN.dateModified,
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

const PILLARS = [
  {
    title: "Repositioning for enterprise",
    body: "ICP moved from individual creators to enterprise communications teams, with the messaging hierarchy rebuilt around training, marketing, localization and HR. The site had to serve enterprise buyers without breaking the PLG top of funnel, so the brand architecture carried both motions at once.",
  },
  {
    title: "SEO from zero",
    body: "Organic was not a channel when I arrived. Technical foundation first, then programmatic content against real use-case demand, which produced over 50% year-on-year organic traffic growth.",
  },
  {
    title: "A 100,000 member community",
    body: "Built from nothing to six figures of members in six months, on a dedicated platform rather than Discord so the content stayed discoverable. Weekly tips, user showcases, AMAs and a 50+ creator ambassador program. Community members retained materially better than everyone else, and enterprise deals started coming out of relationships that began there.",
  },
  {
    title: "AI-native lifecycle",
    body: "Free-to-paid conversion was strong and unsystematic. We segmented on behavior instead of plan type, fired sequences off specific product actions, and built a product-qualified lead model so sales reached people at the moment it helped rather than the moment it annoyed.",
  },
  {
    title: "Enterprise ABM",
    body: "An enterprise motion built on top of the PLG base: intent data and ICP criteria combined with existing user presence inside target accounts, hyper-personalized outreach at a scale manual research cannot reach, and the enterprise content that unblocks procurement. ROI calculators, SOC 2 and SSO documentation, video case studies.",
  },
];

const TOC: [string, string][] = [
  ["video", "The playbook video"],
  ["shape", "The shape of the run"],
  ["walked-into", "What I walked into"],
  ["pillars", "The five pillars"],
  ["founder", "What I would tell a founder"],
];

export default function CaseStudyPage() {
  return (
    <>
      {/* Static JSON-LD, no user input */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: CASE_STUDY_SCHEMA }} />
      <Navbar theme="paper" />
      <main id="main-content" className="na" data-theme="paper">
        <div className="na-wrap">
          <header className="na-cs-head">
            <Breadcrumbs
              items={[
                ["Home", "/"],
                ["Case studies", "/case-studies"],
                ["HeyGen", "/case-studies/heygen"],
              ]}
            />
            <h1 className="na-h1" style={{ maxWidth: 1000 }}>
              Scaling HeyGen: <span className="muted">the GTM playbook.</span>
            </h1>
            <p className="na-lede">
              Building the systems that drove 5× growth for the leader in AI video. Rebranding, community building, and
              enterprise operations at scale.
            </p>
            <Byline published={HEYGEN.publishDate} updated={HEYGEN.dateModified} />
            <dl className="na-cs-meta">
              <div>
                <dt>Client</dt>
                <dd>
                  <a href={HEYGEN.clientUrl} target="_blank" rel="noopener noreferrer">
                    HeyGen
                  </a>
                </dd>
              </div>
              <div>
                <dt>Role</dt>
                <dd>{HEYGEN.engagement}</dd>
              </div>
              <div>
                <dt>Years</dt>
                <dd>Apr 2024 to Jan 2026</dd>
              </div>
              <div>
                <dt>Category</dt>
                <dd>{HEYGEN.industry}</dd>
              </div>
            </dl>
            <MetricRow small items={HEYGEN_METRICS.map((m) => ({ ...splitMetric(m.value), label: m.label }))} />
          </header>
        </div>

        <div className="na-wrap na-article">
          <aside className="na-article-rail">
            <TableOfContents items={TOC} />
          </aside>
          <div className="na-article-body">
            {/* The video stays near the top: Search Console flagged it when it was not the page's main content. */}
            <section id="video" className="na-article-sec">
              <ArtifactFrame
                kind="Video"
                title="Inside the HeyGen GTM engine"
                meta="Nav Singh · YouTube"
                caption={
                  <>
                    <b>The playbook, in Nav&apos;s words.</b>{" "}
                    <Link href="/videos/scaling-heygen-gtm">Watch on the dedicated page →</Link>
                  </>
                }
              >
                <VideoEmbed videoId="ogk5uMVFJh0" title="Scaling B2B SaaS to $100M" />
              </ArtifactFrame>
            </section>

            <section id="shape" className="na-article-sec">
              <ArtifactFrame
                kind="Artifact 01"
                title="HeyGen ARR vs a steady baseline"
                caption={
                  <>
                    <b>HeyGen&apos;s public milestones: $1M ARR in April 2023, $100M in October 2025, $200M in June
                    2026.</b> I joined in April 2024. The path between the milestones and the baseline are stylized. The
                    shaded gap is the α.
                  </>
                }
              >
                <AlphaCurve
                  values={HEYGEN_ARR}
                  width={760}
                  height={260}
                  baseLabel="n · steady baseline"
                  annotations={HEYGEN_ARR_ANNOTATIONS}
                  marker={HEYGEN_NAV_JOINS}
                  ariaLabel="HeyGen ARR rising from $1M in April 2023 to $100M in October 2025 and $200M in June 2026, with Nav joining in April 2024. Stylized between the labelled milestones."
                />
              </ArtifactFrame>
            </section>

            <section id="walked-into" className="na-article-sec">
              <h2 className="na-h3">What I walked into</h2>
              <div className="na-prose">
                <p>
                  In April 2024 HeyGen had product-market fit most companies never get near, a user base in the tens of
                  millions, and almost no marketing infrastructure underneath it. No SEO program, no content engine, no
                  community, no structured lifecycle automation, and no enterprise motion at all.
                </p>
                <p>
                  The brand had also outgrown its own positioning. HeyGen had spread virally as an AI video tool, which
                  is a category that undersells what an enterprise buyer is actually purchasing, and the revenue
                  operations architecture was not built for the motion the company was moving toward.
                </p>
                <p>What followed was 21 months of building five systems that had to work together.</p>
              </div>
            </section>

            <section id="pillars" className="na-article-sec">
              <h2 className="na-h3">The five pillars</h2>
              <Pillars items={PILLARS} />
              <div className="na-prose">
                <p>
                  <b>Why five and not one.</b> Each pillar fed the next. Repositioning made the SEO content credible to
                  enterprise readers. SEO and community filled the top of the funnel. Lifecycle converted it. ABM
                  harvested the accounts already full of free users. Any one of them alone would have produced a
                  fraction of the result.
                </p>
              </div>
            </section>

            <section id="founder" className="na-article-sec">
              <h2 className="na-h3">What I would tell a founder</h2>
              <div className="na-prose">
                <p>
                  Build the infrastructure before you need it. Every one of those five systems took months to compound,
                  and the companies that start them at the moment they are needed spend that entire window flat.
                </p>
                <p>
                  The full write-up, with the sequencing and what each pillar cost to learn, is in{" "}
                  <Link href="/blog/heygen-gtm-playbook-20m-to-100m-arr" className="na-link">
                    the long-form playbook
                  </Link>
                  .
                </p>
              </div>
              <figure className="na-quote">
                <blockquote>Building the infrastructure before you need it is the only way to sustain 5× growth.</blockquote>
                <figcaption>
                  <b>Nav Singh</b>, Founder, n+α
                </figcaption>
              </figure>
            </section>
          </div>
        </div>

        <section className="na-section">
          <div className="na-wrap">
            <SectionHeader eyebrow="Keep reading" title="More work" />
            <CaseIndex cases={CASES.filter((c) => c.slug !== "heygen").slice(0, 3)} start={1} />
          </div>
        </section>
        <section className="na-section">
          <div className="na-wrap">
            <CTASection title="Want these systems at your company?" primary={["Book a free GTM audit", "/#contact"]} />
          </div>
        </section>
        <MobileStickyCTA href="/#contact" />
      </main>
      <Footer />
    </>
  );
}
