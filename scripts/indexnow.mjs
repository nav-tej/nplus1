#!/usr/bin/env node
/**
 * Submit the site's URLs to IndexNow (Bing, Yandex, DuckDuckGo, Seznam, Naver).
 * Google does NOT participate in IndexNow — for Google, bump sitemap lastmod
 * (done) and use Search Console → URL Inspection → Request Indexing.
 *
 * The key file (public/<key>.txt) must already be live on the domain before
 * running this, so the search engines can verify ownership.
 *
 * URLs are read from the live sitemap so this never drifts from the site
 * again. Pass paths explicitly to submit a subset:
 *
 *   node scripts/indexnow.mjs
 *   node scripts/indexnow.mjs /case-studies /case-studies/comfy
 */
const HOST = "nplusalpha.com";
const KEY = "8e76a8e6a335a889632214eede5b72da";

const explicit = process.argv.slice(2);

async function urlsFromSitemap() {
  const res = await fetch(`https://${HOST}/sitemap.xml`);
  if (!res.ok) throw new Error(`sitemap fetch failed: ${res.status}`);
  const xml = await res.text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}

const urlList = explicit.length
  ? explicit.map((p) => `https://${HOST}${p.startsWith("/") ? p : `/${p}`}`)
  : await urlsFromSitemap();

if (urlList.length === 0) {
  console.error("No URLs to submit.");
  process.exit(1);
}

const body = {
  host: HOST,
  key: KEY,
  keyLocation: `https://${HOST}/${KEY}.txt`,
  urlList,
};

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify(body),
});

console.log(`Submitted ${urlList.length} URLs → ${res.status} ${res.statusText}`);
for (const u of urlList) console.log(`  ${u}`);
if (!res.ok) {
  console.error(await res.text());
  process.exit(1);
}
