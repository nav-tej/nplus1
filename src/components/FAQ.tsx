import { FAQS } from "@/lib/constants";
import { SectionHeader } from "@/components/brand";

export default function FAQ() {
  return (
    <section id="faq" className="na-section" aria-labelledby="faq-heading">
      <div className="na-wrap">
        <SectionHeader id="faq-heading" index="07" eyebrow="FAQ" title="Questions founders ask first." />
        <div className="na-faq">
          {FAQS.map((faq) => (
            <details key={faq.question}>
              <summary>
                <h3 className="na-faq-q">{faq.question}</h3>
              </summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
