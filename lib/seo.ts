import type { Metadata } from "next";
import { SITE_URL, contact, sites } from "@/lib/site";

export const SITE_NAME = "Rama Sathya Sai";
export const SITE_TITLE = "Rama Sathya Sai · websites and the systems behind them";
export const SITE_DESCRIPTION =
  "I ship websites and the systems behind them: Journeymen, Emporos, ARK-I, mark8, back_bone and resume_builder.";

/**
 * Per-page metadata: canonical URL plus matching Open Graph and Twitter tags.
 * Next replaces (not merges) a parent's openGraph object, so the shared fields are repeated here.
 * The OG image comes from the opengraph-image.tsx next to each page.
 */
export function pageMetadata({ title, description, path }: { title: string; description: string; path: string }): Metadata {
  const fullTitle = `${title} · ${SITE_NAME}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { type: "article", siteName: SITE_NAME, locale: "en_IN", url: path, title: fullTitle, description },
    twitter: { card: "summary_large_image", title: fullTitle, description },
  };
}

const personId = `${SITE_URL}/#person`;

/** Site-wide structured data: who the site is about, and the site itself. */
export const siteJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": personId,
      name: SITE_NAME,
      url: SITE_URL,
      email: `mailto:${contact.email}`,
      jobTitle: "Founder",
      worksFor: { "@type": "Organization", name: "Journeymen", url: sites.journeymen },
      sameAs: [contact.github, contact.linkedin],
      knowsAbout: ["Web development", "Next.js", "TypeScript", "Python", "AWS", "LLM applications", "Algorithmic trading systems"],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      inLanguage: "en-IN",
      author: { "@id": personId },
      publisher: { "@id": personId },
    },
  ],
};

/** Escapes `<` so a string in the data can never close the script tag. */
export function jsonLd(data: object) {
  return { __html: JSON.stringify(data).replace(/</g, "\\u003c") };
}
