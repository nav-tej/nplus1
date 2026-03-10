import Link from "next/link";
import Image from "next/image";
import { NAV_LINKS, SITE_CONFIG } from "@/lib/constants";

export default function Footer() {
  return (
    <footer aria-label="Site footer" className="border-t border-white/5 py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-block">
              <Image
                src="/logo-sm.webp"
                alt="nPlus1 Ventures"
                width={120}
                height={48}
                className="h-8 w-auto"
              />
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
