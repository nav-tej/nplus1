export const SITE_CONFIG = {
  name: "n+α Ventures",
  domain: "nplusalpha.com",
  tagline: "AI-Native GTM Architect",
  description:
    "n+α Ventures helps ambitious B2B companies build and execute repeatable go-to-market strategies that drive revenue growth.",
  email: "hello@nplusalpha.com",

  calendarLink: "/book",
};


export const NAV_LINKS = [
  { label: "Work", href: "/case-studies" },
  { label: "Services", href: "/services" },
  { label: "Tools", href: "/tools/funnel-velocity" },
  { label: "Writing", href: "/blog" },
  { label: "About", href: "/about" },
];

/** How to work together. Each engagement has an anchor on /services. */
export const ENGAGEMENTS = [
  {
    id: "fractional",
    label: "Fractional VP Marketing + RevOps",
    summary: "I run marketing and revenue operations from inside your leadership team.",
    body: "I join the leadership meeting, manage the team and the agencies, and own the pipeline number with you. It is the seat I held at HeyGen and Semgrep, part time. It fits when you need a GTM leader before you are ready to hire one full time.",
    terms: "3-month minimum",
  },
  {
    id: "build",
    label: "System build",
    summary: "One GTM system, designed and shipped with your team.",
    body: "A demand engine, a RevOps stack, an attribution model or a growth analytics foundation, scoped before we start. I build it with your team, agents do the research and ops work, and it is handed off with documentation and an owner.",
    terms: "3 months, fixed scope",
  },
  {
    id: "advisory",
    label: "Advisory",
    summary: "A weekly working session with the founder and GTM leads.",
    body: "For teams that already have operators and want someone who has run the next stage. We meet weekly, I review the team's work between sessions, and I help you hire the next GTM leaders.",
    terms: "3-month minimum",
  },
];

/** What the work covers. The ids keep the old /services/<slug> URLs pointing somewhere useful. */
export const SERVICE_AREAS = [
  {
    id: "growth-marketing",
    label: "Growth marketing",
    body: "Positioning, brand, SEO, community and lifecycle. The programs behind HeyGen's growth from $20M to $100M+ ARR in 21 months.",
  },
  {
    id: "demand-generation",
    label: "Demand generation",
    body: "ABM, signal-based outbound, content and paid, measured in pipeline. $400M+ in marketing-sourced pipeline across my operating roles.",
  },
  {
    id: "revenue-operations",
    label: "Revenue operations",
    body: "GTM systems architecture, forecasting, attribution and pipeline analytics. At Egnyte I ran marketing ops while marketing-sourced pipeline grew from $50M to $250M.",
  },
];

export const ENGAGEMENT_TERMS = [
  {
    title: "Three-month minimum",
    body: "A quarter is long enough to diagnose, build and see the first numbers move. After that we go month to month.",
  },
  {
    title: "A scoped monthly fee",
    body: "The fee depends on the engagement type and how much of my week it takes. I share numbers on the first call, once I understand the problem.",
  },
  {
    title: "Equity, for companies I believe in",
    body: "When I want to bet on a company, I take part of the fee as equity, which lowers the cash fee.",
  },
];

export const SERVICES = [
  {
    step: 1,
    title: "GTM Strategy",
    description:
      "We build a data-driven go-to-market strategy tailored to your product, market, and growth stage. From ICP definition to channel prioritization.",
    icon: "strategy",
  },
  {
    step: 2,
    title: "Market Positioning",
    description:
      "Craft compelling positioning and messaging that differentiates you from competitors and resonates with your ideal buyers.",
    icon: "positioning",
  },
  {
    step: 3,
    title: "Demand Generation",
    description:
      "Launch multi-channel demand generation programs that create awareness, drive pipeline, and accelerate your sales cycle.",
    icon: "demand",
  },
  {
    step: 4,
    title: "Sales Enablement",
    description:
      "Equip your sales team with the playbooks, collateral, and processes needed to close deals faster and more consistently.",
    icon: "sales",
  },
  {
    step: 5,
    title: "Revenue Operations",
    description:
      "Align marketing, sales, and customer success with unified data, processes, and technology to maximize revenue efficiency.",
    icon: "revops",
  },
  {
    step: 6,
    title: "Growth Analytics",
    description:
      "Instrument your funnel, track leading indicators, and build dashboards that give you real-time visibility into what's working.",
    icon: "analytics",
  },
];

export const PROCESS_STEPS = [
  {
    number: "01",
    title: "Discovery & Audit",
    description:
      "Deep dive into your current GTM motion, market landscape, competitive positioning, and growth opportunities.",
  },
  {
    number: "02",
    title: "Strategy Design",
    description:
      "Build a comprehensive go-to-market plan with clear objectives, target segments, messaging frameworks, and channel strategies.",
  },
  {
    number: "03",
    title: "Execution Sprint",
    description:
      "Rapidly implement high-impact initiatives, from campaign launches to sales process optimization, with clear and measurable milestones.",
  },
  {
    number: "04",
    title: "Measure & Optimize",
    description:
      "Continuously analyze performance data, run experiments, and iterate on what works to compound your growth over time.",
  },
];

