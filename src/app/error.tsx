"use client";

import { Container } from "@/components/ui/Container";
import { Button, ButtonLink } from "@/components/ui/Button";
import { RoofMark } from "@/components/ui/Logo";

/** Global error boundary (spec §18.4 accessible error messaging). */
export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <section className="bg-white">
      <Container className="flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
        <RoofMark className="h-12 w-12 text-gold" />
        <h1 className="mt-6 font-display text-3xl text-charcoal sm:text-4xl">
          Something went wrong.
        </h1>
        <p className="mt-4 max-w-md text-slate">
          We hit an unexpected error. Please try again, or head back home.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button onClick={reset} size="lg">
            Try again
          </Button>
          <ButtonLink href="/" variant="outline" size="lg">
            Back to Home
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
