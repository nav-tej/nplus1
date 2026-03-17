"use client";

import React from "react";
import { COLORS } from "@/lib/portfolio-tokens";

export function MessagingArch() {
  return (
    <div className="flex flex-col gap-2.5">
      <div
        className="border rounded-xl p-4 md:p-5 text-center"
        style={{
          background: `linear-gradient(135deg, ${COLORS.accent}20, ${COLORS.accent}05)`,
          borderColor: `${COLORS.accent}40`,
        }}
      >
        <div className="text-[10px] font-bold tracking-[0.12em] mb-1.5" style={{ color: COLORS.accent }}>TAGLINE</div>
        <div className="text-[15px] font-semibold italic" style={{ color: COLORS.text }}>
          "Powerful [capability] delivered by the most advanced [technology] on the platform"
        </div>
      </div>
      <div
        className="bg-[--bgCard] border rounded-xl p-4 md:p-5"
        style={{ borderColor: COLORS.border, ["--bgCard" as any]: COLORS.bgCard }}
      >
        <div className="text-[10px] font-bold tracking-[0.12em] mb-2.5" style={{ color: COLORS.accent }}>VALUE PILLARS</div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
          {["Create", "Localize", "Personalize", "Interact"].map((v, i) => {
            const colors = [COLORS.info, COLORS.purple, COLORS.accent, COLORS.success];
            return (
              <div
                key={i}
                className="text-center p-2.5 rounded-lg border"
                style={{
                  background: `${colors[i]}15`,
                  borderColor: `${colors[i]}30`,
                }}
              >
                <div className="text-xs font-bold" style={{ color: colors[i] }}>{v}</div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
        <div
          className="bg-[--bgCard] border rounded-xl p-3.5 md:p-4.5"
          style={{ borderColor: COLORS.border, ["--bgCard" as any]: COLORS.bgCard }}
        >
          <div className="text-[10px] font-bold tracking-[0.12em] mb-1.5" style={{ color: COLORS.accent }}>TARGET SEGMENTS</div>
          <div className="text-[11px] leading-relaxed" style={{ color: COLORS.textMuted }}>
            Individual creators · Mid-market teams<br />Enterprise departments · Agency partners
          </div>
        </div>
        <div
          className="bg-[--bgCard] border rounded-xl p-3.5 md:p-4.5"
          style={{ borderColor: COLORS.border, ["--bgCard" as any]: COLORS.bgCard }}
        >
          <div className="text-[10px] font-bold tracking-[0.12em] mb-1.5" style={{ color: COLORS.accent }}>BRAND PROMISE</div>
          <div className="text-[11px] leading-relaxed" style={{ color: COLORS.textMuted }}>
            10x faster production · 175+ language support<br />Personalized at scale · Interactive experiences
          </div>
        </div>
      </div>
    </div>
  );
}
