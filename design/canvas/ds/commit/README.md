# Commit

A dark-only design system for a software developer's portfolio. It is extracted from the GCC Bangalore club site (`app/globals.css`, the Epoch night palette, Mona Sans and JetBrains Mono) and re-pointed from a friendly club to one engineer's work.

There is no light theme. Every token has one value, and `<html data-theme="dark">` is the only mode.

## What carried over, what changed

| From the club site | In Commit |
| --- | --- |
| White paper, `ink` text | Dropped. Ground is `bg` (#0a0a14), the club's Epoch night ink |
| Git-green `#3fc84e` | Kept as `brand`, now the single action colour |
| Lilac and pale-blue graph nodes | `purple` and `sky`, the other two branches |
| Mona Sans 800 at 115% width, JetBrains Mono | Kept unchanged |
| Pill buttons, neo-brutal hover lift | Kept. The lift shadow is green (`shadow-lift`) so it shows on dark |
| Git graph as signature | Kept as the CommitGraph, used for experience and project history |
| Stickers, coin, gold fest theme, haze/paper grain, club logo | Dropped. `gold` survives only as a rare highlight |

## Content fundamentals

- Write in the first person, short and concrete. "I build…", not "We are a team of…".
- Lead with the thing, then the number. "Cut p95 latency from 900 ms to 140 ms" beats "Performance improvements".
- Eyebrows, tags, dates and file names are mono labels (`label` style, uppercase). Prose is Mona Sans.
- Headlines are sentence case. No emoji, no exclamation marks.
- Use git language sparingly and literally: `main`, `merged`, `v2.1`, commit-style dates (`2025-03`).

## Visual foundations

- **Ground.** Pages sit on `bg`. Cards are `surface` with a `line` hairline; hover moves them to `raised`. Menus and dialogs use `overlay`. Never go lighter than `overlay`.
- **Colour.** `text` for headings, `text-muted` for paragraphs, `text-subtle` for metadata. `brand` marks the one thing to click. `purple`, `sky` and `gold` are tags and graph branches, never primary actions. Tints (`brand-soft`, `purple-soft`, `sky-soft`) sit behind their matching text colour.
- **Type.** Headings: Mona Sans 800, `letter-spacing: -0.03em`, `font-stretch: 115%` for h1 and h2, 105% for h3. Body: Mona Sans 400. Code and labels: JetBrains Mono. Both are Google Fonts; nothing is self-hosted.
- **Shape.** Pills (`radius-pill`) for buttons and tags, `radius-lg` (14px) for cards and code windows, `radius-md` for inputs.
- **Depth.** No blurred card shadows. Interactive things lift 4px up-left and gain `shadow-lift`; pressing drops them to `shadow-press`. `shadow-menu` is the single soft shadow, for floating menus only.
- **Borders.** Decorative edges use `line`. Anything that must be seen as a control (input, secondary button) uses `line-strong`, which meets 3:1.
- **Motion.** 200 ms on `cubic-bezier(0.23, 1, 0.32, 1)` for lifts, 800 ms rise on hero entrance. Honour `prefers-reduced-motion` by removing transforms.
- **Layout.** 4px spacing scale. Sections are separated by `space-9` on desktop, `space-7` on mobile. Content max width 1120px, side gutter `space-5`.
- **Focus.** 3px `link` outline with 3px offset on every focusable element.

## Iconography

Not shipped as files. Use a 1.5px-stroke outline set (Lucide or similar) at 16 or 20px, coloured `text-muted`, `brand` when active. The only illustrative device is the git graph: a 2px `line-strong` rail with 16px ring nodes in `brand`, `purple` or `sky`.

## Components

Button, Pill, ProjectCard, CommitGraph and CodeWindow are plain CSS classes (`.dp-btn`, `.dp-pill`, `.dp-card`, `.dp-graph`, `.dp-code`) in `components/bundle.css`, with static previews. There is no React bundle: copy the markup from each preview.

## Not carried over

Club-specific pages (Epoch, certificates, admin), the two-theme toggle, and the club marks. There is no logo; use your name set in `display-lg` with an optional `brand` full stop.
