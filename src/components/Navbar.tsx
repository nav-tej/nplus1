"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { X, Menu, Plus, ArrowRight } from "lucide-react";

import { NAV_LINKS, SERVICE_PAGES, SITE_CONFIG } from "@/lib/constants";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileToolsOpen, setMobileToolsOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);

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
        if (mobileOpen) setMobileOpen(false);
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
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [mobileOpen]);

  const Logo = ({ gradientId }: { gradientId: string }) => (
    <svg width="36" height="36" viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id={gradientId} x1="31" y1="21" x2="54" y2="45" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#F97316" />
          <stop offset="100%" stopColor="#60A5FA" />
        </linearGradient>
      </defs>
      <path d="M7,44 V21 C7,14 25,14 25,21 V44" stroke="white" strokeWidth="4.5" fill="none" strokeLinecap="round" />
      <circle cx="16" cy="14" r="2.8" fill="#F97316" />
      <line x1="28.5" y1="32" x2="33.5" y2="32" stroke="white" strokeWidth="2" opacity="0.4" />
      <line x1="31" y1="29.5" x2="31" y2="34.5" stroke="white" strokeWidth="2" opacity="0.4" />
      <path d="M54,22 C46,20 34,24 34,33 C34,42 46,46 54,44" stroke={`url(#${gradientId})`} strokeWidth="4.5" fill="none" strokeLinecap="round" />
      <path d="M54,21 L54,45" stroke={`url(#${gradientId})`} strokeWidth="4.5" fill="none" strokeLinecap="round" />
    </svg>
  );

  const Wordmark = () => (
    <div className="flex flex-col leading-none">
      <span className="text-[17px] font-extrabold text-white tracking-tight">
        n+<span className="text-orange-400">α</span>
      </span>
      <span className="text-[8.5px] font-semibold text-white/50 tracking-[0.28em] uppercase mt-0.5">
        Ventures
      </span>
    </div>
  );

  const navigationSchema = {
    "@context": "https://schema.org",
    "@type": "SiteNavigationElement",
    "name": NAV_LINKS.map(l => l.label),
    "url": NAV_LINKS.map(l => `https://${SITE_CONFIG.domain}${l.href.startsWith("/") ? l.href : `/${l.href}`}`)
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(navigationSchema) }}
      />
      {/* ─── Top bar ─── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-[#0B1221]/90 backdrop-blur-md border-b border-white/5 py-3" : "bg-transparent py-5"
        }`}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <nav className="flex items-center justify-between" aria-label="Main Navigation">
            {/* Logo */}
            <Link 
              href="/" 
              className="flex items-center gap-2.5 group"
              title="n+α Ventures - AI-Native GTM Consulting Home"
              aria-label="n+α Ventures Home"
            >
              <Logo gradientId="navMain" />
              <Wordmark />
            </Link>

            {/* Desktop Nav */}
            <ul className="hidden md:flex items-center gap-8 list-none p-0 m-0">
              {NAV_LINKS.map((link) => {
                if (link.label === "Services") {
                  return (
                    <li key="services" className="relative" onMouseEnter={() => setServicesOpen(true)} onMouseLeave={() => setServicesOpen(false)}>
                      <button 
                        className="flex items-center gap-1.5 text-sm text-muted hover:text-foreground transition-colors py-2"
                        aria-expanded={servicesOpen}
                        aria-haspopup="true"
                        title="Explore our AI-Native GTM Services"
                      >
                        Services
                        <Plus className={`w-3.5 h-3.5 transition-transform duration-200 ${servicesOpen ? "rotate-45" : ""}`} />
                      </button>
                      <div className={`absolute top-full left-1/2 -translate-x-1/2 pt-3 z-50 w-[300px] transition-all duration-200 ${servicesOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"}`}>
                        <div className="bg-[#0B1221] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
                          {SERVICE_PAGES.map((page) => (
                            <Link 
                              key={page.href} 
                              href={page.href} 
                              className="flex flex-col gap-0.5 px-5 py-4 hover:bg-white/5 transition-colors border-b border-white/5 last:border-0 group"
                              title={page.label}
                            >
                              <span className="text-sm font-semibold text-foreground group-hover:text-orange-400 transition-colors">{page.label}</span>
                              <span className="text-[11px] text-muted leading-tight">{page.description}</span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </li>
                  );
                }
                if (link.label === "Tools") {
                  return (
                    <li key="tools" className="relative" onMouseEnter={() => setToolsOpen(true)} onMouseLeave={() => setToolsOpen(false)}>
                      <button 
                        className="flex items-center gap-1.5 text-sm text-muted hover:text-foreground transition-colors py-2"
                        aria-expanded={toolsOpen}
                        aria-haspopup="true"
                        title="Access GTM & Growth Tools"
                      >
                        Tools
                        <Plus className={`w-3.5 h-3.5 transition-transform duration-200 ${toolsOpen ? "rotate-45" : ""}`} />
                      </button>
                      <div className={`absolute top-full left-1/2 -translate-x-1/2 pt-3 z-50 w-[300px] transition-all duration-200 ${toolsOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"}`}>
                        <div className="bg-[#0B1221] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
                          <Link href="/tools/funnel-velocity" className="flex flex-col gap-0.5 px-5 py-4 hover:bg-white/5 transition-colors border-b border-white/5 group" title="SaaS Funnel Velocity Calculator">
                            <span className="text-sm font-semibold text-foreground group-hover:text-orange-400 transition-colors">Velocity Calculator</span>
                            <span className="text-[11px] text-muted leading-tight">Diagnose growth bottlenecks</span>
                          </Link>
                          <Link href="/resources/agentic-outbound" className="flex flex-col gap-0.5 px-5 py-4 hover:bg-white/5 transition-colors last:border-0 group" title="Agentic Outbound Architecture Playbook">
                            <span className="text-sm font-semibold text-foreground group-hover:text-orange-400 transition-colors">Outbound Playbook</span>
                            <span className="text-[11px] text-muted leading-tight">Build an agentic engine</span>
                          </Link>
                        </div>
                      </div>
                    </li>
                  );
                }
                return (
                  <li key={link.href}>
                    <Link 
                      href={link.href} 
                      className="text-sm text-muted hover:text-foreground transition-colors py-2"
                      title={link.label}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
              <li>
                <Link 
                  href={SITE_CONFIG.calendarLink} 
                  className="bg-accent text-[#0B1221] px-6 py-2.5 rounded-full text-sm font-bold hover:shadow-[0_0_20px_rgba(46,204,113,0.3)] transition-all"
                  title="Book a Strategy Call"
                >
                  Get in Touch
                </Link>
              </li>
            </ul>

            {/* Mobile Trigger */}
            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden flex items-center justify-center w-11 h-11 rounded-xl bg-white/10 border border-white/10 text-white active:scale-95 transition-all"
              aria-label="Open Mobile Menu"
              title="Open Navigation"
            >
              <Menu className="w-6 h-6" />
            </button>
          </nav>
        </div>
      </header>

      {/* ─── Smooth Mobile Menu Overlay ─── */}
      <div 
        className={`fixed inset-0 z-[100] bg-[#0B1221] transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        } md:hidden`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation"
      >
        {/* Mobile Header */}
        <div className="flex items-center justify-between px-6 h-20 border-b border-white/5">
          <Link href="/" onClick={() => setMobileOpen(false)} className="flex items-center gap-2.5" title="n+α Home">
            <Logo gradientId="navMobile" />
            <Wordmark />
          </Link>
          <button
            onClick={() => setMobileOpen(false)}
            className="flex items-center justify-center w-11 h-11 rounded-xl bg-white/10 border border-white/10 text-white active:scale-95 transition-all"
            aria-label="Close Mobile Menu"
            title="Close Navigation"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile Content */}
        <nav className="flex flex-col h-[calc(100vh-80px)] overflow-y-auto px-6 py-10 space-y-4" aria-label="Mobile Navigation Links">
          {NAV_LINKS.map((link) => {
            if (link.label === "Services") {
              return (
                <div key="services" className="space-y-3">
                  <button 
                    onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                    className={`flex items-center justify-between w-full p-5 rounded-2xl border transition-all ${
                      mobileServicesOpen ? "bg-white/10 border-orange-400/30 text-orange-400" : "bg-white/[0.03] border-white/5 text-white"
                    }`}
                    aria-expanded={mobileServicesOpen}
                    title="Toggle Services Menu"
                  >
                    <span className="text-xl font-bold">Services</span>
                    <Plus className={`w-5 h-5 transition-transform duration-300 ${mobileServicesOpen ? "rotate-45" : ""}`} />
                  </button>
                  {mobileServicesOpen && (
                    <div className="grid grid-cols-1 gap-3 pl-4 animate-in slide-in-from-top-2 duration-200">
                      {SERVICE_PAGES.map((page) => (
                        <Link 
                          key={page.href} 
                          href={page.href} 
                          onClick={() => setMobileOpen(false)} 
                          className="flex flex-col p-4 rounded-xl bg-white/[0.02] border border-white/5"
                          title={page.label}
                        >
                          <span className="font-bold text-white">{page.label}</span>
                          <span className="text-xs text-muted leading-tight">{page.description}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }
            if (link.label === "Tools") {
              return (
                <div key="tools" className="space-y-3">
                  <button 
                    onClick={() => setMobileToolsOpen(!mobileToolsOpen)}
                    className={`flex items-center justify-between w-full p-5 rounded-2xl border transition-all ${
                      mobileToolsOpen ? "bg-white/10 border-orange-400/30 text-orange-400" : "bg-white/[0.03] border-white/5 text-white"
                    }`}
                    aria-expanded={mobileToolsOpen}
                    title="Toggle Tools Menu"
                  >
                    <span className="text-xl font-bold">Tools</span>
                    <Plus className={`w-5 h-5 transition-transform duration-300 ${mobileToolsOpen ? "rotate-45" : ""}`} />
                  </button>
                  {mobileToolsOpen && (
                    <div className="grid grid-cols-1 gap-3 pl-4 animate-in slide-in-from-top-2 duration-200">
                      <Link 
                        href="/tools/funnel-velocity" 
                        onClick={() => setMobileOpen(false)} 
                        className="flex flex-col p-4 rounded-xl bg-white/[0.02] border border-white/5"
                        title="Velocity Calculator"
                      >
                        <span className="font-bold text-white">Velocity Calculator</span>
                        <span className="text-xs text-muted">Diagnose growth bottlenecks</span>
                      </Link>
                      <Link 
                        href="/resources/agentic-outbound" 
                        onClick={() => setMobileOpen(false)} 
                        className="flex flex-col p-4 rounded-xl bg-white/[0.02] border border-white/5"
                        title="Outbound Playbook"
                      >
                        <span className="font-bold text-white">Outbound Playbook</span>
                        <span className="text-xs text-muted">Build an agentic engine</span>
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
                className="flex items-center justify-between w-full p-5 rounded-2xl bg-white/[0.03] border border-white/5 text-xl font-bold text-white hover:bg-white/5 transition-all"
                title={link.label}
              >
                {link.label}
                <ArrowRight className="w-5 h-5 text-white/20" />
              </Link>
            );
          })}

          <div className="pt-6">
            <Link
              href={SITE_CONFIG.calendarLink}
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center gap-3 w-full p-5 rounded-2xl bg-accent text-[#0B1221] text-lg font-black hover:shadow-[0_0_30px_rgba(46,204,113,0.4)] transition-all"
              title="Book a Strategy Call"
            >
              Get in Touch
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
}
