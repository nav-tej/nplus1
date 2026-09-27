/**
 * Homepage data for the n+α brand components. Every figure here is already
 * published elsewhere on the site (constants.ts FOUNDER, case-studies.ts); do not
 * add a number that is not. Curves are stylized shapes, not client data.
 */

export type Pair = [value: string, label: string];

export interface Stop {
  years: string;
  org: string;
  role: string;
  m: string;
  ml: string;
  cat: string;
  now?: boolean;
}

export interface CaseCard {
  slug: string;
  org: string;
  cat: string;
  years: string;
  title: string;
  metrics: Pair[];
  curve: number[];
  variant?: "curve" | "steps";
  fig?: string;
  figLabel?: string;
}

export const TRACK: Stop[] = [
  { years: "2017–19", org: "a16z", role: "Partner", m: "20+", ml: "portfolio companies advised on GTM", cat: "Venture" },
  { years: "2019–22", org: "Egnyte", role: "Sr. Director, Marketing Ops", m: "5×", ml: "marketing-sourced pipeline, $50M to $250M", cat: "Enterprise content" },
  { years: "2022–24", org: "Semgrep", role: "Head of Revenue Operations", m: "5×", ml: "revenue growth YoY, CAC down 40%", cat: "DevSecOps" },
  { years: "2024–26", org: "HeyGen", role: "Head of Revenue Operations", m: "$100M+", ml: "ARR, up from $20M in 21 months", cat: "AI video" },
  { years: "2026", org: "Comfy", role: "Growth lead", m: "0 → 1", ml: "growth analytics foundation", cat: "Open-source AI" },
  { years: "Now", org: "n+α", role: "Founder, fractional VP Marketing + RevOps", m: "2–3", ml: "companies at a time", cat: "Your company", now: true },
];

export const CASES: CaseCard[] = [
  { slug: "heygen", org: "HeyGen", cat: "AI video", years: "2024–26", title: "Five systems behind 5× ARR growth at the leader in AI video.", metrics: [["$20M → $100M+", "ARR in 21 months"], ["100K+", "community members"]], curve: [20, 23, 28, 35, 44, 55, 68, 84, 100], fig: "5×", figLabel: "ARR growth in 21 months" },
  { slug: "semgrep", org: "Semgrep", cat: "DevSecOps", years: "2022–24", title: "Selling security to developers who distrust marketing.", metrics: [["5×", "revenue growth YoY"], ["−40%", "CAC"]], curve: [10, 12, 16, 22, 30, 39, 50] },
  { slug: "egnyte", org: "Egnyte", cat: "Enterprise content", years: "2019–22", title: "Beating the cloud storage giants by changing the question.", metrics: [["$50M → $250M", "marketing-sourced pipeline"], ["15", "person marketing ops team"]], curve: [50, 62, 80, 105, 140, 190, 250] },
  { slug: "comfy", org: "Comfy", cat: "Open-source AI", years: "2026", title: "Organic growth, and the analytics foundation underneath it.", metrics: [["48 hrs", "model release SEO playbook"], ["3 lanes", "SEO, PLG and sales-led demand"]], variant: "steps", curve: [2, 3, 5, 8, 12, 17, 23] },
  { slug: "charta-health", org: "Charta Health", cat: "Healthcare AI", years: "2026", title: "A growth foundation, with agents doing the research and drafting.", metrics: [["3", "workstreams, one engagement"], ["90 days", "execution roadmap"]], variant: "steps", curve: [3, 4, 6, 9, 13, 18, 24] },
  { slug: "openblock-labs", org: "OpenBlock Labs", cat: "Onchain data", years: "2026", title: "Launch strategy, and the instrumentation to know if it worked.", metrics: [["Pre-launch", "instrumented, not retrofitted"], ["0 → 1", "growth analytics framework"]], variant: "steps", curve: [1, 2, 4, 7, 11, 16], fig: "0 → 1", figLabel: "instrumented before launch" },
];

export const PROCESS = [
  { n: "01", t: "Diagnose", b: "Audit the GTM motion end to end. Find the pipeline leaks, the messaging gaps and the data you are missing.", w: "Weeks 1–3" },
  { n: "02", t: "Architect", b: "Design the strategy, systems and frameworks. ICP, positioning, channel mix, stack and the dashboards that prove it.", w: "Weeks 3–6" },
  { n: "03", t: "Accelerate", b: "Ship it with your team. Agents handle research and ops work. We measure weekly and cut what does not move pipeline.", w: "Months 2–6" },
];
