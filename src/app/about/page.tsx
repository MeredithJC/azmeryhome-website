import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CTABand } from "@/components/CTABand";
import { Placeholder } from "@/components/ui/Placeholder";
import { whyPoints } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About AZMERYHOME | Houston Real Estate Investment Company",
  description:
    "AZMERYHOME LLC is a Houston-area residential real estate investment company focused on thoughtful acquisitions, practical renovations, and the right strategy for each property.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="A disciplined approach to Houston real estate."
        intro="AZMERYHOME LLC is a Houston-area residential real estate investment company built around a simple idea: find properties with potential, make thoughtful improvements, and create value through disciplined investment."
      />

      <section className="bg-white">
        <Container className="py-16 sm:py-20">
          <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:items-start">
            <div className="max-w-2xl space-y-5 text-lg leading-relaxed text-slate">
              <p>
                AZMERYHOME LLC was built around a simple idea: find properties
                with potential, make thoughtful improvements, and create value
                through disciplined real estate investment.
              </p>
              <p>
                Based in the Houston area, we pursue residential opportunities
                through fix-and-flip, buy-and-hold and rental strategies,
                choosing the approach that best fits each property.
              </p>
              <p>
                Our long-term vision is straightforward: build a durable real
                estate portfolio while improving homes and creating value in the
                communities we serve. Every project we complete adds to a real,
                growing track record.
              </p>
            </div>

            {/* Founder / team photo placeholder — real photography added later (spec §9, §24) */}
            <div>
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
                <Placeholder label="Founder / team photo coming soon" />
              </div>
              <p className="mt-3 text-sm text-slate">
                Authentic team and founder photography will be added here. We
                don&apos;t use generic stock &ldquo;executive team&rdquo; images.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-warmgray">
        <Container className="py-16 sm:py-20">
          <SectionHeading
            eyebrow="What Guides Us"
            title="How we think about every property."
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {whyPoints.map((point) => (
              <div
                key={point.title}
                className="rounded-xl border border-border bg-white p-6"
              >
                <div className="mb-3 h-1 w-10 rounded-full bg-gold" />
                <h3 className="font-display text-lg text-charcoal">
                  {point.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate">
                  {point.body}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <CTABand
        title="Want to work with AZMERYHOME?"
        subtitle="Whether you're selling, buying, bringing a deal, or partnering with us — we'd love to hear from you."
        primary={{ label: "Submit a Property", href: "/sell-to-us" }}
        secondary={{ label: "Partner With Us", href: "/partner-with-us" }}
      />
    </>
  );
}
