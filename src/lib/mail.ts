/**
 * Email addresses for Resend. The sender must be on a domain verified in Resend;
 * only nplus1ventures.com is (checked 2026-09-30). Mail to nplusalpha.com is
 * delivered by Cloudflare Email Routing. Env vars override either address.
 */
export const MAIL_FROM = process.env.RESEND_FROM_EMAIL?.trim() || "n+α Ventures <hello@nplus1ventures.com>";
export const MAIL_TO = process.env.CONTACT_EMAIL?.trim() || "hello@nplusalpha.com";
