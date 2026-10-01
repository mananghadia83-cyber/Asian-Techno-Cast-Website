# Asian Technocast – export website

The export-focused website for US, UK and German buyers. It is built with Next.js, TypeScript and Tailwind CSS and hosted on Vercel.

| Market | URL | Grades shown first |
|---|---|---|
| United States (default) | `/` | ASTM, with mm + inches and kg + lb |
| United Kingdom | `/en-gb/…` | EN |
| Germany | `/de/…` | DIN EN (plus `/de/impressum`) |

---

## Editing text and products (no coding needed)

**All text lives in the `content/` folder.** Each language has its own folder with the same files:

```
content/
  company.json          ← address, phone numbers, WhatsApp, email, working hours (shared by all languages)
  en-US/                ← US English (main version, edit this first)
    home.json           ← home page: headline, key facts, industries, "why us"
    products.json       ← all product families and their specs
    materials.json      ← the IS / ASTM / EN grade table
    pages.json          ← Capabilities, Quality, Export, Industries, About, RFQ, Contact, Privacy
    ui.json             ← menu items, buttons, form labels
  en-GB/                ← same files, British spelling, EN grades first
  de/                   ← same files in German, plus the Impressum in pages.json
```

### The easiest way: edit on GitHub

1. Open the repository on github.com and go to `export/content/en-US/products.json` (for example).
2. Click the ✏️ pencil icon, change the text, then click **Commit changes**.
3. Vercel rebuilds the site automatically. The change is live in about a minute.

Only change text **between the quote marks** `"…"`. Keep commas, brackets and quote marks exactly as they are.
If something is wrong, Vercel stops the deploy and the old version stays online, so you can't break the live site by mistake.

### Placeholders

Anything written as `[[TODO: …]]` appears on the website as a yellow badge. To fill one in, replace the whole `[[TODO: …]]` with the real text:

```json
"value": "[[TODO: furnace type and capacity]]"      ← before
"value": "Induction furnace, 2 × 500 kg"            ← after
```

### Numbers with units (weights, capacity, sizes)

These are written as numbers so the site can convert them automatically. US visitors see `kg (lb)` and `mm (in)`:

```json
"weight": { "unit": "kg", "min": null, "max": null, "todo": "pump casing weight range, kg" }
```

Replace `null` with the number, for example `"min": 5, "max": 250`. For a single value use `"value": 40`.
Allowed units are `kg`, `mm`, `t` (metric tonnes) and `t/month`.

### Adding a photo

1. Put the image in `public/images/`, e.g. `public/images/moulding-line.jpg` (JPG, about 1600–2400 px wide).
2. In the content file, change `"src": null` to `"src": "/images/moulding-line.jpg"`.
3. Keep the `"alt"` text. It describes the photo for Google and for screen readers.

### Adding a product

Copy one whole product block `{ … }` in `products.json` (in **all three** language folders) and give it a new unique `"slug"`. The slug is the URL, e.g. `brake-drums` becomes `/products/brake-drums`. The product page, menu entries, sitemap and quote-form option are created automatically.
In `"grades"`, list grade ids from `materials.json` (`gl200`, `gl260`, `gl300`, `sg`).

### What is still missing

See **`TODO.md`**. Run `npm run todos` to list every remaining placeholder.

---

## Request a Quote form

- Drawings (PDF, STEP, IGES, DWG, DXF, Parasolid, SolidWorks, images, ZIP; up to 5 files × 25 MB) upload directly from the browser to a **private** Vercel Blob store.
- The server then emails the RFQ through **Resend**, with the drawings attached. Files that are too big to attach (over 35 MB in total) are listed by name. Download them from Vercel → Storage → Blob → `rfq/`.
- "Reply" in your mail program goes straight to the customer.
- Spam protection: Cloudflare Turnstile, a hidden honeypot field, and a minimum fill time.
- With no email keys set (local development), submissions are printed to the terminal instead of being emailed.

## Privacy

There are no analytics and no cookies, so there is no cookie banner. Fonts are self-hosted. Google Maps loads only after a click.
If you add analytics later, use a cookieless tool (e.g. Vercel Web Analytics), or add a consent banner and update the privacy policy.

---

## For developers

```bash
cd export
npm install
cp .env.example .env.local   # optional; the form works in dev without keys
npm run dev                  # http://localhost:3000
npm run build                # production build (also validates content files)
npm run lint && npm run typecheck
npm run todos                # list placeholders
```

- Routing and locales: `src/i18n/routing.ts` (next-intl, prefixes `/en-gb`, `/de`, no locale cookie, no auto-redirect)
- Page code: `src/app/[locale]/…`. Most pages are rendered from `pages.json` by `src/components/GenericPage.tsx`.
- SEO: `src/lib/seo.ts` (canonical + hreflang), `src/lib/schema.ts` (schema.org Organization / Product), `src/app/sitemap.ts`, `src/app/robots.ts`
- Unit conversion: `src/lib/units.ts`. IST → US Eastern hours: `src/lib/hours.ts`
- Content types: `src/lib/types.ts`

### Deploying to Vercel

1. In Vercel, **Add New → Project**, import this GitHub repository and set **Root Directory** to `export`.
2. Add the environment variables from `.env.example`.
3. Storage → **Create Blob store** (private) → connect it to the project.
4. Domains: the canonical domain is `https://www.asiantechnocast.com`. Today that domain serves the Indian site (`index.html` at the repo root). Until you move the domain over, set `NEXT_PUBLIC_SITE_URL` to the address this site is actually served from, so canonical URLs and the sitemap match.
