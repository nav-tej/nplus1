import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Process from "@/components/Process";
import About from "@/components/About";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";

// Below-fold "use client" components — split into separate JS chunks
const Services = dynamic(() => import("@/components/Services"));
const Testimonials = dynamic(() => import("@/components/Testimonials"));

export default function Home() {
  return (
    <>
      <JsonLd />
      <Navbar />
      <main id="main-content">
        <Hero />
        <Services />
        <Process />
        <Testimonials />
        <About />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
