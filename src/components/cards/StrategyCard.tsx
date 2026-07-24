import Link from "next/link";

const icons: Record<string, React.ReactNode> = {
  "fix-flip": (
    <path
      d="M4 20l6-6m0 0l3 3 7-7-3-3-7 7-3-3-3 3 3 3z"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  "buy-hold": (
    <path
      d="M3 11l9-7 9 7M5 10v10h14V10M9 20v-6h6v6"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  rentals: (
    <path
      d="M3 21h18M6 21V8l6-4 6 4v13M10 21v-5h4v5"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
};

/** Strategy card: Fix & Flip / Buy & Hold / Rentals (spec §5.3, §8). */
export function StrategyCard({
  strategyKey,
  title,
  summary,
}: {
  strategyKey: string;
  title: string;
  summary: string;
}) {
  return (
    <div className="flex flex-col rounded-xl border border-border bg-white p-7">
      <span className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-warmgray text-gold">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          {icons[strategyKey]}
        </svg>
      </span>
      <h3 className="mt-5 font-display text-xl text-charcoal">{title}</h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-slate">{summary}</p>
      <Link
        href="/what-we-do"
        className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-gold hover:underline"
      >
        Learn how it works
        <span aria-hidden="true">→</span>
      </Link>
    </div>
  );
}
