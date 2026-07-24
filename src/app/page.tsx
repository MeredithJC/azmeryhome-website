import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/Container";

const homeMeta = pageMetadata({
  title: "AZMERYHOME | Houston Residential Real Estate Investment Company",
  description:
    "AZMERYHOME LLC acquires, renovates and manages residential properties throughout Greater Houston — fix & flip, buy & hold, and rentals. Sell a property or view homes for sale.",
  path: "/",
});
export const metadata = {
  ...homeMeta,
  // Bypass the layout's "%s | AZMERYHOME" template for the home page.
  title: {
    absolute: "AZMERYHOME | Houston Residential Real Estate Investment Company",
  },
};
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CTABand } from "@/components/CTABand";
import { AudienceCard } from "@/components/cards/AudienceCard";
import { StrategyCard } from "@/components/cards/StrategyCard";
import { PropertyCard } from "@/components/cards/PropertyCard";
import { BeforeAfter } from "@/components/BeforeAfter";
import { LeadForm } from "@/components/forms/LeadForm";
import { RoofMark } from "@/components/ui/Logo";
import { audiences, strategies, whyPoints } from "@/lib/site";
import { getFeaturedProperties } from "@/lib/content/properties";
import { getFeaturedProject } from "@/lib/content/projects";
import { STRATEGY_LABEL } from "@/lib/content/types";

export default function HomePage() {
  const featured = getFeaturedProperties().slice(0, 3);
  const project = getFeaturedProject();

  return (
    <>
      {/* 5.1 Hero */}
      <section className="relative overflow-hidden bg-charcoal text-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(135deg, #b78423 0 1px, transparent 1px 24px)",
          }}
        />
        <Container className="relative py-20 sm:py-28">
          <div className="max-w-3xl">
            <p className="mb-4 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-gold">
              <RoofMark className="h-5 w-5" />
              Greater Houston Real Estate Investment
            </p>
            <h1 className="font-display text-4xl leading-[1.08] text-white sm:text-5xl lg:text-6xl">
              Investing in Houston. Improving Homes. Creating Long-Term Value.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">
              AZMERYHOME LLC is a Houston-based real estate investment company
              acquiring, renovating and managing residential properties
              throughout Greater Houston.
            </p>
            <p className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-medium text-white/70">
              <span>Fix &amp; Flip</span>
              <span className="text-gold">|</span>
              <span>Buy &amp; Hold</span>
              <span className="text-gold">|</span>
              <span>Rental Properties</span>
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <ButtonLink href="/sell-to-us" variant="primary" size="lg">
                Sell a Property
              </ButtonLink>
              <ButtonLink
                href="/properties"
                variant="ghost"
                size="lg"
                className="border border-white/30 text-white hover:bg-white hover:text-charcoal"
              >
                View Properties
              </ButtonLink>
              <Link
                href="/partner-with-us"
                className="text-sm font-semibold text-gold underline-offset-4 hover:underline sm:ml-2"
              >
                Work With AZMERYHOME →
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* 5.2 Audience Pathway */}
      <section className="bg-white">
        <Container className="py-16 sm:py-20">
          <SectionHeading
            eyebrow="Find Your Path"
            title="How would you like to work with AZMERYHOME?"
            intro="We serve five audiences — each with a clear next step. Choose the one that fits you."
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {audiences.map((a) => (
              <AudienceCard
                key={a.key}
                title={a.title}
                blurb={a.blurb}
                cta={a.cta}
                href={a.href}
              />
            ))}
          </div>
        </Container>
      </section>

      {/* 5.3 One Company. Multiple Strategies. */}
      <section className="bg-warmgray">
        <Container className="py-16 sm:py-20">
          <SectionHeading
            eyebrow="Our Approach"
            title="One company. Multiple real estate strategies."
            intro="We choose the approach that best fits each property — never a one-size-fits-all playbook."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {strategies.map((s) => (
              <StrategyCard
                key={s.key}
                strategyKey={s.key}
                title={s.title}
                summary={s.summary}
              />
            ))}
          </div>
        </Container>
      </section>

      {/* 5.4 Featured Properties */}
      <section className="bg-white">
        <Container className="py-16 sm:py-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading
              eyebrow="Available Homes"
              title="Featured Properties"
            />
            <ButtonLink href="/properties" variant="outline">
              View all properties
            </ButtonLink>
          </div>

          {featured.length > 0 ? (
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featured.map((p) => (
                <PropertyCard key={p.slug} property={p} />
              ))}
            </div>
          ) : (
            <div className="mt-10 grid items-center gap-8 rounded-2xl border border-border bg-warmgray p-8 sm:p-10 lg:grid-cols-2">
              <div>
                <h3 className="font-display text-2xl text-charcoal">
                  New Properties Coming Soon
                </h3>
                <p className="mt-3 text-slate">
                  We don&apos;t have active listings at the moment. Join our
                  buyer list and we&apos;ll let you know the moment a new
                  AZMERYHOME home becomes available.
                </p>
              </div>
              <LeadForm leadType="buyer-list" />
            </div>
          )}
        </Container>
      </section>

      {/* 5.5 Our Work / Featured Transformation */}
      {project && (
        <section className="bg-charcoal text-white">
          <Container className="py-16 sm:py-20">
            <div className="grid items-center gap-10 lg:grid-cols-2">
              <div>
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-gold">
                  Our Work
                </p>
                <h2 className="font-display text-3xl text-white">
                  {project.title}
                </h2>
                <p className="mt-2 text-white/70">{project.generalLocation}</p>
                <p className="mt-5 leading-relaxed text-white/80">
                  A {STRATEGY_LABEL[project.strategy]} project — one example of
                  how we identify potential and improve homes thoughtfully. Every
                  completed project strengthens our track record.
                </p>
                <ButtonLink
                  href={`/projects/${project.slug}`}
                  variant="primary"
                  size="lg"
                  className="mt-8"
                >
                  View the case study
                </ButtonLink>
              </div>
              <div className="rounded-2xl bg-white/5 p-4">
                <BeforeAfter
                  before={project.beforeImages[0]}
                  after={project.afterImages[0]}
                />
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* 5.6 Why AZMERYHOME */}
      <section className="bg-white">
        <Container className="py-16 sm:py-20">
          <SectionHeading
            eyebrow="Why AZMERYHOME"
            title="Grounded proof points, not inflated claims."
            intro="We let real work and a disciplined approach speak for themselves."
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

      {/* 5.7 Let's Create Opportunities Together */}
      <section className="bg-warmgray">
        <Container className="py-16 sm:py-20">
          <SectionHeading
            align="center"
            eyebrow="Let's Create Opportunities Together"
            title="Whatever you bring, there's a path here."
            intro="Sellers, buyers, agents and wholesalers, capital relationships, and industry partners — start with the step that fits you."
            className="mx-auto"
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {audiences.map((a) => (
              <AudienceCard
                key={a.key}
                title={a.title}
                blurb={a.blurb}
                cta={a.cta}
                href={a.href}
              />
            ))}
          </div>
        </Container>
      </section>

      {/* 5.8 Final CTA */}
      <CTABand
        title="Have a property, deal, or opportunity to discuss?"
        subtitle="We review residential opportunities across Greater Houston individually — reach out and let's talk."
        primary={{ label: "Submit a Property", href: "/sell-to-us" }}
        secondary={{ label: "Contact AZMERYHOME", href: "/contact" }}
      />
    </>
  );
}
