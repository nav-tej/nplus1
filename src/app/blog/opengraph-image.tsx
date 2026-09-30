import { ImageResponse } from "next/og";
import { BRAND, npaFonts, AlphaIconBox, HeroPlotMark } from "@/lib/og-brand";

export const alt = "GTM & Growth Blog | n+α Ventures";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const fonts = await npaFonts();
  return new ImageResponse(
    (
      <div
        style={{
          background: BRAND.bgGradient,
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 96px",
          position: "relative",
          overflow: "hidden",
          fontFamily: "NpaSans",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-160px",
            left: "-80px",
            width: "660px",
            height: "660px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(216,90,48,0.34) 0%, transparent 70%)",
            display: "flex",
          }}
        />
        <div style={{ position: "absolute", top: 0, left: 0, bottom: 0, width: "5px", background: BRAND.alpha, display: "flex" }} />

        <div style={{ display: "flex", flexDirection: "column", gap: "30px", flex: 1, zIndex: 1 }}>
          {/* small lockup */}
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <AlphaIconBox px={52} radius={11} />
            <div style={{ display: "flex", alignItems: "baseline", fontSize: "22px", fontWeight: 700, color: BRAND.mute, letterSpacing: "-0.5px" }}>
              <span style={{ fontFamily: "NpaSans" }}>n+</span>
              <span style={{ fontFamily: "NpaSerif", color: BRAND.alpha }}>α</span>
              <span style={{ fontSize: "13px", fontWeight: 500, letterSpacing: "5px", color: "rgba(255,255,255,0.28)", marginLeft: "8px" }}>
                VENTURES
              </span>
            </div>
          </div>

          {/* label pill */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div
              style={{
                display: "flex",
                fontSize: "14px",
                fontWeight: 600,
                color: BRAND.alpha,
                background: "rgba(216,90,48,0.12)",
                border: "1px solid rgba(216,90,48,0.30)",
                borderRadius: "100px",
                padding: "7px 18px",
                letterSpacing: "1px",
                textTransform: "uppercase",
              }}
            >
              Blog
            </div>
          </div>

          <div style={{ display: "flex", fontSize: "58px", fontWeight: 700, color: "white", letterSpacing: "-2px", lineHeight: 1.1, maxWidth: "660px" }}>
            GTM Frameworks &amp; Growth Playbooks
          </div>

          <div style={{ display: "flex", fontSize: "24px", fontWeight: 400, color: "rgba(255,255,255,0.50)", lineHeight: 1.4, maxWidth: "580px" }}>
            Real strategies from $500M+ in revenue growth
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", flexShrink: 0, marginRight: "-8px" }}>
          <HeroPlotMark px={310} opacity={0.30} />
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
