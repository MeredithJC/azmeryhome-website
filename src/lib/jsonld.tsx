import { site } from "./site";
import type { Property } from "./content/types";
import { formatPrice } from "./utils";

/**
 * JSON-LD builders (spec §15 Structured Data).
 * We use Organization for the company entity and areaServed for Houston.
 * We intentionally do NOT mark AZMERYHOME as a RealEstateAgent, since the
 * company is not operating as a licensed brokerage (spec §15, §19).
 */

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.legalName,
    alternateName: site.name,
    url: site.url,
    description: site.description,
    email: site.contact.email || undefined,
    telephone: site.contact.phone || undefined,
    areaServed: {
      "@type": "AdministrativeArea",
      name: "Greater Houston, Texas",
    },
    knowsAbout: [
      "residential real estate investment",
      "fix and flip",
      "buy and hold",
      "rental properties",
    ],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: site.url,
    description: site.description,
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: new URL(item.path, site.url).toString(),
    })),
  };
}

/** RealEstateListing + Offer for an individual property page (spec §15). */
export function propertyJsonLd(property: Property) {
  const priceLabel = formatPrice(property.price ?? undefined);
  return {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: `${property.publicLocation}, ${property.city}, ${property.state}`,
    url: new URL(`/properties/${property.slug}`, site.url).toString(),
    description: property.shortDescription,
    datePosted: property.publishedAt,
    ...(property.price != null && {
      offers: {
        "@type": "Offer",
        price: property.price,
        priceCurrency: "USD",
        availability:
          property.status === "for-sale"
            ? "https://schema.org/InStock"
            : "https://schema.org/OutOfStock",
      },
    }),
    ...(priceLabel && { priceRange: priceLabel }),
    itemOffered: {
      "@type": "SingleFamilyResidence",
      numberOfBedrooms: property.beds,
      numberOfBathroomsTotal: property.baths,
      ...(property.squareFeet && {
        floorSize: {
          "@type": "QuantitativeValue",
          value: property.squareFeet,
          unitCode: "FTK",
        },
      }),
      address: {
        "@type": "PostalAddress",
        addressLocality: property.city,
        addressRegion: property.state,
        ...(property.zip && { postalCode: property.zip }),
        addressCountry: "US",
      },
    },
  };
}

/** Renders a JSON-LD script tag. Use inside a Server Component. */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // Structured data must match visible content (spec §15).
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
