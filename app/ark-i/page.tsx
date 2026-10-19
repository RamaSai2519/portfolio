import type { Metadata } from "next";
import "./ark.css";
import { PageFooter, Ph, SecHead, SiteHeader, Stat, Wire } from "@/components/chrome";
import { Stage } from "@/components/stage";
import { repos } from "@/lib/site";

export const metadata: Metadata = {
  title: "ARK-I",
  description: "ARK-I: one stateful gpt-4o model holds the conversation and calls six stateless sub-models. Sukoon Unlimited's WhatsApp assistant.",
};

const subs = [
  ["ExpertsGPT", "experts api"],
  ["SchedulesGPT", "schedules api"],
  ["SukoonGPT", "service knowledge"],
  ["EventsGPT", "events api"],
  ["PartnersGPT", "partners api"],
  ["UserGPT", "user profile"],
];

const steps: [string, string, string][] = [
  ["var(--sky)", "User writes on WhatsApp", "The webhook hands the message to Flask."],
  ["var(--brand)", "MainGPT reads the context", "The whole conversation is loaded from MongoDB."],
  ["var(--brand)", "It picks a tool", "A function call names the sub-model it needs."],
  ["var(--line-strong)", "Controller spins it up", "Fresh, stateless, scoped to this one query."],
  ["var(--purple)", "Sub-model fetches and answers", "Calls its API, returns a structured result, and is gone."],
  ["var(--brand)", "MainGPT writes the reply", "Results are merged into one answer in the user's thread."],
  ["var(--sky)", "Sent back on WhatsApp", "History is saved; Slack hears about anything odd."],
];

