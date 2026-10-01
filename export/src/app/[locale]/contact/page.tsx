import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { Container, SectionTitle } from "@/components/Container";
import { MapEmbed } from "@/components/MapEmbed";
import { PageHeader } from "@/components/PageHeader";
import { RichText } from "@/components/RichText";
import { Sections } from "@/components/Sections";
import { getCompany, getPage } from "@/lib/content";
import { officeHours } from "@/lib/hours";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[locale]/contact">): Promise<Metadata> {
  const locale = (await params).locale as Locale;
  const page = await getPage(locale, "contact");
  return page ? pageMetadata(locale, "/contact", page.seo) : {};
}

export default async function ContactPage({ params }: PageProps<"/[locale]/contact">) {
  const locale = (await params).locale as Locale;
  setRequestLocale(locale);
  const [page, t] = await Promise.all([getPage(locale, "contact"), getTranslations("contact")]);
  if (!page) notFound();
  const c = getCompany();
  const h = officeHours(c.hours.open, c.hours.close, locale);
  const tc = await getTranslations("common");

  return (
    <>
      <PageHeader eyebrow={page.eyebrow} title={page.title} intro={page.intro} />
      <Container className="grid gap-10 py-14 lg:grid-cols-2">
        <div className="space-y-8">
          <div>
            <SectionTitle>{t("phone")}</SectionTitle>
            <ul className="mt-4 space-y-4">
              {c.phones.map((p) => (
                <li key={p.e164} className="rounded-lg border border-steel p-4">
                  <p className="font-semibold text-ink">{p.name}</p>
                  <p className="text-sm text-mist">
                    <RichText text={p.role} />
                  </p>
                  <div className="mt-3 flex flex-wrap gap-3">
                    <a
                      href={`tel:${p.e164}`}
                      className="inline-flex items-center gap-2 rounded-md bg-ink px-4 py-2 text-sm font-semibold text-white hover:bg-ink-2"
                    >
                      <Phone aria-hidden className="h-4 w-4" /> {p.display}
                    </a>
                    {p.whatsapp && (
                      <a
                        href={`https://wa.me/${p.e164.replace(/\D/g, "")}`}
                        rel="noopener"
                        className="inline-flex items-center gap-2 rounded-md border border-[#25D366] px-4 py-2 text-sm font-semibold text-[#128C7E] hover:bg-[#25D366]/10"
                      >
                        <MessageCircle aria-hidden className="h-4 w-4" /> WhatsApp
                      </a>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <SectionTitle>{t("email")}</SectionTitle>
            <p className="mt-3 flex items-center gap-2">
              <Mail aria-hidden className="h-5 w-5 text-ore" />
              {c.email ? (
                <a href={`mailto:${c.email}`} className="font-semibold text-ink hover:text-ore">
                  {c.email}
                </a>
              ) : (
                <RichText text={`[[TODO: ${c.emailTodo}]]`} />
              )}
            </p>
            <p className="mt-2 text-sm text-mist">
              {t("rfqHint")}{" "}
              <Link href="/rfq" className="font-semibold text-ore hover:underline">
                {t("rfqLink")}
              </Link>
            </p>
          </div>

          <div>
            <SectionTitle>{t("hours")}</SectionTitle>
            <div className="mt-3 flex gap-2">
              <Clock aria-hidden className="mt-1 h-5 w-5 shrink-0 text-ore" />
              <table className="text-sm">
                <tbody>
                  <tr>
                    <th scope="row" className="pr-4 text-left font-normal text-mist">
                      {t("india")}
                    </th>
                    <td className="font-semibold">
                      {tc("days")} {h.ist} IST
                    </td>
                  </tr>
                  <tr>
                    <th scope="row" className="pr-4 text-left font-normal text-mist">
                      {t("usEastern")} ({tc("summer")})
                    </th>
                    <td>{h.edt} EDT</td>
                  </tr>
                  <tr>
                    <th scope="row" className="pr-4 text-left font-normal text-mist">
                      {t("usEastern")} ({tc("winter")})
                    </th>
                    <td>{h.est} EST</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-2 text-sm text-mist">{t("overlap")}</p>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <SectionTitle>{t("address")}</SectionTitle>
            <address className="mt-3 flex gap-2 not-italic">
              <MapPin aria-hidden className="mt-1 h-5 w-5 shrink-0 text-ore" />
              <span>
                <strong>{c.legalName}</strong>
                <br />
                {c.address.street}, {c.address.area}
                <br />
                {c.address.city} {c.address.postalCode}, {c.address.region}, {c.address.country}
              </span>
            </address>
            <a
              href={c.mapsUrl}
              rel="noopener"
              target="_blank"
              className="mt-2 inline-block text-sm font-semibold text-ore hover:underline"
            >
              {t("openMaps")}
            </a>
          </div>
          <MapEmbed
            query={`${c.legalName}, ${c.address.street}, ${c.address.area}, ${c.address.city}`}
            title={t("mapTitle")}
            loadLabel={t("loadMap")}
            consentText={t("mapConsent")}
          />
        </div>
      </Container>
      {page.sections.length > 0 && <Sections sections={page.sections} />}
    </>
  );
}
