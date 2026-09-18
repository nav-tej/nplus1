/**
 * Case study content.
 *
 * Every case study is listed here so the index page, the sitemap, the llms.txt
 * feed and the "more work" cross-links stay in sync. Studies flagged with
 * `hasCustomPage` keep their own route file (HeyGen has a bespoke video
 * layout); the rest render from `sections` via /case-studies/[slug].
 */

export interface CaseStudyMetric {
  value: string;
  label: string;
}

export interface CaseStudyBullet {
  title: string;
  text: string;
}

export interface CaseStudySection {
  heading: string;
  body: string[];
  bullets?: CaseStudyBullet[];
}

export interface CaseStudyFaq {
  question: string;
  answer: string;
}

export interface CaseStudy {
  slug: string;
  /** Client name as it should appear in copy and schema. */
  client: string;
  clientUrl?: string;
  industry: string;
  /** Shape of the engagement, used on cards. */
  engagement: string;
  period: string;
  /** Pill above the headline. */
  badge: string;
  title: string;
  /** Second half of the headline, rendered muted. */
  titleAccent: string;
  metaTitle: string;
  metaDescription: string;
  /** One paragraph deck, reused as the card description. */
  summary: string;
  /** Service pages this engagement maps to, for internal linking. */
  services: { label: string; href: string }[];
  metrics: CaseStudyMetric[];
  sections: CaseStudySection[];
  faqs: CaseStudyFaq[];
  publishDate: string;
  dateModified: string;
  /** True when the study has a hand-built route instead of [slug]. */
  hasCustomPage?: boolean;
}

