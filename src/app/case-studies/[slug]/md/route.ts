import { notFound } from "next/navigation";
import {
  DATA_DRIVEN_CASE_STUDIES,
  caseStudyToMarkdown,
  getCaseStudy,
} from "@/lib/case-studies";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return DATA_DRIVEN_CASE_STUDIES.map((study) => ({ slug: study.slug }));
}

export const dynamicParams = false;

export async function GET(_req: Request, { params }: Props) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study || study.hasCustomPage) return notFound();

  return new Response(caseStudyToMarkdown(study), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=86400, stale-while-revalidate=3600",
      "X-Robots-Tag": "noindex",
    },
  });
}
