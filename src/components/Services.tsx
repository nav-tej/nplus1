"use client";

import { useState } from "react";
import { SERVICES } from "@/lib/constants";

const icons: Record<string, React.ReactNode> = {
  strategy: (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <path d="M14 3l2.5 5.5L23 9.5l-4.5 4.5 1 6.5L14 17.5l-5.5 3L9.5 14 5 9.5l6.5-1L14 3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  ),
  positioning: (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <circle cx="14" cy="14" r="10" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="14" cy="14" r="5.5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="14" cy="14" r="1.5" fill="currentColor" />
    </svg>
  ),
  demand: (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <path d="M3 22l6-6 4.5 4.5L24 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M18 8h6v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  sales: (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <rect x="4" y="14" width="5" height="10" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <rect x="11.5" y="10" width="5" height="14" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <rect x="19" y="5" width="5" height="19" rx="1" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  revops: (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <circle cx="14" cy="14" r="4" stroke="currentColor" strokeWidth="1.5" />
      <path d="M14 3v3m0 16v3M3 14h3m16 0h3M6.1 6.1l2.1 2.1m11.6 11.6l2.1 2.1M21.9 6.1l-2.1 2.1M8.2 19.8l-2.1 2.1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  analytics: (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <path d="M3 25h22M7 18v4m4.5-8v8m4.5-13v13m4.5-18v18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
};

export default function Services() {
  const [active, setActive] = useState(0);

  return (
    <section id="services" className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Header */}
        <div className="max-w-2xl mb-16">
          <p className="text-accent text-sm font-medium tracking-wider uppercase mb-4">
            Services
          </p>
          <h2 className="text-4xl lg:text-5xl font-bold tracking-tight mb-6">
            Growth That Pays Dividends
            <br />
            <span className="text-muted">Over Time</span>
          </h2>
          <p className="text-lg text-muted leading-relaxed">
            Expert-led go-to-market strategy paired with hands-on execution.
            We build the engine, then help you drive it.
          </p>
        </div>

        {/* Service Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
          {SERVICES.map((service, i) => (
            <button
              key={service.title}
              onClick={() => setActive(i)}
              className={`group text-left rounded-2xl border p-7 lg:p-8 transition-all duration-300 cursor-pointer relative overflow-hidden ${
                active === i
                  ? "border-accent/30 bg-accent/[0.04]"
                  : "border-white/[0.06] bg-white/[0.015] hover:border-white/10 hover:bg-white/[0.03]"
              }`}
            >
              {active === i && (
                <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.06] to-transparent pointer-events-none" />
              )}
              <div className="relative">
                <div
                  className={`mb-5 transition-colors duration-300 ${
                    active === i ? "text-accent" : "text-muted group-hover:text-foreground"
                  }`}
                >
                  {icons[service.icon]}
                </div>
                <div className="flex items-center gap-3 mb-3">
                  <span className={`text-xs font-mono ${active === i ? "text-accent/60" : "text-muted/50"}`}>
                    0{service.step}
                  </span>
                  <h3 className="text-lg font-semibold">{service.title}</h3>
                </div>
                <p className="text-sm text-muted leading-relaxed">
                  {service.description}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
