import type { Metadata } from "next";
import Link from "next/link";
import { Colophon, Ph, SiteHeader } from "@/components/chrome";

export const metadata: Metadata = {
  title: "Emporos demo dashboard",
  description: "The public Emporos demo dashboard is not built yet.",
  robots: { index: false },
};

// BLOCKED: the public demo needs a demo mode in the private emporos repo (fixtures only, no API, no credentials,
// every control inert). See design/content/BRIEF.md §4. Until then this route is a labelled placeholder.
export default function EmporosDemo() {
  return (
    <>
      <SiteHeader nav={[{ href: "/", label: "all work" }, { href: "/emporos", label: "emporos" }]} />
      <main id="main" className="wrap hero" style={{ minHeight: "60vh" }}>
        <div className="hero__copy">
          <span className="dp-pill dp-pill--gold" style={{ alignSelf: "flex-start" }}>placeholder · blocked</span>
          <h1 className="h-hero">The demo dashboard is on its way<span className="dotg">.</span></h1>
          <p className="lede">
            The real Emporos dashboard sits behind a passcode. A public demo that replays a recorded day from fixture data, with every control switched off, is being built.
          </p>
          <p className="small"><Ph>emporos public demo: not built yet, needs a demo mode in the private emporos repo</Ph></p>
          <div className="row">
            <Link className="dp-btn dp-btn--primary" href="/emporos#engine">Watch the engine instead</Link>
            <Link className="dp-btn dp-btn--secondary" href="/emporos">Back to the case study</Link>
          </div>
        </div>
      </main>
      <Colophon />
    </>
  );
}
