import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LeadForm } from "@/components/forms/LeadForm";
import { FAQ } from "@/components/ui/FAQ";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Sell a Property to AZMERYHOME | Houston Home Buyers",
  description:
    "Thinking about selling a house in Houston — even one needing repairs? Tell AZMERYHOME about your property and we'll review the opportunity.",
  path: "/sell-to-us",
});

const steps = [
  {
    n: 1,
    title: "Tell us about the property",
    body: "Share a few details about the home and your situation using the form below. Photos are helpful but optional.",
  },
  {
    n: 2,
    title: "We review the opportunity",
    body: "We evaluate each property individually — its condition, location, and potential — with no obligation to you.",
  },
  {
    n: 3,
    title: "We contact you to discuss next steps",
    body: "If it's a fit, we'll reach out to talk through options. Straightforward and pressure-free.",
  },
];

const reasons = [
  "Direct communication — you talk with the people making decisions.",
  "Local focus on Houston and surrounding communities.",
  "Real renovation and investment experience.",
  "Flexible evaluation of properties in any condition.",
];

const faqs = [
  {
    q: "Do you buy every property?",
    a: "No. We evaluate each property individually and pursue the ones that fit our approach. Submitting your property doesn't obligate you to anything.",
  },
  {
    q: "What kinds of properties do you consider?",
    a: "We review residential properties throughout Greater Houston — including homes that need repairs or updates, and a range of ownership situations.",
  },
  {
    q: "Do I need to make repairs before contacting you?",
    a: "No. We evaluate properties in their current condition. You don't need to clean up, stage, or renovate anything first.",
  },
  {
    q: "Is there any cost to submit my property?",
    a: "No. Telling us about your property is free and comes with no obligation.",
  },
  {
    q: "What happens after I submit?",
    a: "We review the details and, if it looks like a fit, contact you to discuss next steps. We aim to be responsive and clear throughout.",
  },
];

export default function SellToUsPage() {
  return (
    <>
      <PageHero
        eyebrow="Sell to Us"
        title="Thinking about selling a property?"
        intro="AZMERYHOME reviews residential opportunities throughout Houston and surrounding communities. Tell us about your property — there's no obligation, and we evaluate every home individually."
      />

      {/* How it works */}
      <section className="bg-white">
        <Container className="py-16 sm:py-20">
          <SectionHeading eyebrow="How It Works" title="A simple, three-step process." />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {steps.map((s) => (
              <div
                key={s.n}
                className="rounded-xl border border-border bg-white p-6"
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-charcoal font-display text-lg font-bold text-white">
                  {s.n}
                </span>
                <h3 className="mt-4 font-display text-lg text-charcoal">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate">
                  {s.body}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Why + Form */}
      <section className="bg-warmgray">
        <Container className="py-16 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:items-start">
            <div className="lg:sticky lg:top-24">
              <SectionHeading
                eyebrow="Why Contact AZMERYHOME"
                title="Local, direct, and experienced."
              />
              <ul className="mt-6 space-y-3">
                {reasons.map((r) => (
                  <li key={r} className="flex items-start gap-3 text-slate">
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
                    {r}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm text-slate">
                We evaluate properties individually and don&apos;t make
                guaranteed offers or promise to buy every home. We&apos;ll always
                be straight with you.
              </p>
            </div>

            <div id="form">
              <h2 className="mb-4 font-display text-2xl text-charcoal">
                Tell us about your property
              </h2>
              <LeadForm leadType="seller" />
            </div>
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="bg-white">
        <Container className="py-16 sm:py-20">
          <div className="mx-auto max-w-3xl">
            <SectionHeading
              align="center"
              eyebrow="Questions"
              title="Frequently asked questions"
              className="mx-auto"
            />
            <div className="mt-8">
              <FAQ items={faqs} />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
