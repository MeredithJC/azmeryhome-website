import Image from "next/image";
import type { GalleryImage } from "@/lib/content/types";
import { Placeholder } from "./ui/Placeholder";

/**
 * Simple, accessible before/after layout (spec §17): two labeled images side by
 * side — touch-friendly and performant, with no gimmicky drag slider.
 */
export function BeforeAfter({
  before,
  after,
}: {
  before?: GalleryImage;
  after?: GalleryImage;
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <BeforeAfterPane label="Before" image={before} />
      <BeforeAfterPane label="After" image={after} />
    </div>
  );
}

function BeforeAfterPane({
  label,
  image,
}: {
  label: string;
  image?: GalleryImage;
}) {
  const isPlaceholder = !image || image.src.includes("placeholder");
  return (
    <figure>
      <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-warmgray">
        {isPlaceholder ? (
          <Placeholder label={`${label} photo coming soon`} />
        ) : (
          <Image
            src={image.src}
            alt={image.alt}
            fill
            loading="lazy"
            sizes="(max-width: 640px) 100vw, 512px"
            className="object-cover"
          />
        )}
        <figcaption className="absolute left-3 top-3 rounded-full bg-charcoal/85 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
          {label}
        </figcaption>
      </div>
    </figure>
  );
}
