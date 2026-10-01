import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function NotFound() {
  const t = useTranslations("notFound");
  return (
    <div className="mx-auto max-w-3xl px-4 py-24 text-center">
      <p className="font-mono text-sm text-ore">404</p>
      <h1 className="mt-2 font-display text-5xl tracking-wide text-ink">{t("title")}</h1>
      <p className="mt-4 text-mist">{t("text")}</p>
      <Link href="/" className="mt-8 inline-block rounded-md bg-ore px-5 py-2.5 font-semibold text-white">
        {t("home")}
      </Link>
    </div>
  );
}
