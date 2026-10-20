import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SITE_URL } from "@/lib/site";
import { SpaceField } from "@/components/space-field";
import { SmoothScroll } from "@/components/smooth-scroll";
import { AccentPicker } from "@/components/accent-picker";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "Rama Sathya Sai · websites and the systems behind them", template: "%s · Rama Sathya Sai" },
  description:
    "I ship websites and the systems behind them: Journeymen, Emporos, ARK-I, mark8, back_bone and resume_builder.",
  openGraph: { type: "website", siteName: "Rama Sathya Sai", locale: "en_IN" },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = { themeColor: "#0a0a14", colorScheme: "dark" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        {/* Marks that JS runs, so scroll-step styles never hide content for visitors without it */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js');try{var a=localStorage.getItem('accent-preview');if(a)document.documentElement.dataset.accent=a}catch(e){}" }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Mona+Sans:wdth,wght@100..125,200..900&family=JetBrains+Mono:wght@400;500&display=swap"
        />
      </head>
      <body>
        <SpaceField />
        <SmoothScroll />
        <AccentPicker />
        <a className="dp-btn dp-btn--primary skip" href="#main">Skip to content</a>
        {children}
      </body>
    </html>
  );
}
