"use client";

import React from "react";
import { COLORS } from "@/lib/portfolio-tokens";
import { CaseStudy } from "@/components/portfolio/CaseStudy";
import { ArtifactCard } from "@/components/portfolio/ArtifactCard";
import { GTMArchDiagram } from "@/components/portfolio/GTMArchDiagram";
import { WinningFormula } from "@/components/portfolio/WinningFormula";
import { FullFunnel } from "@/components/portfolio/FullFunnel";
import { MessagingArch } from "@/components/portfolio/MessagingArch";
import { MetricsDash } from "@/components/portfolio/MetricsDash";
import { CommunityDash } from "@/components/portfolio/CommunityDash";
import { PersonaMatrix } from "@/components/portfolio/PersonaMatrix";
import { LocalizationMap } from "@/components/portfolio/LocalizationMap";
import { CompetitivePage } from "@/components/portfolio/CompetitivePage";
import { POVDealFramework } from "@/components/portfolio/POVDealFramework";
import { PLEFlow } from "@/components/portfolio/PLEFlow";
import { CategoryReframing } from "@/components/portfolio/CategoryReframing";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PortfolioJsonLd from "@/components/portfolio/PortfolioJsonLd";
import caseStudyData from "@/data/portfolio/case-studies.json";

export default function PortfolioPage() {
  const { caseStudies } = caseStudyData;

  return (
    <>
      <PortfolioJsonLd />
      <Navbar />
      <div
        className="min-h-screen font-sans selection:bg-[--accentGlow] selection:text-[--accent] pt-20"
        style={{
          background: COLORS.bg,
          color: COLORS.text,
          ["--accent" as any]: COLORS.accent,
          ["--accentGlow" as any]: COLORS.accentGlow,
        }}
      >
        {/* ── Hero ── */}
        <div className="px-6 py-16 md:py-20 max-w-7xl mx-auto border-b" style={{ borderColor: COLORS.border }}>
          <div className="text-[--accent] text-xs tracking-[0.2em] font-bold mb-4" style={{ ["--accent" as any]: COLORS.accent }}>
            PORTFOLIO · SELECTED WORK
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold leading-[1.1] mb-5 bg-gradient-to-br from-[--text] to-[--accent] bg-clip-text text-transparent"
              style={{ ["--text" as any]: COLORS.text, ["--accent" as any]: COLORS.accent }}>
            Frameworks that scale.<br />
            <span className="font-serif italic font-normal" style={{ fontFamily: "var(--font-instrument-serif)" }}>
              Results that compound.
            </span>
          </h1>
          <p className="text-[--textMuted] text-base md:text-lg leading-relaxed max-w-2xl"
             style={{ ["--textMuted" as any]: COLORS.textMuted }}>
            Stylized representations of GTM strategy, marketing systems, and growth programs
            built for high-growth B2B SaaS companies. All artifacts are generalized examples
            inspired by real engagements, with no confidential data shown.
          </p>
        </div>

        {/* ── Case Studies ── */}
        <div className="max-w-7xl mx-auto px-6 py-12">
          {/* Case 1: AI Video Platform */}
          <CaseStudy {...caseStudies[0]}>
            <ArtifactCard label="GTM SYSTEMS ARCHITECTURE">
              <GTMArchDiagram />
            </ArtifactCard>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ArtifactCard label="STRATEGIC FRAMEWORK: 'WINNING FORMULA'">
                <WinningFormula />
              </ArtifactCard>
              <ArtifactCard label="FULL-FUNNEL MARKETING APPROACH">
                <FullFunnel />
              </ArtifactCard>
            </div>
            <ArtifactCard label="MESSAGING ARCHITECTURE">
              <MessagingArch />
            </ArtifactCard>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ArtifactCard label="ENTERPRISE GROWTH DASHBOARD (REPRESENTATIVE)">
                <MetricsDash />
              </ArtifactCard>
              <ArtifactCard label="COMMUNITY GROWTH PLATFORM">
                <CommunityDash />
              </ArtifactCard>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ArtifactCard label="BUYER PERSONA MATRIX">
                <PersonaMatrix />
              </ArtifactCard>
              <ArtifactCard label="SEO LOCALIZATION PROGRAM">
                <LocalizationMap />
              </ArtifactCard>
            </div>
          </CaseStudy>

          <div className="h-px w-full my-12" style={{ background: COLORS.border }} />

          {/* Case 2: DevSec Platform */}
          <CaseStudy {...caseStudies[1]}>
            <ArtifactCard label="COMPETITIVE COMPARISON PAGE FRAMEWORK">
              <CompetitivePage />
            </ArtifactCard>
            <ArtifactCard label="POV (PROOF OF VALUE) DEAL FRAMEWORK">
              <POVDealFramework />
            </ArtifactCard>
          </CaseStudy>

          <div className="h-px w-full my-12" style={{ background: COLORS.border }} />

          {/* Case 3: Content Governance */}
          <CaseStudy {...caseStudies[2]}>
            <ArtifactCard label="PRODUCT-LED EXPERIENCE FLOW">
              <PLEFlow />
            </ArtifactCard>
            <ArtifactCard label="CATEGORY REFRAMING STRATEGY">
              <CategoryReframing />
            </ArtifactCard>
          </CaseStudy>

          {/* ── Approach ── */}
          <div className="h-px w-full my-12" style={{ background: COLORS.border }} />
          <div className="mb-12">
            <div className="text-[--textDim] text-[11px] tracking-[0.15em] font-bold mb-1.5"
                 style={{ ["--textDim" as any]: COLORS.textDim }}>THE APPROACH</div>
            <h2 className="text-[--text] text-[28px] font-extrabold mb-6"
                style={{ ["--text" as any]: COLORS.text }}>
              How I work with founders & GTM teams
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { n: "01", title: "Diagnose", desc: "We audit your GTM motion to find where pipeline is leaking, identify messaging gaps, and pinpoint why systems aren't talking to each other." },
                { n: "02", title: "Architect", desc: "We build the strategy, systems, and frameworks. This includes messaging architecture, persona research, funnel design, and tech stack rationalization." },
                { n: "03", title: "Accelerate", desc: "We execute and iterate on the strategy. Whether it's campaigns, enablement programs, or pricing, we focus on driving the next growth lever." },
              ].map((s, i) => (
                <div
                  key={i}
                  className="bg-[--bgCard] border rounded-2xl p-6 border-t-[3px]"
                  style={{
                    borderColor: COLORS.border,
                    borderTopColor: COLORS.accent,
                    ["--bgCard" as any]: COLORS.bgCard,
                  }}
                >
                  <div className="text-[--accent] text-[32px] font-extrabold mb-3 opacity-40"
                       style={{ ["--accent" as any]: COLORS.accent }}>{s.n}</div>
                  <div className="text-[--text] text-[18px] font-bold mb-2.5"
                       style={{ ["--text" as any]: COLORS.text }}>{s.title}</div>
                  <div className="text-[--textMuted] text-[13px] leading-relaxed"
                       style={{ ["--textMuted" as any]: COLORS.textMuted }}>{s.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer CTA */}
          <div className="text-center py-12 px-10 rounded-[20px] border"
               style={{
                 background: `linear-gradient(135deg, ${COLORS.bgCard}, ${COLORS.accentGlow})`,
                 borderColor: COLORS.border,
               }}>
            <div className="text-[--text] text-2xl font-bold mb-3"
                 style={{ ["--text" as any]: COLORS.text }}>
              Let's talk about your GTM challenge.
            </div>
            <div className="text-[--textMuted] text-[14px] mb-6"
                 style={{ ["--textMuted" as any]: COLORS.textMuted }}>
              I work with 2-3 companies at a time. Currently accepting new engagements.
            </div>
            <a href="/#contact" className="inline-flex items-center gap-2 bg-accent text-[#0B1221] px-8 py-3.5 rounded-full font-bold text-sm tracking-wide hover:brightness-110 hover:shadow-[0_0_30px_rgba(46,204,113,0.3)] transition-all duration-300 active:scale-95">
              Get in Touch →
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
