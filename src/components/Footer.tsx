import Link from "next/link";
import { Container } from "./ui/Container";
import { Logo } from "./ui/Logo";
import { ButtonLink } from "./ui/Button";
import { site, primaryNav } from "@/lib/site";

const legalNav = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Accessibility", href: "/accessibility" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto bg-charcoal text-white/80">
      <Container className="py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          {/* Brand + description */}
          <div>
            <Logo tone="light" />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/65">
              {site.legalName} is a Houston-based residential real estate
              investment company acquiring, renovating and managing homes
              throughout Greater Houston.
            </p>
            <p className="mt-4 text-sm font-medium text-white">
              Serving {site.serviceArea}
            </p>
          </div>

          {/* Navigation */}
          <nav aria-label="Footer">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-white">
              Explore
            </h2>
            <ul className="mt-4 space-y-2 text-sm">
              {primaryNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-white/70 transition-colors hover:text-gold"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* CTAs + contact */}
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-white">
              Work With Us
            </h2>
            <div className="mt-4 flex flex-col gap-2.5">
              <ButtonLink href="/sell-to-us" variant="primary" size="md">
                Submit a Property
              </ButtonLink>
              <ButtonLink
                href="/properties"
                variant="ghost"
                size="md"
                className="justify-start border border-white/25 text-white hover:bg-white hover:text-charcoal"
              >
                View Properties
              </ButtonLink>
              <ButtonLink
                href="/partner-with-us"
                variant="ghost"
                size="md"
                className="justify-start border border-white/25 text-white hover:bg-white hover:text-charcoal"
              >
                Partner With Us
              </ButtonLink>
            </div>
            {site.contact.email && (
              <p className="mt-5 text-sm">
                <a
                  href={`mailto:${site.contact.email}`}
                  className="text-white/70 hover:text-gold"
                >
                  {site.contact.email}
                </a>
              </p>
            )}
            {site.contact.phone && (
              <p className="mt-1 text-sm">
                <a
                  href={`tel:${site.contact.phone.replace(/[^\d+]/g, "")}`}
                  className="text-white/70 hover:text-gold"
                >
                  {site.contact.phone}
                </a>
              </p>
            )}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.legalName}. All rights reserved.
          </p>
          <nav aria-label="Legal">
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              {legalNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-white/60 hover:text-gold"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <p className="mt-6 text-xs leading-relaxed text-white/40">
          AZMERYHOME LLC is a real estate investment company. It is not a
          licensed real estate brokerage, and nothing on this site constitutes
          brokerage, lending, tax, legal, or investment advice.
        </p>
      </Container>
    </footer>
  );
}
