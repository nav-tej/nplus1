"use client";

import { useId, useMemo, useState } from "react";
import { usePostHog } from "posthog-js/react";
import { useFormGuard } from "@/components/useFormGuard";
import { Eyebrow } from "@/components/brand";

/*
 * SaaS funnel velocity calculator, rebuilt from the n+α design system
 * (VelocityCalculator in claude.ai/artifact/LkJFJ1m81KYet9EeMNzd3z).
 *
 * One screen, live results, no wizard. Velocity = opps × win rate × ACV ÷ cycle days.
 * The old form never asked for cycle length even though the formula divides by it.
 * Benchmarks exist for win rate and sales cycle only, so only those two get a
 * median tick and can be named as "the lever". Opps and ACV are never compared to
 * numbers we don't have.
 */

type Stage = "Seed" | "Series A" | "Series B" | "Series C+";
const STAGES: Stage[] = ["Seed", "Series A", "Series B", "Series C+"];

// Same figures as the previous version (refreshed March 13, 2026).
const STAGE_BENCHMARKS: Record<Stage, { medianWin: number; eliteWin: number; medianCycle: number }> = {
  Seed: { medianWin: 15, eliteWin: 25, medianCycle: 30 },
  "Series A": { medianWin: 21, eliteWin: 35, medianCycle: 60 },
  "Series B": { medianWin: 25, eliteWin: 40, medianCycle: 90 },
  "Series C+": { medianWin: 28, eliteWin: 45, medianCycle: 120 },
};

type Inputs = { stage: Stage; opps: number; winRate: number; acv: number; cycle: number };

const velocity = (i: Pick<Inputs, "opps" | "winRate" | "acv" | "cycle">) =>
  i.cycle > 0 ? (i.opps * (i.winRate / 100) * i.acv) / i.cycle : 0;

const money = (v: number) => {
  if (!isFinite(v)) return "$0";
  if (v < 100_000) return "$" + Math.round(v).toLocaleString("en-US");
  if (v < 1_000_000) return "$" + Math.round(v / 1000) + "K";
  return "$" + (v / 1_000_000).toFixed(v >= 10_000_000 ? 0 : 1) + "M";
};

function Field({
  label,
  hint,
  value,
  onChange,
  min,
  max,
  step = 1,
  prefix,
  suffix,
  benchmark,
}: {
  label: string;
  hint?: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step?: number;
  prefix?: string;
  suffix?: string;
  benchmark?: number;
}) {
  const id = useId();
  const clamped = Math.min(max, Math.max(min, value));
  const pct = ((clamped - min) / (max - min)) * 100;
  const bp = benchmark != null ? ((benchmark - min) / (max - min)) * 100 : null;
  return (
    <div className="na-field">
      <div className="na-field-top">
        <label htmlFor={id}>{label}</label>
        {hint && <span className="na-field-hint">{hint}</span>}
      </div>
      <div className="na-input-wrap">
        {prefix && <span className="pre">{prefix}</span>}
        <input
          id={id}
          className="na-input"
          inputMode="decimal"
          value={value}
          onChange={(e) => {
            const v = Number(e.target.value.replace(/[^0-9.]/g, ""));
            if (!isNaN(v)) onChange(v);
          }}
        />
        {suffix && <span className="suf">{suffix}</span>}
      </div>
      <div className="na-range-wrap" style={{ paddingBottom: bp != null ? 14 : 0 }}>
        <input
          type="range"
          className="na-range"
          aria-label={`${label} slider`}
          min={min}
          max={max}
          step={step}
          value={clamped}
          style={{ ["--p" as string]: pct + "%" }}
          onChange={(e) => onChange(Number(e.target.value))}
        />
        {bp != null && bp >= 0 && bp <= 100 && (
          <span className="na-range-mark" style={{ left: `calc(${bp}% + ${(0.5 - bp / 100) * 20}px)` }}>
            median
          </span>
        )}
      </div>
    </div>
  );
}

