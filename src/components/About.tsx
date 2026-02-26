export default function About() {
  return (
    <section id="about" className="py-24 lg:py-32 border-t border-white/5">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left */}
          <div>
            <p className="text-accent text-sm font-medium tracking-wider uppercase mb-4">
              About Us
            </p>
            <h2 className="text-4xl lg:text-5xl font-bold tracking-tight mb-6">
              Operators, not
              <br />
              <span className="text-accent">just advisors.</span>
            </h2>
            <p className="text-lg text-muted leading-relaxed mb-6">
              nPlus1 Ventures was founded by go-to-market practitioners who have
              built and scaled revenue engines at high-growth startups and
              Fortune 500 companies alike.
            </p>
            <p className="text-lg text-muted leading-relaxed">
              We believe great GTM strategy is useless without flawless
              execution. That&apos;s why we don&apos;t just deliver a deck — we
              embed with your team, build the systems, and stay accountable to
              the outcomes.
            </p>
          </div>

          {/* Right — Values */}
          <div className="grid grid-cols-2 gap-5">
            {[
              {
                title: "Strategic Rigor",
                desc: "Every recommendation is grounded in data, market research, and proven frameworks.",
              },
              {
                title: "Execution Speed",
                desc: "We move fast without cutting corners. Weeks, not quarters, to first impact.",
              },
              {
                title: "Full Accountability",
                desc: "We tie our work to revenue outcomes, not vanity metrics or slide decks.",
              },
              {
                title: "Knowledge Transfer",
                desc: "We build your team's capabilities so growth continues long after we leave.",
              },
            ].map((v) => (
              <div
                key={v.title}
                className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 hover:border-accent/20 transition-colors duration-300"
              >
                <h3 className="font-semibold mb-2">{v.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
