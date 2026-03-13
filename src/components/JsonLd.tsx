import { FAQS, TESTIMONIALS, FOUNDER } from "@/lib/constants";

export default function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://nplusalpha.com/#organization",
        name: "n+Alpha Ventures",
        url: "https://nplusalpha.com",
        logo: {
          "@type": "ImageObject",
          url: "https://nplusalpha.com/logo.png",
          width: 512,
          height: 512,
        },
        email: "hello@nplusalpha.com",
        description:
          "Expert AI-native GTM consulting, Fractional VP Marketing, and Revenue Operations for ambitious B2B SaaS companies.",
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
        founder: { "@id": "https://nplusalpha.com/about#navsingh" },
      },
      {
        "@type": "ProfessionalService",
        "@id": "https://nplusalpha.com/#service",
        "name": "n+Alpha Ventures",
        "url": "https://nplusalpha.com",
        "logo": "https://nplusalpha.com/logo-square.png",
        "image": "https://nplusalpha.com/nav-singh.jpg",
        "description": "Expert AI-native GTM consulting, Fractional VP Marketing, and Revenue Operations for B2B SaaS companies scaling from $5M to $100M ARR.",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "San Francisco",
          "addressRegion": "CA",
          "addressCountry": "US"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "37.7749",
          "longitude": "-122.4194"
        },
        "telephone": "+1-415-000-0000",
        "priceRange": "$$$",
        "provider": {
          "@id": "https://nplusalpha.com/#organization"
        },
        "founder": {
          "@id": "https://nplusalpha.com/about#navsingh",
        },
        "serviceType": [
          "AI-Native GTM Strategy",
          "Fractional VP Marketing",
          "Go-To-Market Strategy",
          "Market Positioning",
          "Demand Generation",
          "Sales Enablement",
          "Revenue Operations",
          "Growth Analytics",
          "Product-Led Growth",
          "Account-Based Marketing (ABM)",
        ],
        "areaServed": ["San Francisco", "United States", "Worldwide"],
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "5",
          "reviewCount": String(TESTIMONIALS.length),
          "bestRating": "5",
          "worstRating": "1",
        },
        "review": TESTIMONIALS.map((t) => ({
          "@type": "Review",
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": "5",
            "bestRating": "5",
          },
          "author": {
            "@type": "Organization",
            "name": t.company,
          },
          "reviewBody": t.quote,
        })),
      },
      {
        "@type": "Person",
        "@id": "https://nplusalpha.com/about#navsingh",
        "name": "Navtej Singh",
        "url": "https://www.nplusalpha.com",
        "jobTitle": "AI-Native Revenue Architect",
        "description": "AI-Native Revenue Architect. Scaled HeyGen from $20M to $100M ARR leveraging agentic workflows and predictive revenue intelligence. Former Partner at Andreessen Horowitz (a16z), and GTM leader at Semgrep and Egnyte.",
        "image": "https://nplusalpha.com/nav-singh.jpg",
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
        "worksFor": { "@id": "https://nplusalpha.com/#organization" },
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
        "@type": "FAQPage",
        "@id": "https://nplusalpha.com/#faq",
        "mainEntity": FAQS.map((faq) => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer,
          },
        })),
      },
      {
        "@type": "WebSite",
        "@id": "https://nplusalpha.com/#website",
        "url": "https://nplusalpha.com",
        "name": "n+Alpha Ventures",
        "publisher": {
          "@id": "https://nplusalpha.com/#organization",
        },
      },
      {
        "@type": "WebPage",
        "@id": "https://nplusalpha.com/#webpage",
        "url": "https://nplusalpha.com",
        "name": "n+Alpha Ventures | AI-Native Go-To-Market Consulting",
        "isPartOf": {
          "@id": "https://nplusalpha.com/#website",
        },
        "about": {
          "@id": "https://nplusalpha.com/#organization",
        },
        "description": "Expert AI-native go-to-market consulting for ambitious B2B teams. Fractional VP Marketing and RevOps for companies scaling from $5M to $100M ARR.",
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
