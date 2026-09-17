import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { SITE_CONFIG } from "@/lib/constants";

const TITLE =
  "Fractional CMO vs Agency vs Full-Time Hire: How to Choose";
const DESCRIPTION =
  "An honest comparison of the three ways to fix B2B marketing leadership: a fractional CMO, an agency, or a full-time VP. What each one is good at, what each costs you, and when to pick which.";

export const metadata: Metadata = {
  title: `${TITLE} | n+α Ventures`,
  description: DESCRIPTION,
  alternates: {
    canonical: `https://${SITE_CONFIG.domain}/fractional-cmo-vs-agency`,
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `https://${SITE_CONFIG.domain}/fractional-cmo-vs-agency`,
    type: "article",
  },
};

const FAQS = [
  {
    question: "What does a fractional CMO cost compared to a full-time VP?",
    answer:
      "A full-time VP of Marketing in a US tech hub runs well into the mid six figures once you include equity, benefits and payroll costs, plus three to six months of recruiting before anyone starts. A fractional engagement is usually a fraction of that because you are buying a slice of someone's week rather than all of it. The real comparison is not the hourly number, it is what you get in the first 90 days for the money you spend in those 90 days.",
  },
  {
    question: "Can a fractional CMO replace an agency?",
    answer:
      "They solve different problems. An agency supplies execution capacity: people who write, design, run ads and ship campaigns. A fractional leader supplies judgment about what should be executed and builds the systems that make execution measurable. Plenty of companies need both, and the common failure is hiring the agency first, then discovering nobody internally can tell whether the agency is working.",
  },
  {
    question: "When should you hire full-time instead?",
    answer:
      "When the strategy is settled, the motion is repeatable, and the job has become running a team rather than building a function. At that point you want someone whose whole week belongs to you, who can hire and develop people, and who will still be there in three years. A good fractional engagement should be actively working toward that handoff.",
  },
  {
    question: "How long should a fractional engagement run?",
    answer:
      "Long enough to build something that survives the exit. Three to six months is typical for a foundation engagement, longer where the person is also running a function. Be suspicious of open-ended retainers with no defined endpoint, and be equally suspicious of a 30 day engagement promising a transformed funnel.",
  },
];

const ROWS: { label: string; fractional: string; agency: string; hire: string }[] =
  [
    {
      label: "Best at",
      fractional: "Strategy, systems, and unblocking a stuck funnel",
      agency: "Execution capacity and specialist channel skill",
      hire: "Running and growing a team over years",
    },
    {
      label: "Time to value",
      fractional: "Days. They start in the same week you decide",
      agency: "Weeks, after onboarding and a discovery phase",
      hire: "Three to six months of recruiting, then ramp",
    },
    {
      label: "Cost shape",
      fractional: "Monthly, scoped, stops when you stop",
      agency: "Retainer plus media, usually scaling with output",
      hire: "Salary, equity, benefits, and severance risk",
    },
    {
      label: "Fails when",
      fractional: "You need volume of hands, not direction",
      agency: "Nobody internally can judge the work",
      hire: "The strategy is not settled enough to hire against",
    },
    {
      label: "Leaves behind",
      fractional: "Systems, definitions and documented playbooks",
      agency: "Campaign output, and dependency on the agency",
      hire: "A team and institutional knowledge",
    },
  ];

