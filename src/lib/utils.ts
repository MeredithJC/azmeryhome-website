import { clsx, type ClassValue } from "clsx";

/** Merge conditional class names. */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

/** Format a USD price for display, or return null when not authorized/available. */
export function formatPrice(price?: number | null): string | null {
  if (price == null) return null;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);
}
