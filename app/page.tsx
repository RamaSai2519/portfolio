import Link from "next/link";
import "./home.css";
import { BrowserFrame } from "@/components/frame";
import { Colophon, Ph, Wire, Wordmark } from "@/components/chrome";
import { contact, repos, sites } from "@/lib/site";
import shotJourneymen from "@/design/content/assets/screenshots/journeymen.png";
import shotLedger from "@/design/content/assets/screenshots/ledger.png";
import shotMohan from "@/design/content/assets/screenshots/mohan-visweswar.png";
import shotEpoch from "@/design/content/assets/screenshots/gitam-epoch.png";

const index = [
  { href: "/emporos", tag: "flagship · trading", color: "var(--gold)", name: "Emporos", line: "Nifty options desk with a 16-rule risk engine" },
  { href: sites.journeymen, tag: "flagship · site", color: "var(--gold)", name: "Journeymen", line: "GitHub-verified developer certification." },
  { href: "/ark-i", tag: "sukoon · ai", color: "var(--purple)", name: "ARK-I", line: "WhatsApp assistant, one model plus six specialists" },
  { href: "/mark8", tag: "sukoon · ai", color: "var(--purple)", name: "mark8", line: "Scores 100–500 support calls a day" },
  { href: "/back-bone", tag: "sukoon · backend", color: "var(--sky)", name: "back_bone", line: "83 endpoints and a 5-minute scheduler" },
  { href: repos.resume, tag: "tool", color: "var(--brand)", name: "resume_builder", line: "YAML to a one-page, ATS-safe PDF" },
  { href: sites.ledger, tag: "site", color: "var(--text-subtle)", name: "Ledger", line: "One shared ledger for a couple or roommates" },
  { href: sites.mohan, tag: "client site", color: "var(--text-subtle)", name: "Mohan Visweswar", line: "Insurance and financial consultant, built for the client" },
  { href: sites.epoch, tag: "site", color: "var(--text-subtle)", name: "GITAM Epoch", line: "GitHub Community Club and its annual fest" },
];

const rubric = [
  { name: "opening greeting", pts: 10, color: "var(--sky)" },
  { name: "expert / user time split", pts: 15, color: "var(--purple)" },
  { name: "user sentiment", pts: 20, color: "var(--brand)" },
  { name: "flow of conversation", pts: 15, color: "var(--purple)" },
  { name: "time spent on call", pts: 10, color: "var(--sky)" },
  { name: "chance of a call back", pts: 20, color: "var(--gold)" },
  { name: "closing greeting", pts: 10, color: "var(--sky)" },
];

const lanes = [
  { name: "schedules", color: "var(--brand)" },
  { name: "event reminders", color: "var(--sky)" },
  { name: "expert status", color: "var(--purple)" },
  { name: "emails · db backup", color: "var(--gold)" },
];

const subs = ["experts", "schedules", "sukoon", "events", "partners", "user"];

// [bottom px, height px, down candle?] for the Emporos mini chart: 5-candle move, 5-candle build-up, breakout
const mini: [number, number, boolean][] = [
  [8, 18, false], [20, 18, false], [32, 18, false], [44, 18, false], [56, 18, false],
  [74, 10, true], [76, 14, false], [73, 10, true], [78, 12, false], [75, 12, true],
];

