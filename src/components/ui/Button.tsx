import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "outline" | "ghost";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-md font-semibold tracking-tight transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold disabled:opacity-60 disabled:pointer-events-none text-center";

const variants: Record<Variant, string> = {
  // Warm gold primary action — used sparingly for the main CTA (spec §3).
  primary: "bg-gold text-white hover:bg-gold-dark",
  // Charcoal secondary action.
  secondary: "bg-charcoal text-white hover:bg-black",
  // Outline for secondary actions on light backgrounds.
  outline:
    "border border-charcoal/25 text-charcoal hover:border-charcoal hover:bg-charcoal hover:text-white",
  ghost: "text-charcoal hover:text-gold underline-offset-4 hover:underline",
};

const sizes: Record<Size, string> = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-6 py-3 text-base",
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
}

/** Link-style button (renders an anchor via next/link). */
export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
  ...rest
}: CommonProps & { href: string } & React.ComponentProps<typeof Link>) {
  return (
    <Link
      href={href}
      className={cn(base, variants[variant], sizes[size], className)}
      {...rest}
    >
      {children}
    </Link>
  );
}

/** Native button element (for form submits etc.). */
export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...rest
}: CommonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      {...rest}
    >
      {children}
    </button>
  );
}
