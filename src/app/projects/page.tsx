import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/PageHero";
import { ProjectCard } from "@/components/cards/ProjectCard";
import { CTABand } from "@/components/CTABand";
import { getProjects } from "@/lib/content/projects";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Projects | AZMERYHOME Houston Renovation Portfolio",
  description:
    "A growing record of real AZMERYHOME projects across Greater Houston — renovations, resales, holds and rentals, with real photography and honest facts.",
  path: "/projects",
});

export default function ProjectsPage() {
  const projects = getProjects();

  return (
    <>
      <PageHero
        eyebrow="Our Portfolio"
        title="Real projects. Real results."
        intro="Trust is built one project at a time. As our portfolio grows, each completed project is documented here with real photography and honest facts."
      />

      <section className="bg-white">
        <Container className="py-16 sm:py-20">
          {projects.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((p) => (
                <ProjectCard key={p.slug} project={p} />
              ))}
            </div>
          ) : (
            <div className="mx-auto max-w-xl rounded-2xl border border-border bg-warmgray p-10 text-center">
              <h2 className="font-display text-2xl text-charcoal">
                Case studies coming soon
              </h2>
              <p className="mt-3 text-slate">
                Our first project case studies are being prepared. Check back
                soon.
              </p>
            </div>
          )}
        </Container>
      </section>

      <CTABand
        title="Have a property with potential?"
        subtitle="We're always looking for the next opportunity across Greater Houston."
        primary={{ label: "Submit a Property", href: "/sell-to-us" }}
        secondary={{ label: "View Available Homes", href: "/properties" }}
      />
    </>
  );
}
