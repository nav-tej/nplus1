import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SERVICE_PAGES, SITE_CONFIG } from "@/lib/constants";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return SERVICE_PAGES.map((s) => ({
    slug: s.href.split("/").pop(),
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICE_PAGES.find((s) => s.href.endsWith(slug));
  if (!service) return {};

  return {
    title: `${service.label} | B2B SaaS GTM Consulting`,
    description: service.description,
    alternates: { canonical: `https://${SITE_CONFIG.domain}${service.href}` },
    openGraph: {
      title: `${service.label} | nPlus1 Ventures`,
      description: service.description,
      url: `https://${SITE_CONFIG.domain}${service.href}`,
    },
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = SERVICE_PAGES.find((s) => s.href.endsWith(slug));
  if (!service) notFound();

  return (
    <>
      <Navbar />
      <main id="main-content" className="pt-32 pb-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="max-w-3xl">
            <nav className="flex items-center gap-2 text-sm text-muted mb-8" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
              <span className="text-white/20">/</span>
              <span className="text-foreground/60">Services</span>
              <span className="text-white/20">/</span>
              <span className="text-foreground/60">{service.label}</span>
            </nav>

            <h1 className="text-4xl lg:text-6xl font-extrabold tracking-tight mb-8">
              {service.label}
            </h1>
            <p className="text-xl text-muted leading-relaxed mb-12">
              {service.description}. We help B2B SaaS companies scale their GTM engine from $5M to $50M ARR with battle-tested frameworks.
            </p>

            <div className="prose prose-invert prose-orange max-w-none">
              <h2 className="text-2xl font-bold mb-4">What we deliver</h2>
              <ul className="space-y-4 mb-12">
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                  <span>Strategic roadmap tailored to your specific market and product.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                  <span>Hands-on execution of high-leverage growth experiments.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                  <span>Systematic optimization of your funnel from awareness to expansion.</span>
                </li>
              </ul>
            </div>

            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-8 py-4 text-base font-semibold text-[#0B1221] hover:shadow-[0_0_30px_rgba(46,204,113,0.3)] hover:brightness-110 transition-all duration-300"
            >
              Book a Strategy Call
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
