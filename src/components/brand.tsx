/**
 * n+α brand components, ported from the n+α design system
 * (claude.ai/artifact/LkJFJ1m81KYet9EeMNzd3z, components/src/index.jsx).
 * All server components: plain markup + brand.css, no client JS. Styles live in
 * src/app/brand.css under the `na-` prefix.
 */
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { CASES, PROCESS, TRACK, type CaseCard, type Pair, type Stop } from "@/lib/brand-data";

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
function smooth(pts: Pt[]) {
  let d = "M" + pts[0][0].toFixed(1) + " " + pts[0][1].toFixed(1);
  for (let i = 1; i < pts.length; i++) {
    const [x0, y0] = pts[i - 1];
    const [x1, y1] = pts[i];
    const mx = (x0 + x1) / 2;
    d += ` C${mx.toFixed(1)} ${y0.toFixed(1)} ${mx.toFixed(1)} ${y1.toFixed(1)} ${x1.toFixed(1)} ${y1.toFixed(1)}`;
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
}) {
  const pad = { t: 24, r: 28, b: labels ? 26 : 8, l: 8 };
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
  values,
  foot = [
    ["5×", "ARR growth"],
    ["100K+", "community"],
    ["$25M", "ABM pipeline"],
  ],
  note = "Stylized. Shape of the curve, not the data.",
}: {
  kicker?: string;
  figure?: string;
  unit?: string;
  values?: number[];
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
      <AlphaCurve values={values} animate height={200} baseLabel="n · baseline growth" ariaLabel="HeyGen ARR rising well above a baseline growth line" />
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
}: CaseCard & { index?: string; feature?: boolean; wide?: boolean; half?: boolean }) {
  const big = feature || wide;
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
        <h3 className="na-card-t">{title}</h3>
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
  note = "Working with 2 to 3 companies at a time. Currently open.",
  email = "hello@nplusalpha.com",
}: {
  eyebrow?: string;
  title?: ReactNode;
  body?: string;
  children?: ReactNode;
  note?: string;
  email?: string;
}) {
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
        <div className="na-cta-act">
          <Button variant="ghost" href={`mailto:${email}`}>
            {email}
          </Button>
          {note && <span className="na-cta-note">{note}</span>}
        </div>
      </div>
      {children}
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
