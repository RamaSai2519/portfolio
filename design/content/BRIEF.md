# Content brief: rama sathya sai portfolio

Written for: the agent or developer who builds the site from `design/canvas/`, and Rama, who has to answer the open questions in §6.

Status: content gathered and checked against code on 2026-10-20. Nothing is built yet. Figures marked **verified** were read in source or docs. Figures marked **user** come from Rama and are not in code. Anything else is marked as open.

---

## 1. Sitemap

| Route | Source canvas | Notes |
| --- | --- | --- |
| `/` | `Main.dc.html` | Hero, all-work index (10 projects), live sites (5), systems (6), contact |
| `/emporos` | `Emporos.dc.html` | Flagship case study. Demo dashboard embedded (blocked until the demo exists, see §4) |
| `/ark-i` | `ARK-I.dc.html` | Deep dive |
| `/mark8` | `Mark8.dc.html` | Deep dive |
| `/back-bone` | `BackBone.dc.html` | Deep dive |
| `/emporos/demo` (or a separate Vercel project) | new | Public demo dashboard. Needs a change in the private `emporos` repo. Not started |

Optional (handoff task 8): deep dives for `resume_builder` and Journeymen. Not in the canvas.

Design source: tokens in `design/canvas/ds/commit/tokens.json`, classes in `design/canvas/ds/commit/components/bundle.css`. Each canvas page carries its own inline `<style>` with the keyframes. Copy them over; do not reinvent them.

---

## 2. Projects: verified facts

### 2.1 Emporos (flagship, private repo `RamaSai2519/emporos`)

- **What it is.** Python 3.12 asyncio trading platform. It trades Nifty weekly options through Angel One SmartAPI. Source: `plan.md`.
- **Quotes.** Nifty spot, India VIX and NIFTY/BANKNIFTY option chains recorded once a minute while the market is open, written as Parquet to S3. Source: `plan.md`.
- **Paper books.** 24 Track O paper books (variant × capital × sizing), no orders. Source: `plan.md`, "What runs". **Verified.**
- **Live book.** One book trades real money: `O-N5-B5-Dnone-F2000-XT80@50000/expiring/s90`, live since 2026-10-12. Source: `docs/research/profit/operator-breakout/plan.md` §0, `docs/live-trading.md`.
- **Live gate: five conditions.** `LIVE_TRADING_ENABLED=true` in SSM; a committed override file naming the book and its limits; the operator's typed acknowledgement of the behaviour hash; kill switch clear; the dry/real switch set to real on the dashboard. Source: `docs/live-trading.md`. **Verified.** This matches the canvas's five locks.
- **Reconcile.** Broker orders, fills and positions compared with Emporos's own every 30 s. A difference stops new entries. Source: `docs/live-trading.md`. **Verified.**
- **Kill switch.** Polled every 5 s (`DEFAULT_POLL_SECONDS = 5.0`), with a Mongo flag and a file sentinel. Source: `src/emporos/risk/kill_switch.py`. **Verified.**
- **Option picker.** Nearest expiry, the contract with highest open interest within ATM ± 2 strikes. Source: `src/emporos/breakout/picker.py`. **Verified.**
- **Depth row age.** A depth row older than 90 s is refused (`MAX_ROW_AGE`). Used only by depth-gated variants. Source: `src/emporos/breakout/depth.py`. **Verified.**
- **Risk table.** `plan.md` lists **16** rules, from `TradingModeGuard` to `OrderRateGuard`. Source: `plan.md`, "Risk engine". The live Track O rule set in code (`TrackOLiveRuleSet`, `src/emporos/risk/standard.py`) has **14** rule entries. See §5.
- **Layers.** `core` < `domain` < `persistence`/`broker` < `execution`/`risk`/`quotes`/`breakout`/`livetrade` < `api`/`cli`, enforced by import-linter. Source: `plan.md`. **Verified.**
- **Hosting.** EC2 with systemd (trader and recorder, the only holder of broker credentials); Lambda + API Gateway (control API); Vercel (Next.js dashboard, reads the API only); S3 Parquet; MongoDB Atlas. Source: `plan.md`, `docs/live-trading.md`. **Verified.**
- **Dashboard.** Next.js 16, React 19, Tailwind 4, lightweight-charts, TanStack Query. Source: `dashboard/package.json`. **Verified.**

