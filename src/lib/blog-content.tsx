import Link from "next/link";

// ─── Shared prose helpers ────────────────────────────────────────────────────

function P({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[15px] text-muted leading-relaxed mb-5">{children}</p>
  );
}

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-xl font-bold text-foreground mt-10 mb-4">{children}</h2>
  );
}

function H3({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-base font-bold text-foreground mt-6 mb-2">
      {children}
    </h3>
  );
}

function Hr() {
  return <hr className="border-white/10 my-8" />;
}

function Ul({ children }: { children: React.ReactNode }) {
  return <ul className="space-y-2.5 mb-5 mt-2">{children}</ul>;
}

function Li({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2.5 text-[15px] text-muted">
      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-orange-400 flex-shrink-0" />
      <span>{children}</span>
    </li>
  );
}

function Bold({ children }: { children: React.ReactNode }) {
  return (
    <strong className="text-foreground font-semibold">{children}</strong>
  );
}

function InternalCta({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <p className="text-sm mt-8">
      <Link href={href} className="text-orange-400 hover:underline font-medium">
        {children}
      </Link>
    </p>
  );
}

// ─── Blog Post Content ───────────────────────────────────────────────────────

export const BLOG_CONTENT: Record<string, React.ReactNode> = {
  // ── POST 1 ──────────────────────────────────────────────────────────────
  "heygen-gtm-playbook-20m-to-100m-arr": (
    <>
      <P>
        When I joined HeyGen in April 2024, the company had product-market fit,
        extraordinary organic growth, and a user base approaching 15-20 million
        registered users globally. It also had almost no marketing
        infrastructure.
      </P>
      <P>
        No SEO program. No content engine. No community. No structured lifecycle
        automation. No enterprise GTM motion. The brand had outgrown its
        early-stage positioning. And the revenue operations architecture
        wasn&apos;t built to support the enterprise motion the company was moving
        toward.
      </P>
      <P>
        Twelve months later, we had scaled to $100M+ ARR — a 5× growth
        trajectory — and built the complete GTM system from the ground up. This
        is the playbook.
      </P>

      <Hr />

      <H2>
        The Starting Point: What &ldquo;Product-Market Fit Without GTM
        Infrastructure&rdquo; Looks Like
      </H2>
      <P>
        HeyGen&apos;s growth was almost entirely bottom-up: users discovering
        the product, signing up, and sharing it with their networks. The product
        was genuinely exceptional — AI video generation that was noticeably
        better than anything else on the market.
      </P>
      <P>
        But bottom-up growth has a ceiling. To get from $20M to $100M ARR and
        beyond, you need systems that capture, convert, and expand the demand
        you&apos;re creating. Without those systems, you&apos;re leaving money
        on the table at every stage of the funnel.
      </P>
      <P>The specific gaps:</P>
      <P>
        <Bold>1. No organic search presence.</Bold> Every day, thousands of
        people were searching for AI video tools, video marketing platforms, and
        alternatives to legacy video production. HeyGen wasn&apos;t showing up
        for any of it.
      </P>
      <P>
        <Bold>2. No structured community.</Bold> Users were passionate and
        vocal, but they had nowhere to gather, share, and advocate. That energy
        was dissipating rather than compounding.
      </P>
      <P>
        <Bold>3. No enterprise motion.</Bold> HeyGen had enormous enterprise
        potential — L&D teams, marketing agencies, enterprise video production.
        But there was no targeted enterprise GTM, no ABM program, no
        enterprise-specific positioning.
      </P>
      <P>
        <Bold>4. An outgrown brand.</Bold> HeyGen had launched as a tool. It
        needed to be positioned as a platform. The original brand wasn&apos;t
        telling that story.
      </P>
      <P>
        <Bold>5. No lifecycle automation.</Bold> The conversion from free to
        paid, and from paid to expanded, was happening through organic product
        experience alone. There was no structured nurture, no trigger-based
        engagement, no upsell program.
      </P>

      <Hr />

      <H2>The Playbook: What We Built</H2>

      <H3>Move 1: Rebrand First</H3>
      <P>
        This was counterintuitive to some people on the team. When you&apos;re
        growing fast, why touch the brand?
      </P>
      <P>
        The answer: because everything else we were about to build — SEO,
        enterprise sales, community, content — would be compromised if the brand
        story was wrong. We needed a foundation.
      </P>
      <P>
        I led a full company rebrand. New visual identity, new messaging
        architecture, new market positioning. The process took six weeks. The
        result was a brand that could credibly address enterprise buyers, command
        premium pricing, and anchor every piece of content and marketing we were
        about to produce.
      </P>
      <P>
        The rebrand delivered a 200% increase in brand awareness metrics and
        meaningfully improved conversion rates on enterprise sales — enterprise
        buyers were suddenly seeing HeyGen as a platform, not a tool.
      </P>
      <P>
        <Bold>Lesson:</Bold> Before building demand, build a brand that can hold
        the demand you&apos;re about to create. A rebrand mid-growth is
        disruptive but almost always worth it when the original brand has
        outgrown its origin story.
      </P>

      <H3>Move 2: Build the SEO Foundation</H3>
      <P>
        HeyGen had no SEO program when I arrived. That meant it was invisible
        for most of the high-intent searches buyers were conducting every day.
      </P>
      <P>
        I built and launched HeyGen&apos;s first SEO program from scratch:
        keyword strategy mapped to every stage of the buyer journey, technical
        SEO fixes, a content production system targeting the top 50 keyword
        opportunities producing 50+ pieces per month, and a proactive
        link-building program.
      </P>
      <P>
        <Bold>Result: 50%+ year-over-year organic traffic growth</Bold> — from a
        declining baseline to a meaningful, compounding organic channel in under
        12 months.
      </P>
      <P>
        <Bold>Lesson:</Bold> SEO is the only demand gen channel with compounding
        returns. The right time to build your SEO program is as early as
        possible — and the second-best time is right now.
      </P>

      <H3>Move 3: Launch the Community</H3>
      <P>
        I designed and launched a community platform for HeyGen users — creators,
        marketers, and enterprise teams using the product. The goal was to take
        the existing word-of-mouth energy and give it structure.
      </P>
      <P>
        <Bold>100,000 active members in 6 months.</Bold> Community drove a 30%
        lift in new customer acquisition — through organic peer referral, shared
        tutorials, and the credibility that comes from thousands of people
        actively endorsing a product.
      </P>
      <P>How we got there:</P>
      <Ul>
        <Li>
          Seeded the community with HeyGen&apos;s most engaged power users
          (identified through product analytics)
        </Li>
        <Li>
          Built an ambassador program that gave advocates recognition and early
          access
        </Li>
        <Li>
          Ran weekly live events, AMAs with the product team, and educational
          programming
        </Li>
        <Li>
          Embedded community links throughout the product onboarding flow
        </Li>
      </Ul>
      <P>
        <Bold>Lesson:</Bold> Community is chronically underinvested in B2B SaaS
        because it has a longer time to value than paid acquisition. But the CAC
        is essentially zero and the LTV impact is enormous.
      </P>

      <H3>Move 4: Build the Content Engine</H3>
      <P>
        The content engine at HeyGen produced 50+ pieces per month across
        formats: blog posts, case studies, tutorials, comparison pages, use case
        pages, and video content. Total organic views: 1M+ per month.
      </P>
      <P>
        Key to making this work at scale: AI-native production at every stage,
        distribution-first thinking (where would this get shared?), and a
        repurposing system that turned each long-form piece into 8+ distribution
        touchpoints.
      </P>

      <H3>Move 5: Build the Enterprise Motion</H3>
      <P>
        The ABM motion targeted Global 2000 accounts across three primary
        verticals: Marketing Agencies, L&D teams, and enterprises with
        API/LiveAvatar use cases.
      </P>
      <Ul>
        <Li>
          Tier 1 ABM: 50 named accounts with fully personalized outreach
          sequences and custom landing experiences
        </Li>
        <Li>
          Tier 2 ABM: 500 accounts with Clay-powered personalization at scale
        </Li>
        <Li>
          Sales enablement: full library of enterprise collateral — one-pagers,
          pitch decks, ROI calculators, case studies — that improved win rates by
          25%
        </Li>
      </Ul>
      <P>
        <Bold>Result: $XXM in enterprise pipeline.</Bold>
      </P>

      <H3>Move 6: Lifecycle Automation</H3>
      <P>
        We implemented HeyGen&apos;s first automated lifecycle program using
        PostHog (for product event data) and Customer.io (for campaign
        execution), covering email, in-app messaging, and ad retargeting.
      </P>
      <Ul>
        <Li>
          Onboarding sequences triggered by product events (first video created,
          first export), not just time-based drips
        </Li>
        <Li>
          Conversion campaigns targeting free users showing high-usage signals
        </Li>
        <Li>
          Upsell programs identifying expansion signals (approaching usage limits,
          new use cases)
        </Li>
        <Li>
          Retention campaigns detecting declining usage early and triggering
          re-engagement
        </Li>
      </Ul>
      <P>
        <Bold>Result: 50% improvement in customer retention. 30% expansion of
        revenue from existing accounts.</Bold>
      </P>

      <H3>Move 7: International Expansion</H3>
      <P>
        We launched a localization strategy that expanded HeyGen into 5 new
        markets with localized product, content, and community experiences.{" "}
        <Bold>Result: 200% increase in international revenue.</Bold>
      </P>

      <Hr />

      <H2>The Underlying Principle: Systems, Not Campaigns</H2>
      <P>
        The common thread across all of these moves is that we were building
        systems — not running campaigns. A campaign is a one-time effort. A
        system runs automatically, improves over time, and doesn&apos;t require a
        team to manually operate it every day.
      </P>
      <P>
        The companies that scale from $20M to $100M ARR and beyond do so because
        they&apos;ve built systems that compound: SEO compounds with every new
        piece of content. Community compounds with every new member. Lifecycle
        automation compounds with every new data point it learns from. The
        enterprise ABM motion compounds with every deal won and case study
        published.
      </P>
      <P>
        If your growth feels like you&apos;re constantly pushing a boulder uphill
        — resetting every quarter, rebuilding pipeline from scratch — the problem
        is almost certainly that you&apos;re running campaigns when you should be
        building systems.
      </P>

      <Hr />

      <H2>What This Means for Your Company</H2>
      <P>
        If you&apos;re a B2B SaaS company between $5M and $50M ARR, the HeyGen
        playbook is relevant to you — not because your company is identical to
        HeyGen, but because the structural gaps are almost always the same: brand
        that has outgrown its origin, no organic search presence, untapped
        community potential, enterprise motion that isn&apos;t fully built,
        lifecycle automation that&apos;s too thin.
      </P>
      <P>
        The specific levers will differ. The principle — build compounding
        systems, not one-off campaigns — is universal.
      </P>

      <InternalCta href="/services/growth-marketing">
        → See how I can help build this for your company
      </InternalCta>
    </>
  ),

  // ── POST 2 ──────────────────────────────────────────────────────────────
  "ai-native-gtm-marketing-operations-2025": (
    <>
      <P>
        &ldquo;AI-native&rdquo; has become one of the most overloaded terms in
        B2B SaaS. Every vendor claims it. Most companies say they&apos;re doing
        it. Almost nobody has actually built it.
      </P>
      <P>
        Here&apos;s what I&apos;ve learned building AI-native GTM systems at
        HeyGen and Semgrep — what it actually means in practice, what the stack
        looks like, and what results it delivers.
      </P>

      <Hr />

      <H2>
        The Difference Between &ldquo;Using AI Tools&rdquo; and Being AI-Native
      </H2>
      <P>
        Using AI tools means your marketing team uses ChatGPT to write blog posts
        faster. That&apos;s useful, but it&apos;s not AI-native.
      </P>
      <P>
        Being AI-native means AI is embedded in the architecture of your GTM
        systems — in the data flows, the decision logic, the automation triggers,
        and the feedback loops. It means your systems get smarter over time
        without additional human effort.
      </P>
      <P>
        The distinction matters because companies that are genuinely AI-native in
        their GTM operations will compound advantages over time in a way that
        companies just using AI tools will not.
      </P>

      <Hr />

      <H2>The AI-Native GTM Stack</H2>
      <P>
        Here&apos;s what the stack actually looks like in practice, based on what
        we built at HeyGen:
      </P>

      <H3>Data Foundation</H3>
      <P>
        Everything starts with data. You cannot build intelligent systems on top
        of messy, incomplete, or siloed data.
      </P>
      <Ul>
        <Li>
          <Bold>Product analytics:</Bold> PostHog for behavioral data — every
          user action, every feature used, every conversion event, all in real
          time
        </Li>
        <Li>
          <Bold>CRM:</Bold> Salesforce as the account and contact truth layer —
          kept clean through automated enrichment and validation
        </Li>
        <Li>
          <Bold>Data warehouse:</Bold> Events from PostHog, Salesforce, and
          marketing channels flowing into BigQuery in real time
        </Li>
        <Li>
          <Bold>Reverse ETL:</Bold> Census and Polytomic to pipe warehouse data
          back into operational tools (CRM, email platform, ad platforms)
        </Li>
      </Ul>
      <P>
        This architecture means your forecasting model, lead scoring model, and
        personalization engine are all working from the same unified data — not
        from five different point-in-time data exports.
      </P>

      <H3>Intelligent Lead Scoring</H3>
      <P>
        Traditional lead scoring is rules-based: if the title is VP and the
        company is over 500 employees, assign 40 points. This works but it&apos;s
        static and it ignores behavioral signals.
      </P>
      <P>
        AI-native lead scoring learns from your closed-won data to identify the
        firmographic AND behavioral patterns that predict conversion. At Semgrep,
        we improved MQL-to-SQL conversion by 35% by replacing static rules with a
        model trained on 18 months of closed-won data.
      </P>
      <P>
        The inputs that matter most are almost always different from what
        you&apos;d guess. In one company I worked with, the single strongest
        predictor of conversion wasn&apos;t job title or company size — it was
        whether the lead had shared a product link with a colleague within 72
        hours of signing up.
      </P>

      <H3>Automated Enrichment &amp; Personalization</H3>
      <P>
        Manual research doesn&apos;t scale. Clay changed this for our outbound
        and ABM programs.
      </P>
      <P>Our Clay workflows:</P>
      <Ul>
        <Li>
          Pull new accounts fitting ICP from LinkedIn, Apollo, and intent data
          sources
        </Li>
        <Li>
          Enrich with technographic data (what tools they&apos;re using), recent
          funding events, and job posting signals
        </Li>
        <Li>
          Use AI to generate personalized research summaries per account
        </Li>
        <Li>
          Route enriched accounts to the appropriate ABM tier with pre-generated
          personalization context
        </Li>
      </Ul>
      <P>
        A workflow that would have taken a BDR 45 minutes per account now takes
        45 seconds at scale.
      </P>

      <H3>AI-Driven Forecasting</H3>
      <P>
        At HeyGen, I built a forecasting system that achieved 95% accuracy and
        reduced our planning cycle time by 50%.
      </P>
      <P>The key elements:</P>
      <Ul>
        <Li>
          Historical pattern recognition: the model learned which
          stage-to-stage conversion rates, velocity metrics, and deal
          characteristics were predictive of close
        </Li>
        <Li>
          Anomaly detection: the model flagged deals that looked like outliers
          to historical patterns — both positive (deals moving unusually fast)
          and negative (deals stalling)
        </Li>
        <Li>
          Scenario modeling: automatically generated best-case, base-case, and
          downside forecasts based on pipeline inputs
        </Li>
      </Ul>
      <P>
        The difference between 70% forecast accuracy and 95% accuracy is the
        difference between running your business confidently and running it on
        hope. That gap is almost always solvable with better systems, not more
        pipeline.
      </P>

      <H3>Lifecycle Automation with AI Triggers</H3>
      <P>
        Traditional lifecycle automation is time-based: send email on day 3, day
        7, day 14. AI-native lifecycle automation is event-based and adaptive.
      </P>
      <P>At HeyGen:</P>
      <Ul>
        <Li>PostHog tracks every product event in real time</Li>
        <Li>
          Our system detects behavioral signals (high usage, feature adoption,
          collaboration events) and fires targeted campaigns immediately
        </Li>
        <Li>
          The campaigns themselves are personalized based on the specific
          features used and the user&apos;s industry/role
        </Li>
        <Li>
          Performance data feeds back into the system to continuously improve
          trigger logic and message content
        </Li>
      </Ul>
      <P>
        <Bold>Result: 50% improvement in customer retention.</Bold>
      </P>

      <H3>Content Operations</H3>
      <P>
        AI-native content doesn&apos;t mean AI writes everything and humans
        disappear. It means AI handles the research, structuring, first-draft
        generation, and optimization work so human writers can focus on insight,
        differentiation, and quality.
      </P>
      <P>Our content stack at HeyGen:</P>
      <Ul>
        <Li>
          Keyword research and prioritization: AI-assisted competitive analysis
        </Li>
        <Li>
          Brief generation: AI generates detailed briefs from keyword and
          competitive data
        </Li>
        <Li>Draft generation: AI first drafts, human editing and insight injection</Li>
        <Li>SEO optimization: AI checks and optimizes on-page SEO elements</Li>
        <Li>
          Distribution: automated repurposing into social, email, and community
          formats
        </Li>
      </Ul>
      <P>
        This let a team of 3 content people produce the output that used to
        require a team of 10.
      </P>

      <Hr />

      <H2>What AI-Native GTM Is Not</H2>
      <P>A few things I&apos;ve seen mistaken for AI-native that aren&apos;t:</P>
      <Ul>
        <Li>
          <Bold>Replacing your CRM with an &ldquo;AI CRM&rdquo;:</Bold> Switching
          tools is not a strategy. The data architecture matters more than the
          tool.
        </Li>
        <Li>
          <Bold>Using ChatGPT to write email copy:</Bold> Useful, but this is
          AI-assisted, not AI-native. The system isn&apos;t learning or improving
          automatically.
        </Li>
        <Li>
          <Bold>Buying an AI sales tool:</Bold> Adding Gong or a similar tool to
          your stack is valuable, but it&apos;s one input into an AI-native
          system, not the system itself.
        </Li>
      </Ul>

      <Hr />

      <H2>The Compound Advantage</H2>
      <P>
        Here&apos;s why AI-native GTM creates a durable competitive advantage:
        every day your AI systems are running, they are generating data that makes
        the systems better. Your lead scoring model learns from every new
        closed-won deal. Your content system learns from engagement data. Your
        forecast model learns from every quarter.
      </P>
      <P>
        Companies that start building AI-native systems early will have data
        advantages in 3 years that their competitors simply cannot purchase or
        replicate. The moat is not the tools — it&apos;s the data and the
        institutional learning built into the systems.
      </P>
      <P>Start now.</P>

      <InternalCta href="/services/revenue-operations">
        → How I build AI-native GTM systems for B2B SaaS companies
      </InternalCta>
    </>
  ),

  // ── POST 3 ──────────────────────────────────────────────────────────────
  "plg-to-enterprise-gtm-transition-playbook": (
    <>
      <P>
        The PLG-to-enterprise transition is the move that separates the B2B SaaS
        companies that plateau at $20&ndash;30M ARR from the ones that scale to
        $100M and beyond.
      </P>
      <P>
        It&apos;s also one of the most common places where companies get into
        trouble — stalling the PLG motion while they build enterprise capability,
        or building an enterprise motion that doesn&apos;t leverage the PLG
        flywheel that got them there.
      </P>
      <P>
        I&apos;ve run this transition at both Semgrep and HeyGen. Here&apos;s the
        playbook.
      </P>

      <Hr />

      <H2>Why the Transition Is Hard</H2>
      <P>
        PLG and enterprise are not just different go-to-market motions — they
        operate on fundamentally different logic:
      </P>

      <div className="overflow-x-auto mb-6 mt-4">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left py-3 pr-6 text-muted font-semibold">
                Dimension
              </th>
              <th className="text-left py-3 pr-6 text-orange-400 font-semibold">
                PLG
              </th>
              <th className="text-left py-3 text-orange-400 font-semibold">
                Enterprise
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {[
              ["Primary buyer", "Individual practitioner", "Buying committee"],
              ["Sales cycle", "Days to weeks", "Weeks to months"],
              ["Key metric", "Product activation, DAU", "ACV, logo retention"],
              [
                "Primary conversion lever",
                "Product experience",
                "Relationship + ROI proof",
              ],
              [
                "Primary channel",
                "Product, SEO, community",
                "Sales, events, ABM",
              ],
            ].map(([dim, plg, ent]) => (
              <tr key={dim}>
                <td className="py-2.5 pr-6 text-foreground font-medium">
                  {dim}
                </td>
                <td className="py-2.5 pr-6 text-muted">{plg}</td>
                <td className="py-2.5 text-muted">{ent}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <P>
        The mistake most companies make is treating this as an either/or choice.
        &ldquo;We&apos;re PLG, so we don&apos;t do outbound.&rdquo; Or: &ldquo;We&apos;re going
        enterprise, so let&apos;s build a sales team and slow down PLG
        investments.&rdquo;
      </P>
      <P>
        The right move is to run both motions simultaneously — with distinct
        systems for each — and build the bridge that lets enterprise sales
        leverage the PLG user base.
      </P>

      <Hr />

      <H2>The Five Moves of the PLG-to-Enterprise Transition</H2>

      <H3>Move 1: Build the PQL Model</H3>
      <P>
        Before you can run an enterprise motion off your PLG user base, you need
        to know which users in that base are high-potential enterprise accounts.
      </P>
      <P>
        A Product Qualified Lead (PQL) is a user or account whose product
        behavior signals they are likely to convert to a paid enterprise contract.
        Building the PQL model:
      </P>
      <Ul>
        <Li>
          Work backwards from your closed-won enterprise deals — what was the
          product behavior of those users 30/60/90 days before they converted?
        </Li>
        <Li>
          Identify 3&ndash;5 behavioral signals that strongly predict conversion
          (in my experience, collaboration events — sharing, inviting teammates —
          are almost always predictive)
        </Li>
        <Li>
          Build a composite PQL score from these signals, weighted by predictive
          power
        </Li>
        <Li>Set the score threshold that triggers a sales action</Li>
      </Ul>
      <P>
        At HeyGen, we found that enterprise conversion was strongly predicted by:
        team sharing events, API usage, and volume of videos exported in the first
        30 days. A user who had done all three was 4× more likely to convert to
        enterprise than one who hadn&apos;t.
      </P>

      <H3>Move 2: Build the Sales-Assist Workflow</H3>
      <P>
        Once you&apos;ve identified PQLs, you need a workflow that gets the right
        sales rep engaging the right account at the right moment — without
        disrupting the self-serve experience.
      </P>
      <Ul>
        <Li>
          <Bold>Automated routing:</Bold> When an account hits PQL threshold,
          route to the appropriate rep within 30 minutes. Speed matters
          enormously — the window of maximum engagement is short. We reduced
          response time from 24 hours to 30 minutes.
        </Li>
        <Li>
          <Bold>Rep briefing:</Bold> The rep receives a brief that includes the
          specific product signals that triggered the PQL, the account&apos;s
          industry and company size, and any relevant content consumed.
        </Li>
        <Li>
          <Bold>Outreach sequence:</Bold> A tailored sequence that references the
          product usage: &ldquo;I noticed your team has been using [feature]
          heavily — we&apos;ve seen companies in your space use this to [specific
          outcome]. Worth a 20-minute conversation?&rdquo;
        </Li>
        <Li>
          <Bold>Self-serve protection:</Bold> The sales-assist process should
          never interrupt the self-serve experience.
        </Li>
      </Ul>

      <H3>Move 3: Build Segment-Specific Enterprise GTM</H3>
      <P>
        Generic enterprise marketing doesn&apos;t work. At HeyGen, we built
        separate GTM motions for Marketing Agencies (focused on volume and
        production efficiency), L&D Teams (focused on engagement and compliance),
        and Enterprise API/LiveAvatar (focused on technical buyers and
        developers).
      </P>
      <P>
        Each segment had its own messaging, its own ABM target list, its own
        sales playbook, and its own case study library. This specificity
        dramatically improved conversion rates at every stage.
      </P>

      <H3>Move 4: Build the Enterprise Content Engine</H3>
      <P>Enterprise buyers need:</P>
      <Ul>
        <Li>
          <Bold>Case studies with hard ROI numbers:</Bold> Not &ldquo;our
          customers love us&rdquo; — &ldquo;Company X reduced video production
          cost by 70% and time-to-publish by 80%.&rdquo;
        </Li>
        <Li>
          <Bold>Comparison and evaluation guides:</Bold> Enterprise procurement
          teams evaluate alternatives — be the most helpful resource at this
          stage.
        </Li>
        <Li>
          <Bold>ROI calculators:</Bold> Give procurement teams the tool to build
          the business case internally.
        </Li>
        <Li>
          <Bold>Security and compliance documentation</Bold>
        </Li>
        <Li>
          <Bold>Analyst and third-party validation:</Bold> G2 reviews, analyst
          reports, and peer community feedback carry enormous weight.
        </Li>
      </Ul>

      <H3>Move 5: Protect the PLG Flywheel</H3>
      <P>
        The most common mistake in the PLG-to-enterprise transition is
        accidentally breaking the self-serve motion. Signs you&apos;re breaking
        PLG: onboarding flows are getting more complex before users see value;
        time-to-value is increasing; self-serve conversion rates are declining.
      </P>
      <Ul>
        <Li>
          <Bold>Never gate core value behind a sales interaction.</Bold> If
          someone can get value from the free tier, let them get it immediately.
        </Li>
        <Li>
          <Bold>Run PLG metrics separately from enterprise metrics.</Bold>{" "}
          Otherwise you won&apos;t notice PLG degradation until it&apos;s a real
          problem.
        </Li>
        <Li>
          <Bold>
            Treat the PLG user base as a marketing asset, not a sales target.
          </Bold>{" "}
          The most valuable thing a PLG user base does for enterprise is generate
          social proof, referrals, and champion networks.
        </Li>
      </Ul>

      <Hr />

      <H2>The Results of Getting This Right</H2>
      <P>
        At Semgrep, building the PLG-to-enterprise transition drove 5× revenue
        growth and built a segment-specific enterprise motion that became the
        company&apos;s primary growth engine — while maintaining and improving
        PLG activation metrics.
      </P>
      <P>
        At HeyGen, the enterprise motion we built on top of a massive PLG user
        base generated $XXM in enterprise pipeline and improved win rates by 25%.
      </P>
      <P>
        The companies that execute this transition well don&apos;t just double or
        triple revenue. They fundamentally change the trajectory — because they
        now have two compounding flywheels running simultaneously.
      </P>

      <InternalCta href="/services/growth-marketing">
        → How I help B2B SaaS companies build the PLG-to-enterprise transition
      </InternalCta>
    </>
  ),

  // ── POST 4 ──────────────────────────────────────────────────────────────
  "demand-generation-b2b-saas-pipeline-framework": (
    <>
      <P>
        I&apos;ve built demand generation programs that have generated over $400M
        in marketing-sourced pipeline across HeyGen, Semgrep, and Egnyte.
      </P>
      <P>
        That&apos;s not a credential — it&apos;s the result of building (and
        rebuilding) the same core demand gen system in different contexts, with
        different products, at different stages of company growth. Here&apos;s the
        framework.
      </P>

      <Hr />

      <H2>The Core Insight: Demand Gen Is a System, Not a Channel</H2>
      <P>
        The biggest mistake I see in demand gen is channel-first thinking:
        &ldquo;We need to do LinkedIn Ads&rdquo; or &ldquo;We should invest in
        content marketing.&rdquo; Channels are tactics. Systems are strategies.
      </P>
      <P>A demand generation system has five components that work together:</P>
      <Ul>
        <Li>
          <Bold>Audience definition:</Bold> Who specifically are we trying to
          reach, and why do they have a problem we solve?
        </Li>
        <Li>
          <Bold>Demand creation:</Bold> How do we make that audience aware of us
          and educated about the problem?
        </Li>
        <Li>
          <Bold>Demand capture:</Bold> How do we intercept that audience when
          they&apos;re actively seeking a solution?
        </Li>
        <Li>
          <Bold>Pipeline conversion:</Bold> How do we turn awareness and interest
          into sales-qualified pipeline?
        </Li>
        <Li>
          <Bold>Feedback loop:</Bold> How do we measure and optimize each
          component?
        </Li>
      </Ul>

      <Hr />

      <H2>Component 1: Audience Definition (ICP + Segments)</H2>
      <P>
        Every demand gen program I&apos;ve rebuilt has started with ICP
        refinement — and it almost always uncovers that the company&apos;s ICP is
        too broad.
      </P>
      <P>The ICP refinement process I use:</P>
      <Ul>
        <Li>
          Pull your last 50 closed-won deals and look for patterns: industry,
          company size, geography, tech stack, buyer role, time-to-close
        </Li>
        <Li>
          Identify the 20% of customers driving 80% of revenue or retention
        </Li>
        <Li>
          Interview 5&ndash;10 of your best customers: what problem were they
          solving, how did they find you, what would they lose if you disappeared?
        </Li>
        <Li>
          Build 2&ndash;3 specific ICP profiles with enough detail to write
          content for them
        </Li>
      </Ul>
      <P>
        At Egnyte, refining ICP targeting was the single most impactful change to
        the demand gen program. We increased ARPA 3.4× by building programs
        specifically for the segment where we had the highest win rates and lowest
        churn.
      </P>

      <Hr />

      <H2>Component 2: Demand Creation</H2>
      <P>
        Demand creation makes your ICP aware of you before they&apos;re actively
        shopping. This is the hardest, slowest, and most underinvested part of
        most demand gen programs.
      </P>

      <H3>Content + SEO</H3>
      <P>
        This is the compound channel. A well-executed content program targeting
        the right keywords reaches buyers when they&apos;re educating themselves
        about a problem — weeks or months before they&apos;re ready to buy.
        I&apos;ve built content operations producing 50+ pieces per month that
        generated 1M+ organic views. The ROI is exceptional, but you need to
        commit for 6&ndash;12 months before you see meaningful results.
      </P>

      <H3>LinkedIn Thought Leadership</H3>
      <P>
        Publishing genuine expertise — not promotional content — builds the brand
        recognition and trust that makes all your other channels work better.
        I&apos;ve seen LinkedIn content increase email open rates, improve cold
        outreach response rates, and shorten sales cycles simply because prospects
        already knew the company and respected its expertise.
      </P>

      <H3>Community</H3>
      <P>
        Underused and undervalued. A thriving community where your buyers gather
        creates word-of-mouth demand that no paid channel can replicate. At
        HeyGen, community drove a 30% lift in new customer acquisition.
      </P>

      <H3>Partner Ecosystem</H3>
      <P>
        The highest-trust demand creation channel. A partner&apos;s
        recommendation carries more weight than your own marketing. I&apos;ve
        built partner programs that contributed 20% of total pipeline.
      </P>

      <Hr />

      <H2>Component 3: Demand Capture</H2>
      <P>
        Demand capture intercepts buyers who are actively searching for solutions.
        This is where most demand gen budgets go — and it&apos;s the easiest
        component to optimize.
      </P>
      <Ul>
        <Li>
          <Bold>Search (SEO + SEM):</Bold> High-intent keyword targeting captures
          buyers mid-search. Bottom-of-funnel keywords (competitor comparisons,
          pricing pages) have high intent and convert well.
        </Li>
        <Li>
          <Bold>Review sites and comparison content:</Bold> G2, Capterra, and
          similar sites are where enterprise buyers do their final shortlisting.
          Being present here — with strong reviews and accurate positioning — is
          essential.
        </Li>
        <Li>
          <Bold>Retargeting:</Bold> Buyers who have visited your site, read your
          content, or engaged with your LinkedIn posts are telling you they&apos;re
          aware of you. Retargeting keeps you visible during their evaluation
          period.
        </Li>
      </Ul>

      <Hr />

      <H2>Component 4: Pipeline Conversion</H2>

      <H3>Lead Scoring and Routing</H3>
      <P>
        Not all leads are equal. A behavioral + firmographic lead scoring model
        ensures your sales team focuses on the accounts most likely to close, and
        that they get there quickly. I&apos;ve improved MQL-to-SQL conversion 35%
        through better scoring and faster routing (response time from 24 hours to
        30 minutes).
      </P>

      <H3>Account-Based Marketing (ABM)</H3>
      <P>
        For enterprise motion, ABM is the highest-conversion approach. I&apos;ve
        run ABM programs that generated $XXM in pipeline targeting Global 2000
        accounts and improved pipeline efficiency 3× at Egnyte. The key: tight
        ICP definition, quality intent signals, and personalized outreach that
        actually references account-specific research.
      </P>

      <H3>Sales Enablement</H3>
      <P>
        Marketing-pipeline conversion rates are heavily influenced by how
        well-armed sales is. Case studies, ROI calculators, competitive
        battlecards, and demo frameworks — built for specific ICP segments — can
        move win rates by 15&ndash;25%.
      </P>

      <Hr />

      <H2>Component 5: The Feedback Loop</H2>
      <P>
        A demand gen program without attribution is flying blind. The attribution
        system I build:
      </P>
      <Ul>
        <Li>
          <Bold>Multi-touch attribution:</Bold> I&apos;ve implemented attribution
          models with 90% coverage — tracking every marketing touchpoint from
          first awareness to closed-won.
        </Li>
        <Li>
          <Bold>Pipeline source reporting:</Bold> Board-level reporting that shows
          exactly what percentage of pipeline came from which source: marketing,
          sales, partner, product.
        </Li>
        <Li>
          <Bold>Channel ROI:</Bold> Cost per MQL, cost per SQL, cost per
          opportunity, and cost per closed-won dollar by channel.
        </Li>
        <Li>
          <Bold>Closed-loop feedback:</Bold> Regular cadence of reviewing
          closed-won and closed-lost deals with sales to improve ICP definition,
          messaging, and scoring models.
        </Li>
      </Ul>

      <Hr />

      <H2>Bringing It Together: The $50M Pipeline Build</H2>
      <P>
        Here&apos;s what the first 90 days of building a demand gen program from
        scratch looks like, based on taking Egnyte&apos;s pipeline from $50M to
        $250M:
      </P>

      <H3>Days 1&ndash;30: Foundation</H3>
      <Ul>
        <Li>ICP audit and refinement</Li>
        <Li>Attribution model design and implementation</Li>
        <Li>Existing channel performance audit</Li>
        <Li>MarTech stack assessment</Li>
        <Li>90-day demand gen roadmap</Li>
      </Ul>

      <H3>Days 30&ndash;60: Build</H3>
      <Ul>
        <Li>ABM target list (Tier 1 and 2)</Li>
        <Li>Content calendar for top 10 keyword priorities</Li>
        <Li>Lead scoring model v1</Li>
        <Li>Sales-marketing SLA agreement</Li>
        <Li>Paid channel launch (LinkedIn + Google)</Li>
      </Ul>

      <H3>Days 60&ndash;90: Optimize</H3>
      <Ul>
        <Li>First attribution data analysis</Li>
        <Li>Lead scoring model refinement</Li>
        <Li>ABM first-wave results review</Li>
        <Li>Scale winning channels, cut underperformers</Li>
        <Li>Board-level pipeline reporting dashboard</Li>
      </Ul>

      <P>
        By day 90, you have a functioning demand gen system with real data. From
        there, the work is optimization and scale.
      </P>

      <InternalCta href="/services/demand-generation">
        → Work with me to build your demand gen program
      </InternalCta>
    </>
  ),

  // ── POST 5 ──────────────────────────────────────────────────────────────
  "revenue-operations-ai-forecasting-2025": (
    <>
      <P>
        I&apos;ll be sharing more on this topic at an upcoming webinar — but I
        wanted to get the core ideas down here first, because this is a question I
        get constantly: what does a high-functioning RevOps organization actually
        look like in 2025?
      </P>
      <P>The short answer: very different from what most companies have built.</P>

      <Hr />

      <H2>The RevOps Problems Most Companies Are Still Solving</H2>
      <P>
        Most RevOps organizations I work with are stuck solving the same set of
        first-generation problems:
      </P>
      <Ul>
        <Li>
          <Bold>CRM hygiene:</Bold> Data is incomplete, stale, or inconsistent.
          Sales reps enter notes but not deal details. Marketing records
          don&apos;t sync properly with CRM records.
        </Li>
        <Li>
          <Bold>Forecast accuracy:</Bold> Leadership doesn&apos;t trust the
          number. Deals are pulled in at quarter end. The CFO&apos;s model and
          the CRO&apos;s model produce different outputs.
        </Li>
        <Li>
          <Bold>Attribution ambiguity:</Bold> No one can confidently answer
          &ldquo;where is our pipeline coming from?&rdquo; Marketing and sales
          argue about source attribution.
        </Li>
        <Li>
          <Bold>Tech stack sprawl:</Bold> Tools were added tactically as problems
          arose, and now there are 20 systems that don&apos;t talk to each other
          cleanly.
        </Li>
      </Ul>
      <P>
        These are real problems that need solving. But they&apos;re table stakes.
        If you&apos;re still fighting these fires in 2025, your RevOps function is
        behind.
      </P>
      <P>
        The companies that are genuinely winning with RevOps have moved past these
        problems and are building the next generation of capability: AI-driven
        intelligence, real-time signal processing, and predictive operations.
      </P>

      <Hr />

      <H2>What High-Functioning RevOps Looks Like in 2025</H2>

      <H3>1. A Real-Time Data Architecture</H3>
      <P>
        The foundation of modern RevOps is not a CRM. It&apos;s a data
        architecture that unifies signals from every system — product, CRM,
        marketing automation, conversation intelligence, support — in real time.
      </P>
      <P>
        At HeyGen, I designed a data architecture that processed 10M+ monthly
        events in real time: product usage events from PostHog, CRM updates from
        Salesforce, campaign engagement from Customer.io, conversation data from
        Gong — all flowing into a unified data warehouse and being piped back into
        operational systems via Census and Polytomic.
      </P>
      <P>What this enables:</P>
      <Ul>
        <Li>A lead score that updates instantly when a user invites a teammate</Li>
        <Li>
          A forecast that adjusts when a champion at a deal goes dark
        </Li>
        <Li>
          A churn alert that fires the moment customer health signals deteriorate
        </Li>
        <Li>
          A capacity model that reflects real pipeline coverage, not last
          week&apos;s snapshot
        </Li>
      </Ul>

      <H3>2. AI-Driven Forecasting</H3>
      <P>
        95% forecast accuracy is achievable. I know because I built a system that
        hit it at HeyGen.
      </P>
      <P>The difference between a 70% accurate forecast and a 95% accurate one:</P>
      <Ul>
        <Li>
          <Bold>70% accuracy:</Bold> Stage-weighted probability. &ldquo;Deal is
          at Stage 3, so it&apos;s 40% likely to close.&rdquo; This ignores deal
          behavior entirely.
        </Li>
        <Li>
          <Bold>95% accuracy:</Bold> Pattern-trained model. &ldquo;Based on how
          this deal has behaved compared to historical closed-won patterns —
          velocity, engagement frequency, champion behavior, competitive mentions
          — this deal looks like an 82% probability to close by end of
          month.&rdquo;
        </Li>
      </Ul>
      <P>
        The inputs that matter most vary by company. Deal velocity, champion
        engagement frequency, multi-threading, and competitive mention patterns
        are almost always predictive. The model learns which signals matter in
        your specific sales environment — and gets more accurate over time.
      </P>

      <H3>3. PLG Intelligence</H3>
      <P>
        If you have a PLG motion, your product is generating the richest
        behavioral data in your GTM stack — and most RevOps functions aren&apos;t
        using it.
      </P>
      <P>The full PLG intelligence system includes:</P>
      <Ul>
        <Li>
          User-level product health scores (predicting individual churn and
          expansion)
        </Li>
        <Li>
          Account-level product health scores (aggregating individual signals to
          the account level)
        </Li>
        <Li>
          Expansion signal detection (accounts approaching usage limits, adopting
          new features, adding users)
        </Li>
        <Li>
          Champion identification (users who are driving product adoption for
          others within an account)
        </Li>
      </Ul>
      <P>
        At HeyGen, our product health scoring model predicted churn with 85%
        accuracy and identified expansion opportunities systematically — turning
        product data into a revenue operations input.
      </P>

      <H3>4. Automated Renewal &amp; Expansion Operations</H3>
      <P>
        Renewals and expansions are the highest-margin revenue a SaaS company
        generates — and they&apos;re routinely underinvested.
      </P>
      <P>The automated renewal system I built at HeyGen:</P>
      <Ul>
        <Li>
          Customer health score triggers automatic playbook activation 90/60/30
          days before renewal
        </Li>
        <Li>
          Low health scores trigger CSM intervention and executive outreach
        </Li>
        <Li>High health scores trigger expansion offers and upsell sequences</Li>
        <Li>
          <Bold>Result: 50% improvement in renewal rates</Bold>
        </Li>
      </Ul>

      <H3>5. Board-Level Reporting That Leadership Actually Trusts</H3>
      <P>
        The output of a well-functioning RevOps organization is confidence —
        confidence in the forecast, confidence in the attribution data, confidence
        in the pipeline health. Board-level reporting should answer three
        questions:
      </P>
      <Ul>
        <Li>Are we on track to hit the number?</Li>
        <Li>Why or why not?</Li>
        <Li>What do we need to do about it?</Li>
      </Ul>
      <P>
        If your board reporting takes days to prepare, involves manual data pulls,
        and still doesn&apos;t answer these questions with confidence, your RevOps
        architecture needs a rebuild.
      </P>

      <Hr />

      <H2>The Common Mistake: Buying Tools Without Designing Systems</H2>
      <P>
        The most common RevOps failure mode I see: companies buy a new tool
        expecting it to solve a systems problem. Tools don&apos;t solve systems
        problems. They amplify them.
      </P>
      <Ul>
        <Li>
          A forecasting tool built on top of bad CRM data will forecast
          incorrectly, faster.
        </Li>
        <Li>
          A lead scoring tool with no integration to product data will score using
          incomplete signals.
        </Li>
        <Li>
          An ABM platform without clean ICP definition will target the wrong
          accounts more efficiently.
        </Li>
      </Ul>
      <P>
        Before buying tools, design the system. Understand what data you need,
        where it lives, how it flows, and how it gets used in decisions. Then
        select tools that fit the architecture.
      </P>

      <InternalCta href="/services/revenue-operations">
        → How I approach RevOps architecture for B2B SaaS companies
      </InternalCta>
    </>
  ),

  // ── POST 6 ──────────────────────────────────────────────────────────────
  "community-led-growth-b2b-saas-strategy": (
    <>
      <P>
        When we launched HeyGen&apos;s community platform in 2024, the goal
        wasn&apos;t just to build a forum. It was to build a growth channel.
      </P>
      <P>
        Six months later, we had 100,000 active members and a community that was
        driving a measurable 30% lift in new customer acquisition.
      </P>
      <P>
        Here&apos;s how we did it — and more importantly, why community-led
        growth works as a B2B acquisition channel in a way that many operators
        underestimate.
      </P>

      <Hr />

      <H2>Why Community Works as a B2B Growth Channel</H2>
      <P>
        Community-led growth is chronically underinvested because it looks slow
        and soft compared to paid acquisition. You can&apos;t A/B test it in a
        week. You can&apos;t scale spend to scale results. The attribution is
        indirect.
      </P>
      <P>But the economics are exceptional when it works:</P>
      <Ul>
        <Li>
          <Bold>CAC is essentially zero.</Bold> Word-of-mouth referrals from
          community members cost nothing to generate.
        </Li>
        <Li>
          <Bold>The trust transfer is enormous.</Bold> A recommendation from a
          peer user carries more weight than any marketing message you can write.
        </Li>
        <Li>
          <Bold>The compounding effect is real.</Bold> Every new community member
          is a potential advocate, educator, and referral source. The value
          compounds.
        </Li>
        <Li>
          <Bold>Retention improves dramatically.</Bold> Customers who are engaged
          in a product community churn at significantly lower rates.
        </Li>
      </Ul>
      <P>
        The challenge is that you can&apos;t build a community on demand. You
        have to earn it.
      </P>

      <Hr />

      <H2>The HeyGen Community Launch: What We Did</H2>

      <H3>Step 1: Identify and Engage Seed Members Before Launch</H3>
      <P>
        The worst thing you can do when launching a community is open the doors
        to a ghost town. We identified HeyGen&apos;s most engaged users through
        product analytics — users with the highest usage frequency, highest video
        output, and highest sharing behavior — and engaged them personally before
        the community launched.
      </P>
      <P>We offered seed members:</P>
      <Ul>
        <Li>Early access to the community platform before public launch</Li>
        <Li>
          Direct access to HeyGen&apos;s product team for feedback sessions
        </Li>
        <Li>Recognition within the community as founding members</Li>
        <Li>Early access to new features before they went public</Li>
      </Ul>
      <P>
        These 200 seed members became the initial energy in the community. When
        the platform launched publicly, new members arrived to find an active,
        high-quality community — not an empty forum.
      </P>

      <H3>Step 2: Design for Value Exchange, Not Just Connection</H3>
      <P>
        Many B2B communities fail because they&apos;re structured as forums —
        places to ask questions and get answers. Useful, but not a growth driver.
      </P>
      <P>
        We designed the HeyGen community around three types of value:
      </P>
      <Ul>
        <Li>
          <Bold>Learning:</Bold> Weekly workshops, tutorials, and AMA sessions
          with HeyGen&apos;s product team and power users. Not promotional —
          genuinely educational. &ldquo;How to use HeyGen for agency-scale video
          production.&rdquo; &ldquo;How L&D teams are using HeyGen for compliance
          training.&rdquo;
        </Li>
        <Li>
          <Bold>Recognition:</Bold> Community members could share their work, get
          feedback, and receive recognition from peers and from HeyGen. We built a
          showcase program that highlighted exceptional community-created content
          weekly.
        </Li>
        <Li>
          <Bold>Access:</Bold> Community members got early access to new features,
          direct input into the product roadmap, and a direct line to
          HeyGen&apos;s product team.
        </Li>
      </Ul>

      <H3>Step 3: Build the Feedback Loop Between Community and Acquisition</H3>
      <P>
        Community doesn&apos;t automatically generate acquisition. You have to
        build the connection.
      </P>
      <Ul>
        <Li>
          <Bold>Shareability:</Bold> Every community showcase, tutorial, and event
          was designed to be easily shared outside the community. Community
          content became organic marketing content.
        </Li>
        <Li>
          <Bold>Onboarding integration:</Bold> New HeyGen users were invited to
          the community during onboarding, with a specific prompt tied to their
          use case. Community membership became part of the product experience.
        </Li>
        <Li>
          <Bold>Referral mechanic:</Bold> Community members who referred new users
          got recognition and benefits within the community. This turned the
          community into an active referral channel.
        </Li>
      </Ul>

      <H3>Step 4: Measure Community as a Business Channel</H3>
      <P>We tracked community impact through three lenses:</P>
      <Ul>
        <Li>
          <Bold>New customer acquisition:</Bold> By tagging community-referred
          signups, we could measure direct attribution. 30% lift in new customer
          acquisition.
        </Li>
        <Li>
          <Bold>Activation rate:</Bold> Users who joined the community had higher
          product activation rates — they learned faster and adopted more
          features.
        </Li>
        <Li>
          <Bold>Retention rate:</Bold> Community members churned at significantly
          lower rates than non-members.
        </Li>
      </Ul>

      <Hr />

      <H2>What It Takes to Do This Well</H2>
      <P>
        Community-led growth is not a set-it-and-forget-it initiative. The
        investment required:
      </P>
      <Ul>
        <Li>
          <Bold>Dedicated community management:</Bold> Someone whose job is to be
          present, facilitate, and invest in member relationships.
        </Li>
        <Li>
          <Bold>Product team participation:</Bold> AMAs, feature previews,
          feedback sessions. Community members need to feel their input matters.
        </Li>
        <Li>
          <Bold>Programming cadence:</Bold> Regular events, challenges, showcases
          — reasons for members to come back and engage consistently.
        </Li>
        <Li>
          <Bold>Patience:</Bold> The compounding effect of community doesn&apos;t
          show up in 30 days. It shows up in 6&ndash;12 months.
        </Li>
      </Ul>

      <Hr />

      <H2>Is Community Right for Your Company?</H2>
      <P>Community-led growth works best when:</P>
      <Ul>
        <Li>Your product has passionate, high-frequency users</Li>
        <Li>
          Your category benefits from peer learning (how other people use the
          product is valuable knowledge)
        </Li>
        <Li>
          Your ICP has professional identity tied to the category (marketers,
          developers, creators — people who identify with what they do)
        </Li>
      </Ul>
      <P>
        If you have passionate users who are already talking about your product in
        Slack groups and subreddits, you have the raw material for a community.
        The question is whether you build the infrastructure to channel that
        energy.
      </P>

      <InternalCta href="/services/growth-marketing">
        → How I build community-led growth programs
      </InternalCta>
    </>
  ),

  // ── POST 7 ──────────────────────────────────────────────────────────────
  "abm-strategy-b2b-saas-enterprise-pipeline": (
    <>
      <P>
        Account-Based Marketing has been a buzzword for the better part of a
        decade. Most companies say they do ABM. Most companies are actually doing
        spray-and-pray outbound with a company name inserted in the subject line.
      </P>
      <P>
        Real ABM — the kind that generated $XXM in pipeline at HeyGen and
        improved pipeline efficiency 3× at Egnyte — is a fundamentally different
        discipline. Here&apos;s the playbook.
      </P>

      <Hr />

      <H2>What ABM Actually Is (and Isn&apos;t)</H2>
      <P>
        ABM is not personalized email campaigns. That&apos;s a tactic. ABM is a
        strategy for concentrating your marketing and sales resources on a
        specific set of accounts where the probability of winning is highest, and
        creating coordinated multi-channel experiences designed to accelerate
        those accounts through your pipeline.
      </P>
      <P>
        The core principle: depth over breadth. Instead of reaching 10,000
        accounts with shallow awareness campaigns, you reach 500 accounts with
        deeply relevant, multi-channel, multi-touchpoint programs.
      </P>

      <Hr />

      <H2>The Tiered ABM Model</H2>
      <P>
        The most effective ABM programs I&apos;ve built use a tiered structure
        that allocates resources proportionally to account value:
      </P>

      <H3>Tier 1: Strategic Accounts (50&ndash;100 accounts)</H3>
      <P>
        These are your highest-priority, highest-ACV targets. White-glove
        treatment.
      </P>
      <Ul>
        <Li>
          Dedicated account research: firmographic, technographic, recent news,
          key stakeholder mapping
        </Li>
        <Li>
          Fully personalized outreach sequences (sales + marketing coordinated)
        </Li>
        <Li>Custom landing pages or microsites for priority accounts</Li>
        <Li>Executive outreach and sponsorship for flagship accounts</Li>
        <Li>
          Personalized content and case studies matched to their specific industry
          and use case
        </Li>
        <Li>
          Direct mail (yes, it works at this tier — especially for accounts that
          are hard to reach digitally)
        </Li>
      </Ul>
      <P>
        At HeyGen, Tier 1 accounts had dedicated resources from both sales and
        marketing. The conversion rate from target to pipeline was 3&ndash;4×
        higher than non-ABM outreach.
      </P>

      <H3>Tier 2: Programmatic Accounts (500&ndash;2,000 accounts)</H3>
      <P>
        These are strong ICP fits with meaningful ACV potential, but not enough to
        justify fully custom treatment. You scale personalization here using
        technology.
      </P>
      <Ul>
        <Li>Clay for automated research and personalization at scale</Li>
        <Li>
          Intent signal monitoring (6sense or Demandbase) to identify in-market
          accounts
        </Li>
        <Li>
          LinkedIn advertising campaigns targeted precisely to these accounts
        </Li>
        <Li>
          Personalized email sequences using account-specific research inserted
          via Clay
        </Li>
        <Li>
          Content retargeting: if a target account visits your pricing page,
          trigger a specific follow-up sequence
        </Li>
      </Ul>

      <H3>Tier 3: Industry/Segment Campaigns (5,000&ndash;20,000 accounts)</H3>
      <P>
        These are broad ICP fits that you don&apos;t have bandwidth to treat
        individually. Traditional demand gen with ICP targeting — LinkedIn
        advertising, content marketing, webinars by vertical.
      </P>

      <Hr />

      <H2>The Technology Stack</H2>
      <P>The ABM stack I run:</P>
      <Ul>
        <Li>
          <Bold>Intent data:</Bold> 6sense or Demandbase. These tools identify
          accounts that are researching your category right now — showing up on
          review sites, consuming competitor content, searching intent keywords.
        </Li>
        <Li>
          <Bold>Research and personalization:</Bold> Clay. This is the tool that
          enables programmatic Tier 2 ABM at scale — building account research
          automatically and using AI to generate personalized outreach context.
        </Li>
        <Li>
          <Bold>CRM and account management:</Bold> Salesforce. Account plans,
          opportunity tracking, ABM stage tracking.
        </Li>
        <Li>
          <Bold>Advertising:</Bold> LinkedIn for account-matched advertising. The
          targeting is precise enough that you can serve ads only to specific
          people at specific accounts.
        </Li>
        <Li>
          <Bold>Engagement platform:</Bold> Demandbase or Terminus for
          orchestrating multi-channel ABM experiences.
        </Li>
      </Ul>

      <Hr />

      <H2>The Content Approach for ABM</H2>
      <P>
        ABM content is different from demand gen content. The goal is not to
        attract an audience — it&apos;s to move specific accounts through your
        pipeline.
      </P>

      <H3>Awareness</H3>
      <P>
        Industry-specific thought leadership. &ldquo;How L&D teams at Fortune 500
        companies are using AI video.&rdquo; The goal is to build brand
        recognition and credibility within the specific vertical you&apos;re
        targeting.
      </P>

      <H3>Consideration</H3>
      <P>
        Use case-specific content. ROI calculators, peer case studies, comparison
        guides. When this content is personalized to the specific account&apos;s
        situation, conversion rates are dramatically higher.
      </P>

      <H3>Decision</H3>
      <P>
        Proof and risk reduction. Customer references, security documentation,
        implementation guides, executive briefings. Enterprise buyers need to feel
        confident that they won&apos;t fail — content at this stage is about
        reducing perceived risk.
      </P>

      <Hr />

      <H2>The Measurement Framework</H2>
      <P>ABM success metrics are different from traditional demand gen metrics:</P>
      <Ul>
        <Li>
          <Bold>Account engagement score:</Bold> Are target accounts consuming
          your content, visiting your site, engaging with your ads?
        </Li>
        <Li>
          <Bold>Account pipeline coverage:</Bold> What percentage of your Tier 1
          and Tier 2 accounts have active opportunities?
        </Li>
        <Li>
          <Bold>Velocity by ABM tier:</Bold> Are Tier 1 accounts moving through
          pipeline faster than non-ABM accounts?
        </Li>
        <Li>
          <Bold>Win rate by ABM tier:</Bold> Are you winning more of the accounts
          you&apos;ve invested in? (This is the ultimate validation of ABM
          quality.)
        </Li>
      </Ul>
      <P>
        The mistake I see most often: measuring ABM success by volume (how many
        accounts did we touch?) rather than quality (how many accounts converted
        to pipeline, and at what rate?). ABM is a quality discipline — if
        you&apos;re measuring it with volume metrics, you&apos;re measuring the
        wrong thing.
      </P>

      <Hr />

      <H2>The Egnyte and HeyGen Results</H2>
      <P>
        At Egnyte, building the double-funnel ABM strategy (Tier 1 white-glove +
        Tier 2 programmatic) improved pipeline efficiency 3× — we were generating
        more pipeline with the same spend by concentrating investment on
        high-probability accounts. The conversation intelligence and chat programs
        I added generated an additional $20M in pipeline.
      </P>
      <P>
        At HeyGen, the ABM program targeting Global 2000 accounts across Agency,
        L&D, and API segments generated $XXM in enterprise pipeline. The key
        enabler was segment-specific messaging and content — treating Agency
        buyers, L&D buyers, and enterprise API buyers as completely distinct
        audiences with distinct problems and distinct value propositions.
      </P>

      <InternalCta href="/services/demand-generation">
        → How I build ABM programs for B2B SaaS companies
      </InternalCta>
    </>
  ),

  // ── POST 8 ──────────────────────────────────────────────────────────────
  "seo-from-zero-b2b-saas-organic-growth": (
    <>
      <P>
        When I joined HeyGen, the company had 15-20 million registered users and
        $20M ARR — and essentially zero organic search presence.
      </P>
      <P>
        The company had been growing almost entirely through product virality and
        word of mouth. Great for early growth. Unsustainable as a primary growth
        channel at scale, and leaving enormous demand uncaptured.
      </P>
      <P>
        I built and launched HeyGen&apos;s first SEO program. Within 12 months:
        50%+ year-over-year organic traffic growth, reversing a declining
        baseline. Here&apos;s exactly how I did it.
      </P>

      <Hr />

      <H2>Phase 1: The Audit (Weeks 1&ndash;2)</H2>
      <P>
        Before writing a single word of content or changing a single meta tag, I
        spent two weeks understanding the current state.
      </P>

      <H3>Technical Audit</H3>
      <P>
        Using Screaming Frog, Google Search Console, and Ahrefs, I audited:
      </P>
      <Ul>
        <Li>
          Crawlability: were all important pages being indexed? Were there crawl
          errors blocking search engines?
        </Li>
        <Li>
          Core Web Vitals: what were load times, CLS, and LCP scores?
        </Li>
        <Li>
          Internal linking structure: was link equity being distributed
          appropriately across important pages?
        </Li>
        <Li>
          Duplicate content: were there canonical issues, parameter URLs, or
          staging content being indexed?
        </Li>
        <Li>
          Schema markup: were pages using structured data to improve search engine
          understanding?
        </Li>
      </Ul>
      <P>
        At HeyGen, we found several crawl blockers preventing important product
        pages from being indexed, plus performance issues hurting Core Web Vitals
        scores. Fixing these alone resulted in ranking improvements within the
        first month.
      </P>

      <H3>Keyword Landscape Audit</H3>
      <P>Using Ahrefs, I mapped:</P>
      <Ul>
        <Li>
          What keywords were competitors ranking for that HeyGen wasn&apos;t?
        </Li>
        <Li>What keywords were driving traffic to competitor sites?</Li>
        <Li>
          What was the search volume and competition level for target keyword
          categories?
        </Li>
        <Li>
          Where were the gaps between what users were searching for and what
          HeyGen was offering as content?
        </Li>
      </Ul>

      <H3>Content Audit</H3>
      <P>
        What content existed? What was performing? What could be improved vs. what
        needed to be created from scratch?
      </P>

      <Hr />

      <H2>Phase 2: Keyword Strategy (Weeks 2&ndash;3)</H2>
      <P>
        A keyword strategy is not a list of keywords. It&apos;s a framework for
        understanding how buyers search at different stages of their journey, and
        building content to intercept them at each stage.
      </P>

      <H3>The Buyer Journey Keyword Framework</H3>
      <Ul>
        <Li>
          <Bold>Awareness keywords:</Bold> Buyers are discovering they have a
          problem. Searches like &ldquo;how to create video content for
          marketing&rdquo; or &ldquo;AI video tools.&rdquo; High volume, lower
          commercial intent. Content: educational articles, guides, how-tos.
        </Li>
        <Li>
          <Bold>Consideration keywords:</Bold> Buyers are evaluating solutions.
          Searches like &ldquo;best AI video generator&rdquo; or &ldquo;HeyGen vs
          Synthesia.&rdquo; Medium volume, high commercial intent. Content:
          comparison pages, feature deep-dives, case studies.
        </Li>
        <Li>
          <Bold>Decision keywords:</Bold> Buyers are close to purchase. Searches
          like &ldquo;[product name] pricing&rdquo; or &ldquo;[product name] for
          [specific use case].&rdquo; Lower volume, highest commercial intent.
          Content: landing pages, pricing pages, use case pages.
        </Li>
      </Ul>
      <P>
        The mistake most companies make: investing all content effort in awareness
        keywords (high volume, feels impressive) while neglecting consideration
        and decision keywords (lower volume, but much higher conversion).
      </P>

      <Hr />

      <H2>Phase 3: Technical Foundation (Weeks 3&ndash;4)</H2>
      <P>
        With the keyword strategy defined, I built the technical foundation before
        producing any content.
      </P>
      <Ul>
        <Li>
          <Bold>Schema markup:</Bold> Person, Organization, Product, and FAQ
          schema on relevant pages. Schema helps search engines understand your
          content and enables rich results in SERPs.
        </Li>
        <Li>
          <Bold>URL structure:</Bold> Ensured URL hierarchy reflected the keyword
          strategy. Consistency and clarity in URL structure helps search engines
          understand site architecture.
        </Li>
        <Li>
          <Bold>Internal linking plan:</Bold> Built a linking framework ensuring
          that commercial pages received internal link equity from supporting
          content.
        </Li>
        <Li>
          <Bold>Core Web Vitals improvements:</Bold> Addressed image compression,
          lazy loading, and render-blocking resources hurting performance scores.
        </Li>
        <Li>
          <Bold>Sitemap:</Bold> Ensured the XML sitemap was complete, current, and
          submitted to Google Search Console.
        </Li>
      </Ul>

      <Hr />

      <H2>Phase 4: Content Production System (Month 2 Onward)</H2>
      <P>
        This is where most SEO programs succeed or fail. Content production at
        scale requires a system, not a freelancer.
      </P>
      <P>The content production system I built at HeyGen:</P>
      <Ul>
        <Li>
          <Bold>AI-assisted keyword briefing:</Bold> For each target keyword, a
          detailed content brief using competitive analysis and AI tools. The
          brief specified: target keyword, secondary keywords, search intent,
          recommended structure, key points to cover, internal links, and CTA.
        </Li>
        <Li>
          <Bold>Writer assignment and drafting:</Bold> Briefs went to writers
          (internal and freelance) with category expertise. The AI did the
          research and structuring; humans brought the expertise and perspective.
        </Li>
        <Li>
          <Bold>SEO review and optimization:</Bold> Before publication, every
          piece went through an SEO review: keyword density and placement, meta
          title and description, header structure, internal links, image alt text.
        </Li>
        <Li>
          <Bold>Distribution:</Bold> Every piece published got a distribution
          sequence: LinkedIn post, email to relevant segment, community post if
          relevant.
        </Li>
        <Li>
          <Bold>Performance review:</Bold> Monthly review of all published
          content: what&apos;s ranking, what&apos;s not, what needs updating. SEO
          is not set-and-forget.
        </Li>
      </Ul>

      <Hr />

      <H2>Phase 5: Link Building (Ongoing)</H2>
      <P>
        Link building is the lever that most B2B SaaS companies underinvest in.
        Domain authority is critical for ranking competitive terms, and you
        can&apos;t build it without links.
      </P>
      <P>The link acquisition strategy at HeyGen:</P>
      <Ul>
        <Li>
          <Bold>Partner content:</Bold> Co-authored pieces with complementary SaaS
          tools that linked back to HeyGen.
        </Li>
        <Li>
          <Bold>Podcast appearances:</Bold> Each podcast appearance generated a
          high-DA link from the podcast&apos;s site. I prioritized podcasts in the
          marketing, L&D, and AI/SaaS categories.
        </Li>
        <Li>
          <Bold>Data and research content:</Bold> Publishing original research or
          surveys generates backlinks naturally. We published an AI Video Marketing
          report that earned 15+ organic backlinks within 30 days.
        </Li>
        <Li>
          <Bold>Journalist and media outreach:</Bold> AI was a hot topic. I built
          relationships with journalists covering AI tools and ensured HeyGen was
          on their list for product coverage.
        </Li>
        <Li>
          <Bold>Directory listings:</Bold> G2, Capterra, Product Hunt, and similar
          sites. Free backlinks with high domain authority.
        </Li>
      </Ul>

      <Hr />

      <H2>The Results and What They Mean</H2>
      <P>
        50%+ YoY organic traffic growth from a declining baseline is meaningful.
        But the more important metric is pipeline contribution — how much of that
        organic traffic turned into leads and customers?
      </P>
      <P>
        At HeyGen, organic search became a meaningful pipeline channel within 12
        months — not the primary channel, but a real contributor that didn&apos;t
        require ongoing spend to maintain.
      </P>
      <P>
        The compounding effect of SEO means those results will keep growing. Every
        piece of content we published continues to generate traffic. The link
        authority we built continues to help new content rank faster. The
        technical foundation we built accommodates growth without degradation.
      </P>
      <P>
        That&apos;s the power of building a real SEO program: it&apos;s an asset,
        not an expense.
      </P>

      <Hr />

      <H2>The Biggest Mistakes to Avoid</H2>
      <Ul>
        <Li>
          <Bold>Starting with content before fixing technical issues.</Bold>{" "}
          Technical blockers will prevent your content from ranking regardless of
          quality.
        </Li>
        <Li>
          <Bold>Targeting keywords that are too competitive.</Bold> A Series A
          company cannot rank for &ldquo;marketing software&rdquo; in year one.
          Start with long-tail, specific keywords where competition is lower.
        </Li>
        <Li>
          <Bold>Treating SEO as a campaign.</Bold> SEO requires consistent
          investment over 12+ months. If you stop, the results erode.
        </Li>
        <Li>
          <Bold>Ignoring conversion optimization.</Bold> Traffic that doesn&apos;t
          convert is vanity. Every important landing page needs a clear CTA tied
          to a lead capture mechanism.
        </Li>
        <Li>
          <Bold>Not measuring pipeline attribution.</Bold> Know which organic
          keywords are driving leads, not just traffic.
        </Li>
      </Ul>

      <InternalCta href="/services/demand-generation">
        → How I build SEO programs for B2B SaaS companies
      </InternalCta>
    </>
  ),
};
