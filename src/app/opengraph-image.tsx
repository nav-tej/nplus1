import { ImageResponse } from "next/og";
import { BRAND, npaFonts, AlphaIconBox, BrandWordmark, HeroPlotMark } from "@/lib/og-brand";

export const alt = "n+α Ventures | Go-To-Market Consulting";
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
        {/* warm ambient glow */}
        <div
          style={{
            position: "absolute",
            top: "-180px",
            left: "-100px",
            width: "660px",
            height: "660px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(216,90,48,0.34) 0%, transparent 70%)",
            display: "flex",
          }}
        />
        {/* left accent rail */}
        <div style={{ position: "absolute", top: 0, left: 0, bottom: 0, width: "5px", background: BRAND.alpha, display: "flex" }} />

        {/* main content */}
        <div style={{ display: "flex", flexDirection: "column", gap: "38px", flex: 1, zIndex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "26px" }}>
            <AlphaIconBox px={100} />
            <BrandWordmark size={76} />
          </div>

          <div style={{ display: "flex", fontSize: "33px", fontWeight: 400, color: BRAND.mute, lineHeight: 1.35, maxWidth: "600px" }}>
            B2B Go-To-Market Consulting
          </div>

          <div style={{ display: "flex", gap: "14px" }}>
            {["Demand Generation", "Revenue Operations", "GTM Strategy"].map((tag) => (
              <div
                key={tag}
                style={{
                  display: "flex",
                  fontSize: "15px",
                  color: "rgba(255,255,255,0.55)",
                  background: "rgba(216,90,48,0.10)",
                  border: "1px solid rgba(216,90,48,0.28)",
                  borderRadius: "100px",
                  padding: "9px 22px",
                }}
              >
                {tag}
              </div>
            ))}
          </div>
        </div>

        {/* right decorative signature-plot mark */}
        <div style={{ display: "flex", alignItems: "center", flexShrink: 0, marginRight: "-8px" }}>
          <HeroPlotMark px={340} opacity={0.32} />
        </div>

        {/* bottom accent */}
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
