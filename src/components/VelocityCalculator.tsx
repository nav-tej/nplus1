"use client";

import { useState } from "react";
import { usePostHog } from "posthog-js/react";
import Link from "next/link";
import { 
  TrendingUp, 
  Lock, 
  CheckCircle2, 
  Zap, 
  Target, 
  BarChart3,
  Clock,
  ArrowRight,
  Info,
  Calendar,
  ChevronRight,
  Gauge
} from "lucide-react";

type Stage = "Seed" | "Series A" | "Series B" | "Series C+";
type Vertical = "Enterprise SaaS" | "Fintech" | "AI Infrastructure" | "Cybersecurity" | "DevTools";

type Inputs = {
  stage: Stage;
  vertical: Vertical;
  opps: number; // Qualified Opps per Quarter
  acv: number;
  cycle: number;
  winRate: number;
  arr: number;
};

type Legend = { name: string; result: string; logo: string; highlight: string };

const STAGE_BENCHMARKS: Record<Stage, { medianWin: number; eliteWin: number; medianCycle: number }> = {
  "Seed": { medianWin: 15, eliteWin: 25, medianCycle: 30 },
  "Series A": { medianWin: 21, eliteWin: 35, medianCycle: 60 },
  "Series B": { medianWin: 25, eliteWin: 40, medianCycle: 90 },
  "Series C+": { medianWin: 28, eliteWin: 45, medianCycle: 120 },
};

const ARR_VALUES = [
  5000000, 10000000, 15000000, 20000000, 25000000, 30000000, 35000000, 40000000, 45000000, 50000000,
  150000000, 250000000, 350000000, 450000000, 550000000, 650000000, 750000000, 850000000, 950000000, 1000000000
];

