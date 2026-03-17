import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PlaybookDownload from "@/components/PlaybookDownload";

export const metadata: Metadata = {
  title: "B2B SaaS Agentic Outbound Playbook | n+α Ventures",
  description: "Download the exact agentic outbound architecture used to scale companies from $20M to $100M ARR. Learn how to automate your GTM with AI.",
  alternates: { canonical: "https://nplusalpha.com/resources/agentic-outbound" },
};

export default function AgenticOutboundPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://nplusalpha.com/resources/agentic-outbound#webpage",
        "url": "https://nplusalpha.com/resources/agentic-outbound",
        "name": "B2B SaaS Agentic Outbound Playbook | n+α Ventures",
        "description": "Download the exact agentic outbound architecture used to scale companies from $20M to $100M ARR. Learn how to automate your GTM with AI.",
        "isPartOf": { "@id": "https://nplusalpha.com/#website" },
        "publisher": { "@id": "https://nplusalpha.com/#organization" }
      },
      {
        "@type": "CreativeWork",
        "name": "Agentic Outbound Architecture Playbook",
        "description": "A comprehensive guide and architecture diagram for building automated, signal-based outbound GTM motions using AI and agentic workflows.",
        "learningResourceType": "Playbook",
        "genre": "Business Strategy",
        "author": { "@id": "https://nplusalpha.com/about#navsingh" }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://nplusalpha.com"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Resources",
            "item": "https://nplusalpha.com/resources/agentic-outbound"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Agentic Outbound Playbook",
            "item": "https://nplusalpha.com/resources/agentic-outbound"
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
