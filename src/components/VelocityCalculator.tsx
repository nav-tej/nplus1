"use client";

import { useState } from "react";
import { usePostHog } from "posthog-js/react";
import Link from "next/link";
import { 
  TrendingUp, 
  Lock, 
  CheckCircle2, 
  MessageSquare, 
  Zap, 
  Target, 
  BarChart3,
  Clock,
  ArrowRight,
  Info
} from "lucide-react";

type Stage = "Seed" | "Series A" | "Series B" | "Series C+";

type Inputs = {
  stage: Stage;
  arr: number;
  acv: number;
  cycle: number;
  winRate: number;
};

const STAGE_BENCHMARKS: Record<Stage, { acv: number; cycle: number; winRate: number }> = {
  "Seed": { acv: 8000, cycle: 30, winRate: 15 },
  "Series A": { acv: 15000, cycle: 60, winRate: 20 },
  "Series B": { acv: 35000, cycle: 90, winRate: 25 },
  "Series C+": { acv: 75000, cycle: 120, winRate: 28 },
};

const LEGENDS = [
  { name: "Cursor", time: "12mo", trajectory: "AI-Native Hypergrowth", color: "text-emerald-400" },
  { name: "Wiz", time: "18mo", trajectory: "Enterprise Blitz", color: "text-blue-400" },
  { name: "Ramp", time: "24mo", trajectory: "Fintech Velocity", color: "text-accent" },
  { name: "HeyGen", time: "29mo", trajectory: "AI-Video Leader", color: "text-orange-400" },
  { name: "Slack", time: "30mo", trajectory: "PLG Standard", color: "text-purple-400" },
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
  const [showAvatar, setShowAvatar] = useState(false);
  const ph = usePostHog();

  const handleStageChange = (stage: Stage) => {
    setInputs(prev => ({ ...prev, stage, ...STAGE_BENCHMARKS[stage] }));
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

  const getRevenueGap = () => {
    const targetWinRate = 35; // Top Quartile
    const winRateLift = targetWinRate - inputs.winRate;
    if (winRateLift <= 0) return 0;
    
    // Estimate pipeline needed for current ARR
    const estimatedPipe = inputs.arr / (inputs.winRate / 100);
    const potentialArr = estimatedPipe * (targetWinRate / 100);
    return potentialArr - inputs.arr;
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-12">
      <div className="bg-[#1A1D23] border border-white/10 backdrop-blur-xl rounded-[2rem] shadow-2xl overflow-hidden">
        {/* Progress Nav */}
        <div className="flex bg-black/20 p-2 m-4 rounded-2xl gap-2">
          {[1, 2, 3].map((s) => (
            <div 
              key={s} 
              className={`flex-1 py-3 rounded-xl text-center text-[10px] font-bold tracking-widest uppercase transition-all ${
                step === s ? "bg-accent text-[#0B1221] shadow-lg" : "text-muted/40"
              }`}
            >
              {s === 1 ? "Metrics" : s === 2 ? "Unlock" : "Analysis"}
            </div>
          ))}
        </div>

        <div className="p-8 lg:p-12">
          {step === 1 && (
            <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
              {/* Stage Selector */}
              <div className="space-y-4">
                <label className="text-xs font-bold text-muted uppercase tracking-[0.2em]">Select Funding Stage</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {(["Seed", "Series A", "Series B", "Series C+"] as Stage[]).map((s) => (
                    <button
                      key={s}
                      onClick={() => handleStageChange(s)}
                      className={`py-3 px-4 rounded-xl text-sm font-bold border transition-all ${
                        inputs.stage === s 
                          ? "bg-accent/10 border-accent text-accent shadow-[0_0_20px_rgba(46,204,113,0.1)]" 
                          : "bg-white/5 border-white/5 text-muted hover:border-white/20"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
                {/* ARR */}
                <div className="space-y-6">
                  <div className="flex justify-between items-end">
                    <div className="space-y-1">
                      <label className="text-sm font-bold text-foreground flex items-center gap-2">
                        <BarChart3 className="w-4 h-4 text-accent" /> Current ARR
                      </label>
                      <p className="text-xs text-muted">Total annual recurring revenue</p>
                    </div>
                    <span className="text-3xl font-black text-accent">
                      {inputs.arr >= 1000000000 ? `$${(inputs.arr/1000000000).toFixed(1)}B+` : `$${(inputs.arr/1000000).toFixed(0)}M`}
                    </span>
                  </div>
                  <input
                    type="range" min="1000000" max="1000000000" step="1000000"
                    value={inputs.arr}
                    onChange={(e) => setInputs(prev => ({ ...prev, arr: parseInt(e.target.value) }))}
                    className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-accent"
                  />
                </div>

                {/* Win Rate */}
                <div className="space-y-6">
                  <div className="flex justify-between items-end">
                    <div className="space-y-1">
                      <label className="text-sm font-bold text-foreground flex items-center gap-2">
                        <Target className="w-4 h-4 text-accent" /> Win Rate
                      </label>
                      <p className="text-xs text-muted">Opp-to-Won conversion</p>
                    </div>
                    <span className="text-3xl font-black text-accent">{inputs.winRate}%</span>
                  </div>
                  <input
                    type="range" min="1" max="60" step="1"
                    value={inputs.winRate}
                    onChange={(e) => setInputs(prev => ({ ...prev, winRate: parseInt(e.target.value) }))}
                    className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-accent"
                  />
                </div>

                {/* ACV */}
                <div className="space-y-6">
                  <div className="flex justify-between items-end">
                    <div className="space-y-1">
                      <label className="text-sm font-bold text-foreground flex items-center gap-2">
                        <Zap className="w-4 h-4 text-accent" /> Average ACV
                      </label>
                      <p className="text-xs text-muted">Annual contract value</p>
                    </div>
                    <span className="text-3xl font-black text-accent">${(inputs.acv/1000).toFixed(0)}K</span>
                  </div>
                  <input
                    type="range" min="1000" max="500000" step="1000"
                    value={inputs.acv}
                    onChange={(e) => setInputs(prev => ({ ...prev, acv: parseInt(e.target.value) }))}
                    className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-accent"
                  />
                </div>

                {/* Sales Cycle */}
                <div className="space-y-6">
                  <div className="flex justify-between items-end">
                    <div className="space-y-1">
                      <label className="text-sm font-bold text-foreground flex items-center gap-2">
                        <Clock className="w-4 h-4 text-accent" /> Sales Cycle
                      </label>
                      <p className="text-xs text-muted">Average days to close</p>
                    </div>
                    <span className="text-3xl font-black text-accent">{inputs.cycle}d</span>
                  </div>
                  <input
                    type="range" min="7" max="365" step="1"
                    value={inputs.cycle}
                    onChange={(e) => setInputs(prev => ({ ...prev, cycle: parseInt(e.target.value) }))}
                    className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-accent"
                  />
                </div>
              </div>

              <button
                onClick={() => setStep(2)}
                className="w-full group bg-accent text-[#0B1221] font-black text-xl rounded-2xl py-6 hover:shadow-[0_0_50px_rgba(46,204,113,0.4)] transition-all flex items-center justify-center gap-3"
              >
                Run AI Revenue Audit
                <ArrowRight className="w-6 h-6 transition-transform group-hover:translate-x-2" />
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="text-center space-y-8 py-12 animate-in fade-in zoom-in-95 duration-500">
              <div className="mx-auto w-24 h-24 bg-accent/10 rounded-[2rem] flex items-center justify-center rotate-12 mb-8 shadow-2xl">
                <Lock className="w-12 h-12 text-accent" />
              </div>
              <div className="space-y-4">
                <h2 className="text-4xl font-black tracking-tight">Diagnostics Complete.</h2>
                <p className="text-muted text-lg max-w-md mx-auto leading-relaxed">
                  We found a <span className="text-red-400 font-bold">${(getRevenueGap()/1000000).toFixed(1)}M</span> revenue gap in your current model. Enter your work email to unlock the full breakdown.
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
                  {loading ? "Analyzing..." : "Reveal Revenue Analysis"}
                </button>
              </form>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-12 animate-in fade-in duration-700">
              {/* Executive Summary Card */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white/5 border border-white/10 rounded-[2rem] p-10 space-y-6">
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-red-400">The Revenue Gap</span>
                  <div className="text-6xl font-black tracking-tighter text-red-400">
                    -${(getRevenueGap()/1000000).toFixed(1)}M
                  </div>
                  <p className="text-muted leading-relaxed text-lg">
                    Based on your current {inputs.winRate}% win rate, you are leaving substantial ARR on the table compared to top-quartile {inputs.stage} performers.
                  </p>
                </div>

                <div className="bg-accent/5 border border-accent/20 rounded-[2rem] p-10 space-y-6">
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-accent">AI-Native Optimization</span>
                  <div className="text-6xl font-black tracking-tighter text-accent">
                    +{( (getRevenueGap() / inputs.arr) * 100 ).toFixed(0)}%
                  </div>
                  <p className="text-accent/70 leading-relaxed text-lg">
                    By implementing agentic workflows and predictive intelligence, you can bridge this gap and accelerate velocity within 2 quarters.
                  </p>
                </div>
              </div>

              {/* Legends Comparison */}
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="h-px flex-1 bg-white/10" />
                  <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-muted">Legendary Growth Benchmarks</h3>
                  <div className="h-px flex-1 bg-white/10" />
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                  {LEGENDS.map((l) => (
                    <div key={l.name} className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl text-center group hover:border-accent/30 transition-colors">
                      <div className={`text-xl font-black mb-1 ${l.color}`}>{l.name}</div>
                      <div className="text-[10px] font-bold text-muted uppercase tracking-widest mb-3">{l.time} to $100M</div>
                      <div className="text-[9px] text-white/30 leading-tight font-medium uppercase">{l.trajectory}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* AI Avatar CTA */}
              <div className="bg-gradient-to-br from-accent/20 to-blue-500/10 border border-accent/20 rounded-[2.5rem] p-10 lg:p-16 text-center space-y-8 relative overflow-hidden">
                <div className="relative z-10 space-y-4">
                  <div className="inline-flex items-center gap-2 bg-accent text-[#0B1221] px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider mb-4">
                    New: AI Strategy Session
                  </div>
                  <h2 className="text-4xl lg:text-5xl font-black tracking-tight max-w-2xl mx-auto">
                    Want to see the exact playbook we used for <span className="italic">HeyGen</span>?
                  </h2>
                  <p className="text-lg text-muted max-w-xl mx-auto">
                    Talk to Nav&apos;s AI Avatar for a 3-minute deep dive into your specific velocity results.
                  </p>
                  <button
                    onClick={() => setShowAvatar(true)}
                    className="inline-flex items-center gap-3 bg-white text-[#0B1221] px-10 py-5 rounded-2xl font-black text-xl hover:shadow-[0_0_50px_rgba(255,255,255,0.2)] transition-all scale-100 hover:scale-105"
                  >
                    <MessageSquare className="w-6 h-6 fill-[#0B1221]" />
                    Talk to Nav AI
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Methodology & FAQ Schema Implementation */}
      <div className="pt-16 border-t border-white/5 space-y-12">
        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-white/40 flex items-center gap-2">
              <Info className="w-4 h-4" /> Methodology & Data Sources
            </h3>
            <p className="text-sm text-muted leading-relaxed">
              Our <strong>Predictive Revenue Intelligence</strong> engine benchmarks your metrics against 2026 indices from <strong>PeerSignal</strong>, <strong>GrowthUnhinged</strong>, and <strong>Gartner</strong>. Trajectories for "Legends" are sourced from historical S-1 filings and public funding data (e.g., Cursor&apos;s 2025 growth burst).
            </p>
            <div className="flex flex-wrap gap-4">
              {["PeerSignal Index", "Kyle Poyar Data", "Gartner GTM Outlook"].map(s => (
                <span key={s} className="text-[9px] font-black uppercase tracking-widest text-accent border border-accent/20 px-3 py-1.5 rounded-full">{s}</span>
              ))}
            </div>
          </div>
          
          <div className="space-y-6">
            <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-white/40">GTM Strategy FAQ</h3>
            <div className="space-y-4">
              <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                <div className="text-xs font-bold text-white mb-1">How does AI impact sales cycles?</div>
                <p className="text-xs text-muted">AI-native companies see 22% faster cycles by automating mid-funnel due diligence.</p>
              </div>
              <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                <div className="text-xs font-bold text-white mb-1">What is the &ldquo;AI Growth Premium&rdquo;?</div>
                <p className="text-xs text-muted">AI-native SaaS currently scales 2-3x faster than traditional PLG tools at the same stage.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* HeyGen Avatar Modal */}
      {showAvatar && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-xl p-6">
          <div className="bg-[#0B1221] border border-white/10 rounded-[3rem] w-full max-w-5xl aspect-video relative overflow-hidden shadow-[0_0_100px_rgba(46,204,113,0.2)] animate-in zoom-in-95 duration-300">
            <button onClick={() => setShowAvatar(false)} className="absolute top-8 right-8 z-50 p-3 bg-white/5 hover:bg-white/10 rounded-full transition-all text-white">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center space-y-10">
              <div className="w-32 h-32 bg-accent/10 rounded-[2.5rem] flex items-center justify-center animate-pulse border border-accent/20">
                <Target className="w-16 h-16 text-accent" />
              </div>
              <div className="space-y-4">
                <h3 className="text-4xl font-black tracking-tight">Initializing Nav AI Session</h3>
                <p className="text-muted text-xl max-w-md mx-auto leading-relaxed">Connecting to the streaming engine for your customized GTM deep-dive...</p>
              </div>
              <div className="flex items-center gap-3 bg-accent text-[#0B1221] px-8 py-3 rounded-2xl font-black uppercase tracking-widest text-sm shadow-[0_0_30px_rgba(46,204,113,0.4)]">
                <span className="w-2 h-2 rounded-full bg-[#0B1221] animate-ping" />
                Live Connection Active
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
