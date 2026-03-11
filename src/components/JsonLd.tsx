import { FAQS, TESTIMONIALS } from "@/lib/constants";

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
          url: "https://nplus1ventures.com/logo.png",
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
          "Fractional VP Marketing and Revenue Operations consulting for B2B SaaS companies",
        provider: {
          "@id": "https://nplus1ventures.com/#organization",
        },
        founder: {
          "@id": "https://nplus1ventures.com/about#navsingh",
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
        areaServed: "US",
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
        name: "nPlus1 Ventures | Go-To-Market Consulting",
        isPartOf: {
          "@id": "https://nplus1ventures.com/#website",
        },
        about: {
          "@id": "https://nplus1ventures.com/#organization",
        },
        description:
          "Expert go-to-market consulting for ambitious B2B teams. Strategy, execution, and growth, all under one roof.",
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
      {
        "@type": "Person",
        "@id": "https://nplus1ventures.com/about#navsingh",
        name: "Nav Singh",
        alternateName: "Navtej Singh",
        jobTitle:
          "Fractional VP Marketing & Revenue Operations Consultant",
        url: "https://nplus1ventures.com/about",
        image: "https://nplus1ventures.com/nav-singh.jpg",
        sameAs: [
          "https://www.linkedin.com/in/navtejs",
          "https://x.com/navtejs",
        ],
        address: {
          "@type": "PostalAddress",
          addressLocality: "San Francisco",
          addressRegion: "CA",
          addressCountry: "US",
        },
        worksFor: { "@id": "https://nplus1ventures.com/#organization" },
        knowsAbout: [
          "B2B SaaS Marketing",
          "Revenue Operations",
          "Product-Led Growth",
          "Demand Generation",
          "Go-to-Market Strategy",
          "ABM",
          "Marketing Automation",
          "Marketing Analytics",
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
