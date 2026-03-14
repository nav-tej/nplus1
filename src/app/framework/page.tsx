import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CheckCircle2, Zap, Target, BarChart3, Database, MessageSquare } from "lucide-react";

export const metadata: Metadata = {
  title: "The AI-Native GTM Framework | n+α Ventures",
  description: "The proprietary 5-pillar GTM architecture used to scale HeyGen to $100M ARR. Learn how we build AI-native revenue engines.",
  alternates: { canonical: "https://nplusalpha.com/framework" },
};

export default function FrameworkPage() {
  const pillars = [
    {
      icon: <Target className="w-6 h-6 text-accent" />,
      title: "Brand Repositioning",
      desc: "Transforming your product from a 'tool' into a 'platform'. We redefine ICPs and rebuild messaging hierarchies for enterprise credibility.",
    },
    {
      icon: <BarChart3 className="w-6 h-6 text-accent" />,
      title: "SEO from Zero",
      desc: "Building a high-volume organic engine. We've proven this at HeyGen with 50%+ YoY growth by focusing on technical fundamentals and programmatic content.",
    },
    {
      icon: <MessageSquare className="w-6 h-6 text-accent" />,
      title: "Community-Led Growth",
      desc: "Creating an ecosystem of advocates. We scale communities to 100K+ members that act as meaningful acquisition and retention channels.",
    },
    {
      icon: <Zap className="w-6 h-6 text-accent" />,
      title: "AI-Native Lifecycle",
      desc: "Replacing time-based sequences with behavioral triggers. We build automated intelligence layers that convert free users at the moment of highest intent.",
    },
    {
      icon: <Database className="w-6 h-6 text-accent" />,
      title: "Enterprise ABM",
      desc: "Signal-based outreach at scale. We use tools like Clay and 6sense to build hyper-personalized outbound motions that outperform cold calling by 4x.",
    },
  ];

  return (
    <>
      <Navbar />
      <main id="main-content" className="pt-32 pb-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="max-w-3xl mb-20">
            <p className="text-sm font-black text-accent uppercase tracking-[0.3em] mb-4">Proprietary Methodology</p>
            <h1 className="text-4xl lg:text-7xl font-black tracking-tighter mb-8 leading-none">
              The AI-Native <span className="text-muted italic">GTM Framework.</span>
            </h1>
            <p className="text-xl text-muted leading-relaxed">
              Distribution wins markets, but timing is everything. We use a 5-pillar architecture to build the automated revenue engines that scale B2B SaaS from $10M to $100M+ ARR.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
            {pillars.map((p) => (
              <div key={p.title} className="bg-white/[0.02] border border-white/10 rounded-3xl p-8 hover:border-accent/30 transition-all group">
                <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {p.icon}
                </div>
                <h3 className="text-xl font-bold mb-4">{p.title}</h3>
                <p className="text-muted leading-relaxed text-sm">{p.desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-accent/5 border border-accent/20 rounded-[3rem] p-10 lg:p-20 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 p-10 opacity-5 rotate-12">
              <Zap className="w-64 h-64 text-accent" />
            </div>
            <div className="relative z-10 max-w-2xl mx-auto space-y-8">
              <h2 className="text-3xl lg:text-5xl font-black tracking-tight">Ready to architect your hypergrowth?</h2>
              <p className="text-lg text-muted">
                We partner with 1-2 companies at a time to implement this framework directly into your leadership team.
              </p>
              <div className="pt-4">
                <Link
                  href="/#contact"
                  className="inline-flex items-center gap-3 bg-accent text-[#0B1221] px-10 py-5 rounded-2xl font-black text-xl hover:shadow-[0_0_50px_rgba(46,204,113,0.4)] transition-all active:scale-95"
                >
                  Get in Touch
                  <ArrowRight className="w-6 h-6" />
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
