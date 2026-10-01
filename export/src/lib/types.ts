/**
 * Shapes of the editable JSON files in content/<locale>/.
 * Any string may contain a placeholder written as [[TODO: what is needed]];
 * it is shown on the page as a highlighted badge until replaced.
 */

/** A number with a unit. Leave min/max/value as null to show a TODO badge. */
export interface Quantity {
  unit: "kg" | "mm" | "t" | "t/month";
  min?: number | null;
  max?: number | null;
  value?: number | null;
  /** Text before the number, e.g. "±" or "up to". */
  prefix?: string;
  /** What to ask for while the number is still missing. */
  todo: string;
}

export type FactValue = string | Quantity;

export interface Fact {
  label: string;
  value: FactValue;
  note?: string;
}

export interface ImageSlot {
  /** Path under /public, e.g. "/images/moulding-line.jpg". null = photo still needed. */
  src: string | null;
  alt: string;
  width?: number;
  height?: number;
}

export interface Card {
  title: string;
  text: string;
  href?: string;
  icon?: string;
}

export interface Step {
  title: string;
  text: string;
}

export interface Section {
  id?: string;
  title: string;
  intro?: string;
  paragraphs?: string[];
  list?: string[];
  facts?: Fact[];
  steps?: Step[];
  cards?: Card[];
  badges?: string[];
  image?: ImageSlot;
  /** Small print under the section. */
  note?: string;
}

export interface Seo {
  title: string;
  description: string;
}

export interface Page {
  seo: Seo;
  eyebrow?: string;
  title: string;
  intro?: string;
  image?: ImageSlot;
  sections: Section[];
}

export interface Product {
  slug: string;
  name: string;
  summary: string;
  seo: Seo;
  intro: string;
  image: ImageSlot;
  /** Extra highlighted line, e.g. NEMA / IEC frame sizes. */
  sizeRanges?: Fact[];
  /** Grade ids from materials.json, shown in this locale's preferred order. */
  grades: string[];
  gradeNote?: string;
  weight: Quantity;
  machining: string[];
  tolerances: FactValue;
  applications: string[];
  notes?: string[];
}

export interface ProductsFile {
  seo: Seo;
  eyebrow: string;
  title: string;
  intro: string;
  products: Product[];
}

export type StandardFamily = "astm" | "en" | "is";

export interface GradeRow {
  id: string;
  family: "grey" | "ductile";
  is: string;
  astm: string;
  en: string;
  use: string;
}

export interface MaterialsFile {
  seo: Seo;
  eyebrow: string;
  title: string;
  intro: string;
  /** Column order for this market, e.g. ["astm","en","is"] for the US. */
  order: StandardFamily[];
  columns: Record<StandardFamily | "use", string>;
  standards: Record<StandardFamily, string>;
  rows: GradeRow[];
  disclaimer: string;
  sections: Section[];
}

export interface HomeFile {
  seo: Seo;
  eyebrow: string;
  headline: string;
  subhead: string;
  heroImage: ImageSlot;
  facts: Fact[];
  productsTitle: string;
  productsIntro: string;
  industriesTitle: string;
  industries: Card[];
  whyTitle: string;
  why: Card[];
  ctaTitle: string;
  ctaText: string;
  /** Optional market-specific line, e.g. trade agreement note for the UK. */
  marketNote?: string;
}

export interface Company {
  name: string;
  legalName: string;
  founded: number;
  address: {
    street: string;
    area: string;
    city: string;
    region: string;
    postalCode: string;
    country: string;
    countryCode: string;
  };
  geo: { lat: number; lng: number };
  mapsUrl: string;
  email: string | null;
  emailTodo: string;
  phones: { name: string; role: string; display: string; e164: string; whatsapp: boolean }[];
  hours: { daysSchema: string[]; open: string; close: string; timezone: string };
}
