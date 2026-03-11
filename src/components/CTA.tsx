import ContactForm from "@/components/ContactForm";

export default function CTA() {
  return (
    <section
      id="contact"
      className="relative py-24 lg:py-32 border-t border-white/5 overflow-hidden"
    >
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-accent/[0.06] rounded-full blur-[150px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left — Heading */}
          <div className="lg:sticky lg:top-32">
            <p className="text-accent text-sm font-medium tracking-wider uppercase mb-4">
              Get Started
            </p>
            <h2 className="text-4xl sm:text-5xl lg:text-5xl font-bold tracking-tight mb-4">
              More Pipeline.
              <br />
              Better Conversions.
              <br />
              <span className="bg-gradient-to-r from-accent to-[#27AE60] bg-clip-text text-transparent italic">
                Real ROI.
              </span>
            </h2>
            <p className="text-lg text-muted max-w-lg mb-8">
              Let&apos;s build a go-to-market engine that compounds. Start with
              a conversation.
            </p>

            {/* Trust signals */}
            <div className="flex flex-wrap gap-6 text-sm text-muted">
              <div className="flex items-center gap-2">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="text-accent"
                >
                  <path
                    d="M20 6L9 17l-5-5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                No commitment required
              </div>
              <div className="flex items-center gap-2">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="text-accent"
                >
                  <path
                    d="M20 6L9 17l-5-5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Response within 24h
              </div>
              <div className="flex items-center gap-2">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="text-accent"
                >
                  <path
                    d="M20 6L9 17l-5-5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Free initial consultation
              </div>
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
