"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";

import { NAV_LINKS, SITE_CONFIG } from "@/lib/constants";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on Escape key
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileOpen) {
        setMobileOpen(false);
        toggleRef.current?.focus();
      }
    },
    [mobileOpen]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Focus first nav link when menu opens
  useEffect(() => {
    if (mobileOpen) firstLinkRef.current?.focus();
  }, [mobileOpen]);

  return (
    <>
      {/* ─── Top bar ─── */}
      <nav
        aria-label="Main navigation"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#0B1221]/90 backdrop-blur-md border-b border-white/5"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="flex h-18 items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2.5"
              aria-label="nPlus1 Ventures — Home"
            >
              <svg
                width="36"
                height="36"
                viewBox="0 0 64 64"
                fill="none"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient
                    id="navAg"
                    x1="14"
                    y1="52"
                    x2="50"
                    y2="10"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset="0%" stopColor="#F97316" />
                    <stop offset="55%" stopColor="#2563EB" />
                    <stop offset="100%" stopColor="#60A5FA" />
                  </linearGradient>
                </defs>
                <line
                  x1="14"
                  y1="52"
                  x2="40"
                  y2="21"
                  stroke="url(#navAg)"
                  strokeWidth="7.5"
                  strokeLinecap="round"
                />
                <polygon points="50,10 46,26 36,16" fill="url(#navAg)" />
                <path
                  d="M 5 48 C 15 56 36 53 53 41"
                  stroke="#F97316"
                  strokeWidth="4.5"
                  fill="none"
                  strokeLinecap="round"
                />
                <path
                  d="M 9 42 C 18 49 36 47 50 36"
                  stroke="#F97316"
                  strokeWidth="2.5"
                  fill="none"
                  strokeLinecap="round"
                  opacity="0.7"
                />
                <circle cx="50" cy="10" r="5.5" fill="#F97316" />
              </svg>
              <div className="flex flex-col leading-none">
                <span className="text-[17px] font-extrabold text-white tracking-tight">
                  nPlus<span className="text-orange-400">1</span>
                </span>
                <span className="text-[8.5px] font-semibold text-white/50 tracking-[0.28em] uppercase mt-0.5">
                  Ventures
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-muted hover:text-foreground transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href={SITE_CONFIG.calendarLink}
                className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-[#0B1221] hover:brightness-110 transition-all duration-200"
              >
                Get in Touch
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M1 7h12m0 0L8 2m5 5L8 12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </div>

            {/* Mobile hamburger */}
            <button
              ref={toggleRef}
              onClick={() => setMobileOpen(true)}
              className="md:hidden p-2 -mr-2 text-white"
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M4 6h16M4 12h16M4 18h16"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* ─── Full-screen mobile overlay ─── */}
      {mobileOpen && (
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          className="fixed inset-0 z-[60] flex flex-col bg-[#0B1221] md:hidden"
        >
          {/* Header: logo + close */}
          <div className="flex items-center justify-between px-6 h-18 border-b border-white/10 shrink-0">
            <Link
              href="/"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-2.5"
              aria-label="nPlus1 Ventures — Home"
            >
              <svg
                width="36"
                height="36"
                viewBox="0 0 64 64"
                fill="none"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient
                    id="mobileNavAg"
                    x1="14"
                    y1="52"
                    x2="50"
                    y2="10"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset="0%" stopColor="#F97316" />
                    <stop offset="55%" stopColor="#2563EB" />
                    <stop offset="100%" stopColor="#60A5FA" />
                  </linearGradient>
                </defs>
                <line
                  x1="14"
                  y1="52"
                  x2="40"
                  y2="21"
                  stroke="url(#mobileNavAg)"
                  strokeWidth="7.5"
                  strokeLinecap="round"
                />
                <polygon
                  points="50,10 46,26 36,16"
                  fill="url(#mobileNavAg)"
                />
                <path
                  d="M 5 48 C 15 56 36 53 53 41"
                  stroke="#F97316"
                  strokeWidth="4.5"
                  fill="none"
                  strokeLinecap="round"
                />
                <path
                  d="M 9 42 C 18 49 36 47 50 36"
                  stroke="#F97316"
                  strokeWidth="2.5"
                  fill="none"
                  strokeLinecap="round"
                  opacity="0.7"
                />
                <circle cx="50" cy="10" r="5.5" fill="#F97316" />
              </svg>
              <div className="flex flex-col leading-none">
                <span className="text-[17px] font-extrabold text-white tracking-tight">
                  nPlus<span className="text-orange-400">1</span>
                </span>
                <span className="text-[8.5px] font-semibold text-white/50 tracking-[0.28em] uppercase mt-0.5">
                  Ventures
                </span>
              </div>
            </Link>

            <button
              onClick={() => setMobileOpen(false)}
              className="p-2 -mr-2 text-white/60 hover:text-white transition-colors"
              aria-label="Close menu"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M6 6l12 12M6 18L18 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>

          {/* Nav links — vertically centered */}
          <nav
            className="flex flex-col flex-1 justify-center px-8"
            aria-label="Mobile navigation links"
          >
            {NAV_LINKS.map((link, i) => (
              <Link
                key={link.href}
                ref={i === 0 ? firstLinkRef : undefined}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="group flex items-center justify-between py-5 border-b border-white/10 text-2xl font-semibold text-white/80 hover:text-white transition-colors duration-150"
              >
                {link.label}
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 14 14"
                  fill="none"
                  aria-hidden="true"
                  className="text-white/25 group-hover:text-orange-400 group-hover:translate-x-0.5 transition-all duration-150"
                >
                  <path
                    d="M1 7h12m0 0L8 2m5 5L8 12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            ))}
          </nav>

          {/* CTA pinned to bottom */}
          <div className="shrink-0 px-8 pb-12">
            <Link
              href={SITE_CONFIG.calendarLink}
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center gap-2 w-full rounded-full bg-accent py-4 text-base font-semibold text-[#0B1221] hover:brightness-110 active:scale-[0.98] transition-all duration-200"
            >
              Get in Touch
              <svg
                width="16"
                height="16"
                viewBox="0 0 14 14"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M1 7h12m0 0L8 2m5 5L8 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
