"use client";

import React from "react";
import { COLORS } from "@/lib/portfolio-tokens";

export function CategoryReframing() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-5 items-center">
      <div
        className="bg-[--rose10] border rounded-xl p-4 text-center"
        style={{
          background: `${COLORS.rose}10`,
          borderColor: `${COLORS.rose}30`,
        }}
      >
        <div className="text-[10px] font-bold tracking-[0.1em] mb-2" style={{ color: COLORS.rose }}>BEFORE</div>
        <div className="text-sm font-semibold" style={{ color: COLORS.text }}>"File Sharing"</div>
        <div className="text-[11px] mt-1.5 leading-relaxed" style={{ color: COLORS.textMuted }}>
          Commodity market<br />Price-driven decisions<br />Feature parity trap
        </div>
      </div>
      <div className="text-3xl rotate-90 md:rotate-0 text-center" style={{ color: COLORS.accent }}>→</div>
      <div
        className="bg-[--success10] border rounded-xl p-4 text-center"
        style={{
          background: `${COLORS.success}10`,
          borderColor: `${COLORS.success}30`,
        }}
      >
        <div className="text-[10px] font-bold tracking-[0.1em] mb-2" style={{ color: COLORS.success }}>AFTER</div>
        <div className="text-sm font-semibold" style={{ color: COLORS.text }}>"Content Governance"</div>
        <div className="text-[11px] mt-1.5 leading-relaxed" style={{ color: COLORS.textMuted }}>
          Differentiated category<br />Compliance-driven urgency<br />Defensible positioning
        </div>
      </div>
    </div>
  );
}
