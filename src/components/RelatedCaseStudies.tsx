import Link from "next/link";
import { CASE_STUDIES } from "@/lib/case-studies";

/**
 * Cross-links between case studies. Keeps the cluster internally linked so
 * authority flows between the hub and the individual studies.
 */
export default function RelatedCaseStudies({
  currentSlug,
}: {
  currentSlug: string;
}) {
  const others = CASE_STUDIES.filter(
    (study) => study.slug !== currentSlug
  ).slice(0, 3);
  if (others.length === 0) return null;

  return (
    <section className="mt-20">
      <div className="flex items-baseline justify-between gap-4 mb-6">
        <h2 className="text-sm font-bold uppercase tracking-widest text-muted">
          More case studies
        </h2>
        <Link
          href="/case-studies"
          className="text-sm text-muted hover:text-accent transition-colors"
        >
          See all →
        </Link>
      </div>
      <div className="grid sm:grid-cols-3 gap-6">
        {others.map((study) => (
          <Link
            key={study.slug}
            href={`/case-studies/${study.slug}`}
            className="group rounded-2xl border border-white/10 bg-white/[0.02] p-6 hover:border-accent/30 hover:bg-white/[0.04] transition-colors"
          >
            <span className="text-xs font-medium text-orange-400">
              {study.badge}
            </span>
            <h3 className="text-lg font-bold mt-2 mb-2 group-hover:text-accent transition-colors">
              {study.client}
            </h3>
            <p className="text-sm text-muted leading-relaxed line-clamp-3">
              {study.summary}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
