import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CTABand } from "@/components/CTABand";
import { strategies } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "What We Do | Fix & Flip, Buy & Hold, Rentals in Houston",
  description:
    "AZMERYHOME's investment model: fix & flip, buy & hold, and rental properties across Greater Houston — and how we evaluate each opportunity.",
  path: "/what-we-do",
});

const evaluationPoints = [
  "Property condition and the scope of renovation required",
  "Location and neighborhood trajectory within Greater Houston",
  "Market demand for the finished home or rental",
  "Risk factors and a clear, realistic exit strategy",
  "Long-term value the asset can create over time",
];

export default function WhatWeDoPage() {
  return (
    <>
      <PageHero
        eyebrow="What We Do"
        title="A disciplined investment model, explained plainly."
        intro="We acquire selected residential properties and choose the strategy that best fits each one — resale, long-term hold, or rental. Here's how each approach works."
      />

      <section className="bg-white">
        <Container className="py-16 sm:py-20">
          <div className="space-y-12">
            {strategies.map((s, i) => (
              <article
                key={s.key}
                className="grid gap-6 border-b border-border pb-12 last:border-0 last:pb-0 md:grid-cols-[auto_1fr] md:gap-10"
              >
                <div className="text-5xl font-bold text-gold/30 font-display">
                  0{i + 1}
                </div>
                <div>
                  <h2 className="font-display text-2xl text-charcoal">
                    {s.title}
                  </h2>
                  <p className="mt-3 max-w-3xl text-lg leading-relaxed text-slate">
                    {s.summary}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-warmgray">
        <Container className="py-16 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <SectionHeading
              eyebrow="Our Diligence"
              title="How we evaluate opportunities."
              intro="We look at each property individually. A few of the factors we weigh:"
            />
            <ul className="space-y-3">
              {evaluationPoints.map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-3 rounded-lg bg-white p-4 text-slate shadow-sm"
                >
                  <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold">
                    <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
                      <path
                        d="M4 10l4 4 8-8"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  {point}
                </li>
              ))}
            </ul>
          </div>
          <p className="mt-8 max-w-3xl text-sm text-slate">
            We evaluate properties individually and don&apos;t promise to purchase
            every property or make guaranteed offers. We publish our approach,
            not proprietary underwriting thresholds.
          </p>
        </Container>
      </section>

      <CTABand
        title="Have a property that might fit?"
        subtitle="Tell us about it — we review residential opportunities across Greater Houston."
        primary={{ label: "Submit a Property", href: "/sell-to-us" }}
        secondary={{ label: "Submit a Deal", href: "/partner-with-us#agents" }}
      />
    </>
  );
}
