import { ImageResponse } from "next/og";

export const alt = "nPlus1 Ventures | Go-To-Market Consulting";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Brand mark SVG — with rounded square background (mirrors favicon)
const ICON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none"><rect width="64" height="64" rx="14" fill="#0B1221"/><defs><linearGradient id="ag" x1="14" y1="52" x2="50" y2="10" gradientUnits="userSpaceOnUse"><stop offset="0%" stop-color="#F97316"/><stop offset="55%" stop-color="#2563EB"/><stop offset="100%" stop-color="#60A5FA"/></linearGradient></defs><line x1="14" y1="52" x2="40" y2="21" stroke="url(#ag)" stroke-width="7.5" stroke-linecap="round"/><polygon points="50,10 46,26 36,16" fill="url(#ag)"/><path d="M 5 48 C 15 56 36 53 53 41" stroke="#F97316" stroke-width="4.5" fill="none" stroke-linecap="round"/><path d="M 9 42 C 18 49 36 47 50 36" stroke="#F97316" stroke-width="2.5" fill="none" stroke-linecap="round" opacity="0.7"/><circle cx="50" cy="10" r="5.5" fill="#F97316"/></svg>`;

// Brand mark SVG — no background (for large decorative use)
const MARK_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none"><defs><linearGradient id="ag2" x1="14" y1="52" x2="50" y2="10" gradientUnits="userSpaceOnUse"><stop offset="0%" stop-color="#F97316"/><stop offset="55%" stop-color="#2563EB"/><stop offset="100%" stop-color="#60A5FA"/></linearGradient></defs><line x1="14" y1="52" x2="40" y2="21" stroke="url(#ag2)" stroke-width="7.5" stroke-linecap="round"/><polygon points="50,10 46,26 36,16" fill="url(#ag2)"/><path d="M 5 48 C 15 56 36 53 53 41" stroke="#F97316" stroke-width="4.5" fill="none" stroke-linecap="round"/><path d="M 9 42 C 18 49 36 47 50 36" stroke="#F97316" stroke-width="2.5" fill="none" stroke-linecap="round" opacity="0.7"/><circle cx="50" cy="10" r="5.5" fill="#F97316"/></svg>`;

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
            gap: "38px",
            flex: 1,
            zIndex: 1,
          }}
        >
          {/* Icon + Wordmark */}
          <div style={{ display: "flex", alignItems: "center", gap: "26px" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={iconSrc}
              width={100}
              height={100}
              alt=""
              style={{ borderRadius: "22px" }}
            />
            <div
              style={{ display: "flex", flexDirection: "column", gap: "7px" }}
            >
              <div
                style={{
                  display: "flex",
                  fontSize: "76px",
                  fontWeight: 800,
                  color: "white",
                  letterSpacing: "-3px",
                  lineHeight: 1,
                }}
              >
                {"nPlus"}
                <span style={{ color: "#F97316" }}>{"1"}</span>
              </div>
              <div
                style={{
                  display: "flex",
                  fontSize: "17px",
                  fontWeight: 600,
                  color: "rgba(255,255,255,0.32)",
                  letterSpacing: "8px",
                }}
              >
                {"VENTURES"}
              </div>
            </div>
          </div>

          {/* Tagline */}
          <div
            style={{
              display: "flex",
              fontSize: "33px",
              fontWeight: 400,
              color: "rgba(255,255,255,0.62)",
              lineHeight: 1.35,
              maxWidth: "600px",
            }}
          >
            {"B2B Go-To-Market Consulting"}
          </div>

          {/* Service pills */}
          <div style={{ display: "flex", gap: "14px" }}>
            {[
              "Demand Generation",
              "Revenue Operations",
              "GTM Strategy",
            ].map((tag) => (
              <div
                key={tag}
                style={{
                  display: "flex",
                  fontSize: "15px",
                  color: "rgba(255,255,255,0.45)",
                  background: "rgba(255,255,255,0.07)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: "100px",
                  padding: "9px 22px",
                }}
              >
                {tag}
              </div>
            ))}
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
