import { MessageCircle, Phone, MapPin, Mail, Clock } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { getCompany } from "@/lib/content";
import { officeHours } from "@/lib/hours";
import { Logo } from "./Logo";
import { RichText } from "./RichText";
import { navItems } from "./Header";

export function Footer() {
  const t = useTranslations();
  const locale = useLocale() as Locale;
  const c = getCompany();
  const h = officeHours(c.hours.open, c.hours.close, locale);

  return (
    <footer className="bg-ink text-steel">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <Logo tagline={t("nav.tagline")} />
          <p className="mt-4 text-sm text-fog">{t("footer.blurb")}</p>
        </div>

        <div>
          <h2 className="font-display text-xl tracking-wide text-paper">{t("footer.pages")}</h2>
          <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1.5 text-sm">
            {navItems.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="hover:text-ore">
                  {t(`nav.${n.key}`)}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/rfq" className="hover:text-ore">
                {t("nav.rfq")}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="font-display text-xl tracking-wide text-paper">{t("footer.contact")}</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {c.phones.map((p) => (
              <li key={p.e164} className="flex flex-wrap items-center gap-x-2">
                <Phone aria-hidden className="h-4 w-4 text-ore" />
                <a href={`tel:${p.e164}`} className="hover:text-ore">
                  {p.display}
                </a>
                <span className="text-fog">({p.name})</span>
                {p.whatsapp && (
                  <a
                    href={`https://wa.me/${p.e164.replace(/\D/g, "")}`}
                    className="inline-flex items-center gap-1 text-xs text-fog hover:text-ore"
                    rel="noopener"
                  >
                    <MessageCircle aria-hidden className="h-3.5 w-3.5" /> WhatsApp
                  </a>
                )}
              </li>
            ))}
            <li className="flex items-center gap-2">
              <Mail aria-hidden className="h-4 w-4 text-ore" />
              {c.email ? (
                <a href={`mailto:${c.email}`} className="hover:text-ore">
                  {c.email}
                </a>
              ) : (
                <RichText text={`[[TODO: ${c.emailTodo}]]`} />
              )}
            </li>
            <li className="flex gap-2">
              <Clock aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-ore" />
              <span>
                {t("common.days")} {h.ist} IST
                <br />
                <span className="text-fog">
                  = {h.edt} ET ({t("common.summer")}) / {h.est} ET ({t("common.winter")})
                </span>
              </span>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="font-display text-xl tracking-wide text-paper">{t("footer.address")}</h2>
          <address className="mt-3 flex gap-2 text-sm not-italic">
            <MapPin aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-ore" />
            <span>
              {c.legalName}
              <br />
              {c.address.street}, {c.address.area}
              <br />
              {c.address.city} {c.address.postalCode}, {c.address.region}
              <br />
              {c.address.country}
            </span>
          </address>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-5 text-xs text-fog sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>
            © {new Date().getFullYear()} {c.legalName}. {t("footer.since", { year: c.founded })}
          </p>
          <ul className="flex gap-4">
            <li>
              <Link href="/privacy" className="hover:text-ore">
                {t("footer.privacy")}
              </Link>
            </li>
            <li>
              <Link href="/impressum" locale="de" hrefLang="de" className="hover:text-ore">
                Impressum
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
