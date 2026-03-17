"use client";

import React from "react";
import { COLORS } from "@/lib/portfolio-tokens";

export function LocalizationMap() {
  const regions = [
    { region: "North America", langs: 2, pages: 12, status: "Live", growth: "+42%" },
    { region: "Western Europe", langs: 5, pages: 60, status: "Live", growth: "+67%" },
    { region: "LATAM", langs: 2, pages: 24, status: "Live", growth: "+89%" },
    { region: "APAC", langs: 4, pages: 48, status: "Scaling", growth: "+156%" },
    { region: "MENA", langs: 2, pages: 24, status: "Pilot", growth: "N/A" },
  ];
  return (
    <div className="rounded-xl border overflow-hidden" style={{ borderColor: COLORS.border }}>
      <div className="p-3.5 px-4.5 bg-[--bgCard] border-b" style={{ borderColor: COLORS.border, ["--bgCard" as any]: COLORS.bgCard }}>
        <div className="text-[13px] font-bold" style={{ color: COLORS.text }}>Non-Branded SEO Localization Program</div>
        <div className="text-[10px] mt-1" style={{ color: COLORS.textMuted }}>15 languages · 168 localized pages · 5 priority regions</div>
      </div>
      <div className="overflow-x-auto">
        <div className="min-w-[400px]">
          {regions.map((r, i) => (
            <div
              key={i}
              className="grid grid-cols-[140px_60px_60px_70px_70px] p-2.5 px-4.5 border-b last:border-0"
              style={{
                borderColor: COLORS.border,
                background: i % 2 === 0 ? `${COLORS.bgCard}80` : "transparent",
              }}
            >
              <div className="text-[11px] font-medium" style={{ color: COLORS.text }}>{r.region}</div>
              <div className="text-[11px]" style={{ color: COLORS.textMuted }}>{r.langs} langs</div>
              <div className="text-[11px]" style={{ color: COLORS.textMuted }}>{r.pages} pgs</div>
              <div>
                <span
                  className="text-[9px] px-2 py-0.5 rounded font-semibold"
                  style={{
                    background: r.status === "Live" ? `${COLORS.success}20` : r.status === "Scaling" ? `${COLORS.warning}20` : `${COLORS.info}20`,
                    color: r.status === "Live" ? COLORS.success : r.status === "Scaling" ? COLORS.warning : COLORS.info,
                  }}
                >
                  {r.status}
                </span>
              </div>
              <div className="text-[11px] font-semibold text-right" style={{ color: r.growth !== "N/A" ? COLORS.success : COLORS.textDim }}>
                {r.growth}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
