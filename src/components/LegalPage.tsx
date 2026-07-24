import { Container } from "./ui/Container";
import { PageHero } from "./PageHero";

/** Shared layout + typography for legal/policy pages. */
export function LegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <PageHero eyebrow="Legal" title={title} />
      <section className="bg-white">
        <Container className="py-14 sm:py-16">
          <div className="legal-prose mx-auto max-w-3xl">
            <p className="text-sm text-slate">Last updated: {updated}</p>
            {children}
          </div>
        </Container>
      </section>
    </>
  );
}
