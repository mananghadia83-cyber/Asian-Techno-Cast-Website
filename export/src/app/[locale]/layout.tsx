import type { Metadata, Viewport } from "next";
import { Bebas_Neue, DM_Mono, DM_Sans } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { getCompany } from "@/lib/content";
import { organizationSchema } from "@/lib/schema";
import { SITE_URL } from "@/lib/site";
import "../globals.css";

// Fonts are downloaded at build time and served from our own domain,
// so visitors' browsers never contact Google (GDPR-friendly).
const bebas = Bebas_Neue({ weight: "400", subsets: ["latin"], variable: "--font-bebas", display: "swap" });
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans", display: "swap" });
const dmMono = DM_Mono({ weight: ["400", "500"], subsets: ["latin"], variable: "--font-dm-mono", display: "swap" });

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: t("defaultTitle"), template: "%s | Asian Technocast" },
    description: t("defaultDescription"),
    // Search Console verification token carried over from the current site.
    verification: { google: "AmNlCLY2O133MfN8TZ3oPd_LkFagVdvjbXVijooVpns" },
  };
}

export const viewport: Viewport = { themeColor: "#08090c" };

export default async function LocaleLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "common" });

  return (
    <html lang={locale} className={`${bebas.variable} ${dmSans.variable} ${dmMono.variable}`}>
      <body className="flex min-h-screen flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-ore focus:px-4 focus:py-2 focus:text-white"
        >
          {t("skip")}
        </a>
        <NextIntlClientProvider>
          <Header />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
        </NextIntlClientProvider>
        <JsonLd data={organizationSchema(getCompany())} />
      </body>
    </html>
  );
}
