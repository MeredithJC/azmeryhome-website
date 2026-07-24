import { cn } from "@/lib/utils";
import {
  PROPERTY_STATUS_LABEL,
  PROJECT_STATUS_LABEL,
  type PropertyStatus,
  type ProjectStatus,
} from "@/lib/content/types";

const tone: Record<string, string> = {
  "for-sale": "bg-gold text-white",
  "coming-soon": "bg-charcoal text-white",
  "under-contract": "bg-slate text-white",
  sold: "bg-warmgray text-charcoal border border-border",
  renovation: "bg-charcoal text-white",
  hold: "bg-slate text-white",
  rental: "bg-slate text-white",
};

export function PropertyStatusBadge({
  status,
  className,
}: {
  status: PropertyStatus;
  className?: string;
}) {
  return (
    <span className={cn(badgeBase, tone[status], className)}>
      {PROPERTY_STATUS_LABEL[status]}
    </span>
  );
}

export function ProjectStatusBadge({
  status,
  className,
}: {
  status: ProjectStatus;
  className?: string;
}) {
  return (
    <span className={cn(badgeBase, tone[status], className)}>
      {PROJECT_STATUS_LABEL[status]}
    </span>
  );
}

const badgeBase =
  "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide";
