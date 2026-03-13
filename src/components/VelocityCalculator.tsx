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
  Building2,
  ChevronRight
} from "lucide-react";

type Stage = "Seed" | "Series A" | "Series B" | "Series C+";
type Vertical = "Enterprise SaaS" | "Fintech" | "AI Infrastructure" | "Cybersecurity" | "DevTools";

type Inputs = {
  stage: Stage;
  vertical: Vertical;
  arr: number;
  acv: number;
  cycle: number;
  winRate: number;
};

const STAGE_BENCHMARKS: Record<Stage, { medianWin: number; eliteWin: number; medianCycle: number }> = {
  "Seed": { medianWin: 15, eliteWin: 25, medianCycle: 30 },
  "Series A": { medianWin: 21, eliteWin: 35, medianCycle: 60 },
  "Series B": { medianWin: 25, eliteWin: 40, medianCycle: 90 },
  "Series C+": { medianWin: 28, eliteWin: 45, medianCycle: 120 },
};

type Legend = { name: string; result: string; context: string; logo: string };

const STAGE_VERTICAL_LEGENDS: Record<Vertical, Record<Stage, Legend>> = {
  "Enterprise SaaS": {
    "Seed": { name: "Webflow", result: "$1M in 12mo", context: "Mastered the PLG self-serve wedge early.", logo: "/logos/webflow.svg" },
    "Series A": { name: "Slack", result: "$10M in 12mo", context: "The fastest enterprise adoption ever.", logo: "/logos/slack.svg" },
    "Series B": { name: "Klaviyo", result: "$50M in 24mo", context: "Dominated ecommerce with high-velocity ROI.", logo: "/logos/klaviyo.svg" },
    "Series C+": { name: "HubSpot", result: "$1B+ ARR", context: "Built the horizontal GTM platform standard.", logo: "/logos/hubspot.svg" },
  },
  "Fintech": {
    "Seed": { name: "Mercury", result: "$1M in 6mo", context: "High-trust banking for high-growth startups.", logo: "/logos/mercury.svg" },
    "Series A": { name: "Ramp", result: "$10M in 12mo", context: "The $100M ARR speedrun record.", logo: "/logos/ramp.svg" },
    "Series B": { name: "Brex", result: "$100M in 24mo", context: "Blitzscaled corporate credit infrastructure.", logo: "/logos/brex.svg" },
    "Series C+": { name: "Stripe", result: "$1B+ ARR", context: "The global standard for payment velocity.", logo: "/logos/stripe.svg" },
  },
  "AI Infrastructure": {
    "Seed": { name: "Cursor", result: "$1M in 4mo", context: "AI-native hypergrowth record.", logo: "/logos/cursor.svg" },
    "Series A": { name: "HeyGen", result: "$20M to $100M", context: "Nav architected this revenue engine.", logo: "/logos/heygen.svg" },
    "Series B": { name: "ElevenLabs", result: "$50M in 12mo", context: "Scaling voice AI at unprecedented speed.", logo: "/logos/elevenlabs.svg" },
    "Series C+": { name: "OpenAI", result: "$3B+ ARR", context: "Defining the new AI-native business model.", logo: "/logos/openai.svg" },
  },
  "Cybersecurity": {
    "Seed": { name: "Oleria", result: "$1M in 8mo", context: "Identity-first security for the AI era.", logo: "/logos/oleria.svg" },
    "Series A": { name: "Sentra", result: "$5M in 12mo", context: "Solving data security at cloud speed.", logo: "/logos/sentra.svg" },
    "Series B": { name: "Wiz", result: "$100M in 18mo", context: "The security growth record holder.", logo: "/logos/wiz.svg" },
    "Series C+": { name: "CrowdStrike", result: "$3B+ ARR", context: "Scaled to dominance through platform consolidation.", logo: "/logos/crowdstrike.svg" },
  },
  "DevTools": {
    "Seed": { name: "Supabase", result: "$1M in 9mo", context: "Building the open-source Firebase standard.", logo: "/logos/supabase.svg" },
    "Series A": { name: "Semgrep", result: "5x YoY Growth", context: "Nav architected this revenue engine.", logo: "/logos/semgrep.svg" },
    "Series B": { name: "Vercel", result: "$50M in 24mo", context: "The frontend cloud hypergrowth engine.", logo: "/logos/vercel.svg" },
    "Series C+": { name: "GitHub", result: "$1B+ ARR", context: "The global developer operating system.", logo: "/logos/github.svg" },
  },
};