export default function Home() {
  return (
    <div className="p-home">
      <header className="wrap site-header">
        <Wordmark href="#top" />
        <nav aria-label="Sections">
          <a className="dp-btn dp-btn--ghost" href="#work">work</a>
          <a className="dp-btn dp-btn--ghost" href="#sites">sites</a>
          <a className="dp-btn dp-btn--ghost" href="#systems">systems</a>
          <a className="dp-btn dp-btn--ghost" href="#contact">contact</a>
        </nav>
      </header>

      <main id="main">
        {/* HERO */}
        <section id="top" className="wrap hero-home">
          <div className="hero-home__copy rise">
            <span className="dp-pill dp-pill--brand" style={{ alignSelf: "flex-start" }}>
              <i className="dp-dot dp-dot--live live" />
              <Ph>open to work: confirm</Ph>
            </span>
            <h1 className="h-home">I ship websites and the systems behind them<span className="dotg">.</span></h1>
            <p className="lede" style={{ maxWidth: 560 }}>
              Five sites live in production, and the systems behind them: a trading engine, an LLM assistant, a call scorer, a platform backend and a résumé typesetter.
            </p>
            <div className="hero-stats">
              <div><b className="c-brand">10k</b><span className="dp-label">active users at Sukoon</span></div>
              <div><b className="c-purple">4k</b><span className="dp-label">paying members</span></div>
              <div><b className="c-gold">100–500</b><span className="dp-label">calls scored a day</span></div>
            </div>
            <div className="row">
              <a className="dp-btn dp-btn--primary" href="#work">See the work</a>
              <a className="dp-btn dp-btn--secondary" href={contact.github}>github.com/RamaSai2519</a>
            </div>
          </div>
          <div className="dp-code hero-log rise rise--d">
            <div className="dp-code__bar" aria-hidden="true"><i /><i /><i /><span>git log --graph --oneline</span></div>
            <ol className="dp-graph">
              <li style={{ ["--node" as string]: "var(--brand)" }}><h3>journeymen.in</h3><p>main · site</p></li>
              <li style={{ ["--node" as string]: "var(--brand)" }}><h3>emporos · ledger</h3><p>main · sub-domains</p></li>
              <li style={{ ["--node" as string]: "var(--sky)" }}><h3>mohanvisweswar.in · gitam epoch</h3><p>client · community</p></li>
              <li style={{ ["--node" as string]: "var(--purple)" }}><h3>ARK-I · mark8 · back_bone</h3><p>sukoon · systems</p></li>
              <li style={{ ["--node" as string]: "var(--purple)" }}><h3>resume_builder</h3><p>tools · systems</p></li>
            </ol>
          </div>
        </section>

        {/* INDEX */}
        <section id="work" className="wrap section section--tight">
          <div className="sec-head sec-head--row">
            <div className="sec-head__titles">
              <span className="dp-label">00 — index</span>
              <h2 className="h-display">All work</h2>
            </div>
            <span className="dp-label">{index.length} projects · 4 deep dives</span>
          </div>
          <div className="index">
            {index.map((p) =>
              p.href.startsWith("/") ? (
                <Link key={p.name} className="dp-card" href={p.href}>
                  <span className="dp-label" style={{ color: p.color }}>{p.tag}</span>
                  <h3>{p.name}</h3>
                  <p>{p.line}</p>
                </Link>
              ) : (
                <a key={p.name} className="dp-card" href={p.href} target="_blank" rel="noopener">
                  <span className="dp-label" style={{ color: p.color }}>{p.tag}</span>
                  <h3>{p.name}</h3>
                  <p>{p.line}</p>
                </a>
              ),
            )}
          </div>
        </section>

        {/* SITES */}
        <section id="sites" className="wrap section">
          <div className="sec-head sec-head--row">
            <div className="sec-head__titles">
              <span className="dp-label">01 — shipped</span>
              <h2 className="h-display">Live on the web</h2>
            </div>
            <span className="dp-label">hover a frame to scroll faster</span>
          </div>
          <div className="sites">
            <BrowserFrame
              className="s3"
              href={sites.journeymen}
              url="www.journeymen.in"
              title="Journeymen"
              badge={<span className="dp-pill dp-pill--gold">flagship</span>}
              frameH={300}
              shot={shotJourneymen}
              shotAlt="Full-page screenshot of journeymen.in"
              scrollDur={18}
            >
              <p>GitHub-verified developer certification. A submitted project is checked against its GitHub commit history, run through AI consistency checks and graded; anything odd goes to a human review queue. Built by a two-person team.</p>
            </BrowserFrame>

            <BrowserFrame
              className="s3"
              href="/emporos"
              url="emporos.journeymen.in"
              title="Emporos"
              badge={<span className="dp-pill dp-pill--gold">flagship</span>}
              frameH={300}
              overlay={<span className="dp-pill dp-pill--overlay"><Ph>demo dashboard preview: blocked until the demo exists</Ph></span>}
              mock={
                <div className="mock emp-mock" style={{ animationDelay: "-4s" }} aria-hidden="true">
                  <div className="bar1"><i style={{ width: "25%", background: "var(--purple)" }} /><i style={{ width: "30%", background: "var(--line)" }} /></div>
                  <div className="grid">
                    {Array.from({ length: 12 }, (_, i) => <i key={i} className={[0, 3, 5, 10].includes(i) ? "p" : ""} />)}
                  </div>
                </div>
              }
            >
              <p>My Nifty weekly options desk: it records the market every minute, paper-trades 24 books and trades one for real behind five locks. The live dashboard is private; a public demo is on the way.</p>
            </BrowserFrame>

            <BrowserFrame className="s2" href={sites.ledger} url="ledger.journeymen.in" title="Ledger" frameH={220} shot={shotLedger} shotAlt="Full-page screenshot of ledger.journeymen.in" scrollDur={18}>
              <p>One shared ledger for a couple or roommates. Bank SMS turns into categorized transactions, budgets track what&rsquo;s left, and every entry shows who logged it.</p>
            </BrowserFrame>

            <BrowserFrame className="s2" href={sites.mohan} url="mohanvisweswar.in" title="Mohan Visweswar" frameH={220} shot={shotMohan} shotAlt="Full-page screenshot of mohanvisweswar.in" scrollDur={14}>
              <p>Built for Chandika Mohan Visweswar, an insurance and financial consultant: motor, health, travel, marine, business, cattle and home cover, loans and investments.</p>
            </BrowserFrame>

            <BrowserFrame className="s2" href={sites.epoch} url="gitamepoch.vercel.app" title="GITAM Epoch" frameH={220} shot={shotEpoch} shotAlt="Full-page screenshot of gitamepoch.vercel.app" scrollDur={22}>
              <p>The GitHub Community Club at GITAM Bengaluru and Epoch, its annual fest: registration, Epoch Coins, QR scanning, a shop and a live leaderboard. I&rsquo;m a core contributor.</p>
            </BrowserFrame>
          </div>
        </section>

        {/* SYSTEMS */}
        <section id="systems" className="wrap section">
          <div className="sec-head">
            <span className="dp-label">02 — solved</span>
            <h2 className="h-display">Systems, drawn running</h2>
          </div>

          {/* Emporos */}
          <article className="sys sys--flag">
            <div className="sys__copy">
              <div className="tags" style={{ alignItems: "center" }}><span className="dp-label c-gold">emporos · trading engine</span><span className="dp-pill dp-pill--gold">flagship</span></div>
              <h3>Sixteen risk rules before every order.</h3>
              <p className="small">Records Nifty options every minute, finds a breakout one closed candle at a time, paper-trades 24 books and trades one for real behind five locks. Limit orders only, intent written before the broker call.</p>
              <div className="tags"><span className="dp-pill dp-pill--gold">angel one</span><span className="dp-pill">python · asyncio</span><span className="dp-pill dp-pill--sky">aws</span><span className="dp-pill dp-pill--purple">next.js</span></div>
              <div className="tags"><Link className="dp-btn dp-btn--primary" href="/emporos">Deep dive</Link><Link className="dp-btn dp-btn--ghost" href="/emporos/demo">Demo dashboard</Link></div>
            </div>
            <div className="sys__fig stage" role="img" aria-label="Animated diagram: a five-candle move and a five-candle build-up on the Nifty chart end in a breakout, which passes the risk engine before a limit order reaches Angel One">
              <div className="mini-chart">
                <div className="range" style={{ left: 70, width: 64 }} />
                {mini.map(([b, h, dn], i) => <i key={i} className={dn ? "dn" : ""} style={{ height: h, marginBottom: b }} />)}
                <i className="live" style={{ height: 30, marginBottom: 80 }} />
                <span className="dp-label lbl c-brand">breakout → buy</span>
              </div>
              <div className="flow flow--stack">
                <div className="node node--purple">setup · 5 + 5 candles</div>
                <Wire />
                <div className="node node--gold">16 risk rules</div>
                <Wire delay={0.8} />
                <div className="node node--brand">limit order</div>
              </div>
            </div>
          </article>

          {/* ARK-I */}
          <article className="sys">
            <div className="sys__copy">
              <span className="dp-label c-purple">ARK-I · adaptive resource kernel</span>
              <h3>One model remembers. Six forget on purpose.</h3>
              <p className="small">A stateful main model holds the whole conversation and calls short-lived, stateless sub-models through function calls. Ran the WhatsApp assistant for Sukoon Unlimited, with about 100 people chatting to it every day.</p>
              <div className="tags"><span className="dp-pill dp-pill--purple">gpt-4o tools</span><span className="dp-pill">flask</span><span className="dp-pill">mongodb</span><span className="dp-pill dp-pill--sky">whatsapp</span></div>
              <div className="tags"><Link className="dp-btn dp-btn--primary" href="/ark-i">Deep dive</Link><a className="dp-btn dp-btn--ghost" href={repos.arki}>RamaSai2519/ARK-I</a></div>
            </div>
            <div className="sys__fig stage ark-fig" role="img" aria-label="Animated diagram: a user message flows to MainGPT, which calls a controller that dispatches to six sub-models in turn">
              <div className="node-col">
                <div className="ark-user">
                  <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 4-6 8-6s8 2 8 6" /></svg>
                </div>
                <span className="dp-label">user</span>
              </div>
              <Wire color="var(--sky)" />
              <div className="node-col">
                <div className="node node--brand node--strong live" style={{ fontSize: 14, lineHeight: "18px", padding: "14px 16px", borderRadius: 14 }}>MainGPT</div>
                <div className="vwire" style={{ height: 28 }}><i className="pkt" style={{ ["--pkt" as string]: "var(--brand)" }} /></div>
                <span className="dp-pill" style={{ fontSize: 11 }}>mongo · history</span>
              </div>
              <Wire delay={0.6} />
              <div className="node" style={{ fontSize: 13, lineHeight: "18px", padding: "14px 12px", borderRadius: 14 }}>controller</div>
              <Wire color="var(--purple)" delay={1.2} style={{ flexBasis: 24 }} />
              <div className="ark-subs">
                {subs.map((s, i) => <span key={s} className="h-blink" style={{ animationDelay: `${i * 0.6}s` }}>{s}</span>)}
              </div>
            </div>
          </article>

          {/* mark8 */}
          <article className="sys sys--rev">
            <div className="sys__fig stage" role="img" aria-label="Animated diagram: all day, each support call is validated, analysed and scored on a seven-part, 100-point rubric">
              <div className="tags" style={{ justifyContent: "space-between", alignItems: "center" }}>
                <span className="dp-pill dp-pill--gold"><i className="dp-dot live" style={{ background: "var(--gold)" }} />realtime · all day</span>
                <span className="dp-label">100–500 calls / day</span>
              </div>
              <div className="flow flow--stack">
                <div className="node">calls</div>
                <Wire color="var(--gold)" />
                <div className="node">validate</div>
                <Wire color="var(--gold)" delay={0.8} />
                <div className="node node--purple">analyse</div>
                <Wire color="var(--gold)" delay={1.6} />
                <div className="node node--brand">score</div>
              </div>
              <div className="bars">
                {rubric.map((r, i) => (
                  <div key={r.name} className="bar">
                    <div className="bar__head"><span className="dp-label">{r.name}</span><span className="dp-label c-text">{r.pts}</span></div>
                    <div className="bar__track"><div className="h-fill" style={{ ["--w" as string]: `${r.pts * 5}%`, background: r.color, animationDelay: `${i * 0.25}s` }} /></div>
                  </div>
                ))}
              </div>
              <div className="tags"><span className="dp-pill">→ user persona</span><span className="dp-pill">→ expert persona</span><span className="dp-pill dp-pill--brand">→ score / 100</span></div>
            </div>
            <div className="sys__copy">
              <span className="dp-label c-gold">mark8 · realtime call analyst</span>
              <h3>Every support call, read and scored as it happens.</h3>
              <p className="small">Ran all day on Sukoon&rsquo;s support line, 100 to 500 calls a day: tags each call against 12 topic families, updates user and expert personas, and scores it out of 100. The same server handles bulk scheduling, WhatsApp queues, FCM pushes and PDF invoices.</p>
              <div className="tags"><span className="dp-pill dp-pill--gold">llm scoring</span><span className="dp-pill">flask + quart</span><span className="dp-pill">pm2</span></div>
              <div className="tags"><Link className="dp-btn dp-btn--primary" href="/mark8">Deep dive</Link><a className="dp-btn dp-btn--ghost" href={repos.mark8}>RamaSai2519/mark8</a></div>
            </div>
          </article>

          {/* back_bone */}
          <article className="sys">
            <div className="sys__copy">
              <span className="dp-label c-sky">back_bone · sukoon platform backend</span>
              <h3>83 endpoints and a five-minute heartbeat.</h3>
              <p className="small">The Flask-on-Lambda API behind Sukoon: users, experts, calls, payments, WhatsApp, events and games, plus a scheduler that places due calls and sends reminders every five minutes.</p>
              <div className="tags"><span className="dp-pill dp-pill--sky">aws lambda</span><span className="dp-pill">flask</span><span className="dp-pill dp-pill--brand">mongodb</span><span className="dp-pill dp-pill--gold">cashfree</span></div>
              <div className="tags"><Link className="dp-btn dp-btn--primary" href="/back-bone">Deep dive</Link><a className="dp-btn dp-btn--ghost" href={repos.backbone}>RamaSai2519/back_bone</a></div>
            </div>
            <div className="sys__fig stage" role="img" aria-label="Animated diagram: the scheduler fires every five minutes and its job groups fill side by side">
              <div className="tags" style={{ justifyContent: "space-between" }}><span className="dp-pill dp-pill--gold">rate(5 minutes)</span><span className="dp-label">gamesProcessor + scheduler</span></div>
              <div className="bars bars--one">
                {lanes.map((l, i) => (
                  <div key={l.name} className="bar">
                    <span className="dp-label" style={{ color: l.color }}>{l.name}</span>
                    <div className="bar__track"><div className="h-fill" style={{ ["--w" as string]: "100%", background: l.color, animationDelay: `${i * 0.3}s` }} /></div>
                  </div>
                ))}
              </div>
            </div>
          </article>

          {/* resume_builder */}
          <article className="sys">
            <div className="sys__copy">
              <span className="dp-label c-brand">resume_builder · yaml → pdf</span>
              <h3>Binary-searches the type until it fits one page.</h3>
              <p className="small">Résumés live in YAML and render through headless Chromium to ATS-safe HTML and PDF, with an ATS report and a keyword-gap check that never invents experience.</p>
              <div className="tags"><span className="dp-pill dp-pill--brand">playwright</span><span className="dp-pill">3 themes</span><span className="dp-pill dp-pill--sky">ats report</span></div>
              <div className="tags">
                <a className="dp-btn dp-btn--secondary" href={contact.resume} download>Download a résumé it built</a>
                <a className="dp-btn dp-btn--ghost" href={repos.resume}>RamaSai2519/resume_builder</a>
              </div>
            </div>
            <div className="sys__fig stage rb-fig" role="img" aria-label="Animated diagram: YAML content is rendered to a page whose type scale shrinks and grows until it fits exactly one page, then scored for ATS checks">
              <div className="dp-code">
                <div className="dp-code__bar" aria-hidden="true"><i /><i /><i /><span>resume.yaml</span></div>
                <pre><span className="k">name</span>: <span className="s">Rama Sathya Sai</span>{"\n"}<span className="k">experience</span>:{"\n"}  - <span className="k">role</span>: <span className="s">…</span>{"\n"}    <span className="k">bullets</span>: [<span className="n">…</span>]{"\n"}<span className="k">theme</span>: <span className="f">google</span></pre>
              </div>
              <Wire style={{ flex: "0 1 40px" }} />
              <div className="rb-page" aria-hidden="true">
                <div className="h-fit">
                  <i className="nm" /><i style={{ width: "80%" }} />
                  <i className="hd" /><i /><i style={{ width: "90%" }} /><i style={{ width: "75%" }} />
                  <i className="hd" /><i /><i style={{ width: "85%" }} /><i style={{ width: "92%" }} /><i style={{ width: "70%" }} />
                  <i className="hd" /><i /><i style={{ width: "80%" }} />
                </div>
                <div className="rb-flag h-overflow">overflow</div>
                <div className="rb-flag h-fitok">1 page</div>
              </div>
              <Wire delay={1.2} style={{ flex: "0 1 40px" }} />
              <div className="node-col" style={{ gap: 10 }}>
                <svg aria-hidden="true" width="96" height="96" viewBox="0 0 100 100"><circle cx="50" cy="50" r="42" fill="none" stroke="#1b1b2e" strokeWidth="10" /><circle className="h-spin" cx="50" cy="50" r="42" fill="none" stroke="#3fc84e" strokeWidth="10" strokeLinecap="round" strokeDasharray="264" strokeDashoffset="40" transform="rotate(-90 50 50)" /></svg>
                <span className="dp-label">ats check</span>
              </div>
            </div>
          </article>
        </section>
      </main>

      {/* CONTACT */}
      <footer id="contact" className="contact">
        <div className="wrap contact__inner">
          <div className="sec-head">
            <span className="dp-label">03 — merge</span>
            <h2 className="h-display">Let&rsquo;s build the next one<span className="dotg">.</span></h2>
            <p className="small">Write to <a href={`mailto:${contact.email}`}>{contact.email}</a>.</p>
          </div>
          <div className="row">
            <a className="dp-btn dp-btn--primary" href={`mailto:${contact.email}`}>Email me</a>
            <a className="dp-btn dp-btn--secondary" href={contact.github}>GitHub</a>
            <a className="dp-btn dp-btn--secondary" href={contact.linkedin}>LinkedIn</a>
            <a className="dp-btn dp-btn--secondary" href={contact.resume} download>Résumé (PDF)</a>
          </div>
        </div>
        <p className="wrap colophon"><Ph>résumé PDF is a placeholder: built by resume_builder from its example YAML, phone number removed</Ph></p>
        <Colophon />
      </footer>
    </div>
  );
}
