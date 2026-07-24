import { cn } from "@/lib/utils";

/** Consistent section heading with optional eyebrow + intro (spec §3 hierarchy). */
export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  as: Tag = "h2",
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  align?: "left" | "center";
  as?: "h1" | "h2" | "h3";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-gold">
          {eyebrow}
        </p>
      )}
      <Tag
        className={cn(
          "font-display",
          Tag === "h1"
            ? "text-3xl sm:text-4xl lg:text-5xl"
            : "text-2xl sm:text-3xl",
        )}
      >
        {title}
      </Tag>
      {intro && (
        <p className="mt-4 text-lg leading-relaxed text-slate">{intro}</p>
      )}
    </div>
  );
}
