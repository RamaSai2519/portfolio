import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";

type Props = {
  href: string;
  url: string;
  title: string;
  badge?: ReactNode;
  className?: string;
  frameH: number;
  shot?: StaticImageData;
  shotAlt?: string;
  scrollDur?: number;
  overlay?: ReactNode;
  children: ReactNode;
  mock?: ReactNode;
};

/** Browser-frame preview of a live site. The full-page screenshot scrolls slowly inside the frame. */
export function BrowserFrame({ href, url, title, badge, className = "", frameH, shot, shotAlt, scrollDur, overlay, children, mock }: Props) {
  const external = href.startsWith("http");
  const vars = { "--frame-h": `${frameH}px`, ...(scrollDur ? { "--scroll-dur": `${scrollDur}s` } : {}) } as CSSProperties;
  const body = (
    <>
      <div className="frame__bar" aria-hidden="true">
        <i /><i /><i />
        <span className="frame__url">{url}</span>
      </div>
      <div className="frame__view" style={vars}>
        {shot ? (
          <div className="mock">
            <Image className="frame__shot" src={shot} alt={shotAlt ?? ""} sizes="(max-width: 860px) 100vw, 560px" quality={70} />
          </div>
        ) : (
          mock
        )}
        {overlay}
      </div>
      <div className="frame__body">
        <div className="frame__title">
          <h3>{title}</h3>
          {badge}
        </div>
        {children}
      </div>
    </>
  );
  const cls = `dp-card frame site ${className}`;
  return external ? (
    <a className={cls} href={href} target="_blank" rel="noopener">{body}</a>
  ) : (
    <Link className={cls} href={href}>{body}</Link>
  );
}
