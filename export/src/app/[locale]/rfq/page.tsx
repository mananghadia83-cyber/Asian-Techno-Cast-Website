import { Clock } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { Container } from "@/components/Container";
import { PageHeader } from "@/components/PageHeader";
import { RfqForm } from "@/components/RfqForm";
import { RichText } from "@/components/RichText";
import { getMaterials, getPage, getProducts } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[locale]/rfq">): Promise<Metadata> {
  const locale = (await params).locale as Locale;
  const page = await getPage(locale, "rfq");
  return page ? pageMetadata(locale, "/rfq", page.seo) : {};
}

export default async function RfqPage({ params }: PageProps<"/[locale]/rfq">) {
  const locale = (await params).locale as Locale;
  setRequestLocale(locale);
  const [page, products, materials, t] = await Promise.all([
    getPage(locale, "rfq"),
    getProducts(locale),
    getMaterials(locale),
    getTranslations("rfq"),
  ]);
  if (!page) notFound();
  const lead = materials.order[0];

  return (
    <>
      <PageHeader eyebrow={page.eyebrow} title={page.title} intro={page.intro}>
        <p className="mt-6 inline-flex items-start gap-2 rounded-md bg-white/10 px-4 py-3 text-sm text-paper">
          <Clock aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-ore" />
          {t("replyTime")}
        </p>
      </PageHeader>
      <Container className="grid gap-12 py-14 lg:grid-cols-[1.6fr_1fr]">
        <RfqForm
          products={products.products.map((p) => ({ value: p.slug, label: p.name }))}
          grades={materials.rows.map((r) => ({
            value: r.id,
            label: `${r[lead]} (${materials.order.slice(1).map((c) => r[c]).join(" / ")})`,
          }))}
          turnstileSiteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
        />
        <aside className="space-y-4 text-sm">
          {page.sections.map((s) => (
            <div key={s.title} className="rounded-lg border border-steel bg-paper p-5">
              <h2 className="font-semibold text-ink">{s.title}</h2>
              {s.list && (
                <ul className="mt-2 list-disc space-y-1 pl-5 text-mist">
                  {s.list.map((li, i) => (
                    <li key={i}>
                      <RichText text={li} />
                    </li>
                  ))}
                </ul>
              )}
              {s.paragraphs?.map((p, i) => (
                <p key={i} className="mt-2 text-mist">
                  <RichText text={p} />
                </p>
              ))}
            </div>
          ))}
        </aside>
      </Container>
    </>
  );
}
