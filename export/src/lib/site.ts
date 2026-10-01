import type { Locale } from "@/i18n/routing";

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.asiantechnocast.com"
).replace(/\/$/, "");

const prefix: Record<Locale, string> = { "en-US": "", "en-GB": "/en-gb", de: "/de" };

/** Locale-aware path, e.g. localePath("de", "/products") → "/de/products". */
export function localePath(locale: Locale, path: string) {
  const clean = path === "/" ? "" : path;
  return `${prefix[locale]}${clean}` || "/";
}

export const absoluteUrl = (locale: Locale, path: string) =>
  `${SITE_URL}${localePath(locale, path)}`;

/** BCP 47 tag for <html lang> and Open Graph. */
export const ogLocale: Record<Locale, string> = { "en-US": "en_US", "en-GB": "en_GB", de: "de_DE" };
