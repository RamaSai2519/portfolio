import type { Metadata } from "next";
import Link from "next/link";
import type { CSSProperties } from "react";
import "./emporos.css";
import { Lock, PageFooter, Ph, SecHead, SiteHeader, Stat, Wire } from "@/components/chrome";

export const metadata: Metadata = {
  title: "Emporos",
  description: "Emporos trades Nifty weekly options through Angel One: 24 paper books, one live book, five locks and sixteen risk rules.",
};

// [grid column, bottom px, height px, kind, animation delay s]
type Candle = [number, number, number, "up" | "dn" | "ex" | "brk", number];
const candles: Candle[] = [
  [1, 16, 30, "up", 0], [2, 40, 30, "up", 0.3], [3, 64, 30, "up", 0.6], [4, 88, 30, "up", 0.9], [5, 112, 30, "up", 1.2],
  [6, 146, 16, "dn", 1.5], [7, 150, 20, "up", 1.8], [8, 144, 18, "dn", 2.1], [9, 152, 18, "up", 2.4], [10, 148, 16, "dn", 2.7],
  [11, 152, 48, "brk", 3.2],
  [12, 194, 18, "up", 3.9], [13, 208, 20, "up", 4.5], [14, 224, 26, "up", 5.0], [15, 230, 16, "ex", 5.9],
];

const guards = [
  "TradingModeGuard", "KillSwitchGuard", "MarketSessionGuard", "StaleDataGuard", "BrokerHealthGuard", "ReconciliationGuard",
  "DuplicateOrderGuard", "MaxDailyLossGuard", "MaxStrategyLossGuard", "MaxPositionValueGuard", "MaxOpenPositionsGuard",
  "MaxCapitalDeployedGuard", "MaxOrderQuantityGuard", "PriceSanityGuard", "AbnormalSpreadGuard", "OrderRateGuard",
];

const locks = [
  { name: "live-trading flag", note: "switched on in AWS SSM" },
  { name: "committed override", note: "names this book and its limits" },
  { name: "behaviour hash ack", note: "typed by the operator" },
  { name: "kill switch clear", note: "mongo flag + file sentinel, polled every 5 s" },
  { name: "dry / real switch", note: "the operator's, on the dashboard" },
];

const compare: [string, string, string][] = [
  ["move", "5 candles", "≥ 3 closes, ≥ 0.10% of spot"],
  ["build-up", "5 candles, no width limit", "5 candles, width ≤ 60% of the move"],
  ["depth gate", "none", "buy share ≥ 0.90, row ≤ 90 s old"],
  ["entry", "live price reaches the breakout candle's peak", "at the breakout candle's close"],
  ["last entry", "15:12", "before 12:00"],
  ["per day", "one position at a time, watches again after each exit", "one trade"],
  ["sizing", "whole lots within 90% of available cash", "40–60% of capital"],
  ["floor", "Rs 2,000, then a trailing stop keeping 80% of peak gain", "P* = entry + (Rs 2,000 + costs) / qty"],
  ["hard stop", "Rs 10,000 gross", "Rs 10,000"],
  ["time exit", "15:15", "15:15"],
  ["day limit", "entries end at net +Rs 8,000 or −Rs 5,000", "—"],
];

const d = (s: number): CSSProperties => ({ animationDelay: `${s}s` });

