import { DM_Sans, Instrument_Serif } from "next/font/google";
import { Metadata } from "next";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-instrument-serif",
  weight: ["400"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Portfolio | Case Studies & GTM Frameworks | n+α",
  description: "Explore selected work and stylized GTM frameworks by n+α. See how we architect growth marketing and revenue operations for B2B SaaS companies.",
  alternates: {
    canonical: "https://nplusalpha.com/portfolio",
  },
  openGraph: {
    title: "Portfolio | Case Studies & GTM Frameworks | n+α",
    description: "Explore selected work and stylized GTM frameworks by n+α. See how we architect growth marketing and revenue operations for B2B SaaS companies.",
    url: "https://nplusalpha.com/portfolio",
    type: "website",
  },
};

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${dmSans.variable} ${instrumentSerif.variable} font-sans`}>
      {children}
    </div>
  );
}
