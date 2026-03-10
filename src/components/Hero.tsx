import Link from "next/link";
import { SITE_CONFIG } from "@/lib/constants";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-accent/[0.07] rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-accent/[0.04] rounded-full blur-[120px] pointer-events-none" />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10 pt-28 pb-20 w-full">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-16 lg:gap-20 items-center">
          {/* Left */}
          <div>
            {/* Badge */}
            <div className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 mb-10">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-sm text-muted">
                Go-to-market consulting for ambitious teams
              </span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-[4.5rem] font-bold tracking-tight leading-[1.05] mb-7">
              Your growth.
              <br />
              <span className="bg-gradient-to-r from-accent to-[#27AE60] bg-clip-text text-transparent">
                Catalyzed.
              </span>
            </h1>

            <p className="text-lg lg:text-xl text-muted leading-relaxed mb-10 max-w-lg">
              {SITE_CONFIG.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href={SITE_CONFIG.calendarLink}
                className="inline-flex items-center justify-center gap-2.5 rounded-full bg-accent px-8 py-4 text-base font-semibold text-[#0B1221] hover:shadow-[0_0_30px_rgba(46,204,113,0.3)] hover:brightness-110 transition-all duration-300 group"
              >
                Start a project
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden="true"
                  className="transition-transform group-hover:translate-x-1"
                >
                  <path
                    d="M3 8h10m0 0L9 4m4 4L9 12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
              <Link
                href="#services"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 px-8 py-4 text-base font-medium text-foreground hover:bg-white/[0.04] hover:border-white/20 transition-all duration-300"
              >
                Learn more
              </Link>
            </div>
          </div>

          {/* Right — Stats */}
          <div className="grid grid-cols-2 gap-5">
            {[
              { value: "50+", label: "Companies Scaled" },
              { value: "3x", label: "Avg Pipeline Growth" },
              { value: "90%", label: "Client Retention" },
              { value: "<6mo", label: "Time to Impact" },
            ].map((stat, i) => (
              <div
                key={stat.label}
                className={`group relative rounded-2xl border border-white/[0.06] bg-white/[0.015] p-7 lg:p-9 text-center hover:border-accent/20 transition-all duration-500 ${
                  i === 0 ? "lg:-translate-y-3" : ""
                } ${i === 3 ? "lg:translate-y-3" : ""}`}
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-accent/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative">
                  <div className="text-4xl lg:text-5xl font-bold text-accent mb-2 tracking-tight">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