function Bar({
  label,
  you,
  median,
  top,
  max,
  format,
  invert = false,
}: {
  label: string;
  you: number;
  median: number;
  top?: number;
  max: number;
  format: (v: number) => string;
  invert?: boolean;
}) {
  const pct = (v: number) => Math.max(0, Math.min(100, (v / max) * 100));
  const ratio = invert ? median / Math.max(you, 1) : you / Math.max(median, 0.0001);
  const status = ratio >= 1.05 ? "above" : ratio >= 0.95 ? "at" : "below";
  const word = { above: "Better than median", at: "At median", below: "Behind median" }[status];
  const glyph = { above: "▲ ", at: "● ", below: "▼ " }[status];
  return (
    <div className="na-bb">
      <div className="na-bb-top">
        <b>{label}</b>
        <span className="na-num">{format(you)}</span>
      </div>
      <div
        className="na-bb-track"
        role="img"
        aria-label={`${label}: ${format(you)}. Median ${format(median)}${top != null ? `. Top performers ${format(top)}` : ""}. ${word}.`}
      >
        <div className={`na-bb-fill${status !== "below" ? " ok" : ""}`} style={{ width: pct(you) + "%" }} />
        <div className="na-bb-tick" style={{ left: pct(median) + "%" }} />
        {top != null && <div className="na-bb-tick top" style={{ left: pct(top) + "%" }} />}
      </div>
      <div className="na-bb-foot">
        <span className={`na-bb-status ${status}`}>
          {glyph}
          {word}
        </span>
        <span>
          med {format(median)}
          {top != null ? ` · top ${format(top)}` : ""}
        </span>
      </div>
    </div>
  );
}

