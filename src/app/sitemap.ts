import { MetadataRoute } from "next";
import { BLOG_POSTS } from "@/lib/blog";
import { SITE_CONFIG } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = `https://${SITE_CONFIG.domain}`;

  // Static dates — update when page content meaningfully changes
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}`, lastModified: new Date("2026-03-12"), changeFrequency: "monthly", priority: 1.0 },
    { url: `${baseUrl}/about`, lastModified: new Date("2026-02-01"), changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/blog`, lastModified: new Date("2026-03-01"), changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/services/growth-marketing`, lastModified: new Date("2026-02-15"), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/services/revenue-operations`, lastModified: new Date("2026-02-15"), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/services/demand-generation`, lastModified: new Date("2026-02-15"), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/case-studies/heygen`, lastModified: new Date("2026-02-01"), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/case-studies`, lastModified: new Date("2026-03-12"), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/framework`, lastModified: new Date("2026-03-13"), changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/tools/funnel-velocity`, lastModified: new Date("2026-03-12"), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/resources/agentic-outbound`, lastModified: new Date("2026-03-12"), changeFrequency: "monthly", priority: 0.8 },
  ];

  const routes = staticRoutes;

  const blogPosts = BLOG_POSTS.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.publishDate),
    changeFrequency: "never" as const,
    priority: 0.7,
  }));

  return [...routes, ...blogPosts];
}
