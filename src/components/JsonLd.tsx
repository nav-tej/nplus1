export default function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "nPlus1 Ventures",
    url: "https://nplus1ventures.com",
    description:
      "Go-to-market consulting for ambitious B2B companies. GTM strategy, demand generation, sales enablement, and revenue operations.",
    areaServed: "Worldwide",
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
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
