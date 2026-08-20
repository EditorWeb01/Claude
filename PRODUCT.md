# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Static HTML/CSS/JS, no build step (user decision, confirmed 2026-08-20). The site is deployed by
uploading a ZIP into cPanel `public_html`, so every dependency ships vendored in the package.
`framer-motion` exists in the repo `package.json` but is deliberately unused by the shipped site.

## Users

Peruvian B2B companies — importers and retail brands operating in Lima — whose commercial team
(gerencia comercial, gerencia de operaciones, dueño de marca) is deciding whether to outsource
warehousing and distribution. They arrive from a referral or a search, on desktop during work hours
or on a phone between meetings, comparing two or three logistics operators and looking for evidence
that an operator can absorb their volume without breaking their sales cycle.

## Product Purpose

Prime Express is a logistics operator that runs the full physical operation for its clients:
reception, custody, inventory control, picking/packing, value-added services and scheduled
distribution in Lima. The site's job is to make a qualified company request a proposal
("Solicitar evaluación") with enough information for a commercial conversation.

## Positioning

An operator that absorbs the whole chain under one responsible team, with its own WMS giving the
client visibility of inventory and traceable movements — instead of the client building and staffing
a warehouse or stitching together separate providers. Stated promise: "Tú dedícate a vender.
Nosotros hacemos el resto." Internal motto: "Entender para atender."

## Operating Context

- Main site: Panamericana Sur 2001, Km. 38, Punta Hermosa, Lima.
- Coverage: Lima — shopping centres, points of sale, distributors and agencies.
- Services: almacenaje, transporte y distribución, servicios de valor agregado (etiquetado, rotulado,
  armado de kits, filmado, paletizado), logística inversa.
- Capacity is sold as flexible: base capacity in normal season, expanded during campaign peaks.
- Commercial contact: ventas@prime-express.pe · +51 936 797 732 (also WhatsApp).
- Language: Spanish (es-PE). Only Spanish is shipped.

## Capabilities and Constraints

- 11 years operating in Lima's logistics market; 100% B2B.
- Own WMS: location of merchandise, traceable movements from reception to dispatch, data for decisions.
- Quote form fields in use: empresa, nombre de contacto, correo corporativo, teléfono, servicio de
  interés, volumen aproximado (rangos: <60 pallets/mes, 60–150, >150, sin definir).
- The form currently submits through `mailto:`; no CRM/API integration exists yet. A HubSpot or
  Web3Forms endpoint is an open decision, not a fact.
- No build step, no server-side code, no analytics vendor confirmed.
- Undecided: pricing, SLA numbers, certifications, client names, m² of the warehouse, fleet size.
  These must not be invented.

## Brand Commitments

- Name: Prime Express Perú S.A.C.
- Colors (binding): blue `#034287`, orange `#ff7300`, navy `#021d3d`.
- Logo (binding, confirmed 2026-08-20): the current chevron mark, `brand/prime-express-logo.png`.
  The newer "PRIME EXPRESS" swoosh mark appearing on the vans in the 2026 video footage and in
  `Berlingo.jpg` is fleet graphics; the chevron stays the identity in the interface.
- Section inventory is settled and must be preserved: hero, propuesta de valor, soluciones,
  tecnología/WMS, capacidad flexible, cómo trabajamos, nosotros, contacto.
- Voice: direct, commercial, no hype, no invented metrics. Second person singular ("tú").

## Evidence on Hand

- `source/video/hero-v3-20s.mp4` — 20 s, 2212×936, own production: the branded van driving inside the
  warehouse, resolving into a dark studio shot with blue/orange light trails.
- `source/video/trust-aerial-v3.mp4` — 15 s, 1600×900: dolly down a stocked warehouse aisle with staff
  and a forklift working.
- `source/photos/` — 8 real photographs owned by the client: warehouse aisles (`almacen.jpg`,
  `AdobeStock_107182915.jpeg` — the Adobe Stock file is licensed stock, not own material), branded
  vans (`Berlingo.jpg`, `_MG_5583 web.jpg`), an operator scanning with an RF terminal (`_MG_1858.jpg`),
  two staff checking merchandise against a clipboard (`_MG_4685.jpg`), a warehouse supervisor portrait
  (`Edson Foto.jpg`), and a close-up of Prime Express package labels (`_MG_9345.jpg`).
- Existing production site (`legacy/`) carries the approved Spanish copy for every section.
- Absent, and not to be fabricated: testimonials, client logos, certifications, case studies,
  benchmark numbers, prices.

## Product Principles

1. Sell relief, not logistics vocabulary: the visitor's win is time and control returned to their
   commercial team.
2. Every claim on the page must trace to something Prime Express actually does; no invented metrics.
3. Show the real operation — own footage and own photography beat illustration.
4. One responsible team across the whole chain is the differentiator; never present the services as
   detachable modules sold separately.
5. The page exists to start a qualified commercial conversation, so the quote action stays reachable
   from every scroll position.

## Accessibility & Inclusion

Spanish-language B2B audience on mixed hardware, including mid-range Android phones on 4G. The
experience must stay legible and usable with motion disabled (`prefers-reduced-motion`) and must not
depend on video playback for comprehension or navigation.
