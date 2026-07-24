import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/PageHero";
import { PropertyCard } from "@/components/cards/PropertyCard";
import { LeadForm } from "@/components/forms/LeadForm";
import { CTABand } from "@/components/CTABand";
import { getActiveProperties } from "@/lib/content/properties";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Homes by AZMERYHOME | Renovated Houston Homes for Sale",
  description:
    "Browse renovated homes currently offered for sale by AZMERYHOME across Greater Houston, or join our buyer list for new listings.",
  path: "/properties",
});

export default function PropertiesPage() {
  const properties = getActiveProperties();

  return (
    <>
      <PageHero
        eyebrow="Available Homes"
        title="Homes by AZMERYHOME"
        intro="Renovated residential homes offered for sale across Greater Houston. New properties are added as our inventory grows."
      />

      <section className="bg-white">
        <Container className="py-16 sm:py-20">
          {properties.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {properties.map((p) => (
                <PropertyCard key={p.slug} property={p} />
              ))}
            </div>
          ) : (
            <div className="mx-auto max-w-4xl">
              <div className="rounded-2xl border border-border bg-warmgray p-8 text-center sm:p-12">
                <h2 className="font-display text-2xl text-charcoal sm:text-3xl">
                  No active listings right now
                </h2>
                <p className="mx-auto mt-3 max-w-xl text-slate">
                  We&apos;re always working on our next project. Join the buyer
                  list and we&apos;ll notify you the moment a new AZMERYHOME home
                  becomes available — before it&apos;s widely marketed.
                </p>
              </div>
              <div className="mx-auto mt-8 max-w-2xl">
                <h3 className="mb-4 text-center font-display text-xl text-charcoal">
                  Join the Buyer List
                </h3>
                <LeadForm leadType="buyer-list" />
              </div>
            </div>
          )}
        </Container>
      </section>

      <CTABand
        title="Looking for something specific?"
        subtitle="Tell us what you're after and we'll keep you posted as new homes come online."
        primary={{ label: "Join Buyer List", href: "/buyer-list" }}
        secondary={{ label: "Contact AZMERYHOME", href: "/contact" }}
      />
    </>
  );
}
