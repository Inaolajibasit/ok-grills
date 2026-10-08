import Link from "next/link";
import { navigationLinks } from "@/components/layout/navigation-links";
import { Container } from "@/components/ui/container";

interface SiteFooterProps {
  businessName: string;
  tagline: string;
  instagramUrl?: string;
}

export function SiteFooter({ businessName, tagline, instagramUrl }: SiteFooterProps) {
  return (
    <footer className="border-t border-line bg-charcoal">
      <Container className="py-12 sm:py-16">
        <div className="flex flex-col justify-between gap-10 md:flex-row">
          <div>
            <Link
              href="/"
              className="text-3xl font-black uppercase leading-none tracking-[-0.06em] text-brand"
            >
              {businessName}
            </Link>
            <p className="mt-3 font-mono text-xs uppercase tracking-[0.16em] text-ash">
              {tagline}
            </p>
          </div>
          <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-6 gap-y-3">
            {navigationLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="inline-flex min-h-11 items-center text-sm text-bone hover:text-brand"
              >
                {link.label}
              </Link>
            ))}
            <Link href="/cart" className="inline-flex min-h-11 items-center text-sm text-bone hover:text-brand">
              Cart
            </Link>
          </nav>
        </div>
        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6 text-xs text-ash">
          <span>© {new Date().getFullYear()} {businessName}</span>
          {instagramUrl && (
            <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center hover:text-brand">
              Instagram
            </a>
          )}
        </div>
      </Container>
    </footer>
  );
}
