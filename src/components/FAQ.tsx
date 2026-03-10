import Link from "next/link";
import { FAQS, SITE_CONFIG } from "@/lib/constants";

export default function FAQ() {
  return (
    <section id="faq" className="py-24 lg:py-32 border-t border-white/5">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid lg:grid-cols-[1fr_380px] gap-12 lg:gap-16">
          {/* Left — Accordion */}
          <div>
            <p className="text-accent text-sm font-medium tracking-wider uppercase mb-4">
              FAQ
            </p>
            <h2 className="text-4xl lg:text-5xl font-bold tracking-tight mb-12">
              Frequently Asked
              <br />
              <span className="text-muted">Questions</span>
            </h2>

            <div className="space-y-3">
              {FAQS.map((faq, i) => (
                <details
                  key={i}
                  className="group rounded-xl border border-white/[0.06] bg-white/[0.02] overflow-hidden"
                >
                  <summary className="flex w-full items-center justify-between p-5 lg:p-6 text-left cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                    <h3 className="font-medium pr-4">{faq.question}</h3>
                    <span className="text-accent text-xl flex-shrink-0 transition-transform duration-300 group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <div className="grid grid-rows-[0fr] group-open:grid-rows-[1fr] transition-[grid-template-rows] duration-300">
                    <div className="overflow-hidden">
                      <p className="px-5 lg:px-6 pb-5 lg:pb-6 text-muted leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </details>
              ))}
            </div>
          </div>

          {/* Right — CTA Card */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <div className="rounded-2xl bg-[#1A1D23] border border-white/[0.06] p-8">
              <h3 className="text-xl font-semibold mb-3">
                Need more answers?
              </h3>
              <p className="text-muted text-sm leading-relaxed mb-6">
                We&apos;d love to hear about your growth challenges and see if
                we&apos;re the right fit.
              </p>
              <Link
                href={SITE_CONFIG.calendarLink}
                className="inline-flex items-center justify-center gap-2 w-full rounded-full bg-accent px-6 py-3 text-sm font-semibold text-[#0B1221] hover:brightness-110 transition-all duration-200"
              >
                Get in Touch
              </Link>
              <p className="text-xs text-muted text-center mt-4">
                or email us at{" "}
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="text-accent hover:underline"
                >
                  {SITE_CONFIG.email}
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
