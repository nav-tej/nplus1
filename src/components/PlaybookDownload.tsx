"use client";

import { useState } from "react";
import Link from "next/link";
import { usePostHog } from "posthog-js/react";
import { Database, Brain, Mail, Workflow, CheckCircle2, Download, ArrowRight, MessageSquare, Quote } from "lucide-react";

export default function PlaybookDownload() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [showAvatar, setShowAvatar] = useState(false);
  const ph = usePostHog();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/lead-magnet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          magnetType: "outbound_playbook",
        }),
      });

      if (res.ok) {
        ph?.capture("lead_magnet_submitted", { type: "outbound_playbook" });
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Submission failed", error);
      setStatus("error");
    }
  };

  const TRUST_LOGOS = [
    { name: "HeyGen", src: "/logos/heygen.svg" },
    { name: "Semgrep", src: "/logos/semgrep.svg" },
    { name: "Egnyte", src: "/logos/egnyte.svg" },
    { name: "OpenBlock", src: "/logos/openblock.svg" },
  ];

  return (
    <div className="space-y-24 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center max-w-7xl mx-auto">
        {/* Left Column: The Visual Asset */}
        <div className="relative group">
          <div className="absolute -inset-4 bg-accent/10 rounded-3xl blur-3xl opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="relative bg-[#0D1117] border border-white/10 rounded-xl overflow-hidden shadow-2xl">
            {/* Mac Top Bar */}
            <div className="bg-white/5 px-4 py-3 border-b border-white/10 flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
              <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
              <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
              <span className="ml-2 text-xs font-mono text-muted/50 uppercase tracking-widest">agentic_workflow.yaml</span>
            </div>

            {/* Architecture Diagram */}
            <div className="p-8 lg:p-12 aspect-[4/3] flex flex-col items-center justify-center space-y-8">
              <div className="flex items-center gap-12">
                <div className="relative">
                  <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center group-hover:border-accent/50 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.02)]">
                    <Database className="w-8 h-8 text-muted group-hover:text-accent transition-colors" />
                  </div>
                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-mono text-muted uppercase tracking-tighter">Data_LAKE</div>
                </div>

                <ArrowRight className="w-6 h-6 text-white/10" />

                <div className="relative">
                  <div className="w-20 h-20 bg-accent/10 border border-accent/20 rounded-2xl flex items-center justify-center animate-pulse shadow-[0_0_30px_rgba(46,204,113,0.15)]">
                    <Brain className="w-10 h-10 text-accent" />
                  </div>
                  <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] font-mono text-accent uppercase tracking-tighter whitespace-nowrap">Agent_CORE</div>
                </div>

                <ArrowRight className="w-6 h-6 text-white/10" />

                <div className="relative">
                  <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center group-hover:border-accent/50 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.02)]">
                    <Mail className="w-8 h-8 text-muted group-hover:text-accent transition-colors" />
                  </div>
                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-mono text-muted uppercase tracking-tighter">Channel_OUT</div>
                </div>
              </div>

              <div className="w-full max-w-[280px] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

              <div className="flex flex-col items-center space-y-4">
                <div className="flex items-center gap-2 px-4 py-2 bg-white/[0.03] border border-white/10 rounded-lg font-mono text-[10px] text-muted">
                  <Workflow className="w-3 h-3" />
                  <span>EXECUTION_LOOP: ACTIVE</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-400 font-mono text-[10px] uppercase tracking-widest">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Pipeline Optimizing...</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Copy & Form */}
        <div className="flex flex-col space-y-8">
          <div>
            <span className="text-accent font-mono text-sm uppercase tracking-wider mb-4 block">OPERATING MANUAL</span>
            <h1 className="text-4xl lg:text-6xl font-extrabold tracking-tight leading-tight">
              The Agentic Outbound <span className="text-muted">Architecture Playbook.</span>
            </h1>
          </div>

          <Link 
            href="/case-studies/heygen"
            className="inline-flex items-center gap-3 bg-white/5 border border-white/10 rounded-full pl-2 pr-5 py-1.5 text-sm text-muted hover:bg-white/10 hover:border-accent/30 transition-all group"
          >
            <span className="bg-accent/20 text-accent px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider">Case Study</span>
            <span>Used to scale <strong>HeyGen to $100M ARR</strong>.</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>

          <div className="space-y-4">
            {[
              "Exact prompts and LLM-chaining logic for personalized outbound.",
              "Database-to-sequencer routing architecture for zero manual research.",
              "Signal-based triggers that outperformed cold outbound by 4x.",
              "Seamless API integrations across the modern GTM stack."
            ].map((point) => (
              <div key={point} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <p className="text-muted leading-relaxed">{point}</p>
              </div>
            ))}
          </div>

          {status === "success" ? (
            <div className="bg-accent/10 border border-accent/20 rounded-2xl p-8 animate-in zoom-in-95 duration-500">
              <h3 className="text-xl font-bold text-accent mb-2">Access Granted.</h3>
              <p className="text-muted mb-6">The playbook has been sent to your email. You can also access the interactive documentation below.</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="#"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-8 py-4 text-base font-semibold text-[#0B1221] hover:brightness-110 transition-all"
                >
                  <Download className="w-5 h-5" />
                  Download PDF
                </Link>
                <button
                  onClick={() => setShowAvatar(true)}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 px-8 py-4 text-base font-semibold text-foreground hover:bg-white/5 transition-all"
                >
                  <MessageSquare className="w-5 h-5 text-accent" />
                  Talk to Nav (AI)
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full max-w-lg">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Work email"
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-6 py-4 outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="rounded-xl bg-accent px-8 py-4 text-base font-semibold text-[#0B1221] hover:shadow-[0_0_30px_rgba(46,204,113,0.3)] hover:brightness-110 transition-all disabled:opacity-50"
                >
                  {status === "loading" ? "Processing..." : "Get Playbook"}
                </button>
              </form>
              
              <div className="flex items-center gap-4 text-muted/40">
                <div className="h-px flex-1 bg-white/5" />
                <span className="text-[10px] font-mono uppercase tracking-[0.2em]">Validated by Operators At</span>
                <div className="h-px flex-1 bg-white/5" />
              </div>

              <div className="flex flex-wrap items-center gap-x-10 gap-y-6 grayscale opacity-40">
                {TRUST_LOGOS.map((logo) => (
                  <img key={logo.name} src={logo.src} alt={logo.name} className="h-6 w-auto" />
                ))}
              </div>
            </div>
          )}

          {status === "error" && (
            <p className="text-red-400 text-sm">Something went wrong. Please try again or contact support.</p>
          )}
        </div>
      </div>

      {/* HeyGen Avatar Overlay Placeholder */}
      {showAvatar && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-6">
          <div className="bg-[#0B1221] border border-white/10 rounded-3xl w-full max-w-4xl aspect-video relative overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="absolute top-6 right-6 z-10">
              <button 
                onClick={() => setShowAvatar(false)}
                className="p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M15 5L5 15M5 5l10 10" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
            
            {/* HeyGen Streaming Avatar Integration Point */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center space-y-6">
              <div className="w-24 h-24 bg-accent/10 rounded-full flex items-center justify-center animate-pulse">
                <Brain className="w-12 h-12 text-accent" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold">Interactive AI Session</h3>
                <p className="text-muted max-w-sm">Initializing Nav&apos;s AI Avatar for your 5-minute GTM strategy session...</p>
              </div>
              <div className="bg-accent text-[#0B1221] px-6 py-2 rounded-full text-sm font-bold animate-bounce">
                HeyGen Streaming Active
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
