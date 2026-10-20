"use client";

import Image, { type StaticImageData } from "next/image";
import { useEffect, useRef, useState } from "react";

type Props = { src: string; title: string; url: string; poster: StaticImageData };

const DESKTOP_W = 1280;

/**
 * A live site in a browser frame. It is rendered at desktop width and scaled to fit.
 * While the page scrolls through the frame's stage, the frame sends {type: "rss-scroll", progress} to the site.
 * Sites that include the embed bridge (docs/live-embed.md) scroll along; the others stay live but still.
 * The frame ignores the pointer until the visitor chooses "Use the site", so page scrolling is never trapped.
 */
export function LiveFrame({ src, title, url, poster }: Props) {
  const box = useRef<HTMLDivElement>(null);
  const frame = useRef<HTMLIFrameElement>(null);
  const [load, setLoad] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [bridged, setBridged] = useState(false);
  const [using, setUsing] = useState(false);
  const [scale, setScale] = useState(0.5);
  const [tapToLoad, setTapToLoad] = useState(false);
  const origin = new URL(src).origin;

  // scale the desktop-width page into the frame
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setScale(el.clientWidth / DESKTOP_W));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // desktop: load when near the viewport. phones: wait for a tap.
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const small = window.matchMedia("(max-width: 899px)").matches;
    setTapToLoad(small);
    if (small) return;
    const io = new IntersectionObserver((es) => es.some((e) => e.isIntersecting) && setLoad(true), { rootMargin: "100% 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // follow the stage's scroll progress
  useEffect(() => {
    const stage = box.current?.closest("[data-stage]");
    if (!stage || !loaded) return;
    let raf = 0;
    const onProgress = (e: Event) => {
      const p = (e as CustomEvent<number>).detail;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => frame.current?.contentWindow?.postMessage({ type: "rss-scroll", progress: p }, origin));
    };
    stage.addEventListener("stage-progress", onProgress);
    return () => { stage.removeEventListener("stage-progress", onProgress); cancelAnimationFrame(raf); };
  }, [loaded, origin]);

  useEffect(() => {
    const onMsg = (e: MessageEvent) => {
      if (e.origin === origin && e.data && e.data.type === "rss-ready") setBridged(true);
    };
    window.addEventListener("message", onMsg);
    return () => window.removeEventListener("message", onMsg);
  }, [origin]);

  return (
    <div className="lf">
      <div className="frame__bar">
        <i /><i /><i />
        <span className="frame__url">{url}</span>
        {loaded && (
          <button type="button" className={`lf__use ${using ? "is-on" : ""}`} onClick={() => setUsing((u) => !u)} aria-pressed={using}>
            {using ? "Done" : "Use the site"}
          </button>
        )}
      </div>
      <div ref={box} className={`lf__view ${using ? "is-using" : ""}`}>
        <Image className={`lf__poster ${loaded ? "is-hidden" : ""}`} src={poster} alt="" aria-hidden="true" sizes="(max-width: 899px) 100vw, 60vw" quality={70} />
        {load && (
          <iframe
            ref={frame}
            src={src}
            title={title}
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
            onLoad={() => setLoaded(true)}
            style={{ width: DESKTOP_W, height: `calc(100% / ${scale})`, transform: `scale(${scale})` }}
            tabIndex={using ? 0 : -1}
          />
        )}
        {tapToLoad && !load && (
          <button type="button" className="dp-btn dp-btn--secondary lf__tap" onClick={() => setLoad(true)}>Load the live site</button>
        )}
        {loaded && !bridged && !using && <span className="dp-pill dp-pill--overlay lf__hint">live · choose “Use the site” to scroll it</span>}
      </div>
    </div>
  );
}
