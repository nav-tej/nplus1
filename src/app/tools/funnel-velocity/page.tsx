import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import VelocityCalculator from "@/components/VelocityCalculator";

export const metadata: Metadata = {
  title: "SaaS Funnel Velocity Calculator | nPlus1 Ventures",
  description: "Diagnose growth bottlenecks and optimize your revenue engine with our interactive B2B SaaS funnel velocity tool.",
};

export default function FunnelVelocityPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://nplus1ventures.com/tools/funnel-velocity#webpage",
        "url": "https://nplus1ventures.com/tools/funnel-velocity",
        "name": "SaaS Funnel Velocity Calculator | nPlus1 Ventures",
        "description": "Diagnose growth bottlenecks and optimize your revenue engine with our interactive B2B SaaS funnel velocity tool.",
        "isPartOf": { "@id": "https://nplus1ventures.com/#website" },
        "publisher": { "@id": "https://nplus1ventures.com/#organization" }
      },
      {
        "@type": "SoftwareApplication",
        "name": "SaaS Funnel Velocity Calculator",
        "description": "An interactive tool to diagnose B2B SaaS growth bottlenecks by analyzing ARR, Win Rate, and Sales Cycle metrics.",
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "Web",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "author": { "@id": "https://nplus1ventures.com/about#navsingh" }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://nplus1ventures.com"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Tools",
            "item": "https://nplus1ventures.com/tools/funnel-velocity"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Funnel Velocity Calculator",
            "item": "https://nplus1ventures.com/tools/funnel-velocity"
          }
        ]
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main id="main-content" className="pt-32 pb-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          {/* Hero Section */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl lg:text-6xl font-extrabold tracking-tight mb-6">
              SaaS Funnel Velocity <span className="text-accent italic">Calculator</span>
            </h1>
            <p className="text-xl text-muted leading-relaxed">
              Input your current GTM metrics to diagnose growth bottlenecks. This tool identifies whether your primary friction is in sales enablement, lead velocity, or conversion integrity.
            </p>
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
