import { notFound } from "next/navigation";
import { BLOG_POSTS } from "@/lib/blog";
import { BLOG_CONTENT_MD } from "@/lib/blog-content-md";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export async function GET(_req: Request, { params }: Props) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) return notFound();

  const markdown = BLOG_CONTENT_MD[slug];
  if (!markdown) return notFound();

  return new Response(markdown, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=86400, stale-while-revalidate=3600",
      "X-Robots-Tag": "noindex",
    },
  });
}
