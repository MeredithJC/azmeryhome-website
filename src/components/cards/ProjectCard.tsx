import Link from "next/link";
import Image from "next/image";
import type { Project } from "@/lib/content/types";
import { STRATEGY_LABEL } from "@/lib/content/types";
import { ProjectStatusBadge } from "@/components/ui/StatusBadge";
import { Placeholder } from "@/components/ui/Placeholder";

export function ProjectCard({ project }: { project: Project }) {
  const img = project.afterImages[0] ?? project.beforeImages[0];
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-border bg-white transition-shadow hover:shadow-lg"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-warmgray">
        {img && !img.src.includes("placeholder") ? (
          <Image
            src={img.src}
            alt={img.alt}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
        ) : (
          <Placeholder label="Project photos coming soon" />
        )}
        <div className="absolute left-3 top-3">
          <ProjectStatusBadge status={project.status} />
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-sm font-medium text-gold">
          {STRATEGY_LABEL[project.strategy]}
        </p>
        <h3 className="mt-1 font-display text-lg text-charcoal group-hover:text-gold">
          {project.title}
        </h3>
        <p className="mt-1 text-sm text-slate">{project.generalLocation}</p>
        <p className="mt-3 line-clamp-2 text-sm text-slate">
          {project.opportunity.replace(/^PLACEHOLDER[^a-zA-Z]*/, "")}
        </p>
      </div>
    </Link>
  );
}
