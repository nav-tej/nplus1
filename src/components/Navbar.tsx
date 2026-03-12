"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";

import { NAV_LINKS, SERVICE_PAGES, SITE_CONFIG } from "@/lib/constants";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileToolsOpen, setMobileToolsOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let rafId: number;
    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => setScrolled(window.scrollY > 20));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (mobileOpen) {
          setMobileOpen(false);
          toggleRef.current?.focus();
        }
        if (servicesOpen) setServicesOpen(false);
        if (toolsOpen) setToolsOpen(false);
      }
    },
    [mobileOpen, servicesOpen, toolsOpen]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (mobileOpen) firstLinkRef.current?.focus();
  }, [mobileOpen]);

  const Logo = ({ gradientId }: { gradientId: string }) => (
    <svg width="36" height="36" viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id={gradientId} x1="14" y1="52" x2="50" y2="10" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#F97316" />
          <stop offset="55%" stopColor="#2563EB" />
          <stop offset="100%" stopColor="#60A5FA" />
        </linearGradient>
      </defs>
      <line x1="14" y1="52" x2="40" y2="21" stroke={`url(#${gradientId})`} strokeWidth="7.5" strokeLinecap="round" />
      <polygon points="50,10 46,26 36,16" fill={`url(#${gradientId})`} />
      <path d="M 5 48 C 15 56 36 53 53 41" stroke="#F97316" strokeWidth="4.5" fill="none" strokeLinecap="round" />
      <path d="M 9 42 C 18 49 36 47 50 36" stroke="#F97316" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.7" />
      <circle cx="50" cy="10" r="5.5" fill="#F97316" />
    </svg>
  );

  const Wordmark = () => (
    <div className="flex flex-col leading-none">
      <span className="text-[17px] font-extrabold text-white tracking-tight">
        nPlus<span className="text-orange-400">1</span>
      </span>
      <span className="text-[8.5px] font-semibold text-white/50 tracking-[0.28em] uppercase mt-0.5">
        Ventures
      </span>
    </div>
  );

  const ArrowIcon = ({ size = 14 }: { size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M1 7h12m0 0L8 2m5 5L8 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

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
            <Link href="/" className="flex items-center gap-2.5" aria-label="nPlus1 Ventures — Home">
              <Logo gradientId="navAg" />
              <Wordmark />
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {NAV_LINKS.map((link) => {
                if (link.label === "Services") {
                  return (
                    <div
                      key="services"
                      className="relative"
                      onMouseEnter={() => setServicesOpen(true)}
                      onMouseLeave={() => setServicesOpen(false)}
                    >
                      <button
                        className="flex items-center gap-1 text-sm text-muted hover:text-foreground transition-colors duration-200"
                        aria-expanded={servicesOpen}
                        aria-haspopup="true"
                      >
                        Services
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 12 12"
                          fill="none"
                          aria-hidden="true"
                          className={`transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`}
                        >
                          <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>

                      {servicesOpen && (
                        <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 z-50 w-[300px]">
                          <div className="bg-[#0B1221]/98 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
                            {SERVICE_PAGES.map((page) => (
                              <Link
                                key={page.href}
                                href={page.href}
                                className="flex flex-col gap-0.5 px-5 py-4 hover:bg-white/5 transition-colors border-b border-white/5 last:border-0 group"
                              >
                                <span className="text-sm font-semibold text-foreground group-hover:text-orange-400 transition-colors">
                                  {page.label}
                                </span>
                                <span className="text-xs text-muted leading-snug">
                                  {page.description}
                                </span>
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                }

                if (link.label === "Tools") {
                  return (
                    <div
                      key="tools"
                      className="relative"
                      onMouseEnter={() => setToolsOpen(true)}
                      onMouseLeave={() => setToolsOpen(false)}
                    >
                      <button
                        className="flex items-center gap-1 text-sm text-muted hover:text-foreground transition-colors duration-200"
                        aria-expanded={toolsOpen}
                        aria-haspopup="true"
                      >
                        Tools
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 12 12"
                          fill="none"
                          aria-hidden="true"
                          className={`transition-transform duration-200 ${toolsOpen ? "rotate-180" : ""}`}
                        >
                          <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>

                      {toolsOpen && (
                        <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 z-50 w-[300px]">
                          <div className="bg-[#0B1221]/98 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
                            <Link
                              href="/tools/funnel-velocity"
                              className="flex flex-col gap-0.5 px-5 py-4 hover:bg-white/5 transition-colors border-b border-white/5 group"
                            >
                              <span className="text-sm font-semibold text-foreground group-hover:text-orange-400 transition-colors">
                                Velocity Calculator
                              </span>
                              <span className="text-xs text-muted leading-snug">
                                Diagnose growth bottlenecks
                              </span>
                            </Link>
                            <Link
                              href="/resources/agentic-outbound"
                              className="flex flex-col gap-0.5 px-5 py-4 hover:bg-white/5 transition-colors last:border-0 group"
                            >
                              <span className="text-sm font-semibold text-foreground group-hover:text-orange-400 transition-colors">
                                Outbound Playbook
                              </span>
                              <span className="text-xs text-muted leading-snug">
                                Build an agentic engine
                              </span>
                            </Link>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm text-muted hover:text-foreground transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                );
              })}

              <Link
                href={SITE_CONFIG.calendarLink}
                className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-[#0B1221] hover:brightness-110 transition-all duration-200"
              >
                Get in Touch
                <ArrowIcon />
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
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
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
              <Logo gradientId="mobileNavAg" />
              <Wordmark />
            </Link>

            <button
              onClick={() => setMobileOpen(false)}
              className="p-2 -mr-2 text-white/60 hover:text-white transition-colors"
              aria-label="Close menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </button>
          </div>

          {/* Nav links */}
          <nav className="flex flex-col flex-1 justify-center px-8 overflow-y-auto" aria-label="Mobile navigation links">
            {NAV_LINKS.map((link, i) => {
              if (link.label === "Services") {
                return (
                  <div key="services" className="border-b border-white/10">
                    <button
                      ref={i === 0 ? firstLinkRef : undefined}
                      onClick={() => setMobileServicesOpen((v) => !v)}
                      className="group flex items-center justify-between w-full py-5 text-2xl font-semibold text-white/80 hover:text-white transition-colors duration-150"
                    >
                      Services
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 12 12"
                        fill="none"
                        aria-hidden="true"
                        className={`text-white/25 group-hover:text-orange-400 transition-all duration-150 ${mobileServicesOpen ? "rotate-180" : ""}`}
                      >
                        <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>

                    {mobileServicesOpen && (
                      <div className="pb-4 pl-2 space-y-1">
                        {SERVICE_PAGES.map((page) => (
                          <Link
                            key={page.href}
                            href={page.href}
                            onClick={() => setMobileOpen(false)}
                            className="flex items-center justify-between py-3 px-3 rounded-xl text-base font-medium text-white/60 hover:text-orange-400 hover:bg-white/5 transition-all"
                          >
                            {page.label}
                            <ArrowIcon size={14} />
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              if (link.label === "Tools") {
                return (
                  <div key="tools" className="border-b border-white/10">
                    <button
                      onClick={() => setMobileToolsOpen((v) => !v)}
                      className="group flex items-center justify-between w-full py-5 text-2xl font-semibold text-white/80 hover:text-white transition-colors duration-150"
                    >
                      Tools
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 12 12"
                        fill="none"
                        aria-hidden="true"
                        className={`text-white/25 group-hover:text-orange-400 transition-all duration-150 ${mobileToolsOpen ? "rotate-180" : ""}`}
                      >
                        <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>

                    {mobileToolsOpen && (
                      <div className="pb-4 pl-2 space-y-1">
                        <Link
                          href="/tools/funnel-velocity"
                          onClick={() => setMobileOpen(false)}
                          className="flex items-center justify-between py-3 px-3 rounded-xl text-base font-medium text-white/60 hover:text-orange-400 hover:bg-white/5 transition-all"
                        >
                          Velocity Calculator
                          <ArrowIcon size={14} />
                        </Link>
                        <Link
                          href="/resources/agentic-outbound"
                          onClick={() => setMobileOpen(false)}
                          className="flex items-center justify-between py-3 px-3 rounded-xl text-base font-medium text-white/60 hover:text-orange-400 hover:bg-white/5 transition-all"
                        >
                          Outbound Playbook
                          <ArrowIcon size={14} />
                        </Link>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={link.href}
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
                    <path d="M1 7h12m0 0L8 2m5 5L8 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              );
            })}
          </nav>

          {/* CTA pinned to bottom */}
          <div className="shrink-0 px-8 pb-12">
            <Link
              href={SITE_CONFIG.calendarLink}
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center gap-2 w-full rounded-full bg-accent py-4 text-base font-semibold text-[#0B1221] hover:brightness-110 active:scale-[0.98] transition-all duration-200"
            >
              Get in Touch
              <ArrowIcon size={16} />
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
