import { useLocale } from "next-intl";
import type { Locale } from "@/i18n/routing";
import { formatQuantity } from "@/lib/units";
import type { FactValue as FV } from "@/lib/types";
import { RichText } from "./RichText";

export function FactValue({ value }: { value: FV }) {
  const locale = useLocale() as Locale;
  if (typeof value === "string") return <RichText text={value} />;
  const formatted = formatQuantity(value, locale);
  return formatted ? <>{formatted}</> : <RichText text={`[[TODO: ${value.todo}]]`} />;
}
