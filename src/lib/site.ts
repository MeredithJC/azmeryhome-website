/**
 * Site-wide configuration and business facts (single source of truth).
 *
 * IMPORTANT (spec §19, §23): Do not invent business facts. Anything the owner
 * must supply is marked with a PLACEHOLDER note and should be replaced before
 * production launch — not fabricated. See spec §24 for the full input list.
 */

export const site = {
  name: "AZMERYHOME",
  legalName: "AZMERYHOME LLC",
  // Canonical site URL (override via NEXT_PUBLIC_SITE_URL for previews/prod).
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://azmeryhome.com",
  description:
    "AZMERYHOME LLC is a Houston-based residential real estate investment company acquiring, renovating and managing homes throughout Greater Houston.",
  serviceArea: "Greater Houston, Texas",
  serviceAreaLong: "Houston and surrounding communities",

  // --- Owner-supplied contact info (spec §12, §24) -------------------------
  // PLACEHOLDER: publish real values only when the company is ready (spec §12).
  contact: {
    email: "meredith@azmeryhome.com",
    // PLACEHOLDER: set when ready to publish a business phone number.
    phone: "" as string,
    // No public home address is published (spec §12, §18.7).
  },

  // Social links: only include channels that are actively maintained (spec §21).
  // PLACEHOLDER: add real, active profiles here; leave empty to hide.
  social: [] as { label: string; href: string }[],

  strategies: {
    fixFlip: "Fix & Flip",
    buyHold: "Buy & Hold",
    rental: "Rental Properties",
  },
} as const;

/** Primary navigation (spec §4). */
export const primaryNav = [
  { label: "Home", href: "/" },
  { label: "Properties", href: "/properties" },
  { label: "About", href: "/about" },
  { label: "What We Do", href: "/what-we-do" },
  { label: "Projects", href: "/projects" },
  { label: "Sell to Us", href: "/sell-to-us" },
  { label: "Partner With Us", href: "/partner-with-us" },
  { label: "Contact", href: "/contact" },
] as const;

/** Persistent highlighted CTA (spec §4). */
export const primaryCta = { label: "Submit a Property", href: "/sell-to-us" };

/**
 * Audience routing table (spec §2 + Structured Reference Tables).
 * Each major lead type has its own path and conversion action.
 */
export const audiences = [
  {
    key: "seller",
    title: "Property Sellers",
    blurb:
      "Own a house you're thinking about selling — even one needing repairs? We review residential opportunities across Greater Houston.",
    cta: "Sell a Property",
    href: "/sell-to-us",
  },
  {
    key: "buyer",
    title: "Home Buyers",
    blurb:
      "Explore renovated AZMERYHOME homes currently offered for sale, or join our buyer list for new listings.",
    cta: "View Properties",
    href: "/properties",
  },
  {
    key: "agent",
    title: "Agents & Wholesalers",
    blurb:
      "Have an off-market, distressed, or value-add opportunity? Bring us investment-suitable deals in the Houston area.",
    cta: "Submit a Deal",
    href: "/partner-with-us#agents",
  },
  {
    key: "capital",
    title: "Investors & Private Lenders",
    blurb:
      "Learn about AZMERYHOME's operating approach and start a conversation about capital relationships.",
    cta: "Connect With AZMERYHOME",
    href: "/partner-with-us#capital",
  },
  {
    key: "partner",
    title: "Industry Partners",
    blurb:
      "Contractors, vendors, property managers, inspectors, photographers and designers — build with us.",
    cta: "Become a Partner",
    href: "/partner-with-us#vendors",
  },
] as const;

/**
 * The three investment strategies (spec §5.3, §8).
 * `image` is atmospheric stock imagery for illustration only — kept separate
 * from the real portfolio/listings (spec §17). See public/stock/CREDITS.md.
 */
export const strategies = [
  {
    key: "fix-flip",
    title: "Fix & Flip",
    summary:
      "We acquire selected residential properties with improvement potential, complete thoughtful renovation work, and return the home to the market when resale is the best strategy.",
    image: "/stock/strategy-fix-flip-kitchen.jpg",
    imageAlt: "A renovated kitchen with new cabinetry, counters and fixtures",
  },
  {
    key: "buy-hold",
    title: "Buy & Hold",
    summary:
      "We acquire selected residential properties for long-term ownership when the asset supports the company's investment criteria and long-term objectives.",
    image: "/stock/strategy-buy-hold-living.jpg",
    imageAlt: "A bright, open living room and kitchen in a residential home",
  },
  {
    key: "rentals",
    title: "Rentals",
    summary:
      "Selected properties may operate as long-term or short-term/furnished rentals when the property, location, demand, regulations and strategy support it.",
    image: "/stock/strategy-rentals-living.jpg",
    imageAlt: "A comfortable, furnished living room in a rental home",
  },
] as const;

/** Grounded proof points — no inflated claims (spec §5.6). */
export const whyPoints = [
  {
    title: "Houston-focused",
    body: "We concentrate on Greater Houston, where we build real market knowledge property by property.",
  },
  {
    title: "Property-by-property strategy",
    body: "Every home is evaluated individually — fix & flip, buy & hold, or rental — based on what fits the asset.",
  },
  {
    title: "Hands-on renovation oversight",
    body: "We stay close to the work, improving homes thoughtfully rather than cutting corners.",
  },
  {
    title: "Long-term investment mindset",
    body: "We're building a durable portfolio, not chasing one-off transactions.",
  },
  {
    title: "A real project portfolio",
    body: "Our credibility grows with every documented project, using real photos and real facts.",
  },
] as const;

export type LeadType =
  | "seller"
  | "buyer"
  | "buyer-list"
  | "deal"
  | "capital"
  | "vendor"
  | "contact";
