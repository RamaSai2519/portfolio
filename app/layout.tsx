import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { JetBrains_Mono, Mona_Sans } from "next/font/google";
import "./globals.css";
import { SITE_URL } from "@/lib/site";
import { SITE_DESCRIPTION, SITE_NAME, SITE_TITLE, jsonLd, siteJsonLd } from "@/lib/seo";
import { SpaceField } from "@/components/space-field";
import { SmoothScroll } from "@/components/smooth-scroll";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_TITLE, template: `%s · ${SITE_NAME}` },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  keywords: ["Rama Sathya Sai", "portfolio", "full stack engineer", "Bengaluru", "web developer", "Next.js", "Journeymen", "Emporos", "ARK-I", "mark8", "back_bone"],
  openGraph: { type: "website", siteName: SITE_NAME, locale: "en_IN", title: SITE_TITLE, description: SITE_DESCRIPTION },
  twitter: { card: "summary_large_image", title: SITE_TITLE, description: SITE_DESCRIPTION },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
  formatDetection: { email: false, telephone: false, address: false },
};

export const viewport: Viewport = { themeColor: "#080809", colorScheme: "dark" };

// Self-hosted at build time: no render-blocking request to Google, and the fonts are preloaded from our own origin.
const mona = Mona_Sans({ subsets: ["latin"], axes: ["wdth"], display: "swap", variable: "--font-mona" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], display: "swap", variable: "--font-jetbrains" });

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" data-theme="dark" className={`${mona.variable} ${jetbrains.variable}`} suppressHydrationWarning>
      <head>
        {/* Marks that JS runs, so scroll-step styles never hide content for visitors without it */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(siteJsonLd)} />
      </head>
      <body>
        <SpaceField />
        <SmoothScroll />
        <a className="dp-btn dp-btn--primary skip" href="#main">Skip to content</a>
        {children}
        {GA_ID && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
            <Script id="ga4-init" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
