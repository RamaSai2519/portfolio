import Image from "next/image";
import { EMPOROS_DEMO_LIVE, EMPOROS_DEMO_URL } from "@/lib/site";

const host = new URL(EMPOROS_DEMO_URL).host;

/**
 * The Emporos demo in a browser frame: the live iframe once the demo site is deployed,
 * screenshots until then. The demo only allows this domain to frame it and needs no
 * more than allow-scripts and allow-same-origin.
 */
export function EmporosDemoFrame({ shot = "open-trade" }: { shot?: "open-trade" | "trades" | "history" }) {
  return (
    <div className="ed">
      <div className="frame__bar">
        <i /><i /><i />
        <span className="frame__url">{host}</span>
        <span className="dp-pill dp-pill--gold">demo · simulated data</span>
      </div>
      {EMPOROS_DEMO_LIVE ? (
        <iframe
          className="ed__frame"
          src={EMPOROS_DEMO_URL}
          title="Emporos options desk: demo replay of a simulated trading day"
          loading="lazy"
          referrerPolicy="no-referrer"
          sandbox="allow-scripts allow-same-origin"
        />
      ) : (
        <picture>
          <source media="(max-width: 640px)" srcSet="/emporos-demo/mobile.png" />
          <Image className="ed__shot" src={`/emporos-demo/${shot}.png`} alt="The Emporos demo dashboard replaying a simulated trading day" width={1200} height={760} sizes="(max-width: 899px) 100vw, 1100px" quality={80} />
        </picture>
      )}
    </div>
  );
}
