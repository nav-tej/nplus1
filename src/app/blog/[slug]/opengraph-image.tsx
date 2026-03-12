import { ImageResponse } from "next/og";
import { BLOG_POSTS } from "@/lib/blog";

export const alt = "nPlus1 Ventures Blog Post";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

const ICON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none"><rect width="64" height="64" rx="14" fill="#0B1221"/><defs><linearGradient id="ag" x1="14" y1="52" x2="50" y2="10" gradientUnits="userSpaceOnUse"><stop offset="0%" stop-color="#F97316"/><stop offset="55%" stop-color="#2563EB"/><stop offset="100%" stop-color="#60A5FA"/></linearGradient></defs><line x1="14" y1="52" x2="40" y2="21" stroke="url(#ag)" stroke-width="7.5" stroke-linecap="round"/><polygon points="50,10 46,26 36,16" fill="url(#ag)"/><path d="M 5 48 C 15 56 36 53 53 41" stroke="#F97316" stroke-width="4.5" fill="none" stroke-linecap="round"/><path d="M 9 42 C 18 49 36 47 50 36" stroke="#F97316" stroke-width="2.5" fill="none" stroke-linecap="round" opacity="0.7"/><circle cx="50" cy="10" r="5.5" fill="#F97316"/></svg>`;

const MARK_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none"><defs><linearGradient id="ag2" x1="14" y1="52" x2="50" y2="10" gradientUnits="userSpaceOnUse"><stop offset="0%" stop-color="#F97316"/><stop offset="55%" stop-color="#2563EB"/><stop offset="100%" stop-color="#60A5FA"/></linearGradient></defs><line x1="14" y1="52" x2="40" y2="21" stroke="url(#ag2)" stroke-width="7.5" stroke-linecap="round"/><polygon points="50,10 46,26 36,16" fill="url(#ag2)"/><path d="M 5 48 C 15 56 36 53 53 41" stroke="#F97316" stroke-width="4.5" fill="none" stroke-linecap="round"/><path d="M 9 42 C 18 49 36 47 50 36" stroke="#F97316" stroke-width="2.5" fill="none" stroke-linecap="round" opacity="0.7"/><circle cx="50" cy="10" r="5.5" fill="#F97316"/></svg>`;

const toDataUri = (svg: string) =>
  `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  const iconSrc = toDataUri(ICON_SVG);
  const markSrc = toDataUri(MARK_SVG);

  const title = post?.title ?? "GTM Frameworks & Growth Playbooks";
  const category = post?.category ?? "Growth Marketing";
  const readTime = post?.readTime;

  return new ImageResponse(
    (
      <div
        style={{
          background: "#0B1221",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 96px",
          position: "relative",
          overflow: "hidden",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Ambient glow — orange top-left */}
        <div
          style={{
            position: "absolute",
            top: "-140px",
            left: "-80px",
            width: "520px",
            height: "520px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(249,115,22,0.16) 0%, transparent 70%)",
            display: "flex",
          }}
        />
        {/* Ambient glow — blue bottom-right */}
        <div
          style={{
            position: "absolute",
            bottom: "-160px",
            right: "80px",
            width: "580px",
            height: "580px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(37,99,235,0.13) 0%, transparent 70%)",
            display: "flex",
          }}
        />

        {/* Left vertical accent line */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            width: "5px",
            background: "linear-gradient(to bottom, #F97316, #2563EB)",
            display: "flex",
          }}
        />

        {/* Decorative mark — top right */}
        <div
          style={{
            position: "absolute",
            top: "40px",
            right: "80px",
            opacity: 0.12,
            display: "flex",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={markSrc} width={220} height={220} alt="" />
        </div>

        {/* ── Top: brand lockup ── */}
        <div style={{ display: "flex", alignItems: "center", gap: "14px", zIndex: 1 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={iconSrc}
            width={44}
            height={44}
            alt=""
            style={{ borderRadius: "10px" }}
          />
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: "5px",
              fontSize: "19px",
              fontWeight: 700,
              color: "rgba(255,255,255,0.45)",
              letterSpacing: "-0.5px",
            }}
          >
            {"nPlus"}
            <span style={{ color: "#F97316" }}>{"1"}</span>
            <span
              style={{
                fontSize: "11px",
                fontWeight: 500,
                letterSpacing: "5px",
                color: "rgba(255,255,255,0.25)",
                marginLeft: "4px",
              }}
            >
              {"VENTURES"}
            </span>
          </div>
        </div>

        {/* ── Middle: category + title ── */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "24px",
            zIndex: 1,
            maxWidth: "920px",
          }}
        >
          {/* Category pill */}
          <div
            style={{
              display: "flex",
              fontSize: "13px",
              fontWeight: 600,
              color: "#F97316",
              background: "rgba(249,115,22,0.12)",
              border: "1px solid rgba(249,115,22,0.3)",
              borderRadius: "100px",
              padding: "6px 16px",
              letterSpacing: "0.5px",
              alignSelf: "flex-start",
            }}
          >
            {category}
          </div>

          {/* Post title */}
          <div
            style={{
              display: "flex",
              fontSize: title.length > 60 ? "42px" : "52px",
              fontWeight: 800,
              color: "white",
              letterSpacing: "-1.5px",
              lineHeight: 1.15,
            }}
          >
            {title}
          </div>
        </div>

        {/* ── Bottom: author + read time ── */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            zIndex: 1,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "42px",
                height: "42px",
                borderRadius: "50%",
                background: "rgba(249,115,22,0.15)",
                border: "1px solid rgba(249,115,22,0.3)",
                fontSize: "13px",
                fontWeight: 700,
                color: "#F97316",
              }}
            >
              {"NS"}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
              <div
                style={{
                  display: "flex",
                  fontSize: "16px",
                  fontWeight: 600,
                  color: "rgba(255,255,255,0.85)",
                }}
              >
                {"Nav Singh"}
              </div>
              <div
                style={{
                  display: "flex",
                  fontSize: "13px",
                  color: "rgba(255,255,255,0.38)",
                }}
              >
                {"Founder & Managing Partner · nPlus1 Ventures"}
              </div>
            </div>
          </div>

          {readTime && (
            <div
              style={{
                display: "flex",
                fontSize: "14px",
                color: "rgba(255,255,255,0.35)",
                fontWeight: 500,
              }}
            >
              {`${readTime} min read`}
            </div>
          )}
        </div>

        {/* Bottom gradient line */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "5px",
            background:
              "linear-gradient(to right, #F97316, #2563EB, #60A5FA)",
            display: "flex",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