export default function Emporos() {
  return (
    <div className="p-emp">
      <SiteHeader nav={[{ href: "/", label: "all work" }, { href: "/ark-i", label: "ARK-I" }, { href: "/mark8", label: "mark8" }]} />
      <main id="main">
        {/* HERO */}
        <section className="wrap hero">
          <div className="hero__copy rise">
            <div className="tags"><span className="dp-pill dp-pill--gold">flagship</span><span className="dp-pill">emporos.journeymen.in</span></div>
            <h1 className="h-hero">A trading desk that refuses to guess<span className="dotg">.</span></h1>
            <p className="lede">Emporos trades Nifty weekly options through Angel One. It records the market every minute, paper-trades 24 books of one breakout rule, and trades one book for real, but only when five separate locks agree and sixteen risk rules pass.</p>
            <div className="row">
              <Link className="dp-btn dp-btn--primary" href="/emporos/demo">Open the demo dashboard</Link>
              <a className="dp-btn dp-btn--secondary" href="#engine">Watch the engine</a>
            </div>
          </div>
          <div className="stats rise rise--d">
            <Stat n="1 min" label="quote cadence" color="var(--sky)" />
            <Stat n="24" label="paper books" color="var(--purple)" />
            <Stat n="1" label="live book" color="var(--brand)" />
            <Stat n="16" label="risk rules" color="var(--gold)" />
            <Stat n="30 s" label="broker reconcile" color="var(--text)" />
          </div>
        </section>

        {/* DEMO DASHBOARD SLOT: blocked until the public demo exists */}
        <section className="wrap section" aria-label="Demo dashboard">
          <div className="demo">
            <div className="frame__bar">
              <i /><i /><i />
              <span className="frame__url"><Ph>emporos demo dashboard url</Ph></span>
              <span className="dp-pill dp-pill--gold">demo · pending</span>
            </div>
            <div className="demo__view">
              <div className="demo__mock e-mock" aria-hidden="true">
                <div className="tags" style={{ justifyContent: "space-between", alignItems: "center" }}>
                  <div className="tags"><span className="dp-pill dp-pill--brand">overview</span><span className="dp-pill">live desk</span><span className="dp-pill">setup watch</span><span className="dp-pill">history</span><span className="dp-pill">orders</span></div>
                  <div className="tags"><span className="dp-pill dp-pill--sky">dry</span><span className="dp-pill dp-pill--danger">kill switch · off</span></div>
                </div>
                <div className="g4"><i style={{ height: 84 }} /><i style={{ height: 84 }} /><i style={{ height: 84, background: "var(--brand-soft)" }} /><i style={{ height: 84 }} /></div>
                <div className="demo__bars">
                  {[30, 42, 38, 55, 50, 52, 49, 80, 86, 90].map((h, i) => <i key={i} style={{ height: `${h}%`, ...(i === 7 ? { background: "var(--brand)" } : {}) }} />)}
                </div>
                <div className="g2"><i style={{ height: 140 }} /><i style={{ height: 140 }} /></div>
                <i style={{ height: 26, borderRadius: 6 }} /><i style={{ height: 26, borderRadius: 6, background: "var(--surface)" }} /><i style={{ height: 26, borderRadius: 6 }} />
              </div>
              <span className="dp-pill dp-pill--overlay demo__note"><Ph>live demo dashboard loads here: blocked, see /emporos/demo</Ph></span>
            </div>
          </div>
        </section>

        {/* ENGINE */}
        <section id="engine" className="wrap section section--tight">
          <SecHead eyebrow="01 — the live book, O-N5-B5" title="Move, build-up, breakout, then the peak">
            <p className="prose">The setup detector sees each Nifty 1-minute candle only after it closes, so it cannot look ahead. The live book then waits for Nifty&rsquo;s live price to reach the breakout candle&rsquo;s peak before it buys. It has traded real money since 2026-10-12.</p>
          </SecHead>
          <div className="split">
            <div className="panel" role="img" aria-label="Animated candle chart: five rising candles form a move, five sideways candles form a build-up, a breakout candle closes above it, the option is bought when price reaches that candle's peak, a Rs 2,000 floor locks in, and a trailing stop exits after the peak" style={{ flex: "3 1 520px", display: "flex", flexDirection: "column", gap: 16 }}>
              <div className="tags" style={{ justifyContent: "space-between" }}><span className="dp-label">nifty · 1 min</span><span className="dp-label">09:15 → last entry 15:12 → out by 15:15</span></div>
              <div className="chart-wrap">
                <div className="chart" style={{ gridTemplateColumns: "repeat(17, minmax(0, 1fr))" }}>
                  <div className="range-box e-cand" style={{ gridColumn: "6 / 11", height: 36, marginBottom: 140, ...d(3.0) }} />
                  <div className="level e-cand" style={{ gridColumn: "11 / -1", marginBottom: 200, ["--c" as string]: "var(--sky)", ...d(3.5) }}><span>entry</span></div>
                  <div className="level e-cand" style={{ gridColumn: "12 / -1", marginBottom: 218, ["--c" as string]: "var(--gold)", ...d(4.3) }}><span>floor</span></div>
                  <div className="level e-cand" style={{ gridColumn: "14 / -1", marginBottom: 240, ["--c" as string]: "var(--purple)", ...d(5.4) }}><span>trail</span></div>
                  {candles.map(([col, b, h, kind, delay]) => (
                    <div
                      key={col}
                      className={`cnd ${kind === "brk" ? "e-flash" : "e-cand"} ${kind === "dn" ? "dn" : ""} ${kind === "ex" ? "ex" : ""}`}
                      style={{ gridColumn: col, height: h, marginBottom: b, ...d(delay) }}
                    />
                  ))}
                </div>
              </div>
              <div className="tags">
                <span className="dp-pill dp-pill--brand">move · 5 candles</span>
                <span className="dp-pill dp-pill--purple">build-up · 5 candles, no width limit</span>
                <span className="dp-pill dp-pill--sky">entry · live price hits the peak</span>
                <span className="dp-pill dp-pill--gold">Rs 2,000 floor</span>
                <span className="dp-pill dp-pill--purple">trail · keeps 80% of peak gain</span>
              </div>
            </div>
            <ol className="dp-graph panel" style={{ flex: "2 1 320px", padding: 28 }}>
              <li className="e-step" style={{ ["--node" as string]: "var(--sky)", ...d(3.4) }}><h3>Pick the option</h3><p>Nearest expiry, highest open interest within ATM ± 2 strikes.</p></li>
              <li className="e-step" style={{ ["--node" as string]: "var(--purple)", ...d(3.7) }}><h3>Wait for the peak</h3><p>No depth gate on this book. It buys when Nifty&rsquo;s live price reaches the breakout candle&rsquo;s peak, up to 15:12.</p></li>
              <li className="e-step" style={{ ["--node" as string]: "var(--brand)", ...d(4.0) }}><h3>Size and buy</h3><p>Whole lots within 90% of available cash, as a limit order.</p></li>
              <li className="e-step" style={{ ["--node" as string]: "var(--gold)", ...d(4.4) }}><h3>Lock the floor, then trail</h3><p>A Rs 2,000 floor, then a trailing stop that keeps 80% of the peak gain.</p></li>
              <li className="e-step" style={{ ["--node" as string]: "var(--danger)", ...d(5.9) }}><h3>Or get out</h3><p>A Rs 10,000 gross hard stop, or 15:15. One position at a time; entries end for the day at net +Rs 8,000 or −Rs 5,000.</p></li>
            </ol>
          </div>
        </section>

        {/* RESEARCH BASELINE */}
        <section className="wrap section section--tight">
          <SecHead eyebrow="research" title="The live book against the paper rule">
            <p className="prose">The declared research rule, O-main, still runs on paper with the other books. The live book drops the width limit and the depth gate, enters on the peak instead of the close, keeps entering until 15:12 and trails its profit.</p>
          </SecHead>
          <div className="panel" style={{ padding: 8 }}>
            <table className="compare">
              <thead><tr><th scope="col">rule</th><th scope="col">live · O-N5-B5</th><th scope="col">research · O-main (paper)</th></tr></thead>
              <tbody>
                {compare.map(([k, live, paper]) => (
                  <tr key={k}><th scope="row">{k}</th><td data-k="live">{live}</td><td data-k="paper">{paper}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ORDER PATH */}
        <section className="wrap section section--tight">
          <SecHead eyebrow="02 — the order path" title="Intent first, broker second, never a blind retry" />
          <div className="panel" role="img" aria-label="Animated order path: quotes are recorded, the setup detector and option picker produce a signal, the risk engine checks it, the executor writes intent then places a limit order at Angel One, and a reconciler compares broker state every 30 seconds" style={{ display: "flex", flexDirection: "column", gap: 28 }}>
            <div className="flow order-flow">
              <div className="node-col"><div className="node node--sky">recorder</div><span className="dp-label">s3 parquet</span></div>
              <Wire color="var(--sky)" />
              <div className="node-col"><div className="node">SetupDetector</div><span className="dp-label">closed candles</span></div>
              <Wire delay={0.4} />
              <div className="node-col"><div className="node">OptionPicker</div><span className="dp-label">max oi</span></div>
              <Wire delay={0.8} />
              <div className="node-col"><div className="node node--off">depth gate</div><span className="dp-label">paper variants</span></div>
              <Wire delay={1.2} />
              <div className="node-col"><div className="node node--gold">risk engine</div><span className="dp-label">16 rules</span></div>
              <Wire delay={1.6} />
              <div className="node-col"><div className="node">executor</div><span className="dp-label">intent → order</span></div>
              <Wire delay={2} />
              <div className="node-col"><div className="node node--brand node--strong live">angel one</div><span className="dp-label">limit only</span></div>
            </div>
            <div className="reconcile">
              <svg className="e-spin" aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#8fcdf0" strokeWidth="1.5"><path d="M21 12a9 9 0 1 1-3-6.7" /><path d="M21 4v5h-5" /></svg>
              <span className="small">Every 30 s the broker&rsquo;s orders, fills and positions are compared with Emporos&rsquo;s own. Any difference stops new entries. An ambiguous order is <span className="mono c-gold">UNKNOWN</span> until the broker is asked by its tag.</span>
            </div>
          </div>
        </section>

        {/* RISK WALL */}
        <section className="wrap section section--tight">
          <SecHead eyebrow="03 — risk engine" title="Sixteen rules, checked in order, every order">
            <p className="prose">A pure, ordered list over an immutable snapshot of the account, so every rule is unit-testable. A rejection is always stored with its full context: a signal that silently vanished could not be audited.</p>
          </SecHead>
          <div className="guards" role="img" aria-label="The sixteen risk rules light up one after another">
            {guards.map((g, i) => <span key={g} className="e-guard" style={d(i * 0.2)}>{g}</span>)}
          </div>
        </section>

        {/* LIVE GATE */}
        <section className="wrap section section--tight">
          <SecHead eyebrow="04 — the live gate" title="Real money needs five yeses" />
          <div className="locks">
            {locks.map((l, i) => (
              <div key={l.name} className="e-lock" style={d(i * 0.6)}>
                <Lock />
                <b>{l.name}</b>
                <span>{l.note}</span>
              </div>
            ))}
          </div>
        </section>

        {/* STACK */}
        <section className="wrap section section--tight">
          <SecHead eyebrow="05 — where it runs" title="Only one process can touch the broker" />
          <div className="split">
            <div className="hosts">
              <div className="host host--key"><span className="dp-label c-brand">ec2 · systemd</span><h3>Trader + recorder</h3><p>The only holder of broker credentials.</p></div>
              <div className="host"><span className="dp-label">lambda · api gateway</span><h3>Control API</h3><p>Overview, live page, orders, command bus.</p></div>
              <div className="host"><span className="dp-label">vercel · next.js</span><h3>Dashboard</h3><p>Reads the API only, holds no secrets.</p></div>
              <div className="host"><span className="dp-label">s3 · parquet</span><h3>Quotes and history</h3><p>Nifty spot, India VIX and option chains, once a minute.</p></div>
              <div className="host"><span className="dp-label">mongodb atlas</span><h3>Live state</h3><p>Orders, append-only order events, acks.</p></div>
            </div>
            <div className="dp-code" style={{ flex: "1 1 320px" }}>
              <div className="dp-code__bar" aria-hidden="true"><i /><i /><i /><span>pyproject.toml · import-linter</span></div>
              <pre><span className="c"># layers, lowest first</span>{"\n"}<span className="f">core</span>{"\n"} &lt; <span className="f">domain</span>{"\n"} &lt; <span className="k">persistence</span> / <span className="k">broker</span>{"\n"} &lt; <span className="s">execution</span> / <span className="s">risk</span> / <span className="s">quotes</span>{"\n"}   / <span className="s">breakout</span> / <span className="s">livetrade</span>{"\n"} &lt; <span className="n">api</span> / <span className="n">cli</span></pre>
            </div>
          </div>
          <div className="tags"><span className="dp-pill dp-pill--brand">python 3.12 · asyncio</span><span className="dp-pill">angel one smartapi</span><span className="dp-pill dp-pill--sky">aws ec2 · lambda · s3 · ssm</span><span className="dp-pill">mongodb atlas</span><span className="dp-pill dp-pill--purple">next.js 16 · react 19 · vercel</span><span className="dp-pill">tailwind 4 · lightweight-charts · tanstack query</span></div>
        </section>
      </main>
      <PageFooter prev={{ href: "/", label: "Back to all work" }} next={{ href: "/ark-i", label: "Next: ARK-I" }} />
    </div>
  );
}
