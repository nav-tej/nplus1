interface Faq {
  question: string;
  answer: string;
}

/**
 * Visible FAQ block for pages that also emit FAQPage JSON-LD.
 * Structured data has to describe content a reader can see, so any page that
 * passes `faqs` to <JsonLd> renders the same array here.
 */
export default function PageFaqs({
  faqs,
  heading = "Questions people ask",
}: {
  faqs: Faq[];
  heading?: string;
}) {
  if (!faqs.length) return null;
  return (
    <section className="py-20 border-t border-white/5" aria-label={heading}>
      <div className="mx-auto max-w-4xl px-6 lg:px-10">
        <h2 className="text-3xl font-bold mb-8">{heading}</h2>
        <div className="space-y-4">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="group rounded-xl border border-white/[0.06] bg-white/[0.02] overflow-hidden"
            >
              <summary className="flex items-center justify-between gap-4 px-5 lg:px-6 py-5 cursor-pointer list-none font-semibold">
                <h3 className="text-base font-semibold">{faq.question}</h3>
                <span className="text-accent text-xl transition-transform duration-300 group-open:rotate-45">
                  +
                </span>
              </summary>
              <div className="px-5 lg:px-6 pb-5 lg:pb-6 text-muted leading-relaxed">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
