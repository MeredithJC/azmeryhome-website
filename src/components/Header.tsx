"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Container } from "./ui/Container";
import { Logo } from "./ui/Logo";
import { ButtonLink } from "./ui/Button";
import { primaryNav, primaryCta } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Logo />

        {/* Desktop nav */}
        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-6">
            {primaryNav.slice(1).map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "text-sm font-medium transition-colors hover:text-gold",
                      active ? "text-gold" : "text-charcoal",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <ButtonLink href={primaryCta.href} variant="primary">
            {primaryCta.label}
          </ButtonLink>
        </div>

        {/* Mobile: persistent seller CTA + menu toggle (spec §4) */}
        <div className="flex items-center gap-2 lg:hidden">
          <ButtonLink
            href={primaryCta.href}
            variant="primary"
            size="md"
            className="px-3 py-2 text-xs"
          >
            Submit a Property
          </ButtonLink>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border text-charcoal"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              {open ? (
                <path
                  d="M6 6l12 12M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              ) : (
                <path
                  d="M4 7h16M4 12h16M4 17h16"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              )}
            </svg>
          </button>
        </div>
      </Container>

      {/* Mobile menu panel */}
      {open && (
        <nav
          id="mobile-menu"
          aria-label="Primary mobile"
          className="border-t border-border bg-white lg:hidden"
        >
          <Container className="py-3">
            <ul className="flex flex-col">
              {primaryNav.map((item) => {
                const active =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "block rounded-md px-3 py-3 text-base font-medium",
                        active
                          ? "bg-warmgray text-gold"
                          : "text-charcoal hover:bg-warmgray",
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </Container>
        </nav>
      )}
    </header>
  );
}
