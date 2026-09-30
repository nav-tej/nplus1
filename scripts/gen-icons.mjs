#!/usr/bin/env node
/**
 * Regenerate the n+α Ventures PNG icon set from the serif-α master mark.
 * Rasterizes a navy rounded-square + Georgia serif α via sharp (no font files
 * needed — macOS supplies Georgia to libvips).
 *
 *   node scripts/gen-icons.mjs
 *
 * Outputs into public/: favicon.png(32), icon-192.png, icon-512.png, apple-touch-icon.png(180)
 */
import sharp from "sharp";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const PUBLIC = join(ROOT, "public");

const master = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <rect width="100" height="100" rx="22" fill="#0B1221"/>
  <text x="50" y="50" font-family="Georgia,'Times New Roman',serif" font-weight="700"
        font-size="74" fill="#D85A30" text-anchor="middle" dominant-baseline="central">α</text>
</svg>`;

// High-res base render, then crisp downscales for each target.
const base = await sharp(Buffer.from(master), { density: 900 }).png().toBuffer();

const targets = [
  ["favicon.png", 32],
  ["icon-192.png", 192],
  ["icon-512.png", 512],
  ["apple-touch-icon.png", 180],
];

for (const [name, size] of targets) {
  await sharp(base)
    .resize(size, size, { fit: "cover" })
    .png()
    .toFile(join(PUBLIC, name));
  console.log(`✓ public/${name} (${size}×${size})`);
}

// Square brand mark used by JSON-LD Organization logo.
await sharp(base).resize(512, 512, { fit: "cover" }).png().toFile(join(PUBLIC, "logo-square.png"));
console.log("✓ public/logo-square.png (512×512)");

// Horizontal n+α wordmark lockup (resolved "signature plot" end-frame) for schema logo.png.
const wordmark = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 175">
  <rect width="360" height="175" fill="#0B1221"/>
  <text x="123" y="116" font-family="Helvetica Neue,Arial,sans-serif" font-size="44" fill="#E8E4DE">n</text>
  <text x="156" y="107" font-family="Helvetica Neue,Arial,sans-serif" font-size="27" fill="#888780">+</text>
  <text x="177" y="125" font-family="Georgia,'Times New Roman',serif" font-weight="700" font-size="104" fill="#D85A30">α</text>
</svg>`;
await sharp(Buffer.from(wordmark), { density: 600 }).resize(1080).png().toFile(join(PUBLIC, "logo.png"));
console.log("✓ public/logo.png (wordmark)");
