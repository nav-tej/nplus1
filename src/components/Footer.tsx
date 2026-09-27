import Link from "next/link";
import { CASE_STUDIES } from "@/lib/case-studies";
import { NAV_LINKS, SITE_CONFIG } from "@/lib/constants";
import { Wordmark } from "@/components/brand";

export default function Footer() {
  return (
    <footer aria-label="Site footer" className="border-t border-line py-12">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-flex" aria-label="n+α Ventures (n plus alpha): Home">
              <Wordmark size={28} />
            </Link>
            <p className="text-sm text-muted mt-3 max-w-xs">
              Fractional VP Marketing and RevOps for B2B SaaS. San Francisco.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-x-12 gap-y-8">
            <div className="flex flex-col gap-3">
              <span className="font-mono text-[11px] font-medium text-muted uppercase tracking-[0.08em]">Company</span>
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
                href="/portfolio"
                className="text-sm text-muted hover:text-foreground transition-colors"
              >
                Portfolio
              </Link>
              <Link
                href="/#contact"
                className="text-sm text-muted hover:text-foreground transition-colors"
              >
                Contact
              </Link>
              <Link
                href="/privacy"
                className="text-sm text-muted hover:text-foreground transition-colors"
              >
                Privacy
              </Link>
            </div>

            <div className="flex flex-col gap-3">
              <span className="font-mono text-[11px] font-medium text-muted uppercase tracking-[0.08em]">Case Studies</span>
              {CASE_STUDIES.map((study) => (
                <Link
                  key={study.slug}
                  href={`/case-studies/${study.slug}`}
                  className="text-sm text-muted hover:text-foreground transition-colors"
                >
                  {study.client}
                </Link>
              ))}
            </div>

            <div className="flex flex-col gap-3">
              <span className="font-mono text-[11px] font-medium text-muted uppercase tracking-[0.08em]">Resources</span>
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

        <div className="mt-10 pt-6 border-t border-line flex flex-col sm:flex-row items-center justify-between gap-4">
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
