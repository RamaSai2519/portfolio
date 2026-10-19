# Handoff prompt: build Rama Sathya Sai's portfolio

Copy everything below the line into the next agent.

---

You are building the production portfolio site for **Rama Sathya Sai** (GitHub: RamaSai2519) in the repo `RamaSai2519/portfolio`. The design is already done. Turn it into a real site, fill every placeholder from the real projects, and add a public demo of the Emporos dashboard that also serves as its live preview.

## 1. Sources of truth

- **Design canvas (visual spec):** https://claude.ai/artifact/PuHDzKEy8FkhqkSK6mezmf. It has 4 pages.
- **The same files in this repo:** `design/canvas/`
  - `Main.dc.html` is the home page: hero, site gallery, the systems section, contact.
  - `Emporos.dc.html` is the flagship case study, built from the Emporos engine code.
  - `ARK-I.dc.html` and `Mark8.dc.html` are the two deep dives.
  - These are HTML templates for the canvas tool, not app code. Ignore the `<x-dc>`, `<helmet>` and `data-dc-script` wrappers and rebuild the markup and CSS in the real site.
- **Design system "Commit":** `design/canvas/ds/commit/` (`README.md`, `tokens.json`, `components/bundle.css`). The canonical copy is at https://claude.ai/code/artifact/59d324bc-0609-4215-9cb9-22eacc8b9b7b.
  - It is dark-only: ground `#0a0a14`, one action colour (git-green `#3fc84e`), purple, sky and gold accents.
  - Type is Mona Sans 800 at 115% width for headings and JetBrains Mono for labels.
  - Buttons and tags are pills. Hover lifts an element 4px with a hard green offset shadow.
  - Follow its content rules: first person, short, lead with the number, no emoji.

## 2. Content decisions already made by the user

