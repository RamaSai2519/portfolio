import Link from "next/link";
import { SiteHeader } from "@/components/chrome";

export default function NotFound() {
  return (
    <>
      <SiteHeader nav={[{ href: "/", label: "all work" }]} />
      <main id="main" className="wrap hero" style={{ minHeight: "60vh" }}>
        <div className="hero__copy">
          <span className="dp-label">404 · not found</span>
          <h1 className="h-hero">Nothing at this commit<span className="dotg">.</span></h1>
          <div className="row"><Link className="dp-btn dp-btn--primary" href="/">Back to all work</Link></div>
        </div>
      </main>
    </>
  );
}
