import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { Container } from "@/components/Container";
import { CtaBand } from "@/components/CtaBand";
import { GradeTable } from "@/components/GradeTable";
import { PageHeader } from "@/components/PageHeader";
import { Sections } from "@/components/Sections";
import { getMaterials } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[locale]/materials">): Promise<Metadata> {
  const locale = (await params).locale as Locale;
  return pageMetadata(locale, "/materials", (await getMaterials(locale)).seo);
}

export default async function MaterialsPage({ params }: PageProps<"/[locale]/materials">) {
  const locale = (await params).locale as Locale;
  setRequestLocale(locale);
  const m = await getMaterials(locale);
  return (
    <>
      <PageHeader eyebrow={m.eyebrow} title={m.title} intro={m.intro} />
      <Container className="py-14">
        <GradeTable materials={m} />
      </Container>
      <div className="[&>section:first-child]:bg-paper">
        <Sections sections={m.sections} />
      </div>
      <CtaBand />
    </>
  );
}
