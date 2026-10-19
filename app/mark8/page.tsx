import type { Metadata } from "next";
import type { CSSProperties } from "react";
import "./mark8.css";
import { PageFooter, SecHead, SiteHeader, Stat, Wire } from "@/components/chrome";
import { repos } from "@/lib/site";

export const metadata: Metadata = {
  title: "mark8",
  description: "mark8 read and scored Sukoon Unlimited's support calls in real time, 100–500 a day, on a seven-part, 100-point rubric.",
};

// mark/helper/prompts.py: seven parameters, 100 points in total
const rubric = [
  { name: "Opening greeting", pts: 10, color: "var(--sky)" },
  { name: "Time split between expert and user", pts: 15, color: "var(--purple)" },
  { name: "User sentiment", pts: 20, color: "var(--brand)" },
  { name: "Flow of conversation", pts: 15, color: "var(--purple)" },
  { name: "Time spent on call", pts: 10, color: "var(--sky)" },
  { name: "Probability of the user calling back", pts: 20, color: "var(--gold)" },
  { name: "Closing greeting", pts: 10, color: "var(--sky)" },
];

// mark/texts/topics.txt: 12 families
const topics = [
  "Mental Health", "Physical Health", "Personal Wellbeing", "Family", "Work/Retirement", "Community",
  "Legal", "Life as usual", "General News", "Forward Looking", "Financial Planning", "Interests",
];
const topicColors = ["var(--purple)", "var(--sky)", "var(--brand)", "var(--gold)", "var(--link)"];

const routes: [string, string, string?][] = [
  ["POST /flask/process", "score one call", "var(--brand)"],
  ["/bulk_users", "import users"],
  ["/bulk_schedule", "book many calls"],
  ["/queue_wa_msgs", "whatsapp queue"],
  ["/send_fcm_msgs", "push notifications"],
  ["/excel_upload", "sheet imports"],
  ["/gather_data", "reporting"],
  ["/chat", "chat service"],
  ["async /invoice", "pdf invoices · quart", "var(--gold)"],
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

const d = (s: number): CSSProperties => ({ animationDelay: `${s}s` });

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
            <div className="row">
              <a className="dp-btn dp-btn--primary" href={repos.mark8}>View the code</a>
              <a className="dp-btn dp-btn--secondary" href="#pipeline">Watch a call go through</a>
            </div>
          </div>
          <div className="stats rise rise--d">
            <Stat n="100–500" label="calls handled a day" color="var(--gold)" />
            <Stat n="all day" label="realtime, not batch" color="var(--brand)" />
            <Stat n="12" label="topic families tracked" color="var(--purple)" />
            <Stat n="7" label="scoring parameters" color="var(--sky)" />
          </div>
        </section>

        <section id="pipeline" className="wrap section section--tight">
          <SecHead eyebrow="01 — the pipeline" title="From hang-up to score" />
          <div className="panel" role="img" aria-label="Animated pipeline: a finished call is validated, analysed against topics, used to update user and expert personas, scored on seven parameters, and written back to MongoDB" style={{ display: "flex", flexDirection: "column", gap: 32, overflow: "hidden" }}>
            <div className="ticker-wrap"><div className="m-ticker">{ticker}{ticker}</div></div>
            <div className="flow pipe-flow">
              <div className="node-col"><div className="node node--gold m-live" style={{ fontSize: 13 }}>call ends</div><span className="dp-label">calls collection</span></div>
              <Wire color="var(--gold)" />
              <div className="node-col"><div className="node" style={{ fontSize: 13 }}>validate_call</div><span className="dp-label">successful · recorded · 2 min+</span></div>
              <Wire color="var(--gold)" delay={0.6} />
              <div className="node-col"><div className="node node--purple" style={{ fontSize: 13 }}>analyse</div><span className="dp-label">12 topic families</span></div>
              <Wire color="var(--gold)" delay={1.2} />
              <div className="node-col"><div className="node node--sky" style={{ fontSize: 13 }}>personas</div><span className="dp-label">user · expert</span></div>
              <Wire color="var(--gold)" delay={1.8} />
              <div className="node-col"><div className="node node--brand" style={{ fontSize: 13 }}>conversationScore</div><span className="dp-label">written to mongo</span></div>
            </div>
            <div className="tags" style={{ justifyContent: "space-between", alignItems: "center" }}>
              <span className="dp-label">the rubric · bar = weight, 100 points in total</span>
              <span className="dp-label c-subtle">mark/helper/prompts.py</span>
            </div>
            <div className="rubric">
              {rubric.map((r, i) => (
                <div key={r.name} className="bar">
                  <div className="bar__head"><span className="dp-label">{r.name}</span><span className="dp-label" style={{ color: r.color }}>{r.pts} pts</span></div>
                  <div className="bar__track"><div className="m-fill" style={{ ["--w" as string]: `${r.pts * 5}%`, background: r.color, ...d(i * 0.3) }} /></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="wrap section section--tight">
          <SecHead eyebrow="02 — what members talk about" title="Twelve topic families, every call tagged">
            <p className="prose">Each scored call is tagged against the topic families in <span className="code-inline">mark/texts/topics.txt</span>.</p>
          </SecHead>
          <div className="topics">
            {topics.map((t, i) => (
              <div key={t} className="topic" style={{ color: topicColors[i % topicColors.length], ...d(i * 0.55) }}>
                <h3>{t}</h3>
                <span className="dp-label">{String(i + 1).padStart(2, "0")}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="wrap section section--tight">
          <SecHead eyebrow="03 — the server around it" title="One process, Flask and Quart side by side">
            <p className="prose">Starlette mounts a sync Flask app and an async Quart app together. Besides scoring calls, the same server ran Sukoon&rsquo;s operations: bulk users and schedules, WhatsApp queues, push notifications and PDF invoices.</p>
          </SecHead>
          <div className="split">
            <div className="routes">
              {routes.map(([r, note, c], i) => (
                <div key={r} className="m-ping" style={d(i * 0.4)}><b style={c ? { color: c } : undefined}>{r}</b><span>{note}</span></div>
              ))}
            </div>
            <div className="dp-code" style={{ flex: "1 1 320px" }}>
              <div className="dp-code__bar" aria-hidden="true"><i /><i /><i /><span>redeploy.sh</span></div>
              <pre><span className="c"># mark8 + ARK-I share code as git submodules</span>{"\n"}<span className="f">cd</span> mark8 <span className="k">&amp;&amp;</span> git pull{"\n"}git submodule update <span className="s">--init --recursive</span>{"\n"}<span className="f">cd</span> ../ARK-I <span className="k">&amp;&amp;</span> git pull{"\n"}git submodule update <span className="s">--init --recursive</span>{"\n"}pm2 restart <span className="n">mark markb ARK</span></pre>
            </div>
          </div>
          <div className="tags"><span className="dp-pill dp-pill--gold">python</span><span className="dp-pill">flask</span><span className="dp-pill">quart</span><span className="dp-pill">starlette</span><span className="dp-pill dp-pill--purple">llm scoring</span><span className="dp-pill">mongodb</span><span className="dp-pill dp-pill--sky">fcm · whatsapp</span><span className="dp-pill">pm2</span></div>
        </section>
      </main>
      <PageFooter prev={{ href: "/ark-i", label: "Previous: ARK-I" }} next={{ href: "/back-bone", label: "Next: back_bone" }} />
    </div>
  );
}
