import { BLOG_POSTS } from "@/lib/blog";
import { SITE_CONFIG } from "@/lib/constants";

export async function GET() {
  const baseUrl = `https://${SITE_CONFIG.domain}`;
  const feedUrl = `${baseUrl}/feed.xml`;

  const items = BLOG_POSTS.map((post) => {
    return `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${baseUrl}/blog/${post.slug}</link>
      <guid>${baseUrl}/blog/${post.slug}</guid>
      <pubDate>${new Date(post.publishDate).toUTCString()}</pubDate>
      <description><![CDATA[${post.description}]]></description>
    </item>`;
  }).join("");

  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>${SITE_CONFIG.name}</title>
  <link>${baseUrl}</link>
  <description>${SITE_CONFIG.description}</description>
  <language>en-us</language>
  <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
  <atom:link href="${feedUrl}" rel="self" type="application/rss+xml" />
  ${items}
</channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
