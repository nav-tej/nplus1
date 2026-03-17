"use client";

import React from "react";
import { COLORS } from "@/lib/portfolio-tokens";

export function FullFunnel() {
  const stages = [
    { label: "TOFU", name: "Attract & Aware", tactics: "SEO • Social • Ads • Events • Content", width: "100%", color: COLORS.info },
    { label: "MOFU", name: "Nurture & Engage", tactics: "Remarketing • Email • Webinars • Guides", width: "75%", color: COLORS.purple },
    { label: "BOFU", name: "Convert & Close", tactics: "Demos • POVs • Proposals • Enablement", width: "50%", color: COLORS.accent },
    { label: "CS", name: "Expand & Delight", tactics: "Onboarding • Adoption • Community • Upsell", width: "35%", color: COLORS.success },
  ];
  return (
    <div className="flex flex-col gap-2 items-center">
      {stages.map((s, i) => (
        <div
          key={i}
          className="bg-[--bgCard] border rounded-lg py-3 px-4 flex items-center gap-4 transition-all duration-300"
          style={{
            width: s.width,
            borderColor: `${s.color}30`,
            borderLeft: `3px solid ${s.color}`,
            ["--bgCard" as any]: COLORS.bgCard,
          }}
        >
          <div
            className="rounded px-2.5 py-1 text-[10px] font-extrabold tracking-widest min-w-[48px] text-center"
            style={{
              background: `${s.color}20`,
              color: s.color,
            }}
          >
            {s.label}
          </div>
          <div>
            <div className="font-semibold text-[13px]" style={{ color: COLORS.text }}>
              {s.name}
            </div>
            <div className="text-[10px] mt-0.5" style={{ color: COLORS.textMuted }}>
              {s.tactics}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
