import { LegalPage } from "@/components/LegalPage";
import { site } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Terms of Use",
  description:
    "The terms governing use of the AZMERYHOME LLC website, including property-information disclaimers.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Use" updated="July 2026">
      <p>
        These Terms of Use govern your use of the {site.legalName} website. By
        using this site, you agree to these terms. If you do not agree, please
        do not use the site.
      </p>

      <h2>About AZMERYHOME</h2>
      <p>
        {site.legalName} is a residential real estate investment company serving
        Greater Houston. AZMERYHOME is not a licensed real estate brokerage, and
        nothing on this website constitutes brokerage, lending, tax, legal, or
        investment advice, nor an offer or solicitation to buy or sell
        securities.
      </p>

      <h2>Property information disclaimer</h2>
      <p>
        Property and project information on this site is provided for general
        informational purposes and is deemed reliable but is not guaranteed.
        Availability, pricing, features, and status are subject to change without
        notice and are subject to applicable listing and transaction
        documentation. Where a property is represented by a licensed listing
        agent or broker, listing information is presented according to the
        applicable agreement and rules.
      </p>

      <h2>No guaranteed offers or outcomes</h2>
      <p>
        We evaluate properties and opportunities individually. Submitting
        information does not create any obligation, and we do not promise a
        guaranteed offer, price, closing time, or outcome.
      </p>

      <h2>Your submissions</h2>
      <p>
        You agree to provide accurate information and not to submit unlawful,
        infringing, or malicious content. Do not submit sensitive personal or
        financial information through our public forms.
      </p>

      <h2>Intellectual property</h2>
      <p>
        The content, branding, and materials on this site are owned by or
        licensed to AZMERYHOME and may not be copied or used without permission.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        The site is provided &ldquo;as is&rdquo; without warranties of any kind.
        To the fullest extent permitted by law, AZMERYHOME is not liable for any
        damages arising from your use of the site or reliance on its content.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about these terms can be directed to AZMERYHOME through our{" "}
        <a href="/contact">Contact page</a>.
      </p>

      <p>
        <em>
          These terms are provided for general informational purposes and will
          be reviewed and finalized with appropriate professional guidance before
          production launch.
        </em>
      </p>
    </LegalPage>
  );
}