**Breakout rule: the two versions differ.** This is the biggest content problem. See §5.1.

### 2.2 Journeymen (flagship site, `www.journeymen.in`)

- **Meta description (live site, verified):** "GitHub-verified developer certification."
- **What it is.** A developer submits a project and the server verifies commit history against GitHub's API, runs AI consistency checks, and grades it. Anything odd goes to a human review queue. Source: `journeymen/README.md`.
- **Team.** "Rama + freelance partner (2-person team)". Source: `journeymen/plan.md` header. Do not name the partner unless Rama says so.
- **Stack.** Next.js (`apps/web`), Python CLI (`apps/cli`), Flask on Lambda (`services/api`, about 34 `/actions/*` endpoints), SQS grading worker, Terraform. Source: `journeymen/README.md`.
- **Scope.** Phase 1 only (certification). Phases 2 and 3 are out of scope per `plan.md`. Do not claim a directory or payments.

### 2.3 ARK-I (public repo `RamaSai2519/ARK-I`)

- **Architecture.** A stateful main model (MainGPT) keeps the whole conversation in MongoDB. It calls six stateless sub-models through function calling: ExpertsGPT, SchedulesGPT, SukoonGPT, EventsGPT, PartnersGPT, UserGPT. Source: `Readme.md`, `models/`. **Verified.**
- **Model.** `gpt-4o-2024-11-20`, in `index.py:76` and `chat/__init__.py:53,56`. **Canvas says "gpt-4 tools". Change it to gpt-4o.**
- **Serving.** Flask, `/ark` endpoint, Gunicorn on port 5000, WhatsApp webhook, Slack alerts (`models/main/slack.py`), rate limiting. Source: `Readme.md`, code. **Verified.**
- **Sukoon figures (user).** About 10k active users, 4k paying members, about 100 people chatting with ARK-I on WhatsApp every day.
- **Example thread.** The canvas example is **illustrative**. Keep it marked, or replace it with a real anonymised exchange if Rama provides one.

### 2.4 mark8 (public repo `RamaSai2519/mark8`)

- **Scoring rubric (verified, `mark/helper/prompts.py`).** Seven parameters, total 100:

  | Parameter | Points |
  | --- | --- |
  | Opening greeting | 10 |
  | Time split between expert and user | 15 |
  | User sentiment | 20 |
  | Flow of conversation | 15 |
  | Time spent on call | 10 |
  | Probability of the user calling back | 20 |
  | Closing greeting | 10 |

  **The canvas placeholder bars ("guideline adherence / empathy / topic coverage", marked "sample") do not match the code. Replace them with these seven.**
- **Topics (verified, `mark/texts/topics.txt`).** 12 families: Mental Health, Physical Health, Personal Wellbeing, Family, Work/Retirement, Community, Legal, Life as usual, General News, Forward Looking, Financial Planning, Interests. **The canvas says "5 topic families". Use 12.** The topic-bar percentages on the home page were invented. Remove them or mark them as sample.
- **Call validation (verified, `mark/model/__init__.py` `validate_call`).** A call is scored only if its status is `successful`, it has a recording, and its duration is at least 2 minutes. **The canvas says "has transcript · long enough". Use "successful · recorded · 2 min or more".**
- **Personas.** One user persona and one expert persona per call, from the transcript (`get_persona_prompt`). Verified.
- **Routes (verified, `app.py`).** Flask: `POST /flask/process` (`callId`, `canWait`), `/bulk_users`, `/bulk_schedule`, `/queue_wa_msgs`, `/send_fcm_msgs`, `/excel_upload`, `/gather_data`, `/chat`. Quart (async): `/invoice`. Starlette mounts both.
- **How it runs.** `index.py` polls for unscored valid calls and posts them to `/flask/process` with `canWait: true`, then sleeps until 22:00 IST. Without `canWait`, `/flask/process` starts a thread per call, which is the realtime path. **Rama says it ran in real time all day and handled 100–500 calls a day (user). Show that. Do not say "batch".**
- **Redeploy.** The readme commands are `git pull` and `git submodule update` in mark8 and ARK-I, then `pm2 restart mark markb ARK`. The canvas code block matches.

### 2.5 back_bone (public repo `RamaSai2519/back_bone`, default branch `main`)

