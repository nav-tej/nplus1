import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  CheckCircle2, 
  Zap, 
  Target, 
  BarChart3, 
  Database, 
  MessageSquare, 
  ArrowRight,
  RefreshCw,
  Cpu,
  Layers,
  ArrowDown
} from "lucide-react";

export const metadata: Metadata = {
  title: "The AI-Native GTM Framework | n+α Ventures",
  description: "The proprietary 5-pillar GTM architecture used to scale HeyGen to $100M ARR. Learn how we build AI-native revenue engines.",
  alternates: { canonical: "https://nplusalpha.com/framework" },
  openGraph: {
    title: "The AI-Native GTM Framework | n+α Ventures",
    description: "The proprietary 5-pillar GTM architecture used to scale HeyGen to $100M ARR. Learn how we build AI-native revenue engines.",
    url: "https://nplusalpha.com/framework",
    type: "article",
  },
};

const FAQ_SCHEMA = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How does an agentic outbound architecture scale ARR?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Agentic outbound replaces manual SDR research with AI workflows. By using tools like Clay and LLMs to automate research and personalization, companies can scale outreach volume by 10x while maintaining high relevance, directly increasing pipeline velocity."
      }
    },
    {
      "@type": "Question",
      "name": "What is the difference between AI-native GTM and traditional GTM?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Traditional GTM relies on headcount to scale (more SDRs, more writers). AI-native GTM relies on systems and data loops. It uses AI to automate content production, lead scoring, and outbound, allowing lean teams to outperform larger competitors."
      }
    },
    {
      "@type": "Question",
      "name": "How fast can we see results from this framework?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We start shipping optimization sprints within the first 14 days. Most companies see a measurable lift in pipeline efficiency and inbound volume within the first 90 days."
      }
    }
  ]
});

