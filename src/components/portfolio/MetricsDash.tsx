"use client";

import React from "react";
import { COLORS } from "@/lib/portfolio-tokens";

export function MetricsDash() {
  const metrics = [
    { label: "Active Seats (WAU)", value: "12.4K", change: "+34%", up: true },
    { label: "Enterprise ARR", value: "$18.2M", change: "+127%", up: true },
    { label: "Pipeline Generated", value: "$4.8M", change: "+89%", up: true },
    { label: "Self-Serve → Ent Conv.", value: "8.3%", change: "+2.1pp", up: true },
  ];
  const barData = [
    { month: "Jan", v: 35 }, { month: "Feb", v: 42 }, { month: "Mar", v: 48 },
    { month: "Apr", v: 55 }, { month: "May", v: 63 }, { month: "Jun", v: 78 },
    { month: "Jul", v: 85 }, { month: "Aug", v: 92 }, { month: "Sep", v: 100 },
  ];
  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 mb-4">
        {metrics.map((m, i) => (
          <div
            key={i}
            className="bg-[--bgCard] border rounded-xl p-3.5"
            style={{ borderColor: COLORS.border, ["--bgCard" as any]: COLORS.bgCard }}
          >
            <div className="text-[10px] tracking-wider mb-1.5" style={{ color: COLORS.textMuted }}>{m.label}</div>
            <div className="text-[22px] font-extrabold" style={{ color: COLORS.text }}>{m.value}</div>
            <div className="text-[11px] font-semibold mt-1" style={{ color: m.up ? COLORS.success : COLORS.rose }}>
              {m.up ? "↑" : "↓"} {m.change} QoQ
            </div>
          </div>
        ))}
      </div>
      <div
        className="bg-[--bgCard] rounded-xl border p-4 md:p-5"
        style={{ borderColor: COLORS.border, ["--bgCard" as any]: COLORS.bgCard }}
      >
        <div className="text-[10px] tracking-widest mb-3.5" style={{ color: COLORS.textMuted }}>
          MONTHLY ENTERPRISE REVENUE TRAJECTORY (INDEXED)
        </div>
        <div className="flex items-end gap-2 h-20">
          {barData.map((d, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <div
                className="w-full rounded-t-sm animate-in slide-in-from-bottom duration-700"
                style={{
                  height: `${d.v * 0.8}px`,
                  background: `linear-gradient(180deg, ${COLORS.accent}, ${COLORS.accentDim})`,
                  opacity: 0.7 + (i * 0.03),
                  animationDelay: `${i * 50}ms`,
                  animationFillMode: "both",
                }}
              />
              <div className="text-[8px]" style={{ color: COLORS.textDim }}>{d.month}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
