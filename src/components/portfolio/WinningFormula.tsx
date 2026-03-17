"use client";

import React from "react";
import { COLORS } from "@/lib/portfolio-tokens";

export function WinningFormula() {
  const pillars = [
    { icon: "👤", title: "Right People", desc: "Personas, ICPs & target segments defined by data" },
    { icon: "💬", title: "Right Message", desc: "Value-based positioning tailored to buyer stage" },
    { icon: "📡", title: "Right Channel", desc: "Key watering holes across owned & paid media" },
    { icon: "⏱", title: "Right Time", desc: "Meeting buyers where they are in their journey" },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
      {pillars.map((p, i) => (
        <div
          key={i}
          className="bg-[--bgCard] border border-[--border] rounded-xl p-5 text-center relative overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-500"
          style={{
            ["--bgCard" as any]: COLORS.bgCard,
            ["--border" as any]: COLORS.border,
            animationDelay: `${i * 100}ms`,
            animationFillMode: "both",
          }}
        >
          <div
            className="absolute top-0 left-0 right-0 h-[3px]"
            style={{
              background: `linear-gradient(90deg, ${COLORS.accent}, transparent)`,
            }}
          />
          <div className="text-3xl mb-2">{p.icon}</div>
          <div
            className="font-bold text-xs tracking-wider mb-1"
            style={{ color: COLORS.accent }}
          >
            {p.title}
          </div>
          <div
            className="text-[11px] leading-relaxed"
            style={{ color: COLORS.textMuted }}
          >
            {p.desc}
          </div>
        </div>
      ))}
      <div
        className="col-span-full text-center p-3 rounded-lg mt-1"
        style={{
          background: `linear-gradient(90deg, transparent, ${COLORS.accentGlow}, transparent)`,
        }}
      >
        <span
          className="font-bold text-sm tracking-[0.1em]"
          style={{ color: COLORS.accent }}
        >
          → PIPELINE & REVENUE
        </span>
      </div>
    </div>
  );
}
