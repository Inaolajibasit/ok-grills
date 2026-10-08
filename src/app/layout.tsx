import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { SmoothScroll } from "@/components/motion/smooth-scroll";
import { getSiteSettings } from "@/services/settings";
import { getMenuProducts } from "@/services/products";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { getBuildBoxSections } from "@/services/build-your-box";
import "lenis/dist/lenis.css";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: { default: "OK Grills", template: "%s | OK Grills" },
  description: "OK Grills. Fire. Food. Functions.",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const [settings, products, buildBoxSections] = await Promise.all([getSiteSettings(), getMenuProducts(), getBuildBoxSections()]);

  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-5 focus:top-5 focus:z-50 focus:bg-brand focus:px-4 focus:py-3 focus:text-ink"
        >
          Skip to content
        </a>
        <SiteHeader
          businessName={settings.businessName}
          logoSrc={settings.hero.logoSrc}
          starSrc={settings.hero.starSrc}
        />
        <main id="main-content" className="flex-1" tabIndex={-1}>
          {children}
        </main>
        <SiteFooter
          businessName={settings.businessName}
          tagline={settings.tagline}
          instagramUrl={settings.social.instagram}
        />
        <SmoothScroll />
        <CartDrawer products={products} buildBoxSections={buildBoxSections} deliveryNotice={settings.deliveryNotice} />
      </body>
    </html>
  );
}
