import Link from "next/link";
import "./home.css";
import { Colophon, Wire, Wordmark } from "@/components/chrome";
import { CandleChart } from "@/components/candle-chart";
import { JourneyChrome } from "@/components/journey";
import { LiveFrame } from "@/components/live-frame";
import { Float } from "@/components/float";
import { Stage, type StageAction } from "@/components/stage";
import type { Metadata } from "next";
import { contact, repos, sites } from "@/lib/site";
import { SITE_DESCRIPTION, SITE_NAME, SITE_TITLE } from "@/lib/seo";
import shotJourneymen from "@/design/content/assets/screenshots/journeymen.png";
import shotLedger from "@/design/content/assets/screenshots/ledger.png";
import shotMohan from "@/design/content/assets/screenshots/mohan-visweswar.png";
import shotEpoch from "@/design/content/assets/screenshots/gitam-epoch.png";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: { type: "profile", siteName: SITE_NAME, locale: "en_IN", url: "/", title: SITE_TITLE, description: SITE_DESCRIPTION, firstName: "Rama Sathya", lastName: "Sai" },
};

type Project = { id: string; num: string; name: string; tag: string; line: string; action: StageAction; color?: string };

// Tour order: flagships, then the Sukoon systems, then the other sites and the tool.
const projects: Project[] = [
  { id: "emporos", color: "var(--gold)", num: "01", name: "Emporos", tag: "flagship · trading", line: "Nifty options desk with a 16-rule risk engine", action: { href: "/emporos", label: "Deep dive" } },
  { id: "journeymen", color: "var(--gold)", num: "02", name: "Journeymen", tag: "flagship · site", line: "GitHub-verified developer certification.", action: { href: sites.journeymen, label: "Visit journeymen.in", external: true } },
  { id: "ark-i", color: "var(--accent)", num: "03", name: "ARK-I", tag: "sukoon · ai", line: "WhatsApp assistant, one model plus six specialists", action: { href: "/ark-i", label: "Deep dive" } },
  { id: "mark8", color: "var(--accent)", num: "04", name: "mark8", tag: "sukoon · ai", line: "Scores 100–500 support calls a day", action: { href: "/mark8", label: "Deep dive" } },
  { id: "back-bone", color: "var(--sky)", num: "05", name: "back_bone", tag: "sukoon · backend", line: "83 endpoints and a 5-minute scheduler", action: { href: "/back-bone", label: "Deep dive" } },
  { id: "ledger", color: "var(--brand)", num: "06", name: "Ledger", tag: "site", line: "One shared ledger for a couple or roommates", action: { href: sites.ledger, label: "Visit Ledger", external: true } },
  { id: "mohan", color: "var(--brand)", num: "07", name: "Mohan Visweswar", tag: "client site", line: "Insurance and financial consultant, built for the client", action: { href: sites.mohan, label: "Visit the site", external: true } },
  { id: "epoch", color: "var(--brand)", num: "08", name: "GITAM Epoch", tag: "community site", line: "GitHub Community Club and its annual fest", action: { href: sites.epoch, label: "Visit Epoch", external: true } },
  { id: "resume-builder", color: "var(--link)", num: "09", name: "resume_builder", tag: "tool", line: "YAML to a one-page, ATS-safe PDF", action: { href: repos.resume, label: "View the code", external: true } },
];
const P = Object.fromEntries(projects.map((p) => [p.id, p])) as Record<string, Project>;

const rubric = [
  { name: "opening greeting", pts: 10 },
  { name: "expert / user time split", pts: 15 },
  { name: "user sentiment", pts: 20 },
  { name: "flow of conversation", pts: 15 },
  { name: "time spent on call", pts: 10 },
  { name: "chance of a call back", pts: 20 },
  { name: "closing greeting", pts: 10 },
];

// hand grouping of back_bone's 83 /actions/* routes
const domains: [string, number, string][] = [
  ["payments", 11, "var(--sky)"], ["content · ai", 10, "var(--accent)"], ["games", 10, "var(--gold)"], ["experts", 9, "var(--brand)"],
  ["users", 8, "var(--link)"], ["calls", 7, "var(--danger)"], ["events", 7, "var(--sky)"], ["admin", 7, "var(--accent)"],
  ["whatsapp", 6, "var(--brand)"], ["push", 5, "var(--gold)"], ["auth", 3, "var(--link)"],
];