export default function VelocityCalculator() {
  const [s, setS] = useState<Inputs>({ stage: "Series A", opps: 50, winRate: 18, acv: 25_000, cycle: 75 });
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const ph = usePostHog();
  const { honeypot, guardFields } = useFormGuard();
  const set = <K extends keyof Inputs>(k: K) => (v: Inputs[K]) => setS((o) => ({ ...o, [k]: v }));

  const b = STAGE_BENCHMARKS[s.stage];
  const you = velocity(s);

  const levers = useMemo(() => {
    const out: { name: string; gain: number }[] = [];
    if (s.winRate < b.medianWin) out.push({ name: "win rate", gain: (velocity({ ...s, winRate: b.medianWin }) - you) * 90 });
    if (s.cycle > b.medianCycle) out.push({ name: "sales cycle length", gain: (velocity({ ...s, cycle: b.medianCycle }) - you) * 90 });
    return out.sort((x, y) => y.gain - x.gain);
  }, [s, b, you]);

  const topGain = s.winRate < b.eliteWin ? (velocity({ ...s, winRate: b.eliteWin }) - you) * 90 : 0;
  // Index on the two benchmarked inputs only: 100 = stage median win rate and cycle.
  const index = Math.round((s.winRate / b.medianWin) * (b.medianCycle / Math.max(s.cycle, 1)) * 100);

  const results = {
    velocityPerDay: Math.round(you),
    newArrPerQuarter: Math.round(you * 90),
    index,
    lever: levers[0]?.name ?? null,
    leverGainPerQuarter: levers[0] ? Math.round(levers[0].gain) : 0,
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSent("sending");
    try {
      const res = await fetch("/api/lead-magnet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, magnetType: "velocity_calculator", payloadData: { ...s, ...results }, ...guardFields() }),
      });
      if (!res.ok) throw new Error(String(res.status));
      ph?.capture("lead_magnet_submitted", { type: "velocity_calculator", ...s, ...results });
      setSent("sent");
    } catch {
      setSent("error");
    }
  };

  return (
    <div className="na" style={{ background: "transparent" }}>
      <div className="na-calc">
        <div className="na-calc-in">
          <div className="na-field">
            <span className="na-field-lbl">Stage</span>
            <div className="na-seg" role="group" aria-label="Stage">
              {STAGES.map((st) => (
                <button key={st} type="button" aria-pressed={st === s.stage} onClick={() => set("stage")(st)}>
                  {st}
                </button>
              ))}
            </div>
          </div>
          <Field label="Qualified opps per quarter" value={s.opps} onChange={set("opps")} min={0} max={500} step={5} />
          <Field label="Win rate" suffix="%" value={s.winRate} onChange={set("winRate")} min={0} max={60} benchmark={b.medianWin} />
          <Field label="Average contract value" prefix="$" value={s.acv} onChange={set("acv")} min={0} max={250_000} step={1000} />
          <Field label="Sales cycle" hint="first meeting to close" suffix="days" value={s.cycle} onChange={set("cycle")} min={0} max={Math.max(240, b.medianCycle * 2)} benchmark={b.medianCycle} />
        </div>

        <div className="na-calc-out" aria-live="polite">
          <div className="na-calc-big">
            <Eyebrow>Funnel velocity</Eyebrow>
            <div className="v na-num">
              {money(you)}
              <small>per day</small>
            </div>
          </div>

          <div className="na-calc-sub">
            <div>
              <strong className="na-num">{money(you * 90)}</strong>
              <span>new ARR per quarter at this pace</span>
            </div>
            <div>
              <strong className="na-num" style={{ color: index >= 100 ? "var(--steel)" : "var(--alpha-text)" }}>{index}</strong>
              <span>win rate and cycle vs the {s.stage} median (100)</span>
            </div>
          </div>

          {levers[0] ? (
            <div className="na-calc-lever">
              <span className="k">Your biggest lever</span>
              <p>
                Bring <b>{levers[0].name}</b> to the {s.stage} median. That is worth about <b>{money(levers[0].gain)}</b> more new ARR per quarter.
              </p>
            </div>
          ) : (
            <div className="na-calc-lever">
              <span className="k">At or better than median</span>
              <p>
                Win rate and cycle both beat the {s.stage} median.
                {topGain > 0 && (
                  <>
                    {" "}
                    Reaching a top-performer win rate of {b.eliteWin}% is worth about <b>{money(topGain)}</b> more per quarter.
                  </>
                )}
              </p>
            </div>
          )}

          <div className="na-calc-legend">
            <span><i style={{ background: "var(--alpha)" }} />you, behind</span>
            <span><i style={{ background: "var(--steel)" }} />you, at or better</span>
            <span><i style={{ background: "var(--ink)", width: 3 }} />median</span>
            <span><i style={{ background: "var(--ink-muted)", width: 3 }} />top performers</span>
          </div>
          <Bar label="Win rate" you={s.winRate} median={b.medianWin} top={b.eliteWin} max={Math.max(60, s.winRate)} format={(v) => v + "%"} />
          <Bar label="Sales cycle (lower is better)" you={s.cycle} median={b.medianCycle} max={Math.max(s.cycle, b.medianCycle) * 1.25} invert format={(v) => v + "d"} />

          {sent === "sent" ? (
            <p className="na-lead-ok">Sent. Your numbers are on their way to {email}.</p>
          ) : (
            <form className="na-lead" onSubmit={submit}>
              {honeypot}
              <label htmlFor="calc-email" className="na-field-lbl">Email me this breakdown</label>
              <div className="na-lead-row">
                <input
                  id="calc-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="you@company.com"
                  className="na-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button type="submit" className="na-btn na-btn-primary" disabled={sent === "sending"}>
                  {sent === "sending" ? "Sending" : "Send it"}
                </button>
              </div>
              <span className="na-field-hint">
                {sent === "error" ? "That didn't go through. Try again, or email hello@nplusalpha.com." : "Your numbers and the lever, in one email. No newsletter."}
              </span>
            </form>
          )}

          <p className="na-calc-fine">
            Velocity = qualified opps × win rate × ACV ÷ cycle days. Win rate and cycle benchmarks by stage come from 2025 to 2026 GTM indices (PeerSignal, Growth Unhinged, Gartner), last refreshed March 13, 2026.
          </p>
        </div>
      </div>
    </div>
  );
}
