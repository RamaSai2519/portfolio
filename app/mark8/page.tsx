import type { Metadata } from "next";
import "./mark8.css";
import { PageFooter, SecHead, SiteHeader, Stat, Wire } from "@/components/chrome";
import { Stage } from "@/components/stage";
import { repos } from "@/lib/site";

export const metadata: Metadata = {
  title: "mark8",
  description: "mark8 read and scored Sukoon Unlimited's support calls in real time, 100–500 a day, on a seven-part, 100-point rubric.",
};

// mark/helper/prompts.py: seven parameters, 100 points in total
const rubric = [
  { name: "Opening greeting", pts: 10 },
  { name: "Time split between expert and user", pts: 15 },
  { name: "User sentiment", pts: 20 },
  { name: "Flow of conversation", pts: 15 },
  { name: "Time spent on call", pts: 10 },
  { name: "Probability of the user calling back", pts: 20 },
  { name: "Closing greeting", pts: 10 },
];

// mark/texts/topics.txt: 12 families
const topics = [
  "Mental Health", "Physical Health", "Personal Wellbeing", "Family", "Work/Retirement", "Community",
  "Legal", "Life as usual", "General News", "Forward Looking", "Financial Planning", "Interests",
];

const routes: [string, string][] = [
  ["POST /flask/process", "score one call"],
  ["/bulk_users", "import users"],
  ["/bulk_schedule", "book many calls"],
  ["/queue_wa_msgs", "whatsapp queue"],
  ["/send_fcm_msgs", "push notifications"],
  ["/excel_upload", "sheet imports"],
  ["/gather_data", "reporting"],
  ["/chat", "chat service"],
  ["async /invoice", "pdf invoices · quart"],
];

const pipeline: [string, string, string][] = [
  ["call ends", "calls collection", "lit--gold"],
  ["validate_call", "successful · recorded · 2 min+", ""],
  ["analyse", "12 topic families", ""],
  ["personas", "user · expert", "lit--sky"],
  ["conversationScore", "written to mongo", "lit--brand"],
];

const ticker = (
  <>
    <span className="dp-pill">call · successful · recorded · 2 min+</span><span className="dp-pill dp-pill--brand">scored</span>
    <span className="dp-pill">call · under 2 min</span><span className="dp-pill dp-pill--danger">skipped · too short</span>
    <span className="dp-pill">call · successful · recorded · 2 min+</span><span className="dp-pill dp-pill--brand">scored</span>
    <span className="dp-pill">call · no recording</span><span className="dp-pill dp-pill--danger">skipped · not recorded</span>
    <span className="dp-pill">call · not successful</span><span className="dp-pill dp-pill--danger">skipped</span>
  </>
);