- **83 endpoints (verified).** 83 `add_resource` registrations in `backend_amp/amplify/backend/function/gamesProcessor/src/index.py`, all under `/actions/*`. **The handoff gives the path as `gamesProcessor/src/index.py`. The real path has the `backend_amp/amplify/backend/function/` prefix.**
- **Domain split (hand grouping, from the handoff).** Payments 11, Content/AI 10, Games 10, Experts 9, Users 8, Calls 7, Events 7, Admin 7, WhatsApp 6, Push 5, Auth 3. The sum is 83. This split is not derivable from code. Confirm it or keep it labelled as a hand grouping.
- **Two Lambdas (verified).** `gamesProcessor` (Flask via aws-wsgi, behind API Gateway) and `scheduler`.
- **Scheduler (verified).** `rate(5 minutes)`, in the Amplify CloudFormation templates. It runs jobs through a `ThreadPoolExecutor`. The job modules are `schedules`, `recurring_schedules`, `events_reminders_lister`, `event_reminder`, `experts_status_job`, `auto_online_job`, `emails_reader`, `db_backup`, plus `handle_call_job` and `handle_wa_job`. Canvas lane names (`schedules_jobs`, `events_reminders_jobs`, `experts_jobs`, `misc_jobs`) are labels, not code names. Keep them as labels, or use the real module names.
- **Call flow (verified in code).** Due calls and WhatsApp nudges go back through `/actions/call` and `/actions/send_whatsapp`, as the handoff says.
- **Integrations (verified).** Cashfree (`services/src/cashfree.py`), FCM, WhatsApp, Slack, OpenAI, MongoDB, S3. **"byteplus" on the canvas is not verified. Check it or drop it.**
- **Sukoon figures (user).** 10k active users served.

### 2.6 resume_builder (public repo `RamaSai2519/resume_builder`)

- YAML or JSON content, validated by Pydantic, rendered to HTML and PDF through headless Chromium via Playwright. Verified in `README.md`.
- Themes: `modern`, `google`, `minimalist` (three). Verified.
- Fits one page with a binary search over a type and spacing scale. Verified.
- ATS report: forbidden elements, action verbs, bullet strength, readability, repeated words. Verified.
- Keyword gap check reports gaps and never invents experience. Optional AI analysis uses the user's own OpenAI key. Verified.

### 2.7 smr_app (private repo `roopaksai/smr_app`)

- The handoff said it was unreachable. **It is reachable from this account** (`gh repo clone` worked).
- **Name.** App name "SMR Agro" (`app.json`). Package `smr_app` v2.6.07. Readme title: "SMR Agrob — Mobile Field Agent App".
- **What it does (verified, `App_README.md`).** An internal mobile app for field agents. It covers farmer contacts (CRUD with GPS address fill), orders, call logs, shop open/closed by GPS geofence, expenses, leave, route map, dealers. It is an agri business's internal tool.
- **Stack.** React Native with Expo (`newArchEnabled`), file-based routing (`app/`), Android package `com.smr.app`.
- **Content risk.** It is an internal app for another organisation. **Ask Rama whether this can be shown publicly and what his part was.** Do not describe his role until he confirms.
- Canvas placeholder: "[Headline: the problem smr_app solves]". Draft only after Rama answers §6.

### 2.8 Ledger (live `ledger.journeymen.in`)

- **Meta description (live site, verified):** "One shared ledger for a couple or roommates. Bank SMS turns into categorized transactions automatically, budgets track what's left, and every entry shows who logged it."
- **Stack (verified, `ledger/README.md`).** Lambda `ledger-api` with HTTP API Gateway in `ap-south-1`, MongoDB Atlas. Mobile FCM. A loans domain. An SMS parser.
- Canvas title "Ledger". Live title: "Ledger — Private household expense tracker for two".

### 2.9 Mohan Visweswar (live `www.mohanvisweswar.in`)

- **Site title and meta (live, verified):** "Chandika Mohan Visweswar — Insurance & Financial Consultant". "Insurance, loans and investment services for families and businesses — advised personally, end to end."
- **Services (verified in `src/app/page.tsx`).** Motor insurance (private car, two-wheeler, goods carrying, passenger carrying), health, travel, marine, business, cattle, home, and financial services.
- **Stack (verified).** Next.js with Playfair Display and Jost fonts, GA4 and Clarity tracking, enquiry form. The local `README.md` is still create-next-app boilerplate.
- **Client site (user needed).** Confirm Rama built it for this client and that the client's name and services may be shown.

