"use client";

import { useEffect, useRef } from "react";

/**
 * The site's background: a fixed canvas of 3D star-nodes joined by constellation lines (after the
 * journeymen.in particle network). Sections choose a formation with data-space="globe|lattice|field";
 * the formation morphs as each section scrolls past, and the camera flies forward with the scroll.
 * The cursor tilts the camera and lights nearby links. Reduced motion draws one still frame.
 */
type Mode = "globe" | "lattice" | "field";
type V3 = [number, number, number];

const BASE = [232, 230, 240];
const BRAND = [63, 200, 78];
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
    const N = small ? 90 : 170;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
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
    const globe = fibSphere(N, 260);
    const field: V3[] = Array.from({ length: N }, () => [(Math.random() - 0.5) * 2400, (Math.random() - 0.5) * 1500, Math.random() * DEPTH]);
    const cols = small ? 10 : 17;
    const lattice: V3[] = Array.from({ length: N }, (_, i) => {
      const c = i % cols, r = Math.floor(i / cols);
      return [(c - (cols - 1) / 2) * 90, 120 + r * 26, (r - 5) * 110];
    });
    const pos: V3[] = field.map((p) => [...p] as V3);
    const size = Array.from({ length: N }, () => 0.8 + Math.random() * 1.4);

    // mouse: drives camera tilt and the link glow; also published as --mx/--my for CSS tilt
    const mouse = { x: -9999, y: -9999, nx: 0, ny: 0 };
    const root = document.documentElement;
    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.nx = (e.clientX / w) * 2 - 1;
      mouse.ny = (e.clientY / h) * 2 - 1;
      root.style.setProperty("--mx", mouse.nx.toFixed(3));
      root.style.setProperty("--my", mouse.ny.toFixed(3));
    };
    const onLeave = () => { mouse.x = mouse.y = -9999; };
    if (!reduce) {
      window.addEventListener("mousemove", onMove);
      window.addEventListener("mouseout", onLeave);
    }

    // which formation, and how far between two of them
    let from: Mode = "field", to: Mode = "field", mix = 0, travel = 0;
    const readScroll = () => {
      travel = window.scrollY;
      root.style.setProperty("--sy", Math.min(1, window.scrollY / h).toFixed(3));
      const secs = Array.from(document.querySelectorAll<HTMLElement>("[data-space]"));
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

    const targetOf = (m: Mode, i: number, t: number): V3 => {
      if (m === "globe") {
        const [x, y, z] = globe[i];
        const a = t * 0.00012;
        const cx = w > 900 ? w * 0.2 : 0;
        return [x * Math.cos(a) - z * Math.sin(a) + cx, y - 20, x * Math.sin(a) + z * Math.cos(a) + 700];
      }
      if (m === "lattice") return lattice[i].map((v, k) => (k === 2 ? v + 700 : v)) as V3;
      const [x, y, z] = field[i];
      // fly forward: the field scrolls toward the camera and wraps around
      const zz = (((z - travel * 0.6 - t * 0.01) % DEPTH) + DEPTH) % DEPTH;
      return [x, y, zz + 150];
    };

    let raf = 0;
    let yaw = 0, pitch = 0;
    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      yaw += (mouse.nx * 0.12 - yaw) * 0.05;
      pitch += (mouse.ny * 0.08 - pitch) * 0.05;
      const cy = Math.cos(yaw), sy = Math.sin(yaw), cp = Math.cos(pitch), sp = Math.sin(pitch);
      const proj: [number, number, number][] = [];
      for (let i = 0; i < N; i++) {
        const a = targetOf(from, i, t), b = targetOf(to, i, t);
        const tg: V3 = [a[0] + (b[0] - a[0]) * mix, a[1] + (b[1] - a[1]) * mix, a[2] + (b[2] - a[2]) * mix];
        const p = pos[i];
        // ease toward the formation; field wrap-around jumps instead of sweeping across the screen
        const jump = Math.abs(tg[2] - p[2]) > DEPTH * 0.6;
        const k = reduce || jump ? 1 : 0.07;
        p[0] += (tg[0] - p[0]) * k; p[1] += (tg[1] - p[1]) * k; p[2] += (tg[2] - p[2]) * k;
        // camera tilt
        const x1 = p[0] * cy + (p[2] - 700) * sy, z1 = -p[0] * sy + (p[2] - 700) * cy + 700;
        const y1 = p[1] * cp - (z1 - 700) * sp, z2 = p[1] * sp + (z1 - 700) * cp + 700;
        const f = 700 / Math.max(z2, 60);
        proj.push([w / 2 + x1 * f, h / 2 + y1 * f, f]);
      }
      const conn = small ? 90 : 120;
      ctx.lineWidth = 1;
      for (let i = 0; i < N; i++) {
        const [ax, ay, af] = proj[i];
        if (ax < -50 || ax > w + 50 || ay < -50 || ay > h + 50) continue;
        for (let j = i + 1; j < N; j++) {
          const [bx, by, bf] = proj[j];
          const dx = ax - bx, dy = ay - by;
          if (Math.abs(dx) > conn || Math.abs(dy) > conn || Math.abs(af - bf) > 0.6) continue;
          const d = Math.hypot(dx, dy);
          if (d >= conn) continue;
          const near = Math.max(0, 1 - Math.hypot((ax + bx) / 2 - mouse.x, (ay + by) / 2 - mouse.y) / 220);
          const c = near > 0.05 ? BRAND : BASE;
          ctx.strokeStyle = `rgba(${c[0]},${c[1]},${c[2]},${(1 - d / conn) * (0.07 + near * 0.35) * Math.min(1, af)})`;
          ctx.beginPath(); ctx.moveTo(ax, ay); ctx.lineTo(bx, by); ctx.stroke();
        }
        const near = Math.max(0, 1 - Math.hypot(ax - mouse.x, ay - mouse.y) / 220);
        const c = near > 0.05 ? BRAND : BASE;
        ctx.fillStyle = `rgba(${c[0]},${c[1]},${c[2]},${Math.min(0.9, 0.22 + af * 0.25 + near * 0.5)})`;
        ctx.beginPath(); ctx.arc(ax, ay, size[i] * Math.min(2.2, af) + near, 0, Math.PI * 2); ctx.fill();
      }
      if (!reduce) raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    const onVis = () => {
      cancelAnimationFrame(raf);
      if (!document.hidden && !reduce) raf = requestAnimationFrame(draw);
    };
    document.addEventListener("visibilitychange", onVis);
    return () => {
      cancelAnimationFrame(raf);
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
      <div className="space__vignette" />
    </div>
  );
}
