import dynamic from "next/dynamic";

// Lazy-load the form — it depends on posthog-js/react which adds weight
const ContactForm = dynamic(() => import("./ContactForm"));

export default function CTA() {
  return (
    <section
      id="contact"
      className="relative py-24 lg:py-32 border-t border-white/5 overflow-hidden"
    >
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-accent/[0.06] rounded-full blur-[150px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-start">
          {/* Left — Copy */}
          <div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
              More Pipeline.
              <br />
              Better Conversions.
              <br />
              <span className="bg-gradient-to-r from-accent to-[#27AE60] bg-clip-text text-transparent italic">
                Real ROI.
              </span>
            </h2>
            <p className="text-lg text-muted max-w-lg mb-8">
              Let&apos;s build a go-to-market engine that compounds. Fill out
              the form and we&apos;ll be in touch within one business day.
            </p>
            <div className="flex items-center gap-3 text-sm text-muted">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
                className="text-accent flex-shrink-0"
              >
                <path
                  d="M2 4l6 4 6-4M2 4v8a1 1 0 001 1h10a1 1 0 001-1V4M2 4a1 1 0 011-1h10a1 1 0 011 1"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>
                or email us at{" "}
                <a
                  href="mailto:hello@nplusalpha.com"
                  className="text-accent hover:underline"
                >
                  hello@nplusalpha.com
                </a>
              </span>
            </div>
          </div>

          {/* Right — Form */}
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8 lg:p-10">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
