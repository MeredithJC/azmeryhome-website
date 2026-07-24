import { site } from "@/lib/site";

/**
 * llms.txt — an experimental convenience for AI/answer engines (spec §16).
 * This supplements, and never replaces, crawlable HTML, robots, sitemap and
 * structured data. Facts here are kept consistent with the visible site.
 */
export const dynamic = "force-static";

export function GET() {
  const body = `# AZMERYHOME LLC

> ${site.description}

AZMERYHOME LLC is a Houston-based residential real estate investment company
serving ${site.serviceArea}. It operates through three strategies: Fix & Flip,
Buy & Hold, and Rental Properties. It is not a licensed real estate brokerage,
mortgage lender, or financial adviser.

## Key facts
- Entity: AZMERYHOME LLC
- Market: Houston and surrounding communities (Greater Houston, Texas)
- Services: residential real estate investment — fix & flip, buy & hold, rentals
- Contact: ${site.contact.email || "see the Contact page"}

## Primary pages
- Home: ${site.url}/
- Properties (homes for sale): ${site.url}/properties
- About: ${site.url}/about
- What We Do (investment model): ${site.url}/what-we-do
- Projects (case studies): ${site.url}/projects
- Sell to Us (property sellers): ${site.url}/sell-to-us
- Partner With Us (agents, lenders, contractors): ${site.url}/partner-with-us
- Contact: ${site.url}/contact

## For sellers
AZMERYHOME reviews residential properties throughout Greater Houston, including
homes needing repairs. Each property is evaluated individually; there are no
guaranteed offers.

## For buyers
AZMERYHOME markets renovated homes it offers for sale. When no active inventory
is available, buyers can join a buyer list for new-property alerts.
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
