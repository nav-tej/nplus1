import NPlusAlphaMark from "@/components/NPlusAlphaMark";

/**
 * BrandLockup — the n+α master mark with a tracked descriptor beneath it,
 * optically centered so the wordmark and descriptor balance.
 *
 * The descriptor is a prop, so sub-brands extend cleanly:
 *   <BrandLockup />                      → n+α / VENTURES
 *   <BrandLockup descriptor="Media" />   → n+α / MEDIA
 *
 * Pass `animate` to draw the mark in (use once per session for nav). The mark's
 * accessible name spells the brand ("n plus alpha …") for semantic search.
 */
type BrandLockupProps = {
  descriptor?: string;
  /** Mark width in px; the descriptor scales from it. Default 104. */
  markWidth?: number;
  /** Draw the mark in instead of rendering it resolved. Default false. */
  animate?: boolean;
  className?: string;
};

export default function BrandLockup({
  descriptor = "Ventures",
  markWidth = 104,
  animate = false,
  className,
}: BrandLockupProps) {
  const fontSize = Math.max(8, Math.round(markWidth * 0.12));
  return (
    <span className={["inline-flex flex-col items-center leading-none", className].filter(Boolean).join(" ")}>
      <NPlusAlphaMark
        static={!animate}
        width={markWidth}
        title={`n plus alpha ${descriptor}`}
      />
      <span
        className={`font-semibold uppercase text-white/90${animate ? " descriptor-in" : ""}`}
        // left padding offsets the trailing letter-spacing so the word stays centered;
        // the animated frame reserves space below the glyphs for the plot, so the
        // descriptor is pulled up to sit close beneath the wordmark either way.
        style={{
          fontSize,
          letterSpacing: "0.42em",
          paddingLeft: "0.42em",
          marginTop: animate ? -markWidth * 0.13 : markWidth * 0.06,
        }}
      >
        {descriptor}
      </span>
    </span>
  );
}
