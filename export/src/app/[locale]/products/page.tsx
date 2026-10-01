import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { Container } from "@/components/Container";
import { CtaBand } from "@/components/CtaBand";
import { FactValue } from "@/components/FactValue";
import { ImageSlot } from "@/components/ImageSlot";
import { PageHeader } from "@/components/PageHeader";
import { getMaterials, getProducts } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[locale]/products">): Promise<Metadata> {
  const locale = (await params).locale as Locale;
  return pageMetadata(locale, "/products", (await getProducts(locale)).seo);
}

export default async function ProductsPage({ params }: PageProps<"/[locale]/products">) {
  const locale = (await params).locale as Locale;
  setRequestLocale(locale);
  const [data, materials, t] = await Promise.all([
    getProducts(locale),
    getMaterials(locale),
    getTranslations("product"),
  ]);
  const lead = materials.order[0];

  return (
    <>
      <PageHeader eyebrow={data.eyebrow} title={data.title} intro={data.intro} />
      <Container className="py-14">
        <ul className="grid gap-6 md:grid-cols-2">
          {data.products.map((p) => {
            const grades = p.grades
              .map((id) => materials.rows.find((r) => r.id === id)?.[lead])
              .filter(Boolean);
            return (
              <li key={p.slug} className="overflow-hidden rounded-lg border border-steel bg-white">
                <ImageSlot image={p.image} className="aspect-[16/9] w-full rounded-none border-0 border-b" />
                <div className="p-6">
                  <h2 className="font-display text-3xl tracking-wide text-ink">
                    <Link href={`/products/${p.slug}`} className="hover:text-ore">
                      {p.name}
                    </Link>
                  </h2>
                  <p className="mt-2 text-mist">{p.summary}</p>
                  <dl className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
                    <div>
                      <dt className="font-mono text-xs uppercase tracking-wider text-fog">{t("grades")}</dt>
                      <dd className="font-mono">{grades.join(", ") || "—"}</dd>
                    </div>
                    <div>
                      <dt className="font-mono text-xs uppercase tracking-wider text-fog">{t("weight")}</dt>
                      <dd>
                        <FactValue value={p.weight} />
                      </dd>
                    </div>
                  </dl>
                  <Link
                    href={`/products/${p.slug}`}
                    className="mt-5 inline-flex items-center gap-1 font-semibold text-ore hover:underline"
                  >
                    {t("details")} <ArrowRight aria-hidden className="h-4 w-4" />
                  </Link>
                </div>
              </li>
            );
          })}
        </ul>
      </Container>
      <CtaBand />
    </>
  );
}
