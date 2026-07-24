import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/PageHero";
import { LeadForm } from "@/components/forms/LeadForm";
import type { LeadType } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Partner With AZMERYHOME | Agents, Lenders, Contractors & Vendors",
  description:
    "Bring deals, capital relationships, or services to AZMERYHOME. Dedicated paths for agents and wholesalers, private lenders, contractors, and other Houston real estate professionals.",
  path: "/partner-with-us",
});

interface Branch {
  id: string;
  nav: string;
  title: string;
  intro: string;
  leadType: LeadType;
  note?: string;
}

const branches: Branch[] = [
  {
    id: "agents",
    nav: "Agents & Wholesalers",
    title: "Agents & Wholesalers",
    intro:
      "Have an off-market, distressed, or value-add opportunity in the Houston area? Bring us investment-suitable deals. Share what you know — even partial details help.",
    leadType: "deal",
  },
  {
    id: "capital",
    nav: "Private Lenders",
    title: "Private Lenders & Capital Relationships",
    intro:
      "A professional introduction to AZMERYHOME's investment activities. If you're exploring capital relationships, start a conversation — no pressure, no promises of returns.",
    leadType: "capital",
    note: "This page is informational and relationship-oriented. Nothing here is an offer to sell securities or a solicitation of investment, and we don't advertise or guarantee returns.",
  },
  {
    id: "vendors",
    nav: "Contractors & Vendors",
    title: "Contractors & Vendors",
    intro:
      "We're building a network of qualified contractors and service providers. Tell us about your trade, coverage area, and experience.",
    leadType: "vendor",
  },
  {
    id: "professionals",
    nav: "Other Professionals",
    title: "Other Real Estate Professionals",
    intro:
      "Property managers, inspectors, lenders, title professionals, photographers, designers and other local service partners — we'd like to know you. Use the form below and tell us how you work.",
    leadType: "vendor",
  },
];

export default function PartnerWithUsPage() {
  return (
    <>
      <PageHero
        eyebrow="Partner With Us"
        title="Let's build something together."
        intro="AZMERYHOME works with agents, wholesalers, capital relationships, contractors, and other professionals across Greater Houston. Choose the path that fits you."
      />

      {/* Branch navigation */}
      <div className="sticky top-16 z-30 border-b border-border bg-white/95 backdrop-blur">
        <Container>
          <nav aria-label="Partner types" className="flex gap-1 overflow-x-auto py-2">
            {branches.map((b) => (
              <a
                key={b.id}
                href={`#${b.id}`}
                className="whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium text-charcoal transition-colors hover:bg-warmgray hover:text-gold"
              >
                {b.nav}
              </a>
            ))}
          </nav>
        </Container>
      </div>

      {branches.map((b, i) => (
        <section
          key={b.id}
          id={b.id}
          className={`scroll-mt-32 ${i % 2 === 0 ? "bg-white" : "bg-warmgray"}`}
        >
          <Container className="py-16 sm:py-20">
            <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:items-start">
              <div className="lg:sticky lg:top-32">
                <h2 className="font-display text-2xl text-charcoal sm:text-3xl">
                  {b.title}
                </h2>
                <p className="mt-4 leading-relaxed text-slate">{b.intro}</p>
                {b.note && (
                  <p className="mt-5 rounded-lg border border-border bg-white/60 px-4 py-3 text-sm text-slate">
                    {b.note}
                  </p>
                )}
              </div>
              <LeadForm leadType={b.leadType} />
            </div>
          </Container>
        </section>
      ))}
    </>
  );
}
