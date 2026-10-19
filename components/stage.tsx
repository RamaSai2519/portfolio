"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

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
};

const DESKTOP = "(min-width: 900px) and (min-height: 640px) and (prefers-reduced-motion: no-preference)";
const MOBILE = "(max-width: 899px), (max-height: 639px)";
const REDUCED = "(prefers-reduced-motion: reduce)";

/**
 * A scroll-driven section. Every descendant with data-step="n" gets the class "on" once the scroll reaches step n.
 * Desktop: pinned (or scrubbed if the content is taller than the viewport). Phones: steps play once on entry.
 * Reduced motion: everything is shown in its finished state.
 */
export function Stage({ id, className = "", children, mode = "pin", length = 1.6, name, num, action, label }: Props) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
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

      const mm = gsap.matchMedia();
      mm.add(DESKTOP, () => {
        const fits = el.offsetHeight <= window.innerHeight + 2;
        const pin = mode === "pin" && fits;
        ScrollTrigger.create({
          trigger: el,
          start: pin ? "top top" : "top 75%",
          end: pin ? `+=${Math.round(length * 100)}%` : "bottom 55%",
          pin,
          pinSpacing: true,
          anticipatePin: 1,
          onUpdate: (self) => apply(self.progress),
          onRefresh: (self) => apply(self.progress),
        });
        ScrollTrigger.create({
          trigger: el,
          start: "top 60%",
          end: pin ? `+=${Math.round(length * 100 + 50)}%` : "bottom 40%",
          onToggle: (self) => activate(self.isActive),
        });
        return () => setAll(false);
      });
      mm.add(MOBILE, () => {
        steps.forEach((s, i) => (s.style.transitionDelay = `${Math.min(Number(s.dataset.step), 12) * 90 + (i % 2) * 10}ms`));
        ScrollTrigger.create({ trigger: el, start: "top 75%", once: true, onEnter: () => { setAll(true); el.style.setProperty("--p", "1"); } });
        ScrollTrigger.create({ trigger: el, start: "top 60%", end: "bottom 40%", onToggle: (self) => activate(self.isActive) });
        return () => steps.forEach((s) => (s.style.transitionDelay = ""));
      });
      mm.add(REDUCED, () => {
        setAll(true);
        el.style.setProperty("--p", "1");
        ScrollTrigger.create({ trigger: el, start: "top 60%", end: "bottom 40%", onToggle: (self) => activate(self.isActive) });
      });
      return () => mm.revert();
    },
    { scope: ref, dependencies: [] },
  );

  return (
    <section ref={ref} id={id} className={`scene ${className}`} data-stage={mode} aria-label={label}>
      {children}
    </section>
  );
}