const GROWTH_MARKETING = {
  label: "Growth Marketing",
  href: "/services/growth-marketing",
};
const DEMAND_GEN = {
  label: "Demand Generation",
  href: "/services/demand-generation",
};
const REVOPS = {
  label: "Revenue Operations",
  href: "/services/revenue-operations",
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "heygen",
    client: "HeyGen",
    clientUrl: "https://www.heygen.com",
    industry: "AI video · B2B SaaS",
    engagement: "Head of Revenue Operations",
    period: "2024 to 2026",
    badge: "$20M → $100M+ ARR",
    title: "Scaling HeyGen:",
    titleAccent: "The GTM Playbook.",
    metaTitle: "HeyGen GTM Case Study: $20M to $100M ARR",
    metaDescription:
      "How n+α helped scale HeyGen from $20M to $100M+ ARR through a complete GTM rebrand, SEO, and community construction.",
    summary:
      "Five interlocking systems behind 5x ARR growth at the leader in AI video: a strategic rebrand, an SEO program built from zero, a 100,000 member community, AI-native lifecycle automation, and an enterprise ABM motion.",
    services: [GROWTH_MARKETING, DEMAND_GEN, REVOPS],
    metrics: [
      { value: "5x", label: "ARR growth in 21 months" },
      { value: "50%+", label: "YoY organic traffic growth" },
      { value: "100K+", label: "Community members" },
      { value: "$25M", label: "Enterprise ABM pipeline" },
    ],
    sections: [],
    faqs: [],
    publishDate: "2024-04-01",
    dateModified: "2026-09-17",
    hasCustomPage: true,
  },
  {
    slug: "comfy",
    client: "Comfy",
    clientUrl: "https://www.comfy.org",
    industry: "Open-source AI · Developer tools",
    engagement: "Growth lead: SEO, analytics, lifecycle",
    period: "2026 to present",
    badge: "Open source, measured properly",
    title: "Comfy:",
    titleAccent: "Organic growth, and the analytics foundation underneath it.",
    metaTitle: "Comfy Case Study: Open-Source SEO and Growth Analytics",
    metaDescription:
      "Rebuilding organic growth for comfy.org: index recovery, a non-branded page network, answer-engine optimization, and the growth analytics foundation the team runs on. Written by the operator running it.",
    summary:
      "Comfy builds ComfyUI, one of the largest open-source generative AI projects, plus the cloud platform around it. Huge audience, huge traffic, and very little of it captured on purpose. I lead growth there. This is the organic engine and the measurement layer we built underneath it. The program is early and still compounding, so what follows is the approach and the direction of travel.",
    services: [GROWTH_MARKETING, DEMAND_GEN, REVOPS],
    metrics: [
      { value: "0 → 1", label: "Growth analytics foundation" },
      { value: "3 lanes", label: "SEO, product-led and sales-led demand" },
      { value: "48 hrs", label: "Model release SEO playbook" },
      { value: "Daily", label: "Automated growth pre-read" },
    ],
    sections: [
      {
        heading: "What I walked into",
        body: [
          "Open source hands you distribution most companies would pay millions for. It does not hand you a growth engine, and Comfy had two problems feeding each other.",
          "The first was concentration. The overwhelming majority of organic traffic arrived on brand searches and landed on two pages. Rankings were fine, and that was the trap: the head term held its position all year while click-through on it kept sliding, because AI Overviews had started answering in the results page. Search demand for the term was growing and clicks were falling at the same time. Everything non-branded, the searches where someone describes what they want to make rather than the tool they want to use, was going to venture-funded competitors with a fraction of the community.",
          "The second was measurement. The same question produced different answers depending on who ran it. Activation, signup and ARR had no agreed definition, dashboards were reading tables that had quietly gone stale, and identity was split across the desktop app, the cloud product and the website. Nobody could say which channel produced paying customers.",
        ],
      },
      {
        heading: "Getting the index back",
        body: [
          "Before any of the growth work, the site had to be crawlable again. An indexation incident in the spring knocked out a large share of indexed pages and, with them, most of a quarter of organic clicks.",
          "The causes were mundane and stacked on each other. Both www and apex served 200s with conflicting sitemaps. There was no canonical URL form, so every page existed twice. The robots.txt had grown a set of per-bot override groups, which under the robots standard cancel the disallow rules above them, because crawlers obey the most specific matching group and ignore the rest. And a batch of the heaviest pages exceeded the crawler fetch limit, which turns a page into a soft 404 without anyone being told.",
          "We picked apex as canonical, picked one trailing-slash convention and enforced it, collapsed robots.txt into a single stacked user-agent group, and rebuilt the sitemap so it agreed with the canonical form. Then the localization layer, where the Chinese-language marketing pages had no hreflang and no internal links from the English site, while a fifth of organic visitors were browsing in Chinese.",
        ],
        bullets: [
          {
            title: "One host, one URL form",
            text: "Apex canonical, one trailing-slash convention, sitemaps that match it. Index signals stop splitting across duplicates.",
          },
          {
            title: "A robots.txt that does what it reads like",
            text: "Per-bot groups collapsed into one stacked user-agent group, so the disallow rules apply to the bots they were written for.",
          },
          {
            title: "Locales that resolve",
            text: "Hreflang and crawlable internal links across locales, so non-English visitors stop landing on English pages.",
          },
        ],
      },
      {
        heading: "Getting off brand traffic",
        body: [
          "Brand traffic has a ceiling you do not control. It grows when the product gets famous and shrinks when an assistant absorbs the click.",
          "So we built the demand map first. Every use case and model people search for, scored on volume, difficulty, commercial value and fit with the customers sales was actually closing, each one carrying an estimated traffic value at position one. That is what let us argue about priority with numbers, not opinions.",
          "The finding that changed the roadmap: SEO demand and enterprise demand only partly overlap. That splits the work into three lanes rather than one ranked list. Pages that are high intent and high fit get built first. Pure traffic pages get built for volume and judged on volume. And the demand with real revenue behind it and no search volume at all, things like on-prem deployment and custom model training, belongs to sales, not to SEO. Writing that down stopped a quarter of arguing.",
          "Each page in the network is backed by one of the hundreds of real workflow templates. A thin generated page ranks for a week. A page with a working demo behind it earns links. The model release playbook does the same job on a clock: when a major model ships, the docs page, the template, the landing page and the announcement go out interlinked inside 48 hours, while the interest spike is still live.",
        ],
        bullets: [
          {
            title: "Scored, not guessed",
            text: "Every opportunity priced in estimated traffic value and ranked against ideal customer fit before anything gets built.",
          },
          {
            title: "Backed by working product",
            text: "Each landing page maps to a runnable workflow, so the page demonstrates the claim instead of describing it.",
          },
          {
            title: "Brand safety as a gate",
            text: "Face-swap, deepfake and clothes-remover categories stay excluded even where volume is large. We wrote the conditions down so the question stops getting re-litigated.",
          },
        ],
      },
      {
        heading: "Writing for the answer engines",
        body: [
          "A growing share of buyers never reach the site. They ask an assistant, and the assistant summarizes whatever it can parse. Comfy was thin here, cited on only a small fraction of the pages you would expect for a project that size.",
          "We treated it as a channel with its own work. A maintained llms.txt describing the whole product surface in plain language. Structured data on the page types that matter. Titles and descriptions written to be quoted, not tuned for density. And a pile of small repairs, including a routing bug in the static build that was collapsing both slash forms of the model URLs and quietly serving 404s to crawlers following dozens of internal links.",
          "The pattern worth stealing: the pages with the largest gap between impressions and clicks are almost never ranking problems. They are title and description problems, and they are the cheapest fix on any site.",
        ],
      },
      {
        heading: "The analytics foundation",
        body: [
          "None of it is worth much if you cannot tell whether it worked, so the other half of this job was building the measurement layer the growth team now runs on.",
          "We agreed the definitions and wrote them down. What counts as a signup, sourced from one canonical table after we measured every candidate event against ground truth and found the obvious one missing a large share of real signups. What counts as activation, inside what window. Which revenue basis a number is quoted on, since recognized and bookings differ enough to start an argument in a board meeting.",
          "Then identity, so a person is the same person across the open-source desktop app, the cloud product and the website. That is the piece that makes channel attribution possible at all, and it paid for itself the moment it worked: organic signups convert at a meaningfully higher rate than direct, and referrals from AI assistants convert higher still. Before this work nobody could produce that comparison, which meant nobody could justify the SEO investment.",
          "Then we made it self-serve. Dashboards rebuilt on live models, a glossary so every chart has a definition behind it, an event catalog and an enablement guide, and a scheduled agent that pulls the funnel from the warehouse every weekday morning and drafts the standup read before anyone opens a dashboard.",
        ],
        bullets: [
          {
            title: "Canonical definitions",
            text: "Signup, activation and ARR defined once, documented, and reused. No more re-deriving them per dashboard.",
          },
          {
            title: "Identity resolution",
            text: "One person across desktop, cloud and web, which is what turns channel attribution from a guess into a number.",
          },
          {
            title: "Self-serve by default",
            text: "Event catalog, glossary, enablement guide, and an agent that assembles the daily growth read automatically.",
          },
        ],
      },
      {
        heading: "Where it stands",
        body: [
          "This is early. The page network is still being built out, and the compounding part of SEO is the part that takes quarters rather than weeks. What has changed already is the shape of the thing: the site is crawlable again, the organic program has a scored roadmap instead of a brand term propping it up, the release playbook fires on every model launch, and the pages are written so machines can read them.",
          "The measurement side moved faster, because that work lands the day it ships. The growth team stopped arguing about whose number was right. One definition, one dashboard, and a daily read that arrives before standup. That is the boring half of growth work, and it is why everything after it moves faster.",
        ],
      },
    ],
    faqs: [
      {
        question: "How is SEO different for an open-source project?",
        answer:
          "The user and the buyer are often different people, and most of your authority lives where you have limited control: GitHub, docs, forums, community content. The work is connecting that authority to commercial pages, serving the non-branded searches your community already runs, and treating documentation as a ranking asset, not an afterthought. At Comfy the non-branded wins were all living in docs before we built anything on the marketing site.",
      },
      {
        question: "What is answer-engine optimization, and does it replace SEO?",
        answer:
          "It sits on top of SEO. It does not replace it. Answer engines still crawl and parse pages, they just reward clarity and structure over keyword tuning. In practice: a machine-readable summary of your product surface, clean structured data, titles and descriptions written to be quoted, and internal links that let a model follow a question to a working answer. It matters most where brand click-through is already being eaten by AI Overviews, which shows up in Search Console long before it shows up in revenue.",
      },
      {
        question: "What does a growth analytics foundation include?",
        answer:
          "Canonical metric definitions, an event taxonomy and catalog, identity resolution across products, the warehouse and transformation layer feeding the dashboards, the dashboards, and the enablement material that lets the team self-serve. The test is simple: any growth question has one correct answer, and anyone can find it without asking the data team.",
      },
    ],
    publishDate: "2026-06-01",
    dateModified: "2026-09-17",
  },
  {
    slug: "charta-health",
    client: "Charta Health",
    clientUrl: "https://www.chartahealth.com",
    industry: "Healthcare AI · Revenue cycle",
    engagement: "Marketing and growth foundation",
    period: "2026 to present",
    badge: "AI agents for top-of-funnel SEO",
    title: "Charta Health:",
    titleAccent: "A growth foundation, with agents doing the heavy lifting.",
    metaTitle: "Charta Health Case Study: AI-Agent SEO and Growth Foundation",
    metaDescription:
      "Building Charta Health's marketing and growth foundation: GTM stack audit, positioning and ICP, an AI-agent powered SEO content engine, and event-to-lifecycle nurture with closed-loop attribution.",
    summary:
      "Charta Health automates pre-bill chart review for healthcare providers, a category where accuracy is the product and the buying committee is wide. Three workstreams: fix the foundation, build an agent-run SEO engine so a small team publishes like a large one, and make events and lifecycle report back in numbers.",
    services: [DEMAND_GEN, GROWTH_MARKETING, REVOPS],
    metrics: [
      { value: "3", label: "Workstreams, one engagement" },
      { value: "90 days", label: "Execution roadmap" },
      { value: "Agent-run", label: "Research, brief and draft pipeline" },
      { value: "Closed-loop", label: "Event and lifecycle attribution" },
    ],
    sections: [
      {
        heading: "What I walked into",
        body: [
          "Charta Health sells AI chart review into provider organizations. Every encounter gets reviewed before the bill goes out, catching the coding and documentation gaps that would otherwise turn into denials or unbilled revenue. Bain Capital Ventures led their Series A in 2025.",
          "The evaluation pulls in revenue cycle leaders, compliance, clinical leadership and finance, and each of them cares about a different proof point. It is a category where accuracy is the product, so the marketing has to carry evidence, not adjectives.",
          "The constraint was throughput, not strategy. A small marketing team in a technical, regulated category can publish slowly and correctly, or quickly and badly. Meanwhile the searches that matter, the coding and compliance questions their buyers type at eleven at night, were being answered by trade publishers and competitors instead of by the company that automates the work.",
        ],
      },
      {
        heading: "Workstream one: the foundation",
        body: [
          "We audited what was already there before adding anything. The go-to-market stack got reviewed for whether it could carry more volume: how leads enter, where they land, what fires when, and which parts were doing the same job twice.",
          "In parallel we tightened the story. ICP definitions by practice type and by role. Positioning that leads with the operational and financial outcome, not the model architecture. And a 90 day roadmap, so the sequence was explicit and the team knew what was deliberately not being done yet, which in my experience is the half that saves the quarter.",
        ],
        bullets: [
          {
            title: "Infrastructure audit",
            text: "The GTM stack reviewed end to end for scalability, with duplication and dead ends cleared before new volume arrives.",
          },
          {
            title: "Positioning and ICP",
            text: "Value propositions and segment definitions rewritten around the outcomes each member of the buying committee is measured on.",
          },
          {
            title: "90 day roadmap",
            text: "A sequenced acquisition plan with owners and milestones, so execution does not stall on the next decision.",
          },
        ],
      },
      {
        heading: "Workstream two: AI agents for top-of-funnel SEO",
        body: [
          "Pointing a language model at a keyword list produces volume and nothing else. The model has no access to the things that make content rank and convert: the real objections, the specific numbers, the category vocabulary, the house style.",
          "So we built a pipeline instead of a prompt. The demand map comes first, high intent clusters plus the programmatic families where one well-structured template serves a large group of closely related searches. Then agents do the research and briefing: assembling evidence, tearing down the pages currently ranking, listing the entities that have to appear, proposing the internal links. What comes out is a draft already shaped correctly. The human time goes where it is worth the money, which in a clinical category is accuracy review and point of view.",
          "The step that makes it stick is wiring the agents into the content production lifecycle, not running them ad hoc. Publishing becomes a cadence with a queue behind it, not a burst of effort that decays the moment the quarter gets busy.",
        ],
        bullets: [
          {
            title: "Demand mapping first",
            text: "High intent clusters and programmatic families identified and scored before a single word gets generated.",
          },
          {
            title: "Research and briefing agents",
            text: "Automated evidence gathering, competitive teardown and brief construction, so every draft starts from a real argument.",
          },
          {
            title: "A workflow, not one-offs",
            text: "Agents run inside the production lifecycle on a cadence, with human review owning accuracy and point of view.",
          },
        ],
      },
      {
        heading: "Workstream three: events, lifecycle and attribution",
        body: [
          "Healthcare conferences still generate a real share of pipeline, and most of it evaporates in the two weeks after the badge scan.",
          "Event leads now enter sequences built around what that person actually saw and said, not a generic post-show blast. Lifecycle sequences cover onboarding, retention and waking up dormant contacts. All of it reports back through closed-loop tracking, so the return on an event or a lifecycle program is a number someone can defend in a budget conversation.",
        ],
        bullets: [
          {
            title: "Event nurture",
            text: "Automated, context-aware follow-up that turns badge scans into conversations.",
          },
          {
            title: "Lifecycle programs",
            text: "Onboarding, retention and reactivation sequences built around the moments that predict expansion and churn.",
          },
          {
            title: "Closed-loop attribution",
            text: "Tracking from first touch through to pipeline, so event and lifecycle spend can be defended with data.",
          },
        ],
      },
      {
        heading: "What the team owns now",
        body: [
          "A documented view of their own go-to-market infrastructure. Positioning and ICP definitions the whole team can repeat. A 90 day roadmap with the sequence made explicit. An agent-assisted content engine that turns a keyword cluster into a reviewed, on-brand page without adding headcount. Event and lifecycle nurture that runs itself. And the attribution to say which of it worked.",
          "A foundation engagement is only worth the money if it keeps producing after I leave, so that is what we design for and what we measure against.",
        ],
      },
    ],
    faqs: [
      {
        question: "Can AI agents produce SEO content that actually ranks?",
        answer:
          "Not on their own. Content ranks when it sits on a real demand map, carries evidence a competitor cannot copy, and gets reviewed by someone who knows the category. What agents change is throughput. Research, competitive analysis, briefing and first drafts stop being the bottleneck, so expensive human time goes into accuracy and point of view instead of assembly.",
      },
      {
        question: "How long does a growth foundation engagement take?",
        answer:
          "The audit, positioning and roadmap usually land inside the first 30 days, with the content engine and lifecycle programs built and running over the following 60. After that it becomes an operating cadence, not a project, and the roadmap covers the next 90 days at a time.",
      },
      {
        question: "Do you work in regulated categories like healthcare?",
        answer:
          "Yes. Regulation changes the review process more than the strategy. Accuracy review is non-negotiable, claims need evidence attached, and automation has to be built with a human sign-off between the draft and the publish button. The upside is that competitors move slowly, so a team that can publish accurately and quickly pulls ahead faster than it would anywhere else.",
      },
    ],
    publishDate: "2026-04-24",
    dateModified: "2026-09-17",
  },
  {
    slug: "semgrep",
    client: "Semgrep",
    clientUrl: "https://semgrep.dev",
    industry: "Developer security · DevSecOps",
    engagement: "Head of Revenue Operations",
    period: "2022 to 2024",
    badge: "5x revenue YoY",
    title: "Semgrep:",
    titleAccent: "Selling security to developers who distrust marketing.",
    metaTitle: "Semgrep Case Study: Developer GTM and 5x Revenue Growth",
    metaDescription:
      "Building a developer-first demand engine at Semgrep: PLG onboarding that cut CAC by 40%, competitive positioning against incumbents ten times the size, and a proof-of-value deal framework.",
    summary:
      "Semgrep sells static analysis to engineers, which means the buyer can tell when you are bluffing. We built the PLG onboarding, the competitive positioning against incumbents ten times the size, and the proof-of-value process that made enterprise deals repeatable.",
    services: [DEMAND_GEN, GROWTH_MARKETING, REVOPS],
    metrics: [
      { value: "5x", label: "Revenue growth year over year" },
      { value: "40%", label: "Reduction in CAC" },
      { value: "10x", label: "Larger incumbents outpositioned" },
      { value: "Full stack", label: "MarTech integrated end to end" },
    ],
    sections: [
      {
        heading: "What I walked into",
        body: [
          "Developer tools have a marketing problem most categories do not: the person evaluating you writes software for a living, has seen every dark pattern, and will close the tab the moment a claim outruns the product.",
          "Semgrep had the product and the developer credibility. What it did not have was a repeatable path from a developer running the open-source scanner to a security team signing an enterprise contract. Acquisition cost was high because the funnel leaked between those two states, and the company was competing for enterprise budget against incumbents roughly ten times its size with the brand recognition to match.",
        ],
      },
      {
        heading: "Fixing the free-to-paid path",
        body: [
          "The first job was onboarding, because that is where the money was leaking. We rebuilt the path a developer takes from first scan to a working setup inside their CI, then instrumented it so we could see which step lost people.",
          "Cutting customer acquisition cost by 40% came out of that work, not out of spending less. When the product-led path converts, you stop paying salespeople to do what onboarding should have done.",
        ],
        bullets: [
          {
            title: "Instrumented onboarding",
            text: "Every step from first scan to CI integration measured, so the drop-offs were visible instead of assumed.",
          },
          {
            title: "Stack consolidation",
            text: "The full MarTech stack integrated end to end, so lead data, product usage and pipeline finally described the same person.",
          },
          {
            title: "A real handoff",
            text: "Clear signals for when an account had earned a sales conversation, which stopped reps working accounts that were not ready.",
          },
        ],
      },
      {
        heading: "Winning on positioning, not budget",
        body: [
          "You cannot outspend a competitor ten times your size. You can be more useful than them on the exact page where a buyer is deciding.",
          "So we built the competitive comparison pages properly: data-driven, specific about where each tool wins, honest enough that a developer would send one to a colleague. They became some of the highest converting assets on the site, which is what happens when the buyer trusts the source.",
          "Behind the pages sat the sales side of the same argument. Battlecards, an enablement program, and a proof-of-value framework with written success criteria agreed before an evaluation started, so deals were judged against what the buyer actually said mattered. Structured evaluations win more often than open-ended ones, and they close faster.",
        ],
        bullets: [
          {
            title: "Comparison pages that convert",
            text: "Honest, specific, data-backed comparisons against the incumbents, which became top-converting entry points.",
          },
          {
            title: "Proof-of-value framework",
            text: "Success criteria agreed up front, so evaluations were scored against the buyer's own stated requirements.",
          },
          {
            title: "Enablement that gets used",
            text: "Battlecards and a structured program built with the reps who had to run it, not handed down at them.",
          },
        ],
      },
    ],
    faqs: [
      {
        question: "How do you market to developers without losing credibility?",
        answer:
          "Lead with the thing they can verify. Developers will forgive a rough landing page and will not forgive an unfalsifiable claim, so the marketing has to be specific enough to check: what the tool catches, what it misses, where a competitor is genuinely better. The comparison pages at Semgrep converted precisely because they said where the other tool wins.",
      },
      {
        question: "What actually reduces CAC in a product-led company?",
        answer:
          "Usually the onboarding, not the ad spend. If the free path converts, sales stops doing work the product should have done and the blended cost falls on its own. The prerequisite is instrumentation, because you cannot fix a funnel step you cannot see. That is why the measurement work comes before the optimization work.",
      },
    ],
    publishDate: "2022-05-01",
    dateModified: "2026-09-17",
  },
  {
    slug: "egnyte",
    client: "Egnyte",
    clientUrl: "https://www.egnyte.com",
    industry: "Enterprise content · Governance",
    engagement: "Sr. Director, Marketing Operations",
    period: "2019 to 2022",
    badge: "$50M → $250M pipeline",
    title: "Egnyte:",
    titleAccent: "Beating the cloud storage giants by changing the question.",
    metaTitle: "Egnyte Case Study: Category Repositioning and 5x Pipeline Growth",
    metaDescription:
      "Growing marketing-sourced pipeline from $50M to $250M at Egnyte by repositioning the category from file sharing to content governance, and building the marketing operations engine underneath it.",
    summary:
      "Egnyte competed against household-name cloud storage companies with a brand awareness gap it was never going to close by outspending. We reframed the category around governance, built the product-led experience that proved it, and grew marketing-sourced pipeline 5x.",
    services: [GROWTH_MARKETING, REVOPS, DEMAND_GEN],
    metrics: [
      { value: "5x", label: "Marketing-sourced pipeline growth" },
      { value: "$250M", label: "Pipeline, up from $50M" },
      { value: "15", label: "Person marketing ops team led" },
      { value: "Category", label: "Repositioned to content governance" },
    ],
    sections: [
      {
        heading: "What I walked into",
        body: [
          "Egnyte sold into a category defined by companies whose names everyone already knew. On a feature-by-feature comparison against a cloud storage giant you lose the meeting before it starts, because the buyer has already framed the question as storage and the incumbent already owns that word.",
          "The pipeline number told the same story. Marketing was sourcing a fraction of what the sales organization needed, and the operations underneath it could not have carried much more volume anyway.",
        ],
      },
      {
        heading: "Changing the question",
        body: [
          "The fastest way to beat an incumbent is to compete where they are structurally weak. For the storage giants that place was governance: who touched which file, under which regulation, with what audit trail, across which jurisdictions.",
          "So we stopped selling file sharing and started selling content governance. New messaging hierarchy, new proof points, campaigns built around compliance and risk instead of capacity and price. That reframe turned a feature comparison into a different conversation, and it earned analyst recognition in a category Egnyte could credibly own.",
        ],
        bullets: [
          {
            title: "Category reframing",
            text: "From file sharing to content governance, which moved the fight onto ground the incumbents could not easily defend.",
          },
          {
            title: "Product-led proof",
            text: "Product tours and interactive demos that let buyers verify the governance claim themselves. They became the primary conversion driver.",
          },
          {
            title: "Integrated demand",
            text: "SEO, events and customer advocacy run as one program against the same segments, instead of three teams with three calendars.",
          },
        ],
      },
      {
        heading: "The operations that made it hold",
        body: [
          "Repositioning generates demand. Operations decides whether any of it becomes pipeline.",
          "Leading a 15-person marketing operations team, we rebuilt the machinery underneath: CRM workflows that matched how deals actually progressed, playbooks the sales team would use without being chased, and dashboards that gave leadership a real-time read on deal progression and forecast accuracy. Marketing-sourced pipeline grew from $50M to $250M across the engagement.",
          "The plain truth about a five-fold pipeline number is that most of it is plumbing. The repositioning opened the door. The operations work is what let the company walk through it at volume.",
        ],
      },
    ],
    faqs: [
      {
        question: "When should a company reposition its category?",
        answer:
          "When you are losing on a comparison the buyer has already framed in the incumbent's language, and when there is a real capability where that incumbent is structurally weak rather than just behind. The test is whether you can defend the new frame with product, not only with copy. Egnyte could prove governance, which is why the reframe held.",
      },
      {
        question: "What does marketing operations contribute to pipeline?",
        answer:
          "It decides how much of the demand you generate survives the trip to a forecastable deal. Routing, data hygiene, lifecycle stages, attribution, and dashboards leadership trusts. It is invisible when it works, and it is the reason a repositioning becomes a pipeline number instead of a brand exercise.",
      },
    ],
    publishDate: "2019-11-01",
    dateModified: "2026-09-17",
  },
  {
    slug: "openblock-labs",
    client: "OpenBlock Labs",
    industry: "Onchain data · Early stage",
    engagement: "Growth advisory: launch strategy and analytics",
    period: "2026",
    badge: "Analytics from zero",
    title: "OpenBlock Labs:",
    titleAccent: "Launch strategy, and the instrumentation to know if it worked.",
    metaTitle: "OpenBlock Labs Case Study: Launch Strategy and Growth Analytics",
    metaDescription:
      "Defining the go-to-market motion for an early-stage data company and building the growth analytics framework from the ground up, so early traction could be measured instead of guessed at.",
    summary:
      "Early-stage companies usually instrument last, which makes the first year of growth data unrecoverable. We did it in the other order: define the motion, then build the analytics framework underneath it, so the launch produced evidence instead of anecdotes.",
    services: [GROWTH_MARKETING, REVOPS],
    metrics: [
      { value: "0 → 1", label: "Growth analytics framework" },
      { value: "Pre-launch", label: "Instrumented, not retrofitted" },
      { value: "Defined", label: "Go-to-market motion and ICP" },
      { value: "Launch", label: "Strategy and sequencing" },
    ],
    sections: [
      {
        heading: "The problem with instrumenting last",
        body: [
          "Almost every early-stage company builds its analytics after it needs them. The launch happens, traction arrives or does not, and six months later someone asks which channel drove it and finds out the answer is unrecoverable. You cannot backfill events that were never sent.",
          "OpenBlock Labs was heading into a product launch with the chance to do it the other way around.",
        ],
      },
      {
        heading: "Motion first, then measurement",
        body: [
          "We started with the go-to-market motion, because you cannot instrument a funnel you have not defined. Who the product is for, what the first valuable action is, what a good week looks like, and which of those are worth an event.",
          "Then the data infrastructure to track exactly those things, built before the launch instead of bolted on after it. The framework covered the path from first touch through to activation, so the questions people ask after a launch had answers waiting for them.",
          "The payoff is speed. When launch data arrives already structured, the team spends its time deciding what to do next instead of reconstructing what happened.",
        ],
        bullets: [
          {
            title: "Motion defined first",
            text: "ICP, positioning and launch sequence agreed before a single event was specified.",
          },
          {
            title: "Instrumented before launch",
            text: "Data infrastructure built ahead of the moment it was needed, so nothing had to be reconstructed later.",
          },
          {
            title: "Insight, not dashboards",
            text: "Built to answer the specific questions the team would ask after launch, rather than to fill a dashboard.",
          },
        ],
      },
    ],
    faqs: [
      {
        question: "How early should a startup build growth analytics?",
        answer:
          "Before the launch you want to measure. Events cannot be backfilled, so waiting leaves a permanent hole in your history at exactly the moment the data is most valuable. It does not need to be elaborate either: a defined activation event, clean identity, and channel attribution will answer most of the questions a seed-stage team actually has.",
      },
      {
        question: "What does a growth advisor do for a pre-launch company?",
        answer:
          "Force the decisions that are easy to defer. Who this is for, what the first valuable action is, and how you will know whether the launch worked. Those answers determine the instrumentation, and the instrumentation determines whether the next six months run on evidence or on opinion.",
      },
    ],
    publishDate: "2026-02-01",
    dateModified: "2026-09-17",
  },
];

