import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Gallery } from "@/components/Gallery";
import { LeadForm } from "@/components/forms/LeadForm";
import { PropertyStatusBadge } from "@/components/ui/StatusBadge";
import { ButtonLink } from "@/components/ui/Button";
import {
  getPropertyBySlug,
  getAllPropertySlugs,
} from "@/lib/content/properties";
import { getProjectBySlug } from "@/lib/content/projects";
import { formatPrice } from "@/lib/utils";
import { pageMetadata } from "@/lib/seo";
import {
  JsonLd,
  propertyJsonLd,
  breadcrumbJsonLd,
} from "@/lib/jsonld";

export function generateStaticParams() {
  return getAllPropertySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const property = getPropertyBySlug(slug);
  if (!property) return {};
  return pageMetadata({
    title: property.seo.title,
    description: property.seo.description,
    path: `/properties/${property.slug}`,
    image: property.heroImage?.src ?? property.gallery[0]?.src,
  });
}

export default async function PropertyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const property = getPropertyBySlug(slug);
  if (!property) notFound();

  const price = formatPrice(property.price ?? undefined);
  const propertyRef = `${property.publicLocation}, ${property.city}`;
  const linkedProject = property.linkedProjectSlug
    ? getProjectBySlug(property.linkedProjectSlug)
    : undefined;

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Properties", path: "/properties" },
    { name: property.publicLocation, path: `/properties/${property.slug}` },
  ];

  const images = property.heroImage
    ? [property.heroImage, ...property.gallery]
    : property.gallery;

  return (
    <>
      <JsonLd data={propertyJsonLd(property)} />
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <Breadcrumbs items={crumbs} />

      <Container className="py-10 sm:py-14">
        {/* Header */}
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <PropertyStatusBadge status={property.status} />
            <h1 className="mt-3 font-display text-3xl text-charcoal sm:text-4xl">
              {property.publicLocation}
            </h1>
            <p className="mt-1 text-lg text-slate">
              {property.city}, {property.state}
              {property.zip ? ` ${property.zip}` : ""}
            </p>
          </div>
          {price && (
            <p className="font-display text-3xl text-gold">{price}</p>
          )}
        </div>

        {/* Key facts */}
        <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-3 border-y border-border py-4 text-charcoal">
          <Fact label="Bedrooms" value={property.beds} />
          <Fact label="Bathrooms" value={property.baths} />
          {property.squareFeet && (
            <Fact
              label="Square feet"
              value={property.squareFeet.toLocaleString()}
            />
          )}
          <Fact label="Type" value={property.propertyType} />
        </dl>

        {/* Gallery */}
        <div className="mt-8">
          <Gallery images={images} />
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1.6fr_1fr]">
          {/* Main content */}
          <div>
            <section>
              <h2 className="font-display text-2xl text-charcoal">
                About this home
              </h2>
              <div className="mt-4 space-y-4 leading-relaxed text-slate">
                {property.fullDescription.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </section>

            {property.features.length > 0 && (
              <section className="mt-10">
                <h2 className="font-display text-2xl text-charcoal">
                  Key features
                </h2>
                <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                  {property.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-slate">
                      <Check /> {f}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {property.renovationHighlights.length > 0 && (
              <section className="mt-10 rounded-xl bg-warmgray p-6">
                <h2 className="font-display text-2xl text-charcoal">
                  Renovation highlights
                </h2>
                <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                  {property.renovationHighlights.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-slate">
                      <Check /> {f}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {property.mapQuery && (
              <section className="mt-10">
                <h2 className="font-display text-2xl text-charcoal">Location</h2>
                <div className="mt-4 overflow-hidden rounded-xl border border-border">
                  <iframe
                    title={`Map of ${propertyRef}`}
                    loading="lazy"
                    className="aspect-[16/9] w-full"
                    referrerPolicy="no-referrer-when-downgrade"
                    src={`https://www.google.com/maps?q=${encodeURIComponent(
                      property.mapQuery,
                    )}&output=embed`}
                  />
                </div>
              </section>
            )}

            {linkedProject && (
              <section className="mt-10">
                <ButtonLink
                  href={`/projects/${linkedProject.slug}`}
                  variant="outline"
                >
                  See the renovation case study →
                </ButtonLink>
              </section>
            )}

            {/* Disclaimers (spec §6.2) */}
            <p className="mt-10 text-xs leading-relaxed text-slate/80">
              Information deemed reliable but subject to change. Property
              availability and terms are subject to applicable
              listing/transaction documentation.
              {property.listingAgent
                ? " This property is represented by a licensed listing agent; see attribution."
                : ""}
            </p>
          </div>

          {/* Sidebar: inquiry + listing agent */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
              <h2 className="font-display text-xl text-charcoal">
                Ask about this property
              </h2>
              <p className="mt-2 text-sm text-slate">
                Schedule a showing or ask a question — we&apos;ll get right back
                to you.
              </p>
              <div className="mt-4 flex flex-col gap-2">
                <ButtonLink href="#inquiry" variant="primary">
                  Ask About This Property
                </ButtonLink>
                <ButtonLink href="/buyer-list" variant="outline">
                  Join Buyer List
                </ButtonLink>
              </div>
            </div>

            {property.listingAgent && (
              <div className="mt-6 rounded-2xl border border-border bg-warmgray p-6 text-sm text-slate">
                <h3 className="font-semibold text-charcoal">
                  Listed by
                </h3>
                <p className="mt-1">{property.listingAgent.name}</p>
                {property.listingAgent.brokerage && (
                  <p>{property.listingAgent.brokerage}</p>
                )}
                {property.listingAgent.license && (
                  <p>{property.listingAgent.license}</p>
                )}
                <p className="mt-1">
                  <a
                    href={`tel:${property.listingAgent.contact.replace(/[^\d+]/g, "")}`}
                    className="text-gold hover:underline"
                  >
                    {property.listingAgent.contact}
                  </a>
                </p>
              </div>
            )}
          </aside>
        </div>

        {/* Inquiry form */}
        <section id="inquiry" className="mt-14 scroll-mt-24">
          <div className="mx-auto max-w-2xl">
            <h2 className="mb-4 text-center font-display text-2xl text-charcoal">
              Ask about {property.publicLocation}
            </h2>
            <LeadForm leadType="buyer" propertyRef={propertyRef} />
          </div>
        </section>
      </Container>
    </>
  );
}

function Fact({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-wide text-slate">{label}</dt>
      <dd className="text-lg font-semibold text-charcoal">{value}</dd>
    </div>
  );
}

function Check() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      className="mt-0.5 shrink-0 text-gold"
    >
      <path
        d="M4 10l4 4 8-8"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
