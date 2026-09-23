/**
 * Shared brand primitives for the n+α Ventures OG images (next/og · Satori).
 *
 * The brand mark is the "signature plot" n+α: a serif terracotta α with a rising
 * data-plot. Satori can't read woff2 and won't render serif text inside an <svg>
 * image, so glyphs are HTML <span>s using fonts loaded here, and the plot is
 * inline <svg> geometry (shapes only).
 */
import type { ReactElement } from "react";

export const BRAND = {
  bg: "#0B1221", // site navy
  // Lighter diagonal navy — lifts the cards out of near-black.
  bgGradient: "linear-gradient(135deg, #1C2F4D 0%, #122340 42%, #0B1221 100%)",
  ink: "#FFFFFF",
  inkWarm: "#E8E4DE",
  mute: "rgba(255,255,255,0.66)",
  faint: "rgba(255,255,255,0.34)",
  alpha: "#D85A30", // terracotta α + plot accent
  alphaSoft: "#E8A06A",
} as const;

type LoadedFont = { name: string; data: ArrayBuffer; weight: 400 | 700; style: "normal" };

async function fetchGoogleFontTTF(family: string, weight: number): Promise<ArrayBuffer> {
  const url = `https://fonts.googleapis.com/css2?family=${family.replace(/ /g, "+")}:wght@${weight}`;
  const css = await (
    await fetch(url, {
      headers: { "User-Agent": "Mozilla/4.0 (compatible; MSIE 6.0)" }, // old UA → TTF, not woff2
      next: { revalidate: 60 * 60 * 24 * 30 },
    })
  ).text();
  const match = css.match(/src: url\((.+?)\) format\('(?:truetype|opentype)'\)/);
  if (!match) throw new Error(`No TTF for ${family} ${weight}`);
  const res = await fetch(match[1], { next: { revalidate: 60 * 60 * 24 * 30 } });
  if (!res.ok) throw new Error(`Download failed ${family} ${weight}`);
  return res.arrayBuffer();
}

/** Fonts for ImageResponse. Arimo ≈ Helvetica (n+, body); Gelasio ≈ Georgia (α). */
export async function npaFonts(): Promise<LoadedFont[] | undefined> {
  try {
    const [s4, s7, serif] = await Promise.all([
      fetchGoogleFontTTF("Arimo", 400),
      fetchGoogleFontTTF("Arimo", 700),
      fetchGoogleFontTTF("Gelasio", 700),
    ]);
    return [
      { name: "NpaSans", data: s4, weight: 400, style: "normal" },
      { name: "NpaSans", data: s7, weight: 700, style: "normal" },
      { name: "NpaSerif", data: serif, weight: 700, style: "normal" },
    ];
  } catch {
    return undefined; // Satori falls back rather than serving a broken card
  }
}

/** Rounded navy app-icon tile with a centered serif α. */
export function AlphaIconBox({ px = 100, radius }: { px?: number; radius?: number }): ReactElement {
  return (
    <div
      style={{
        width: px,
        height: px,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: BRAND.bg,
        border: `1px solid rgba(255,255,255,0.12)`,
        borderRadius: radius ?? Math.round(px * 0.22),
      }}
    >
      <span
        style={{
          fontFamily: "NpaSerif",
          fontWeight: 700,
          fontSize: px * 0.74,
          color: BRAND.alpha,
          lineHeight: 1,
          position: "relative",
          top: px * 0.04,
        }}
      >
        α
      </span>
    </div>
  );
}

/** "n+α" wordmark with optional VENTURES eyebrow. */
export function BrandWordmark({
  size = 76,
  subtitle = true,
  ink = BRAND.ink,
}: {
  size?: number;
  subtitle?: boolean;
  ink?: string;
}): ReactElement {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: size * 0.09 }}>
      <div style={{ display: "flex", alignItems: "baseline", lineHeight: 1 }}>
        <span style={{ fontFamily: "NpaSans", fontWeight: 700, fontSize: size, color: ink, letterSpacing: -size * 0.03 }}>
          n+
        </span>
        <span style={{ fontFamily: "NpaSerif", fontWeight: 700, fontSize: size * 1.18, color: BRAND.alpha, position: "relative", top: size * 0.06 }}>
          α
        </span>
      </div>
      {subtitle ? (
        <span style={{ display: "flex", fontFamily: "NpaSans", fontWeight: 600, fontSize: size * 0.2, letterSpacing: size * 0.1, color: BRAND.faint }}>
          VENTURES
        </span>
      ) : null}
    </div>
  );
}

/** Large faint decorative "signature plot" mark for the right side of an OG card. */
export function HeroPlotMark({ px = 360, opacity = 0.5 }: { px?: number; opacity?: number }): ReactElement {
  const h = px * 0.78;
  return (
    <div style={{ display: "flex", position: "relative", width: px, height: h, opacity }}>
      <svg width={px} height={h} viewBox="0 0 360 280" style={{ position: "absolute", top: 0, left: 0 }}>
        <polyline
          points="40,210 130,180 215,140 300,70"
          fill="none"
          stroke={BRAND.alpha}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeOpacity="0.6"
        />
        <circle cx="40" cy="210" r="6" fill={BRAND.alpha} />
        <circle cx="130" cy="180" r="6" fill={BRAND.alpha} />
        <circle cx="215" cy="140" r="6" fill={BRAND.alpha} />
        <circle cx="300" cy="70" r="7.5" fill={BRAND.alpha} />
      </svg>
      <span
        style={{
          position: "absolute",
          left: px * 0.42,
          top: h * 0.18,
          fontFamily: "NpaSerif",
          fontWeight: 700,
          fontSize: px * 0.82,
          color: BRAND.alpha,
          lineHeight: 1,
        }}
      >
        α
      </span>
    </div>
  );
}
