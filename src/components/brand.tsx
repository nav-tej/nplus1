/**
 * n+α brand components, ported from the n+α design system
 * (claude.ai/artifact/LkJFJ1m81KYet9EeMNzd3z, components/src/index.jsx).
 * All server components: plain markup + brand.css, no client JS. Styles live in
 * src/app/brand.css under the `na-` prefix.
 */
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { CASES, HEYGEN_ARR, HEYGEN_ARR_ANNOTATIONS, POSTS, PROCESS, TRACK, type CaseCard, type Pair, type Post, type Stop } from "@/lib/brand-data";

const cx = (...a: (string | false | undefined | null)[]) => a.filter(Boolean).join(" ");
const Arrow = () => (
  <span className="na-arrow" aria-hidden="true">
    →
  </span>
);

/* ---------- Brand ---------- */
export function Wordmark({ size = 24, className }: { size?: number; className?: string }) {
  return (
    <span className={cx("na-mark", className)} style={{ fontSize: size }} role="img" aria-label="n plus alpha">
      <span className="na-mark-n" aria-hidden="true">n+</span>
      <span className="na-mark-a" aria-hidden="true">α</span>
    </span>
  );
}

/* ---------- Primitives ---------- */
export function Button({
  variant = "primary",
  size,
  href,
  arrow,
  children,
  className,
}: {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm";
  href: string;
  arrow?: boolean;
  children: ReactNode;
  className?: string;
}) {
  const cls = cx("na-btn", "na-btn-" + variant, size === "sm" && "na-btn-sm", className);
  const inner = (
    <>
      {children}
      {arrow && <Arrow />}
    </>
  );
  if (href.startsWith("mailto:")) return <a href={href} className={cls}>{inner}</a>;
  return (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}

export function Tag({ tone, children }: { tone?: "alpha" | "steel" | "live"; children: ReactNode }) {
  return <span className={cx("na-tag", tone && "na-tag-" + tone)}>{children}</span>;
}

export function Eyebrow({ index, children }: { index?: string; children: ReactNode }) {
  return (
    <span className="na-eyebrow">
      {index && <b>{index}</b>}
      {children}
    </span>
  );
}

export function SectionHeader({
  eyebrow,
  index,
  title,
  lede,
  action,
  id,
}: {
  eyebrow?: string;
  index?: string;
  title: ReactNode;
  lede?: string;
  action?: ReactNode;
  id?: string;
}) {
  return (
    <div className="na-sh">
      <div className="na-sh-copy">
        {eyebrow && <Eyebrow index={index}>{eyebrow}</Eyebrow>}
        <h2 className="na-h2" id={id}>
          {title}
        </h2>
        {lede && <p className="na-lede">{lede}</p>}
      </div>
      {action}
    </div>
  );
}

/* ---------- AlphaCurve: the brand motif. n = baseline, α = the gap above it. ---------- */
type Pt = [number, number];
const polyline = (pts: Pt[]) => pts.map((p, i) => (i ? "L" : "M") + p[0].toFixed(1) + " " + p[1].toFixed(1)).join(" ");
/** Catmull-Rom through every point, as cubic Béziers. Tangents follow the neighbours, so dense series stay smooth instead of stepping. */
function smooth(pts: Pt[]) {
  const f = (n: number) => n.toFixed(1);
  let d = "M" + f(pts[0][0]) + " " + f(pts[0][1]);
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] || pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] || p2;
    const c1: Pt = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2: Pt = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C${f(c1[0])} ${f(c1[1])} ${f(c2[0])} ${f(c2[1])} ${f(p2[0])} ${f(p2[1])}`;
  }
  return d;
}

export function AlphaCurve({
  values = [20, 23, 28, 35, 44, 55, 68, 84, 100],
  baseline,
  width = 480,
  height = 220,
  variant = "curve",
  labels = true,
  baseLabel = "n · baseline",
  animate = false,
  ariaLabel,
  annotations = [],
}: {
  values?: number[];
  baseline?: number[];
  width?: number;
  height?: number;
  variant?: "curve" | "steps";
  labels?: boolean;
  baseLabel?: string;
  animate?: boolean;
  ariaLabel?: string;
  /** Real endpoints only (reported figures with dates). The path between stays stylized. */
  annotations?: { i: number; label: string; sub?: string }[];
}) {
  const pad = { t: annotations.length ? 48 : 24, r: 28, b: labels ? 26 : 8, l: 8 };
  const W = width - pad.l - pad.r;
  const H = height - pad.t - pad.b;
  const n = values.length;
  const max = Math.max(...values) * 1.05;
  const base = baseline || values.map((_, i) => values[0] * (1 + 0.28 * (i / (n - 1))));
  const X = (i: number) => pad.l + (i / (n - 1)) * W;
  const Y = (v: number) => pad.t + H - (v / max) * H;
  const P: Pt[] = values.map((v, i) => [X(i), Y(v)]);
  const B: Pt[] = base.map((v, i) => [X(i), Y(v)]);

  if (variant === "steps") {
    const slot = W / n;
    const bw = slot - 8;
    return (
      <svg className="na-curve" viewBox={`0 0 ${width} ${height}`} role="img" aria-label={ariaLabel || "Foundation build, stepped"}>
        <line className="base" x1={pad.l} x2={width - pad.r} y1={Y(values[0])} y2={Y(values[0])} />
        {values.map((v, i) => (
          <rect key={i} className={cx("step", i < 2 && "ghost")} x={pad.l + i * slot + 4} y={Y(v)} width={bw} height={pad.t + H - Y(v)} rx="3" />
        ))}
        {labels && (
          <text className="lbl" x={pad.l} y={height - 6}>
            0 → 1
          </text>
        )}
      </svg>
    );
  }

  const d = smooth(P);
  const gap = d + " " + polyline(B.slice().reverse()).replace("M", "L") + " Z";
  const end = P[n - 1];
  const len = 2 * (W + H);
  return (
    <svg
      className={cx("na-curve", animate && "draw")}
      viewBox={`0 0 ${width} ${height}`}
      style={{ "--len": len } as CSSProperties}
      role="img"
      aria-label={ariaLabel || "Growth above baseline"}
    >
      {[0.25, 0.5, 0.75].map((f) => (
        <line key={f} className="grid" x1={pad.l} x2={width - pad.r} y1={pad.t + H * f} y2={pad.t + H * f} />
      ))}
      <path className="gap" d={gap} />
      <path className="base" d={polyline(B)} />
      <path className="line" d={d} />
      <circle className="halo" cx={end[0]} cy={end[1]} r="9" />
      <circle className="dot" cx={end[0]} cy={end[1]} r="4" />
      {labels && (
        <text className="lbl" x={pad.l} y={height - 6}>
          {baseLabel}
        </text>
      )}
      {labels && (
        <text className="lbl-a" x={end[0] + 10} y={(end[1] + B[n - 1][1]) / 2 + 6}>
          α
        </text>
      )}
      {annotations.map((a) => {
        const [x, y] = P[a.i];
        const right = a.i > n / 2;
        const tx = right ? x + 4 : x + 10;
        const ty = right ? y - 28 : y - 22;
        return (
          <g key={a.i} className="ann">
            <circle cx={x} cy={y} r="3.5" className="ann-dot" />
            <text x={tx} y={ty} textAnchor={right ? "end" : "start"} className="ann-v">
              {a.label}
            </text>
            {a.sub && (
              <text x={tx} y={ty + 14} textAnchor={right ? "end" : "start"} className="ann-s">
                {a.sub}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}

/* ---------- Hero ---------- */
export function Hero({
  eyebrow,
  title,
  lede,
  primary,
  secondary,
  note,
  panel,
}: {
  eyebrow?: string;
  title: ReactNode;
  lede?: string;
  primary: [string, string];
  secondary?: [string, string];
  note?: string;
  panel?: ReactNode;
}) {
  return (
    <section className="na-hero" aria-labelledby="hero-heading">
      <div className="na-wrap na-hero-grid">
        <div className="na-hero-copy">
          {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
          <h1 className="na-h1" id="hero-heading">
            {title}
          </h1>
          {lede && <p className="na-lede">{lede}</p>}
          <div className="na-hero-ctas">
            <Button href={primary[1]} arrow>
              {primary[0]}
            </Button>
            {secondary && (
              <Button variant="secondary" href={secondary[1]}>
                {secondary[0]}
              </Button>
            )}
          </div>
          {note && (
            <div className="na-hero-note">
              <Tag tone="live">Open</Tag>
              {note}
            </div>
          )}
        </div>
        {panel}
      </div>
    </section>
  );
}

export function HeroPanel({
  kicker = "HeyGen · ARR",
  figure = "$20M → $100M+",
  unit = "21 months",
  values = HEYGEN_ARR,
  annotations = HEYGEN_ARR_ANNOTATIONS,
  foot = [
    ["5×", "ARR growth"],
    ["100K+", "community"],
    ["$25M", "ABM pipeline"],
  ],
  note = "HeyGen announced $100M+ ARR in October 2025. The path between the two labelled points is stylized.",
}: {
  kicker?: string;
  figure?: string;
  unit?: string;
  values?: number[];
  annotations?: { i: number; label: string; sub?: string }[];
  foot?: Pair[];
  note?: string;
}) {
  return (
    <aside className="na-hero-panel" aria-label="HeyGen growth summary">
      <div className="na-hero-panel-head">
        <Eyebrow>{kicker}</Eyebrow>
        <Tag tone="alpha">Case 01</Tag>
      </div>
      <div className="na-hero-panel-fig na-num">
        {figure}
        <small>{unit}</small>
      </div>
      <AlphaCurve values={values} annotations={annotations} animate height={200} baseLabel="n · baseline growth" ariaLabel="HeyGen ARR rising from $20M in April 2024 past $100M in October 2025, well above a baseline growth line. Stylized." />
      <div className="na-hero-panel-foot">
        {foot.map(([v, l]) => (
          <div key={l}>
            <strong className="na-num">{v}</strong>
            {l}
          </div>
        ))}
      </div>
      {note && <div className="na-calc-fine">{note}</div>}
    </aside>
  );
}

/* ---------- Proof ---------- */
export function ProofStrip({
  label = "Operator at",
  items = [
    ["a16z", "Partner"],
    ["Egnyte", ""],
    ["Semgrep", ""],
    ["HeyGen", ""],
    ["Comfy", ""],
  ],
}: {
  label?: string;
  items?: [name: string, role: string][];
}) {
  return (
    <div className="na-proof">
      <span className="na-proof-lbl">{label}</span>
      <div className="na-proof-list">
        {items.map(([n, r]) => (
          <span key={n}>
            {n}
            {r && <i>{r}</i>}
          </span>
        ))}
      </div>
    </div>
  );
}

export interface MetricProps {
  value: string;
  unit?: string;
  label?: string;
  context?: string;
  small?: boolean;
}
export function Metric({ value, unit, label, context, small }: MetricProps) {
  return (
    <div className={cx("na-metric", small && "sm")}>
      <div className="na-metric-v na-num">
        {value}
        {unit && <span className="u">{unit}</span>}
      </div>
      {label && <div className="na-metric-l">{label}</div>}
      {context && <div className="na-metric-c">{context}</div>}
    </div>
  );
}
export function MetricRow({ items, cols = 4, small }: { items: MetricProps[]; cols?: number; small?: boolean }) {
  return (
    <div className="na-metrics" style={{ "--cols": cols } as CSSProperties}>
      {items.map((m, i) => (
        <Metric key={i} small={small} {...m} />
      ))}
    </div>
  );
}

/* ---------- Track record ---------- */
export function TrackRecord({ stops = TRACK }: { stops?: Stop[] }) {
  return (
    <ol className="na-track" style={{ "--n": stops.length, listStyle: "none", margin: 0, padding: 0 } as CSSProperties}>
      {stops.map((s) => (
        <li key={s.org} className={cx("na-stop", s.now && "now")}>
          <div className="na-stop-y">{s.years}</div>
          <div className="na-stop-dot" />
          <div className="na-stop-org">{s.org === "n+α" ? <Wordmark size={24} /> : s.org}</div>
          <div className="na-stop-role">{s.role}</div>
          <div className="na-stop-m na-num">{s.m}</div>
          <div className="na-stop-ml">{s.ml}</div>
          <div className="na-stop-cat">
            <Tag>{s.cat}</Tag>
          </div>
        </li>
      ))}
    </ol>
  );
}

/* ---------- Case studies ---------- */
export function CaseStudyCard({
  index,
  org,
  cat,
  years,
  title,
  metrics = [],
  curve,
  variant,
  slug,
  feature,
  wide,
  half,
  fig,
  figLabel,
  headingLevel = 3,
}: CaseCard & { index?: string; feature?: boolean; wide?: boolean; half?: boolean; headingLevel?: 2 | 3 }) {
  const big = feature || wide;
  const Title = headingLevel === 2 ? "h2" : "h3";
  return (
    <Link className={cx("na-card", feature && "feature", wide && "feature wide", half && "half")} href={"/case-studies/" + slug}>
      <div className="na-card-art">
        <span className="na-card-idx">{index}</span>
        {big && fig && (
          <div className="na-card-fig">
            <strong className="na-num">{fig}</strong>
            <span>{figLabel}</span>
          </div>
        )}
        <AlphaCurve values={curve} variant={variant} height={big ? 220 : 150} labels={false} ariaLabel={org + " growth shape, stylized"} />
      </div>
      <div className="na-card-body">
        <div className="na-card-org">
          <b>{org}</b>
          <span>{years}</span>
        </div>
        <Title className="na-card-t">{title}</Title>
        <div className="na-card-ms">
          {metrics.map(([v, l]) => (
            <div key={l}>
              <strong className="na-num">{v}</strong>
              <span>{l}</span>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Tag>{cat}</Tag>
          <span className="na-card-go">
            Read case <Arrow />
          </span>
        </div>
      </div>
    </Link>
  );
}

/** First card is the feature (8 + 4), then rows of three. A leftover single card goes wide, a leftover pair goes half + half. */
export function CaseStudyGrid({ cases = CASES, featureFirst = true }: { cases?: CaseCard[]; featureFirst?: boolean }) {
  const n = cases.length;
  const rest = featureFirst ? n - 2 : n;
  const r = rest % 3;
  return (
    <div className="na-cards">
      {cases.map((c, i) => {
        const last = n - 1 - i;
        const lay = featureFirst && i === 0 ? { feature: true } : r === 1 && last === 0 ? { wide: true } : r === 2 && last < 2 ? { half: true } : {};
        return <CaseStudyCard key={c.slug} index={String(i + 1).padStart(2, "0")} {...c} {...lay} />;
      })}
    </div>
  );
}

/** Editorial index of work: rules, not boxes. */
export function CaseIndex({ cases = CASES.slice(1), start = 2 }: { cases?: CaseCard[]; start?: number }) {
  return (
    <ol className="na-index">
      {cases.map((c, i) => (
        <li key={c.slug}>
          <Link href={"/case-studies/" + c.slug}>
            <span className="na-index-n na-num">{String(start + i).padStart(2, "0")}</span>
            <span className="na-index-org">
              {c.org}
              <small>
                {c.cat} · {c.years}
              </small>
            </span>
            <span className="na-index-t">{c.title}</span>
            <span className="na-index-m">
              <strong className="na-num">{c.metrics[0][0]}</strong>
              <small>{c.metrics[0][1]}</small>
            </span>
            <span className="na-index-art" aria-hidden="true">
              <AlphaCurve values={c.curve} variant={c.variant} width={160} height={64} labels={false} />
            </span>
            <span className="na-index-go" aria-hidden="true">
              →
            </span>
          </Link>
        </li>
      ))}
    </ol>
  );
}

export function EssayList({ posts = POSTS }: { posts?: Post[] }) {
  const [lead, ...rest] = posts;
  return (
    <div className="na-essays">
      <Link className="na-essay-lead" href={"/blog/" + lead.slug}>
        <span className="na-eyebrow">{lead.cat}</span>
        <h3>{lead.title}</h3>
        {lead.dek && <p>{lead.dek}</p>}
        <span className="na-essay-meta">
          Nav Singh · {lead.date} · {lead.read} read
        </span>
      </Link>
      <ol className="na-essay-list">
        {rest.map((p) => (
          <li key={p.slug}>
            <Link href={"/blog/" + p.slug}>
              <span className="na-eyebrow">{p.cat}</span>
              <h4>{p.title}</h4>
              <span className="na-essay-meta">
                {p.date} · {p.read} read
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function ProcessSteps({ steps = PROCESS }: { steps?: typeof PROCESS }) {
  return (
    <div className="na-steps" style={{ "--n": steps.length } as CSSProperties}>
      {steps.map((s) => (
        <div className="na-step" key={s.t}>
          <span className="na-step-n">{s.n}</span>
          <h3 className="na-step-t">{s.t}</h3>
          <p>{s.b}</p>
          <span className="na-step-w">{s.w}</span>
        </div>
      ))}
    </div>
  );
}

export function CTASection({
  eyebrow = "Work together",
  title = (
    <>
      Find the <em>α</em> in your funnel.
    </>
  ),
  body = "A free 30-minute GTM audit. You bring the numbers. I bring the pattern library from HeyGen, Semgrep, Egnyte and a16z. You leave with the three moves I would make first.",
  children,
  primary,
  note = "Working with 2 to 3 companies at a time. Currently open.",
  email = "hello@nplusalpha.com",
}: {
  eyebrow?: string;
  title?: ReactNode;
  body?: string;
  children?: ReactNode;
  /** A primary button, for pages where the form lives elsewhere. */
  primary?: [label: string, href: string];
  note?: string;
  email?: string;
}) {
  const actions = (
    <div className="na-cta-act">
      {primary && (
        <Button href={primary[1]} arrow>
          {primary[0]}
        </Button>
      )}
      <Button variant="ghost" href={`mailto:${email}`}>
        {email}
      </Button>
      {note && <span className="na-cta-note">{note}</span>}
    </div>
  );
  return (
    <section className="na-cta" aria-labelledby="cta-heading">
      <span className="na-cta-glyph" aria-hidden="true">
        α
      </span>
      <div className="na-cta-copy">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="na-h2" id="cta-heading">
          {title}
        </h2>
        <p className="na-lede" style={{ fontSize: 17, lineHeight: "27px" }}>
          {body}
        </p>
        {children ? actions : null}
      </div>
      {children ?? actions}
    </section>
  );
}

export function MobileStickyCTA({ label = "Book a GTM audit", href }: { label?: string; href: string }) {
  return (
    <div className="na-sticky">
      <Button href={href} arrow>
        {label}
      </Button>
    </div>
  );
}

/* ---------- Long-read devices ---------- */

/** Visible breadcrumb trail. The BreadcrumbList JSON-LD comes from JsonLd, so this renders markup only. */
export function Breadcrumbs({ items }: { items: [name: string, href: string][] }) {
  return (
    <nav className="na-crumbs" aria-label="Breadcrumb">
      <ol>
        {items.map(([name, href], i) => (
          <li key={href}>
            {i < items.length - 1 ? <Link href={href}>{name}</Link> : <span aria-current="page">{name}</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function TableOfContents({ items, title = "On this page" }: { items: [id: string, label: string][]; title?: string }) {
  return (
    <nav className="na-toc" aria-label={title}>
      <span className="na-eyebrow">{title}</span>
      <ol>
        {items.map(([id, label], i) => (
          <li key={id}>
            <a href={"#" + id}>
              <span className="na-num">{String(i + 1).padStart(2, "0")}</span>
              {label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function Pillars({ items }: { items: { title: string; body: string }[] }) {
  return (
    <div className="na-pillars">
      {items.map((p, i) => (
        <div className="na-pillar" key={p.title}>
          <div className="na-pillar-n na-num">{String(i + 1).padStart(2, "0")}</div>
          <h3 className="na-pillar-t">{p.title}</h3>
          <p>{p.body}</p>
        </div>
      ))}
    </div>
  );
}

export function ArtifactFrame({
  kind = "Artifact",
  title,
  meta = "Stylized · figures obfuscated",
  caption,
  children,
}: {
  kind?: string;
  title: string;
  meta?: string;
  caption?: ReactNode;
  children: ReactNode;
}) {
  return (
    <figure className="na-art" style={{ margin: 0 }}>
      <div className="na-art-bar">
        <span className="k">{kind}</span>
        <span>{title}</span>
        <span className="r">{meta}</span>
      </div>
      <div className="na-art-body">{children}</div>
      {caption && <figcaption className="na-art-cap">{caption}</figcaption>}
    </figure>
  );
}

/** Split a published metric like "5x", "40%" or "$100M+" into value and unit, so the unit takes alpha-text. */
export function splitMetric(raw: string): { value: string; unit?: string } {
  const m = raw.match(/^(.*?\d)(x|×|%|\+)$/);
  if (!m) return { value: raw };
  return { value: m[1], unit: m[2] === "x" ? "×" : m[2] };
}
