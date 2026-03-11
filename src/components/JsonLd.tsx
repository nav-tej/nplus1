import { FAQS } from "@/lib/constants";

export default function JsonLd() {
  // All data is hardcoded/static constants - safe for JSON-LD injection
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
          url: "https://nplus1ventures.com/logo.png",
        },
        email: "hello@nplus1ventures.com",
        description:
          "nPlus1 Ventures helps ambitious B2B companies build and execute repeatable go-to-market strategies that drive revenue growth.",
        sameAs: [],
      },
      {
        "@type": "WebSite",
        "@id": "https://nplus1ventures.com/#website",
        url: "https://nplus1ventures.com",
        name: "nPlus1 Ventures",
        publisher: {
          "@id": "https://nplus1ventures.com/#organization",
        },
      },
      {
        "@type": "WebPage",
        "@id": "https://nplus1ventures.com/#webpage",
        url: "https://nplus1ventures.com",
        name: "nPlus1 Ventures | Go-To-Market Consulting for B2B Companies",
        description:
          "Expert go-to-market consulting for ambitious B2B teams. Strategy, execution, and growth — all under one roof.",
        isPartOf: {
          "@id": "https://nplus1ventures.com/#website",
        },
        about: {
          "@id": "https://nplus1ventures.com/#organization",
        },
      },
      {
        "@type": "ProfessionalService",
        "@id": "https://nplus1ventures.com/#service",
        name: "nPlus1 Ventures",
        url: "https://nplus1ventures.com",
        logo: "https://nplus1ventures.com/logo.png",
        email: "hello@nplus1ventures.com",
        description:
          "Go-to-market consulting for ambitious B2B companies. GTM strategy, demand generation, sales enablement, and revenue operations.",
        areaServed: {
          "@type": "GeoShape",
          name: "Worldwide",
        },
        serviceType: [
          "Go-To-Market Strategy",
          "Market Positioning",
          "Demand Generation",
          "Sales Enablement",
          "Revenue Operations",
          "Growth Analytics",
        ],
        knowsAbout: [
          "B2B SaaS",
          "Go-To-Market Strategy",
          "Revenue Growth",
          "Pipeline Development",
          "Sales Enablement",
          "Market Positioning",
          "Demand Generation",
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "GTM Consulting Services",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "GTM Strategy",
                description:
                  "Data-driven go-to-market strategy tailored to your product, market, and growth stage.",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Demand Generation",
                description:
                  "Multi-channel demand generation programs that create awareness and drive pipeline.",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Sales Enablement",
                description:
                  "Playbooks, collateral, and processes to close deals faster and more consistently.",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Revenue Operations",
                description:
                  "Align marketing, sales, and customer success with unified data and processes.",
              },
            },
          ],
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: FAQS.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      // Safe: schema is built from hardcoded constants, no user input
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
