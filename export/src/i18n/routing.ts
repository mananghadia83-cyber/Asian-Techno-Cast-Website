import { defineRouting } from "next-intl/routing";

export const locales = ["en-US", "en-GB", "de"] as const;
export type Locale = (typeof locales)[number];

export const routing = defineRouting({
  locales,
  defaultLocale: "en-US",
  // US English has no prefix; others live under /en-gb and /de.
  localePrefix: {
    mode: "as-needed",
    prefixes: { "en-GB": "/en-gb", de: "/de" },
  },
  // No automatic redirects and no locale cookie: visitors pick a language
  // with the switcher, and the site stays cookie-free (no consent banner).
  localeDetection: false,
  localeCookie: false,
  // hreflang tags are emitted in page metadata instead (see lib/seo.ts).
  alternateLinks: false,
});
