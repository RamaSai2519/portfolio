import type { Metadata } from "next";
import Link from "next/link";
import type { CSSProperties } from "react";
import "./bb.css";
import { PageFooter, SecHead, SiteHeader, Stat, Wire } from "@/components/chrome";
import { Stage } from "@/components/stage";
import { repos } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "back_bone",
  description: "back_bone: the Flask-on-Lambda backend behind Sukoon Unlimited. 83 endpoints and a scheduler that runs every five minutes.",
  path: "/back-bone",
});

// Hand grouping of the 83 /actions/* routes registered in gamesProcessor's index.py. The split is not in the code.
const domains: [string, number, string, string][] = [
  ["Payments", 11, "var(--sky)", "cashfree orders and webhooks, plans, balance, offers"],
  ["Content and AI", 10, "var(--accent)", "chat, blog, songs, photos, shorts, dall-e, prompts"],
  ["Games", 10, "var(--gold)", "quiz and card games, leaderboard, winners, rewards"],
  ["Experts", 9, "var(--brand)", "profiles, applicants, slots, schedules, scores, vacations"],
  ["Users", 8, "var(--link)", "profiles, engagement, referrals, clubs, beta testers"],
  ["Calls and escalation", 7, "var(--danger)", "place calls, call-platform webhooks, escalations"],
  ["Events", 7, "var(--sky)", "workshops, registrations, contributions, interests"],
  ["Admin and analytics", 7, "var(--accent)", "dashboard stats, leads, logs, remarks, histories"],
  ["WhatsApp", 6, "var(--brand)", "send, templates, webhooks, history"],
  ["Push", 5, "var(--gold)", "fcm tokens and templates"],
  ["Auth", 3, "var(--link)", "otp send and verify, admin login"],
];

const lanes: [string, string, string][] = [
  ["schedules", "var(--brand)", "recurring_schedules → schedules → handle_call_job · handle_wa_job"],
  ["event reminders", "var(--sky)", "events_reminders_lister → event_reminder"],
  ["expert status", "var(--accent)", "auto_online_job · experts_status_job"],
  ["emails · db backup", "var(--gold)", "emails_reader · db_backup"],
];

const steps: [string, string, string][] = [
  ["var(--link)", "A senior books a slot", "In the app, or through ARK-I on WhatsApp."],
  ["var(--brand)", "The schedule is stored", "Recurring bookings expand into one-off schedules."],
  ["var(--gold)", "A scheduler tick finds it due", "Nudges both people on WhatsApp and pings Slack."],
  ["var(--danger)", "The call is placed", "Through /actions/call; the call platform reports back over webhooks."],
  ["var(--accent)", "mark8 reads and scores it", "Topics, personas and a conversation score land on the call."],
  ["var(--sky)", "Problems escalate", "Escalations reach the team before anyone has to ask."],
];

const v = (o: Record<string, string>): CSSProperties => o as CSSProperties;

