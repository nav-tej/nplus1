import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-geist-sans",
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
    "nPlus1 Ventures helps ambitious B2B companies build and execute repeatable go-to-market strategies that drive revenue growth. GTM strategy, demand generation, sales enablement, and revenue operations.",
  keywords: [
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
  ],
  authors: [{ name: "nPlus1 Ventures" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://nplus1ventures.com",
    siteName: "nPlus1 Ventures",
    title: "nPlus1 Ventures | Go-To-Market Consulting",
    description:
      "Expert go-to-market consulting for ambitious B2B teams. Strategy, execution, and growth — all under one roof.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "nPlus1 Ventures — Go-To-Market Consulting",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "nPlus1 Ventures | Go-To-Market Consulting",
    description:
      "Expert go-to-market consulting for ambitious B2B teams. Strategy, execution, and growth — all under one roof.",
    images: ["/og-image.png"],
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
        <link rel="canonical" href="https://nplus1ventures.com" />
      </head>
      <body className={`${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
