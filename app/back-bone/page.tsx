import type { Metadata } from "next";
import Link from "next/link";
import type { CSSProperties } from "react";
import "./bb.css";
import { PageFooter, SecHead, SiteHeader, Stat, Wire } from "@/components/chrome";
import { repos } from "@/lib/site";

export const metadata: Metadata = {
  title: "back_bone",
  description: "back_bone: the Flask-on-Lambda backend behind Sukoon Unlimited. 83 endpoints and a scheduler that runs every five minutes.",
};

// Hand grouping of the 83 /actions/* routes registered in gamesProcessor's index.py. The split is not in the code.
const domains: [string, number, string, string][] = [
  ["Payments", 11, "var(--sky)", "cashfree orders and webhooks, plans, balance, offers"],
  ["Content and AI", 10, "var(--purple)", "chat, blog, songs, photos, shorts, dall-e, prompts"],
  ["Games", 10, "var(--gold)", "quiz and card games, leaderboard, winners, rewards"],
  ["Experts", 9, "var(--brand)", "profiles, applicants, slots, schedules, scores, vacations"],
  ["Users", 8, "var(--link)", "profiles, engagement, referrals, clubs, beta testers"],
  ["Calls and escalation", 7, "var(--danger)", "place calls, call-platform webhooks, escalations"],
  ["Events", 7, "var(--sky)", "workshops, registrations, contributions, interests"],
  ["Admin and analytics", 7, "var(--purple)", "dashboard stats, leads, logs, remarks, histories"],
  ["WhatsApp", 6, "var(--brand)", "send, templates, webhooks, history"],
  ["Push", 5, "var(--gold)", "fcm tokens and templates"],
  ["Auth", 3, "var(--link)", "otp send and verify, admin login"],
];

const lanes: [string, string, string, string][] = [
  ["schedules", "var(--brand)", "3.2s", "recurring_schedules → schedules → handle_call_job · handle_wa_job"],
  ["event reminders", "var(--sky)", "2.6s", "events_reminders_lister → event_reminder"],
  ["expert status", "var(--purple)", "2.2s", "auto_online_job · experts_status_job"],
  ["emails · db backup", "var(--gold)", "4s", "emails_reader · db_backup"],
];

