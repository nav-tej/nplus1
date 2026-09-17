import styles from "./NPlusAlphaMark.module.css";

/**
 * NPlusAlphaMark — the n+α motion logo ("signature plot", concepts 02 × 04).
 *
 * Sequence: the n+ is written stroke-by-stroke (02 signature), four data points
 * rise and a line draws upward connecting them (04 plot), the α is drawn last at
 * the apex, then the plot scaffolding fades — leaving a clean n+α wordmark.
 *
 * Server component, CSS-only (no JS, no client bundle). The animation plays once
 * on mount; reduced-motion users get the resolved frame. Pass `static` to render
 * the end-frame with no motion (used by the OG image, favicons, print).
 */
type NPlusAlphaMarkProps = {
  /** Rendered width in px (height scales to the 360×175 viewBox). Default 320. */
  width?: number;
  /** Skip the animation and render the resolved mark. Default false. */
  static?: boolean;
  /** Accessible label. Default "n plus alpha". */
  title?: string;
  className?: string;
};

export default function NPlusAlphaMark({
  width = 320,
  static: isStatic = false,
  title = "n plus alpha",
  className,
}: NPlusAlphaMarkProps) {
  const root = [styles.mark, isStatic ? styles.static : styles.play, className]
    .filter(Boolean)
    .join(" ");

  // Frames centered on the mark's measured optical center (x≈187, not 150 — the
  // serif α is wide). Static crops tight to the glyphs; animated adds just enough
  // room below/left for the rising plot, keeping the glyphs large and centered so
  // the BrandLockup descriptor lines up under them.
  //   glyphs:      x 125..248 (center 187),  y 73..126
  //   glyphs+plot: x  94..248,               y 73..153
  const viewBox = isStatic ? "112 62 150 76" : "89 60 196 100";

  return (
    <span className={root} style={{ width }}>
      <svg viewBox={viewBox} width={width} role="img" aria-label={title}>
        {/* written n+ — stroke first (signature), then fill */}
        <text className={`${styles.n} ${styles.nStroke}`} x="123" y="116" fontSize="44">n</text>
        <text className={`${styles.n} ${styles.nFill}`} x="123" y="116" fontSize="44">n</text>
        <text className={`${styles.plus} ${styles.plusStroke}`} x="156" y="107" fontSize="27">+</text>
        <text className={`${styles.plus} ${styles.plusFill}`} x="156" y="107" fontSize="27">+</text>

        {/* plot scaffolding — rises, then fades out */}
        <g className={styles.plot}>
          <polyline
            className={styles.connect}
            points="98,150 124,143 150,133 178,118"
            fill="none"
            stroke="#D85A30"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeOpacity="0.55"
          />
          <circle className={`${styles.dot} ${styles.d1}`} cx="98" cy="150" r="3" fill="#D85A30" />
          <circle className={`${styles.dot} ${styles.d2}`} cx="124" cy="143" r="3" fill="#D85A30" />
          <circle className={`${styles.dot} ${styles.d3}`} cx="150" cy="133" r="3" fill="#D85A30" />
          <circle className={`${styles.dot} ${styles.d4}`} cx="178" cy="118" r="3.5" fill="#D85A30" />
        </g>

        {/* α — drawn at the peak, then filled (last element to resolve) */}
        <text className={`${styles.alpha} ${styles.alphaStroke}`} x="177" y="125" fontSize="104">α</text>
        <text className={`${styles.alpha} ${styles.alphaFill}`} x="177" y="125" fontSize="104">α</text>
      </svg>
    </span>
  );
}
