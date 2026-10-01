import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export function CtaBand({ title, text }: { title?: string; text?: string }) {
  const t = useTranslations("cta");
  return (
    <section className="bg-ore text-white">
      <div className="mx-auto flex max-w-7xl flex-col items-start gap-6 px-4 py-12 sm:px-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="font-display text-4xl tracking-wide">{title ?? t("title")}</h2>
          <p className="mt-2 max-w-2xl text-white/90">{text ?? t("text")}</p>
        </div>
        <Link
          href="/rfq"
          className="inline-flex shrink-0 items-center gap-2 rounded-md bg-ink px-6 py-3 font-semibold text-white hover:bg-ink-2"
        >
          {t("button")} <ArrowRight aria-hidden className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