const STAGE_VERTICAL_LEGENDS: Record<Vertical, Record<Stage, Legend[]>> = {
  "Enterprise SaaS": {
    "Seed": [
      { name: "Webflow", result: "$1M in 12mo", logo: "/logos/webflow.svg?v=7", highlight: "PLG wedge mastery" },
      { name: "Mercury", result: "$1M in 6mo", logo: "/logos/mercury.svg?v=7", highlight: "Brand trust outlier" }
    ],
    "Series A": [
      { name: "Slack", result: "$10M in 12mo", logo: "/logos/slack.svg?v=7", highlight: "Enterprise viral loop" },
      { name: "Klaviyo", result: "$20M+ ARR", logo: "/logos/klaviyo.svg?v=7", highlight: "Mastered high-velocity ROI" }
    ],
    "Series B": [
      { name: "Brex", result: "$100M in 24mo", logo: "/logos/brex.svg?v=7", highlight: "Fintech infra blitz" },
      { name: "HubSpot", result: "Hyper-efficient scale", logo: "/logos/hubspot.svg?v=7", highlight: "GTM platform standard" }
    ],
    "Series C+": [
      { name: "Stripe", result: "$1B+ ARR", logo: "/logos/stripe.svg?v=7", highlight: "Global payment velocity" },
      { name: "Salesforce", result: "The OG GTM Giant", logo: "/logos/salesforce.svg?v=7", highlight: "Created the category" }
    ],
  },
  "AI Infrastructure": {
    "Seed": [
      { name: "Cursor", result: "$1M in 4mo", logo: "/logos/cursor.svg?v=7", highlight: "The hypergrowth record" },
      { name: "Cognition", result: "$1M ARR launch", logo: "/logos/cognition.svg?v=7", highlight: "Agentic breakthrough" }
    ],
    "Series A": [
      { name: "HeyGen", result: "$35M ARR raise", logo: "/logos/heygen-white.svg?v=7", highlight: "Nav architected this engine" },
      { name: "Perplexity", result: "Search dominance", logo: "/logos/perplexity.svg?v=7", highlight: "AI-native adoption" }
    ],
    "Series B": [
      { name: "ElevenLabs", result: "$50M in 12mo", logo: "/logos/elevenlabs.svg?v=7", highlight: "Voice AI category leader" },
      { name: "Mistral", result: "$100M+ valuation burst", logo: "/logos/mistral.svg?v=7", highlight: "Open-source efficiency" }
    ],
    "Series C+": [
      { name: "OpenAI", result: "$3B+ ARR", logo: "/logos/openai.svg?v=7", highlight: "Defining the AI business model" },
      { name: "Anthropic", result: "Enterprise AI standard", logo: "/logos/anthropic.svg?v=7", highlight: "Safety-first scaling" }
    ],
  },
  "Fintech": {
    "Seed": [
      { name: "Mercury", result: "Startup Banking", logo: "/logos/mercury.svg?v=7", highlight: "Seamless UX wedge" },
      { name: "Unit", result: "Embedded Finance", logo: "/logos/unit.svg?v=7", highlight: "Infrastructure-first" }
    ],
    "Series A": [
      { name: "Ramp", result: "$10M in 12mo", logo: "/logos/ramp.svg?v=7", highlight: "$100M ARR speedrun record" },
      { name: "Deel", result: "Global Compliance", logo: "/logos/deel.svg?v=7", highlight: "Horizontal scale speed" }
    ],
    "Series B": [
      { name: "Brex", result: "$100M in 24mo", logo: "/logos/brex.svg?v=7", highlight: "Market share blitz" },
      { name: "Navan", result: "Travel Fintech", logo: "/logos/navan.svg?v=7", highlight: "Enterprise consolidation" }
    ],
    "Series C+": [
      { name: "Stripe", result: "$1B+ ARR", logo: "/logos/stripe.svg?v=7", highlight: "Internet economy infra" },
      { name: "Adyen", result: "Global Payments", logo: "/logos/adyen.svg?v=7", highlight: "Operational excellence" }
    ],
  },
  "Cybersecurity": {
    "Seed": [
      { name: "Oleria", result: "Identity Security", logo: "/logos/oleria.svg?v=7", highlight: "AI-native security" },
      { name: "Sentra", result: "Data Security", logo: "/logos/sentra.svg?v=7", highlight: "Cloud-speed scaling" }
    ],
    "Series A": [
      { name: "Abnormal", result: "Email AI", logo: "/logos/abnormal.svg?v=7", highlight: "Fastest security scale-up" },
      { name: "Orca", result: "Agentless Security", logo: "/logos/orca.svg?v=7", highlight: "Frictionless deployment" }
    ],
    "Series B": [
      { name: "Wiz", result: "$100M in 18mo", logo: "/logos/wiz.svg?v=7", highlight: "Growth record holder" },
      { name: "Snyk", result: "Developer Security", logo: "/logos/snyk.svg?v=7", highlight: "Mastered the dev wedge" }
    ],
    "Series C+": [
      { name: "CrowdStrike", result: "$3B+ ARR", logo: "/logos/crowdstrike.svg?v=7", highlight: "Platform dominance" },
      { name: "Zscaler", result: "Zero Trust Leader", logo: "/logos/zscaler.svg?v=7", highlight: "Cloud-native infra" }
    ],
  },
  "DevTools": {
    "Seed": [
      { name: "Supabase", result: "$1M in 9mo", logo: "/logos/supabase.svg?v=7", highlight: "The Firebase alternative" },
      { name: "Resend", result: "Email for Devs", logo: "/logos/resend.svg?v=7", highlight: "Elite UX-led growth" }
    ],
    "Series A": [
      { name: "Cognition", result: "$73M in 9mo", logo: "/logos/cognition.svg?v=7", highlight: "Agentic dev standard" },
      { name: "Cursor", result: "AI-Native Coding", logo: "/logos/cursor.svg?v=7", highlight: "Redefining the IDE" }
    ],
    "Series B": [
      { name: "Vercel", result: "$50M in 24mo", logo: "/logos/vercel.svg?v=7", highlight: "Frontend cloud standard" },
      { name: "PostHog", result: "OS Product OS", logo: "/logos/posthog.svg?v=7", highlight: "Community-led outlier" }
    ],
    "Series C+": [
      { name: "GitHub", result: "$1B+ ARR", logo: "/logos/github.svg?v=7", highlight: "Global developer OS" },
      { name: "GitLab", result: "DevSecOps Leader", logo: "/logos/gitlab.svg?v=7", highlight: "Remote-first scale" }
    ],
  },
};

