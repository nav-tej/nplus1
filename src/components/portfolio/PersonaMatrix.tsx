"use client";

import React from "react";
import { COLORS } from "@/lib/portfolio-tokens";

export function PersonaMatrix() {
  const personas = [
    { role: "CMO / VP Marketing", type: "Economic", focus: "Revenue attribution, brand vs demand balance, AI adoption", color: COLORS.accent },
    { role: "Dir. Demand Gen", type: "Technical", focus: "Pipeline generation, multi-channel optimization, CAC reduction", color: COLORS.info },
    { role: "Dir. Product Marketing", type: "Influencer", focus: "Positioning, competitive intel, sales enablement, launch mgmt", color: COLORS.purple },
    { role: "Dir. Content / Digital", type: "Influencer", focus: "Content at scale, SEO, engagement metrics, distribution", color: COLORS.success },
    { role: "Marketing Ops", type: "Technical", focus: "Martech stack, CRM hygiene, integrations, compliance", color: COLORS.warning },
  ];
  return (
    <div className="overflow-x-auto rounded-xl border" style={{ borderColor: COLORS.border }}>
      <div className="min-w-[600px]">
        <div
          className="grid grid-cols-[180px_90px_1fr] p-3 gap-3 border-b"
          style={{ background: `${COLORS.accent}15`, borderColor: COLORS.border }}
        >
          <div className="text-[10px] font-bold tracking-widest" style={{ color: COLORS.accent }}>PERSONA</div>
          <div className="text-[10px] font-bold tracking-widest" style={{ color: COLORS.accent }}>BUYER ROLE</div>
          <div className="text-[10px] font-bold tracking-widest" style={{ color: COLORS.accent }}>KEY PRIORITIES</div>
        </div>
        {personas.map((p, i) => (
          <div
            key={i}
            className="grid grid-cols-[180px_90px_1fr] p-3 gap-3 border-b last:border-0"
            style={{
              borderColor: COLORS.border,
              background: i % 2 === 0 ? COLORS.bgCard : "transparent",
            }}
          >
            <div className="text-xs font-semibold flex items-center gap-2" style={{ color: COLORS.text }}>
              <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: p.color }} />
              {p.role}
            </div>
            <div className="text-[11px] flex items-center">
              <span
                className="px-2 py-0.5 rounded text-[10px]"
                style={{ background: `${p.color}20`, color: p.color }}
              >
                {p.type}
              </span>
            </div>
            <div className="text-[11px] leading-relaxed" style={{ color: COLORS.textMuted }}>
              {p.focus}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