- Use the name **Rama Sathya Sai**. Logo: lower-case `rama sathya sai` plus a green full stop.
- **Flagship sites:** Journeymen (https://www.journeymen.in/) and Emporos (https://emporos.journeymen.in/).
- **Other sites:**
  - https://ledger.journeymen.in/
  - https://www.mohanvisweswar.in/
  - https://gitamepoch.vercel.app/
- **Projects:**
  - **ARK-I** (RamaSai2519/ARK-I)
  - **mark8** (RamaSai2519/mark8)
  - **resume_builder** (RamaSai2519/resume_builder)
  - **smr_app** (roopaksai/smr_app). It was not reachable from my session. It may be private, so ask the user for access or details.
- **Sukoon numbers, confirmed by the user.** Sukoon is the senior wellness service where ARK-I and mark8 ran.
  - About 10k active users and 4k paying members.
  - About 100 people chatted with ARK-I on WhatsApp every day.
  - mark8 ran in **real time all day** and handled 100–500 calls a day. Show it as real time. The `index.py` loop in the repo sleeps until 22:00, but the user says it ran live; scoring was triggered through `POST /flask/process`.
- **Deep-dive pages are wanted.** At least Emporos, ARK-I and mark8, plus any others the code justifies.
- **Style:** visual over text. Previews of the sites, and animated diagrams of how each system works.

## 3. Repos to clone and read

- `RamaSai2519/emporos`: the trading platform. Read these first:
  - `plan.md`
  - `docs/live-trading.md`
  - `docs/research/profit/operator-breakout/plan.md`, the rule in §2
  - `src/emporos/breakout/` (`setup.py`, `picker.py`, `exits.py`, `live.py`, `routing.py`, `regime.py`)
  - `src/emporos/risk/`
  - the Next.js dashboard in `dashboard/`
  - Follow its `CLAUDE.md` and `AGENTS.md`.
- `RamaSai2519/ARK-I`: the LLM orchestration kernel. `Readme.md` has the architecture; the code is in `models/`.
- `RamaSai2519/mark8`: the call scorer plus the operations server. Look at:
  - `mark/model`, `mark/helper/prompts.py` and `mark/texts/*.txt`
  - `app.py` (Flask and Quart mounted under Starlette)
- `RamaSai2519/back_bone`: the Sukoon backend, Flask on AWS Amplify/Lambda (`gamesProcessor` API and `scheduler`). It isn't in the design yet. It is a strong candidate for a fourth Sukoon system, or a "Sukoon platform" page tying ARK-I, mark8 and back_bone together. Propose this to the user.
- `RamaSai2519/resume_builder`: YAML to one-page ATS-safe PDF via headless Chromium, using a binary search on type scale.

## 4. Tasks

1. **Pick the stack and scaffold** the site in this repo. A static Next.js or Astro site deployed on Vercel fits; Emporos's dashboard already uses Next.js on Vercel. Confirm with the user if unsure.
2. **Build the 4 pages** to match the canvas, using the Commit tokens.
   - Keep the CSS-only animations: packets on wires, sequential highlights, the candle chart, the risk-guard wall, the live-gate locks.
   - Respect `prefers-reduced-motion`.
   - Pages must be responsive down to phone width.
3. **Site previews.** Capture real full-page screenshots of each live site. Playwright with Chromium works for this. Use them in place of the wireframe mocks inside the browser frames, keeping the slow auto-scroll inside the frame. Write the one-line descriptions marked `[One line: …]` from what each site actually is.
4. **Emporos public demo dashboard.** This is a change in the `emporos` repo.
   - Add a demo mode to `dashboard/` that renders the operator's desk from static fixture data: overview, live desk, setup watch, history, orders. Fixtures could be a recorded or replayed day, from `rehearse-track-o` output or stored paper results.
   - Demo mode needs **no API calls, no credentials and no command bus**. Every control (kill switch, dry/real switch, acknowledgements) must be inert and labelled demo.
   - The repo's rule is that the dashboard and API hold no broker credentials. Keep it that way, and make sure the demo build cannot reach the production API.
   - Deploy it at a public URL, for example `emporos.journeymen.in/demo` or a separate Vercel project, then:
     - embed it with an iframe in the Emporos case study, in the browser frame marked `[live demo dashboard loads here]`;
     - use it as the Emporos card's preview on the home page;
     - point the "Open the demo dashboard" button at it.
   - Follow the emporos repo's own workflow (Jira `EM`, tests: `pipenv run test` and the dashboard's vitest/playwright). Branch and PR there. Don't push to its default branch.
5. **Emporos engine visualisation.** It is already designed in `Emporos.dc.html`. Verify every figure against the code and update it if it has changed:
   - quotes once a minute
   - 24 paper books and 1 live book
   - 16 risk guards
   - 30 s reconcile and a 5 s kill-switch poll
   - the five-lock live gate
   - the breakout rule (N=3, B=5, width ≤60%, depth ≥0.90, 50% size, P* floor of Rs 2,000 net, 12:00 cutoff, 15:15 exit, Rs 10,000 hard stop)

   Consider making the candle chart replay a real recorded day from the fixtures.
6. **Replace illustrative content** with real data or remove it:
   - mark8 page: the score bars "guideline adherence / empathy / topic coverage" are placeholders labelled "sample". Use the real scoring dimensions from `mark/helper/prompts.py`. The call ticker times are made up.
   - Home page: mark8's topic-bar percentages are made up.
   - ARK-I page: the example WhatsApp thread is marked "illustrative". Keep it marked, or use a real anonymised exchange if the user provides one.
   - Do not invent stats. Anything unknown stays a visible `[placeholder]` and goes on your list of questions for the user.
7. **Remaining placeholders to ask the user about:**
   - what each site is, and the user's role on each
   - smr_app: what it does, its stack and the user's part
   - contact email and LinkedIn URL
   - whether to offer a downloadable résumé (resume_builder could generate it)
   - Journeymen's one-liner
8. **Deep-dive pages for others.** resume_builder, back_bone/Sukoon and Journeymen can follow the same pattern if the user wants them.

## 5. Ground rules

- Visual first. Every project gets a diagram that moves.
- Never claim numbers beyond those above, or ones you read in the code or docs.
- Work on the branch you are given. Don't open PRs unless asked.