### 2.10 GITAM Epoch (live `gitamepoch.vercel.app`, repo `gcc-gitam-blr/github_community_blr_web`)

- **Live meta (verified):** "Gitam's Github Community's EPOCH". Title "Gitam Github EPOCH".
- **What it is (verified, repo README).** The website for the GitHub Community Club at GITAM University Bengaluru, plus Epoch, its annual fest. Features include registration, Epoch Coins, QR scanning, a shop, and a live leaderboard. Built by students in the open.
- **Demo mode.** Runs without keys. Real data needs Supabase and Gmail.
- **Rama's role.** Not stated. The canvas says "[the event and your role]". **Ask.**

### 2.11 Contact and identity

- Name: Rama Sathya Sai. Logo: lowercase wordmark `rama sathya sai.` with a green full stop. No logo file exists.
- GitHub: `github.com/RamaSai2519`.
- Email: `founder@journeymen.in` (user-provided).
- LinkedIn: `https://www.linkedin.com/in/rama-sathya-sai-82140a293` (user-provided).

---

## 3. Sukoon figures (user-confirmed, not in code)

- Company: **Sukoon Unlimited**, an agetech startup for elderly people to seek guidance, companionship and a community (user).

- About 10k active users; 4k paying members.
- About 100 people chatting with ARK-I on WhatsApp every day.
- mark8 ran in real time all day and handled 100–500 calls a day.
- Sukoon is the senior wellness service where ARK-I and mark8 ran.

**Do not** show the 500 figure as a headline stat. The home page uses "500 calls scored / day". Use the range "100–500 a day" instead.

---

## 4. Blocked items

- **Emporos public demo.** Not built. It needs a demo mode in the private `emporos` repo: fixtures, no API calls, no credentials, every control inert and labelled demo, and no route to the production API. That is a PR in a private repo that needs its own Jira key `EM` and branch. Not started, because this pass was content-only.
- **Emporos live preview.** `emporos.journeymen.in` is a passcode gate ("Private workspace", verified). Its screenshot shows only the login screen. The live-dashboard preview therefore depends on the demo.
- **smr_app visuals.** No simulator or device build here, so no screenshots. Use the canvas diagram or draw one.

---

## 5. Discrepancies between the canvas and the code

### 5.1 Emporos breakout rule (most important)

The canvas and handoff describe the **declared paper rule** (`O-main`, plan §2). The **live book** is different.

| Item | Canvas / handoff (O-main, paper) | Live book (`O-N5-B5-…XT80`, real money) |
| --- | --- | --- |
| Move | ≥ 3 closes (N=3), ≥ 0.10% of spot | 5 candles |
| Build-up | 5 candles, width ≤ 60% of move | 5 candles, **no width limit** |
| Depth gate | buy share ≥ 0.90 | **none** |
| Entry | at the breakout candle's close | when Nifty's live price reaches the breakout candle's **peak** |
| Last entry | before 12:00 | **15:12** |
| Trades per day | one | one position at a time, watches again after each exit |
| Sizing | 40–60% of capital (canvas: half) | whole lots within 90% of available cash |
| Floor | P* = entry + (Rs 2,000 + costs)/qty, a touch exits in that candle | Rs 2,000 floor, then a trailing stop keeping 80% of peak gain |
| Hard stop | Rs 10,000 | Rs 10,000 gross |
| Time exit | 15:15 | 15:15 |
| Day limit | — | ends entries at net +Rs 8,000 or −Rs 5,000 |

Source: plan §0 (live), plan §2 (declared), `docs/live-trading.md`.

**Recommendation:** show the live book, since it is what actually trades, and mention the declared rule as the research baseline. Confirm with Rama (§6, Q1).

### 5.2 Risk rule count

Canvas: "16 risk rules per order". `plan.md` lists 16 rows. The live Track O rule set in code has 14. The 16-row table is correct as a description of the standard engine. **Confirm the wording** (§6, Q2).

### 5.3 Other canvas corrections

- ARK-I model: gpt-4o, not gpt-4.
- mark8 scoring: use the seven real parameters, not the three placeholders.
- mark8 topics: 12 families, not 5.
- mark8 validation: successful, recorded, 2 min or more.
- Home stat: "500 calls scored / day" should read "100–500 a day".
- Home bullet "Four engines that orchestrate LLMs, score conversations and typeset resumes": check the wording with Rama. Emporos is a trading engine, not an LLM orchestrator.

