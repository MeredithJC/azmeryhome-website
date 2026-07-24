import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { RoofMark } from "@/components/ui/Logo";

export default function NotFound() {
  return (
    <section className="bg-white">
      <Container className="flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
        <RoofMark className="h-12 w-12 text-gold" />
        <p className="mt-6 text-sm font-semibold uppercase tracking-[0.14em] text-gold">
          404
        </p>
        <h1 className="mt-2 font-display text-3xl text-charcoal sm:text-4xl">
          We couldn&apos;t find that page.
        </h1>
        <p className="mt-4 max-w-md text-slate">
          The page you&apos;re looking for may have moved or no longer exists.
          Let&apos;s get you back on track.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/" variant="primary" size="lg">
            Back to Home
          </ButtonLink>
          <ButtonLink href="/properties" variant="outline" size="lg">
            View Properties
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
