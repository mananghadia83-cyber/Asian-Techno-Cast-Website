import type { MetadataRoute } from "next";
import { locales } from "@/i18n/routing";
import { getProducts } from "@/lib/content";
import { absoluteUrl } from "@/lib/site";

const staticPaths = [
  "/",
  "/products",
  "/materials",
  "/capabilities",
  "/quality",
  "/export-logistics",
  "/industries",
  "/about",
  "/rfq",
  "/contact",
  "/privacy",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { products } = await getProducts("en-US");
  const paths = [...staticPaths, ...products.map((p) => `/products/${p.slug}`)];

  const entries: MetadataRoute.Sitemap = paths.map((path) => ({
    url: absoluteUrl("en-US", path),
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : path.startsWith("/products") || path === "/rfq" ? 0.8 : 0.6,
    alternates: {
      languages: Object.fromEntries(locales.map((l) => [l, absoluteUrl(l, path)])),
    },
  }));

  // Listed per locale as well, so every language version is discoverable.
  for (const l of locales.filter((l) => l !== "en-US")) {
    for (const path of paths) {
      entries.push({
        url: absoluteUrl(l, path),
        changeFrequency: "monthly",
        priority: 0.5,
        alternates: {
          languages: Object.fromEntries(locales.map((x) => [x, absoluteUrl(x, path)])),
        },
      });
    }
  }
  entries.push({ url: absoluteUrl("de", "/impressum"), changeFrequency: "yearly", priority: 0.1 });
  return entries;
}
