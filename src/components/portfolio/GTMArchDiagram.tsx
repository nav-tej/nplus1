"use client";

import React from "react";
import { COLORS } from "@/lib/portfolio-tokens";

export function GTMArchDiagram() {
  const layers = [
    { label: "DATA LAYER", color: COLORS.purple, items: [
      { name: "Snowflake", sub: "Data Warehouse" },
      { name: "dbt", sub: "Transformation" },
      { name: "Polytomic", sub: "ETL & Reverse ETL" },
    ]},
    { label: "ANALYTICS & PRODUCT", color: COLORS.info, items: [
      { name: "PostHog", sub: "Product Analytics" },
      { name: "Hex", sub: "BI & Notebooks" },
      { name: "GA4 + GTM", sub: "Web Analytics" },
    ]},
    { label: "GTM & CRM", color: COLORS.accent, items: [
      { name: "Salesforce", sub: "CRM + LeanData" },
      { name: "Apollo.io", sub: "Sales Intelligence" },
      { name: "ChiliPiper", sub: "Routing & Scheduling" },
    ]},
    { label: "MARKETING & ENGAGEMENT", color: COLORS.rose, items: [
      { name: "Customer.io", sub: "Lifecycle Marketing" },
      { name: "Intercom", sub: "Customer Messaging" },
      { name: "Gong", sub: "Conversation Intelligence" },
    ]},
    { label: "INFRA & PAYMENTS", color: COLORS.success, items: [
      { name: "Stripe", sub: "Payments & Billing" },
      { name: "Zapier", sub: "Workflow Automation" },
      { name: "Webflow → Sanity", sub: "CMS Migration" },
    ]},
  ];

  const rowH = 54;
  const startY = 10;
  const colW = 170;
  const labelW = 145;

  return (
    <svg viewBox="0 0 680 300" style={{ width: "100%", height: "auto" }}>
      {layers.map((layer, li) => {
        const y = startY + li * rowH;
        return (
          <g key={li}>
            {/* Layer label */}
            <rect x="0" y={y} width={labelW} height="44" rx="6" fill={`${layer.color}15`} stroke={layer.color} strokeWidth="1" opacity="0.8"/>
            <text x="10" y={y + 18} fill={layer.color} fontSize="8" fontWeight="800" letterSpacing="0.08em" fontFamily="'DM Sans',sans-serif">{layer.label}</text>
            <line x1="10" y1={y+24} x2={labelW - 10} y2={y+24} stroke={layer.color} strokeWidth="0.5" opacity="0.3"/>
            {/* Tool nodes */}
            {layer.items.map((item, ii) => {
              const x = labelW + 12 + ii * colW;
              return (
                <g key={ii}>
                  <rect x={x} y={y} width="158" height="44" rx="7" fill={COLORS.bgCard} stroke={COLORS.border} strokeWidth="1"/>
                  <circle cx={x + 13} cy={y + 16} r="3.5" fill={layer.color} opacity="0.7"/>
                  <text x={x + 22} y={y + 19} fill={COLORS.text} fontSize="11" fontWeight="700" fontFamily="'DM Sans',sans-serif">{item.name}</text>
                  <text x={x + 13} y={y + 35} fill={COLORS.textMuted} fontSize="9" fontFamily="'DM Sans',sans-serif">{item.sub}</text>
                </g>
              );
            })}
          </g>
        );
      })}
      {/* Connection annotations */}
      <text x="340" y="292" textAnchor="middle" fill={COLORS.textDim} fontSize="9" fontFamily="'DM Sans',sans-serif">
        Reverse ETL (Polytomic) · Webhooks · Zapier Automations · Native API Integrations
      </text>
    </svg>
  );
}
