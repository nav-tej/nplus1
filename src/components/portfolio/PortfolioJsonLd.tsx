import React from "react";

export default function PortfolioJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id": "https://nplusalpha.com/portfolio/#breadcrumb",
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
            "name": "Portfolio",
            "item": "https://nplusalpha.com/portfolio"
          }
        ]
      },
      {
        "@type": "CollectionPage",
        "@id": "https://nplusalpha.com/portfolio/#webpage",
        "url": "https://nplusalpha.com/portfolio",
        "name": "Portfolio | GTM Case Studies & Frameworks",
        "description": "Selected work and GTM frameworks by n+Alpha. Stylized representations of strategy, marketing systems, and growth programs for B2B SaaS.",
        "breadcrumb": { "@id": "https://nplusalpha.com/portfolio/#breadcrumb" },
        "mainEntity": {
          "@type": "ItemList",
          "numberOfItems": 3,
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Scaling PLG → SLG at an AI Video Platform",
              "description": "Built the full marketing function and enterprise GTM for an AI video platform, scaling to $20M+ enterprise revenue."
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Competitive Positioning for a DevSecOps Platform",
              "description": "Data-driven competitive positioning and sales enablement for a growth-stage developer security platform."
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": "Underdog Marketing for an Enterprise Content Platform",
              "description": "Category reframing and product-led experience design for an enterprise content governance platform."
            }
          ]
        }
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
