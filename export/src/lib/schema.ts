import type { Locale } from "@/i18n/routing";
import { SITE_URL, absoluteUrl } from "./site";
import { stripTodos } from "./text";
import type { Company, GradeRow, Product } from "./types";

export function organizationSchema(company: Company) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: company.name,
    legalName: company.legalName,
    url: `${SITE_URL}/`,
    foundingDate: String(company.founded),
    address: {
      "@type": "PostalAddress",
      streetAddress: `${company.address.street}, ${company.address.area}`,
      addressLocality: company.address.city,
      addressRegion: company.address.region,
      postalCode: company.address.postalCode,
      addressCountry: company.address.countryCode,
    },
    ...(company.email ? { email: company.email } : {}),
    contactPoint: company.phones.map((p) => ({
      "@type": "ContactPoint",
      telephone: p.e164,
      contactType: "sales",
      name: p.name,
      areaServed: ["US", "DE", "GB", "EU"],
      availableLanguage: ["English", "Hindi", "Gujarati"],
    })),
    knowsAbout: [
      "Grey iron castings",
      "Ductile iron castings",
      "Electric motor frame castings",
      "Pump casings",
      "Gearbox housings",
      "CNC machining of castings",
    ],
  };
}

export function productSchema(
  locale: Locale,
  product: Product,
  grades: GradeRow[],
  company: Company,
) {
  const materials = grades.map((g) => `${g.astm} / ${g.en} / ${g.is}`);
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: stripTodos(product.name),
    description: stripTodos(product.summary),
    url: absoluteUrl(locale, `/products/${product.slug}`),
    category: "Iron castings",
    material: materials.join("; "),
    ...(product.image.src ? { image: `${SITE_URL}${product.image.src}` } : {}),
    brand: { "@type": "Brand", name: company.name },
    manufacturer: { "@id": `${SITE_URL}/#organization` },
    countryOfOrigin: { "@type": "Country", name: "India" },
  };
}
