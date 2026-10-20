import type { Metadata } from "next";
import Link from "next/link";
import "./emporos.css";
import { PageFooter, SecHead, SiteHeader, Stat, Wire } from "@/components/chrome";
import { CandleChart } from "@/components/candle-chart";
import { Stage } from "@/components/stage";
import { EmporosDemoFrame } from "@/components/emporos-demo-frame";

export const metadata: Metadata = {
  title: "Emporos",
  description: "Emporos trades Nifty weekly options through Angel One: 24 paper books, one live book, five locks and sixteen risk rules.",
};

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

const path: [string, string, string][] = [
  ["recorder", "s3 parquet", "lit--sky"],
  ["SetupDetector", "closed candles", ""],
  ["OptionPicker", "max oi", ""],
  ["risk engine", "16 rules", "lit--gold"],
  ["executor", "intent → order", ""],
  ["angel one", "limit only", "lit--brand"],
];

function LockIcon() {
  return (
    <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path className="shut" d="M8 11V7a4 4 0 0 1 8 0v4" />
      <path className="open" d="M8 11V7a4 4 0 0 1 7.5-2" />
    </svg>
  );
}

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
            <div className="row" style={{ alignItems: "center", gap: "12px 24px" }}>
              <a className="dp-btn dp-btn--primary" href="#engine">Watch the engine</a>
              <Link className="tlink" href="/emporos/demo">Open the demo dashboard →</Link>
            </div>
          </div>
          <div className="stats rise rise--d">
            <Stat n="1 min" label="quote cadence" color="var(--sky)" />
            <Stat n="24" label="paper books" color="var(--accent)" />
            <Stat n="1" label="live book" color="var(--brand)" />
            <Stat n="16" label="risk rules" color="var(--gold)" />
            <Stat n="30 s" label="broker reconcile" color="var(--text)" />
          </div>
        </section>

        {/* ENGINE */}
        <Stage id="engine" mode="pin" length={2.4} className="sec sec--pin" label="The live book">
          <SecHead eyebrow="01 — the live book, O-N5-B5" title="Move, build-up, breakout, then the peak">
            <p className="prose">The setup detector sees each Nifty 1-minute candle only after it closes, so it cannot look ahead. The live book then waits for Nifty&rsquo;s live price to reach the breakout candle&rsquo;s peak before it buys. It has traded real money since 2026-10-12.</p>
          </SecHead>
          <div className="engine">
            <div data-float="l" className="panel" role="img" aria-label="As you scroll, five rising candles form a move, five sideways candles form a build-up, a breakout candle closes above it, the option is bought when price reaches that candle's peak, a Rs 2,000 floor locks in, and a trailing stop exits after the peak" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div className="tags" style={{ justifyContent: "space-between" }}><span className="dp-label">nifty · 1 min</span><span className="dp-label">09:15 → last entry 15:12 → out by 15:15</span></div>
              <CandleChart from={0} />
              <div className="tags" data-step={15}>
                <span className="dp-pill">move · 5 candles</span>
                <span className="dp-pill dp-pill--accent">build-up · no width limit</span>
                <span className="dp-pill dp-pill--sky">entry · price hits the peak</span>
                <span className="dp-pill dp-pill--gold">Rs 2,000 floor</span>
                <span className="dp-pill dp-pill--accent">trail · keeps 80%</span>
              </div>
            </div>
            <ol data-float="r" className="dp-graph panel" style={{ padding: 28 }}>
              <li data-step={10} style={{ ["--node" as string]: "var(--sky)" }}><h3>Pick the option</h3><p>Nearest expiry, highest open interest within ATM ± 2 strikes.</p></li>
              <li data-step={11} style={{ ["--node" as string]: "var(--accent)" }}><h3>Wait for the peak</h3><p>No depth gate on this book. It buys when Nifty&rsquo;s live price reaches the breakout candle&rsquo;s peak, up to 15:12.</p></li>
              <li data-step={12} style={{ ["--node" as string]: "var(--brand)" }}><h3>Size and buy</h3><p>Whole lots within 90% of available cash, as a limit order.</p></li>
              <li data-step={13} style={{ ["--node" as string]: "var(--gold)" }}><h3>Lock the floor, then trail</h3><p>A Rs 2,000 floor, then a trailing stop that keeps 80% of the peak gain.</p></li>
              <li data-step={14} style={{ ["--node" as string]: "var(--danger)" }}><h3>Or get out</h3><p>A Rs 10,000 gross hard stop, or 15:15. One position at a time; entries end for the day at net +Rs 8,000 or −Rs 5,000.</p></li>
            </ol>
          </div>
        </Stage>

        {/* RESEARCH BASELINE */}
        <Stage mode="scrub" className="sec" label="Research baseline">
          <SecHead eyebrow="02 — research" title="The live book against the paper rule">
            <p className="prose">The declared research rule, O-main, still runs on paper with the other books. The live book drops the width limit and the depth gate, enters on the peak instead of the close, keeps entering until 15:12 and trails its profit.</p>
          </SecHead>
          <div data-float="c" className="panel" style={{ padding: 8 }}>
            <table className="compare">
              <thead><tr><th scope="col">rule</th><th scope="col">live · O-N5-B5</th><th scope="col">research · O-main (paper)</th></tr></thead>
              <tbody>
                {compare.map(([k, live, paper], i) => (
                  <tr key={k} data-step={i} data-fx="fade"><th scope="row">{k}</th><td data-k="live">{live}</td><td data-k="paper">{paper}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </Stage>

        {/* ORDER PATH */}
        <Stage mode="pin" length={1.4} className="sec sec--pin" label="Order path">
          <SecHead eyebrow="03 — the order path" title="Intent first, broker second, never a blind retry" />
          <div data-float="c" className="panel" role="img" aria-label="As you scroll, a signal moves from the recorder through the setup detector, option picker, risk engine and executor to Angel One, and a reconciler compares broker state every 30 seconds" style={{ display: "flex", flexDirection: "column", gap: 28 }}>
            <div className="flow order-flow">
              {path.map(([n, l, c], i) => (
                <div key={n} style={{ display: "contents" }}>
                  {i > 0 && <Wire delay={i * 0.4} />}
                  <div className="node-col"><div className={`node lit ${c}`} data-step={i} data-fx="state">{n}</div><span className="dp-label">{l}</span></div>
                </div>
              ))}
            </div>
            <p className="small" data-step={4}>The depth gate between the picker and the risk engine is off for this book; only depth-gated paper variants use it.</p>
            <div className="reconcile" data-step={6}>
              <svg className="spin" aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#8fcdf0" strokeWidth="1.5"><path d="M21 12a9 9 0 1 1-3-6.7" /><path d="M21 4v5h-5" /></svg>
              <span className="small">Every 30 s the broker&rsquo;s orders, fills and positions are compared with Emporos&rsquo;s own. Any difference stops new entries. An ambiguous order is <span className="mono c-gold">UNKNOWN</span> until the broker is asked by its tag.</span>
            </div>
          </div>
        </Stage>

        {/* RISK WALL */}
        <Stage mode="pin" length={1.6} className="sec sec--pin" label="Risk engine">
          <SecHead eyebrow="04 — risk engine" title="Sixteen rules, checked in order, every order">
            <p className="prose">A pure, ordered list over an immutable snapshot of the account, so every rule is unit-testable. A rejection is always stored with its full context: a signal that silently vanished could not be audited.</p>
          </SecHead>
          <div data-float="c" className="guards" role="img" aria-label="As you scroll, the sixteen risk rules pass one after another">
            {guards.map((g, i) => <span key={g} className="guard" data-step={i} data-fx="state">{g}</span>)}
          </div>
        </Stage>

        {/* LIVE GATE */}
        <Stage mode="pin" length={1.2} className="sec sec--pin" label="Live gate">
          <SecHead eyebrow="05 — the live gate" title="Real money needs five yeses" />
          <div data-float="c" className="locks">
            {locks.map((l, i) => (
              <div key={l.name} className="lock" data-step={i} data-fx="state">
                <LockIcon />
                <b>{l.name}</b>
                <span>{l.note}</span>
              </div>
            ))}
          </div>
        </Stage>

        {/* DEMO */}
        <Stage mode="scrub" className="sec" label="Demo dashboard">
          <SecHead eyebrow="06 — the desk" title="The operator's dashboard">
            <p className="prose">The real dashboard is private. This is its own set of pages replaying an invented trading day: a simulated Nifty session with fake figures, play, pause and speed controls, and every action switched off.</p>
          </SecHead>
          <div data-step={0}><EmporosDemoFrame /></div>
          <div className="row" style={{ marginTop: 20 }}><Link className="tlink" href="/emporos/demo">About the demo →</Link></div>
        </Stage>

        {/* STACK */}
        <Stage mode="scrub" className="sec" label="Where it runs">
          <SecHead eyebrow="07 — where it runs" title="Only one process can touch the broker" />
          <div className="split">
            <div data-float="c" className="hosts">
              <div className="host host--key" data-step={0}><span className="dp-label c-brand">ec2 · systemd</span><h3>Trader + recorder</h3><p>The only holder of broker credentials.</p></div>
              <div className="host" data-step={1}><span className="dp-label">lambda · api gateway</span><h3>Control API</h3><p>Overview, live page, orders, command bus.</p></div>
              <div className="host" data-step={2}><span className="dp-label">vercel · next.js</span><h3>Dashboard</h3><p>Reads the API only, holds no secrets.</p></div>
              <div className="host" data-step={3}><span className="dp-label">s3 · parquet</span><h3>Quotes and history</h3><p>Nifty spot, India VIX and option chains, once a minute.</p></div>
              <div className="host" data-step={4}><span className="dp-label">mongodb atlas</span><h3>Live state</h3><p>Orders, append-only order events, acks.</p></div>
            </div>
            <div className="dp-code" style={{ flex: "1 1 320px" }} data-step={5}>
              <div className="dp-code__bar" aria-hidden="true"><i /><i /><i /><span>pyproject.toml · import-linter</span></div>
              <pre><span className="c"># layers, lowest first</span>{"\n"}<span className="f">core</span>{"\n"} &lt; <span className="f">domain</span>{"\n"} &lt; <span className="k">persistence</span> / <span className="k">broker</span>{"\n"} &lt; <span className="s">execution</span> / <span className="s">risk</span> / <span className="s">quotes</span>{"\n"}   / <span className="s">breakout</span> / <span className="s">livetrade</span>{"\n"} &lt; <span className="n">api</span> / <span className="n">cli</span></pre>
            </div>
          </div>
          <div className="tags" data-step={6}><span className="dp-pill">python 3.12 · asyncio</span><span className="dp-pill">angel one smartapi</span><span className="dp-pill">aws ec2 · lambda · s3 · ssm</span><span className="dp-pill">mongodb atlas</span><span className="dp-pill">next.js 16 · react 19 · vercel</span><span className="dp-pill">tailwind 4 · lightweight-charts · tanstack query</span></div>
        </Stage>
      </main>
      <PageFooter prev={{ href: "/", label: "Back to all work" }} next={{ href: "/ark-i", label: "Next: ARK-I" }} />
    </div>
  );
}
