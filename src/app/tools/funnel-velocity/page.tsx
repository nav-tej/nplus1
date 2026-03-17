import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import VelocityCalculator from "@/components/VelocityCalculator";
import DirectAnswer from "@/components/DirectAnswer";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "SaaS Funnel Velocity Calculator | n+α Ventures",
  description: "Diagnose growth bottlenecks and optimize your revenue engine with our interactive B2B SaaS funnel velocity tool.",
  alternates: { canonical: "https://nplusalpha.com/tools/funnel-velocity" },
};

export default function FunnelVelocityPage() {
  return (
    <>
      <JsonLd 
        type="SoftwareApplication"
        title="SaaS Funnel Velocity Calculator | n+α Ventures"
        description="Diagnose growth bottlenecks and optimize your revenue engine with our interactive B2B SaaS funnel velocity tool."
        path="/tools/funnel-velocity"
      />
      <Navbar />
      <main id="main-content" className="pt-32 pb-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          {/* Hero Section */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl lg:text-6xl font-extrabold tracking-tight mb-6">
              SaaS Funnel Velocity <span className="text-accent italic">Calculator</span>
            </h1>
            <p className="text-xl text-muted leading-relaxed mb-12">
              Input your current GTM metrics to diagnose growth bottlenecks. This tool identifies whether your primary friction is in sales enablement, lead velocity, or conversion integrity.
            </p>

            <DirectAnswer 
              category="Growth Diagnostics"
              question="What is SaaS Funnel Velocity?"
              answer="SaaS Funnel Velocity is the speed at which opportunities move through your pipeline to closed-won revenue. It is calculated by multiplying qualified opportunities, average deal size, and win rate, then dividing by the length of your sales cycle. Improving velocity is the fastest way to scale ARR without increasing top-of-funnel spend."
            />
          </div>

          {/* Calculator Component */}
          <div className="relative">
            {/* Ambient background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/[0.05] rounded-full blur-[120px] pointer-events-none" />
            
            <div className="relative z-10">
              <VelocityCalculator />
            </div>
          </div>

          {/* Context Footer */}
          <div className="mt-20 text-center text-sm text-muted/50 max-w-md mx-auto">
            <p>
              Built for scaling B2B SaaS teams. All data is handled according to our Privacy Policy.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
