"use client";

import React from "react";
import { COLORS } from "@/lib/portfolio-tokens";

export function CommunityDash() {
  const channels = [
    { name: "Product Tips & Tutorials", members: "4,221", bar: 85 },
    { name: "Best Practices", members: "3,989", bar: 78 },
    { name: "Use Case: Enterprise", members: "2,597", bar: 55 },
    { name: "Creators & Social Media", members: "2,198", bar: 46 },
    { name: "Integrations & API", members: "2,008", bar: 42 },
  ];
  return (
    <div
      className="bg-[--bgCard] border rounded-xl p-5"
      style={{ borderColor: COLORS.border, ["--bgCard" as any]: COLORS.bgCard }}
    >
      <div className="flex justify-between mb-4">
        <div>
          <div className="text-[10px] tracking-widest" style={{ color: COLORS.textMuted }}>COMMUNITY PLATFORM</div>
          <div className="text-[28px] font-extrabold mt-1" style={{ color: COLORS.text }}>78,400+</div>
          <div className="text-[11px]" style={{ color: COLORS.success }}>Members · 192 Events · 55 New/week</div>
        </div>
        <div className="text-right">
          <div className="text-[10px]" style={{ color: COLORS.textMuted }}>ACTIVATED</div>
          <div className="text-[20px] font-bold" style={{ color: COLORS.accent }}>34%</div>
        </div>
      </div>
      <div className="text-[10px] tracking-widest mb-2.5" style={{ color: COLORS.textMuted }}>TOP CHANNELS</div>
      {channels.map((c, i) => (
        <div key={i} className="flex items-center gap-3 mb-2 last:mb-0">
          <div className="text-[11px] w-[180px] shrink-0" style={{ color: COLORS.text }}>{c.name}</div>
          <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: COLORS.border }}>
            <div
              className="h-full rounded-full"
              style={{
                width: `${c.bar}%`,
                background: `linear-gradient(90deg, ${COLORS.accent}, ${COLORS.success})`,
              }}
            />
          </div>
          <div className="text-[10px] w-10 text-right" style={{ color: COLORS.textMuted }}>{c.members}</div>
        </div>
      ))}
    </div>
  );
}
