import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { contact } from "@/lib/site";

type NavItem = { href: string; label: string };

export function Wordmark({ href = "/" }: { href?: string }) {
  return (
    <Link href={href} className="wordmark" aria-label="rama sathya sai, home">
      rama sathya sai<span className="dotg">.</span>
    </Link>
  );
}

export function SiteHeader({ nav, label = "Projects" }: { nav: NavItem[]; label?: string }) {
  return (
    <header className="wrap site-header">
      <Wordmark />
      <nav aria-label={label}>
        {nav.map((item) => (
          <Link key={item.href} className="dp-btn dp-btn--ghost" href={item.href}>
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}

export function PageFooter({ prev, next }: { prev: NavItem; next: NavItem }) {
  return (
    <footer className="page-foot">
      <div className="wrap page-foot__inner">
        <Link className="dp-btn dp-btn--secondary" href={prev.href}>{prev.label}</Link>
        <Link className="dp-btn dp-btn--primary" href={next.href}>{next.label}</Link>
      </div>
      <Colophon />
    </footer>
  );
}

export function Colophon() {
  return (
    <p className="wrap colophon">
      rama sathya sai · <a href={`mailto:${contact.email}`}>{contact.email}</a> · <a rel="me" href={contact.github}>github</a> · <a rel="me" href={contact.linkedin}>linkedin</a>
    </p>
  );
}

export function Wire({ delay, color, style }: { delay?: number; color?: string; style?: CSSProperties }) {
  const pkt: CSSProperties = {};
  if (delay) pkt.animationDelay = `${delay}s`;
  if (color) (pkt as Record<string, string>)["--pkt"] = color;
  return (
    <div className="wire" style={style} aria-hidden="true">
      <i className="pkt" style={pkt} />
    </div>
  );
}

export function SecHead({ eyebrow, title, children, id }: { eyebrow: string; title: ReactNode; children?: ReactNode; id?: string }) {
  return (
    <div className="sec-head" id={id}>
      <span className="dp-label">{eyebrow}</span>
      <h2 className="h-sec">{title}</h2>
      {children}
    </div>
  );
}

export function Stat({ n, label, color }: { n: string; label: string; color: string }) {
  return (
    <div className="stat">
      <span className="stat__n" style={{ color }}>{n}</span>
      <span className="dp-label">{label}</span>
    </div>
  );
}

export function Lock() {
  return (
    <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </svg>
  );
}

/** A visible marker for content that is not confirmed yet. Listed in the build report. */
export function Ph({ children }: { children: ReactNode }) {
  return <span className="ph">[{children}]</span>;
}
