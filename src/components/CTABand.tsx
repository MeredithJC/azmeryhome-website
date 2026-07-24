import { Container } from "./ui/Container";
import { ButtonLink } from "./ui/Button";

/** Reusable dark conversion band with a primary + optional secondary CTA. */
export function CTABand({
  title,
  subtitle,
  primary,
  secondary,
}: {
  title: string;
  subtitle?: string;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
}) {
  return (
    <section className="bg-charcoal text-white">
      <Container className="py-16 sm:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-2xl text-white sm:text-3xl">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-4 text-lg leading-relaxed text-white/75">
              {subtitle}
            </p>
          )}
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <ButtonLink href={primary.href} variant="primary" size="lg">
              {primary.label}
            </ButtonLink>
            {secondary && (
              <ButtonLink
                href={secondary.href}
                size="lg"
                className="border border-white/30 text-white hover:bg-white hover:text-charcoal"
                variant="ghost"
              >
                {secondary.label}
              </ButtonLink>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
