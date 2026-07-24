import Image from "next/image";
import type { GalleryImage } from "@/lib/content/types";
import { Placeholder } from "./ui/Placeholder";

/**
 * Optimized responsive image gallery (spec §6.2, §17). Non-placeholder images
 * are lazy-loaded except the first (priority). Placeholders render a neutral
 * state until real photos are supplied.
 */
export function Gallery({ images }: { images: GalleryImage[] }) {
  if (images.length === 0) {
    return (
      <div className="relative aspect-[16/9] overflow-hidden rounded-xl">
        <Placeholder label="Gallery photos coming soon" />
      </div>
    );
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {images.map((img, i) => {
        const isPlaceholder = img.src.includes("placeholder");
        return (
          <figure
            key={i}
            className={i === 0 ? "sm:col-span-2" : undefined}
          >
            <div
              className={`relative overflow-hidden rounded-xl bg-warmgray ${
                i === 0 ? "aspect-[16/9]" : "aspect-[4/3]"
              }`}
            >
              {isPlaceholder ? (
                <Placeholder label="Photo coming soon" />
              ) : (
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  priority={i === 0}
                  loading={i === 0 ? undefined : "lazy"}
                  sizes={
                    i === 0
                      ? "(max-width: 1024px) 100vw, 1024px"
                      : "(max-width: 640px) 100vw, 512px"
                  }
                  className="object-cover"
                />
              )}
            </div>
            {img.caption && (
              <figcaption className="mt-2 text-sm text-slate">
                {img.caption}
              </figcaption>
            )}
          </figure>
        );
      })}
    </div>
  );
}
