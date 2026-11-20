"use client";

import { usePostHog } from "posthog-js/react";

/**
 * Downloadable CV PDFs (public/cv). Each click fires `cv_downloaded` in
 * PostHog with the version and the page it came from, so downloads can be
 * counted by version and by entry point.
 */
export const CV_FILES = [
  {
    version: "growth",
    title: "Growth and marketing",
    blurb:
      "SEO and AEO, lifecycle, launches, review programs and growth analytics, from Egnyte to HeyGen and Comfy.",
    href: "/cv/nav-singh-cv-growth.pdf",
    filename: "Nav-Singh-CV-Growth.pdf",
  },
  {
    version: "revops",
    title: "Revenue operations",
    blurb:
      "The same history told through pipeline operations: attribution, forecasting, routing, enrichment and lifecycle.",
    href: "/cv/nav-singh-cv-revops.pdf",
    filename: "Nav-Singh-CV-RevOps.pdf",
  },
] as const;

export default function CvDownloads({ location }: { location: "about" | "cv" }) {
  const ph = usePostHog();

  return (
    <div className="grid sm:grid-cols-2 gap-4">
      {CV_FILES.map((cv) => (
        <a
          key={cv.version}
          href={cv.href}
          download={cv.filename}
          onClick={() =>
            ph?.capture("cv_downloaded", {
              version: cv.version,
              location,
              file: cv.href,
            })
          }
          className="group flex flex-col gap-2 rounded-2xl border border-white/10 bg-white/[0.03] p-6 hover:border-alpha/25 transition-colors"
        >
          <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-alpha-text">
            PDF · 2 pages
          </span>
          <span className="text-lg font-bold text-foreground">{cv.title}</span>
          <span className="text-sm text-muted leading-relaxed">{cv.blurb}</span>
          <span className="mt-2 text-sm font-medium text-foreground">
            Download PDF <span aria-hidden="true">→</span>
          </span>
        </a>
      ))}
    </div>
  );
}
