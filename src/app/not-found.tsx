import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Page Not Found",
};

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main
        id="main-content"
        className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center"
      >
        <p className="text-sm font-semibold text-orange-400 tracking-wide uppercase mb-4">
          404
        </p>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground tracking-tight mb-4">
          Page not found
        </h1>
        <p className="text-muted text-lg max-w-md mb-10 leading-relaxed">
          This page doesn&apos;t exist. You may have followed a broken link or
          mistyped the URL.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full bg-accent px-8 py-4 text-base font-semibold text-[#0B1221] hover:shadow-[0_0_30px_rgba(46,204,113,0.3)] hover:brightness-110 transition-all duration-300"
        >
          Back to home
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M1 7h12m0 0L8 2m5 5L8 12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      </main>
      <Footer />
    </>
  );
}
