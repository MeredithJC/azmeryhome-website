import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * AZMERYHOME logo (spec §5). Uses the official brand artwork extracted to a
 * transparent PNG. Two production variants:
 *  - default (dark tone): full-color logo for light backgrounds (header)
 *  - light tone: reversed logo for dark backgrounds (footer)
 * The tagline is kept as separate live text elsewhere, not baked into the mark.
 */
export function Logo({
  className,
  tone = "dark",
}: {
  className?: string;
  /** "dark" = full-color logo (light bg); "light" = reversed logo (dark bg). */
  tone?: "dark" | "light";
}) {
  const src =
    tone === "light"
      ? "/brand/azmeryhome-logo-light.png"
      : "/brand/azmeryhome-logo.png";
  return (
    <Link href="/" aria-label="AZMERYHOME LLC — home" className="inline-flex">
      <Image
        src={src}
        alt="AZMERYHOME LLC"
        width={880}
        height={437}
        priority
        className={cn("h-11 w-auto", className)}
      />
    </Link>
  );
}

/** Roof / house monogram mark, used for decorative accents across the site. */
export function RoofMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M6 24 L24 8 L42 24"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11 22 V40 H37 V22"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
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
