"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import type { Product } from "@/types/product";
import type { BuildBoxSection } from "@/types/build-your-box";
import { CartContent } from "./cart-content";
import styles from "./cart.module.css";

interface CartDrawerProps {
  products: Product[];
  buildBoxSections: BuildBoxSection[];
  deliveryNotice: string;
}

export function CartDrawer({ products, buildBoxSections, deliveryNotice }: CartDrawerProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const isOpen = useCartStore((state) => state.isOpen);
  const hasHydrated = useCartStore((state) => state.hasHydrated);
  const closeCart = useCartStore((state) => state.closeCart);

  useEffect(() => {
    const finishHydration = () => useCartStore.setState({ hasHydrated: true });
    void Promise.resolve(useCartStore.persist.rehydrate()).then(finishHydration, finishHydration);
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || !isOpen) return;
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.showModal();
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
      if (previousFocus instanceof HTMLElement && previousFocus.isConnected) previousFocus.focus();
      else document.querySelector<HTMLButtonElement>("[data-cart-trigger]")?.focus();
    };
  }, [isOpen, hasHydrated]);

  if (!hasHydrated) return null;
  return createPortal(
    <dialog
      ref={dialogRef}
      className={styles.drawer}
      aria-labelledby="cart-drawer-title"
      data-cart-dialog
      data-lenis-prevent
      onCancel={(event) => { event.preventDefault(); closeCart(); }}
      onClick={(event) => {
        if (event.target !== event.currentTarget) return;
        const bounds = event.currentTarget.getBoundingClientRect();
        if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) closeCart();
      }}
    >
      <div className={styles.drawerHeader}>
        <div><p>Your feast, your way</p><h2 id="cart-drawer-title">Your cart<span>.</span></h2></div>
        <button type="button" onClick={closeCart} className={styles.iconButton} aria-label="Close cart" autoFocus><X size={24} aria-hidden="true" /></button>
      </div>
      <div className={styles.drawerBody}>
        {isOpen && <CartContent products={products} buildBoxSections={buildBoxSections} deliveryNotice={deliveryNotice} onContinueShopping={closeCart} />}
      </div>
    </dialog>,
    document.body,
  );
}
