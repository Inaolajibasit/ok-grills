import Image from "next/image";
import { HeaderScrollState } from "./header-scroll-state";
import Link from "next/link";
import { MobileNavigation } from "@/components/layout/mobile-navigation";
import { headerNavigationLinks } from "@/components/layout/navigation-links";
import { Container } from "@/components/ui/container";
import styles from "./site-header.module.css";
import { CartTrigger } from "@/components/cart/cart-trigger";

interface SiteHeaderProps {
  businessName: string;
  logoSrc: string | null;
  starSrc: string | null;
}

export function SiteHeader({ businessName, logoSrc, starSrc }: SiteHeaderProps) {
  return (
    <header className={`${styles.header} z-40 border-b border-line bg-ink`}>
      <HeaderScrollState />
      <Container className="relative grid min-h-[10rem] grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-4 lg:min-h-[11.5rem]">
        <MobileNavigation />
        <nav aria-label="Main navigation" className="hidden items-center gap-6 justify-self-start lg:flex">
          {headerNavigationLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="inline-flex min-h-11 min-w-11 items-center text-xs font-bold uppercase tracking-[0.1em] text-bone transition-colors hover:text-brand"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/"
          className={`${styles.logo} relative isolate inline-flex items-center justify-center justify-self-center rounded-full focus-visible:outline-2`}
          aria-label={businessName + " home"}
        >
          {logoSrc ? (
            <>
              {starSrc && (
                <span className="pointer-events-none absolute inset-0 flex items-center justify-center" aria-hidden="true">
                  <Image
                    src={starSrc}
                    alt=""
                    width={176}
                    height={176}
                    loading="eager"
                    className={styles.star}
                  />
                </span>
              )}
              <Image
                src={logoSrc}
                alt=""
                width={96}
                height={96}
                loading="eager"
                className={`${styles.logoImage} relative z-10 rounded-full bg-bone p-1 object-contain`}
              />
            </>
          ) : (
            <span className="text-xl font-black uppercase text-brand">{businessName}</span>
          )}
        </Link>
        <CartTrigger className="justify-self-end" />
      </Container>
    </header>
  );
}
