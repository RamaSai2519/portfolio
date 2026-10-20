// The live book's setup, drawn on a 17-column grid: [column, bottom px, height px, kind]
// 5-candle move, 5-candle build-up, breakout, entry at the peak, floor, peak, trailing exit.
export type CandleKind = "up" | "dn" | "brk" | "ex";
export const candles: [number, number, number, CandleKind][] = [
  [1, 16, 30, "up"], [2, 40, 30, "up"], [3, 64, 30, "up"], [4, 88, 30, "up"], [5, 112, 30, "up"],
  [6, 146, 16, "dn"], [7, 150, 20, "up"], [8, 144, 18, "dn"], [9, 152, 18, "up"], [10, 148, 16, "dn"],
  [11, 152, 48, "brk"],
  [12, 194, 18, "up"], [13, 208, 20, "up"], [14, 224, 26, "up"], [15, 230, 16, "ex"],
];