const steps: [string, string, string][] = [
  ["var(--link)", "A senior books a slot", "In the app, or through ARK-I on WhatsApp."],
  ["var(--brand)", "The schedule is stored", "Recurring bookings expand into one-off schedules."],
  ["var(--gold)", "A scheduler tick finds it due", "Nudges both people on WhatsApp and pings Slack."],
  ["var(--danger)", "The call is placed", "Through /actions/call; the call platform reports back over webhooks."],
  ["var(--purple)", "mark8 reads and scores it", "Topics, personas and a conversation score land on the call."],
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
            <div className="row">
              <a className="dp-btn dp-btn--primary" href={repos.backbone}>View the code</a>
              <a className="dp-btn dp-btn--secondary" href="#map">See the map</a>
            </div>
          </div>
          <div className="stats rise rise--d">
            <Stat n="83" label="api endpoints" color="var(--sky)" />
            <Stat n="2" label="lambda functions" color="var(--brand)" />
            <Stat n="5 min" label="scheduler heartbeat" color="var(--gold)" />
            <Stat n="10k" label="active users served" color="var(--purple)" />
          </div>
        </section>

        <section id="map" className="wrap section section--tight">
          <SecHead eyebrow="01 — the api, by domain" title="83 endpoints, one square each">
            <p className="prose">gamesProcessor is a Flask-RESTful app behind API Gateway, adapted to Lambda with aws-wsgi. Each square below is one <span className="code-inline">/actions/…</span> route, grouped into domains by hand.</p>
          </SecHead>
          <div className="panel" role="img" aria-label="Animated map: the app, admin desk and partner webhooks reach API Gateway and the gamesProcessor Lambda, which serves 83 endpoints grouped by hand into eleven domains" style={{ display: "flex", flexDirection: "column", gap: 28 }}>
            <div className="flow map-flow">
              <div className="stack-col"><span className="dp-pill">sukoon app</span><span className="dp-pill">admin desk</span><span className="dp-pill">whatsapp · calls · cashfree</span></div>
              <Wire color="var(--sky)" />
              <div className="node-col"><div className="node" style={{ fontSize: 13, padding: "14px 16px" }}>api gateway</div><span className="dp-label">https</span></div>
              <Wire color="var(--sky)" delay={0.8} />
              <div className="node-col"><div className="node node--sky node--strong b-live" style={{ fontSize: 14, padding: "16px 18px", fontWeight: 600 }}>gamesProcessor</div><span className="dp-label">flask on lambda</span></div>
              <Wire delay={1.6} />
              <div className="stack-col"><span className="dp-pill dp-pill--brand">mongodb</span><span className="dp-pill">s3</span><span className="dp-pill dp-pill--gold">slack · fcm · openai</span></div>
            </div>
            <div className="tiles">
              {domains.map(([name, n, c, note], ti) => (
                <div key={name} className="b-tile" style={v({ "--c": c, animationDelay: `${ti * 0.5}s` })}>
                  <div className="tile-head"><b>{name}</b><span className="dp-label">{n}</span></div>
                  <div className="dots" aria-hidden="true">
                    {Array.from({ length: n }, (_, i) => <i key={i} className="b-dot" style={v({ "--c": c, animationDelay: `${(ti * 0.5 + i * 0.1).toFixed(1)}s` })} />)}
                  </div>
                  <span className="tile-note">{note}</span>
                </div>
              ))}
            </div>
            <span className="dp-label">{domains.reduce((s, x) => s + x[1], 0)} routes · domain split is a hand grouping</span>
          </div>
        </section>

        <section className="wrap section section--tight">
          <SecHead eyebrow="02 — the scheduler" title="Every five minutes, the jobs run side by side">
            <p className="prose">A <span className="code-inline">rate(5 minutes)</span> rule fires the scheduler Lambda. A thread pool runs its jobs in parallel, and due calls and messages go back through the API&rsquo;s own <span className="code-inline">/actions/call</span> and <span className="code-inline">/actions/send_whatsapp</span>, so there is one path for everything.</p>
          </SecHead>
          <div className="panel" role="img" aria-label="Animated scheduler: a clock fires every five minutes and the job groups run in parallel: schedules, event reminders, expert status, and email reading with database backup" style={{ display: "flex", flexWrap: "wrap", gap: 32, alignItems: "center" }}>
            <div className="node-col" style={{ gap: 12, margin: "0 auto" }}>
              <div className="clock"><div className="b-tick"><div className="hand" /></div><div className="hub" /></div>
              <span className="dp-pill dp-pill--gold">rate(5 minutes)</span>
            </div>
            <div className="lanes">
              {lanes.map(([name, c, dur, mods]) => (
                <div key={name} className="lane">
                  <div className="lane__head"><b style={{ color: c }}>{name}</b><span className="dp-label" style={{ textTransform: "none", letterSpacing: "0.02em" }}>{mods}</span></div>
                  <div className="lane__track"><div className="b-lanefill" style={v({ "--d": dur, background: c })} /></div>
                </div>
              ))}
              <span className="dp-label">lane names are labels; each lane lists its real job modules</span>
            </div>
          </div>
        </section>

        <section className="wrap section section--tight">
          <SecHead eyebrow="03 — one call, across the platform" title="Booked here, placed here, scored by mark8" />
          <div className="split">
            <ol className="dp-graph panel" style={{ flex: "1 1 420px" }}>
              {steps.map(([c, h, p], i) => (
                <li key={h} className="b-step" style={v({ "--node": c, animationDelay: `${i * 1.5}s` })}><h3>{h}</h3><p>{p}</p></li>
              ))}
            </ol>
            <div className="panel" style={{ flex: "1 1 340px", display: "flex", flexDirection: "column", gap: 20 }}>
              <span className="dp-label">the sukoon platform</span>
              <div className="platform">
                <Link className="dp-card" href="/ark-i" style={{ padding: "14px 18px", gap: 4, borderColor: "var(--purple)" }}><span className="mono c-purple" style={{ fontWeight: 600, fontSize: 14 }}>ARK-I</span><span className="small">talks to seniors on WhatsApp</span></Link>
                <div className="stem" />
                <div className="node node--sky node--strong" style={{ padding: 18, borderRadius: 14, whiteSpace: "normal", display: "flex", flexDirection: "column", gap: 4 }}><span style={{ fontSize: 15, fontWeight: 600 }}>back_bone</span><span className="small" style={{ fontFamily: "var(--font-sans)" }}>the data and every action</span></div>
                <div className="stem" />
                <Link className="dp-card" href="/mark8" style={{ padding: "14px 18px", gap: 4, borderColor: "var(--gold)" }}><span className="mono c-gold" style={{ fontWeight: 600, fontSize: 14 }}>mark8</span><span className="small">reads and scores every call</span></Link>
              </div>
            </div>
          </div>
          <div className="tags"><span className="dp-pill dp-pill--sky">python · flask-restful</span><span className="dp-pill">aws lambda · amplify · api gateway</span><span className="dp-pill">aws-wsgi</span><span className="dp-pill dp-pill--brand">mongodb</span><span className="dp-pill">s3</span><span className="dp-pill dp-pill--gold">cashfree</span><span className="dp-pill">firebase fcm</span><span className="dp-pill dp-pill--purple">openai</span><span className="dp-pill">whatsapp</span><span className="dp-pill">slack</span></div>
        </section>
      </main>
      <PageFooter prev={{ href: "/mark8", label: "Previous: mark8" }} next={{ href: "/", label: "Back to all work" }} />
    </div>
  );
}
