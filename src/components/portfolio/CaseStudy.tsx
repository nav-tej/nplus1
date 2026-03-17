"use client";

import React, { useState } from "react";
import { COLORS } from "@/lib/portfolio-tokens";

interface CaseStudyProps {
  title: string;
  subtitle: string;
  role: string;
  period: string;
  challenge: string;
  approach: string;
  outcomes: string;
  children: React.ReactNode;
}

export function CaseStudy({
  title,
  subtitle,
  role,
  period,
  challenge,
  approach,
  outcomes,
  children,
}: CaseStudyProps) {
  const [open, setOpen] = useState(true);

  return (
    <div className="mb-12">
      <div
        className="flex justify-between items-start mb-6 cursor-pointer group"
        onClick={() => setOpen(!open)}
      >
        <div>
          <div className="text-[11px] tracking-[0.15em] font-semibold mb-1.5" style={{ color: COLORS.textDim }}>
            {subtitle}
          </div>
          <h2 className="text-[28px] font-extrabold m-0 leading-[1.2] transition-colors group-hover:text-[--accent]" style={{ color: COLORS.text, ["--accent" as any]: COLORS.accent }}>
            {title}
          </h2>
          <div className="text-xs mt-1.5" style={{ color: COLORS.textMuted }}>
            {role} · {period}
          </div>
        </div>
        <div
          className="text-2xl transition-transform duration-300"
          style={{
            color: COLORS.accent,
            transform: open ? "rotate(0)" : "rotate(-90deg)",
          }}
        >
          ▾
        </div>
      </div>
      {open && (
        <div className="animate-in fade-in duration-500">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-7">
            <div>
              <div className="text-[10px] font-bold tracking-[0.12em] mb-2" style={{ color: COLORS.accent }}>
                CHALLENGE
              </div>
              <div className="text-[13px] leading-[1.7]" style={{ color: COLORS.textMuted }}>
                {challenge}
              </div>
            </div>
            <div>
              <div className="text-[10px] font-bold tracking-[0.12em] mb-2" style={{ color: COLORS.accent }}>
                APPROACH
              </div>
              <div className="text-[13px] leading-[1.7]" style={{ color: COLORS.textMuted }}>
                {approach}
              </div>
            </div>
            <div>
              <div className="text-[10px] font-bold tracking-[0.12em] mb-2" style={{ color: COLORS.accent }}>
                OUTCOMES
              </div>
              <div className="text-[13px] leading-[1.7]" style={{ color: COLORS.textMuted }}>
                {outcomes}
              </div>
            </div>
          </div>
          <div className="text-[10px] font-bold tracking-[0.15em] mb-4" style={{ color: COLORS.accent }}>
            REPRESENTATIVE WORK ARTIFACTS
          </div>
          {children}
        </div>
      )}
    </div>
  );
}
