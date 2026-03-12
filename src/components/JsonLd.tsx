import { FAQS, TESTIMONIALS, FOUNDER } from "@/lib/constants";

export default function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://nplus1ventures.com/#organization",
        name: "nPlus1 Ventures",
        url: "https://nplus1ventures.com",
        logo: {
          "@type": "ImageObject",
          url: "https://nplus1ventures.com/logo-square.png",
          width: 512,
          height: 512,
        },
        email: "hello@nplus1ventures.com",
        description:
          "Fractional VP Marketing and Revenue Operations consulting for B2B SaaS companies. GTM strategy, demand generation, sales enablement, and revenue operations.",
        areaServed: "Worldwide",
        knowsAbout: [
          "B2B SaaS",
          "Go-To-Market Strategy",
          "Revenue Growth",
          "Pipeline Development",
          "Sales Enablement",
          "Demand Generation",
          "Revenue Operations",
        ],
        founder: { "@id": "https://nplus1ventures.com/about#navsingh" },
      },
      {
        "@type": "ProfessionalService",
        "@id": "https://nplus1ventures.com/#service",
        name: "nPlus1 Ventures",
        url: "https://nplus1ventures.com",
        description:
          "Expert Fractional VP Marketing and Revenue Operations consulting for B2B SaaS companies scaling from $5M to $50M ARR.",
        provider: {
          "@id": "https://nplus1ventures.com/#organization",
        },
        serviceType: [
          "Fractional VP Marketing",
          "Go-To-Market Strategy",
          "Market Positioning",
          "Demand Generation",
          "Sales Enablement",
          "Revenue Operations",
          "Growth Analytics",
          "Product-Led Growth",
          "Account-Based Marketing",
        ],
        areaServed: "Worldwide",
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "5",
          reviewCount: String(TESTIMONIALS.length),
          bestRating: "5",
          worstRating: "1",
        },
        review: TESTIMONIALS.map((t) => ({
          "@type": "Review",
          reviewRating: {
            "@type": "Rating",
            ratingValue: "5",
            bestRating: "5",
          },
          author: {
            "@type": "Organization",
            name: t.company,
          },
          reviewBody: t.quote,
        })),
      },
      {
        "@type": "FAQPage",
        "@id": "https://nplus1ventures.com/#faq",
        mainEntity: FAQS.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },
      {
        "@type": "Person",
        "@id": "https://nplus1ventures.com/about#navsingh",
        "name": "Navtej Singh",
        "url": "https://www.nplus1ventures.com",
        "jobTitle": "AI-Native Revenue Architect",
        "description": "AI-Native Revenue Architect. Scaled HeyGen from $20M to $100M ARR leveraging agentic workflows and predictive revenue intelligence. Former Partner at Andreessen Horowitz (a16z), and GTM leader at Semgrep and Egnyte.",
        "image": "https://nplus1ventures.com/nav-singh.jpg",
        "sameAs": [
          "https://www.linkedin.com/in/navtejs",
          "https://x.com/navtejs"
        ],
        "alumniOf": [
          {
            "@type": "Organization",
            "name": "Andreessen Horowitz",
            "alternateName": "a16z",
            "url": "https://a16z.com"
          },
          {
            "@type": "Organization",
            "name": "HeyGen",
            "url": "https://www.heygen.com"
          },
          {
            "@type": "Organization",
            "name": "Semgrep",
            "url": "https://semgrep.dev"
          },
          {
            "@type": "Organization",
            "name": "Egnyte",
            "url": "https://www.egnyte.com"
          }
        ],
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "San Francisco",
          "addressRegion": "CA",
          "addressCountry": "US"
        },
        "worksFor": { "@id": "https://nplus1ventures.com/#organization" },
        "knowsAbout": [
          "Scaled HeyGen from $20M to $100M ARR",
          "a16z Operator Patterns",
          "B2B SaaS Marketing",
          "Revenue Operations",
          "Product-Led Growth",
          "Demand Generation",
          "Go-to-Market Strategy",
          "ABM",
          "Marketing Automation",
          "HeyGen Growth Strategy"
        ]
      },
      {
        "@type": "WebSite",
        "@id": "https://nplus1ventures.com/#website",
        url: "https://nplus1ventures.com",
        name: "nPlus1 Ventures",
        publisher: {
          "@id": "https://nplus1ventures.com/#organization",
        },
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: "https://nplus1ventures.com/blog?q={search_term_string}",
          },
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "WebPage",
        "@id": "https://nplus1ventures.com/#webpage",
        url: "https://nplus1ventures.com",
        name: "nPlus1 Ventures | Go-To-Market Consulting",
        isPartOf: {
          "@id": "https://nplus1ventures.com/#website",
        },
        about: {
          "@id": "https://nplus1ventures.com/#organization",
        },
        description: "Expert go-to-market consulting for ambitious B2B teams. Fractional VP Marketing and RevOps for companies scaling from $5M to $100M ARR.",
      }
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
