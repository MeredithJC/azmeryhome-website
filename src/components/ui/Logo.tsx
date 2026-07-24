import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * AZMERYHOME logo: a stylized roof/house mark paired with the wordmark as live
 * text (spec §3). The wordmark uses `currentColor` so it inverts cleanly on
 * dark backgrounds; the roof mark is warm gold. Replace the inline mark with
 * the approved logo files when provided (spec §24) — the descriptive tagline is
 * intentionally kept as live HTML elsewhere, not baked into this mark.
 */
export function Logo({
  className,
  tone = "dark",
}: {
  className?: string;
  /** "dark" = charcoal wordmark (light bg); "light" = white wordmark (dark bg). */
  tone?: "dark" | "light";
}) {
  return (
    <Link
      href="/"
      aria-label="AZMERYHOME — home"
      className={cn(
        "group inline-flex items-center gap-2.5",
        tone === "light" ? "text-white" : "text-charcoal",
        className,
      )}
    >
      <RoofMark className="h-8 w-8 shrink-0 text-gold" />
      <span className="text-lg font-bold tracking-[0.02em] font-display">
        AZMERY<span className="text-gold">HOME</span>
      </span>
    </Link>
  );
}

/** Roof / house monogram mark (also usable as favicon/app icon source). */
export function RoofMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      {/* Roofline */}
      <path
        d="M6 24 L24 8 L42 24"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* House body */}
      <path
        d="M11 22 V40 H37 V22"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Door */}
      <path
        d="M21 40 V30 H27 V40"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
