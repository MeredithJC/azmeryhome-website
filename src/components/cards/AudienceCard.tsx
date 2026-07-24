import Link from "next/link";

/** Audience pathway card (spec §2, §5.2) — routes each visitor type. */
export function AudienceCard({
  title,
  blurb,
  cta,
  href,
}: {
  title: string;
  blurb: string;
  cta: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group flex flex-col rounded-xl border border-border bg-white p-6 transition-all hover:border-gold hover:shadow-md"
    >
      <h3 className="font-display text-lg text-charcoal">{title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-slate">{blurb}</p>
      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-gold">
        {cta}
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
          className="transition-transform group-hover:translate-x-0.5"
        >
          <path
            d="M6 3l5 5-5 5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </Link>
  );
}
