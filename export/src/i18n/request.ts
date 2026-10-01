import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  return {
    locale,
    // Interface text (menus, buttons, form labels) lives next to the page
    // content in content/<locale>/ui.json so all text for a language is in
    // one folder.
    messages: (await import(`../../content/${locale}/ui.json`)).default,
  };
});
