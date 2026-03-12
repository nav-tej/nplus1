"use client";

import { useState, useEffect } from "react";
import { usePostHog } from "posthog-js/react";
import Link from "next/link";
import { Info, Lock, Play, TrendingUp, AlertCircle, CheckCircle2 } from "lucide-react";

type Inputs = {
  arr: number;
  acv: number;
  cycle: number;
  winRate: number;
};

type Step = 1 | 2 | 3;

export default function VelocityCalculator() {
  const [step, setStep] = useState<Step>(1);
  const [inputs, setInputs] = useState<Inputs>({
    arr: 10000000, // Prepopulated at $10M
    acv: 25000,
    cycle: 60,
    winRate: 21, // 2026 Median Benchmark
  });
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const ph = usePostHog();

  const handleSliderChange = (name: keyof Inputs, value: number) => {
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const nextStep = () => setStep(2);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/lead-magnet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          magnetType: "velocity_calculator",
          payloadData: inputs,
        }),
      });

      if (res.ok) {
        ph?.capture("lead_magnet_submitted", { type: "velocity_calculator", ...inputs });
        setStep(3);
      }
    } catch (error) {
      console.error("Submission failed", error);
    } finally {
      setLoading(false);
    }
  };

  const getBenchmarkStatus = (val: number) => {
    if (val < 20) return { label: "Below Median", color: "text-red-400" };
    if (val < 35) return { label: "Healthy (Median)", color: "text-accent" };
    return { label: "Elite (Top 25%)", color: "text-emerald-400" };
  };

  const getResults = () => {
    const { winRate, cycle, acv } = inputs;
    
    // Scoring logic based on 2026 benchmarks
    if (winRate < 20) {
      return {
        bottleneck: "Sales Enablement",
        impact: "Severe",
        tip: "Your win rate is below the 21% median. You likely have a 'leaky bucket' problem—your marketing is driving leads that sales can't close. Focus on tighter ICP qualification and field-enablement playbooks.",
        cta: "See Enablement Playbooks"
      };
    }
    if (cycle > 90 && acv < 15000) {
      return {
        bottleneck: "Cycle Velocity",
        impact: "High",
        tip: "For your ACV level, a 90+ day sales cycle is inefficient. You should be targeting a <60 day cycle. Implement automated agentic workflows to handle mid-funnel nurture and procurement friction.",
        cta: "Automate My Funnel"
      };
    }
    return {
      bottleneck: "Volume Scaling",
      impact: "Moderate",
      tip: "Your conversion metrics are healthy. Your primary bottleneck is now raw throughput. It's time to scale your demand generation engine without breaking your unit economics.",
      cta: "Scale Demand Gen"
    };
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-12">
      <div className="bg-white/[0.02] border border-white/10 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden">
        {/* Progress Header */}
        <div className="flex border-b border-white/5">
          {[1, 2, 3].map((s) => (
            <div 
              key={s} 
              className={`flex-1 py-4 text-center text-xs font-mono tracking-widest uppercase transition-colors ${
                step === s ? "text-accent bg-accent/5" : "text-muted/40"
              }`}
            >
              Step 0{s} {s === 1 ? "Inputs" : s === 2 ? "Verify" : "Report"}
            </div>
          ))}
        </div>

        <div className="p-8 lg:p-12 relative">
          {/* Step 1: Tactical Inputs */}
          {step === 1 && (
            <div className="space-y-10 animate-in fade-in duration-500">
              <div className="grid grid-cols-1 gap-10">
                {/* ARR Slider */}
                <div className="space-y-4">
                  <div className="flex justify-between items-end">
                    <label className="text-sm font-semibold text-foreground/80 uppercase tracking-wider">Current ARR</label>
                    <span className="text-3xl font-mono text-accent">
                      {inputs.arr >= 1000000000 
                        ? `$${(inputs.arr / 1000000000).toFixed(1)}B+` 
                        : `$${(inputs.arr / 1000000).toFixed(0)}M`}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="5000000"
                    max="1000000000"
                    step="5000000"
                    value={inputs.arr}
                    onChange={(e) => handleSliderChange("arr", parseInt(e.target.value))}
                    className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-accent"
                  />
                  <div className="flex justify-between text-[10px] text-muted uppercase font-mono">
                    <span>$5M</span>
                    <span>$1B+</span>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-10">
                  {/* Win Rate Slider */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-end">
                      <label className="text-sm font-semibold text-foreground/80 uppercase tracking-wider">Win Rate (%)</label>
                      <span className="text-2xl font-mono text-accent">{inputs.winRate}%</span>
                    </div>
                    <input
                      type="range"
                      min="5"
                      max="60"
                      step="1"
                      value={inputs.winRate}
                      onChange={(e) => handleSliderChange("winRate", parseInt(e.target.value))}
                      className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-accent"
                    />
                    <div className={`text-[10px] font-mono uppercase text-center ${getBenchmarkStatus(inputs.winRate).color}`}>
                      {getBenchmarkStatus(inputs.winRate).label}
                    </div>
                  </div>

                  {/* Sales Cycle Slider */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-end">
                      <label className="text-sm font-semibold text-foreground/80 uppercase tracking-wider">Sales Cycle (Days)</label>
                      <span className="text-2xl font-mono text-accent">{inputs.cycle}</span>
                    </div>
                    <input
                      type="range"
                      min="15"
                      max="180"
                      step="5"
                      value={inputs.cycle}
                      onChange={(e) => handleSliderChange("cycle", parseInt(e.target.value))}
                      className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-accent"
                    />
                    <div className="text-[10px] text-muted font-mono uppercase text-center">
                      Industry Avg: ~84 Days
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={nextStep}
                className="w-full group bg-accent text-[#0B1221] font-bold text-lg rounded-2xl py-5 hover:shadow-[0_0_40px_rgba(46,204,113,0.4)] hover:scale-[1.01] transition-all flex items-center justify-center gap-2"
              >
                Generate Diagnostics Report
                <TrendingUp className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          )}

          {/* Step 2: The Gate */}
          {step === 2 && (
            <div className="animate-in fade-in duration-500 py-4 relative">
              <div className="absolute inset-0 z-0 opacity-10 blur-xl grayscale pointer-events-none">
                <div className="h-full w-full bg-gradient-to-br from-accent to-blue-500 rounded-full" />
              </div>
              
              <div className="relative z-10 text-center space-y-8">
                <div className="mx-auto w-20 h-20 bg-accent/10 rounded-3xl flex items-center justify-center mb-4 rotate-12">
                  <Lock className="w-10 h-10 text-accent" />
                </div>
                <div className="space-y-3">
                  <h2 className="text-3xl font-extrabold tracking-tight">Diagnostics Ready.</h2>
                  <p className="text-muted max-w-sm mx-auto text-lg">
                    Enter your work email to unlock the tactical bottleneck analysis for your <span className="text-accent font-mono">${(inputs.arr/1000000).toFixed(0)}M</span> revenue engine.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Work email"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-xl focus:ring-2 focus:ring-accent outline-none text-center"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-accent text-[#0B1221] font-bold text-lg rounded-2xl py-5 hover:shadow-[0_0_30px_rgba(46,204,113,0.3)] transition-all"
                  >
                    {loading ? "Processing..." : "Get the Report"}
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* Step 3: Detailed Report */}
          {step === 3 && (
            <div className="animate-in fade-in zoom-in-95 duration-500 space-y-10">
              <div className="flex items-start justify-between gap-6 pb-8 border-b border-white/5">
                <div className="space-y-2">
                  <span className="text-accent font-mono text-[10px] uppercase tracking-widest">Primary Friction Point:</span>
                  <h2 className="text-4xl font-black uppercase tracking-tighter italic">
                    {getResults().bottleneck}
                  </h2>
                </div>
                <div className="hidden sm:flex flex-col items-end">
                  <span className="text-[10px] text-muted uppercase font-mono">Impact Level</span>
                  <span className="text-xl font-bold text-red-400 uppercase tracking-widest">{getResults().impact}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-8 space-y-4">
                  <div className="flex items-center gap-2 text-muted uppercase text-[10px] font-mono tracking-widest">
                    <AlertCircle className="w-3 h-3" /> Current State
                  </div>
                  <div className="text-2xl font-bold">Unoptimized Funnel</div>
                  <p className="text-sm text-muted leading-relaxed">
                    Stagnant velocity due to inconsistent qualification and manual GTM motions.
                  </p>
                </div>
                <div className="bg-accent/5 border border-accent/20 rounded-2xl p-8 space-y-4">
                  <div className="flex items-center gap-2 text-accent uppercase text-[10px] font-mono tracking-widest">
                    <CheckCircle2 className="w-3 h-3" /> Target State
                  </div>
                  <div className="text-2xl font-bold">Agentic Revenue Engine</div>
                  <p className="text-sm text-accent/80 leading-relaxed">
                    Automated intelligence layers driving 3x higher throughput at lower CAC.
                  </p>
                </div>
              </div>

              <div className="bg-white/5 rounded-3xl p-8 lg:p-10 border border-white/10 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Info className="w-24 h-24 rotate-12" />
                </div>
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Play className="w-5 h-5 text-accent fill-accent" />
                  Tactical Recommendation:
                </h3>
                <p className="text-foreground/90 text-lg leading-relaxed relative z-10">
                  {getResults().tip}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4">
                <Link
                  href="/#contact"
                  className="w-full sm:w-auto px-10 py-5 rounded-2xl bg-accent text-[#0B1221] font-extrabold text-center hover:shadow-[0_0_40px_rgba(46,204,113,0.4)] transition-all"
                >
                  Book GTM Audit
                </Link>
                <Link
                  href="/resources/agentic-outbound"
                  className="text-sm font-medium text-muted hover:text-foreground transition-colors underline underline-offset-4"
                >
                  View Outbound Playbook →
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Methodology Section */}
      <div className="pt-12 border-t border-white/5 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white/40">Methodology & Benchmarks</h3>
          <span className="text-[10px] font-mono text-muted uppercase bg-white/5 px-2 py-1 rounded">Last Refreshed: March 12, 2026</span>
        </div>
        <p className="text-sm text-muted leading-relaxed">
          Calculations are weighted based on the 2026 SaaS unit economic indices from <strong>PeerSignal</strong>, <strong>GrowthUnhinged</strong>, and <strong>Gartner</strong>. Our benchmark median win rate is set at 21%, with "Elite" performance classified as 35%+. ACV-to-Cycle efficiency ratios assume a mid-market SLG/PLG hybrid motion.
        </p>
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          <a href="https://peersignal.org" target="_blank" rel="noopener" className="text-[10px] text-accent hover:underline uppercase font-bold tracking-widest">→ PeerSignal Index</a>
          <a href="https://growthunhinged.com" target="_blank" rel="noopener" className="text-[10px] text-accent hover:underline uppercase font-bold tracking-widest">→ Kyle Poyar Data</a>
          <a href="https://gartner.com" target="_blank" rel="noopener" className="text-[10px] text-accent hover:underline uppercase font-bold tracking-widest">→ Gartner GTM Outlook</a>
        </div>
      </div>
    </div>
  );
}
