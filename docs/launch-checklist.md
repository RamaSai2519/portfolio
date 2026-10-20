# Launch checklist

Open items before the portfolio goes to production. Tick them off here as they close.

## Must fix before going live

- [ ] **Rotate the leaked service-account keys.** The site links to the public `RamaSai2519/mark8` and
      `RamaSai2519/back_bone` repos, which track Google/Firebase service-account files with `private_key`
      fields (see `design/content/BRIEF.md` §7 for the exact paths). Revoke the keys in Firebase / Google
      Cloud first, then remove the files from both repos and from git history.
- [ ] **Emporos demo placeholders.** Still showing gold `[placeholder]` markers:
  - the demo dashboard frame on `/emporos` (`app/emporos/page.tsx`, "the desk" section)
  - the "Demo dashboard (coming)" links on `/` and `/emporos`
  - the `/emporos/demo` page itself (`app/emporos/demo/page.tsx`)

  Either build the public demo (a demo mode in the private `emporos` repo: fixtures only, no API calls,
  no credentials, every control inert) or hide these three for launch and bring them back later.
- [ ] **ARK-I example thread.** The assistant's reply bubble on `/ark-i` (`app/ark-i/page.tsx`) is still
      `[reply naming an available expert and open slots]`. Use a real anonymised reply or a generic one;
      the thread is already labelled "illustrative".
- [ ] **Allow the live frames.** Journeymen, Ledger, Mohan Visweswar and GITAM Epoch render blank in the
      home tour unless each site allows the portfolio's domain in `frame-ancestors` (and sends no
      `X-Frame-Options` block). The optional scroll bridge makes them scroll with the tour. Both are in
      `docs/live-embed.md`; they need the final production domain.

## Deploy

- [ ] **Vercel project and domain.** Import the repo into Vercel, choose the domain and set it as the
      production domain. `lib/site.ts` reads `VERCEL_PROJECT_PRODUCTION_URL`, so the Open Graph image and
      metadata pick it up automatically.

## Should check

- [ ] **External links.** Not verifiable from the build environment (its network blocks the live sites,
      GitHub and LinkedIn). Click through every link once from a normal connection.
- [ ] **Real devices and Safari.** Only desktop Chromium was tested. The star-field canvas, frosted-glass
      panels and pinned scroll scenes are the heaviest parts: check a mid-range Android phone, iOS Safari
      and desktop Safari, and run Lighthouse on the Vercel preview. If anything stutters, lower the
      particle count or the blur on phones (`components/space-field.tsx`, `.dp-card, .panel, …` glass rule
      in `app/globals.css`).

## Optional

- [ ] `robots.txt` and `sitemap.xml` (`app/robots.ts`, `app/sitemap.ts`).
- [ ] Analytics, if wanted.
