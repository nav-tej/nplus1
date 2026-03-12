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
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://nplus1ventures.com/resources/agentic-outbound#webpage",
        "url": "https://nplus1ventures.com/resources/agentic-outbound",
        "name": "B2B SaaS Agentic Outbound Playbook | nPlus1 Ventures",
        "description": "Download the exact agentic outbound architecture used to scale companies from $20M to $100M ARR. Learn how to automate your GTM with AI.",
        "isPartOf": { "@id": "https://nplus1ventures.com/#website" },
        "publisher": { "@id": "https://nplus1ventures.com/#organization" }
      },
      {
        "@type": "CreativeWork",
        "name": "Agentic Outbound Architecture Playbook",
        "description": "A comprehensive guide and architecture diagram for building automated, signal-based outbound GTM motions using AI and agentic workflows.",
        "learningResourceType": "Playbook",
        "genre": "Business Strategy",
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
            "name": "Resources",
            "item": "https://nplus1ventures.com/resources/agentic-outbound"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Agentic Outbound Playbook",
            "item": "https://nplus1ventures.com/resources/agentic-outbound"
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
          <PlaybookDownload />
        </div>
      </main>
      <Footer />
    </>
  );
}
