"use client";

import { useState } from "react";
import { usePostHog } from "posthog-js/react";
import Link from "next/link";

type Inputs = {
  arr: string;
  acv: string;
  cycle: string;
  winRate: string;
};

type Step = 1 | 2 | 3;

export default function VelocityCalculator() {
  const [step, setStep] = useState<Step>(1);
  const [inputs, setInputs] = useState<Inputs>({
    arr: "",
    acv: "",
    cycle: "",
    winRate: "",
  });
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const ph = usePostHog();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
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
        ph?.capture("lead_magnet_submitted", { type: "velocity_calculator" });
        setStep(3);
      }
    } catch (error) {
      console.error("Submission failed", error);
    } finally {
      setLoading(false);
    }
  };

  const getResults = () => {
    const winRateNum = parseFloat(inputs.winRate);
    const cycleNum = parseFloat(inputs.cycle);
    const acvNum = parseFloat(inputs.acv);

    let bottleneck = "Growth Efficiency";
    let tip = "Your metrics are balanced. Focus on scaling lead volume while maintaining conversion integrity.";
    let subText = "Current pipeline hygiene is strong.";

    if (winRateNum < 20) {
      bottleneck = "Enablement Bottleneck";
      tip = "Your win rate is below the 20% benchmark. This usually indicates a gap in sales enablement or initial lead qualification.";
      subText = "Win rate is below market benchmark.";
    } else if (cycleNum > 90 && acvNum < 10000) {
      bottleneck = "Velocity Bottleneck";
      tip = "Your sales cycle is too long for your ACV. Aim to shorten the cycle through automated nurture and frictionless procurement.";
      subText = "Sales cycle is inefficient for ACV level.";
    }

    return { bottleneck, tip, subText };
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-white/[0.02] border border-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-8 relative overflow-hidden">
        {/* Step 1: Inputs */}
        {step === 1 && (
          <div className="space-y-8 animate-in fade-in duration-500">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Current ARR</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted text-xl font-mono">$</span>
                  <input
                    type="number"
                    name="arr"
                    value={inputs.arr}
                    onChange={handleInputChange}
                    className="w-full bg-black/50 border border-white/10 rounded-xl pl-10 pr-4 py-4 text-2xl font-mono focus:ring-2 focus:ring-accent focus:border-transparent transition-all outline-none"
                    placeholder="1,000,000"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Average ACV</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted text-xl font-mono">$</span>
                  <input
                    type="number"
                    name="acv"
                    value={inputs.acv}
                    onChange={handleInputChange}
                    className="w-full bg-black/50 border border-white/10 rounded-xl pl-10 pr-4 py-4 text-2xl font-mono focus:ring-2 focus:ring-accent focus:border-transparent transition-all outline-none"
                    placeholder="25,000"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Sales Cycle</label>
                <div className="relative">
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted text-sm font-mono uppercase tracking-wider">Days</span>
                  <input
                    type="number"
                    name="cycle"
                    value={inputs.cycle}
                    onChange={handleInputChange}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-4 text-2xl font-mono focus:ring-2 focus:ring-accent focus:border-transparent transition-all outline-none"
                    placeholder="60"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Win Rate</label>
                <div className="relative">
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted text-xl font-mono">%</span>
                  <input
                    type="number"
                    name="winRate"
                    value={inputs.winRate}
                    onChange={handleInputChange}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-4 text-2xl font-mono focus:ring-2 focus:ring-accent focus:border-transparent transition-all outline-none"
                    placeholder="25"
                  />
                </div>
              </div>
            </div>
            <button
              onClick={nextStep}
              disabled={!inputs.arr || !inputs.acv || !inputs.cycle || !inputs.winRate}
              className="w-full bg-accent text-[#0B1221] font-bold text-lg rounded-xl py-4 hover:shadow-[0_0_30px_rgba(46,204,113,0.3)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Analyze Funnel Velocity
            </button>
          </div>
        )}

        {/* Step 2: The Gate */}
        {step === 2 && (
          <div className="animate-in fade-in duration-500 py-4">
            <div className="absolute inset-0 z-0 opacity-20 blur-sm pointer-events-none">
              <div className="grid grid-cols-2 gap-4 p-8">
                <div className="h-32 bg-accent/20 rounded-lg" />
                <div className="h-32 bg-white/10 rounded-lg" />
                <div className="h-32 bg-white/10 rounded-lg" />
                <div className="h-32 bg-accent/20 rounded-lg" />
              </div>
            </div>
            <div className="relative z-10 text-center space-y-6">
              <div className="mx-auto w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mb-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-accent">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold">Get Your Custom Bottleneck Report</h2>
              <p className="text-muted max-w-md mx-auto">
                We&apos;ve calculated your velocity score. Enter your work email to unlock the full tactical breakdown.
              </p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-6 py-4 text-xl focus:ring-2 focus:ring-accent focus:border-transparent transition-all outline-none text-center"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-accent text-[#0B1221] font-bold text-lg rounded-xl py-4 hover:shadow-[0_0_30px_rgba(46,204,113,0.3)] transition-all"
                >
                  {loading ? "Generating Report..." : "Unlock Full Report"}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Step 3: Results */}
        {step === 3 && (
          <div className="animate-in fade-in zoom-in-95 duration-500 space-y-8">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-full px-3 py-1 text-sm text-accent mb-4">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                Analysis Complete
              </div>
              <h2 className="text-3xl font-extrabold mb-2">Primary Bottleneck:</h2>
              <div className="text-4xl font-black text-accent uppercase tracking-tighter italic italic">
                {getResults().bottleneck}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white/[0.03] border border-white/5 rounded-xl p-6">
                <p className="text-sm text-muted mb-1 uppercase tracking-wider font-semibold">Current State</p>
                <div className="text-2xl font-mono text-red-400">{getResults().subText}</div>
              </div>
              <div className="bg-white/[0.03] border border-white/5 rounded-xl p-6">
                <p className="text-sm text-muted mb-1 uppercase tracking-wider font-semibold">Target State</p>
                <div className="text-2xl font-mono text-emerald-400">Scale-Ready Architecture</div>
              </div>
            </div>

            <div className="bg-accent/5 border border-accent/20 rounded-xl p-6">
              <h3 className="font-bold text-accent mb-2 flex items-center gap-2">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
                Operator Tip:
              </h3>
              <p className="text-foreground leading-relaxed">
                {getResults().tip}
              </p>
            </div>

            <div className="text-center pt-4">
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 text-muted hover:text-accent transition-colors text-sm font-medium"
              >
                Apply these results to your GTM strategy →
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
