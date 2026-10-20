import type { Metadata } from "next";
import Link from "next/link";
import { Colophon, SiteHeader } from "@/components/chrome";
import { EmporosDemoFrame } from "@/components/emporos-demo-frame";
import { EMPOROS_DEMO_LIVE, EMPOROS_DEMO_URL } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Emporos demo dashboard",
  description: "The Emporos trading dashboard replaying an invented Nifty options day. Simulated data, every control switched off.",
  path: "/emporos/demo",
});

const pages = [
  ["Overview", "A 1-minute candle chart with the move, the build-up range and the breakout levels, the day's net against a +Rs 8,000 target and a −Rs 5,000 loss stop, the closed-net curve, and the open trade with its floor, stop and peak."],
  ["Trades", "The day's four trades with exit reasons and net after charges."],
  ["Orders", "Each order's audit trail."],
  ["Positions", "What is open, and at what cost."],
  ["History", "Fifteen invented past days."],
  ["Control", "The dry/real switch and the kill switch, both inert."],
];

export default function EmporosDemo() {
  return (
    <>
      <SiteHeader nav={[{ href: "/", label: "all work" }, { href: "/emporos", label: "emporos" }]} />
      <main id="main" className="wrap" style={{ display: "flex", flexDirection: "column", gap: 32, paddingBlock: "48px 72px" }}>
        <div className="hero__copy">
          <span className="dp-pill dp-pill--gold" style={{ alignSelf: "flex-start" }}>demo · simulated data</span>
          <h1 className="h-hero">The Emporos desk, replaying an invented day<span className="dotg">.</span></h1>
          <p className="lede">
            The real Emporos dashboard sits behind a passcode and drives a live book. This is the dashboard&rsquo;s own set of pages running on a replay of an invented Nifty options day, so you can see what the operator sees. No figure here is real money, a real account or a real broker.
          </p>
        </div>

        <EmporosDemoFrame />

        {EMPOROS_DEMO_LIVE && (
          <p className="small"><a className="tlink" href={EMPOROS_DEMO_URL} target="_blank" rel="noopener">Open the demo in its own tab →</a></p>
        )}

        <section aria-labelledby="how" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <h2 id="how" className="h-sec">How it works</h2>
          <p className="prose">
            A badge reads &ldquo;DEMO: SIMULATED DATA&rdquo; on every page. A replay bar has play and pause, speeds from 0.5x to 4x (1x is one market minute per second) and restart, and the day loops. The replay runs the live book&rsquo;s rules: a 5-candle move, a 5-candle build-up, entry when the price reaches the breakout candle&rsquo;s peak, a Rs 2,000 profit floor and then a trailing stop keeping 80% of the best gain, a Rs 10,000 hard stop, last entry at 15:12 and everything out at the 15:15 time exit.
          </p>
          <p className="prose">
            The invented day ends with 4 trades, 2 winners and a day net of +Rs 4,159.90. Everything is inert: each control opens its real confirmation dialog with the button disabled and the note &ldquo;Disabled in the demo. Nothing is sent.&rdquo; The demo has no API, broker, account, login or secrets.
          </p>
        </section>

        <section aria-labelledby="pages" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <h2 id="pages" className="h-sec">The pages</h2>
          <dl style={{ display: "grid", gap: 12 }}>
            {pages.map(([t, d]) => (
              <div key={t} className="panel" style={{ padding: 20 }}>
                <dt className="dp-label">{t}</dt>
                <dd className="small" style={{ margin: "6px 0 0" }}>{d}</dd>
              </div>
            ))}
          </dl>
        </section>

        <div className="row">
          <Link className="dp-btn dp-btn--primary" href="/emporos">Back to the case study</Link>
          <Link className="dp-btn dp-btn--secondary" href="/emporos#engine">Watch the engine</Link>
        </div>
      </main>
      <Colophon />
    </>
  );
}
