"use client";

import React from "react";
import { COLORS } from "@/lib/portfolio-tokens";

export function CompetitivePage() {
  const rows = [
    { category: "Accuracy & Signal", us: "98% false positive reduction", them: "High noise, requires manual triage" },
    { category: "Time to Resolution", us: "AI-assisted prioritization", them: "Manual research per finding" },
    { category: "Developer Experience", us: "In-workflow remediation", them: "Context-switch to security tooling" },
    { category: "Scan Performance", us: "Fast monorepo support", them: "Timeouts blocking PRs" },
  ];
  return (
    <div className="rounded-xl border overflow-hidden" style={{ borderColor: COLORS.border }}>
      <div className="p-4 bg-[--bgCard] border-b text-center" style={{ ["--bgCard" as any]: COLORS.bgCard, borderColor: COLORS.border }}>
        <div className="text-base font-bold" style={{ color: COLORS.text }}>
          <span style={{ color: COLORS.success }}>Your Product</span>
          <span className="mx-3" style={{ color: COLORS.textDim }}>vs</span>
          <span style={{ color: COLORS.textMuted }}>Competitor</span>
        </div>
      </div>
      {rows.map((r, i) => (
        <div
          key={i}
          className="grid grid-cols-1 md:grid-cols-[140px_1fr_1fr] border-b last:border-0"
          style={{ borderColor: COLORS.border }}
        >
          <div className="p-3 bg-[--accent08] font-semibold text-[11px] flex items-center" style={{ ["--accent08" as any]: `${COLORS.accent}08`, color: COLORS.accent }}>
            {r.category}
          </div>
          <div className="p-3 border-l flex items-center gap-2" style={{ borderColor: COLORS.border }}>
            <div className="w-1.5 h-1.5 rounded-full bg-[--success] shrink-0" style={{ ["--success" as any]: COLORS.success }} />
            <span className="text-[11px]" style={{ color: COLORS.text }}>{r.us}</span>
          </div>
          <div className="p-3 border-l flex items-center gap-2" style={{ borderColor: COLORS.border }}>
            <div className="w-1.5 h-1.5 rounded-full bg-[--rose] shrink-0" style={{ ["--rose" as any]: COLORS.rose }} />
            <span className="text-[11px]" style={{ color: COLORS.textMuted }}>{r.them}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
