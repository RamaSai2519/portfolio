import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { JetBrains_Mono, Mona_Sans } from "next/font/google";
import "./globals.css";
import { SITE_URL } from "@/lib/site";
import { SpaceField } from "@/components/space-field";
import { SmoothScroll } from "@/components/smooth-scroll";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "Rama Sathya Sai · websites and the systems behind them", template: "%s · Rama Sathya Sai" },
  description:
    "I ship websites and the systems behind them: Journeymen, Emporos, ARK-I, mark8, back_bone and resume_builder.",
  openGraph: { type: "website", siteName: "Rama Sathya Sai", locale: "en_IN" },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = { themeColor: "#080809", colorScheme: "dark" };

// Self-hosted at build time: no render-blocking request to Google, and the fonts are preloaded from our own origin.
const mona = Mona_Sans({ subsets: ["latin"], axes: ["wdth"], display: "swap", variable: "--font-mona" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], display: "swap", variable: "--font-jetbrains" });

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark" className={`${mona.variable} ${jetbrains.variable}`} suppressHydrationWarning>
      <head>
        {/* Marks that JS runs, so scroll-step styles never hide content for visitors without it */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
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
