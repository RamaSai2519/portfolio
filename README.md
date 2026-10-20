# portfolio

Rama Sathya Sai's portfolio. Next.js (App Router, TypeScript), deployed on Vercel.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm run lint     # tsc --noEmit
```

- Design spec: `design/canvas/` (five pages) and the Commit design system in `design/canvas/ds/commit/`.
- Content source of truth: `design/content/BRIEF.md`. Live-site screenshots are imported from `design/content/assets/screenshots/`.
- Tokens live on `:root` in `app/globals.css`. Each page has its own stylesheet with the canvas keyframes, prefixed per page.
- Anything still unconfirmed renders as a visible gold `[placeholder]` (the `Ph` component in `components/chrome.tsx`).
- The home page is a pinned scroll tour (GSAP ScrollTrigger, `components/stage.tsx`). Elements with `data-step="n"` get the class `on` as the scroll reaches step n; phones get simple reveals, reduced motion gets the finished state.
- Live sites are iframes (`components/live-frame.tsx`). Framing and auto-scroll need a change on each site: see `docs/live-embed.md`.
- `/emporos/demo` is a labelled placeholder until the public Emporos demo exists.
- `public/rama-sathya-sai-resume.pdf` is built by `resume_builder` (google theme) from `resume/resume.yaml`; the build command is at the top of that file.
- Open items before launch: `docs/launch-checklist.md`.