export default function Mark8() {
  return (
    <div className="p-mark8">
      <SiteHeader nav={[{ href: "/", label: "all work" }, { href: "/emporos", label: "emporos" }, { href: "/ark-i", label: "ARK-I" }]} />
      <main id="main">
        <section className="wrap hero">
          <div className="hero__copy rise">
            <span className="dp-label c-gold">mark8 · realtime call analyst</span>
            <h1 className="h-hero">Every support call, read and scored as it happens<span className="dotg">.</span></h1>
            <p className="lede">Sukoon Unlimited&rsquo;s experts talk to elderly members on the phone all day. mark8 reads each call, tags what it was about, keeps a persona for both sides, and scores the conversation out of 100, so the team sees quality without listening to every call.</p>
            <div className="row" style={{ alignItems: "center", gap: "12px 24px" }}>
              <a className="dp-btn dp-btn--primary" href="#pipeline">Watch a call go through</a>
              <a className="tlink" href={repos.mark8}>View the code ↗</a>
            </div>
          </div>
          <div className="stats rise rise--d">
            <Stat n="100–500" label="calls handled a day" color="var(--gold)" />
            <Stat n="all day" label="realtime, not batch" color="var(--brand)" />
            <Stat n="12" label="topic families tracked" color="var(--purple)" />
            <Stat n="7" label="scoring parameters" color="var(--sky)" />
          </div>
        </section>

        <Stage id="pipeline" mode="pin" length={2} className="sec sec--pin" label="Pipeline">
          <SecHead eyebrow="01 — the pipeline" title="From hang-up to score" />
          <div className="panel" role="img" aria-label="As you scroll, a finished call is validated, analysed against topics, given user and expert personas, scored on seven parameters and written back to MongoDB" style={{ display: "flex", flexDirection: "column", gap: 28, overflow: "hidden" }}>
            <div className="ticker-wrap"><div className="m-ticker">{ticker}{ticker}</div></div>
            <div className="flow pipe-flow">
              {pipeline.map(([n, l, c], i) => (
                <div key={n} style={{ display: "contents" }}>
                  {i > 0 && <Wire color="var(--gold)" delay={i * 0.6} />}
                  <div className="node-col"><div className={`node lit ${c}`} data-step={i} data-fx="state" style={{ fontSize: 13 }}>{n}</div><span className="dp-label">{l}</span></div>
                </div>
              ))}
            </div>
            <div className="tags" style={{ justifyContent: "space-between", alignItems: "center" }} data-step={5}>
              <span className="dp-label">the rubric · bar = weight, 100 points in total</span>
              <span className="dp-label c-subtle">mark/helper/prompts.py</span>
            </div>
            <div className="rubric">
              {rubric.map((r, i) => (
                <div key={r.name} className="bar">
                  <div className="bar__head"><span className="dp-label">{r.name}</span><span className="dp-label c-text">{r.pts} pts</span></div>
                  <div className="bar__track"><div className="bar__fill" data-step={5 + i} data-fx="fill" style={{ ["--w" as string]: `${r.pts * 5}%`, background: r.pts === 20 ? "var(--gold)" : "var(--purple)" }} /></div>
                </div>
              ))}
            </div>
          </div>
        </Stage>

        <Stage mode="pin" length={1.4} className="sec sec--pin" label="Topics">
          <SecHead eyebrow="02 — what members talk about" title="Twelve topic families, every call tagged">
            <p className="prose">Each scored call is tagged against the topic families in <span className="code-inline">mark/texts/topics.txt</span>.</p>
          </SecHead>
          <div className="topics">
            {topics.map((t, i) => (
              <div key={t} className="topic" data-step={i} data-fx="state">
                <h3>{t}</h3>
                <span className="dp-label">{String(i + 1).padStart(2, "0")}</span>
              </div>
            ))}
          </div>
        </Stage>

        <Stage mode="scrub" className="sec" label="The server">
          <SecHead eyebrow="03 — the server around it" title="One process, Flask and Quart side by side">
            <p className="prose">Starlette mounts a sync Flask app and an async Quart app together. Besides scoring calls, the same server ran Sukoon&rsquo;s operations: bulk users and schedules, WhatsApp queues, push notifications and PDF invoices.</p>
          </SecHead>
          <div className="split">
            <div className="routes">
              {routes.map(([r, note], i) => (
                <div key={r} className="route" data-step={i}><b className={i === 0 ? "c-gold" : undefined}>{r}</b><span>{note}</span></div>
              ))}
            </div>
            <div className="dp-code" style={{ flex: "1 1 320px" }} data-step={9}>
              <div className="dp-code__bar" aria-hidden="true"><i /><i /><i /><span>redeploy.sh</span></div>
              <pre><span className="c"># mark8 + ARK-I share code as git submodules</span>{"\n"}<span className="f">cd</span> mark8 <span className="k">&amp;&amp;</span> git pull{"\n"}git submodule update <span className="s">--init --recursive</span>{"\n"}<span className="f">cd</span> ../ARK-I <span className="k">&amp;&amp;</span> git pull{"\n"}git submodule update <span className="s">--init --recursive</span>{"\n"}pm2 restart <span className="n">mark markb ARK</span></pre>
            </div>
          </div>
          <div className="tags" data-step={10}><span className="dp-pill">python</span><span className="dp-pill">flask</span><span className="dp-pill">quart</span><span className="dp-pill">starlette</span><span className="dp-pill">llm scoring</span><span className="dp-pill">mongodb</span><span className="dp-pill">fcm · whatsapp</span><span className="dp-pill">pm2</span></div>
        </Stage>
      </main>
      <PageFooter prev={{ href: "/ark-i", label: "Previous: ARK-I" }} next={{ href: "/back-bone", label: "Next: back_bone" }} />
    </div>
  );
}
