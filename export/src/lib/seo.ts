import type { Metadata } from "next";
import { locales, type Locale } from "@/i18n/routing";
import { absoluteUrl, ogLocale } from "./site";
import { stripTodos } from "./text";
import type { Seo } from "./types";

/**
 * Builds title, description, canonical URL and hreflang alternates for a page.
 * `only` limits alternates for pages that exist in a single language (Impressum).
 */
export function pageMetadata(
  locale: Locale,
  path: string,
  seo: Seo,
  only?: Locale[],
): Metadata {
  const available = only ?? [...locales];
  const languages: Record<string, string> = {};
  for (const l of available) languages[l] = absoluteUrl(l, path);
  if (available.includes("en-US")) languages["x-default"] = absoluteUrl("en-US", path);

  const title = stripTodos(seo.title);
  const description = stripTodos(seo.description);

  return {
    // Titles in the content files are complete (they include the brand), so no template suffix.
    title: { absolute: title },
    description,
    alternates: { canonical: absoluteUrl(locale, path), languages },
    openGraph: {
      type: "website",
      siteName: "Asian Technocast",
      title,
      description,
      url: absoluteUrl(locale, path),
      locale: ogLocale[locale],
    },
    twitter: { card: "summary_large_image", title, description },
  };
}
