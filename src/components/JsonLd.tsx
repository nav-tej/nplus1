import { FAQS, TESTIMONIALS } from "@/lib/constants";

interface JsonLdProps {
  type?: string;
  title?: string;
  description?: string;
  path?: string;
  itemList?: any[];
  datePublished?: string;
  dateModified?: string;
  faqs?: any[];
  steps?: any[];
  serviceType?: string;
  video?: {
    name: string;
    description: string;
    thumbnailUrl: string;
    uploadDate: string;
    contentUrl: string;
    embedUrl: string;
  };
}

export default function JsonLd({
  type = "WebPage",
  title,
  description,
  path = "",
  itemList,
  datePublished,
  dateModified,
  faqs,
  steps,
  serviceType,
  video,
}: JsonLdProps) {
  const baseUrl = "https://nplusalpha.com";
  const url = `${baseUrl}${path}`;

  const graph: any[] = [
    {
      "@type": "Organization",
      "@id": `${baseUrl}/#organization`,
      name: "n+Alpha Ventures",
      url: baseUrl,
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/logo.png`,
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
      founder: { "@id": `${baseUrl}/about#navsingh` },
    },
    {
      "@type": "ProfessionalService",
      "@id": `${baseUrl}/#service`,
      "name": "n+Alpha Ventures",
      "url": baseUrl,
      "logo": `${baseUrl}/logo-square.png`,
      "image": `${baseUrl}/nav-singh.jpg`,
      "description": "Expert AI-native GTM consulting, Fractional VP Marketing, and Revenue Operations for B2B SaaS companies scaling from $1M to $100M+ ARR.",
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
        "@id": `${baseUrl}/#organization`
      },
      "founder": {
        "@id": `${baseUrl}/about#navsingh`,
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
      "@id": `${baseUrl}/about#navsingh`,
      "name": "Navtej Singh",
      "url": baseUrl,
      "jobTitle": "AI-Native Revenue Architect",
      "description": "AI-Native Revenue Architect. Scaled HeyGen from $20M to $100M ARR leveraging agentic workflows and predictive revenue intelligence. Former Partner at Andreessen Horowitz (a16z), and GTM leader at Semgrep and Egnyte.",
      "image": `${baseUrl}/nav-singh.jpg`,
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
      "worksFor": { "@id": `${baseUrl}/#organization` },
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
      "@id": `${baseUrl}/#faq`,
      "mainEntity": (faqs || FAQS).map((faq) => ({
        "@type": "Question",
        "name": faq.question || faq.q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer || faq.a,
        },
      })),
    },
    {
      "@type": "WebSite",
      "@id": `${baseUrl}/#website`,
      "url": baseUrl,
      "name": "n+Alpha Ventures",
      "publisher": {
        "@id": `${baseUrl}/#organization`,
      },
    }
  ];

  // Add the specific page to the graph
  const pageSchema: any = {
    "@type": type,
    "@id": `${url}/#webpage`,
    "url": url,
    "name": title || "n+Alpha Ventures | AI-Native Go-To-Market Consulting",
    "isPartOf": {
      "@id": `${baseUrl}/#website`,
    },
    "description": description || "Expert AI-native go-to-market consulting for ambitious B2B teams. Fractional VP Marketing and RevOps for companies scaling from $1M to $100M+ ARR.",
  };

  if (type === "Article" && datePublished) {
    pageSchema.datePublished = datePublished;
    pageSchema.dateModified = dateModified || datePublished;
    pageSchema.author = { "@id": `${baseUrl}/about#navsingh` };
    pageSchema.publisher = { "@id": `${baseUrl}/#organization` };
  }

  if (type === "CollectionPage" && itemList) {
    pageSchema.mainEntity = {
      "@type": "ItemList",
      "itemListElement": itemList.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": item.name,
        "url": item.url,
      })),
    };
  }

  if (type === "HowTo" && steps) {
    pageSchema.step = steps.map((step) => ({
      "@type": "HowToStep",
      "name": step.name,
      "text": step.text,
    }));
  }

  if (type === "Service" && serviceType) {
    pageSchema.serviceType = serviceType;
    pageSchema.provider = { "@id": `${baseUrl}/#organization` };
  }

  if (video) {
    graph.push({
      "@type": "VideoObject",
      "name": video.name,
      "description": video.description,
      "thumbnailUrl": video.thumbnailUrl,
      "uploadDate": video.uploadDate,
      "contentUrl": video.contentUrl,
      "embedUrl": video.embedUrl,
      "publisher": {
        "@type": "Organization",
        "name": "n+α Ventures",
        "logo": {
          "@id": `${baseUrl}/#organization`,
        },
      },
    });
  }

  graph.push(pageSchema);

  const schema = {
    "@context": "https://schema.org",
    "@graph": graph,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
