import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Logo } from "./Logo";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { MobileMenu } from "./MobileMenu";

export const navItems = [
  { href: "/products", key: "products" },
  { href: "/materials", key: "materials" },
  { href: "/capabilities", key: "capabilities" },
  { href: "/quality", key: "quality" },
  { href: "/export-logistics", key: "export" },
  { href: "/industries", key: "industries" },
  { href: "/about", key: "about" },
  { href: "/contact", key: "contact" },
] as const;

export function Header() {
  const t = useTranslations("nav");
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-ink/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="/" aria-label={t("home")} className="shrink-0">
          <Logo tagline={t("tagline")} />
        </Link>

        <nav aria-label={t("main")} className="hidden xl:block">
          <ul className="flex items-center gap-4 whitespace-nowrap text-sm text-steel">
            {navItems.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="hover:text-ore">
                  {t(n.key)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <LocaleSwitcher className="hidden sm:flex" />
          <Link
            href="/rfq"
            className="hidden whitespace-nowrap rounded-md bg-ore px-4 py-2 text-sm font-semibold text-white hover:bg-ore-dark sm:inline-block"
          >
            {t("rfq")}
          </Link>

          <MobileMenu label={t("menu")}>
            <ul className="flex flex-col text-steel">
              {navItems.map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="block rounded px-3 py-2 hover:bg-white/10">
                    {t(n.key)}
                  </Link>
                </li>
              ))}
              <li className="mt-2">
                <Link
                  href="/rfq"
                  className="block rounded-md bg-ore px-3 py-2 text-center font-semibold text-white"
                >
                  {t("rfq")}
                </Link>
              </li>
            </ul>
            <LocaleSwitcher className="mt-3 justify-center border-t border-white/10 pt-3 sm:hidden" />
          </MobileMenu>
        </div>
      </div>
    </header>
  );
}
