import { ImageResponse } from "next/og";

export const alt = "GTM & Growth Blog | n+α Ventures";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const ICON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none"><rect width="64" height="64" rx="14" fill="#0B1221"/><defs><linearGradient id="ag" x1="31" y1="21" x2="54" y2="45" gradientUnits="userSpaceOnUse"><stop offset="0%" stop-color="#F97316"/><stop offset="100%" stop-color="#60A5FA"/></linearGradient></defs><path d="M7,44 V21 C7,14 25,14 25,21 V44" stroke="white" stroke-width="4.5" fill="none" stroke-linecap="round"/><circle cx="16" cy="14" r="2.8" fill="#F97316"/><line x1="28.5" y1="32" x2="33.5" y2="32" stroke="white" stroke-width="2" opacity="0.4"/><line x1="31" y1="29.5" x2="31" y2="34.5" stroke="white" stroke-width="2" opacity="0.4"/><path d="M54,22 C46,20 34,24 34,33 C34,42 46,46 54,44" stroke="url(#ag)" stroke-width="4.5" fill="none" stroke-linecap="round"/><path d="M54,21 L54,45" stroke="url(#ag)" stroke-width="4.5" fill="none" stroke-linecap="round"/></svg>`;

const MARK_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none"><defs><linearGradient id="ag2" x1="31" y1="21" x2="54" y2="45" gradientUnits="userSpaceOnUse"><stop offset="0%" stop-color="#F97316"/><stop offset="100%" stop-color="#60A5FA"/></linearGradient></defs><path d="M7,44 V21 C7,14 25,14 25,21 V44" stroke="white" stroke-width="4.5" fill="none" stroke-linecap="round"/><circle cx="16" cy="14" r="2.8" fill="#F97316"/><line x1="28.5" y1="32" x2="33.5" y2="32" stroke="white" stroke-width="2" opacity="0.4"/><line x1="31" y1="29.5" x2="31" y2="34.5" stroke="white" stroke-width="2" opacity="0.4"/><path d="M54,22 C46,20 34,24 34,33 C34,42 46,46 54,44" stroke="url(#ag2)" stroke-width="4.5" fill="none" stroke-linecap="round"/><path d="M54,21 L54,45" stroke="url(#ag2)" stroke-width="4.5" fill="none" stroke-linecap="round"/></svg>`;

const toDataUri = (svg: string) =>
  `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;

export default function Image() {
  const iconSrc = toDataUri(ICON_SVG);
  const markSrc = toDataUri(MARK_SVG);

  return new ImageResponse(
    (
      <div
        style={{
          background: "#0B1221",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 96px",
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
              "radial-gradient(circle, rgba(249,115,22,0.18) 0%, transparent 70%)",
            display: "flex",
          }}
        />
        {/* Ambient glow — blue bottom-right */}
        <div
          style={{
            position: "absolute",
            bottom: "-160px",
            right: "160px",
            width: "620px",
            height: "620px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(37,99,235,0.14) 0%, transparent 70%)",
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

        {/* ── Main content ── */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "36px",
            flex: 1,
            zIndex: 1,
          }}
        >
          {/* Small brand lockup */}
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={iconSrc}
              width={52}
              height={52}
              alt=""
              style={{ borderRadius: "11px" }}
            />
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: "6px",
                fontSize: "22px",
                fontWeight: 700,
                color: "rgba(255,255,255,0.55)",
                letterSpacing: "-0.5px",
              }}
            >
              {"n+"}
              <span style={{ color: "#F97316" }}>{"α"}</span>
              <span
                style={{
                  fontSize: "13px",
                  fontWeight: 500,
                  letterSpacing: "5px",
                  color: "rgba(255,255,255,0.28)",
                  marginLeft: "4px",
                }}
              >
                {"VENTURES"}
              </span>
            </div>
          </div>

          {/* Label pill */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: "14px",
                fontWeight: 600,
                color: "#F97316",
                background: "rgba(249,115,22,0.12)",
                border: "1px solid rgba(249,115,22,0.3)",
                borderRadius: "100px",
                padding: "7px 18px",
                letterSpacing: "1px",
                textTransform: "uppercase",
              }}
            >
              {"Blog"}
            </div>
          </div>

          {/* Headline */}
          <div
            style={{
              display: "flex",
              fontSize: "58px",
              fontWeight: 800,
              color: "white",
              letterSpacing: "-2px",
              lineHeight: 1.1,
              maxWidth: "660px",
            }}
          >
            {"GTM Frameworks & Growth Playbooks"}
          </div>

          {/* Subline */}
          <div
            style={{
              display: "flex",
              fontSize: "24px",
              fontWeight: 400,
              color: "rgba(255,255,255,0.50)",
              lineHeight: 1.4,
              maxWidth: "580px",
            }}
          >
            {"Real strategies from $500M+ in revenue growth"}
          </div>
        </div>

        {/* Right: large decorative mark */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: 0.18,
            flexShrink: 0,
            marginRight: "-16px",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={markSrc} width={290} height={290} alt="" />
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