/**
 * Which case study proves the argument a given blog post makes. Links the two
 * clusters so posts pass authority to the pages that sell the work.
 */
export const BLOG_TO_CASE_STUDY: Record<string, string> = {
  "heygen-gtm-playbook-20m-to-100m-arr": "heygen",
  "seo-from-zero-b2b-saas-organic-growth": "comfy",
  "ai-native-gtm-marketing-operations-2025": "comfy",
  "revenue-operations-ai-forecasting-2025": "comfy",
  "plg-to-enterprise-gtm-transition-playbook": "semgrep",
  "demand-generation-b2b-saas-pipeline-framework": "egnyte",
  "community-led-growth-b2b-saas-strategy": "heygen",
  "abm-strategy-b2b-saas-enterprise-pipeline": "heygen",
};

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return CASE_STUDIES.find((c) => c.slug === slug);
}

/** Studies rendered by the generic /case-studies/[slug] route. */
export const DATA_DRIVEN_CASE_STUDIES = CASE_STUDIES.filter(
  (c) => !c.hasCustomPage
);

/** Plain-text rendering used by the /md routes and llms-full.txt. */
export function caseStudyToMarkdown(study: CaseStudy): string {
  const lines: string[] = [
    `# ${study.title} ${study.titleAccent}`.replace(/\s+/g, " ").trim(),
    "",
    `**Client:** ${study.client}  `,
    `**Industry:** ${study.industry}  `,
    `**Engagement:** ${study.engagement}  `,
    `**Period:** ${study.period}  `,
    `**Author:** Nav Singh, n+α Ventures`,
    "",
    study.summary,
    "",
    "## At a glance",
    "",
    ...study.metrics.map((m) => `- **${m.value}** ${m.label}`),
    "",
  ];

  for (const section of study.sections) {
    lines.push(`## ${section.heading}`, "");
    for (const paragraph of section.body) {
      lines.push(paragraph, "");
    }
    if (section.bullets) {
      for (const bullet of section.bullets) {
        lines.push(`- **${bullet.title}:** ${bullet.text}`);
      }
      lines.push("");
    }
  }

  if (study.faqs.length) {
    lines.push("## FAQ", "");
    for (const faq of study.faqs) {
      lines.push(`### ${faq.question}`, "", faq.answer, "");
    }
  }

  lines.push(
    "---",
    "",
    `Source: https://nplusalpha.com/case-studies/${study.slug}`,
    ""
  );

  return lines.join("\n");
}
