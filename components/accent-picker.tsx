"use client";

import { useEffect, useState } from "react";

// Candidate accents for the colour that is purple today. Pick one, then it gets baked into the tokens.
export const ACCENTS = [
  { id: "violet", label: "violet (current)", c: "#b48be6" },
  { id: "teal", label: "teal", c: "#4fd1c5" },
  { id: "pink", label: "pink", c: "#f38bc0" },
  { id: "blue", label: "blue", c: "#7c9cff" },
  { id: "orange", label: "orange", c: "#ff9f5a" },
  { id: "silver", label: "silver (no colour)", c: "#c9cbd8" },
] as const;

const KEY = "accent-preview";

/** Dev-only switcher (npm run dev, or any page with ?accent). Sets <html data-accent>. */
export function AccentPicker() {
  const [show, setShow] = useState(false);
  const [cur, setCur] = useState("violet");

  useEffect(() => {
    const dev = process.env.NODE_ENV === "development" || new URLSearchParams(location.search).has("accent");
    setShow(dev);
    if (!dev) return;
    let saved = "violet";
    try { saved = localStorage.getItem(KEY) || "violet"; } catch {}
    setCur(saved);
  }, []);

  useEffect(() => {
    if (!show) return;
    document.documentElement.dataset.accent = cur;
    try { localStorage.setItem(KEY, cur); } catch {}
  }, [cur, show]);

  if (!show) return null;
  return (
    <div className="accent-picker" role="group" aria-label="Preview accent colour">
      <span className="dp-label">accent</span>
      {ACCENTS.map((a) => (
        <button key={a.id} type="button" title={a.label} aria-label={a.label} aria-pressed={cur === a.id} onClick={() => setCur(a.id)} style={{ background: a.c }} />
      ))}
      <span className="accent-picker__name">{ACCENTS.find((a) => a.id === cur)?.label}</span>
    </div>
  );
}