export default function ArkI() {
  return (
    <div className="p-ark">
      <SiteHeader nav={[{ href: "/", label: "all work" }, { href: "/emporos", label: "emporos" }, { href: "/mark8", label: "mark8" }]} />
      <main id="main">
        <section className="wrap hero">
          <div className="hero__copy rise">
            <span className="dp-label c-purple">ARK-I · adaptive resource kernel, implementation</span>
            <h1 className="h-hero">One model remembers. Six forget on purpose<span className="dotg">.</span></h1>
            <p className="lede">The WhatsApp assistant behind Sukoon Unlimited, an agetech startup for elderly people seeking guidance, companionship and community. A stateful main model holds every conversation and delegates each task to a short-lived sub-model that does one job and disappears.</p>
            <div className="row" style={{ alignItems: "center", gap: "12px 24px" }}>
              <a className="dp-btn dp-btn--primary" href="#flow">Watch a query</a>
              <a className="tlink" href={repos.arki}>View the code ↗</a>
            </div>
          </div>
          <div className="stats rise rise--d">
            <Stat n="10k" label="active Sukoon users" color="var(--brand)" />
            <Stat n="4k" label="paying members" color="var(--purple)" />
            <Stat n="~100" label="people chatting daily" color="var(--sky)" />
            <Stat n="6" label="stateless sub-models" color="var(--gold)" />
          </div>
        </section>

        <Stage mode="pin" length={1.6} className="sec sec--pin" label="Architecture">
          <SecHead eyebrow="01 — architecture" title="A kernel with six specialists" />
          <div className="panel panel--pad-lg" role="img" aria-label="As you scroll, WhatsApp traffic reaches Flask, then MainGPT, which keeps history in MongoDB and alerts Slack, then the controller, which routes to six sub-models one by one" style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div className="flow arch-flow">
              <div className="node-col" data-step={0}>
                <div className="wa"><svg aria-hidden="true" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z" /></svg></div>
                <span className="dp-label">whatsapp · api</span>
              </div>
              <Wire color="var(--sky)" />
              <div className="node-col"><div className="node lit lit--sky" data-step={1} data-fx="state" style={{ fontSize: 14, padding: "16px 18px" }}>flask /ark</div><span className="dp-label">gunicorn · async reply</span></div>
              <Wire color="var(--sky)" delay={0.6} />
              <div className="node-col"><div className="node lit lit--brand node--strong" data-step={2} data-fx="state" style={{ fontSize: 16, padding: "20px 24px" }}>MainGPT</div><span className="dp-label">stateful · gpt-4o tools</span></div>
              <Wire delay={1.2} />
              <div className="node-col"><div className="node lit" data-step={3} data-fx="state" style={{ fontSize: 14, padding: "16px 18px" }}>controller</div><span className="dp-label">routes · lifecycle</span></div>
            </div>
            <div className="split">
              <div style={{ flex: "1 1 260px", display: "flex", flexDirection: "column", gap: 12 }} data-step={2}>
                <span className="dp-label">main model keeps</span>
                <div className="tags"><span className="dp-pill dp-pill--brand">mongodb · full history</span><span className="dp-pill">rate limits</span><span className="dp-pill dp-pill--gold">slack alerts</span></div>
              </div>
              <div style={{ flex: "2 1 520px", display: "flex", flexDirection: "column", gap: 12 }}>
                <span className="dp-label">controller dispatches to</span>
                <div className="subs">
                  {subs.map(([n, api], i) => <div key={n} className="sub" data-step={4 + i} data-fx="state"><b>{n}</b><span>{api}</span></div>)}
                </div>
              </div>
            </div>
          </div>
        </Stage>

        <Stage id="flow" mode="pin" length={2} className="sec sec--pin" label="One query">
          <SecHead eyebrow="02 — one query, end to end" title="Seven hops, one reply" />
          <div className="query">
            <ol className="dp-graph panel">
              {steps.map(([c, h, p], i) => (
                <li key={h} data-step={i} data-fx="state" style={{ ["--node" as string]: c }}><h3>{h}</h3><p>{p}</p></li>
              ))}
            </ol>
            <div className="panel" style={{ padding: 24, display: "flex", flexDirection: "column", gap: 14 }}>
              <div className="tags" style={{ justifyContent: "space-between", alignItems: "center" }}><span className="dp-label">example thread</span><span className="dp-pill dp-pill--sky">illustrative</span></div>
              <div className="msg msg--me" data-step={0}>Can I talk to a yoga expert tomorrow evening?</div>
              <div data-step={2} style={{ alignSelf: "flex-start" }}><span className="dp-pill dp-pill--purple">tool → ExpertsGPT</span></div>
              <div data-step={4} style={{ alignSelf: "flex-start" }}><span className="dp-pill dp-pill--purple">tool → SchedulesGPT</span></div>
              <div className="msg msg--bot" data-step={5}><Ph>reply naming an available expert and open slots</Ph></div>
              <div className="msg msg--me" data-step={6}>Book the 6 pm one.</div>
              <div data-step={6} style={{ alignSelf: "flex-start" }}><span className="dp-pill dp-pill--brand">tool → SchedulesGPT · booked</span></div>
            </div>
          </div>
        </Stage>

        <Stage mode="scrub" className="sec" label="Design choice">
          <SecHead eyebrow="03 — the design choice" title="Why only one model keeps state" />
          <div className="choice">
            <div className="panel" data-step={0} style={{ borderColor: "var(--brand)" }}>
              <span className="dp-pill dp-pill--brand" style={{ alignSelf: "flex-start" }}>stateful · long-lived</span>
              <h3>MainGPT</h3>
              <p className="small">Owns the conversation. One place reads and writes history, so context never forks across models. Runs on gpt-4o.</p>
            </div>
            <div className="panel" data-step={1} style={{ borderColor: "var(--purple)" }}>
              <span className="dp-pill dp-pill--purple" style={{ alignSelf: "flex-start" }}>stateless · one query</span>
              <h3>Sub-models</h3>
              <p className="small">Get a small prompt and a schema, call one API, return. Short prompts keep them cheap; adding a skill means adding one module.</p>
            </div>
          </div>
          <div className="tags" data-step={2}><span className="dp-pill">python</span><span className="dp-pill">flask</span><span className="dp-pill">gunicorn</span><span className="dp-pill">openai function calling · gpt-4o</span><span className="dp-pill">mongodb</span><span className="dp-pill">whatsapp webhooks</span><span className="dp-pill">slack</span><span className="dp-pill">pm2</span></div>
        </Stage>
      </main>
      <PageFooter prev={{ href: "/emporos", label: "Previous: Emporos" }} next={{ href: "/mark8", label: "Next: mark8" }} />
    </div>
  );
}
