import { CheckCircle2 } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { Container, SectionTitle } from "@/components/Container";
import { CtaBand } from "@/components/CtaBand";
import { FactValue } from "@/components/FactValue";
import { GradeTable } from "@/components/GradeTable";
import { ImageSlot } from "@/components/ImageSlot";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { RichText } from "@/components/RichText";
import { getCompany, getMaterials, getProduct, getProducts } from "@/lib/content";
import { productSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

type Props = PageProps<"/[locale]/products/[slug]">;

export async function generateStaticParams() {
  const params = [];
  for (const locale of routing.locales) {
    for (const p of (await getProducts(locale)).products) params.push({ locale, slug: p.slug });
  }
  return params;
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const product = await getProduct(locale as Locale, slug);
  if (!product) return {};
  return pageMetadata(locale as Locale, `/products/${slug}`, product.seo);
}

export default async function ProductPage({ params }: Props) {
  const { locale: l, slug } = await params;
  const locale = l as Locale;
  setRequestLocale(locale);
  const [product, materials, t] = await Promise.all([
    getProduct(locale, slug),
    getMaterials(locale),
    getTranslations("product"),
  ]);
  if (!product) notFound();
  const grades = product.grades
    .map((id) => materials.rows.find((r) => r.id === id))
    .filter((r) => r !== undefined);

  const specRow = (label: string, value: React.ReactNode) => (
    <div className="grid gap-1 border-t border-steel py-4 sm:grid-cols-[200px_1fr] sm:gap-6">
      <dt className="font-mono text-xs uppercase tracking-wider text-mist">{label}</dt>
      <dd>{value}</dd>
    </div>
  );

  return (
    <>
      <PageHeader eyebrow={t("eyebrow")} title={product.name} intro={product.intro}>
        <Link
          href={{ pathname: "/rfq", query: { product: product.slug } }}
          className="mt-8 inline-block rounded-md bg-ore px-6 py-3 font-semibold text-white hover:bg-ore-dark"
        >
          {t("quoteThis")}
        </Link>
      </PageHeader>

      <Container className="grid gap-10 py-14 lg:grid-cols-[1.3fr_1fr] lg:items-start">
        <div className="min-w-0">
          <SectionTitle>{t("specs")}</SectionTitle>
          <dl className="mt-6 border-b border-steel">
            {product.sizeRanges?.map((s) =>
              specRow(
                s.label,
                <span className="font-semibold">
                  <FactValue value={s.value} />
                  {s.note && (
                    <span className="block text-sm font-normal text-mist">
                      <RichText text={s.note} />
                    </span>
                  )}
                </span>,
              ),
            )}
            {specRow(
              t("grades"),
              <span className="font-mono">
                {grades.map((g) => g[materials.order[0]]).join(" · ")}
                {product.gradeNote && (
                  <span className="mt-1 block font-sans text-sm text-mist">
                    <RichText text={product.gradeNote} />
                  </span>
                )}
              </span>,
            )}
            {specRow(t("weight"), <FactValue value={product.weight} />)}
            {specRow(
              t("machining"),
              <ul className="space-y-1">
                {product.machining.map((m, i) => (
                  <li key={i}>
                    <RichText text={m} />
                  </li>
                ))}
              </ul>,
            )}
            {specRow(t("tolerances"), <FactValue value={product.tolerances} />)}
            {specRow(
              t("applications"),
              <ul className="space-y-1">
                {product.applications.map((a, i) => (
                  <li key={i} className="flex gap-2">
                    <CheckCircle2 aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-ore" />
                    <RichText text={a} />
                  </li>
                ))}
              </ul>,
            )}
          </dl>
          {product.notes && (
            <ul className="mt-6 space-y-2 text-sm text-mist">
              {product.notes.map((n, i) => (
                <li key={i}>
                  <RichText text={n} />
                </li>
              ))}
            </ul>
          )}
        </div>
        <ImageSlot image={product.image} priority className="aspect-[4/3] w-full min-w-0 self-start lg:sticky lg:top-24" />
      </Container>

      {grades.length > 0 && (
        <section className="bg-paper py-14">
          <Container>
            <SectionTitle>{t("gradeTable")}</SectionTitle>
            <div className="mt-6">
              <GradeTable materials={materials} ids={product.grades} />
            </div>
            <Link href="/materials" className="mt-4 inline-block font-semibold text-ore hover:underline">
              {t("allGrades")}
            </Link>
          </Container>
        </section>
      )}

      <CtaBand />
      <JsonLd data={productSchema(locale, product, grades, getCompany())} />
    </>
  );
}
