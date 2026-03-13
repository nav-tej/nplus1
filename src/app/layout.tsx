import type { Metadata } from "next";
import { Inter } from "next/font/google";
import PostHogLoader from "@/components/PostHogLoader";
import GtmProvider from "@/components/GtmProvider";
import Ga4Provider from "@/components/Ga4Provider";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nplusalpha.com"),
  title: {
    default:
      "Nav Singh | Fractional VP Marketing & RevOps for B2B SaaS | n+Alpha Ventures",
    template: "%s | n+Alpha Ventures",
  },
  description:
    "Nav Singh, fractional VP Marketing and Revenue Operations consultant for B2B SaaS companies scaling $1M to $100M+ ARR. Scaled HeyGen $20M to $100M ARR. Ex-Andreessen Horowitz. Based in San Francisco.",
  keywords: [
    "Nav Singh",
    "Navtej Singh",
    "Nav Singh San Francisco",
    "Nav Singh tech executive",
    "Nav Singh marketing executive",
    "Nav Singh startups San Francisco",
    "fractional VP marketing",
    "fractional CMO",
    "B2B SaaS marketing consultant",
    "go-to-market consulting",
    "GTM strategy",
    "B2B growth",
    "demand generation",
    "sales enablement",
    "revenue operations",
    "market positioning",
    "startup consulting",
    "SaaS growth",
    "pipeline growth",
    "San Francisco marketing consultant",
    "product-led growth",
    "ABM",
    "marketing automation",
    "n+Alpha Ventures",
    "nPlusAlpha",
  ],
  authors: [{ name: "n+Alpha Ventures" }],
  alternates: {
    canonical: "https://nplusalpha.com",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://nplusalpha.com",
    siteName: "n+Alpha Ventures",
    title:
      "Nav Singh | Fractional VP Marketing & RevOps for B2B SaaS | n+Alpha Ventures",
    description:
      "Fractional VP Marketing and Revenue Operations for B2B SaaS. Scaled HeyGen $20M to $100M ARR. Ex-Andreessen Horowitz. Based in San Francisco.",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Nav Singh | Fractional VP Marketing & RevOps for B2B SaaS | n+Alpha Ventures",
    description:
      "Fractional VP Marketing and Revenue Operations for B2B SaaS. Scaled HeyGen $20M to $100M ARR. Ex-Andreessen Horowitz. Based in San Francisco.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://us.i.posthog.com" />
        <link rel="dns-prefetch" href="https://us.i.posthog.com" />
      </head>
      <body className={`${inter.variable} antialiased`}>
        <GtmProvider />
        <Ga4Provider />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:rounded-full focus:bg-accent focus:px-6 focus:py-3 focus:text-sm focus:font-semibold focus:text-[#0B1221]"
        >
          Skip to main content
        </a>
        <PostHogLoader>{children}</PostHogLoader>
      </body>
    </html>
  );
}
