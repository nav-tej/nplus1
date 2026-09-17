#!/usr/bin/env node
/**
 * Render the n+α "signature plot" motion logo to an animated GIF.
 *
 * Replays the exact CSS timeline (NPlusAlphaMark) frame-by-frame: rasterizes each
 * frame's SVG with sharp, then encodes with gifenc. Plays once and holds the
 * resolved mark (repeat: -1) — ideal as a logo motion asset.
 *
 *   node scripts/gen-motion.mjs            -> public/nplusalpha-motion.gif
 *
 * NOTE: do NOT use this as the OG image. X/LinkedIn/Facebook freeze animated OGs
 * to the first frame (which is blank here). The brightened static /opengraph-image
 * is the social card; this GIF is for Slack/Discord/email/decks/on-page use.
 */
import sharp from "sharp";
import gifencPkg from "gifenc";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const lib = gifencPkg?.GIFEncoder ? gifencPkg : gifencPkg.default;
const { GIFEncoder, quantize, applyPalette } = lib;
const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));

// ── canvas + timeline ────────────────────────────────────────────────────────
const W = 600, H = 292;            // mark ratio 360×175
const FPS = 15;
// Loop = open on the resolved logo → hold → dissolve → redraw → resolve.
// First frame is the finished mark, and the loop is seamless (resolved → resolved),
// so the still-frame is always correct wherever the GIF is dropped.
const HOLD = 1.2;                  // resolved logo held
const DISSOLVE = 0.5;              // graceful fade-out before the redraw
const DRAW = 5.7;                  // the signature-plot draw-in
const TOTAL = HOLD + DISSOLVE + DRAW;
const FRAMES = Math.round(TOTAL * FPS);

// ── easing ───────────────────────────────────────────────────────────────────
function cubicBezier(x1, y1, x2, y2) {
  const cx = 3 * x1, bx = 3 * (x2 - x1) - cx, ax = 1 - cx - bx;
  const cy = 3 * y1, by = 3 * (y2 - y1) - cy, ay = 1 - cy - by;
  const fx = (t) => ((ax * t + bx) * t + cx) * t;
  const fy = (t) => ((ay * t + by) * t + cy) * t;
  const dfx = (t) => (3 * ax * t + 2 * bx) * t + cx;
  return (x) => {
    let t = x;
    for (let i = 0; i < 8; i++) {
      const e = fx(t) - x;
      if (Math.abs(e) < 1e-5) break;
      const d = dfx(t);
      if (Math.abs(d) < 1e-6) break;
      t -= e / d;
    }
    return fy(Math.max(0, Math.min(1, t)));
  };
}
const E_STD = cubicBezier(0.25, 0.1, 0.25, 1); // ease
const E_DRAW = cubicBezier(0.6, 0, 0.35, 1);   // letter draws
const E_CONNECT = cubicBezier(0.16, 1, 0.3, 1);

// progress of a clip (0..1) given current time
const prog = (t, begin, dur) => Math.max(0, Math.min(1, (t - begin) / dur));

