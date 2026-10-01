# TODO – facts, photos and setup still needed

Every placeholder appears on the website as a yellow **TODO** badge, so nothing unfinished can go live unnoticed.
Fill in the **US English** files first (`content/en-US/`). Then copy the same facts into `content/en-GB/` and `content/de/`.
The same fields exist in all three languages.

To get an up-to-date list at any time, run `npm run todos` (or `npm run todos -- --locale=de` for one language).

---

## 1. Facts to confirm before launch (priority)

These numbers drive buyers' first decision. Please send real figures, not estimates.

- [ ] **Casting weight range** (min–max kg, overall and per product family)
- [ ] **Monthly capacity** (tonnes of good castings per month)
- [ ] **Melting:** furnace type, number of furnaces, capacity per heat
- [ ] **Moulding process:** green sand / no-bake / other; machine or hand moulding; largest box size
- [ ] **Machining:** number of CNC lathes and VMCs, max turning diameter, VMC table size and travel
- [ ] **Painting / coating:** shot blasting, primer and paint types offered
- [ ] **Lab equipment:** spectrometer, UTM, hardness tester, microscope, CMM (in-house or external lab?)
- [ ] **Certifications:** ISO 9001 or others. Only add these once you have the certificate number and the certifying body.
- [ ] **Documents:** confirm MTC, dimensional report, FAI/PPAP; is an EN 10204 3.1 certificate possible?
- [ ] **Tolerances** you can hold (as-cast per ISO 8062 CT grade; machined bores)
- [ ] **Lead times:** pattern/tooling, samples, production, sea transit to US East Coast / Hamburg / UK
- [ ] **Shipping:** FCL and/or LCL; corrosion protection for machined surfaces
- [ ] **Payment terms:** confirm LC and advance + balance; any others
- [ ] **Pressure / leak testing** for pump casings and cylinder heads: offered? at what pressure?
- [ ] **Reverse engineering from a customer sample:** offered?
- [ ] **Grades for automotive castings**
- [ ] **Team:** roles and short bios for Alpesh Ghadia and Sandeep Ghadia; number of employees; key staff
- [ ] **Company story:** milestones since 2006
- [ ] **Distance / transit time** from the foundry to Mundra and Pipavav ports
- [ ] **Working hours:** Mon–Sat 09:00–18:00 IST was taken from the current site. Please confirm.
- [ ] **Map pin:** the contact-page map searches for the address. Check that the pin lands on the foundry. If you have a Google Business Profile, put its link in `content/company.json` → `mapsUrl`.
- [ ] **Reference customers** (optional, and only with their permission)

## 2. Material standard to check