export default function FrameworkPage() {
  const pillars = [
    {
      icon: <Target className="w-6 h-6 text-accent" />,
      title: "Category Positioning",
      strategy: "Platform vs. Tool",
      tactics: "ICP refinement, messaging hierarchy, enterprise narrative",
      desc: "Transforming your product from a 'nice-to-have tool' into a 'mission-critical platform'. We rebuild your messaging hierarchy to drive multi-stakeholder consensus at the enterprise level.",
    },
    {
      icon: <BarChart3 className="w-6 h-6 text-accent" />,
      title: "Programmatic SEO",
      strategy: "Inbound Cascades",
      tactics: "Technical audits, programmatic landing pages, GEO/AEO",
      desc: "We built HeyGen's SEO engine from zero to 50%+ YoY organic growth. We don't just write blogs; we architect programmatic cascades that dominate high-intent keyword clusters.",
    },
    {
      icon: <MessageSquare className="w-6 h-6 text-accent" />,
      title: "Community-Led Growth",
      strategy: "Ecosystem Flywheel",
      tactics: "100K member scaling, ambassador programs, social proof loops",
      desc: "Scaling ecosystems that turn users into advocates. Our community playbook drove a 30% lift in new customer acquisition at HeyGen within six months.",
    },
    {
      icon: <Zap className="w-6 h-6 text-accent" />,
      title: "Behavioral Lifecycle",
      strategy: "Signal-to-Action",
      tactics: "PQL scoring, automated nurture, usage-based triggers",
      desc: "Moving beyond time-based emails to behavioral intelligence. We build automated layers that activate users based on real-time product signals, not just 'Day 7' reminders.",
    },
    {
      icon: <Database className="w-6 h-6 text-accent" />,
      title: "Agentic Outbound",
      strategy: "Signal-Based ABM",
      tactics: "Clay-powered research, LLM personalization, 6sense intent",
      desc: "Architecting outbound motions that outperform legacy SDR teams by 4x. We use agentic workflows to handle research and personalization at a scale manual teams can't touch.",
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: FAQ_SCHEMA }} />
      <Navbar />
      <main id="main-content" className="pt-32 pb-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          {/* Header */}
          <div className="max-w-4xl mb-24">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-black uppercase tracking-widest mb-6">
              <Cpu className="w-3 h-3" /> Proprietary Architecture
            </div>
            <h1 className="text-5xl lg:text-8xl font-black tracking-tighter mb-8 leading-[0.9]">
              The AI-Native <span className="text-muted italic">GTM Framework.</span>
            </h1>
            <p className="text-xl lg:text-2xl text-muted leading-relaxed max-w-3xl">
              Most GTM frameworks are built for the headcount-heavy era of 2018. We architect for 2026: where <strong>distribution wins markets</strong> and <strong>timing is your only unfair advantage.</strong>
            </p>
          </div>

          {/* The Loop Visualization */}
          <section className="mb-32 relative">
            <div className="absolute inset-0 bg-accent/[0.02] rounded-[3rem] -z-10 blur-3xl" />
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <h2 className="text-3xl font-extrabold tracking-tight">The Recursive Growth Loop</h2>
                <p className="text-muted leading-relaxed">
                  Unlike traditional linear funnels, the AI-Native Framework creates a self-reinforcing flywheel. Each pillar feeds data and momentum into the next, compounding your acquisition efficiency.
                </p>
                <ul className="space-y-4">
                  {[
                    "Positioning anchors the SEO narrative.",
                    "SEO drives the Community top-of-funnel.",
                    "Community signals trigger Lifecycle events.",
                    "Lifecycle depth informs Outbound targeting.",
                    "Outbound success validates the Positioning."
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm font-medium">
                      <CheckCircle2 className="w-5 h-5 text-accent" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-[#0D1117] border border-white/10 rounded-[2.5rem] p-8 lg:p-12 shadow-2xl relative overflow-hidden group">
                {/* Visual Diagram Placeholder - CSS Recursive Loop */}
                <div className="flex flex-col items-center justify-center space-y-6 aspect-square max-w-[400px] mx-auto">
                  <div className="w-20 h-20 bg-accent/10 border border-accent/20 rounded-2xl flex items-center justify-center animate-pulse">
                    <Target className="w-10 h-10 text-accent" />
                  </div>
                  <ArrowDown className="w-6 h-6 text-white/10" />
                  <div className="flex gap-6 items-center w-full justify-center">
                    <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center"><BarChart3 className="w-8 h-8 text-muted" /></div>
                    <RefreshCw className="w-8 h-8 text-accent animate-spin-slow" />
                    <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center"><MessageSquare className="w-8 h-8 text-muted" /></div>
                  </div>
                  <ArrowDown className="w-6 h-6 text-white/10" />
                  <div className="w-20 h-20 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center group-hover:border-accent/50 transition-colors">
                    <Database className="w-10 h-10 text-muted" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* AI-Native vs. Legacy Matrix */}
          <section className="mb-32">
            <h2 className="text-3xl font-black mb-12 text-center">AI-Native vs. Legacy GTM</h2>
            <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02]">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-white/5">
                    <th className="p-6 text-xs font-black uppercase tracking-widest text-muted">Capability</th>
                    <th className="p-6 text-xs font-black uppercase tracking-widest text-muted">Legacy Motion (Manual)</th>
                    <th className="p-6 text-xs font-black uppercase tracking-widest text-accent">AI-Native Motion (n+α)</th>
                  </tr>
                </thead>
                <tbody className="text-sm divide-y divide-white/5">
                  <tr>
                    <td className="p-6 font-bold">Content Ops</td>
                    <td className="p-6 text-muted">2-4 blog posts / month</td>
                    <td className="p-6 text-foreground font-semibold">50+ programmatic assets / week</td>
                  </tr>
                  <tr>
                    <td className="p-6 font-bold">Outbound</td>
                    <td className="p-6 text-muted">Manual list building & spray</td>
                    <td className="p-6 text-foreground font-semibold">Signal-based agentic workflows</td>
                  </tr>
                  <tr>
                    <td className="p-6 font-bold">Forecasting</td>
                    <td className="p-6 text-muted">CRM-based gut feel</td>
                    <td className="p-6 text-foreground font-semibold">95%+ predictive accuracy</td>
                  </tr>
                  <tr>
                    <td className="p-6 font-bold">Speed-to-Impact</td>
                    <td className="p-6 text-muted">90-day onboarding</td>
                    <td className="p-6 text-foreground font-semibold">14-day shipping velocity</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Deep Pillar Breakdown */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
            {pillars.map((p, i) => (
              <div 
                key={p.title} 
                className="glass-card rounded-[2rem] p-8 group flex flex-col h-full opacity-0 animate-fade-in-up"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
                  {p.icon}
                </div>
                <div className="space-y-4 flex-1">
                  <h3 className="text-2xl font-black tracking-tight">{p.title}</h3>
                  <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-accent">Strategy</p>
                    <p className="text-sm font-bold text-foreground">{p.strategy}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted">Tactics</p>
                    <p className="text-xs text-muted leading-relaxed">{p.tactics}</p>
                  </div>
                  <p className="text-muted leading-relaxed text-sm pt-4 border-t border-white/5">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Executive FAQ */}
          <section className="mb-32 max-w-3xl mx-auto">
            <h2 className="text-2xl font-black mb-8 text-center">Executive Questions</h2>
            <div className="space-y-4">
              <div className="glass-card rounded-2xl p-6 opacity-0 animate-fade-in-up" style={{ animationDelay: "200ms" }}>
                <h3 className="font-bold text-white mb-2">How does an agentic outbound architecture scale ARR?</h3>
                <p className="text-sm text-muted">Agentic outbound replaces manual SDR research with AI workflows. By using tools like Clay and LLMs to automate research and personalization, companies can scale outreach volume by 10x while maintaining high relevance.</p>
              </div>
              <div className="glass-card rounded-2xl p-6 opacity-0 animate-fade-in-up" style={{ animationDelay: "300ms" }}>
                <h3 className="font-bold text-white mb-2">What is the difference between AI-native GTM and traditional GTM?</h3>
                <p className="text-sm text-muted">Traditional GTM relies on headcount to scale (more SDRs, more writers). AI-native GTM relies on systems and data loops. It uses AI to automate content production, lead scoring, and outbound.</p>
              </div>
              <div className="glass-card rounded-2xl p-6 opacity-0 animate-fade-in-up" style={{ animationDelay: "400ms" }}>
                <h3 className="font-bold text-white mb-2">How fast can we see results from this framework?</h3>
                <p className="text-sm text-muted">We start shipping optimization sprints within the first 14 days. Most companies see a measurable lift in pipeline efficiency and inbound volume within the first 90 days.</p>
              </div>
            </div>
          </section>

          {/* Final CTA */}
          <div className="bg-white text-[#0B1221] rounded-[3.5rem] p-10 lg:p-24 text-center relative overflow-hidden shadow-[0_0_100px_rgba(255,255,255,0.1)]">
            <div className="absolute top-0 right-0 p-10 opacity-5 rotate-12">
              <Layers className="w-80 h-84" />
            </div>
            <div className="relative z-10 max-w-3xl mx-auto space-y-10">
              <h2 className="text-4xl lg:text-7xl font-black tracking-tighter leading-[0.9]">Ready to build your <span className="italic underline decoration-accent">unfair advantage</span>?</h2>
              <p className="text-xl font-medium opacity-80 leading-relaxed">
                We partner with 1-2 companies at a time to implement this framework directly into your GTM architecture. There is no long discovery period; we start shipping within 14 days.
              </p>
              <div className="pt-4">
                <Link
                  href="/#contact"
                  className="inline-flex items-center gap-4 bg-accent text-[#0B1221] px-12 py-6 rounded-2xl font-black text-2xl hover:shadow-[0_0_50px_rgba(46,204,113,0.4)] transition-all active:scale-95 group"
                >
                  Start Shipping
                  <ArrowRight className="w-7 h-7 transition-transform group-hover:translate-x-2" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
