import type { Locale } from "@/i18n/routing";

/** IST is UTC+5:30 all year; US Eastern is UTC−4 (EDT, summer) or UTC−5 (EST, winter). */
const IST_OFFSET_MIN = 330;
const EDT_OFFSET_MIN = -240;
const EST_OFFSET_MIN = -300;

function toMinutes(hhmm: string) {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

function fmt(minutes: number, locale: Locale) {
  const m = ((minutes % 1440) + 1440) % 1440;
  const d = new Date(Date.UTC(2000, 0, 1, Math.floor(m / 60), m % 60));
  return new Intl.DateTimeFormat(locale, {
    hour: "numeric",
    minute: "2-digit",
    hour12: locale === "en-US",
    timeZone: "UTC",
  }).format(d);
}

/** Office hours in IST plus the US Eastern equivalent for summer and winter time. */
export function officeHours(open: string, close: string, locale: Locale) {
  const o = toMinutes(open);
  const c = toMinutes(close);
  const shift = (offset: number) => (t: number) => t - IST_OFFSET_MIN + offset;
  const edt = shift(EDT_OFFSET_MIN);
  const est = shift(EST_OFFSET_MIN);
  return {
    ist: `${fmt(o, locale)}–${fmt(c, locale)}`,
    edt: `${fmt(edt(o), locale)}–${fmt(edt(c), locale)}`,
    est: `${fmt(est(o), locale)}–${fmt(est(c), locale)}`,
  };
}
