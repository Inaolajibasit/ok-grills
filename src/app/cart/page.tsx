import type { Metadata } from "next";
import { Danfo } from "next/font/google";
import { CartContent } from "@/components/cart/cart-content";
import { Container } from "@/components/ui/container";
import { getMenuProducts } from "@/services/products";
import { getSiteSettings } from "@/services/settings";
import { getBuildBoxSections } from "@/services/build-your-box";

const heading = Danfo({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = { title: "Your cart", description: "Review and edit your OK Grills cart.", robots: { index: false, follow: true } };

export default async function CartPage() {
  const [products, settings, buildBoxSections] = await Promise.all([getMenuProducts(), getSiteSettings(), getBuildBoxSections()]);
  return (
    <Container className="max-w-3xl py-12 sm:py-16">
      <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-brand">Your feast, your way</p>
      <h1 className={`${heading.className} mb-10 text-[clamp(3rem,8vw,5rem)] uppercase leading-none`}>Your cart<span className="text-brand">.</span></h1>
      <CartContent products={products} buildBoxSections={buildBoxSections} deliveryNotice={settings.deliveryNotice} checkout={{ businessName: settings.businessName, whatsappNumber: settings.whatsappNumber, orderingEnabled: settings.orderingEnabled, confirmationNotice: settings.checkout.confirmationNotice }} />
    </Container>
  );
}