export default function ComparisonPage() {
  return (
    <>
      <JsonLd
        type="Article"
        title={TITLE}
        description={DESCRIPTION}
        path="/fractional-cmo-vs-agency"
        datePublished="2026-09-17"
        dateModified="2026-09-17"
        faqs={FAQS}
        breadcrumbs={[
          { name: "Home", item: "/" },
          { name: "Fractional CMO vs Agency vs Hire", item: "/fractional-cmo-vs-agency" },
        ]}
      />
      <Navbar />
      <main id="main-content" className="pt-32 pb-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="max-w-4xl">
            <nav
              className="flex items-center gap-2 text-sm text-muted mb-8"
              aria-label="Breadcrumb"
            >
              <Link href="/" className="hover:text-foreground transition-colors">
                Home
              </Link>
              <span className="text-white/20">/</span>
              <span className="text-foreground/60">
                Fractional CMO vs Agency vs Hire
              </span>
            </nav>

            <h1 className="text-4xl lg:text-6xl font-extrabold tracking-tight mb-8">
              Fractional CMO, agency, or a full-time hire?{" "}
              <span className="text-muted">Pick the one that fits.</span>
            </h1>
            <p className="text-xl text-muted leading-relaxed mb-12">
              I am a fractional operator, so treat this page accordingly. I have
              still tried to write the version I would want to read if I were
              the one deciding, including the cases where hiring me would be the
              wrong call.
            </p>

            <section className="mb-16">
              <h2 className="text-3xl font-bold mb-6">
                The question underneath the question
              </h2>
              <div className="space-y-5 text-lg text-muted leading-relaxed">
                <p>
                  Most companies phrase this as a budget decision. It is
                  usually a diagnosis problem. Before comparing options, work
                  out which of these is actually true for you, because each one
                  points somewhere different.
                </p>
                <p>
                  <span className="text-foreground font-semibold">
                    You do not know what to do.
                  </span>{" "}
                  Pipeline is flat, the theories are competing, and nobody
                  senior enough owns the answer. Hiring execution capacity here
                  buys you faster movement in an unknown direction.
                </p>
                <p>
                  <span className="text-foreground font-semibold">
                    You know what to do and cannot get it done.
                  </span>{" "}
                  The plan is sound, the team is small, and the work is
                  specialist. This is what agencies are for.
                </p>
                <p>
                  <span className="text-foreground font-semibold">
                    You know what to do, you are doing it, and it needs an
                    owner.
                  </span>{" "}
                  The motion is repeatable and the job has become management.
                  Hire someone full-time.
                </p>
              </div>
            </section>

            <section className="mb-16">
              <h2 className="text-3xl font-bold mb-8">Side by side</h2>
              <div className="overflow-x-auto rounded-2xl border border-white/10">
                <table className="w-full min-w-[720px] text-sm">
                  <thead>
                    <tr className="border-b border-white/10 bg-white/[0.03]">
                      <th className="text-left font-semibold p-4 w-32" />
                      <th className="text-left font-semibold p-4 text-accent">
                        Fractional leader
                      </th>
                      <th className="text-left font-semibold p-4">Agency</th>
                      <th className="text-left font-semibold p-4">
                        Full-time hire
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {ROWS.map((row) => (
                      <tr
                        key={row.label}
                        className="border-b border-white/5 last:border-0"
                      >
                        <th
                          scope="row"
                          className="text-left align-top p-4 font-semibold text-muted"
                        >
                          {row.label}
                        </th>
                        <td className="align-top p-4 text-muted">
                          {row.fractional}
                        </td>
                        <td className="align-top p-4 text-muted">
                          {row.agency}
                        </td>
                        <td className="align-top p-4 text-muted">{row.hire}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section className="mb-16">
              <h2 className="text-3xl font-bold mb-6">
                When not to hire a fractional CMO
              </h2>
              <div className="space-y-5 text-lg text-muted leading-relaxed">
                <p>
                  When what you need is thirty landing pages by the end of the
                  quarter. That is a capacity problem and an agency or a
                  contractor will serve you better and cheaper.
                </p>
                <p>
                  When you do not have product-market fit. Marketing leadership
                  will make an unclear value proposition more visible, not more
                  compelling, and you will spend the money finding that out.
                </p>
                <p>
                  When leadership has not agreed on the strategy. A fractional
                  operator can arbitrate a disagreement about tactics. They
                  cannot resolve a founder-level disagreement about what the
                  company is, and taking the engagement anyway wastes everyone's
                  money.
                </p>
              </div>
            </section>

            <section className="mb-16">
              <h2 className="text-3xl font-bold mb-6">
                What to ask whichever way you go
              </h2>
              <ul className="space-y-4 text-lg text-muted leading-relaxed list-none p-0">
                <li className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                  <span className="text-foreground font-semibold">
                    What will exist after you leave?
                  </span>{" "}
                  Systems and documentation, or a dependency.
                </li>
                <li className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                  <span className="text-foreground font-semibold">
                    How will we know it worked?
                  </span>{" "}
                  If the answer is a vanity metric, or if nobody can define the
                  metric precisely, that is the first problem to solve.
                </li>
                <li className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                  <span className="text-foreground font-semibold">
                    Show me the last time this failed.
                  </span>{" "}
                  Anyone who has run real engagements has one. The answer tells
                  you more than the case studies do.
                </li>
              </ul>
            </section>

            <section className="mb-16">
              <h2 className="text-3xl font-bold mb-8">Common questions</h2>
              <div className="space-y-4">
                {FAQS.map((faq) => (
                  <details
                    key={faq.question}
                    className="group rounded-xl border border-white/[0.06] bg-white/[0.02] overflow-hidden"
                  >
                    <summary className="flex items-center justify-between gap-4 px-5 lg:px-6 py-5 cursor-pointer list-none">
                      <h3 className="text-base font-semibold">
                        {faq.question}
                      </h3>
                      <span className="text-accent text-xl transition-transform duration-300 group-open:rotate-45">
                        +
                      </span>
                    </summary>
                    <div className="px-5 lg:px-6 pb-5 lg:pb-6 text-muted leading-relaxed">
                      {faq.answer}
                    </div>
                  </details>
                ))}
              </div>
            </section>

            <section className="rounded-3xl border border-white/10 bg-white/[0.02] p-8 mb-16">
              <h2 className="text-sm font-bold uppercase tracking-widest text-muted mb-5">
                If a fractional engagement is the answer
              </h2>
              <p className="text-muted leading-relaxed mb-6">
                Six engagements, written up with what was built and what moved.
                Read those before you talk to anyone, including me.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/case-studies"
                  className="rounded-full border border-white/10 px-5 py-2.5 text-sm font-medium hover:border-accent/40 hover:text-accent transition-colors"
                >
                  Case studies
                </Link>
                <Link
                  href="/results"
                  className="rounded-full border border-white/10 px-5 py-2.5 text-sm font-medium hover:border-accent/40 hover:text-accent transition-colors"
                >
                  The numbers
                </Link>
                <Link
                  href="/framework"
                  className="rounded-full border border-white/10 px-5 py-2.5 text-sm font-medium hover:border-accent/40 hover:text-accent transition-colors"
                >
                  How I work
                </Link>
              </div>
            </section>

            <div className="text-center">
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-8 py-4 text-base font-semibold text-[#0B1221] hover:shadow-[0_0_40px_rgba(46,204,113,0.4)] hover:brightness-110 transition-all duration-300"
              >
                Talk through your situation
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
