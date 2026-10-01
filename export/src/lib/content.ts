import "server-only";
import type { Locale } from "@/i18n/routing";
import type {
  Company,
  HomeFile,
  MaterialsFile,
  Page,
  ProductsFile,
} from "./types";
import company from "../../content/company.json";

export type PageKey =
  | "capabilities"
  | "quality"
  | "export-logistics"
  | "industries"
  | "about"
  | "rfq"
  | "contact"
  | "privacy"
  | "impressum";

type PagesFile = Partial<Record<PageKey, Page>>;

interface LocaleContent {
  home: HomeFile;
  products: ProductsFile;
  materials: MaterialsFile;
  pages: PagesFile;
}

async function load(locale: Locale): Promise<LocaleContent> {
  const [home, products, materials, pages] = await Promise.all([
    import(`../../content/${locale}/home.json`),
    import(`../../content/${locale}/products.json`),
    import(`../../content/${locale}/materials.json`),
    import(`../../content/${locale}/pages.json`),
  ]);
  return {
    home: home.default,
    products: products.default,
    materials: materials.default,
    pages: pages.default,
  };
}

export const getCompany = (): Company => company as Company;
export const getHome = async (l: Locale) => (await load(l)).home;
export const getProducts = async (l: Locale) => (await load(l)).products;
export const getMaterials = async (l: Locale) => (await load(l)).materials;

export async function getProduct(l: Locale, slug: string) {
  return (await getProducts(l)).products.find((p) => p.slug === slug);
}

export async function getPage(l: Locale, key: PageKey) {
  return (await load(l)).pages[key];
}