export default function BackBone() {
  return (
    <div className="p-bb">
      <SiteHeader nav={[{ href: "/", label: "all work" }, { href: "/ark-i", label: "ARK-I" }, { href: "/mark8", label: "mark8" }]} />
      <main id="main">
        <section className="wrap hero">
          <div className="hero__copy rise">
            <span className="dp-label c-sky">back_bone · the sukoon platform backend</span>
            <h1 className="h-hero">Everything Sukoon did ran through two Lambdas<span className="dotg">.</span></h1>
            <p className="lede">Users, experts, calls, payments, WhatsApp, events, games and content for Sukoon Unlimited, an agetech startup for elderly people: one Flask API serves the app and the admin desk, and a scheduler wakes every five minutes to book calls, send reminders and keep experts online.</p>
            <div className="row" style={{ alignItems: "center", gap: "12px 24px" }}>
              <a className="dp-btn dp-btn--primary" href="#map">See the map</a>
              <a className="tlink" href={repos.backbone}>View the code ↗</a>
            </div>
          </div>
          <div className="stats rise rise--d">
            <Stat n="83" label="api endpoints" color="var(--sky)" />
            <Stat n="2" label="lambda functions" color="var(--brand)" />
            <Stat n="5 min" label="scheduler heartbeat" color="var(--gold)" />
            <Stat n="10k" label="active users served" color="var(--accent)" />
          </div>
        </section>

        <Stage id="map" mode="pin" length={1.8} className="sec sec--pin" label="The API by domain">
          <SecHead eyebrow="01 — the api, by domain" title="83 endpoints, one square each">
            <p className="prose">gamesProcessor is a Flask-RESTful app behind API Gateway, adapted to Lambda with aws-wsgi. Each square below is one <span className="code-inline">/actions/…</span> route, grouped into domains by hand.</p>
          </SecHead>
          <div data-float="c" className="panel" role="img" aria-label="As you scroll, requests reach API Gateway and the gamesProcessor Lambda, then its 83 endpoints light up domain by domain" style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div className="flow map-flow">
              <div className="stack-col" data-step={0}><span className="dp-pill">sukoon app</span><span className="dp-pill">admin desk</span><span className="dp-pill">whatsapp · calls · cashfree</span></div>
              <Wire color="var(--sky)" />
              <div className="node-col"><div className="node lit lit--sky" data-step={0} data-fx="state">api gateway</div><span className="dp-label">https</span></div>
              <Wire color="var(--sky)" delay={0.8} />
              <div className="node-col"><div className="node lit lit--sky node--strong" data-step={1} data-fx="state" style={{ fontSize: 14 }}>gamesProcessor</div><span className="dp-label">flask on lambda</span></div>
              <Wire delay={1.6} />
              <div className="stack-col" data-step={1}><span className="dp-pill">mongodb</span><span className="dp-pill">s3</span><span className="dp-pill">slack · fcm · openai</span></div>
            </div>
            <div className="tiles">
              {domains.map(([name, n, c, note], i) => (
                <div key={name} className="tile" data-step={2 + i} data-fx="state" style={v({ "--c": c })}>
                  <div className="tile-head"><b>{name}</b><span className="dp-label">{n}</span></div>
                  <div className="dots" aria-hidden="true">{Array.from({ length: n }, (_, k) => <i key={k} />)}</div>
                  <span className="tile-note">{note}</span>
                </div>
              ))}
            </div>
            <span className="dp-label" data-step={12}>{domains.reduce((s, x) => s + x[1], 0)} routes · domain split is a hand grouping</span>
          </div>
        </Stage>

        <Stage mode="pin" length={1.2} className="sec sec--pin" label="The scheduler">
          <SecHead eyebrow="02 — the scheduler" title="Every five minutes, the jobs run side by side">
            <p className="prose">A <span className="code-inline">rate(5 minutes)</span> rule fires the scheduler Lambda. A thread pool runs its jobs in parallel, and due calls and messages go back through the API&rsquo;s own <span className="code-inline">/actions/call</span> and <span className="code-inline">/actions/send_whatsapp</span>, so there is one path for everything.</p>
          </SecHead>
          <div data-float="c" className="panel" role="img" aria-label="As you scroll, the scheduler fires and its job groups fill side by side: schedules, event reminders, expert status, and email reading with database backup" style={{ display: "flex", flexWrap: "wrap", gap: 32, alignItems: "center" }}>
            <div className="node-col" style={{ gap: 12, margin: "0 auto" }}>
              <div className="clock"><div className="hand-wrap"><div className="hand" /></div><div className="hub" /></div>
              <span className="dp-pill dp-pill--gold">rate(5 minutes)</span>
            </div>
            <div className="lanes">
              {lanes.map(([name, c, mods], i) => (
                <div key={name} className="lane">
                  <div className="lane__head"><b style={{ color: c }}>{name}</b><span className="dp-label" style={{ textTransform: "none", letterSpacing: "0.02em" }}>{mods}</span></div>
                  <div className="lane__track"><div className="lane__fill" data-step={i} data-fx="fill" style={{ background: c }} /></div>
                </div>
              ))}
              <span className="dp-label" data-step={4}>lane names are labels; each lane lists its real job modules</span>
            </div>
          </div>
        </Stage>

        <Stage mode="pin" length={1.6} className="sec sec--pin" label="One call across the platform">
          <SecHead eyebrow="03 — one call, across the platform" title="Booked here, placed here, scored by mark8" />
          <div className="life">
            <ol data-float="l" className="dp-graph panel">
              {steps.map(([c, h, p], i) => (
                <li key={h} data-step={i} data-fx="state" style={v({ "--node": c })}><h3>{h}</h3><p>{p}</p></li>
              ))}
            </ol>
            <div data-float="c" className="panel" style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <span className="dp-label">the sukoon platform</span>
              <div className="platform">
                <Link className="dp-card" href="/ark-i" style={{ padding: "14px 18px", gap: 4 }} data-step={0}><span className="mono c-accent" style={{ fontWeight: 600, fontSize: 14 }}>ARK-I</span><span className="small">talks to seniors on WhatsApp</span></Link>
                <div className="stem" />
                <div className="node lit lit--sky node--strong" data-step={1} data-fx="state" style={{ padding: 18, borderRadius: 14, whiteSpace: "normal", display: "flex", flexDirection: "column", gap: 4 }}><span style={{ fontSize: 15, fontWeight: 600 }}>back_bone</span><span className="small" style={{ fontFamily: "var(--font-sans)" }}>the data and every action</span></div>
                <div className="stem" />
                <Link className="dp-card" href="/mark8" style={{ padding: "14px 18px", gap: 4 }} data-step={4}><span className="mono c-gold" style={{ fontWeight: 600, fontSize: 14 }}>mark8</span><span className="small">reads and scores every call</span></Link>
              </div>
            </div>
          </div>
          <div className="tags" data-step={5}><span className="dp-pill">python · flask-restful</span><span className="dp-pill">aws lambda · amplify · api gateway</span><span className="dp-pill">aws-wsgi</span><span className="dp-pill">mongodb</span><span className="dp-pill">s3</span><span className="dp-pill">cashfree</span><span className="dp-pill">firebase fcm</span><span className="dp-pill">openai</span><span className="dp-pill">whatsapp</span><span className="dp-pill">slack</span></div>
        </Stage>
      </main>
      <PageFooter prev={{ href: "/mark8", label: "Previous: mark8" }} next={{ href: "/", label: "Back to all work" }} />
    </div>
  );
}
