#!/usr/bin/env node
/**
 * Generate n+α Ventures YouTube channel art (static PNGs — YouTube does not
 * animate avatars/banners). Outputs to ~/Downloads/nplusalpha-youtube/:
 *   - avatar.png      800×800   (channel profile picture, circle-cropped by YT)
 *   - banner.png      2048×1152 (channel banner; text kept in the 1235×338 safe area)
 *   - watermark.png   150×150   (video watermark, transparent)
 *
 *   node scripts/gen-youtube.mjs
 */
import sharp from "sharp";
import { homedir } from "node:os";
import { join } from "node:path";
import { mkdir } from "node:fs/promises";

const OUT = join(homedir(), "Downloads", "nplusalpha-youtube");
await mkdir(OUT, { recursive: true });

const NAVY = "#0B1221";
const ALPHA = "#D85A30";

// glyph helper — the resolved n+α wordmark in 360×175 mark-space
const wordmark = `
  <text x="123" y="116" font-family="Helvetica Neue,Arial,sans-serif" font-size="44" fill="#E8E4DE">n</text>
  <text x="156" y="107" font-family="Helvetica Neue,Arial,sans-serif" font-size="27" fill="#888780">+</text>
  <text x="177" y="125" font-family="Georgia,'Times New Roman',serif" font-weight="700" font-size="104" fill="${ALPHA}">α</text>`;

// ── avatar 800×800 (centered serif α, circle-safe) ───────────────────────────
const avatar = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="800" viewBox="0 0 800 800">
  <defs>
    <radialGradient id="bg" cx="50%" cy="42%" r="72%">
      <stop offset="0%" stop-color="#1C2F4D"/><stop offset="62%" stop-color="${NAVY}"/>
    </radialGradient>
    <radialGradient id="glow" cx="50%" cy="45%" r="42%">
      <stop offset="0%" stop-color="${ALPHA}" stop-opacity="0.22"/><stop offset="70%" stop-color="${NAVY}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="800" height="800" fill="url(#bg)"/>
  <rect width="800" height="800" fill="url(#glow)"/>
  <text x="400" y="382" font-family="Georgia,'Times New Roman',serif" font-weight="700" font-size="430" fill="${ALPHA}" text-anchor="middle" dominant-baseline="central">α</text>
</svg>`;

// ── banner 2048×1152 (safe area 1235×338 centred → x 406..1642, y 407..745) ──
// wordmark scaled 1.5×, baseline y≈518; descriptor + tagline beneath; faint
// rising plot in the lower wing (only shows on desktop/TV, outside safe area).
const banner = `<svg xmlns="http://www.w3.org/2000/svg" width="2048" height="1152" viewBox="0 0 2048 1152">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="2048" y2="1152" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#16263F"/><stop offset="55%" stop-color="${NAVY}"/><stop offset="100%" stop-color="${NAVY}"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="40%" r="40%">
      <stop offset="0%" stop-color="${ALPHA}" stop-opacity="0.18"/><stop offset="70%" stop-color="${NAVY}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="2048" height="1152" fill="url(#bg)"/>
  <rect width="2048" height="1152" fill="url(#glow)"/>

  <!-- decorative rising plot (lower wing, bleeds off the safe area) -->
  <g opacity="0.22">
    <polyline points="150,915 540,865 930,800 1320,715 1700,655 1930,615" fill="none" stroke="${ALPHA}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="150" cy="915" r="6" fill="${ALPHA}"/><circle cx="540" cy="865" r="6" fill="${ALPHA}"/>
    <circle cx="930" cy="800" r="6" fill="${ALPHA}"/><circle cx="1320" cy="715" r="6" fill="${ALPHA}"/>
    <circle cx="1700" cy="655" r="6" fill="${ALPHA}"/><circle cx="1930" cy="615" r="7.5" fill="${ALPHA}"/>
  </g>

  <!-- wordmark (centred, scaled 1.5×) -->
  <g transform="translate(703,330.5) scale(1.5)">${wordmark}</g>

  <!-- descriptor + tagline -->
  <text x="1024" y="575" font-family="Helvetica Neue,Arial,sans-serif" font-weight="600" font-size="26" letter-spacing="13" fill="#9aa3ad" text-anchor="middle">VENTURES</text>
  <text x="1024" y="632" font-family="Helvetica Neue,Arial,sans-serif" font-size="27" fill="rgba(255,255,255,0.55)" text-anchor="middle">AI-Native Go-To-Market Consulting</text>
</svg>`;

// ── watermark 150×150 (transparent, α) ───────────────────────────────────────
const watermark = `<svg xmlns="http://www.w3.org/2000/svg" width="150" height="150" viewBox="0 0 150 150">
  <text x="75" y="80" font-family="Georgia,'Times New Roman',serif" font-weight="700" font-size="118" fill="${ALPHA}" text-anchor="middle" dominant-baseline="central">α</text>
</svg>`;

await sharp(Buffer.from(avatar), { density: 144 }).resize(800, 800).png().toFile(join(OUT, "avatar.png"));
await sharp(Buffer.from(banner), { density: 96 }).resize(2048, 1152).png().toFile(join(OUT, "banner.png"));
await sharp(Buffer.from(watermark), { density: 288 }).resize(150, 150).png().toFile(join(OUT, "watermark.png"));

console.log(`✓ ${join(OUT, "avatar.png")}      800×800`);
console.log(`✓ ${join(OUT, "banner.png")}      2048×1152 (safe area 1235×338)`);
console.log(`✓ ${join(OUT, "watermark.png")}   150×150 (transparent)`);
