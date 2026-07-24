import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { RoofMark } from "@/components/ui/Logo";
import { leadMeta, formConfigs } from "@/lib/forms/configs";
import type { LeadType } from "@/lib/site";
import type { Metadata } from "next";

// Confirmation pages are utility routes — keep them out of the index (spec §15).
export const metadata: Metadata = {
  robots: { index: false, follow: false },
  title: "Thank You",
};

export function generateStaticParams() {
  return Object.keys(formConfigs).map((leadType) => ({ leadType }));
}

export default async function ThankYouPage({
  params,
}: {
  params: Promise<{ leadType: string }>;
}) {
  const { leadType } = await params;
  if (!(leadType in leadMeta)) notFound();
  const info = leadMeta[leadType as LeadType];

  return (
    <section className="bg-white">
      <Container className="flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
        <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-gold/15 text-gold">
          <RoofMark className="h-9 w-9" />
        </span>
        <h1 className="mt-6 max-w-2xl font-display text-3xl text-charcoal sm:text-4xl">
          {info.thankYouTitle}
        </h1>
        <p className="mt-4 max-w-xl text-lg leading-relaxed text-slate">
          {info.thankYouBody}
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
