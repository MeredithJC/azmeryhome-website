import { Container } from "./ui/Container";

/** Compact charcoal hero for interior pages (spec §5 visual system). */
export function PageHero({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-charcoal text-white">
      {/* Subtle gold accent line motif */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, #b78423 0 1px, transparent 1px 22px)",
        }}
      />
      <Container className="relative py-16 sm:py-20">
        <div className="max-w-3xl">
          {eyebrow && (
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-gold">
              {eyebrow}
            </p>
          )}
          <h1 className="font-display text-3xl text-white sm:text-4xl lg:text-5xl">
            {title}
          </h1>
          {intro && (
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/75">
              {intro}
            </p>
          )}
          {children && <div className="mt-8">{children}</div>}
        </div>
      </Container>
    </section>
  );
}
