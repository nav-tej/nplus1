import Link from "next/link";
import { NAV_LINKS, SITE_CONFIG } from "@/lib/constants";

export default function Footer() {
  return (
    <footer aria-label="Site footer" className="border-t border-white/5 py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2" aria-label="n+α Ventures — Home">
              <svg width="30" height="30" viewBox="0 0 64 64" fill="none" aria-hidden="true">
                <defs>
                  <linearGradient id="footerAg" x1="31" y1="21" x2="54" y2="45" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#F97316"/>
                    <stop offset="100%" stopColor="#60A5FA"/>
                  </linearGradient>
                </defs>
                <path d="M7,44 V21 C7,14 25,14 25,21 V44" stroke="white" strokeWidth="4.5" fill="none" strokeLinecap="round"/>
                <circle cx="16" cy="14" r="2.8" fill="#F97316"/>
                <line x1="28.5" y1="32" x2="33.5" y2="32" stroke="white" strokeWidth="2" opacity="0.4"/>
                <line x1="31" y1="29.5" x2="31" y2="34.5" stroke="white" strokeWidth="2" opacity="0.4"/>
                <path d="M54,22 C46,20 34,24 34,33 C34,42 46,46 54,44" stroke="url(#footerAg)" strokeWidth="4.5" fill="none" strokeLinecap="round"/>
                <path d="M54,21 L54,45" stroke="url(#footerAg)" strokeWidth="4.5" fill="none" strokeLinecap="round"/>
              </svg>
              <div className="flex flex-col leading-none">
                <span className="text-[15px] font-extrabold text-white tracking-tight">
                  n+<span className="text-orange-400">α</span>
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
          <div className="flex flex-wrap gap-x-12 gap-y-8">
            <div className="flex flex-col gap-3">
              <span className="text-xs font-bold text-white uppercase tracking-widest">Company</span>
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-muted hover:text-foreground transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/privacy"
                className="text-sm text-muted hover:text-foreground transition-colors"
              >
                Privacy
              </Link>
            </div>

            <div className="flex flex-col gap-3">
              <span className="text-xs font-bold text-white uppercase tracking-widest">Resources</span>
              <Link
                href="/tools/funnel-velocity"
                className="text-sm text-muted hover:text-foreground transition-colors"
              >
                Velocity Calculator
              </Link>
              <Link
                href="/resources/agentic-outbound"
                className="text-sm text-muted hover:text-foreground transition-colors"
              >
                Outbound Playbook
              </Link>
            </div>
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
