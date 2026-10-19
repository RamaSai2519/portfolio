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
- `/emporos/demo` is a labelled placeholder until the public Emporos demo exists.
- `public/rama-sathya-sai-resume.pdf` is a placeholder built by `resume_builder` from `resume_builder/examples/google_resume.yaml` (google theme, phone number removed, email set to the site contact).
