"use client";

import React from "react";
import { COLORS } from "@/lib/portfolio-tokens";

interface ArtifactCardProps {
  label: string;
  children: React.ReactNode;
}

export function ArtifactCard({ label, children }: ArtifactCardProps) {
  return (
    <div
      className="bg-[--bg] border rounded-2xl p-5 mb-4 relative transition-all duration-300 hover:border-[--accent] hover:shadow-[0_0_20px_var(--accentGlow)] group"
      style={{
        ["--bg" as any]: COLORS.bg,
        borderColor: COLORS.border,
        ["--accent" as any]: COLORS.accent,
        ["--accentGlow" as any]: COLORS.accentGlow,
      }}
    >
      <div
        className="absolute top-3 right-4 text-[9px] tracking-widest bg-[--bgCard] py-0.5 px-2.5 rounded border transition-colors group-hover:border-[--accent] group-hover:text-[--accent]"
        style={{
          ["--bgCard" as any]: COLORS.bgCard,
          borderColor: COLORS.border,
          color: COLORS.textDim,
          ["--accent" as any]: COLORS.accent,
        }}
      >
        STYLIZED EXAMPLE
      </div>
      <div
        className="text-[11px] font-semibold mb-3.5 tracking-wide transition-colors group-hover:text-[--text]"
        style={{ color: COLORS.textMuted, ["--text" as any]: COLORS.text }}
      >
        {label}
      </div>
      {children}
    </div>
  );
}
