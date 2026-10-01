import { ArrowRight, FileText } from "lucide-react";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { Container, SectionTitle } from "@/components/Container";
import { CtaBand } from "@/components/CtaBand";
import { FactGrid } from "@/components/FactGrid";
import { ImageSlot } from "@/components/ImageSlot";
import { RichText } from "@/components/RichText";
import { getHome, getProducts } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[locale]">): Promise<Metadata> {
  const locale = (await params).locale as Locale;
  const home = await getHome(locale);
  return pageMetadata(locale, "/", home.seo);
}

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const locale = (await params).locale as Locale;
  setRequestLocale(locale);
  const [home, products, t] = await Promise.all([
    getHome(locale),
    getProducts(locale),
    getTranslations("home"),
  ]);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-ink text-paper">
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(#d8e2ed_1px,transparent_1px),linear-gradient(90deg,#d8e2ed_1px,transparent_1px)] [background-size:48px_48px]"
        />
        <Container className="relative grid gap-10 py-16 md:py-24 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-ore">{home.eyebrow}</p>
            <h1 className="mt-4 font-display text-5xl leading-[0.95] tracking-wide sm:text-6xl lg:text-7xl">
              {home.headline}
            </h1>
            <p className="mt-6 max-w-xl text-lg text-steel">
              <RichText text={home.subhead} />
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/rfq"
                className="inline-flex items-center gap-2 rounded-md bg-ore px-6 py-3 font-semibold text-white hover:bg-ore-dark"
              >
                <FileText aria-hidden className="h-4 w-4" /> {t("ctaPrimary")}
              </Link>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 rounded-md border border-steel/40 px-6 py-3 font-semibold text-paper hover:border-ore hover:text-ore"
              >
                {t("ctaSecondary")} <ArrowRight aria-hidden className="h-4 w-4" />
              </Link>
            </div>
            {home.marketNote && (
              <p className="mt-6 text-sm text-fog">
                <RichText text={home.marketNote} />
              </p>
            )}
          </div>
          <ImageSlot image={home.heroImage} priority className="aspect-[4/3] w-full !bg-ink-2 !text-steel" />
        </Container>
      </section>

      {/* Key facts */}
      <section className="bg-ink-2 py-12">
        <Container>
          <h2 className="sr-only">{t("factsTitle")}</h2>
          <FactGrid facts={home.facts} dark />
        </Container>
      </section>

      {/* Products */}
      <section className="py-16">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <SectionTitle>{home.productsTitle}</SectionTitle>
              <p className="mt-2 max-w-2xl text-mist">{home.productsIntro}</p>
            </div>
            <Link href="/products" className="inline-flex items-center gap-1 font-semibold text-ore hover:underline">
              {t("allProducts")} <ArrowRight aria-hidden className="h-4 w-4" />
            </Link>
          </div>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {products.products.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/products/${p.slug}`}
                  className="group flex h-full flex-col rounded-lg border border-steel bg-white p-5 transition hover:border-ore hover:shadow-md"
                >
                  <h3 className="font-display text-2xl tracking-wide text-ink group-hover:text-ore">{p.name}</h3>
                  <p className="mt-2 flex-1 text-sm text-mist">{p.summary}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-ore">
                    {t("viewSpecs")} <ArrowRight aria-hidden className="h-4 w-4" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Industries */}
      <section className="bg-paper py-16">
        <Container>
          <SectionTitle>{home.industriesTitle}</SectionTitle>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {home.industries.map((c) => (
              <li key={c.title} className="rounded-lg border border-steel bg-white p-5">
                <h3 className="font-semibold text-ink">{c.title}</h3>
                <p className="mt-1.5 text-sm text-mist">
                  <RichText text={c.text} />
                </p>
              </li>
            ))}
          </ul>
          <Link href="/industries" className="mt-6 inline-flex items-center gap-1 font-semibold text-ore hover:underline">
            {t("allIndustries")} <ArrowRight aria-hidden className="h-4 w-4" />
          </Link>
        </Container>
      </section>

      {/* Why buyers work with us */}
      <section className="py-16">
        <Container>
          <SectionTitle>{home.whyTitle}</SectionTitle>
          <ul className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {home.why.map((c) => (
              <li key={c.title} className="border-l-4 border-ore bg-white pl-4">
                <h3 className="font-semibold text-ink">
                  {c.href ? (
                    <Link href={c.href} className="hover:text-ore">
                      {c.title}
                    </Link>
                  ) : (
                    c.title
                  )}
                </h3>
                <p className="mt-1 text-sm text-mist">
                  <RichText text={c.text} />
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <CtaBand title={home.ctaTitle} text={home.ctaText} />
    </>
  );
}
