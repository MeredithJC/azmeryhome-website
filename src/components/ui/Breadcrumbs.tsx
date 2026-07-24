import Link from "next/link";
import { Container } from "./Container";

/** Visible breadcrumb trail (pairs with BreadcrumbList JSON-LD, spec §15). */
export function Breadcrumbs({
  items,
}: {
  items: { name: string; path: string }[];
}) {
  return (
    <nav aria-label="Breadcrumb" className="border-b border-border bg-white">
      <Container className="py-3">
        <ol className="flex flex-wrap items-center gap-1.5 text-sm text-slate">
          {items.map((item, i) => {
            const last = i === items.length - 1;
            return (
              <li key={item.path} className="flex items-center gap-1.5">
                {last ? (
                  <span aria-current="page" className="font-medium text-charcoal">
                    {item.name}
                  </span>
                ) : (
                  <>
                    <Link href={item.path} className="hover:text-gold">
                      {item.name}
                    </Link>
                    <span aria-hidden="true" className="text-slate/50">
                      /
                    </span>
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </Container>
    </nav>
  );
}