export default function VelocityCalculator() {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [inputs, setInputs] = useState<Inputs>({
    stage: "Series A",
    vertical: "Enterprise SaaS",
    arr: 5000000,
    acv: 15000,
    cycle: 60,
    winRate: 21,
  });
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const ph = usePostHog();

  const handleStageChange = (stage: Stage) => {
    const benchmarks = STAGE_BENCHMARKS[stage];
    setInputs(prev => ({ 
      ...prev, 
      stage, 
      winRate: benchmarks.medianWin,
      cycle: benchmarks.medianCycle 
    }));
  };

  const handleVerticalChange = (vertical: Vertical) => {
    setInputs(prev => ({ ...prev, vertical }));
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

  const getPercentile = () => {
    const b = STAGE_BENCHMARKS[inputs.stage];
    if (inputs.winRate >= b.eliteWin) return 90;
    if (inputs.winRate >= b.medianWin) return 50;
    return 25;
  };

  const getRevenueGap = () => {
    const b = STAGE_BENCHMARKS[inputs.stage];
    const targetWinRate = b.eliteWin;
    const currentEfficiency = inputs.winRate / 100;
    const targetEfficiency = targetWinRate / 100;
    const potentialArr = (inputs.arr / currentEfficiency) * targetEfficiency;
    return potentialArr - inputs.arr;
  };

  const legend = STAGE_VERTICAL_LEGENDS[inputs.vertical][inputs.stage];

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
              {s === 1 ? "Metrics" : s === 2 ? "Context" : s === 3 ? "Unlock" : "Report"}
            </div>
          ))}
        </div>

        <div className="p-8 lg:p-16">
          {/* STEP 1: INPUTS */}
          {step === 1 && (
            <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-6">
                  <label className="text-xs font-black text-muted uppercase tracking-[0.3em]">01. Funding Stage</label>
                  <div className="grid grid-cols-2 gap-2">
                    {(["Seed", "Series A", "Series B", "Series C+"] as Stage[]).map((s) => (
                      <button
                        key={s} onClick={() => handleStageChange(s)}
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
                        key={v} onClick={() => handleVerticalChange(v)}
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
                <div className="space-y-6">
                  <div className="flex justify-between items-end">
                    <label className="text-sm font-bold text-foreground flex items-center gap-2"><BarChart3 className="w-4 h-4 text-accent" /> ARR</label>
                    <span className="text-3xl font-black text-accent">{inputs.arr >= 1000000000 ? `$${(inputs.arr/1000000000).toFixed(1)}B+` : `$${(inputs.arr/1000000).toFixed(0)}M`}</span>
                  </div>
                  <input type="range" min="1000000" max="1000000000" step="1000000" value={inputs.arr} onChange={(e) => setInputs(p => ({ ...p, arr: parseInt(e.target.value) }))} className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-accent" />
                </div>
                <div className="space-y-6">
                  <div className="flex justify-between items-end">
                    <label className="text-sm font-bold text-foreground flex items-center gap-2"><Target className="w-4 h-4 text-accent" /> Win Rate</label>
                    <span className="text-3xl font-black text-accent">{inputs.winRate}%</span>
                  </div>
                  <input type="range" min="1" max="60" step="1" value={inputs.winRate} onChange={(e) => setInputs(p => ({ ...p, winRate: parseInt(e.target.value) }))} className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-accent" />
                </div>
              </div>

              <button
                onClick={() => setStep(2)}
                className="w-full group bg-accent text-[#0B1221] font-black text-xl rounded-2xl py-6 hover:shadow-[0_0_50px_rgba(46,204,113,0.4)] transition-all flex items-center justify-center gap-3"
              >
                Benchmark against {inputs.stage} {inputs.vertical} Legends
                <ArrowRight className="w-6 h-6 transition-transform group-hover:translate-x-2" />
              </button>
            </div>
          )}

          {/* STEP 2: CONTEXTUAL COMPARISON */}
          {step === 2 && (
            <div className="space-y-12 animate-in fade-in zoom-in-95 duration-700">
              <div className="text-center space-y-4">
                <span className="text-xs font-black uppercase tracking-[0.4em] text-accent">{inputs.stage} {inputs.vertical} Analysis</span>
                <h2 className="text-4xl lg:text-6xl font-black tracking-tighter">You are in the <span className="text-red-400 italic">{getPercentile()}th</span> Percentile</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/5 border border-white/10 rounded-3xl p-8 space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-muted uppercase tracking-widest">{inputs.stage} Legend</span>
                    <div className="h-8 w-auto flex items-center grayscale opacity-80 brightness-200">
                      <img src={legend.logo} alt={legend.name} className="h-full w-auto object-contain" />
                    </div>
                  </div>
                  <div>
                    <div className="text-emerald-400 font-black text-2xl mb-1">{legend.name}</div>
                    <div className="text-xl font-bold text-white">{legend.result}</div>
                  </div>
                  <p className="text-sm text-muted leading-relaxed">{legend.context}</p>
                </div>
                <div className="bg-red-400/5 border border-red-400/20 rounded-3xl p-8 space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-red-400/60 uppercase tracking-widest">Annual Revenue Gap</span>
                    <TrendingUp className="w-5 h-5 text-red-400" />
                  </div>
                  <div className="text-4xl font-black text-red-400">-${(getRevenueGap()/1000000).toFixed(1)}M</div>
                  <p className="text-sm text-muted leading-relaxed">This is the unrealized ARR based on top-quartile efficiency targets for {inputs.stage} {inputs.vertical} companies.</p>
                </div>
              </div>

              <div className="bg-accent/5 border border-accent/20 rounded-3xl p-8 lg:p-12 text-center space-y-6">
                <h3 className="text-2xl font-bold italic italic underline decoration-accent/30">The 6-Month GTM Opportunity</h3>
                <p className="text-lg text-muted max-w-2xl mx-auto leading-relaxed">
                  Based on our architecture at <strong>{legend.name}</strong>, <strong>HeyGen</strong>, and <strong>Semgrep</strong>, we typically drive a <span className="text-accent font-bold">15-30% lift</span> in win rate by implementing agentic workflows within 2 quarters.
                </p>
                <button
                  onClick={() => setStep(3)}
                  className="inline-flex items-center gap-3 bg-white text-[#0B1221] px-10 py-5 rounded-2xl font-black text-lg hover:shadow-[0_0_40px_rgba(255,255,255,0.2)] transition-all"
                >
                  Unlock 6-Month Growth Roadmap
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: UNLOCK */}
          {step === 3 && (
            <div className="text-center space-y-10 py-12 animate-in fade-in zoom-in-95 duration-500">
              <div className="mx-auto w-24 h-24 bg-accent/10 rounded-[2.5rem] flex items-center justify-center rotate-12 mb-8 shadow-2xl border border-accent/20">
                <Lock className="w-12 h-12 text-accent" />
              </div>
              <div className="space-y-4">
                <h2 className="text-4xl lg:text-5xl font-black tracking-tight">Finalizing Your Plan.</h2>
                <p className="text-muted text-lg max-w-md mx-auto leading-relaxed">
                  Enter your work email to receive the specific tactical roadmap to bridge your <strong>${(getRevenueGap()/1000000).toFixed(1)}M</strong> gap in 6 months.
                </p>
              </div>
              <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
                <input
                  type="email" required value={email} onChange={e => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-xl outline-none focus:ring-2 focus:ring-accent text-center font-bold"
                />
                <button
                  type="submit" disabled={loading}
                  className="w-full bg-accent text-[#0B1221] font-black text-xl rounded-2xl py-6 hover:shadow-[0_0_40px_rgba(46,204,113,0.3)] transition-all"
                >
                  {loading ? "Generating Roadmap..." : "Unlock Full Growth Plan"}
                </button>
              </form>
            </div>
          )}

          {/* STEP 4: SUCCESS & CONSULTATION */}
          {step === 4 && (
            <div className="text-center space-y-12 animate-in fade-in duration-700">
              <div className="mx-auto w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center border border-emerald-500/20">
                <CheckCircle2 className="w-10 h-10 text-emerald-500" />
              </div>
              <div className="space-y-4">
                <h2 className="text-4xl lg:text-6xl font-black tracking-tighter italic">Roadmap Dispatched.</h2>
                <p className="text-xl text-muted max-w-xl mx-auto">
                  We&apos;ve sent the 6-month {inputs.vertical} optimization plan to <strong>{email}</strong>.
                </p>
              </div>

              <div className="bg-white text-[#0B1221] rounded-[3rem] p-10 lg:p-16 space-y-8 shadow-[0_0_100px_rgba(255,255,255,0.1)] relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5 rotate-12">
                  <TrendingUp className="w-64 h-64" />
                </div>
                <div className="relative z-10 space-y-8">
                  <h3 className="text-3xl lg:text-5xl font-black tracking-tight leading-tight">
                    Want to see how we&apos;d bridge your ${(getRevenueGap()/1000000).toFixed(1)}M gap together?
                  </h3>
                  <p className="text-lg font-medium max-w-2xl mx-auto opacity-80 leading-relaxed">
                    Schedule a 15-minute strategy audit. We&apos;ll walk through your specific bottlenecks and share the exact agentic workflows we used at <strong>{legend.name}</strong> and <strong>HeyGen</strong>.
                  </p>
                  <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-6">
                    <Link
                      href="/#contact"
                      className="inline-flex items-center gap-3 bg-accent text-[#0B1221] px-12 py-6 rounded-2xl font-black text-2xl hover:shadow-[0_0_50px_rgba(46,204,113,0.4)] transition-all scale-100 hover:scale-105 active:scale-95"
                    >
                      <Calendar className="w-7 h-7 fill-[#0B1221]" />
                      Schedule Strategy Audit
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
          <span className="text-[10px] font-mono text-muted uppercase bg-white/5 px-2 py-1 rounded">Refreshed: March 13, 2026</span>
        </div>
        <p className="text-sm text-muted leading-relaxed max-w-3xl">
          Calculations use a stage-specific benchmarking matrix derived from 2025-2026 GTM indices from <strong>PeerSignal</strong>, <strong>GrowthUnhinged</strong>, and <strong>Gartner</strong>. Comparative "Legends" represent historical outlier performance in their respective verticals (e.g., Cursor&apos;s 2025 growth trajectory).
        </p>
      </div>
    </div>
  );
}