export const FAQS = [
  {
    question: "What types of companies do you work with?",
    answer:
      "B2B SaaS and AI companies from Series A through C. They have product-market fit and need the go-to-market engine to keep up with the product.",
  },
  {
    question: "How does an engagement work?",
    answer:
      "Every engagement starts with a three-week diagnosis of the funnel, the data and the team. Then I design the system and build it with your team, with a milestone every two weeks. The minimum is three months.",
  },
  {
    question: "What makes n+α different from other consultancies?",
    answer:
      "You work with me directly. I ran these systems from the operating seat at HeyGen, Semgrep and Egnyte, and I stay in the work through execution, with AI agents doing the research and ops work that usually needs a bigger team.",
  },
  {
    question: "How do you charge?",
    answer:
      "A monthly fee with a three-month minimum, scoped to the engagement type. For companies I believe in, I take part of the fee as equity. I share numbers on the first call.",
  },
  {
    question: "What are the next steps to get started?",
    answer:
      "Book the 15-minute call. If there is a fit, I send a short scope with the engagement type, the first three months and the terms.",
  },
];

export const FOUNDER = {
  name: "Nav Singh",
  alternateName: "Navtej Singh",
  title: "Founder & Managing Partner",
  location: "San Francisco, California",
  linkedin: "https://www.linkedin.com/in/navtejs",
  twitter: "https://x.com/navtejs",
  stats: [
    { value: "$500M+", label: "Revenue Growth" },
    { value: "$400M+", label: "Pipeline Generated" },
    { value: "20+", label: "Companies Advised" },
    { value: "5×", label: "Avg ARR Growth" },
  ],
  experience: [
    {
      company: "HeyGen",
      role: "Head of Revenue Operations",
      period: "Apr 2024–Jan 2026",
      location: "San Francisco, CA",
      highlight: "$20M → $100M+ ARR",
      description:
        "Drove 5× ARR growth from $20M to over $100M. We built an SEO program, a 100K+ member community platform, and a $25M ABM enterprise pipeline, reporting directly to the CEO.",
    },
    {
      company: "Semgrep",
      role: "Head of Revenue Operations",
      period: "May 2022–Jan 2024",
      location: "San Francisco, CA",
      highlight: "5× Revenue YoY",
      description:
        "Achieved 5× year-over-year revenue growth. We built a PLG onboarding process that reduced CAC by 40% and integrated the full MarTech stack.",
    },
    {
      company: "Egnyte",
      role: "Sr. Director, Marketing Operations",
      period: "Nov 2019–May 2022",
      location: "Mountain View, CA",
      highlight: "$50M → $250M Pipeline",
      description:
        "Led a 15-person marketing operations team. We grew marketing-sourced pipeline 5× from $50M to $250M and spearheaded a complete brand refresh.",
    },
    {
      company: "a16z",
      role: "Partner",
      period: "Jul 2017–Nov 2019",
      location: "San Francisco, CA",
      highlight: "20+ Portfolio Companies",
      description:
        "Advised 20+ portfolio companies on GTM strategy. Produced 200+ events including the a16z Summit. Recipient of a16z Above & Beyond Award (2017).",
    },
  ],
  certifications: [
    "Marketo",
    "Salesforce",
    "HubSpot",
    "Customer.io",
    "PostHog",
    "Google Analytics",
    "6Sense",
    "LinkedIn Ads",
    "Polytomic",
    "Snowflake",
    "Clay",
    "Claude",
  ],
  advisory: ["Akasa", "Skydio", "Pylon", "Cast.app", "Gradual"],
};

export const TESTIMONIALS = [
  {
    quote:
      "Partnered with n+α to develop a comprehensive GTM strategy for new market expansion. They mapped our ideal customer segments, built a multi-channel launch playbook, and helped us accelerate pipeline growth across three new verticals.",
    company: "HeyGen",
    logo: "/logos/heygen.svg",
  },
  {
    quote:
      "n+α designed and executed a developer-focused demand generation engine from the ground up. They built targeted campaigns, optimized our content funnel, and delivered measurable pipeline growth that compounded quarter over quarter.",
    company: "Semgrep",
    logo: "/logos/semgrep.svg",
  },
  {
    quote:
      "Brought in n+α to overhaul our sales enablement and revenue operations. They built new playbooks, aligned our CRM workflows, and created dashboards that gave leadership real-time visibility into deal progression and forecast accuracy.",
    company: "Egnyte",
    logo: "/logos/egnyte.svg",
  },
  {
    quote:
      "n+α has been instrumental in shaping our product launch strategy and building a growth analytics framework from the ground up. They helped us define our go-to-market motion, set up the data infrastructure to track what matters, and delivered actionable insights that accelerated our early traction.",
    company: "OpenBlock Labs",
    logo: "/logos/openblock.svg",
  },
];
