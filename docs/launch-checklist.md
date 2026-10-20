# Launch checklist

Open items before the portfolio goes to production. Tick them off here as they close.

## Must fix before going live

- [x] **Emporos demo.** Live at `https://emporos.journeymen.in/demo`, framed on `/emporos` and
      `/emporos/demo`. The demo route is the only frameable path on that domain, and only by
      `https://rama.journeymen.in`; previews and localhost show screenshots instead.
- [x] **ARK-I example thread.** The assistant's reply bubble on `/ark-i` (`app/ark-i/page.tsx`) is still
      `[reply naming an available expert and open slots]`. Use a real anonymised reply or a generic one;
      the thread is already labelled "illustrative".
- [x] **Allow the live frames.** Deployed on Journeymen, Mohan, Ledger and GITAM Epoch (`deva`): each sends
      `frame-ancestors 'self' https://rama.journeymen.in` and has the scroll bridge (`docs/live-embed.md`).
      Ledger's header comes from `apps/web/vercel.json`.

## Deploy

- [x] **Vercel project and domain.** Deployed from master at https://rama.journeymen.in/. `lib/site.ts` reads `VERCEL_PROJECT_PRODUCTION_URL`, so the Open Graph image and
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

- [x] `robots.txt` and `sitemap.xml` (`app/robots.ts`, `app/sitemap.ts`).
- [x] SEO: canonical URLs, Open Graph and Twitter tags per page (`pageMetadata` in `lib/seo.ts`), a share image per
      page (`opengraph-image.tsx`, drawn by `lib/og.tsx`), Person and WebSite JSON-LD (`app/layout.tsx`), web manifest
      and apple icon, AVIF/WebP images (`next.config.ts`).
- [ ] Search Console: verify `rama.journeymen.in` and submit `/sitemap.xml`. Check a page with the Rich Results Test
      and a share preview (LinkedIn Post Inspector) after deploy.
- [ ] Analytics: GA4 chosen. Add the measurement ID to the Vercel env when available (wired in `app/layout.tsx`; set `NEXT_PUBLIC_GA_ID` in Vercel, it is a no-op until then).
