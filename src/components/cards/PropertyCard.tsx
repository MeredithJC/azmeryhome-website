import Link from "next/link";
import Image from "next/image";
import type { Property } from "@/lib/content/types";
import { PropertyStatusBadge } from "@/components/ui/StatusBadge";
import { formatPrice } from "@/lib/utils";
import { Placeholder } from "@/components/ui/Placeholder";

export function PropertyCard({ property }: { property: Property }) {
  const price = formatPrice(property.price ?? undefined);
  const img = property.heroImage ?? property.gallery[0];
  return (
    <Link
      href={`/properties/${property.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-border bg-white transition-shadow hover:shadow-lg"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-warmgray">
        {img ? (
          <Image
            src={img.src}
            alt={img.alt}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
        ) : (
          <Placeholder label="Property photo" />
        )}
        <div className="absolute left-3 top-3">
          <PropertyStatusBadge status={property.status} />
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-sm font-medium text-slate">
          {property.city}, {property.state}
        </p>
        <h3 className="mt-1 font-display text-lg text-charcoal group-hover:text-gold">
          {property.publicLocation}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm text-slate">
          {property.shortDescription}
        </p>
        <div className="mt-4 flex items-center gap-4 border-t border-border pt-4 text-sm text-charcoal">
          <span>
            <strong>{property.beds}</strong> bd
          </span>
          <span>
            <strong>{property.baths}</strong> ba
          </span>
          {property.squareFeet && (
            <span>
              <strong>{property.squareFeet.toLocaleString()}</strong> sqft
            </span>
          )}
          {price && <span className="ml-auto font-semibold text-gold">{price}</span>}
        </div>
      </div>
    </Link>
  );
}
