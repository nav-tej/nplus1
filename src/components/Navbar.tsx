"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { X, Menu, Plus, ArrowRight } from "lucide-react";

import { NAV_LINKS, SERVICE_PAGES, SITE_CONFIG } from "@/lib/constants";
import { Wordmark } from "@/components/brand";

/** `theme="paper"` puts the nav on the paper tokens, for long-read pages. */
export default function Navbar({ theme }: { theme?: "paper" } = {}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileToolsOpen, setMobileToolsOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);

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

  const navigationSchema = {
    "@context": "https://schema.org",
    "@type": "SiteNavigationElement",
    "name": NAV_LINKS.map(l => l.label),
    "url": NAV_LINKS.map(l => `https://${SITE_CONFIG.domain}${l.href.startsWith("/") ? l.href : `/${l.href}`}`)
  };

  return (
    <div data-theme={theme}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(navigationSchema) }}
      />
      {/* ─── Top bar ─── */}
      <header
        className="fixed top-0 left-0 right-0 z-50 h-[var(--nav-height)] flex items-center bg-[var(--bg-glass)] backdrop-blur-md border-b border-line"
      >
        <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-8">
          <nav className="flex items-center justify-between" aria-label="Main Navigation">
            {/* Logo */}
            <Link 
              href="/" 
              className="flex items-center gap-2.5 group"
              title="n+α Ventures - AI-Native GTM Consulting Home"
              aria-label="n+α Ventures Home"
            >
              <Wordmark size={24} />
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
                        <div className="bg-surface border border-line rounded-[14px] overflow-hidden shadow-[var(--shadow-pop)]">
                          {SERVICE_PAGES.map((page) => (
                            <Link 
                              key={page.href} 
                              href={page.href} 
                              className="flex flex-col gap-0.5 px-5 py-4 hover:bg-[var(--surface-2)] transition-colors border-b border-line last:border-0 group"
                              title={page.label}
                            >
                              <span className="text-sm font-semibold text-foreground group-hover:text-alpha-text transition-colors">{page.label}</span>
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
                        <div className="bg-surface border border-line rounded-[14px] overflow-hidden shadow-[var(--shadow-pop)]">
                          <Link href="/tools/funnel-velocity" className="flex flex-col gap-0.5 px-5 py-4 hover:bg-[var(--surface-2)] transition-colors border-b border-line group" title="SaaS Funnel Velocity Calculator">
                            <span className="text-sm font-semibold text-foreground group-hover:text-alpha-text transition-colors">Velocity Calculator</span>
                            <span className="text-[11px] text-muted leading-tight">Diagnose growth bottlenecks</span>
                          </Link>
                          <Link href="/resources/agentic-outbound" className="flex flex-col gap-0.5 px-5 py-4 hover:bg-[var(--surface-2)] transition-colors last:border-0 group" title="Agentic Outbound Architecture Playbook">
                            <span className="text-sm font-semibold text-foreground group-hover:text-alpha-text transition-colors">Outbound Playbook</span>
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
                <Link prefetch={false} 
                  href={SITE_CONFIG.calendarLink} 
                  className="inline-flex items-center h-[38px] bg-accent text-[var(--on-alpha)] px-4 rounded-lg text-sm font-medium hover:bg-[var(--alpha-fill-hover)] transition-colors"
                  title="Book a free GTM audit"
                >
                  Book a GTM audit
                </Link>
              </li>
            </ul>

            {/* Mobile Trigger */}
            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden flex items-center justify-center w-11 h-11 rounded-full border border-[var(--line-strong)] text-foreground"
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
        className={`fixed inset-0 z-[100] bg-background transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] motion-reduce:transition-none ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        } md:hidden`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation"
      >
        {/* Mobile Header */}
        <div className="flex items-center justify-between px-5 h-[var(--nav-height)] border-b border-line">
          <Link href="/" onClick={() => setMobileOpen(false)} className="flex items-center gap-2.5" title="n+α Home">
            <Wordmark size={24} />
          </Link>
          <button
            onClick={() => setMobileOpen(false)}
            className="flex items-center justify-center w-11 h-11 rounded-full border border-[var(--line-strong)] text-foreground"
            aria-label="Close Mobile Menu"
            title="Close Navigation"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile Content */}
        <nav className="flex flex-col h-[calc(100dvh-var(--nav-height))] overflow-y-auto px-6 py-10 space-y-4" aria-label="Mobile Navigation Links">
          {NAV_LINKS.map((link) => {
            if (link.label === "Services") {
              return (
                <div key="services" className="space-y-3">
                  <button 
                    onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                    className={`flex items-center justify-between w-full p-5 rounded-2xl border transition-all ${
                      mobileServicesOpen ? "bg-surface border-[var(--line-strong)] text-alpha-text" : "bg-surface border-line text-foreground"
                    }`}
                    aria-expanded={mobileServicesOpen}
                    title="Toggle Services Menu"
                  >
                    <span className="text-2xl font-serif">Services</span>
                    <Plus className={`w-5 h-5 transition-transform duration-300 ${mobileServicesOpen ? "rotate-45" : ""}`} />
                  </button>
                  {mobileServicesOpen && (
                    <div className="grid grid-cols-1 gap-3 pl-4 animate-in slide-in-from-top-2 duration-200">
                      {SERVICE_PAGES.map((page) => (
                        <Link 
                          key={page.href} 
                          href={page.href} 
                          onClick={() => setMobileOpen(false)} 
                          className="flex flex-col p-4 rounded-xl bg-surface border border-line"
                          title={page.label}
                        >
                          <span className="font-medium text-foreground">{page.label}</span>
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
                      mobileToolsOpen ? "bg-surface border-[var(--line-strong)] text-alpha-text" : "bg-surface border-line text-foreground"
                    }`}
                    aria-expanded={mobileToolsOpen}
                    title="Toggle Tools Menu"
                  >
                    <span className="text-2xl font-serif">Tools</span>
                    <Plus className={`w-5 h-5 transition-transform duration-300 ${mobileToolsOpen ? "rotate-45" : ""}`} />
                  </button>
                  {mobileToolsOpen && (
                    <div className="grid grid-cols-1 gap-3 pl-4 animate-in slide-in-from-top-2 duration-200">
                      <Link 
                        href="/tools/funnel-velocity" 
                        onClick={() => setMobileOpen(false)} 
                        className="flex flex-col p-4 rounded-xl bg-surface border border-line"
                        title="Velocity Calculator"
                      >
                        <span className="font-medium text-foreground">Velocity Calculator</span>
                        <span className="text-xs text-muted">Diagnose growth bottlenecks</span>
                      </Link>
                      <Link 
                        href="/resources/agentic-outbound" 
                        onClick={() => setMobileOpen(false)} 
                        className="flex flex-col p-4 rounded-xl bg-surface border border-line"
                        title="Outbound Playbook"
                      >
                        <span className="font-medium text-foreground">Outbound Playbook</span>
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
                className="flex items-center justify-between w-full p-5 rounded-2xl bg-surface border border-line text-2xl font-serif text-foreground hover:bg-[var(--surface-2)] transition-all"
                title={link.label}
              >
                {link.label}
                <ArrowRight className="w-5 h-5 text-muted" />
              </Link>
            );
          })}

          <div className="pt-6">
            <Link prefetch={false}
              href={SITE_CONFIG.calendarLink}
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center gap-3 w-full h-12 rounded-lg bg-accent text-[var(--on-alpha)] text-base font-medium"
              title="Book a free GTM audit"
            >
              Book a GTM audit
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </nav>
      </div>
    </div>
  );
}
