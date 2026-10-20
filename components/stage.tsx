"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Stage setup measures layout and inserts pin spacers, so doing every stage inside hydration made one long,
 * reflow-heavy task. Setups instead run one per task, in document order (pins must be created top to bottom),
 * which keeps the page responsive while they finish.
 */
type Job = { run: () => void; cancelled: boolean };
const queue: Job[] = [];
let flushing = false;
const flush = () => {
  const job = queue.shift();
  if (job && !job.cancelled) job.run();
  if (queue.length) setTimeout(flush, 0);
  else flushing = false;
};
const schedule = (run: () => void): Job => {
  const job = { run, cancelled: false };
  queue.push(job);
  if (!flushing) { flushing = true; setTimeout(flush, 0); }
  return job;
};

export type StageAction = { href: string; label: string; external?: boolean };

export type StageActiveDetail = { id: string; name?: string; num?: string; action?: StageAction; active: boolean };

type Props = {
  id?: string;
  className?: string;
  children: ReactNode;
  /** "pin": the section holds still while scrolling drives its steps. "scrub": steps follow the section as it passes. */
  mode?: "pin" | "scrub";
  /** Scroll distance of a pinned stage, in viewport heights. */
  length?: number;
  /** Journey metadata: shown in the progress rail and the sticky action bar while this stage is active. */
  name?: string;
  num?: string;
  action?: StageAction;
  label?: string;
  /** Background formation while this section is on screen (see SpaceField). */
  space?: "globe" | "lattice" | "field";
};

const DESKTOP = "(min-width: 900px) and (min-height: 640px) and (prefers-reduced-motion: no-preference)";
const MOBILE = "(max-width: 899px), (max-height: 639px)";
const REDUCED = "(prefers-reduced-motion: reduce)";
// More scroll per step, so each element has time to glide into frame.
const PACE = 1.35;

/**
 * A scroll-driven section. Every descendant with data-step="n" gets the class "on" once the scroll reaches step n.
 * Desktop: pinned (or scrubbed if the content is taller than the viewport). Phones: steps play once on entry.
 * Reduced motion: everything is shown in its finished state.
 */
export function Stage({ id, className = "", children, mode = "pin", length = 1.6, name, num, action, label, space = "field" }: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let mm: gsap.MatchMedia | undefined;
    const job = schedule(() => {
      const steps = Array.from(el.querySelectorAll<HTMLElement>("[data-step]"));
      const count = steps.reduce((m, s) => Math.max(m, Number(s.dataset.step) + 1), 1);
      const setAll = (on: boolean) => steps.forEach((s) => s.classList.toggle("on", on));
      const apply = (p: number) => {
        // the last step lands at 85% of the scroll so it can be read before the stage moves on
        const reached = Math.floor((p / 0.85) * count);
        for (const s of steps) s.classList.toggle("on", Number(s.dataset.step) <= Math.min(reached, count - 1));
        el.style.setProperty("--p", p.toFixed(3));
        el.dispatchEvent(new CustomEvent("stage-progress", { detail: p }));
      };
      const activate = (active: boolean) => {
        el.classList.toggle("is-active", active);
        if (name) {
          window.dispatchEvent(new CustomEvent<StageActiveDetail>("stage-active", { detail: { id: id ?? "", name, num, action, active } }));
        }
      };

      // A section already on screen at load (the hero) skips its fly-in, so its content paints with the first frame
      // instead of waiting for hydration and a scrubbed fade. That paint is the page's LCP.
      const onScreenAtLoad = el.getBoundingClientRect().top < window.innerHeight * 0.9;

      mm = gsap.matchMedia();
      mm.add(DESKTOP, () => {
        const fits = el.offsetHeight <= window.innerHeight + 2;
        const pin = mode === "pin" && fits;
        const main = ScrollTrigger.create({
          trigger: el,
          start: pin ? "top top" : "top 75%",
          end: pin ? `+=${Math.round(length * PACE * 100)}%` : "bottom 55%",
          pin,
          pinSpacing: true,
          anticipatePin: 1,
          onUpdate: (self) => apply(self.progress),
          onRefresh: (self) => apply(self.progress),
        });
        ScrollTrigger.create({
          trigger: el,
          start: "top 60%",
          end: pin ? `+=${Math.round(length * PACE * 100 + 50)}%` : "bottom 40%",
          onToggle: (self) => activate(self.isActive),
        });
        // floating 3D elements: fly in from deep space as the section arrives, drift past the camera as it leaves
        el.querySelectorAll<HTMLElement>("[data-float]").forEach((f, i) => {
          const side = f.dataset.float === "r" ? -1 : f.dataset.float === "l" ? 1 : 0;
          // Float wrappers carry their own resting tilt (.tilt); bare floats rest at an angle set here
          const bare = !f.querySelector(":scope > .tilt");
          const restX = bare && side === 0 ? 8 : 0;
          const restY = bare ? side * 6 : 0;
          if (!onScreenAtLoad) gsap.fromTo(
            f,
            { opacity: 0, z: -520, y: 90, rotationX: 24, rotationY: side * 26 },
            { opacity: 1, z: 0, y: 0, rotationX: restX, rotationY: restY, transformOrigin: "50% 0%", ease: "none", scrollTrigger: { trigger: el, start: `top ${92 - i * 4}%`, end: pin ? "top 8%" : "top 30%", scrub: 1.2 } },
          );
          gsap.fromTo(
            f,
            { opacity: 1, z: 0, rotationX: restX },
            {
              opacity: 0, z: 260, rotationX: -16, ease: "none", immediateRender: false,
              scrollTrigger: pin
                ? { start: () => main.end - window.innerHeight * 0.05, end: () => main.end + window.innerHeight * 0.7, scrub: 1.2 }
                : { trigger: el, start: "bottom 35%", end: "bottom top", scrub: 1.2 },
            },
          );
        });
        return () => setAll(false);
      });
      mm.add(MOBILE, () => {
        steps.forEach((s, i) => (s.style.transitionDelay = `${Math.min(Number(s.dataset.step), 12) * 90 + (i % 2) * 10}ms`));
        ScrollTrigger.create({ trigger: el, start: "top 75%", once: true, onEnter: () => { setAll(true); el.style.setProperty("--p", "1"); } });
        if (!onScreenAtLoad) el.querySelectorAll<HTMLElement>("[data-float]").forEach((f) =>
          gsap.from(f, { opacity: 0, y: 60, rotationX: 14, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: f, start: "top 88%", once: true } }),
        );
        ScrollTrigger.create({ trigger: el, start: "top 60%", end: "bottom 40%", onToggle: (self) => activate(self.isActive) });
        return () => steps.forEach((s) => (s.style.transitionDelay = ""));
      });
      mm.add(REDUCED, () => {
        setAll(true);
        el.style.setProperty("--p", "1");
        ScrollTrigger.create({ trigger: el, start: "top 60%", end: "bottom 40%", onToggle: (self) => activate(self.isActive) });
      });
    });
    return () => { job.cancelled = true; mm?.revert(); };
  }, []);

  return (
    <section ref={ref} id={id} className={`scene ${className}`} data-stage={mode} data-space={space} aria-label={label}>
      {children}
    </section>
  );
}
