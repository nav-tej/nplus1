/**
 * Server-side checks shared by the public form endpoints (/api/contact, /api/lead-magnet).
 * Vercel BotID is the main bot defense; these catch crude bots and keep visitor
 * input from being rendered as HTML in the emails we send.
 */

/** Anything visitor-supplied that goes into an email's HTML must pass through this. */
export function escapeHtml(value: unknown): string {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Trim and cap a field. Newlines are removed unless `multiline` is set. */
export function clean(value: unknown, max: number, multiline = false): string {
  let s = String(value ?? "").trim();
  if (!multiline) s = s.replace(/[\r\n]+/g, " ");
  return s.slice(0, max);
}

export function isEmail(value: string): boolean {
  return value.length <= 254 && /^[^\s@<>"']+@[^\s@<>"']+\.[^\s@<>"']{2,}$/.test(value);
}

/** The hidden honeypot field's name. Unusual on purpose, so browser autofill never fills it. */
export const HONEYPOT_FIELD = "hp_confirm";

/** Humans take longer than this between page load and submit. */
const MIN_ELAPSED_MS = 2500;

/**
 * True when the honeypot was filled, or the form came back faster than a person could
 * fill it. A missing timing value (an older page still open during a deploy) is not
 * treated as a bot.
 */
export function isTrapped(body: Record<string, unknown>): boolean {
  if (String(body[HONEYPOT_FIELD] ?? "").trim() !== "") return true;
  const elapsed = body.elapsedMs;
  return typeof elapsed === "number" && elapsed >= 0 && elapsed < MIN_ELAPSED_MS;
}
