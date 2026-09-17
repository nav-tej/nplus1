import { MetadataRoute } from "next";
import { BLOG_POSTS } from "@/lib/blog";
import { CASE_STUDIES } from "@/lib/case-studies";
import { SITE_CONFIG } from "@/lib/constants";
import { VIDEOS } from "@/lib/videos";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = `https://${SITE_CONFIG.domain}`;

  // 2026-09-17: case study cluster (hub page + Comfy + Charta Health).
  const caseStudyRefresh = new Date("2026-09-17");

  // Static dates — update when page content meaningfully changes.
  // 2026-05-31: site-wide rebrand (new n+α mark, nav/footer lockups, OG images,
  // and Organization/WebSite alternateName) touched every page below.
  const brandRefresh = new Date("2026-05-31");
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, lastModified: brandRefresh, changeFrequency: "monthly", priority: 1.0 },
    { url: `${baseUrl}/about`, lastModified: brandRefresh, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/blog`, lastModified: brandRefresh, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/services/growth-marketing`, lastModified: brandRefresh, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/services/revenue-operations`, lastModified: brandRefresh, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/services/demand-generation`, lastModified: brandRefresh, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/case-studies`, lastModified: caseStudyRefresh, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/results`, lastModified: caseStudyRefresh, changeFrequency: "monthly", priority: 0.85 },
    { url: `${baseUrl}/fractional-cmo-vs-agency`, lastModified: caseStudyRefresh, changeFrequency: "monthly", priority: 0.85 },
    { url: `${baseUrl}/framework`, lastModified: brandRefresh, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/tools/funnel-velocity`, lastModified: brandRefresh, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/resources/agentic-outbound`, lastModified: brandRefresh, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/portfolio`, lastModified: brandRefresh, changeFrequency: "monthly", priority: 0.85 },
  ];

  const routes = staticRoutes;

  const caseStudies = CASE_STUDIES.map((study) => ({
    url: `${baseUrl}/case-studies/${study.slug}`,
    lastModified: new Date(study.dateModified),
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  const blogPosts = BLOG_POSTS.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.publishDate),
    changeFrequency: "never" as const,
    priority: 0.7,
  }));

  const videoRoutes = Object.keys(VIDEOS).map((slug) => ({
    url: `${baseUrl}/videos/${slug}`,
    lastModified: new Date(VIDEOS[slug].uploadDate),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...routes, ...caseStudies, ...blogPosts, ...videoRoutes];
}
