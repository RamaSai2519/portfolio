# Live sites on the home page

The home tour shows Journeymen, Ledger, Mohan Visweswar and GITAM Epoch as live iframes.
Two things have to be true on each site for that to work fully.

## 1. Allow the portfolio to frame the site

If a site sends `X-Frame-Options: DENY` / `SAMEORIGIN`, or a CSP `frame-ancestors` that leaves the
portfolio out, the frame stays blank. Allow the portfolio's domain, for example in `next.config.ts`:

```ts
async headers() {
  return [{
    source: "/:path*",
    headers: [{ key: "Content-Security-Policy", value: "frame-ancestors 'self' https://rama.journeymen.in" }],
  }];
}
```

Remove any `X-Frame-Options` header the site sets, since it overrides nothing and blocks older browsers.

## 2. Add the scroll bridge (optional, for auto-scroll)

A page cannot scroll another site inside an iframe. The portfolio sends the scroll progress of the
tour as a message; this snippet on the framed site scrolls along. Without it the site still loads live,
and visitors can press "Use the site" to scroll it themselves.

```html
<script>
(function () {
  if (window.top === window) return; // only when framed
  var PORTFOLIO = "https://rama.journeymen.in";
  window.addEventListener("message", function (e) {
    if (e.origin !== PORTFOLIO || !e.data || e.data.type !== "rss-scroll") return;
    var max = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo(0, Math.max(0, Math.min(1, e.data.progress)) * max);
  });
  window.parent.postMessage({ type: "rss-ready" }, PORTFOLIO);
})();
</script>
```

In a Next.js site, put it in the root layout with `next/script` (`strategy="afterInteractive"`).

Message format (portfolio → site): `{ type: "rss-scroll", progress: 0..1 }`.
Reply (site → portfolio, once): `{ type: "rss-ready" }`; it hides the "Use the site" hint.
