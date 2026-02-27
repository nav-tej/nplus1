"use client";

import { useState } from "react";
import { TESTIMONIALS } from "@/lib/constants";

export default function Testimonials() {
  const [active, setActive] = useState(0);

  return (
    <section className="py-24 lg:py-32 border-t border-white/5">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Header */}
        <div className="max-w-2xl mb-16">
          <p className="text-accent text-sm font-medium tracking-wider uppercase mb-4">
            Testimonials
          </p>
          <h2 className="text-4xl lg:text-5xl font-bold tracking-tight">
            They came for the strategy,
            <br />
            <span className="text-muted">stayed for the results.</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-[200px_1fr] gap-8 lg:gap-12">
          {/* Company Selector */}
          <div className="flex lg:flex-col gap-3">
            {TESTIMONIALS.map((t, i) => (
              <button
                key={t.company}
                onClick={() => setActive(i)}
                className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300 cursor-pointer ${
                  active === i
                    ? "bg-accent text-[#0B1221]"
                    : "bg-white/[0.06] text-muted hover:bg-white/10"
                }`}
                aria-label={`View work with ${t.company}`}
              >
                {t.company}
              </button>
            ))}
          </div>

          {/* Quote */}
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8 lg:p-12">
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              className="text-accent/30 mb-6"
            >
              <path
                d="M10 20c-3.3 0-6-2.7-6-6s2.7-6 6-6c5 0 8 4 8 12 0 6-3 12-8 14l-1-2c3-2 5-5 5-8-1 .6-2.5 1-4 1zm18 0c-3.3 0-6-2.7-6-6s2.7-6 6-6c5 0 8 4 8 12 0 6-3 12-8 14l-1-2c3-2 5-5 5-8-1 .6-2.5 1-4 1z"
                fill="currentColor"
              />
            </svg>
            <blockquote className="text-xl lg:text-2xl font-medium leading-relaxed mb-8">
              &ldquo;{TESTIMONIALS[active].quote}&rdquo;
            </blockquote>
            <div className="font-semibold text-accent">
              {TESTIMONIALS[active].company}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
