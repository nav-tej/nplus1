import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import VideoEmbed from "@/components/VideoEmbed";
import { BLOG_POSTS } from "@/lib/blog";

export const metadata: Metadata = {
  title: "GTM & Growth Blog | n+α Ventures",
  description:
    "Frameworks and playbooks from 10 years of building GTM systems at B2B SaaS companies. Real strategies. Proven results.",
  keywords: [
    "B2B SaaS growth",
    "GTM strategy",
    "revenue operations",
    "demand generation",
    "product-led growth",
    "Nav Singh",
    "n+α Ventures",
    "AI GTM",
  ],
  alternates: { canonical: "https://nplusalpha.com/blog" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://nplusalpha.com/blog",
    siteName: "n+α Ventures",
    title: "GTM & Growth Blog | n+α Ventures",
    description:
      "Frameworks and playbooks from 10 years of building GTM systems at B2B SaaS companies.",
  },
  twitter: {
    card: "summary_large_image",
    title: "GTM & Growth Blog | n+α Ventures",
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
  const blogList = BLOG_POSTS.map((post) => ({
    name: post.title,
    url: `https://nplusalpha.com/blog/${post.slug}`,
  }));

  return (
    <>
      <JsonLd 
        type="CollectionPage"
        title="GTM & Growth Blog | n+α Ventures"
        description="Frameworks and playbooks from 10 years of building GTM systems at B2B SaaS companies."
        path="/blog"
        itemList={blogList}
        video={{
          name: "Your GTM Playbook Is Already Obsolete",
          description: "Why traditional GTM playbooks are failing in the AI era and how to architect for 2026.",
          thumbnailUrl: "https://img.youtube.com/vi/N-ys9Gjmy8A/maxresdefault.jpg",
          uploadDate: "2026-03-17T08:00:00Z",
          contentUrl: "https://www.youtube.com/watch?v=N-ys9Gjmy8A",
          embedUrl: "https://www.youtube-nocookie.com/embed/N-ys9Gjmy8A",
        }}
      />
      <Navbar />
      <main id="main-content">
        {/* Hero */}
        <section className="pt-32 pb-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold text-orange-400 tracking-wide uppercase mb-4">
                Blog & Resources
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

        {/* Featured Video Section — High prominence for GSC indexing */}
        <section className="pb-16 border-b border-white/5">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="relative group overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-8 lg:p-12">
              <div className="absolute -inset-1 bg-gradient-to-r from-orange-400/10 to-accent/10 blur opacity-20" />
              <div className="relative grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <span className="inline-flex items-center rounded-full border border-orange-400/30 bg-orange-400/10 px-3 py-1 text-xs font-medium text-orange-400 mb-6">
                    Featured GTM Insight
                  </span>
                  <h2 className="text-3xl font-bold text-white mb-4">Your GTM Playbook Is Already Obsolete</h2>
                  <p className="text-muted text-lg mb-8">
                    Why traditional GTM playbooks are failing in the AI era and how to architect your revenue engine for 2026. Watch the full breakdown.
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-orange-400/20 flex items-center justify-center">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-orange-400">
                        <path d="M7 4v16l13-8L7 4z" fill="currentColor" />
                      </svg>
                    </div>
                    <span className="text-sm font-semibold text-white">Full Video Breakdown</span>
                  </div>
                </div>
                <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                  <VideoEmbed 
                    videoId="N-ys9Gjmy8A" 
                    title="Your GTM Playbook Is Already Obsolete" 
                  />
                </div>
              </div>
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
