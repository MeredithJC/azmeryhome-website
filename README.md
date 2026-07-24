# AZMERYHOME LLC — Website

Marketing + lead-generation website for AZMERYHOME LLC, a Greater Houston
residential real estate investment company. Built to the Master Website
Specification (Phase 1 launch-ready core).

## Stack

- **Next.js 16** (App Router) + **TypeScript** + **React 19**
- **Tailwind CSS v4** with AZMERYHOME brand tokens (charcoal / gold / white)
- Typed local content files for Property & Project models (`src/lib/content/`)
- Lead forms: `react-hook-form` + `zod` (shared client/server validation),
  delivered via **Resend**
- **Vercel Analytics** + Google Search Console (verification added post-launch)

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in values
npm run dev                  # http://localhost:3000
```

## Environment variables

See `.env.example`. All secrets are read from env vars (never committed):

| Variable               | Purpose                                            |
| ---------------------- | -------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL for metadata, sitemap, OG            |
| `RESEND_API_KEY`       | Resend API key for lead emails (empty = no send)   |
| `LEAD_INBOX_EMAIL`     | Inbox that receives lead notifications             |
| `LEAD_FROM_EMAIL`      | From address for outgoing lead emails              |

When `RESEND_API_KEY` is empty, forms still validate and show the success page;
the server logs that no email was sent. Add a key to deliver real emails.

## Content: adding a property or project

Edit the typed arrays and push — Vercel auto-deploys:

- Properties → `src/lib/content/properties.ts`
- Projects → `src/lib/content/projects.ts`

Setting a property's `status` to `"sold"` removes it from active inventory while
keeping it available as portfolio work. Images go under `public/` and are
referenced by path (e.g. `/properties/<slug>/kitchen.jpg`).

## Project structure

```
src/
  app/            # routes (App Router) + sitemap.ts, robots.ts, api/lead
  components/     # UI system, cards, forms, layout
  lib/            # site config, content models/loaders, seo, jsonld, forms
```

## Owner inputs still needed (placeholders in place)

Logo files, business phone, De Priest photos + approved facts, active listing
details, social links, About/founder photo, final legal contact details.
See the Master Specification §24.
