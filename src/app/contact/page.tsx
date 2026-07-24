import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/PageHero";
import { LeadForm } from "@/components/forms/LeadForm";
import { site } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact AZMERYHOME | Greater Houston Real Estate Investment",
  description:
    "Get in touch with AZMERYHOME for inquiries that don't fit a specific form. Serving Houston and surrounding communities.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Get in touch with AZMERYHOME."
        intro="Have a question that doesn't fit one of our other forms? Send us a note and we'll point you in the right direction."
      />

      <section className="bg-white">
        <Container className="py-16 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:items-start">
            <div className="lg:sticky lg:top-24">
              <h2 className="font-display text-2xl text-charcoal">
                Reach us
              </h2>
              <p className="mt-4 leading-relaxed text-slate">
                AZMERYHOME serves Houston and surrounding communities across
                Greater Houston.
              </p>

              <dl className="mt-6 space-y-4 text-sm">
                {site.contact.email && (
                  <div>
                    <dt className="font-semibold text-charcoal">Email</dt>
                    <dd>
                      <a
                        href={`mailto:${site.contact.email}`}
                        className="text-gold hover:underline"
                      >
                        {site.contact.email}
                      </a>
                    </dd>
                  </div>
                )}
                {site.contact.phone && (
                  <div>
                    <dt className="font-semibold text-charcoal">Phone</dt>
                    <dd>
                      <a
                        href={`tel:${site.contact.phone.replace(/[^\d+]/g, "")}`}
                        className="text-gold hover:underline"
                      >
                        {site.contact.phone}
                      </a>
                    </dd>
                  </div>
                )}
                <div>
                  <dt className="font-semibold text-charcoal">Service area</dt>
                  <dd className="text-slate">{site.serviceArea}</dd>
                </div>
              </dl>

              <p className="mt-6 text-xs leading-relaxed text-slate/80">
                For faster routing, use a dedicated form: {""}
                <Link href="/sell-to-us" className="underline hover:text-gold">
                  sell a property
                </Link>
                , {""}
                <Link href="/properties" className="underline hover:text-gold">
                  buyer inquiries
                </Link>
                , or {""}
                <Link href="/partner-with-us" className="underline hover:text-gold">
                  partner with us
                </Link>
                .
              </p>
            </div>

            <div>
              <h2 className="mb-4 font-display text-2xl text-charcoal">
                Send a message
              </h2>
              <LeadForm leadType="contact" />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
