import Link from "next/link";
import { CASE_STUDIES } from "@/lib/case-studies";

/**
 * Homepage teaser for the case study cluster. Server-rendered, no client JS,
 * and the strongest internal link path we have from the highest-authority page
 * to the pages that actually sell the work.
 */
// The homepage shows the three strongest studies. The rest live on the hub.
const FEATURED = ["heygen", "comfy", "charta-health"];

export default function CaseStudiesStrip() {
  const featured = FEATURED.map(
    (slug) => CASE_STUDIES.find((c) => c.slug === slug)!
  ).filter(Boolean);

  return (
    <section
      id="case-studies"
      className="py-24 lg:py-32 border-t border-white/5"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-14">
          <div className="max-w-2xl">
            <p className="text-accent text-sm font-medium tracking-wider uppercase mb-4">
              Case Studies
            </p>
            <h2 className="text-4xl lg:text-5xl font-bold tracking-tight">
              Built it, ran it,
              <br />
              <span className="text-muted">measured it.</span>
            </h2>
          </div>
          <Link
            href="/case-studies"
            className="text-sm font-semibold text-muted hover:text-accent transition-colors"
          >
            All case studies →
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {featured.map((study) => (
            <Link
              key={study.slug}
              href={`/case-studies/${study.slug}`}
              className="group flex flex-col rounded-3xl border border-white/10 bg-white/[0.02] p-8 hover:border-accent/30 hover:bg-white/[0.04] transition-colors"
            >
              <span className="inline-flex self-start items-center rounded-full border border-orange-400/30 bg-orange-400/10 px-3 py-1 text-xs font-medium text-orange-400 mb-5">
                {study.badge}
              </span>
              <h3 className="text-2xl font-bold mb-3 group-hover:text-accent transition-colors">
                {study.client}
              </h3>
              <p className="text-sm text-muted leading-relaxed mb-8 flex-1">
                {study.summary}
              </p>
              <dl className="grid grid-cols-2 gap-4 border-t border-white/5 pt-6">
                {study.metrics.slice(0, 2).map((metric) => (
                  <div key={metric.label}>
                    <dt className="sr-only">{metric.label}</dt>
                    <dd>
                      <span className="block text-xl font-extrabold text-accent">
                        {metric.value}
                      </span>
                      <span className="block text-[11px] text-muted mt-1 leading-snug">
                        {metric.label}
                      </span>
                    </dd>
                  </div>
                ))}
              </dl>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
