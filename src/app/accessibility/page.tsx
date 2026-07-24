import { LegalPage } from "@/components/LegalPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Accessibility",
  description:
    "AZMERYHOME's commitment to an accessible website that follows WCAG 2.2 AA practices.",
  path: "/accessibility",
});

export default function AccessibilityPage() {
  return (
    <LegalPage title="Accessibility" updated="July 2026">
      <p>
        AZMERYHOME is committed to making this website usable for as many people
        as possible. We aim to follow the Web Content Accessibility Guidelines
        (WCAG) 2.2 Level AA as a practical standard.
      </p>

      <h2>What we do</h2>
      <ul>
        <li>Keyboard-accessible navigation, menus, and forms.</li>
        <li>Visible focus indicators for interactive elements.</li>
        <li>Sufficient color contrast between text and backgrounds.</li>
        <li>Semantic headings, landmarks, and labels for form fields.</li>
        <li>Meaningful alternative text for informative images.</li>
        <li>Respect for reduced-motion preferences.</li>
        <li>Touch targets sized for comfortable mobile use.</li>
      </ul>

      <h2>Ongoing effort</h2>
      <p>
        Accessibility is an ongoing effort, and some areas may not yet be fully
        optimized. We continue to test and improve the site as it grows.
      </p>

      <h2>Feedback</h2>
      <p>
        If you encounter an accessibility barrier on this site, please let us
        know through our <a href="/contact">Contact page</a> so we can address
        it. We welcome your feedback.
      </p>
    </LegalPage>
  );
}
