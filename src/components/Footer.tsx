import Link from "next/link";
import { NAV_LINKS, SITE_CONFIG } from "@/lib/constants";

export default function Footer() {
  return (
    <footer aria-label="Site footer" className="border-t border-white/5 py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2" aria-label="nPlus1 Ventures — Home">
              <svg width="30" height="30" viewBox="0 0 64 64" fill="none" aria-hidden="true">
                <defs>
                  <linearGradient id="footerAg" x1="14" y1="52" x2="50" y2="10" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#F97316"/>
                    <stop offset="55%" stopColor="#2563EB"/>
                    <stop offset="100%" stopColor="#60A5FA"/>
                  </linearGradient>
                </defs>
                <line x1="14" y1="52" x2="40" y2="21" stroke="url(#footerAg)" strokeWidth="7.5" strokeLinecap="round"/>
                <polygon points="50,10 46,26 36,16" fill="url(#footerAg)"/>
                <path d="M 5 48 C 15 56 36 53 53 41" stroke="#F97316" strokeWidth="4.5" fill="none" strokeLinecap="round"/>
                <path d="M 9 42 C 18 49 36 47 50 36" stroke="#F97316" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.7"/>
                <circle cx="50" cy="10" r="5.5" fill="#F97316"/>
              </svg>
              <div className="flex flex-col leading-none">
                <span className="text-[15px] font-extrabold text-white tracking-tight">
                  nPlus<span className="text-orange-400">1</span>
                </span>
                <span className="text-[7.5px] font-semibold text-white/50 tracking-[0.28em] uppercase mt-0.5">
                  Ventures
                </span>
              </div>
            </Link>
            <p className="text-sm text-muted mt-3 max-w-xs">
              Go-to-market consulting for ambitious B2B teams.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-6">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-muted hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted">
            &copy; {new Date().getFullYear()} {SITE_CONFIG.name}. All rights
            reserved.
          </p>
          <p className="text-xs text-muted">
            <a
              href={`mailto:${SITE_CONFIG.email}`}
              className="hover:text-accent transition-colors"
            >
              {SITE_CONFIG.email}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