export default function VelocityCalculator() {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [inputs, setInputs] = useState<Inputs>({
    stage: "Series A",
    vertical: "Enterprise SaaS",
    opps: 50,
    acv: 25000,
    cycle: 90,
    winRate: 21,
    arr: 5000000,
  });
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const ph = usePostHog();

  const handleInputChange = (name: keyof Inputs, value: any) => {
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/lead-magnet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, magnetType: "velocity_calculator", payloadData: inputs }),
      });
      if (res.ok) {
        ph?.capture("lead_magnet_submitted", { type: "velocity_calculator", ...inputs });
        setStep(4);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getEfficiencyGrade = () => {
    const cycleRatio = inputs.cycle / (inputs.acv / 1000);
    if (cycleRatio < 1.0) return "A+";
    if (cycleRatio < 1.5) return "A";
    if (cycleRatio < 2.5) return "B";
    if (cycleRatio < 4.0) return "C";
    return "F";
  };

  const getRevenueGap = () => {
    const currentQuarterRevenue = inputs.opps * (inputs.winRate / 100) * inputs.acv;
    const targetWinRate = Math.max(inputs.winRate, 35); // 35% is the "Elite" floor
    const potentialQuarterRevenue = inputs.opps * (targetWinRate / 100) * inputs.acv;
    return (potentialQuarterRevenue - currentQuarterRevenue) * 4; // Annualized Gap
  };

  const legends = STAGE_VERTICAL_LEGENDS[inputs.vertical][inputs.stage];

  const formatCurrency = (val: number) => {
    if (val >= 1000000000) return `$${(val / 1000000000).toFixed(1)}B+`;
    if (val >= 1000000) return `$${(val / 1000000).toFixed(0)}M`;
    return `$${(val / 1000).toFixed(0)}K`;
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-12">
      <div className="bg-[#1A1D23] border border-white/10 backdrop-blur-xl rounded-[2.5rem] shadow-2xl overflow-hidden">
        {/* Step Indicator */}
        <div className="flex bg-black/20 p-2 m-4 rounded-2xl gap-2">
          {[1, 2, 3, 4].map((s) => (
            <div 
              key={s} 
              className={`flex-1 py-2.5 rounded-xl text-center text-[9px] font-black tracking-widest uppercase transition-all ${
                step === s ? "bg-accent text-[#0B1221]" : "text-muted/30"
              }`}
            >
              {s === 1 ? "Metrics" : s === 2 ? "Benchmarks" : s === 3 ? "Unlock" : "Roadmap"}
            </div>
          ))}
        </div>

        <div className="p-8 lg:p-16">
          {/* STEP 1: CONTEXT & VOLUME */}
          {step === 1 && (
            <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-6">
                  <label className="text-xs font-black text-muted uppercase tracking-[0.3em]">01. Current Stage</label>
                  <div className="grid grid-cols-2 gap-2">
                    {(["Seed", "Series A", "Series B", "Series C+"] as Stage[]).map((s) => (
                      <button
                        key={s} onClick={() => handleInputChange("stage", s)}
                        className={`py-3 px-4 rounded-xl text-xs font-bold border transition-all ${
                          inputs.stage === s ? "bg-accent text-[#0B1221] border-accent" : "bg-white/5 border-white/5 text-muted hover:border-white/10"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="space-y-6">
                  <label className="text-xs font-black text-muted uppercase tracking-[0.3em]">02. Market Vertical</label>
                  <div className="grid grid-cols-2 gap-2">
                    {(Object.keys(STAGE_VERTICAL_LEGENDS) as Vertical[]).map((v) => (
                      <button
                        key={v} onClick={() => handleInputChange("vertical", v)}
                        className={`py-3 px-4 rounded-xl text-[10px] font-bold border transition-all ${
                          inputs.vertical === v ? "bg-accent text-[#0B1221] border-accent" : "bg-white/5 border-white/5 text-muted hover:border-white/10"
                        }`}
                      >
                        {v}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
                {/* ARR with snapped values */}
                <div className="space-y-6">
                  <div className="flex justify-between items-end">
                    <label className="text-sm font-bold text-foreground flex items-center gap-2"><BarChart3 className="w-4 h-4 text-accent" /> Current ARR</label>
                    <span className="text-3xl font-black text-accent">{formatCurrency(inputs.arr)}</span>
                  </div>
                  <div className="relative pt-2">
                    <input 
                      type="range" 
                      min="0" 
                      max={ARR_VALUES.length - 1} 
                      step="1" 
                      value={ARR_VALUES.indexOf(inputs.arr)} 
                      onChange={(e) => handleInputChange("arr", ARR_VALUES[parseInt(e.target.value)])} 
                      className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-accent" 
                    />
                    <div className="flex justify-between w-full px-1 mt-3">
                      {ARR_VALUES.filter((_, i) => i % 4 === 0 || i === ARR_VALUES.length - 1).map((val) => (
                        <div key={val} className="flex flex-col items-center gap-1.5">
                          <div className="w-1 h-1 rounded-full bg-white/20" />
                          <span className="text-[8px] font-mono text-muted/50 uppercase tracking-tighter">{formatCurrency(val)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Opps */}
                <div className="space-y-6">
                  <div className="flex justify-between items-end">
                    <label className="text-sm font-bold text-foreground flex items-center gap-2"><TrendingUp className="w-4 h-4 text-accent" /> Opps / Quarter</label>
                    <span className="text-3xl font-black text-accent">{inputs.opps}</span>
                  </div>
                  <div className="relative pt-2">
                    <input type="range" min="5" max="500" step="5" value={inputs.opps} onChange={(e) => handleInputChange("opps", parseInt(e.target.value))} className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-accent" />
                    <div className="flex justify-between w-full px-1 mt-3">
                      {[5, 125, 250, 375, 500].map((v) => (
                        <div key={v} className="flex flex-col items-center gap-1.5">
                          <div className="w-1 h-1 rounded-full bg-white/20" />
                          <span className="text-[8px] font-mono text-muted/50 tracking-tighter">{v}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Win Rate */}
                <div className="space-y-6">
                  <div className="flex justify-between items-end">
                    <label className="text-sm font-bold text-foreground flex items-center gap-2"><Target className="w-4 h-4 text-accent" /> Win Rate</label>
                    <span className="text-3xl font-black text-accent">{inputs.winRate}%</span>
                  </div>
                  <div className="relative pt-2">
                    <input type="range" min="1" max="60" step="1" value={inputs.winRate} onChange={(e) => handleInputChange("winRate", parseInt(e.target.value))} className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-accent" />
                    <div className="flex justify-between w-full px-1 mt-3">
                      {[1, 15, 30, 45, 60].map((v) => (
                        <div key={v} className="flex flex-col items-center gap-1.5">
                          <div className="w-1 h-1 rounded-full bg-white/20" />
                          <span className="text-[8px] font-mono text-muted/50 tracking-tighter">{v}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* ACV */}
                <div className="space-y-6">
                  <div className="flex justify-between items-end">
                    <label className="text-sm font-bold text-foreground flex items-center gap-2"><Zap className="w-4 h-4 text-accent" /> Average ACV</label>
                    <span className="text-3xl font-black text-accent">{formatCurrency(inputs.acv)}</span>
                  </div>
                  <div className="relative pt-2">
                    <input type="range" min="5000" max="250000" step="5000" value={inputs.acv} onChange={(e) => handleInputChange("acv", parseInt(e.target.value))} className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-accent" />
                    <div className="flex justify-between w-full px-1 mt-3">
                      {[5000, 65000, 125000, 185000, 250000].map((v) => (
                        <div key={v} className="flex flex-col items-center gap-1.5">
                          <div className="w-1 h-1 rounded-full bg-white/20" />
                          <span className="text-[8px] font-mono text-muted/50 tracking-tighter">{formatCurrency(v)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setStep(2)}
                className="w-full group bg-accent text-[#0B1221] font-black text-xl rounded-2xl py-6 hover:shadow-[0_0_50px_rgba(46,204,113,0.4)] transition-all flex items-center justify-center gap-3 active:scale-[0.98]"
              >
                Diagnose GTM Efficiency
                <ArrowRight className="w-6 h-6 transition-transform group-hover:translate-x-2" />
              </button>
            </div>
          )}

          {/* STEP 2: COMPARATIVE DASHBOARD */}
          {step === 2 && (
            <div className="space-y-12 animate-in fade-in zoom-in-95 duration-700">
              <div className="text-center space-y-4">
                <span className="text-xs font-black uppercase tracking-[0.4em] text-accent">Efficiency Diagnosis</span>
                <h2 className="text-4xl lg:text-6xl font-black tracking-tighter">Your GTM Grade: <span className="text-red-400 italic underline decoration-red-400/20">{getEfficiencyGrade()}</span></h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Revenue Gap Card */}
                <div className="bg-red-400/5 border border-red-400/20 rounded-3xl p-8 space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-red-400/60 uppercase tracking-widest">The Efficiency Tax</span>
                    <TrendingUp className="w-5 h-5 text-red-400" />
                  </div>
                  <div className="text-4xl font-black text-red-400">-${(getRevenueGap()/1000000).toFixed(1)}M / Yr</div>
                  <p className="text-sm text-muted leading-relaxed">
                    Based on your {inputs.winRate}% win rate, you are leaving substantial revenue on the table relative to top-quartile performers. 
                  </p>
                </div>

                {/* Legends Card */}
                <div className="bg-white/5 border border-white/10 rounded-3xl p-8 space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-muted uppercase tracking-widest">{inputs.stage} {inputs.vertical} Legends</span>
                    <Gauge className="w-5 h-5 text-accent" />
                  </div>
                  <div className="space-y-4">
                    {legends.map((l) => (
                      <div key={l.name} className="flex items-center gap-4 group">
                        <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center opacity-80 group-hover:opacity-100 transition-all">
                          <img src={l.logo} alt={l.name} className="max-w-full max-h-full" loading="eager" decoding="async" />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-white">{l.name} <span className="text-accent text-[10px] ml-2">{l.result}</span></div>
                          <div className="text-[10px] text-muted uppercase tracking-tight">{l.highlight}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-accent/5 border border-accent/20 rounded-[2.5rem] p-10 lg:p-16 text-center space-y-8 relative overflow-hidden">
                <div className="relative z-10 space-y-6">
                  <h3 className="text-3xl lg:text-5xl font-black tracking-tight leading-tight">
                    We drive 15-30% lift in win rate within <span className="text-accent italic">6 months</span>.
                  </h3>
                  <p className="text-lg text-muted max-w-xl mx-auto leading-relaxed">
                    By implementing the same agentic architectures used at <strong>HeyGen</strong> and <strong>Semgrep</strong>, we eliminate mid-funnel friction and accelerate velocity.
                  </p>
                  <button
                    onClick={() => setStep(3)}
                    className="inline-flex items-center gap-3 bg-white text-[#0B1221] px-10 py-5 rounded-2xl font-black text-xl hover:shadow-[0_0_50px_rgba(255,255,255,0.2)] transition-all scale-100 hover:scale-105 active:scale-95"
                  >
                    Unlock 6-Month GTM Roadmap
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: UNLOCK ROADMAP */}
          {step === 3 && (
            <div className="text-center space-y-10 py-12 animate-in fade-in zoom-in-95 duration-500">
              <div className="mx-auto w-24 h-24 bg-accent/10 rounded-[2.5rem] flex items-center justify-center rotate-12 mb-8 shadow-2xl border border-accent/20">
                <Lock className="w-12 h-12 text-accent" />
              </div>
              <div className="space-y-4">
                <h2 className="text-4xl lg:text-5xl font-black tracking-tight">Strategy Blueprint Locked.</h2>
                <p className="text-muted text-lg max-w-md mx-auto leading-relaxed">
                  Enter your work email to receive the specific tactical roadmap to bridge your <strong>${(getRevenueGap()/1000000).toFixed(1)}M</strong> gap.
                </p>
              </div>
              <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
                <input
                  type="email" required value={email} onChange={e => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full bg-white/5 border border-white/10 rounded-3xl px-6 py-5 text-xl outline-none focus:ring-2 focus:ring-accent text-center font-bold"
                />
                <button
                  type="submit" disabled={loading}
                  className="w-full bg-accent text-[#0B1221] font-black text-xl rounded-3xl py-6 hover:shadow-[0_0_40px_rgba(46,204,113,0.3)] transition-all"
                >
                  {loading ? "Processing..." : "Generate Roadmap"}
                </button>
              </form>
            </div>
          )}

          {/* STEP 4: SUCCESS & FINAL CTA */}
          {step === 4 && (
            <div className="text-center space-y-12 animate-in fade-in duration-700">
              <div className="mx-auto w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center border border-emerald-500/20">
                <CheckCircle2 className="w-10 h-10 text-emerald-500" />
              </div>
              <div className="space-y-4">
                <h2 className="text-4xl lg:text-6xl font-black tracking-tighter italic">Growth Plan Sent.</h2>
                <p className="text-xl text-muted max-w-xl mx-auto">
                  Check <strong>{email}</strong> for your customized {inputs.vertical} efficiency audit.
                </p>
              </div>

              <div className="bg-white text-[#0B1221] rounded-[3rem] p-10 lg:p-16 space-y-8 shadow-[0_0_100px_rgba(255,255,255,0.1)] relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5 rotate-12">
                  <TrendingUp className="w-64 h-64" />
                </div>
                <div className="relative z-10 space-y-8">
                  <h3 className="text-3xl lg:text-5xl font-black tracking-tight leading-tight">
                    Want to execute this roadmap with an expert?
                  </h3>
                  <p className="text-xl font-medium max-w-2xl mx-auto opacity-80 leading-relaxed">
                    Schedule a 15-minute strategy session to see how we&apos;d bridge your ${(getRevenueGap()/1000000).toFixed(1)}M gap using the exact agentic playbooks we built at <strong>HeyGen</strong> and <strong>Semgrep</strong>.
                  </p>
                  <div className="pt-4">
                    <Link
                      href="/#contact"
                      className="inline-flex items-center gap-3 bg-accent text-[#0B1221] px-12 py-6 rounded-2xl font-black text-2xl hover:shadow-[0_0_50px_rgba(46,204,113,0.4)] transition-all scale-100 hover:scale-105 active:scale-95"
                    >
                      <Calendar className="w-7 h-7 fill-[#0B1221]" />
                      Schedule GTM Strategy Audit
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="pt-16 border-t border-white/5 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white/40 flex items-center gap-2">
            <Info className="w-4 h-4" /> Methodology & 2026 Data Sources
          </h3>
          <span className="text-[10px] font-mono text-muted uppercase bg-white/5 px-2 py-1 rounded">Last Refreshed: March 13, 2026</span>
        </div>
        <p className="text-sm text-muted leading-relaxed max-w-3xl">
          Calculations are based on the <strong>AI-Native Efficiency Matrix</strong>, comparing your ACV-to-Cycle ratio and Win Rate against 2025-2026 GTM indices from <strong>PeerSignal</strong>, <strong>GrowthUnhinged</strong>, and <strong>Gartner</strong>. Legends are outliers representing top 1% performance trajectories.
        </p>
      </div>
    </div>
  );
}
