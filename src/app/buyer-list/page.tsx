import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/PageHero";
import { LeadForm } from "@/components/forms/LeadForm";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Join the Buyer List | AZMERYHOME Houston Home Alerts",
  description:
    "Be first to hear about renovated AZMERYHOME homes for sale across Greater Houston. Join the buyer list for new property alerts.",
  path: "/buyer-list",
});

export default function BuyerListPage() {
  return (
    <>
      <PageHero
        eyebrow="Buyer List"
        title="Be first to see new AZMERYHOME homes."
        intro="Join our buyer list and we'll notify you when a new renovated home becomes available in the areas you care about."
      />

      <section className="bg-white">
        <Container className="py-16 sm:py-20">
          <div className="mx-auto max-w-2xl">
            <LeadForm leadType="buyer-list" />
            <p className="mt-6 text-center text-xs leading-relaxed text-slate/80">
              We&apos;ll only use your information to share relevant property
              updates and to contact you about your inquiry. You can ask us to
              stop at any time.
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