// ── one frame at global loop time `time` (seconds), as SVG ───────────────────
function frameSVG(time) {
  let s; // element states
  let groupOp = 1;
  const resolved = { nDash: 0, nFill: 1, pDash: 0, pFill: 1, dot: [1, 1, 1, 1], cDash: 0, aDash: 0, aFill: 1, plotOp: 0 };

  if (time < HOLD) {
    s = resolved; // open on the finished logo
  } else if (time < HOLD + DISSOLVE) {
    s = resolved;
    groupOp = 1 - E_STD((time - HOLD) / DISSOLVE); // graceful fade-out
  } else {
    const t = time - HOLD - DISSOLVE; // draw-in local time
    s = {
      nDash: 240 * (1 - E_DRAW(prog(t, 0.2, 0.85))),
      nFill: E_STD(prog(t, 0.95, 0.45)),
      pDash: 120 * (1 - E_DRAW(prog(t, 1.05, 0.5))),
      pFill: E_STD(prog(t, 1.5, 0.35)),
      dot: [1.7, 2.0, 2.3, 2.6].map((b) => E_STD(prog(t, b, 0.35))),
      cDash: 170 * (1 - E_CONNECT(prog(t, 1.85, 0.9))),
      aDash: 600 * (1 - E_DRAW(prog(t, 2.95, 1.7))),
      aFill: E_STD(prog(t, 4.45, 0.55)),
      plotOp: 1 - E_STD(prog(t, 4.7, 0.8)),
    };
  }
  const { nDash, nFill, pDash, pFill, dot, cDash, aDash, aFill, plotOp } = s;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 360 175">
    <rect width="360" height="175" fill="#0B1221"/>
    <g opacity="${groupOp}">
    <text x="123" y="116" font-family="Helvetica Neue,Arial,sans-serif" font-size="44" fill="none" stroke="#E8E4DE" stroke-width="1.4" stroke-linejoin="round" stroke-linecap="round" stroke-dasharray="240" stroke-dashoffset="${nDash}">n</text>
    <text x="123" y="116" font-family="Helvetica Neue,Arial,sans-serif" font-size="44" fill="#E8E4DE" opacity="${nFill}">n</text>
    <text x="156" y="107" font-family="Helvetica Neue,Arial,sans-serif" font-size="27" fill="none" stroke="#888780" stroke-width="1.4" stroke-linejoin="round" stroke-linecap="round" stroke-dasharray="120" stroke-dashoffset="${pDash}">+</text>
    <text x="156" y="107" font-family="Helvetica Neue,Arial,sans-serif" font-size="27" fill="#888780" opacity="${pFill}">+</text>
    <g opacity="${plotOp}">
      <polyline points="98,150 124,143 150,133 178,118" fill="none" stroke="#D85A30" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke-opacity="0.55" stroke-dasharray="170" stroke-dashoffset="${cDash}"/>
      <circle cx="98" cy="150" r="3" fill="#D85A30" opacity="${dot[0]}"/>
      <circle cx="124" cy="143" r="3" fill="#D85A30" opacity="${dot[1]}"/>
      <circle cx="150" cy="133" r="3" fill="#D85A30" opacity="${dot[2]}"/>
      <circle cx="178" cy="118" r="3.5" fill="#D85A30" opacity="${dot[3]}"/>
    </g>
    <text x="177" y="125" font-family="Georgia,'Times New Roman',serif" font-weight="700" font-size="104" fill="none" stroke="#D85A30" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round" stroke-dasharray="600" stroke-dashoffset="${aDash}">α</text>
    <text x="177" y="125" font-family="Georgia,'Times New Roman',serif" font-weight="700" font-size="104" fill="#D85A30" opacity="${aFill}">α</text>
    </g>
  </svg>`;
}

// ── render + encode ──────────────────────────────────────────────────────────
const gif = GIFEncoder();
let palette = null;

for (let f = 0; f < FRAMES; f++) {
  const t = f / FPS;
  const { data } = await sharp(Buffer.from(frameSVG(t)))
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  // Stable palette from the resolved frame (richest colours = frame 0).
  if (!palette) {
    const resolvedFrame = await sharp(Buffer.from(frameSVG(0)))
      .ensureAlpha()
      .raw()
      .toBuffer();
    palette = quantize(resolvedFrame, 256, { format: "rgb444" });
  }
  const index = applyPalette(data, palette, "rgb444");
  gif.writeFrame(index, W, H, {
    palette: f === 0 ? palette : undefined,
    delay: Math.round(1000 / FPS),
    repeat: 0, // seamless infinite loop (resolved → resolved)
  });
}
gif.finish();

const out = join(ROOT, "public", "nplusalpha-motion.gif");
const { writeFile } = await import("node:fs/promises");
await writeFile(out, Buffer.from(gif.bytes()));
console.log(`✓ ${out}  (${FRAMES} frames, ${W}×${H}, ${FPS}fps)`);
