/** Accessible FAQ using native <details>/<summary> — keyboard-friendly, no JS. */
export interface FaqItem {
  q: string;
  a: React.ReactNode;
}

export function FAQ({ items }: { items: FaqItem[] }) {
  return (
    <div className="divide-y divide-border border-y border-border">
      {items.map((item, i) => (
        <details key={i} className="group py-1">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-left font-semibold text-charcoal marker:content-none">
            <span>{item.q}</span>
            <span
              aria-hidden="true"
              className="shrink-0 text-gold transition-transform duration-200 group-open:rotate-45"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M10 4v12M4 10h12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </summary>
          <div className="pb-5 pr-8 leading-relaxed text-slate">{item.a}</div>
        </details>
      ))}
    </div>
  );
}
