import type { ReactNode } from "react";

/**
 * A floating 3D element. The outer layer is flown in and out by the enclosing Stage (data-float);
 * the inner layer rests at a slight angle, leans toward the cursor and bobs gently (see .tilt in globals.css).
 * side: "l" leans right toward the centre, "r" leans left, "c" faces forward.
 */
export function Float({ side = "c", className = "", children }: { side?: "l" | "r" | "c"; className?: string; children: ReactNode }) {
  return (
    <div className={`float ${className}`} data-float={side}>
      <div className={`tilt tilt--${side}`}>{children}</div>
    </div>
  );
}
