import Link from "next/link";
import { SITE_CONFIG } from "@/lib/constants";

const SOCIAL_PROOF = [
  "Scaled HeyGen $20M → $100M+ ARR",
  "Ex-Andreessen Horowitz Partner",
  "$400M+ Marketing-Sourced Pipeline",
  "10+ Years B2B SaaS",
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-accent/[0.07] rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-accent/[0.04] rounded-full blur-[120px] pointer-events-none" />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10 pt-28 pb-20 w-full">
        {/* Badge */}
        <div className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 mb-10">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <span className="text-sm text-muted">
            Fractional VP Marketing &amp; RevOps for B2B SaaS
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-[3.75rem] font-bold tracking-tight leading-[1.08] mb-6 max-w-4xl">
          The GTM Partnership for B2B{" "}
          <span className="bg-gradient-to-r from-accent to-[#27AE60] bg-clip-text text-transparent">
            Hypergrowth.
          </span>
        </h1>

        {/* Subheadline */}
        <p className="text-lg lg:text-xl text-muted leading-relaxed mb-8 max-w-2xl">
          n+α Ventures partners with VC-backed startups and PE portfolio companies to build the AI-native revenue engines that scale from $10M to $100M+ ARR.
        </p>

        {/* Social proof bar */}
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mb-10">
          {SOCIAL_PROOF.map((item, i) => (
            <span key={item} className="flex items-center gap-2.5 text-sm text-muted">
              {i > 0 && (
                <span className="hidden sm:inline text-white/20" aria-hidden="true">
                  ·
                </span>
              )}
              <span className="text-foreground/70 font-medium">{item}</span>
            </span>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href={SITE_CONFIG.calendarLink}
            className="inline-flex items-center justify-center gap-2.5 rounded-full bg-accent px-8 py-4 text-base font-semibold text-[#0B1221] hover:shadow-[0_0_30px_rgba(46,204,113,0.3)] hover:brightness-110 transition-all duration-300 group"
          >
            Book a Free GTM Audit Call
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
              className="transition-transform group-hover:translate-x-1"
            >
              <path
                d="M3 8h10m0 0L9 4m4 4L9 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
          <Link
            href="/case-studies/heygen"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 px-8 py-4 text-base font-medium text-foreground hover:bg-white/[0.04] hover:border-white/20 transition-all duration-300"
          >
            See Case Studies
          </Link>
        </div>
      </div>
    </section>
  );
}
