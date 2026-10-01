import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { getPage, type PageKey } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { CtaBand } from "./CtaBand";
import { ImageSlot } from "./ImageSlot";
import { PageHeader } from "./PageHeader";
import { Sections } from "./Sections";
import { Container } from "./Container";

type Params = { params: Promise<{ locale: string }> };

/**
 * Builds a standard content page (header + sections + quote banner) from
 * content/<locale>/pages.json. Used by Capabilities, Quality, Export, etc.
 */
export function makeContentPage(
  key: PageKey,
  path: string,
  opts: { only?: Locale[]; cta?: boolean } = {},
) {
  async function generateMetadata({ params }: Params): Promise<Metadata> {
    const locale = (await params).locale as Locale;
    const page = await getPage(locale, key);
    if (!page) return {};
    return pageMetadata(locale, path, page.seo, opts.only);
  }

  async function ContentPage({ params }: Params) {
    const locale = (await params).locale as Locale;
    if (opts.only && !opts.only.includes(locale)) notFound();
    setRequestLocale(locale);
    const page = await getPage(locale, key);
    if (!page) notFound();
    return (
      <>
        <PageHeader eyebrow={page.eyebrow} title={page.title} intro={page.intro} />
        {page.image && (
          <Container className="pt-10">
            <ImageSlot image={page.image} className="aspect-[21/9] w-full" />
          </Container>
        )}
        <Sections sections={page.sections} />
        {opts.cta !== false && <CtaBand />}
      </>
    );
  }

  return { generateMetadata, ContentPage };
}
