import { ImageResponse } from "next/og";
import { BRAND, npaFonts, AlphaIconBox, HeroPlotMark } from "@/lib/og-brand";

export const alt = "Nav Singh, Founder | n+α Ventures | GTM Consulting";
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
            top: "-140px",
            left: "-60px",
            width: "640px",
            height: "640px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(216,90,48,0.32) 0%, transparent 70%)",
            display: "flex",
          }}
        />
        <div style={{ position: "absolute", top: 0, left: 0, bottom: 0, width: "5px", background: BRAND.alpha, display: "flex" }} />

        <div style={{ display: "flex", flexDirection: "column", gap: "32px", flex: 1, zIndex: 1 }}>
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

          <div style={{ display: "flex", fontSize: "82px", fontWeight: 700, color: "white", letterSpacing: "-3px", lineHeight: 1 }}>
            Nav Singh
          </div>

          <div style={{ display: "flex", fontSize: "28px", fontWeight: 400, color: BRAND.mute, lineHeight: 1.35 }}>
            Founder &amp; Managing Partner · San Francisco
          </div>

          <div style={{ display: "flex", gap: "40px", marginTop: "4px" }}>
            {[
              { value: "$500M+", label: "Revenue Growth" },
              { value: "$400M+", label: "Pipeline Generated" },
              { value: "20+", label: "Companies Advised" },
            ].map((stat) => (
              <div key={stat.label} style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                <div style={{ display: "flex", fontSize: "30px", fontWeight: 700, color: BRAND.alpha, letterSpacing: "-0.5px" }}>
                  {stat.value}
                </div>
                <div style={{ display: "flex", fontSize: "14px", color: "rgba(255,255,255,0.38)", fontWeight: 500 }}>
                  {stat.label}
                </div>
              </div>
            ))}
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
