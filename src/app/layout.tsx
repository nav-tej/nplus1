import type { Metadata } from "next";
import { Inter } from "next/font/google";
import PostHogLoader from "@/components/PostHogLoader";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nplus1ventures.com"),
  title: {
    default: "nPlus1 Ventures | Go-To-Market Consulting",
    template: "%s | nPlus1 Ventures",
  },
  description:
    "nPlus1 Ventures, founded by Nav Singh in San Francisco, helps ambitious B2B companies build and execute repeatable go-to-market strategies that drive revenue growth.",
  keywords: [
    "Nav Singh",
    "Navtej Singh",
    "Nav Singh San Francisco",
    "Nav Singh tech executive",
    "Nav Singh marketing executive",
    "Nav Singh startups San Francisco",
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
    "nPlus1 Ventures",
  ],
  authors: [{ name: "nPlus1 Ventures" }],
  alternates: {
    canonical: "https://nplus1ventures.com",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://nplus1ventures.com",
    siteName: "nPlus1 Ventures",
    title: "nPlus1 Ventures | Go-To-Market Consulting",
    description:
      "Expert go-to-market consulting for ambitious B2B teams. Strategy, execution, and growth — all under one roof.",
  },
  twitter: {
    card: "summary_large_image",
    title: "nPlus1 Ventures | Go-To-Market Consulting",
    description:
      "Expert go-to-market consulting for ambitious B2B teams. Strategy, execution, and growth — all under one roof.",
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
