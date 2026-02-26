import { PROCESS_STEPS } from "@/lib/constants";

export default function Process() {
  return (
    <section id="process" className="py-24 lg:py-32 border-t border-white/5">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left — Header */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <p className="text-accent text-sm font-medium tracking-wider uppercase mb-4">
              Our Process
            </p>
            <h2 className="text-4xl lg:text-5xl font-bold tracking-tight mb-6">
              From insight
              <br />
              to <span className="text-accent">impact.</span>
            </h2>
            <p className="text-lg text-muted leading-relaxed mb-8 max-w-md">
              A proven four-phase framework that turns market understanding into
              repeatable revenue growth.
            </p>
            <div className="h-px bg-gradient-to-r from-accent/40 to-transparent w-32" />
          </div>

          {/* Right — Steps */}
          <div className="space-y-6">
            {PROCESS_STEPS.map((step) => (
              <div
                key={step.number}
                className="group rounded-2xl border border-white/[0.06] bg-white/[0.02] p-7 lg:p-8 hover:border-accent/20 transition-all duration-300"
              >
                <div className="flex items-start gap-5">
                  <span className="text-3xl font-bold text-accent/30 group-hover:text-accent transition-colors duration-300 font-mono">
                    {step.number}
                  </span>
                  <div>
                    <h3 className="text-xl font-semibold mb-3">
                      {step.title}
                    </h3>
                    <p className="text-muted leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
