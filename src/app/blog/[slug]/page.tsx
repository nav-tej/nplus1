import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BLOG_POSTS } from "@/lib/blog";
import { BLOG_CONTENT } from "@/lib/blog-content";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: post.metaTitle,
    description: post.description,
    keywords: [
      "B2B SaaS",
      "GTM strategy",
      "growth marketing",
      "Nav Singh",
      "nPlus1 Ventures",
      post.category,
    ],
    authors: [{ name: "Nav Singh" }],
    alternates: { canonical: `https://nplus1ventures.com/blog/${post.slug}` },
    openGraph: {
      type: "article",
      locale: "en_US",
      url: `https://nplus1ventures.com/blog/${post.slug}`,
      siteName: "nPlus1 Ventures",
      title: post.metaTitle,
      description: post.description,
      publishedTime: post.publishDate,
      authors: ["Nav Singh"],
      section: post.category,
    },
    twitter: {
      card: "summary_large_image",
      title: post.metaTitle,
      description: post.description,
    },
  };
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) notFound();

  const content = BLOG_CONTENT[post.slug];
  if (!content) notFound();

  const related = BLOG_POSTS.filter(
    (p) => p.slug !== post.slug && p.category === post.category
  ).slice(0, 2);

  return (
    <>
      <Navbar />
      <main id="main-content">
        {/* Article header */}
        <section className="pt-32 pb-10 border-b border-white/5">
          <div className="mx-auto max-w-3xl px-6 lg:px-10">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-muted mb-8" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-foreground transition-colors">
                Home
              </Link>
              <span className="text-white/20" aria-hidden="true">/</span>
              <Link href="/blog" className="hover:text-foreground transition-colors">
                Blog
              </Link>
              <span className="text-white/20" aria-hidden="true">/</span>
              <span className="text-foreground/60 truncate max-w-[200px]">{post.title}</span>
            </nav>

            {/* Category + read time */}
            <div className="flex items-center gap-3 mb-5">
              <span className="inline-flex items-center rounded-full border border-orange-400/30 bg-orange-400/10 px-3 py-1 text-xs font-medium text-orange-400">
                {post.category}
              </span>
              <span className="text-xs text-muted">{post.readTime} min read</span>
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight leading-tight mb-6">
              {post.title}
            </h1>

            {/* Author + date */}
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-9 h-9 rounded-full bg-accent/20 border border-accent/30 flex-shrink-0">
                <span className="text-xs font-bold text-accent">NS</span>
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Nav Singh</p>
                <p className="text-xs text-muted">
                  {formatDate(post.publishDate)} · {post.readTime} min read
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Article body */}
        <section className="py-12">
          <div className="mx-auto max-w-3xl px-6 lg:px-10">
            <article>{content}</article>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-16 border-t border-white/5 bg-white/[0.02]">
          <div className="mx-auto max-w-3xl px-6 lg:px-10 text-center">
            <p className="text-xs font-semibold text-orange-400 tracking-wide uppercase mb-3">
              Work with Nav Singh
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground mb-4">
              Want these frameworks applied to{" "}
              <span className="text-orange-400">your GTM?</span>
            </h2>
            <p className="text-muted text-base mb-8 max-w-lg mx-auto leading-relaxed">
              Book a free GTM audit. I&apos;ll review your current motion and
              share 3–5 high-leverage opportunities specific to your stage and
              market.
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

        {/* Related posts */}
        {related.length > 0 && (
          <section className="py-16 border-t border-white/5">
            <div className="mx-auto max-w-3xl px-6 lg:px-10">
              <h2 className="text-lg font-bold text-foreground mb-6">
                Related Articles
              </h2>
              <div className="grid sm:grid-cols-2 gap-6">
                {related.map((rel) => (
                  <Link
                    key={rel.slug}
                    href={`/blog/${rel.slug}`}
                    className="group flex flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-5 hover:border-white/20 hover:bg-white/[0.05] transition-all duration-300"
                  >
                    <span className="inline-flex items-center rounded-full border border-orange-400/30 bg-orange-400/10 px-2.5 py-0.5 text-xs font-medium text-orange-400 mb-3 self-start">
                      {rel.category}
                    </span>
                    <h3 className="text-sm font-bold text-foreground leading-snug mb-2 group-hover:text-orange-400 transition-colors">
                      {rel.title}
                    </h3>
                    <p className="text-xs text-muted leading-relaxed flex-1 mb-3">
                      {rel.description}
                    </p>
                    <span className="text-xs font-semibold text-orange-400 group-hover:translate-x-0.5 transition-transform inline-block">
                      Read →
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
