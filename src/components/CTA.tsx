import Link from "next/link";
import { SITE_CONFIG } from "@/lib/constants";

export default function CTA() {
  return (
    <section id="contact" className="relative py-24 lg:py-32 border-t border-white/5 overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-accent/[0.06] rounded-full blur-[150px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10 text-center">
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
          More Pipeline.
          <br />
          Better Conversions.
          <br />
          <span className="bg-gradient-to-r from-accent to-[#27AE60] bg-clip-text text-transparent italic">
            Real ROI.
          </span>
        </h2>
        <p className="text-lg text-muted max-w-lg mx-auto mb-10">
          Let&apos;s build a go-to-market engine that compounds. Start with a
          conversation.
        </p>
        <Link
          href={SITE_CONFIG.calendarLink}
          className="inline-flex items-center gap-2 rounded-full bg-accent px-8 py-4 text-base font-semibold text-[#0B1221] hover:shadow-[0_0_30px_rgba(46,204,113,0.3)] hover:brightness-110 transition-all duration-300 group"
        >
          Book a Call
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
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
      </div>
    </section>
  );
}
