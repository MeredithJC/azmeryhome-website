import { RoofMark } from "./Logo";

/**
 * Neutral image placeholder shown when owner-supplied photography is not yet
 * provided (spec §24). Clearly marked so real photos replace it before launch.
 */
export function Placeholder({ label }: { label?: string }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-warmgray text-slate/60">
      <RoofMark className="h-10 w-10 text-slate/40" />
      <span className="px-4 text-center text-xs font-medium uppercase tracking-wide">
        {label ?? "Photo coming soon"}
      </span>
    </div>
  );
}
