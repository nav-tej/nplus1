import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BLOG_POSTS } from "@/lib/blog";

export const metadata: Metadata = {
  title: "GTM & Growth Blog | nPlus1 Ventures",
  description:
    "Frameworks and playbooks from 10 years of building GTM systems at B2B SaaS companies. Real strategies. Proven results.",
  keywords: [
    "B2B SaaS growth",
    "GTM strategy",
    "revenue operations",
    "demand generation",
    "product-led growth",
    "Nav Singh",
    "nPlus1 Ventures",
    "AI GTM",
  ],
  alternates: { canonical: "https://nplusalpha.com/blog" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://nplusalpha.com/blog",
    siteName: "nPlus1 Ventures",
    title: "GTM & Growth Blog | nPlus1 Ventures",
    description:
      "Frameworks and playbooks from 10 years of building GTM systems at B2B SaaS companies.",
  },
  twitter: {
    card: "summary_large_image",
    title: "GTM & Growth Blog | nPlus1 Ventures",
    description:
      "Frameworks and playbooks from 10 years of building GTM systems at B2B SaaS companies. Real strategies. Proven results.",
  },
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default function BlogIndexPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": "https://nplusalpha.com/blog",
    name: "GTM & Growth Blog | nPlus1 Ventures",
    description:
      "Frameworks and playbooks from 10 years of building GTM systems at B2B SaaS companies.",
    url: "https://nplusalpha.com/blog",
    isPartOf: { "@id": "https://nplusalpha.com/#website" },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: BLOG_POSTS.map((post, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `https://nplusalpha.com/blog/${post.slug}`,
        name: post.title,
      })),
    },
  };


  // JSON-LD structured data — static server-side data only, no user input
  const jsonLdString = JSON.stringify(jsonLd);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString }} />
      <Navbar />
      <main id="main-content">
        {/* Hero */}
        <section className="pt-32 pb-16 border-b border-white/5">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold text-orange-400 tracking-wide uppercase mb-4">
                Blog
              </p>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground tracking-tight">
                GTM Frameworks &amp; Growth Playbooks
              </h1>
              <p className="mt-6 text-xl text-muted max-w-2xl leading-relaxed">
                Real strategies from building $500M+ in revenue growth across
                HeyGen, Semgrep, Egnyte, and 20+ B2B companies.
              </p>
            </div>
          </div>
        </section>

        {/* Posts grid */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {BLOG_POSTS.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-6 hover:border-white/20 hover:bg-white/[0.05] transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-flex items-center rounded-full border border-orange-400/30 bg-orange-400/10 px-2.5 py-0.5 text-xs font-medium text-orange-400">
                      {post.category}
                    </span>
                    <span className="text-xs text-muted">
                      {post.readTime} min read
                    </span>
                  </div>
                  <h2 className="text-base font-bold text-foreground leading-snug mb-3 group-hover:text-orange-400 transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-sm text-muted leading-relaxed flex-1 mb-4">
                    {post.description}
                  </p>
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                    <span className="text-xs text-muted">
                      {formatDate(post.publishDate)}
                    </span>
                    <span className="text-xs font-semibold text-orange-400 group-hover:translate-x-0.5 transition-transform inline-block">
                      Read →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 border-t border-white/5" aria-label="Contact call to action">
          <div className="mx-auto max-w-3xl px-6 lg:px-10 text-center">
            <h2 className="text-3xl font-extrabold text-foreground mb-4">
              Want to build this for{" "}
              <span className="text-orange-400">your company?</span>
            </h2>
            <p className="text-muted text-lg mb-8 max-w-xl mx-auto">
              These frameworks work. Let&apos;s talk about applying them to your
              GTM.
            </p>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-8 py-4 text-base font-semibold text-[#0B1221] hover:shadow-[0_0_30px_rgba(46,204,113,0.3)] hover:brightness-110 transition-all duration-300"
            >
              Book a Free GTM Audit
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M1 7h12m0 0L8 2m5 5L8 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
