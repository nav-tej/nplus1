"use client";

import React from "react";
import { COLORS } from "@/lib/portfolio-tokens";

export function POVDealFramework() {
  const steps = [
    { step: "01", title: "Business Justification", items: "Why do anything? · Why us? · Why now?" },
    { step: "02", title: "Success Criteria", items: "Top 3 requirements · Measurable outcomes · Eval timeline" },
    { step: "03", title: "Mutual Action Plan", items: "Joint milestones · Owner assignments · Decision framework" },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
      {steps.map((s, i) => (
        <div
          key={i}
          className="bg-[--bgCard] border rounded-xl p-4 border-t-[3px]"
          style={{
            borderColor: COLORS.border,
            borderTopColor: COLORS.accent,
            ["--bgCard" as any]: COLORS.bgCard,
          }}
        >
          <div className="text-[10px] font-extrabold mb-2" style={{ color: COLORS.accent }}>STEP {s.step}</div>
          <div className="text-[13px] font-bold mb-2" style={{ color: COLORS.text }}>{s.title}</div>
          <div className="text-[11px] leading-relaxed" style={{ color: COLORS.textMuted }}>{s.items}</div>
        </div>
      ))}
    </div>
  );
}
