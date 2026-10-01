"use client";

import { useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { locales } from "@/i18n/routing";

const labels: Record<string, { short: string; long: string }> = {
  "en-US": { short: "US", long: "English (US)" },
  "en-GB": { short: "UK", long: "English (UK)" },
  de: { short: "DE", long: "Deutsch" },
};

export function LocaleSwitcher({ className = "" }: { className?: string }) {
  const current = useLocale();
  const pathname = usePathname();
  // The Impressum only exists in German.
  const target = pathname === "/impressum" ? "/" : pathname;

  return (
    <ul className={`flex items-center gap-1 font-mono text-xs ${className}`}>
      {locales.map((l) => (
        <li key={l}>
          <Link
            href={l === "de" ? pathname : target}
            locale={l}
            hrefLang={l}
            aria-label={labels[l].long}
            aria-current={l === current ? "true" : undefined}
            className={`rounded px-2 py-1 transition-colors ${
              l === current ? "bg-ore text-white" : "text-steel hover:bg-white/10"
            }`}
          >
            {labels[l].short}
          </Link>
        </li>
      ))}
    </ul>
  );
}