- [ ] The brief listed ductile iron as **"IS 1536"**. IS 1536 is the Indian standard for *centrifugally cast iron pressure pipes*. The Indian standard for SG/ductile iron castings is **IS 1865**, so the site currently shows **IS 1865 (SG iron)**. Please confirm with your metallurgist.
- [ ] Confirm the grade mapping for each product (taken from the brief's "Typical use" column).

## 3. Market-specific items

- [ ] **UK:** confirm the wording on the India–UK trade agreement (CETA) and the duty on iron castings. The placeholder is on the UK home page and the UK Export page.
- [ ] **Germany: Impressum** (`content/de/pages.json` → `impressum`). You need: full legal name and entity type, authorised representatives, registration number (CIN or partnership registration), GSTIN, IEC, EU VAT ID if any, and the person responsible for content. **Have a German lawyer or service check it before launch.**
- [ ] **Germany: native-speaker review** of every text in `content/de/`. The translation is careful but was not written by a native speaker.
- [ ] **Privacy policy:** publication date, controller details, retention period for drawings, business email provider. A legal review is recommended (GDPR / UK GDPR).

## 4. Contact details

- [ ] **Business email on your own domain** (e.g. export@asiantechnocast.com). Put it in `content/company.json` → `"email"`.
- [ ] The phones and WhatsApp numbers were copied from the current site. Confirm that both numbers are on WhatsApp.
- [ ] **Logo:** the site uses the hexagon "AT" mark drawn in code. Send the original logo file (SVG preferred) if there is one.

## 5. Photos needed

Put the photos in `public/images/` and set `"src": "/images/<file>.jpg"` in the content files. Use real photos of your own plant only. Landscape 4:3 works best, at least 1600 px wide, JPG.

- [ ] Shop floor overview
- [ ] Moulding line with moulds ready for pouring
- [ ] Furnace / pouring molten iron
- [ ] Machining (VMC / CNC working on a casting)
- [ ] Quality lab (spectrometer, hardness tester, UTM)
- [ ] Finished parts, one per product family: motor frame + end shield, pump casing, gearbox housing, cylinder head, agricultural casting, automotive casting, assorted custom castings
- [ ] Packed export crate on an ISPM-15 pallet
- [ ] Building exterior
- [ ] Team photo (optional)
- [ ] Social sharing image, 1200 × 630 (optional)

## 6. Setup before going live

- [ ] Vercel project with **Root Directory = `export`**
- [ ] **Resend:** create an account, verify the domain asiantechnocast.com (DNS records), then set `RESEND_API_KEY`, `RFQ_TO_EMAIL` and `RFQ_FROM_EMAIL`
- [ ] **Vercel Blob:** create a store (private access) and connect it to the project, which sets `BLOB_READ_WRITE_TOKEN`
- [ ] **Cloudflare Turnstile:** create a widget for the domain, then set `NEXT_PUBLIC_TURNSTILE_SITE_KEY` and `TURNSTILE_SECRET_KEY`
- [ ] Domain: decide when www.asiantechnocast.com moves from the current Indian site to this one (see README)
- [ ] Send a test RFQ with a large STEP file after deploying
- [ ] Submit `https://www.asiantechnocast.com/sitemap.xml` in Google Search Console

---

## Appendix: every placeholder in the US English files (generated)

### Numbers to fill in (10)

- [ ] casting weight range, kg (kg)  
  _in: en-US/home.json, en-US/pages.json_
- [ ] monthly capacity in tonnes (t/month)  
  _in: en-US/home.json, en-US/pages.json_
- [ ] largest molding box size, mm (mm)  
  _in: en-US/pages.json_
- [ ] motor frame / end shield weight range, kg (kg)  
  _in: en-US/products.json_
- [ ] pump casing weight range, kg (kg)  
  _in: en-US/products.json_
- [ ] gearbox housing weight range, kg (kg)  
  _in: en-US/products.json_
- [ ] cylinder head weight range, kg (kg)  
  _in: en-US/products.json_
- [ ] agricultural casting weight range, kg (kg)  
  _in: en-US/products.json_
- [ ] automotive casting weight range, kg (kg)  
  _in: en-US/products.json_
- [ ] overall casting weight range, kg (kg)  
  _in: en-US/products.json_

### Text placeholders (71)

- [ ] role, e.g. Partner – sales & commercial  
  _in: company.json_
- [ ] role, e.g. Partner – production & quality  
  _in: company.json_
- [ ] number of CNC and VMC machines  
  _in: en-US/home.json_
- [ ] certification, e.g. ISO 9001:2015 – only once certificate is confirmed  
  _in: en-US/home.json_
- [ ] confirm spectrometer in-house or external lab  
  _in: en-US/materials.json_
- [ ] confirm UTM in-house or external lab  
  _in: en-US/materials.json_
- [ ] confirm hardness tester  
  _in: en-US/materials.json_
- [ ] confirm metallurgical microscope  
  _in: en-US/materials.json_
- [ ] furnace type and capacity, e.g. induction furnace, n × kg  
  _in: en-US/pages.json_
- [ ] molding process, e.g. green sand / no-bake, machine or hand molding  
  _in: en-US/pages.json_
- [ ] describe furnaces (type, number, capacity per heat), charge materials, and how melt chemistry is controlled before pouring  
  _in: en-US/pages.json_
- [ ] describe the molding line, sand system and core making process  
  _in: en-US/pages.json_
- [ ] number and max turning diameter  
  _in: en-US/pages.json_
- [ ] number and table size / travel  
  _in: en-US/pages.json_
- [ ] e.g. radial drills, tapping, boring  
  _in: en-US/pages.json_
- [ ] confirm equipment  
  _in: en-US/pages.json_
- [ ] paint types and colors offered  
  _in: en-US/pages.json_
- [ ] confirm  
  _in: en-US/pages.json_
- [ ] describe checks on pig iron, scrap and alloys  
  _in: en-US/pages.json_
- [ ] describe spectrometer check before pouring  
  _in: en-US/pages.json_
- [ ] describe visual inspection and defect checks after cleaning  
  _in: en-US/pages.json_
- [ ] describe tensile and hardness testing per heat/lot  
  _in: en-US/pages.json_
- [ ] describe first-off and in-process dimensional checks, gauges used  
  _in: en-US/pages.json_
- [ ] describe final inspection, sampling plan and packing check  
  _in: en-US/pages.json_
- [ ] make/model, or external lab  
  _in: en-US/pages.json_
- [ ] capacity, or external lab  
  _in: en-US/pages.json_
- [ ] Brinell / Rockwell, make  
  _in: en-US/pages.json_
- [ ] CMM available? If not, remove this line  
  _in: en-US/pages.json_
- [ ] e.g. bore gauges, height gauge, thread gauges  
  _in: en-US/pages.json_
- [ ] other documents, e.g. EN 10204 3.1 certificate, paint thickness report  
  _in: en-US/pages.json_
- [ ] e.g. ISO 9001:2015 – certificate number and certifying body  
  _in: en-US/pages.json_
- [ ] other certifications or approvals  
  _in: en-US/pages.json_
- [ ] FCL / LCL – confirm what you offer  
  _in: en-US/pages.json_
- [ ] confirm method, e.g. rust-preventive oil, VCI film  
  _in: en-US/pages.json_
- [ ] typical pattern development time, weeks  
  _in: en-US/pages.json_
- [ ] typical sample lead time, weeks  
  _in: en-US/pages.json_
- [ ] typical production lead time after sample approval, weeks  
  _in: en-US/pages.json_
- [ ] typical transit time, days  
  _in: en-US/pages.json_
- [ ] confirm accepted payment terms and any other options  
  _in: en-US/pages.json_
- [ ] optional – customer names or anonymized references (e.g. 'motor manufacturer, Gujarat') only with permission  
  _in: en-US/pages.json_
- [ ] short company story – how it started, how it grew, main milestones (new furnace, machining shop, first export)  
  _in: en-US/pages.json_
- [ ] role and short bio  
  _in: en-US/pages.json_
- [ ] number of employees, key staff such as metallurgist or QC head  
  _in: en-US/pages.json_
- [ ] road distance and transit time from the foundry to Mundra and Pipavav ports  
  _in: en-US/pages.json_
- [ ] confirm typical time to send a full quotation  
  _in: en-US/pages.json_
- [ ] date of publication  
  _in: en-US/pages.json_
- [ ] business email  
  _in: en-US/pages.json_
- [ ] confirm legal entity type and owner names for the controller statement  
  _in: en-US/pages.json_
- [ ] email provider for the business mailbox  
  _in: en-US/pages.json_
- [ ] legal review  
  _in: en-US/pages.json_
- [ ] define retention period, e.g. delete uploaded drawings from storage after 12 months if no order follows  
  _in: en-US/pages.json_
- [ ] machining operations for frames, e.g. stator bore, spigot/rabbet, feet milling, drilling & tapping  
  _in: en-US/products.json_
- [ ] machining operations for end shields, e.g. bearing housing bore, spigot, face  
  _in: en-US/products.json_
- [ ] achievable tolerances, e.g. bearing bore IT7, as-cast per ISO 8062 CT grade  
  _in: en-US/products.json_
- [ ] machining operations, e.g. flange facing, impeller bore, drilling of flange holes  
  _in: en-US/products.json_
- [ ] achievable tolerances for pump casings  
  _in: en-US/products.json_
- [ ] confirm whether hydrostatic pressure testing is offered, and the test pressure  
  _in: en-US/products.json_
- [ ] machining operations, e.g. bearing bores, mating faces, drilling & tapping  
  _in: en-US/products.json_
- [ ] achievable tolerances, e.g. bearing bore position and bore tolerance  
  _in: en-US/products.json_
- [ ] machining operations for cylinder heads  
  _in: en-US/products.json_
- [ ] achievable tolerances for cylinder heads  
  _in: en-US/products.json_
- [ ] confirm if leak / pressure testing of water jackets is offered  
  _in: en-US/products.json_
- [ ] confirm whether you can develop parts from a customer sample (reverse engineering)  
  _in: en-US/products.json_
- [ ] machining operations for agricultural parts  
  _in: en-US/products.json_
- [ ] achievable tolerances for agricultural parts  
  _in: en-US/products.json_
- [ ] grades used for automotive castings  
  _in: en-US/products.json_
- [ ] machining operations for automotive parts  
  _in: en-US/products.json_
- [ ] achievable tolerances for automotive parts  
  _in: en-US/products.json_
- [ ] typical automotive part types you supply  
  _in: en-US/products.json_
- [ ] maximum machinable size / largest machine envelope  
  _in: en-US/products.json_
- [ ] general as-cast and machined tolerance capability  
  _in: en-US/products.json_

### Photos needed (14)

- [ ] Molding line at the Asian Technocast foundry in Aji GIDC, Rajkot, with grey iron motor frame castings  
  _in: en-US/home.json_
- [ ] Induction furnace pouring molten iron into a ladle at the Asian Technocast foundry  
  _in: en-US/pages.json_
- [ ] Molding line with sand moulds ready for pouring  
  _in: en-US/pages.json_
- [ ] VMC machining center milling a grey iron motor frame  
  _in: en-US/pages.json_
- [ ] Quality lab with spectrometer and hardness tester  
  _in: en-US/pages.json_
- [ ] Export crate of painted motor frames on ISPM-15 stamped pallet, ready for container loading  
  _in: en-US/pages.json_
- [ ] Front of the Asian Technocast foundry building in Aji GIDC, Rajkot  
  _in: en-US/pages.json_
- [ ] Machined grey iron electric motor frame with cooling fins and feet, next to a matching end shield  
  _in: en-US/products.json_
- [ ] Grey iron pump volute casing with machined flanges, painted for export  
  _in: en-US/products.json_
- [ ] CNC machined grey iron gearbox housing showing bearing bores and mounting faces  
  _in: en-US/products.json_
- [ ] Grey iron cylinder head casting with cored ports, before machining  
  _in: en-US/products.json_
- [ ] Assorted grey iron agricultural machinery castings arranged on a pallet  
  _in: en-US/products.json_
- [ ] Machined iron automotive aftermarket castings ready for inspection  
  _in: en-US/products.json_
- [ ] Range of custom grey and ductile iron castings made to customer drawings  
  _in: en-US/products.json_

