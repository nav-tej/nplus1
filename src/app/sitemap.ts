import { MetadataRoute } from "next";
import { BLOG_POSTS } from "@/lib/blog";
import { SITE_CONFIG } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = `https://${SITE_CONFIG.domain}`;

  const routes = [
    "",
    "/about",
    "/blog",
    "/services/growth-marketing",
    "/services/revenue-operations",
    "/services/demand-generation",
    "/case-studies/heygen",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  const blogPosts = BLOG_POSTS.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.publishDate),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...routes, ...blogPosts];
}
