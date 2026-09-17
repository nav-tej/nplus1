import Link from "next/link";
import { NAV_LINKS, SITE_CONFIG } from "@/lib/constants";
import BrandLockup from "@/components/BrandLockup";

export default function Footer() {
  return (
    <footer aria-label="Site footer" className="border-t border-white/5 py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-flex" aria-label="n+α Ventures (n plus alpha): Home">
              <BrandLockup descriptor="Ventures" markWidth={96} />
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
                href="/framework"
                className="text-sm text-muted hover:text-foreground transition-colors"
              >
                GTM Framework
              </Link>
              <Link
                href="/results"
                className="text-sm text-muted hover:text-foreground transition-colors"
              >
                Results
              </Link>
              <Link
                href="/fractional-cmo-vs-agency"
                className="text-sm text-muted hover:text-foreground transition-colors"
              >
                Fractional vs Agency vs Hire
              </Link>
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
