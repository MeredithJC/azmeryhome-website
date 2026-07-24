import { LegalPage } from "@/components/LegalPage";
import { site } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description:
    "How AZMERYHOME LLC collects, uses, and protects information submitted through this website.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" updated="July 2026">
      <p>
        This Privacy Policy explains how {site.legalName} (&ldquo;AZMERYHOME,&rdquo;
        &ldquo;we,&rdquo; &ldquo;us&rdquo;) handles information collected through
        this website. We aim to collect only what we need to respond to your
        inquiries and operate our business.
      </p>

      <h2>Information we collect</h2>
      <p>
        When you submit a form on this site, we collect the information you
        choose to provide — such as your name, email, phone number, and details
        about a property or inquiry. We also collect limited technical
        information, including the page a form was submitted from and, where
        available, basic source/referral data.
      </p>
      <p>
        We do not ask for Social Security numbers, bank statements, detailed
        credit information, or other unnecessary sensitive financial data through
        our public forms. Please do not send that information to us.
      </p>

      <h2>How we use information</h2>
      <ul>
        <li>To respond to your inquiry and communicate with you about it.</li>
        <li>To evaluate properties, deals, or partnership opportunities you submit.</li>
        <li>To operate, maintain, and improve our website.</li>
      </ul>
      <p>
        We use privacy-conscious website analytics to understand aggregate usage.
        We do not sell your personal information.
      </p>

      <h2>Marketing communications</h2>
      <p>
        Submitting a general inquiry does not subscribe you to marketing
        messages. If we later offer email or SMS updates (such as buyer-list
        alerts), we will ask for your explicit consent and provide a way to opt
        out.
      </p>

      <h2>How information is shared</h2>
      <p>
        We may share information with service providers who help us operate the
        website and communicate with you (for example, our email delivery
        provider), and where required by law. These providers are expected to
        handle information consistent with this policy.
      </p>

      <h2>Data retention &amp; security</h2>
      <p>
        We retain inquiry information for as long as needed to respond and for
        legitimate business record-keeping. We use reasonable safeguards to
        protect information, though no method of transmission or storage is
        completely secure.
      </p>

      <h2>Your choices</h2>
      <p>
        You may ask us to update or delete the information you submitted, or to
        stop contacting you, by emailing{" "}
        {site.contact.email ? (
          <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
        ) : (
          "us using the contact details published on our Contact page"
        )}
        .
      </p>

      <h2>Contact</h2>
      <p>
        Questions about this policy can be directed to AZMERYHOME through our{" "}
        <a href="/contact">Contact page</a>.
      </p>

      <p>
        <em>
          This policy is provided for general informational purposes and will be
          reviewed and finalized with appropriate professional guidance before
          production launch.
        </em>
      </p>
    </LegalPage>
  );
}
