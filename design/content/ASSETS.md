# Asset inventory

Status as of 2026-10-20. Sources are in `BRIEF.md`.

## Ready

| Asset | Where | Notes |
| --- | --- | --- |
| Commit tokens | `design/canvas/ds/commit/tokens.json` | Colours, type, spacing, radius, shadow |
| Commit component CSS | `design/canvas/ds/commit/components/bundle.css` | `.dp-btn`, `.dp-pill`, `.dp-card`, `.dp-graph`, `.dp-code` |
| Canvas keyframes | inline `<style>` in each `design/canvas/*.dc.html` | Packet flow, blink, fill, candle, lock, guard, ticker |
| Fonts | Google Fonts | Mona Sans (wdth 100–125, wght 200–900) and JetBrains Mono (400, 500). The Commit README says nothing is self-hosted, so keep the Google Fonts links |
| Icons | none shipped | Lucide-style 1.5px outline, 16 or 20 px, per the Commit README |
| Live-site screenshots (full page, 1280 css px) | `design/content/assets/screenshots/` | `journeymen.png`, `ledger.png`, `mohan-visweswar.png`, `gitam-epoch.png`. Captured with Playwright on 2026-10-20 |

## Not usable

| Asset | Reason |
| --- | --- |
| Emporos live-site screenshot | Captured, but it shows the passcode gate ("Private workspace"), not the dashboard, so it was deleted and not committed. Use the demo capture once the demo exists |

## Missing

| Asset | Needed for | Owner |
| --- | --- | --- |
| Emporos demo dashboard | Emporos case study iframe, home-page preview, "Open the demo dashboard" button | Build, in the private `emporos` repo (see BRIEF §4) |
| smr_app screenshots | smr_app card and section | Needs a device or emulator build. Not available here. Use the canvas diagram, or get screenshots from Rama |
| Résumé PDF | Optional download | Rama: send the resume YAML, or confirm `resume_builder/examples/` |
| Contact email and LinkedIn URL | Footer | Rama |
| Wordmark or logo file | Header | Text wordmark only, per the Commit README. Nothing to source |
| OG image and favicon | Social previews and tab icon | Build. Use the wordmark with the green full stop |
| Real anonymised ARK-I exchange | ARK-I example thread (currently marked illustrative) | Rama, optional |
| Mohan Visweswar client permission | Showing the client's name and services | Rama |
