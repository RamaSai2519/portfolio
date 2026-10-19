"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { StageActiveDetail } from "./stage";

type Item = { id: string; num: string; name: string };

/** Progress rail (desktop) and sticky action bar, both driven by the active journey stage. */
export function JourneyChrome({ items }: { items: Item[] }) {
  const [active, setActive] = useState<StageActiveDetail | null>(null);

  useEffect(() => {
    const onActive = (e: Event) => {
      const d = (e as CustomEvent<StageActiveDetail>).detail;
      setActive((cur) => (d.active ? d : cur?.id === d.id ? null : cur));
    };
    window.addEventListener("stage-active", onActive);
    return () => window.removeEventListener("stage-active", onActive);
  }, []);

  const shown = Boolean(active?.name);
  const total = String(items.length).padStart(2, "0");

  return (
    <>
      <nav className={`rail ${shown ? "rail--on" : ""}`} aria-label="Project tour">
        <ol>
          {items.map((it) => (
            <li key={it.id}>
              <a href={`#${it.id}`} aria-current={active?.id === it.id ? "step" : undefined}>
                <span className="rail__num">{it.num}</span>
                <span className="rail__name">{it.name}</span>
              </a>
            </li>
          ))}
        </ol>
      </nav>
      <div className={`actbar ${shown ? "actbar--on" : ""}`} aria-hidden={!shown}>
        <span className="actbar__where">
          <span className="dp-label">{active?.num ?? "00"} / {total}</span>
          <b>{active?.name ?? ""}</b>
        </span>
        {active?.action &&
          (active.action.external ? (
            <a className="dp-btn dp-btn--primary" href={active.action.href} target="_blank" rel="noopener" tabIndex={shown ? 0 : -1}>
              {active.action.label} <span aria-hidden="true">↗</span>
            </a>
          ) : (
            <Link className="dp-btn dp-btn--primary" href={active.action.href} tabIndex={shown ? 0 : -1}>
              {active.action.label} <span aria-hidden="true">→</span>
            </Link>
          ))}
      </div>
    </>
  );
}
