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
  Calendar
} from "lucide-react";

type Stage = "Seed" | "Series A" | "Series B" | "Series C+";

type Inputs = {
  stage: Stage;
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

const LEGENDS = [
  { name: "Cursor", win: 45, cycle: 14, metric: "AI-Native Hypergrowth" },
  { name: "Wiz", win: 42, cycle: 45, metric: "Enterprise Blitz" },
  { name: "Ramp", win: 38, cycle: 30, metric: "Fintech Velocity" },
  { name: "HeyGen", win: 35, cycle: 28, metric: "AI-Video Scale" },
];

export default function VelocityCalculator() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [inputs, setInputs] = useState<Inputs>({
    stage: "Series A",
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
        setStep(3);
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
    
    // Potential ARR = (Current ARR / Current Eff) * Target Eff
    const potentialArr = (inputs.arr / currentEfficiency) * targetEfficiency;
    return potentialArr - inputs.arr;
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-12">
      <div className="bg-[#1A1D23] border border-white/10 backdrop-blur-xl rounded-[2.5rem] shadow-2xl overflow-hidden transition-all duration-500">
        {/* Visual Progress bar */}
        <div className="h-1 w-full bg-white/5 relative">
          <div 
            className="absolute top-0 left-0 h-full bg-accent transition-all duration-700 ease-in-out" 
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>

        <div className="p-8 lg:p-16">
          {step === 1 && (
            <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="space-y-4">
                <h3 className="text-xs font-black text-muted uppercase tracking-[0.3em]">01. Select Your Current Stage</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {(["Seed", "Series A", "Series B", "Series C+"] as Stage[]).map((s) => (
                    <button
                      key={s}
                      onClick={() => handleStageChange(s)}
                      className={`py-4 px-4 rounded-2xl text-sm font-black border transition-all ${
                        inputs.stage === s 
                          ? "bg-accent text-[#0B1221] border-accent shadow-[0_0_30px_rgba(46,204,113,0.3)]" 
                          : "bg-white/5 border-white/5 text-muted hover:border-white/20"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
                <div className="space-y-6">
                  <div className="flex justify-between items-end">
                    <label className="text-sm font-bold text-foreground flex items-center gap-2">
                      <BarChart3 className="w-4 h-4 text-accent" /> Current ARR
                    </label>
                    <span className="text-3xl font-black text-accent">
                      {inputs.arr >= 1000000000 ? `$${(inputs.arr/1000000000).toFixed(1)}B+` : `$${(inputs.arr/1000000).toFixed(0)}M`}
                    </span>
                  </div>
                  <input
                    type="range" min="1000000" max="1000000000" step="1000000"
                    value={inputs.arr}
                    onChange={(e) => setInputs(prev => ({ ...prev, arr: parseInt(e.target.value) }))}
                    className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-accent"
                  />
                </div>

                <div className="space-y-6">
                  <div className="flex justify-between items-end">
                    <label className="text-sm font-bold text-foreground flex items-center gap-2">
                      <Target className="w-4 h-4 text-accent" /> Win Rate (%)
                    </label>
                    <span className="text-3xl font-black text-accent">{inputs.winRate}%</span>
                  </div>
                  <input
                    type="range" min="1" max="60" step="1"
                    value={inputs.winRate}
                    onChange={(e) => setInputs(prev => ({ ...prev, winRate: parseInt(e.target.value) }))}
                    className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-accent"
                  />
                  <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-muted/50">
                    <span>Median: {STAGE_BENCHMARKS[inputs.stage].medianWin}%</span>
                    <span className="text-emerald-400/60 text-right">Elite: {STAGE_BENCHMARKS[inputs.stage].eliteWin}%+</span>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex justify-between items-end">
                    <label className="text-sm font-bold text-foreground flex items-center gap-2">
                      <Zap className="w-4 h-4 text-accent" /> Average ACV
                    </label>
                    <span className="text-3xl font-black text-accent">${(inputs.acv/1000).toFixed(0)}K</span>
                  </div>
                  <input
                    type="range" min="1000" max="500000" step="1000"
                    value={inputs.acv}
                    onChange={(e) => setInputs(prev => ({ ...prev, acv: parseInt(e.target.value) }))}
                    className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-accent"
                  />
                </div>

                <div className="space-y-6">
                  <div className="flex justify-between items-end">
                    <label className="text-sm font-bold text-foreground flex items-center gap-2">
                      <Clock className="w-4 h-4 text-accent" /> Sales Cycle
                    </label>
                    <span className="text-3xl font-black text-accent">{inputs.cycle}d</span>
                  </div>
                  <input
                    type="range" min="7" max="365" step="1"
                    value={inputs.cycle}
                    onChange={(e) => setInputs(prev => ({ ...prev, cycle: parseInt(e.target.value) }))}
                    className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-accent"
                  />
                </div>
              </div>

              <button
                onClick={() => setStep(2)}
                className="w-full group bg-accent text-[#0B1221] font-black text-xl rounded-2xl py-6 hover:shadow-[0_0_50px_rgba(46,204,113,0.4)] transition-all flex items-center justify-center gap-3 active:scale-[0.98]"
              >
                Benchmark My GTM
                <ArrowRight className="w-6 h-6 transition-transform group-hover:translate-x-2" />
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="text-center space-y-10 py-12 animate-in fade-in zoom-in-95 duration-500">
              <div className="mx-auto w-24 h-24 bg-accent/10 rounded-[2.5rem] flex items-center justify-center rotate-12 mb-8 shadow-2xl border border-accent/20">
                <Lock className="w-12 h-12 text-accent" />
              </div>
              <div className="space-y-4">
                <h2 className="text-4xl lg:text-5xl font-black tracking-tight">Echelon Report Ready.</h2>
                <p className="text-muted text-lg max-w-md mx-auto leading-relaxed">
                  We have mapped your performance against the <strong>AI-Native benchmark matrix</strong>. Enter your work email to see where you stack up.
                </p>
              </div>
              <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
                <input
                  type="email" required value={email} onChange={e => setEmail(e.target.value)}
                  placeholder="Work email"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-xl outline-none focus:ring-2 focus:ring-accent text-center font-bold"
                />
                <button
                  type="submit" disabled={loading}
                  className="w-full bg-accent text-[#0B1221] font-black text-xl rounded-2xl py-6 hover:shadow-[0_0_40px_rgba(46,204,113,0.3)] transition-all"
                >
                  {loading ? "Calculating..." : "Reveal My Growth Percentile"}
                </button>
              </form>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-16 animate-in fade-in duration-700">
              <div className="text-center space-y-4">
                <span className="text-xs font-black uppercase tracking-[0.4em] text-accent">Diagnosis Complete</span>
                <h2 className="text-5xl lg:text-7xl font-black tracking-tighter">
                  {getPercentile()}th <span className="text-muted italic italic">Percentile</span>
                </h2>
                <p className="text-xl text-muted">For {inputs.stage} B2B SaaS Companies</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white/5 border border-white/10 rounded-[2rem] p-10 space-y-6">
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-red-400">The Revenue Gap</span>
                  <div className="text-6xl font-black tracking-tighter text-red-400">
                    -${(getRevenueGap()/1000000).toFixed(1)}M
                  </div>
                  <p className="text-muted leading-relaxed text-lg">
                    By not operating at top-quartile efficiency, you are leaving substantial ARR on the table with your current pipeline volume.
                  </p>
                </div>

                <div className="bg-accent/5 border border-accent/20 rounded-[2rem] p-10 space-y-6">
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-accent">Optimization Path</span>
                  <div className="text-6xl font-black tracking-tighter text-accent">
                    +{( (getRevenueGap() / inputs.arr) * 100 ).toFixed(0)}%
                  </div>
                  <p className="text-accent/70 leading-relaxed text-lg">
                    Moving to the elite echelon through agentic GTM workflows can bridge this gap and accelerate your path to $100M+ ARR.
                  </p>
                </div>
              </div>

              <div className="space-y-8">
                <div className="flex items-center gap-4">
                  <div className="h-px flex-1 bg-white/10" />
                  <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-muted">Comparison vs. SaaS Legends</h3>
                  <div className="h-px flex-1 bg-white/10" />
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {LEGENDS.map((l) => (
                    <div key={l.name} className="bg-white/[0.02] border border-white/5 p-6 rounded-3xl text-center group hover:border-accent/30 transition-all">
                      <div className="text-2xl font-black text-white mb-1">{l.name}</div>
                      <div className="text-[10px] font-bold text-accent uppercase tracking-widest mb-3">{l.win}% Win Rate</div>
                      <div className="text-[9px] text-muted leading-tight font-medium uppercase">{l.metric}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* The Hard CTA */}
              <div className="bg-white text-[#0B1221] rounded-[3rem] p-10 lg:p-16 text-center space-y-8 shadow-[0_0_100px_rgba(255,255,255,0.1)] relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5 rotate-12">
                  <TrendingUp className="w-64 h-64" />
                </div>
                <div className="relative z-10 space-y-6">
                  <h2 className="text-4xl lg:text-6xl font-black tracking-tight leading-none">
                    Ready to reach the <span className="italic underline decoration-accent">Elite Echelon</span>?
                  </h2>
                  <p className="text-xl font-medium max-w-2xl mx-auto opacity-80">
                    Let&apos;s audit your revenue architecture and identify the exact agentic workflows needed to bridge your ${(getRevenueGap()/1000000).toFixed(1)}M gap.
                  </p>
                  <div className="pt-4">
                    <Link
                      href="/#contact"
                      className="inline-flex items-center gap-3 bg-accent text-[#0B1221] px-12 py-6 rounded-2xl font-black text-2xl hover:shadow-[0_0_50px_rgba(46,204,113,0.4)] transition-all scale-100 hover:scale-105 active:scale-95"
                    >
                      <Calendar className="w-7 h-7 fill-[#0B1221]" />
                      Book GTM Strategy Audit
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
          Calculations use a weighted benchmarking matrix derived from 2025-2026 GTM indices from <strong>PeerSignal</strong>, <strong>Kyle Poyar&apos;s GrowthUnhinged</strong>, and <strong>Gartner&apos;s Software Market Outlook</strong>. Performance percentiles are stage-specific, adjusting for typical ACV and Sales Cycle variations across the funding lifecycle.
        </p>
      </div>
    </div>
  );
}