const lanes: [string, string][] = [["schedules", "var(--brand)"], ["event reminders", "var(--sky)"], ["expert status", "var(--accent)"], ["emails · db backup", "var(--gold)"]];

function Scene({ p, flip, children, copy, length }: { p: Project; flip?: boolean; children: React.ReactNode; copy: React.ReactNode; length?: number }) {
  return (
    <Stage id={p.id} className={`tour ${flip ? "tour--flip" : ""}`} name={p.name} num={p.num} action={p.action} length={length} label={p.name}>
      <div className="tour__in">
        <Float side={flip ? "r" : "l"} className="tour__copy-wrap">
          <div className="tour__copy">
            <div className="tour__eyebrow"><span className="tour__num">{p.num}</span><span className="dp-label" style={{ color: p.color }}>{p.tag}</span></div>
            {copy}
          </div>
        </Float>
        <div className="tour__fig"><Float side={flip ? "l" : "r"}>{children}</Float></div>
      </div>
    </Stage>
  );
}

export default function Home() {
  return (
    <div className="p-home">
      <header className="top">
        <div className="wrap site-header">
          <Wordmark href="#top" />
          <nav aria-label="Sections">
            <a className="dp-btn dp-btn--ghost" href="#index">tour</a>
            <a className="dp-btn dp-btn--ghost" href="#all-work">all work</a>
            <a className="dp-btn dp-btn--ghost" href="#contact">contact</a>
          </nav>
        </div>
      </header>

      <JourneyChrome items={projects.map(({ id, num, name }) => ({ id, num, name }))} />

      <main id="main">
        {/* HERO */}
        <Stage id="top" mode="scrub" space="globe" className="hero-full" label="Introduction">
          <div className="hero-full__in">
            <Float side="l">
              <div className="hero-full__copy">
                <span className="dp-pill dp-pill--brand" style={{ alignSelf: "flex-start" }}><i className="dp-dot dp-dot--live live" />open to work</span>
                <h1 className="h-home">
                  I ship websites and the{" "}
                  <span className="ul">
                    systems
                    <svg viewBox="0 0 300 20" preserveAspectRatio="none" aria-hidden="true"><path d="M3 13 C 70 4, 150 18, 297 7" /></svg>
                  </span>{" "}
                  behind them<span className="dotg">.</span>
                </h1>
                <p className="lede">Five sites live in production, and the systems behind them: a trading engine, an LLM assistant, a call scorer, a platform backend and a résumé typesetter.</p>
                <div className="hero-cta">
                  <a className="tlink" href={contact.github}>github.com/RamaSai2519 ↗</a>
                </div>
              </div>
            </Float>
            <div className="orbit" aria-label="Sukoon Unlimited figures">
              <div className="chip3d c1"><b>10k</b><span className="dp-label">active users at Sukoon</span></div>
              <div className="chip3d c2"><b>4k</b><span className="dp-label">paying members</span></div>
              <div className="chip3d c3"><b>100–500</b><span className="dp-label">calls scored a day</span></div>
              <div className="chip3d c4"><span className="dp-label c-text" style={{ display: "flex", gap: 8, alignItems: "center" }}><i className="live-dot" />9 projects · 5 live sites</span></div>
            </div>
          </div>
          <a className="scroll-hint" href="#index" aria-label="Scroll to explore the projects">
            <span className="scroll-hint__mouse" aria-hidden="true" />
            <span className="dp-label">scroll to explore</span>
            <span className="scroll-hint__chev" aria-hidden="true"><i /><i /></span>
          </a>
        </Stage>

        {/* INDEX: overview at the start */}
        <Stage id="index" mode="scrub" space="lattice" className="index" label="The tour">
          <div className="sec-head sec-head--row">
            <div className="sec-head__titles">
              <span className="dp-label">00 — the tour</span>
              <h2 className="h-display">Nine projects, one at a time</h2>
            </div>
            <span className="scroll-cue dp-label"><i aria-hidden="true" />scroll to start</span>
          </div>
          <ol>
            {projects.map((p, i) => (
              <li key={p.id} data-step={i}>
                <a href={`#${p.id}`} data-n={p.num}>
                  <span className="n">{p.num}</span>
                  <b>{p.name}</b>
                  <span className="go" aria-hidden="true">↓</span>
                  <span className="tag" style={{ color: p.color }}>{p.tag}</span>
                  <span className="line">{p.line}</span>
                </a>
              </li>
            ))}
          </ol>
        </Stage>

        {/* 01 EMPOROS */}
        <Scene
          p={P.emporos}
          length={2.2}
          copy={
            <>
              <h2>A trading desk that refuses to guess<span className="dotg">.</span></h2>
              <p>Emporos trades Nifty weekly options through Angel One. It records the market every minute, paper-trades 24 books and trades one for real, only when five locks agree and sixteen risk rules pass.</p>
              <div className="tags" data-step={14}><span className="dp-pill">python · asyncio</span><span className="dp-pill">angel one</span><span className="dp-pill">aws</span><span className="dp-pill">next.js</span></div>
              <div className="tour__links" data-step={15}><Link className="tlink" href="/emporos/demo">Open the demo dashboard →</Link></div>
            </>
          }
        >
          <div className="canvas-box" role="img" aria-label="As you scroll, the live book's setup draws candle by candle: a five-candle move, a five-candle build-up, a breakout, entry at its peak, a Rs 2,000 floor and a trailing stop. The order then passes sixteen risk rules and five locks.">
            <div className="tags" style={{ justifyContent: "space-between" }}><span className="dp-label">live book · O-N5-B5 · nifty 1 min</span><span className="dp-label">last entry 15:12 · out by 15:15</span></div>
            <CandleChart from={0} />
            <div className="flow flow--stack">
              <div className="node lit" data-step={10} data-fx="state">setup · 5 + 5</div>
              <Wire />
              <div className="node lit lit--gold" data-step={12} data-fx="state">16 risk rules</div>
              <Wire delay={0.8} />
              <div className="node lit lit--brand" data-step={13} data-fx="state">limit order</div>
            </div>
            <div className="locks-row">
              <span className="dp-label">live gate</span>
              {["live flag", "override", "hash ack", "kill switch", "dry / real"].map((l, i) => (
                <span key={l} className="chip lit lit--brand" data-step={13 + Math.floor(i / 2)} data-fx="state">{l}</span>
              ))}
            </div>
          </div>
        </Scene>

        {/* 02 JOURNEYMEN */}
        <Scene
          p={P.journeymen}
          flip
          copy={
            <>
              <h2>A résumé is a claim. This is the record<span className="dotg">.</span></h2>
              <p>GitHub-verified developer certification. A submitted project is checked against its GitHub commit history, run through AI consistency checks and graded; anything odd goes to a human review queue.</p>
              <div className="tags" data-step={1}><span className="dp-pill">next.js</span><span className="dp-pill">python cli</span><span className="dp-pill">flask on lambda</span><span className="dp-pill">sqs grading worker</span><span className="dp-pill">terraform</span></div>
              <p className="small" data-step={2}>Designed and built by me, end to end.</p>
            </>
          }
        >
          <LiveFrame src={sites.journeymen} url="www.journeymen.in" title="journeymen.in, live" poster={shotJourneymen} />
        </Scene>

        {/* 03 ARK-I */}
        <Scene
          p={P["ark-i"]}
          copy={
            <>
              <h2>One model remembers. Six forget on purpose<span className="dotg">.</span></h2>
              <p>A stateful gpt-4o model holds the whole conversation and calls short-lived, stateless sub-models through function calls. It ran the WhatsApp assistant for Sukoon Unlimited, with about 100 people chatting to it every day.</p>
              <div className="tags" data-step={9}><span className="dp-pill">gpt-4o tools</span><span className="dp-pill">flask</span><span className="dp-pill">mongodb</span><span className="dp-pill">whatsapp</span></div>
              <div className="tour__links" data-step={10}><a className="tlink" href={repos.arki}>RamaSai2519/ARK-I ↗</a></div>
            </>
          }
        >
          <div className="canvas-box" role="img" aria-label="As you scroll, a WhatsApp message travels to Flask, then MainGPT, which keeps history in MongoDB, then the controller, which calls the six sub-models in turn">
            <div className="flow flow--stack">
              <div className="node-col" data-step={0}><div className="ark-user"><svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z" /></svg></div><span className="dp-label">whatsapp</span></div>
              <Wire color="var(--sky)" />
              <div className="node-col"><div className="node lit lit--sky" data-step={1} data-fx="state">flask /ark</div><span className="dp-label">gunicorn</span></div>
              <Wire color="var(--sky)" delay={0.6} />
              <div className="node-col"><div className="node lit lit--brand node--strong" data-step={2} data-fx="state" style={{ fontSize: 15, padding: "16px 18px" }}>MainGPT</div><span className="dp-label">mongo · history</span></div>
              <Wire delay={1.2} />
              <div className="node-col"><div className="node lit" data-step={3} data-fx="state">controller</div><span className="dp-label">routes</span></div>
            </div>
            <div className="ark-subs">
              {["ExpertsGPT", "SchedulesGPT", "SukoonGPT", "EventsGPT", "PartnersGPT", "UserGPT"].map((s, i) => (
                <span key={s} className="node lit" data-step={4 + i} data-fx="state">{s}</span>
              ))}
            </div>
          </div>
        </Scene>

        {/* 04 MARK8 */}
        <Scene
          p={P.mark8}
          flip
          copy={
            <>
              <h2>Every support call, read and scored as it happens<span className="dotg">.</span></h2>
              <p>Ran all day on Sukoon Unlimited&rsquo;s support line, 100 to 500 calls a day. Each call is checked, tagged against 12 topic families, given a user and an expert persona, and scored out of 100.</p>
              <div className="tags" data-step={11}><span className="dp-pill">llm scoring</span><span className="dp-pill">flask + quart</span><span className="dp-pill">pm2</span></div>
              <div className="tour__links" data-step={12}><a className="tlink" href={repos.mark8}>RamaSai2519/mark8 ↗</a></div>
            </>
          }
        >
          <div className="canvas-box" role="img" aria-label="As you scroll, a call is validated, analysed and scored, and the seven rubric parameters fill to their weights, 100 points in total">
            <div className="tags" style={{ justifyContent: "space-between" }}><span className="dp-pill dp-pill--gold">realtime · all day</span><span className="dp-label">100–500 calls / day</span></div>
            <div className="flow flow--stack">
              <div className="node lit lit--gold" data-step={0} data-fx="state">call ends</div>
              <Wire color="var(--gold)" />
              <div className="node lit" data-step={1} data-fx="state">successful · recorded · 2 min+</div>
              <Wire color="var(--gold)" delay={0.8} />
              <div className="node lit lit--brand" data-step={2} data-fx="state">score / 100</div>
            </div>
            <div className="bars">
              {rubric.map((r, i) => (
                <div key={r.name} className="bar">
                  <div className="bar__head"><span className="dp-label">{r.name}</span><span className="dp-label c-text">{r.pts}</span></div>
                  <div className="bar__track"><div className="bar__fill" data-step={3 + i} data-fx="fill" style={{ ["--w" as string]: `${r.pts * 5}%`, background: r.pts === 20 ? "var(--gold)" : "var(--accent)" }} /></div>
                </div>
              ))}
            </div>
          </div>
        </Scene>

        {/* 05 BACK_BONE */}
        <Scene
          p={P["back-bone"]}
          copy={
            <>
              <h2>83 endpoints and a five-minute heartbeat<span className="dotg">.</span></h2>
              <p>The Flask-on-Lambda API behind Sukoon Unlimited: users, experts, calls, payments, WhatsApp, events and games, plus a scheduler that places due calls and sends reminders every five minutes.</p>
              <div className="tags" data-step={14}><span className="dp-pill">aws lambda</span><span className="dp-pill">flask</span><span className="dp-pill">mongodb</span><span className="dp-pill">cashfree</span></div>
              <div className="tour__links" data-step={15}><a className="tlink" href={repos.backbone}>RamaSai2519/back_bone ↗</a></div>
            </>
          }
        >
          <div className="canvas-box" role="img" aria-label="As you scroll, back_bone's 83 endpoints light up domain by domain, then the scheduler's job groups fill side by side">
            <div className="tags" style={{ justifyContent: "space-between" }}><span className="dp-label">83 /actions routes · grouped by hand</span><span className="dp-pill dp-pill--gold">rate(5 minutes)</span></div>
            <div className="ep-groups">
              {domains.map(([d, n, c], i) => (
                <div key={d} className="ep-group" data-step={i} data-fx="state" style={{ ["--c" as string]: c }}>
                  <div className="ep-dots" aria-hidden="true">{Array.from({ length: n }, (_, k) => <i key={k} />)}</div>
                  <span className="dp-label">{d} · {n}</span>
                </div>
              ))}
            </div>
            <div className="bars bars--one">
              {lanes.map(([l, c], i) => (
                <div key={l} className="bar">
                  <span className="dp-label" style={{ color: c }}>{l}</span>
                  <div className="bar__track"><div className="bar__fill" data-step={11 + i} data-fx="fill" style={{ ["--w" as string]: "100%", background: c }} /></div>
                </div>
              ))}
            </div>
          </div>
        </Scene>

        {/* 06 LEDGER */}
        <Scene
          p={P.ledger}
          flip
          copy={
            <>
              <h2>One ledger for two<span className="dotg">.</span></h2>
              <p>A shared ledger for a couple or roommates. Bank SMS turns into categorized transactions, budgets track what&rsquo;s left, and every entry shows who logged it.</p>
              <div className="tags" data-step={1}><span className="dp-pill">lambda · http api</span><span className="dp-pill">mongodb atlas</span><span className="dp-pill">fcm</span><span className="dp-pill">sms parser</span></div>
            </>
          }
        >
          <LiveFrame src={sites.ledger} url="ledger.journeymen.in" title="Ledger, live" poster={shotLedger} />
        </Scene>

        {/* 07 MOHAN VISWESWAR */}
        <Scene
          p={P.mohan}
          copy={
            <>
              <h2>A consultant&rsquo;s practice, online<span className="dotg">.</span></h2>
              <p>Built for Chandika Mohan Visweswar, an insurance and financial consultant: motor, health, travel, marine, business, cattle and home cover, loans and investments, with an enquiry form.</p>
              <div className="tags" data-step={1}><span className="dp-pill">next.js</span><span className="dp-pill">enquiry form</span><span className="dp-pill">ga4 · clarity</span></div>
            </>
          }
        >
          <LiveFrame src={sites.mohan} url="www.mohanvisweswar.in" title="mohanvisweswar.in, live" poster={shotMohan} />
        </Scene>

        {/* 08 GITAM EPOCH */}
        <Scene
          p={P.epoch}
          flip
          copy={
            <>
              <h2>A club site and its fest<span className="dotg">.</span></h2>
              <p>The GitHub Community Club at GITAM Bengaluru and Epoch, its annual fest: registration, Epoch Coins, QR scanning, a shop and a live leaderboard. I designed and built it.</p>
              <div className="tags" data-step={1}><span className="dp-pill">supabase</span><span className="dp-pill">qr scanning</span><span className="dp-pill">live leaderboard</span></div>
            </>
          }
        >
          <LiveFrame src={sites.epoch} url="gitamepoch.vercel.app" title="GITAM Epoch, live" poster={shotEpoch} />
        </Scene>

        {/* 09 RESUME_BUILDER */}
        <Scene
          p={P["resume-builder"]}
          copy={
            <>
              <h2>Binary-searches the type until it fits one page<span className="dotg">.</span></h2>
              <p>Résumés live in YAML and render through headless Chromium to ATS-safe HTML and PDF, with an ATS report and a keyword-gap check that never invents experience.</p>
              <div className="tags" data-step={4}><span className="dp-pill">playwright</span><span className="dp-pill">3 themes</span><span className="dp-pill">ats report</span></div>
              <div className="tour__links" data-step={5}><a className="tlink" href={contact.resume} download>Download a résumé it built ↓</a></div>
            </>
          }
        >
          <div className="canvas-box rb-fig" role="img" aria-label="As you scroll, YAML content renders to a page whose type scale shrinks until it fits exactly one page, and the ATS check fills">
            <div className="dp-code" data-step={0}>
              <div className="dp-code__bar" aria-hidden="true"><i /><i /><i /><span>resume.yaml</span></div>
              <pre><span className="k">name</span>: <span className="s">Rama Sathya Sai</span>{"\n"}<span className="k">experience</span>:{"\n"}  - <span className="k">role</span>: <span className="s">…</span>{"\n"}    <span className="k">bullets</span>: [<span className="n">…</span>]{"\n"}<span className="k">theme</span>: <span className="f">google</span></pre>
            </div>
            <div className="rb-page" aria-hidden="true" data-step={1}>
              <div className="sheet">
                <i className="nm" /><i style={{ width: "80%" }} />
                <i className="hd" /><i /><i style={{ width: "90%" }} /><i style={{ width: "75%" }} />
                <i className="hd" /><i /><i style={{ width: "85%" }} /><i style={{ width: "92%" }} /><i style={{ width: "70%" }} />
                <i className="hd" /><i /><i style={{ width: "80%" }} /><i /><i style={{ width: "60%" }} />
              </div>
              <div className="rb-flag rb-flag--bad" data-step={1} data-fx="fade">overflow</div>
              <div className="rb-flag rb-flag--ok" data-step={3} data-fx="fade">1 page</div>
            </div>
            <div className="node-col ats" data-step={2}>
              <svg aria-hidden="true" width="110" height="110" viewBox="0 0 100 100"><circle cx="50" cy="50" r="42" fill="none" stroke="#19191b" strokeWidth="10" /><circle className="prog" cx="50" cy="50" r="42" fill="none" style={{ stroke: "var(--accent)" }} strokeWidth="10" strokeLinecap="round" strokeDasharray="264" transform="rotate(-90 50 50)" /></svg>
              <span className="dp-label">ats check</span>
            </div>
          </div>
        </Scene>

        {/* RECAP: overview at the end */}
        <div className="recap-wrap">
          <Stage id="all-work" mode="scrub" space="lattice" className="recap" label="All work">
            <div className="sec-head">
              <span className="dp-label">10 — all work</span>
              <h2 className="h-display">Everything, at a glance</h2>
            </div>
            <div className="recap__grid">
              {projects.map((p, i) => {
                const inner = (
                  <>
                    <span className="dp-label">{p.num} · {p.tag}</span>
                    <h3>{p.name}</h3>
                    <p>{p.line}</p>
                    <span className="recap__go">{p.action.label} {p.action.external ? "↗" : "→"}</span>
                  </>
                );
                return p.action.external ? (
                  <a key={p.id} className="dp-card" href={p.action.href} target="_blank" rel="noopener" data-step={i}>{inner}</a>
                ) : (
                  <Link key={p.id} className="dp-card" href={p.action.href} data-step={i}>{inner}</Link>
                );
              })}
            </div>
          </Stage>
        </div>
      </main>

      {/* CONTACT */}
      <footer id="contact" className="contact" data-space="globe">
        <div className="wrap contact__inner">
          <div className="sec-head">
            <span className="dp-label">11 — merge</span>
            <h2 className="h-display">Let&rsquo;s build the next one<span className="dotg">.</span></h2>
            <p className="small">Write to <a href={`mailto:${contact.email}`}>{contact.email}</a>.</p>
          </div>
          <div className="row" style={{ alignItems: "center", gap: "12px 24px" }}>
            <a className="dp-btn dp-btn--primary" href={`mailto:${contact.email}`}>Email me</a>
            <a className="tlink" href={contact.github}>GitHub ↗</a>
            <a className="tlink" href={contact.linkedin}>LinkedIn ↗</a>
            <a className="tlink" href={contact.resume} download>Résumé (PDF) ↓</a>
          </div>
        </div>
        <Colophon />
      </footer>
    </div>
  );
}
