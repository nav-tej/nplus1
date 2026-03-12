import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PlaybookDownload from "@/components/PlaybookDownload";

export const metadata: Metadata = {
  title: "B2B SaaS Agentic Outbound Playbook | nPlus1 Ventures",
  description: "Download the exact agentic outbound architecture used to scale companies from $20M to $100M ARR. Learn how to automate your GTM with AI.",
};

export default function AgenticOutboundPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "B2B SaaS Agentic Outbound Playbook",
    "description": "Download the exact agentic outbound architecture used to scale companies from $20M to $100M ARR.",
    "publisher": {
      "@type": "Organization",
      "name": "nPlus1 Ventures",
      "url": "https://nplus1ventures.com"
    }
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
          <PlaybookDownload />
        </div>
      </main>
      <Footer />
    </>
  );
}
