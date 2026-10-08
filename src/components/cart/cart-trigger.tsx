"use client";

import { ShoppingBag } from "lucide-react";
import { getCartCount } from "@/lib/cart";
import { useCartStore } from "@/store/cart-store";
import styles from "./cart.module.css";

export function CartTrigger({ className = "", onOpen }: { className?: string; onOpen?: () => void }) {
  const count = useCartStore((state) => getCartCount(state.items));
  const hasHydrated = useCartStore((state) => state.hasHydrated);
  const isOpen = useCartStore((state) => state.isOpen);
  const openCart = useCartStore((state) => state.openCart);
  return (
    <button
      type="button"
      className={`${styles.trigger} ${className}`}
      data-cart-trigger
      aria-label={hasHydrated ? `Open cart, ${count} ${count === 1 ? "item" : "items"}` : "Open cart"}
      aria-haspopup="dialog"
      aria-expanded={isOpen}
      disabled={!hasHydrated}
      onClick={() => { onOpen?.(); openCart(); }}
    >
      <ShoppingBag size={18} aria-hidden="true" />
      <span className={styles.triggerLabel}>Cart</span>
      <span className={styles.badge} aria-hidden="true">{hasHydrated ? count : 0}</span>
    </button>
  );
}
