import { ImageResponse } from "next/og";
import { BLOG_POSTS } from "@/lib/blog";
import { BRAND, npaFonts, AlphaIconBox, HeroPlotMark } from "@/lib/og-brand";

export const alt = "n+α Ventures Blog Post";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  const fonts = await npaFonts();

  const title = post?.title ?? "GTM Frameworks & Growth Playbooks";
  const category = post?.category ?? "Growth Marketing";
  const readTime = post?.readTime;

  return new ImageResponse(
    (
      <div
        style={{
          background: BRAND.bgGradient,
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 96px",
          position: "relative",
          overflow: "hidden",
          fontFamily: "NpaSans",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-140px",
            left: "-80px",
            width: "640px",
            height: "640px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(216,90,48,0.32) 0%, transparent 70%)",
            display: "flex",
          }}
        />
        <div style={{ position: "absolute", top: 0, left: 0, bottom: 0, width: "5px", background: BRAND.alpha, display: "flex" }} />

        {/* decorative mark — top right */}
        <div style={{ position: "absolute", top: "44px", right: "72px", opacity: 0.24, display: "flex" }}>
          <HeroPlotMark px={230} opacity={1} />
        </div>

        {/* top: brand lockup */}
        <div style={{ display: "flex", alignItems: "center", gap: "14px", zIndex: 1 }}>
          <AlphaIconBox px={44} radius={10} />
          <div style={{ display: "flex", alignItems: "baseline", fontSize: "19px", fontWeight: 700, color: "rgba(255,255,255,0.45)", letterSpacing: "-0.5px" }}>
            <span style={{ fontFamily: "NpaSans" }}>n+</span>
            <span style={{ fontFamily: "NpaSerif", color: BRAND.alpha }}>α</span>
            <span style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "5px", color: "rgba(255,255,255,0.25)", marginLeft: "8px" }}>
              VENTURES
            </span>
          </div>
        </div>

        {/* middle: category + title */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px", zIndex: 1, maxWidth: "920px" }}>
          <div
            style={{
              display: "flex",
              fontSize: "13px",
              fontWeight: 600,
              color: BRAND.alpha,
              background: "rgba(216,90,48,0.12)",
              border: "1px solid rgba(216,90,48,0.30)",
              borderRadius: "100px",
              padding: "6px 16px",
              letterSpacing: "0.5px",
              alignSelf: "flex-start",
            }}
          >
            {category}
          </div>

          <div
            style={{
              display: "flex",
              fontSize: title.length > 60 ? "42px" : "52px",
              fontWeight: 700,
              color: "white",
              letterSpacing: "-1.5px",
              lineHeight: 1.15,
            }}
          >
            {title}
          </div>
        </div>

        {/* bottom: author + read time */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", zIndex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "42px",
                height: "42px",
                borderRadius: "50%",
                background: "rgba(216,90,48,0.15)",
                border: "1px solid rgba(216,90,48,0.30)",
                fontSize: "13px",
                fontWeight: 700,
                color: BRAND.alpha,
              }}
            >
              NS
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
              <div style={{ display: "flex", fontSize: "16px", fontWeight: 600, color: "rgba(255,255,255,0.85)" }}>
                Nav Singh
              </div>
              <div style={{ display: "flex", fontSize: "13px", color: "rgba(255,255,255,0.38)" }}>
                Founder &amp; Managing Partner · n+α Ventures
              </div>
            </div>
          </div>

          {readTime && (
            <div style={{ display: "flex", fontSize: "14px", color: "rgba(255,255,255,0.35)", fontWeight: 500 }}>
              {`${readTime} min read`}
            </div>
          )}
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "5px",
            background: `linear-gradient(to right, ${BRAND.alpha}, ${BRAND.alphaSoft})`,
            display: "flex",
          }}
        />
      </div>
    ),
    { ...size, fonts },
  );
}
