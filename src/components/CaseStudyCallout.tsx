import Link from "next/link";
import { BLOG_TO_CASE_STUDY, getCaseStudy } from "@/lib/case-studies";

/**
 * Links a blog post to the engagement that proves its argument. Posts rank;
 * case studies convert. This is the path between the two.
 */
export default function CaseStudyCallout({ postSlug }: { postSlug: string }) {
  const slug = BLOG_TO_CASE_STUDY[postSlug];
  const study = slug ? getCaseStudy(slug) : undefined;
  if (!study) return null;

  return (
    <section className="py-16 border-t border-white/5">
      <div className="mx-auto max-w-3xl px-6 lg:px-10">
        <h2 className="text-lg font-bold text-foreground mb-6">
          This, in practice
        </h2>
        <Link
          href={`/case-studies/${study.slug}`}
          className="group block rounded-2xl border border-white/10 bg-white/[0.03] p-6 hover:border-accent/30 hover:bg-white/[0.05] transition-all duration-300"
        >
          <span className="inline-flex items-center rounded-full border border-orange-400/30 bg-orange-400/10 px-2.5 py-0.5 text-xs font-medium text-orange-400 mb-4">
            {study.badge}
          </span>
          <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-accent transition-colors">
            {study.client}: {study.titleAccent}
          </h3>
          <p className="text-sm text-muted leading-relaxed mb-5">
            {study.summary}
          </p>
          <dl className="flex flex-wrap gap-x-8 gap-y-3">
            {study.metrics.slice(0, 3).map((metric) => (
              <div key={metric.label}>
                <dt className="sr-only">{metric.label}</dt>
                <dd>
                  <span className="block text-lg font-extrabold text-accent">
                    {metric.value}
                  </span>
                  <span className="block text-[11px] text-muted leading-snug">
                    {metric.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </Link>
      </div>
    </section>
  );
}
