import type { Locale } from "@/i18n/routing";
import type { Quantity } from "./types";

const KG_TO_LB = 2.20462;
const MM_TO_IN = 1 / 25.4;

/** US visitors also see imperial values; UK and German pages stay metric. */
export const showsImperial = (locale: Locale) => locale === "en-US";

function fmt(n: number, locale: Locale, maxFractionDigits = 2) {
  return new Intl.NumberFormat(locale, { maximumFractionDigits: maxFractionDigits }).format(n);
}

function roundImperial(n: number) {
  if (n >= 100) return Math.round(n);
  if (n >= 10) return Math.round(n * 10) / 10;
  return Math.round(n * 1000) / 1000;
}

const unitLabel: Record<Locale, Record<Quantity["unit"], string>> = {
  "en-US": { kg: "kg", mm: "mm", t: "metric tons", "t/month": "metric tons/month" },
  "en-GB": { kg: "kg", mm: "mm", t: "tonnes", "t/month": "tonnes/month" },
  de: { kg: "kg", mm: "mm", t: "t", "t/month": "t/Monat" },
};

function span(min: number | null | undefined, max: number | null | undefined, value: number | null | undefined) {
  if (value != null) return [value];
  if (min != null && max != null) return [min, max];
  if (max != null) return [max];
  if (min != null) return [min];
  return null;
}

/**
 * Formats a quantity for display, e.g. "5–120 kg (11–265 lb)" on US pages.
 * Returns null when the number has not been filled in yet.
 */
export function formatQuantity(q: Quantity, locale: Locale): string | null {
  const nums = span(q.min, q.max, q.value);
  if (!nums) return null;
  const dash = "–";
  const prefix = q.prefix ? `${q.prefix}` : "";
  const metric = `${prefix}${nums.map((n) => fmt(n, locale)).join(dash)} ${unitLabel[locale][q.unit]}`;

  if (!showsImperial(locale)) return metric;

  if (q.unit === "kg") {
    const lb = nums.map((n) => fmt(roundImperial(n * KG_TO_LB), locale, 3)).join(dash);
    return `${metric} (${prefix}${lb} lb)`;
  }
  if (q.unit === "mm") {
    const inch = nums.map((n) => fmt(roundImperial(n * MM_TO_IN), locale, 3)).join(dash);
    return `${metric} (${prefix}${inch} in)`;
  }
  if (q.unit === "t" || q.unit === "t/month") {
    // 1 metric ton = 1.10231 US short tons
    const st = nums.map((n) => fmt(Math.round(n * 1.10231), locale, 0)).join(dash);
    return `${metric} (≈${st} short tons${q.unit === "t/month" ? "/month" : ""})`;
  }
  return metric;
}
