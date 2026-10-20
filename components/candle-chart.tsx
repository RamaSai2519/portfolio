import { candles } from "@/lib/candles";

/** The live book's setup as a scroll-driven chart. Candle i appears at step `from + i`. */
export function CandleChart({ from = 0 }: { from?: number }) {
  const s = (i: number) => from + i;
  return (
    <div className="chart-wrap">
      <div className="chart">
        <div className="range-box" data-step={s(10)} data-fx="fade" style={{ gridColumn: "6 / 11", height: 36, marginBottom: 140 }} />
        <div className="level" data-step={s(11)} data-fx="fade" style={{ gridColumn: "11 / -1", marginBottom: 200, ["--c" as string]: "var(--sky)" }}><span>entry</span></div>
        <div className="level" data-step={s(13)} data-fx="fade" style={{ gridColumn: "12 / -1", marginBottom: 218, ["--c" as string]: "var(--gold)" }}><span>floor</span></div>
        <div className="level" data-step={s(14)} data-fx="fade" style={{ gridColumn: "14 / -1", marginBottom: 240, ["--c" as string]: "var(--accent)" }}><span>trail</span></div>
        {candles.map(([col, b, h, kind], i) => (
          <div key={col} className={`cnd ${kind}`} data-step={s(i)} data-fx="grow" style={{ gridColumn: col, height: h, marginBottom: b }} />
        ))}
      </div>
    </div>
  );
}
