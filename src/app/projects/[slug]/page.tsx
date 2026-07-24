import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { BeforeAfter } from "@/components/BeforeAfter";
import { Gallery } from "@/components/Gallery";
import { ButtonLink } from "@/components/ui/Button";
import { ProjectStatusBadge } from "@/components/ui/StatusBadge";
import { CTABand } from "@/components/CTABand";
import {
  getProjectBySlug,
  getAllProjectSlugs,
  isPlaceholderProject,
} from "@/lib/content/projects";
import { getPropertyBySlug } from "@/lib/content/properties";
import { STRATEGY_LABEL } from "@/lib/content/types";
import { pageMetadata } from "@/lib/seo";
import { JsonLd, breadcrumbJsonLd } from "@/lib/jsonld";

export function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return pageMetadata({
    title: project.seo.title,
    description: project.seo.description,
    path: `/projects/${project.slug}`,
    image: project.afterImages[0]?.src,
  });
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const placeholder = isPlaceholderProject(project);
  const isReal = (imgs: { src: string }[]) =>
    imgs.length > 0 && !imgs[0].src.includes("placeholder");
  const hasBefore = isReal(project.beforeImages);
  const hasAfter = isReal(project.afterImages);
  const hasDuring = isReal(project.duringImages);
  const linkedProperty = project.linkedPropertySlug
    ? getPropertyBySlug(project.linkedPropertySlug)
    : undefined;

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Projects", path: "/projects" },
    { name: project.title, path: `/projects/${project.slug}` },
  ];

  const clean = (s: string) => s.replace(/^PLACEHOLDER\s*[—-]*\s*/, "");

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <Breadcrumbs items={crumbs} />

      <Container className="py-10 sm:py-14">
        <div className="max-w-3xl">
          <div className="flex flex-wrap items-center gap-3">
            <ProjectStatusBadge status={project.status} />
            <span className="text-sm font-semibold text-gold">
              {STRATEGY_LABEL[project.strategy]}
            </span>
          </div>
          <h1 className="mt-4 font-display text-3xl text-charcoal sm:text-4xl">
            {project.title}
          </h1>
          <p className="mt-2 text-lg text-slate">{project.generalLocation}</p>
        </div>

        {placeholder && (
          <p className="mt-6 rounded-lg border border-gold/40 bg-gold/5 px-4 py-3 text-sm text-charcoal">
            <strong>Note:</strong> This case study is a placeholder. Approved
            facts and real before/during/after photos will replace this content
            before launch.
          </p>
        )}

        {/* Property facts */}
        {(project.facts.beds ||
          project.facts.baths ||
          project.facts.squareFeet ||
          project.facts.propertyType) && (
          <dl className="mt-8 flex flex-wrap gap-x-8 gap-y-3 border-y border-border py-4 text-charcoal">
            {project.facts.beds != null && (
              <Fact label="Bedrooms" value={project.facts.beds} />
            )}
            {project.facts.baths != null && (
              <Fact label="Bathrooms" value={project.facts.baths} />
            )}
            {project.facts.squareFeet != null && (
              <Fact
                label="Square feet"
                value={project.facts.squareFeet.toLocaleString()}
              />
            )}
            {project.facts.propertyType && (
              <Fact label="Type" value={project.facts.propertyType} />
            )}
          </dl>
        )}

        <div className="mt-10 grid gap-10 lg:grid-cols-[1.6fr_1fr] lg:items-start">
          <div className="space-y-10">
            <section>
              <h2 className="font-display text-2xl text-charcoal">
                The opportunity
              </h2>
              <p className="mt-3 leading-relaxed text-slate">
                {clean(project.opportunity)}
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl text-charcoal">
                Renovation scope
              </h2>
              <p className="mt-3 leading-relaxed text-slate">
                {clean(project.renovationSummary)}
              </p>
            </section>

            {hasBefore && hasAfter && (
              <section>
                <h2 className="font-display text-2xl text-charcoal">
                  Before &amp; after
                </h2>
                <div className="mt-4">
                  <BeforeAfter
                    before={project.beforeImages[0]}
                    after={project.afterImages[0]}
                  />
                </div>
              </section>
            )}

            {hasBefore && (
              <section>
                <h2 className="font-display text-2xl text-charcoal">
                  The property before
                </h2>
                <p className="mt-2 text-slate">
                  The home in its original condition, before AZMERYHOME&apos;s
                  renovation.
                </p>
                <div className="mt-4">
                  <Gallery images={project.beforeImages} />
                </div>
              </section>
            )}

            {hasAfter && (
              <section>
                <h2 className="font-display text-2xl text-charcoal">
                  After renovation
                </h2>
                <div className="mt-4">
                  <Gallery images={project.afterImages} />
                </div>
              </section>
            )}

            {!hasBefore && !hasAfter && (
              <section>
                <h2 className="font-display text-2xl text-charcoal">
                  Before &amp; after
                </h2>
                <div className="mt-4">
                  <BeforeAfter
                    before={project.beforeImages[0]}
                    after={project.afterImages[0]}
                  />
                </div>
              </section>
            )}

            {hasDuring && (
              <section>
                <h2 className="font-display text-2xl text-charcoal">
                  During renovation
                </h2>
                <div className="mt-4">
                  <Gallery images={project.duringImages} />
                </div>
              </section>
            )}

            <section className="rounded-xl bg-warmgray p-6">
              <h2 className="font-display text-2xl text-charcoal">Outcome</h2>
              <p className="mt-3 leading-relaxed text-slate">
                {clean(project.outcome)}
              </p>
            </section>
          </div>

          {/* Sidebar CTA */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
              <h2 className="font-display text-xl text-charcoal">
                Have a property like this?
              </h2>
              <p className="mt-2 text-sm text-slate">
                We&apos;re always looking for the next opportunity across Greater
                Houston.
              </p>
              <div className="mt-4 flex flex-col gap-2">
                <ButtonLink href="/sell-to-us" variant="primary">
                  Submit a Property
                </ButtonLink>
                <ButtonLink href="/properties" variant="outline">
                  View Available Homes
                </ButtonLink>
              </div>
            </div>
            {linkedProperty && (
              <ButtonLink
                href={`/properties/${linkedProperty.slug}`}
                variant="ghost"
                className="mt-4 justify-start"
              >
                See the property page →
              </ButtonLink>
            )}
          </aside>
        </div>
      </Container>

      <CTABand
        title="Every project strengthens our track record."
        subtitle="Bring us your property or opportunity — let's create the next one together."
        primary={{ label: "Submit a Property", href: "/sell-to-us" }}
        secondary={{ label: "Partner With Us", href: "/partner-with-us" }}
      />
    </>
  );
}

function Fact({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-wide text-slate">{label}</dt>
      <dd className="text-lg font-semibold text-charcoal">{value}</dd>
    </div>
  );
}
