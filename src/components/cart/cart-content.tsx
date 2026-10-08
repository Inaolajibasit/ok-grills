"use client";

import { ShoppingBag } from "lucide-react";
import dynamic from "next/dynamic";
import { ButtonLink } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { useCartStore } from "@/store/cart-store";
import type { Product } from "@/types/product";
import type { BuildBoxSection } from "@/types/build-your-box";
import { CartItem } from "./cart-item";
import { CartSummary } from "./cart-summary";
import type { CheckoutConfig } from "./checkout-form";
import styles from "./cart.module.css";

const CheckoutForm = dynamic(() => import("./checkout-form").then((module) => module.CheckoutForm), { loading: () => <p role="status">Loading delivery details…</p> });

interface CartContentProps {
  products: Product[];
  buildBoxSections: BuildBoxSection[];
  deliveryNotice: string;
  onContinueShopping?: () => void;
  checkout?: CheckoutConfig;
}

export function CartContent({ products, buildBoxSections, deliveryNotice, onContinueShopping, checkout }: CartContentProps) {
  const { lines, totals, hasHydrated } = useCart(products, buildBoxSections);
  const clearCart = useCartStore((state) => state.clearCart);
  const persistenceUnavailable = useCartStore((state) => state.persistenceUnavailable);
  const storageNotice = persistenceUnavailable ? <p className={styles.issue} role="status">Your browser could not save this cart. Keep this page open until you continue on WhatsApp; reloading may lose your changes.</p> : null;

  if (!hasHydrated) return <p className={styles.loading} role="status">Loading your cart…</p>;
  if (lines.length === 0) return (
    <div className={styles.empty}>
      {storageNotice}
      <ShoppingBag size={48} strokeWidth={1.2} aria-hidden="true" />
      <h2>Your next feast starts here.</h2>
      <p>Your cart is empty. Find something that hits the spot.</p>
      <ButtonLink href="/menu" onClick={onContinueShopping}>Explore the menu</ButtonLink>
    </div>
  );

  return (
    <div className={styles.content}>
      {storageNotice}
      <div className={styles.listTools}>
        <p role="status">{totals.count} {totals.count === 1 ? "item" : "items"} in your cart</p>
        <button type="button" onClick={clearCart}>Clear cart</button>
      </div>
      <h2 className="sr-only">Cart items</h2>
      <ul className={styles.itemList} aria-label="Cart items">
        {lines.map((line) => <CartItem key={line.item.id} line={line} />)}
      </ul>
      <CartSummary totals={totals} deliveryNotice={deliveryNotice} />
      {checkout ? <CheckoutForm products={products} buildBoxSections={buildBoxSections} config={checkout} /> : <ButtonLink href="/cart" onClick={onContinueShopping}>Review order &amp; delivery</ButtonLink>}
      <ButtonLink href="/menu" variant="secondary" className={styles.continue} onClick={onContinueShopping}>Keep exploring the menu</ButtonLink>
    </div>
  );
}
