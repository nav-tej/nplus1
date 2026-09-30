
interface JsonLdProps {
  type?: string;
  title?: string;
  description?: string;
  path?: string;
  itemList?: any[];
  datePublished?: string;
  dateModified?: string;
  faqs?: any[];
  serviceType?: string;
  breadcrumbs?: {
    name: string;
    item: string;
  }[];
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
  serviceType,
  breadcrumbs,
  video,
}: JsonLdProps) {
  const baseUrl = "https://nplusalpha.com";
  const url = path === "" || path === "/" ? `${baseUrl}/` : `${baseUrl}${path}`;
  // Home's url already ends in "/", so appending "/#webpage" produced "//#webpage".
  const pageId = url.endsWith("/") ? `${url}#webpage` : `${url}/#webpage`;

  const graph: any[] = [
    {
      "@type": "Organization",
      "@id": `${baseUrl}/#organization`,
      name: "n+α Ventures",
      // Spelled-out + ASCII brand variants so search engines connect queries like
      // "n plus alpha", "n+alpha", "nplusalpha" to the Greek-glyph brand name.
      alternateName: [
        "n plus alpha",
        "n plus alpha Ventures",
        "nPlusAlpha",
        "nPlusAlpha Ventures",
        "n+alpha",
        "n+alpha Ventures",
        "nplusalpha",
        "N+A Ventures",
      ],
      url: baseUrl,
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/logo-square.png`,
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
      "name": "n+α Ventures",
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
      // No telephone: the previous value was a +1-415-000-0000 placeholder, and
      // publishing a fabricated contact point in structured data is worse than
      // omitting the field.
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
      // No aggregateRating or review here. Google treats reviews an organization
      // hosts about itself as self-serving: they never earn stars, and marking up
      // our own testimonials as 5-star reviews risks a structured-data manual action.
    },
    {
      "@type": "Person",
      "@id": `${baseUrl}/about#navsingh`,
      "name": "Navtej (Nav) Singh",
      "url": `${baseUrl}/about`,
      "mainEntityOfPage": type === "ProfilePage" ? { "@id": pageId } : undefined,
      "jobTitle": "AI-Native Revenue Architect",
      "description": "AI-Native Revenue Architect. Scaled HeyGen from $20M to $100M ARR leveraging agentic workflows and predictive revenue intelligence. Former Partner at Andreessen Horowitz (a16z), and GTM leader at Semgrep and Egnyte.",
      "image": {
        "@type": "ImageObject",
        "url": `${baseUrl}/nav-singh-portrait.jpg`,
        "width": 986,
        "height": 1232,
      },
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
      "@type": "WebSite",
      "@id": `${baseUrl}/#website`,
      "url": baseUrl,
      "name": "n+α Ventures",
      "alternateName": ["n plus alpha", "nPlusAlpha", "n+alpha", "nplusalpha"],
      "publisher": {
        "@id": `${baseUrl}/#organization`,
      },
    }
  ];

  // FAQPage only on pages that pass FAQs, and every page that passes them must
  // render them visibly. Markup for content a reader can't see breaks Google's
  // structured data guidelines. (FAQ rich results stopped showing in May 2026;
  // the markup stays because answer engines still read it.)
  if (faqs && faqs.length > 0) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${url.replace(/\/$/, "")}/#faq`,
      "mainEntity": faqs.map((faq) => ({
        "@type": "Question",
        "name": faq.question || faq.q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer || faq.a,
        },
      })),
    });
  }

  // Add the specific page to the graph
  const pageSchema: any = {
    "@type": type,
    "@id": pageId,
    "url": url,
    "name": title || "n+α Ventures | AI-Native Go-To-Market Consulting",
    "isPartOf": {
      "@id": `${baseUrl}/#website`,
    },
    "description": description || "Expert AI-native go-to-market consulting for ambitious B2B teams. Fractional VP Marketing and RevOps for companies scaling from $1M to $100M+ ARR.",
  };

  if (video) {
    const videoId = `${url}#video`;
    graph.push({
      "@type": "VideoObject",
      "@id": videoId,
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
    // Link video as main entity of the page to signal "watch page" prominence
    pageSchema.mainEntity = { "@id": videoId };
  }

  if (type === "ProfilePage") {
    pageSchema.mainEntity = { "@id": `${baseUrl}/about#navsingh` };
  }

  if (type === "Article" && datePublished) {
    pageSchema.headline = title;
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

  if (type === "Service" && serviceType) {
    pageSchema.serviceType = serviceType;
    pageSchema.provider = { "@id": `${baseUrl}/#organization` };
  }

  if (breadcrumbs) {
    graph.push({
      "@type": "BreadcrumbList",
      "itemListElement": breadcrumbs.map((crumb, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": crumb.name,
        "item": crumb.item.startsWith("http") ? crumb.item : `${baseUrl}${crumb.item}`,
      })),
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
