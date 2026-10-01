import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Skip API routes, Next internals and files with an extension
  // (sitemap.xml, robots.txt, images, favicon).
  matcher: "/((?!api|_next|_vercel|.*\\..*).*)",
};