---

## 6. Questions for Rama

1. **Emporos case study.** Show the live book (`O-N5-B5`, no depth gate, entries to 15:12, trailing stop) as the main story, and the paper research rule as a secondary panel? Or keep the canvas's O-main story?
2. **Risk count.** Say "16 risk rules" (plan table) or "14 live rules" (code), or use a non-numeric phrase?
3. **Email and LinkedIn.** What should the contact block show?
4. **Your role on each site.** Journeymen (founder, with a freelance partner), Ledger, Mohan Visweswar (built for the client?), GITAM Epoch (contributor, maintainer, or lead?), smr_app (what did you build, and can it be shown publicly, since it is an SMR Agrob internal tool?).
5. **One-liners.** Journeymen: "GitHub-verified developer certification." is the live meta. Keep, or write something longer? Ledger: keep the live meta?
6. **smr_app.** Show it at all? If yes, what is the problem it solves, in your words?
7. **Résumé download.** Offer a PDF? If yes, send the resume YAML or confirm `resume_builder/examples/` is the source.
8. **Demo dashboard.** Approve the plan in handoff task 4 (demo mode in the private `emporos` repo, a PR, and a public URL)? The demo will show recorded or replayed days, so confirm no real account or P&L figures appear beyond what you want public. Broker IPs, SSM names and account data stay out.
9. **Stack.** Next.js on Vercel (matches the Emporos dashboard) or Astro? My recommendation is Next.js, but this is your call.
10. **Deep dives for resume_builder and Journeymen.** Yes or no?
11. **Sukoon.** Is it OK to name Sukoon and show the user and call figures publicly?
12. **Canvas checks.** Confirm the home-page sentence "Four engines that orchestrate LLMs, score conversations and typeset resumes."

---

## 7. Security findings (act before publishing)

These are in the public repos. Do not copy any of them into the site.

- **mark8** tracks `server/models/send_fcm_msgs/user-service-account.json`, a Google service account for project `sukoon-ki-coffee` with a `private_key` field (commit `5faad41`).
- **back_bone** tracks three Firebase service-account files with `private_key` fields:
  - `backend_amp/amplify/backend/function/gamesProcessor/src/models/send_push_notification/expert-service-account.json`
  - `backend_amp/amplify/backend/function/gamesProcessor/src/models/send_push_notification/user-service-account.json`
  - `backend_amp/amplify/backend/function/gamesProcessor/src/models/upsert_expert/sukoonlove-007-firebase.json`

Recommend rotating these keys in Firebase or Google Cloud, then removing the files from the repos and from git history. I have not changed either repo. Say the word if you want me to open that work, since it means rewriting history in public repos.

The `emporos` live docs also name broker static IP addresses. Keep those out of the public site.

---

## 8. Answers received (2026-10-20)

| # | Question | Answer |
| --- | --- | --- |
| Q1 | Emporos story: which breakout rule | Live book (`O-N5-B5`). Mention the paper rule as research |
| Q2 | Risk count | "16 rules" (plan table) |
| Q3 | Contact | GitHub, email and LinkedIn in the footer. Email address and LinkedIn URL still needed |
| Q4 | Mohan Visweswar role | Built it for the client. Show the client's name and services |
| Q4 | GITAM Epoch role | Core contributor |
| Q5 | smr_app on the site | No. Leave it off |
| Q6 | Résumé download | Yes, generated with resume_builder from its example YAML, as a placeholder until your YAML arrives |
| Q7 | Emporos demo | Approved: demo mode in the private `emporos` repo, a PR there, then a public URL |
| Q8 | Stack | Next.js on Vercel |
| Q9 | Deep dives for resume_builder and Journeymen | Neither. Keep the four canvas deep dives |
| Q10 | Sukoon | Named, with user and call figures (10k users, 4k paying, ~100 daily ARK-I chats, 100–500 calls a day) |
| Q11 | Journeymen one-liner | Live meta: "GitHub-verified developer certification." |
| Q12 | ARK-I example thread | Keep, marked illustrative |

- Footer contact: `founder@journeymen.in` and the LinkedIn URL in §2.11 (user-provided).
- Sukoon: full name **Sukoon Unlimited**, described as an agetech startup for elderly people to seek guidance, companionship and a community.

Nothing is outstanding from the questions.
