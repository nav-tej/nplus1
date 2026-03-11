import { ImageResponse } from "next/og";

export const alt = "Nav Singh, Founder | nPlus1 Ventures | GTM Consulting";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const ICON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none"><rect width="64" height="64" rx="14" fill="#0B1221"/><defs><linearGradient id="ag" x1="14" y1="52" x2="50" y2="10" gradientUnits="userSpaceOnUse"><stop offset="0%" stop-color="#F97316"/><stop offset="55%" stop-color="#2563EB"/><stop offset="100%" stop-color="#60A5FA"/></linearGradient></defs><line x1="14" y1="52" x2="40" y2="21" stroke="url(#ag)" stroke-width="7.5" stroke-linecap="round"/><polygon points="50,10 46,26 36,16" fill="url(#ag)"/><path d="M 5 48 C 15 56 36 53 53 41" stroke="#F97316" stroke-width="4.5" fill="none" stroke-linecap="round"/><path d="M 9 42 C 18 49 36 47 50 36" stroke="#F97316" stroke-width="2.5" fill="none" stroke-linecap="round" opacity="0.7"/><circle cx="50" cy="10" r="5.5" fill="#F97316"/></svg>`;

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
            top: "-120px",
            left: "-60px",
            width: "480px",
            height: "480px",
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
            bottom: "-140px",
            right: "120px",
            width: "600px",
            height: "600px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(37,99,235,0.13) 0%, transparent 70%)",
            display: "flex",
          }}
        />

        {/* Left vertical accent */}
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
            gap: "32px",
            flex: 1,
            zIndex: 1,
          }}
        >
          {/* Small brand lockup at top */}
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
              {"nPlus"}
              <span style={{ color: "#F97316" }}>{"1"}</span>
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

          {/* Person name — hero text */}
          <div
            style={{
              display: "flex",
              fontSize: "82px",
              fontWeight: 800,
              color: "white",
              letterSpacing: "-3px",
              lineHeight: 1,
            }}
          >
            {"Nav Singh"}
          </div>

          {/* Title */}
          <div
            style={{
              display: "flex",
              fontSize: "28px",
              fontWeight: 400,
              color: "rgba(255,255,255,0.55)",
              lineHeight: 1.35,
            }}
          >
            {"Founder & Managing Partner · San Francisco"}
          </div>

          {/* Stats row */}
          <div style={{ display: "flex", gap: "40px", marginTop: "4px" }}>
            {[
              { value: "$500M+", label: "Revenue Growth" },
              { value: "$400M+", label: "Pipeline Generated" },
              { value: "20+", label: "Companies Advised" },
            ].map((stat) => (
              <div
                key={stat.label}
                style={{ display: "flex", flexDirection: "column", gap: "4px" }}
              >
                <div
                  style={{
                    display: "flex",
                    fontSize: "30px",
                    fontWeight: 700,
                    color: "#F97316",
                    letterSpacing: "-0.5px",
                  }}
                >
                  {stat.value}
                </div>
                <div
                  style={{
                    display: "flex",
                    fontSize: "14px",
                    color: "rgba(255,255,255,0.38)",
                    fontWeight: 500,
                  }}
                >
                  {stat.label}
                </div>
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
            opacity: 0.16,
            flexShrink: 0,
            marginRight: "-16px",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={markSrc} width={280} height={280} alt="" />
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
