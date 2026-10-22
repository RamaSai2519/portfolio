"use client";

import { useEffect, useRef } from "react";

/**
 * The site's background: a fixed canvas of 3D star-nodes joined by constellation lines (after the
 * journeymen.in particle network). Sections choose a formation with data-space="globe|lattice|field";
 * the formation morphs as each section scrolls past, and the camera flies forward with the scroll.
 * Alongside the formation, a layer of ambient stars always drifts toward the camera and twinkles, so the
 * very first frame is alive before any scrolling. The cursor tilts the camera and lights nearby links.
 * Reduced motion draws one still frame.
 */
type Mode = "globe" | "lattice" | "field";
type V3 = [number, number, number];

const BASE = [150, 200, 255]; // icy blue: the resting field
const HOT = [255, 31, 69]; // neon red: what the cursor lights up
const DEPTH = 1600;

function fibSphere(n: number, r: number): V3[] {
  const pts: V3[] = [];
  const g = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2;
    const rad = Math.sqrt(1 - y * y);
    pts.push([Math.cos(g * i) * rad * r, y * r, Math.sin(g * i) * rad * r]);
  }
  return pts;
}

export function SpaceField() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const small = window.matchMedia("(max-width: 899px)").matches;
    const NG = small ? 90 : 170; // formation nodes
    const NA = small ? 90 : 190; // ambient stars, always drifting
    const N = NG + NA;
    // thin 1px lines and soft dots gain little from a retina backing store, and every extra pixel is raster work each frame
    const dpr = Math.min(window.devicePixelRatio || 1, small ? 1 : 1.5);
    let w = 0, h = 0;
    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    // formations, in world units (screen-ish pixels at depth 0)
    const globe = fibSphere(NG, 260);
    const field: V3[] = Array.from({ length: N }, () => [(Math.random() - 0.5) * 2400, (Math.random() - 0.5) * 1500, Math.random() * DEPTH]);
    const cols = small ? 10 : 17;
    const lattice: V3[] = Array.from({ length: NG }, (_, i) => {
      const c = i % cols, r = Math.floor(i / cols);
      return [(c - (cols - 1) / 2) * 90, 120 + r * 26, (r - 5) * 110];
    });
    const pos: V3[] = field.map((p) => [...p] as V3);
    const size = Array.from({ length: N }, () => 0.8 + Math.random() * 1.4);
    const phase = Array.from({ length: N }, () => Math.random() * Math.PI * 2);

    // mouse: drives camera tilt and the link glow; also published as --mx/--my for CSS tilt
    const mouse = { x: -9999, y: -9999, nx: 0, ny: 0 };
    const root = document.documentElement;
    // the CSS vars restyle the whole document, so they are written at most once a frame (in draw)
    let mouseDirty = false;
    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.nx = (e.clientX / w) * 2 - 1;
      mouse.ny = (e.clientY / h) * 2 - 1;
      mouseDirty = true;
    };
    const onLeave = () => { mouse.x = mouse.y = -9999; };
    if (!reduce) {
      window.addEventListener("mousemove", onMove);
      window.addEventListener("mouseout", onLeave);
    }

    // which formation, and how far between two of them
    let from: Mode = "field", to: Mode = "field", mix = 0, travel = 0;
    let sy = "";
    let secs: HTMLElement[] = [];
    const findSections = () => { secs = Array.from(document.querySelectorAll<HTMLElement>("[data-space]")); };
    // layout is read before anything is written, so a scroll never forces a synchronous restyle
    const readScroll = () => {
      travel = window.scrollY;
      if (!secs.length || !secs[0].isConnected) findSections();
      readSections();
      const next = Math.min(1, travel / h).toFixed(3);
      if (next !== sy) root.style.setProperty("--sy", (sy = next));
    };
    const readSections = () => {
      if (!secs.length) { from = to = "field"; return; }
      const mid = h * 0.5;
      let idx = 0, within = 0;
      secs.forEach((s, i) => {
        const r = s.getBoundingClientRect();
        if (r.top < mid) { idx = i; within = Math.min(1, Math.max(0, (mid - r.top) / Math.max(r.height, 1))); }
      });
      from = (secs[idx].dataset.space as Mode) || "field";
      const next = secs[idx + 1];
      to = next ? ((next.dataset.space as Mode) || "field") : from;
      // hold the formation for most of the section, morph in its last 40%
      mix = Math.max(0, (within - 0.6) / 0.4);
    };
    readScroll();
    window.addEventListener("scroll", readScroll, { passive: true });

    // writes node i's target for formation m into out[0..2] (no allocation: this runs N times per frame)
    const targetOf = (m: Mode, i: number, t: number, out: number[]) => {
      if (i >= NG) {
        // ambient star: drifts toward the camera and sways, whatever the formation
        const [x, y, z] = field[i];
        const zz = (((z - travel * 0.6 - t * 0.08) % DEPTH) + DEPTH) % DEPTH;
        out[0] = x + Math.sin(t * 0.0003 + phase[i]) * 40; out[1] = y + Math.cos(t * 0.00025 + phase[i]) * 30; out[2] = zz + 150;
      } else if (m === "globe") {
        const [x, y, z] = globe[i];
        const a = t * 0.00012;
        const cx = w > 900 ? w * 0.2 : 0;
        out[0] = x * Math.cos(a) - z * Math.sin(a) + cx; out[1] = y - 20; out[2] = x * Math.sin(a) + z * Math.cos(a) + 700;
      } else if (m === "lattice") {
        const [x, y, z] = lattice[i];
        out[0] = x; out[1] = y; out[2] = z + 700;
      } else {
        const [x, y, z] = field[i];
        // fly forward: the field scrolls toward the camera and wraps around
        out[0] = x; out[1] = y; out[2] = ((((z - travel * 0.6 - t * 0.01) % DEPTH) + DEPTH) % DEPTH) + 150;
      }
    };

    // per-frame scratch, allocated once
    const ta = [0, 0, 0], tb = [0, 0, 0];
    const px = new Float32Array(N), py = new Float32Array(N), pf = new Float32Array(N);
    // links only join nodes closer than `conn`, so a grid of conn-sized cells finds them without testing every pair
    const conn = small ? 90 : 120;
    const cellHead: number[] = [];
    const cellNext = new Int32Array(N);
    // strokes and fills are batched by colour and quantised alpha: a few dozen draw calls a frame instead of thousands
    const LEVELS = 200;
    const rgba = (c: number[], l: number) => `rgba(${c[0]},${c[1]},${c[2]},${(l / LEVELS).toFixed(3)})`;
    const styles = [BASE, HOT].map((c) => Array.from({ length: LEVELS + 1 }, (_, l) => rgba(c, l)));
    let lines: (Path2D | undefined)[][] = [[], []], dots: (Path2D | undefined)[][] = [[], []];
    const bucket = (set: (Path2D | undefined)[][], brand: boolean, alpha: number) => {
      const l = Math.min(LEVELS, Math.round(alpha * LEVELS));
      if (l === 0) return null; // invisible
      const row = set[brand ? 1 : 0];
      return row[l] ?? (row[l] = new Path2D());
    };

    let raf = 0;
    let yaw = 0, pitch = 0;
    // phones redraw at 30fps: the drift is slow enough that it looks the same, at half the cost
    const minGap = small ? 30 : 0;
    let last = -Infinity;
    const draw = (t: number) => {
      if (t - last < minGap) { raf = requestAnimationFrame(draw); return; }
      last = t;
      if (mouseDirty) {
        mouseDirty = false;
        root.style.setProperty("--mx", mouse.nx.toFixed(3));
        root.style.setProperty("--my", mouse.ny.toFixed(3));
      }
      ctx.clearRect(0, 0, w, h);
      yaw += (mouse.nx * 0.12 - yaw) * 0.05;
      pitch += (mouse.ny * 0.08 - pitch) * 0.05;
      const cy = Math.cos(yaw), sy = Math.sin(yaw), cp = Math.cos(pitch), sp = Math.sin(pitch);
      for (let i = 0; i < N; i++) {
        targetOf(from, i, t, ta);
        targetOf(to, i, t, tb);
        const m = i >= NG ? 0 : mix;
        const tx = ta[0] + (tb[0] - ta[0]) * m, ty = ta[1] + (tb[1] - ta[1]) * m, tz = ta[2] + (tb[2] - ta[2]) * m;
        const p = pos[i];
        // ease toward the formation; field wrap-around jumps instead of sweeping across the screen
        const jump = Math.abs(tz - p[2]) > DEPTH * 0.6;
        const k = reduce || jump ? 1 : 0.07;
        p[0] += (tx - p[0]) * k; p[1] += (ty - p[1]) * k; p[2] += (tz - p[2]) * k;
        // camera tilt
        const x1 = p[0] * cy + (p[2] - 700) * sy, z1 = -p[0] * sy + (p[2] - 700) * cy + 700;
        const y1 = p[1] * cp - (z1 - 700) * sp, z2 = p[1] * sp + (z1 - 700) * cp + 700;
        const f = 700 / Math.max(z2, 60);
        px[i] = w / 2 + x1 * f; py[i] = h / 2 + y1 * f; pf[i] = f;
      }

      // bucket every node that could link to an on-screen node
      const x0 = -50 - conn, y0 = -50 - conn;
      const gw = Math.ceil((w + 100 + 2 * conn) / conn), gh = Math.ceil((h + 100 + 2 * conn) / conn);
      cellHead.length = gw * gh;
      cellHead.fill(-1);
      for (let i = N - 1; i >= 0; i--) {
        const gx = Math.floor((px[i] - x0) / conn), gy = Math.floor((py[i] - y0) / conn);
        if (gx < 0 || gy < 0 || gx >= gw || gy >= gh) continue;
        const c = gy * gw + gx;
        cellNext[i] = cellHead[c];
        cellHead[c] = i;
      }

      lines = [[], []];
      dots = [[], []];
      for (let i = 0; i < N; i++) {
        const ax = px[i], ay = py[i], af = pf[i];
        if (ax < -50 || ax > w + 50 || ay < -50 || ay > h + 50) continue;
        const gx = Math.floor((ax - x0) / conn), gy = Math.floor((ay - y0) / conn);
        for (let ny = gy - 1; ny <= gy + 1; ny++) {
          if (ny < 0 || ny >= gh) continue;
          for (let nx = gx - 1; nx <= gx + 1; nx++) {
            if (nx < 0 || nx >= gw) continue;
            for (let j = cellHead[ny * gw + nx]; j !== -1; j = cellNext[j]) {
              if (j <= i) continue;
              const bx = px[j], by = py[j];
              const dx = ax - bx, dy = ay - by;
              if (Math.abs(dx) > conn || Math.abs(dy) > conn || Math.abs(af - pf[j]) > 0.6) continue;
              const d = Math.hypot(dx, dy);
              if (d >= conn) continue;
              const near = Math.max(0, 1 - Math.hypot((ax + bx) / 2 - mouse.x, (ay + by) / 2 - mouse.y) / 220);
              const path = bucket(lines, near > 0.05, (1 - d / conn) * (0.07 + near * 0.35) * Math.min(1, af));
              path?.moveTo(ax, ay); path?.lineTo(bx, by);
            }
          }
        }
        const near = Math.max(0, 1 - Math.hypot(ax - mouse.x, ay - mouse.y) / 220);
        const tw = 0.75 + 0.25 * Math.sin(t * 0.002 + phase[i]);
        const r = size[i] * Math.min(2.2, af) + near;
        const path = bucket(dots, near > 0.05, Math.min(0.9, (0.22 + af * 0.25 + (i >= NG ? 0.18 : 0)) * tw + near * 0.5));
        path?.moveTo(ax + r, ay); path?.arc(ax, ay, r, 0, Math.PI * 2);
      }
      ctx.lineWidth = 1;
      for (let c = 0; c < 2; c++) {
        lines[c].forEach((path, l) => { if (path) { ctx.strokeStyle = styles[c][l]; ctx.stroke(path); } });
      }
      for (let c = 0; c < 2; c++) {
        dots[c].forEach((path, l) => { if (path) { ctx.fillStyle = styles[c][l]; ctx.fill(path); } });
      }
      if (!reduce) raf = requestAnimationFrame(draw);
    };
    // The field is decoration: start it once the page has loaded and the main thread is idle, so it never competes
    // with the first paint or hydration.
    let idle = 0;
    const start = () => {
      const ric = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 1));
      idle = ric(() => { raf = requestAnimationFrame(draw); }, { timeout: 1500 });
    };
    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });

    const onVis = () => {
      cancelAnimationFrame(raf);
      if (!document.hidden && !reduce) raf = requestAnimationFrame(draw);
    };
    document.addEventListener("visibilitychange", onVis);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("load", start);
      (window.cancelIdleCallback ?? window.clearTimeout)(idle);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseout", onLeave);
      window.removeEventListener("scroll", readScroll);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return (
    <div className="space" aria-hidden="true">
      <canvas ref={ref} />
      <div className="space__nebula" />
      <div className="space__grid" />
      <div className="space__vignette" />
    </div>
  );
}
