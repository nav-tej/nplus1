"use client";

import React from "react";
import { COLORS } from "@/lib/portfolio-tokens";

export function PLEFlow() {
  const steps = ["Landing Page", "Interactive Tour", "Use Case Deep-Dive", "Guided Trial", "Sales Handoff"];
  return (
    <div className="flex flex-col md:flex-row gap-3 items-center">
      {steps.map((s, i) => (
        <React.Fragment key={i}>
          <div
            className="bg-[--bgCard] border rounded-xl py-3.5 px-4 flex-1 text-center transition-all duration-300"
            style={{
              borderColor: i === 1 ? COLORS.accent : COLORS.border,
              boxShadow: i === 1 ? `0 0 20px ${COLORS.accentGlow}` : "none",
              ["--bgCard" as any]: COLORS.bgCard,
            }}
          >
            <div className="text-[9px] font-bold mb-1" style={{ color: COLORS.textDim }}>STEP {i + 1}</div>
            <div
              className="text-[11px] font-semibold"
              style={{ color: i === 1 ? COLORS.accent : COLORS.text }}
            >
              {s}
            </div>
          </div>
          {i < steps.length - 1 && (
            <div className="text-[--textDim] text-base rotate-90 md:rotate-0" style={{ ["--textDim" as any]: COLORS.textDim }}>→</div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
