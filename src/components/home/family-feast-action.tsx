"use client";

import { ArrowUpRight } from "lucide-react";
import { Button, ButtonLink } from "@/components/ui/button";
import { getProductAvailability } from "@/lib/product-display";
import { selectionsAreValid } from "@/lib/cart";
import { useCartStore } from "@/store/cart-store";
import type { Product } from "@/types/product";
import styles from "./family-feast.module.css";

export function FamilyFeastAction({ product, label }: { product: Product; label: string }) {
  const hasHydrated = useCartStore((state) => state.hasHydrated);
  const addProduct = useCartStore((state) => state.addProduct);
  const openCart = useCartStore((state) => state.openCart);
  const available = getProductAvailability(product) === "available";
  const validSelection = selectionsAreValid(product, []);

  // Future required options must be chosen on the menu before adding the product.
  if (available && !validSelection) return <ButtonLink href={`/menu?category=${product.category}`} className={styles.cta}>{label}<ArrowUpRight size={20} aria-hidden="true" /></ButtonLink>;

  function addFeast() {
    if (!hasHydrated || !available || !validSelection) return;
    addProduct(product, []);
    openCart();
  }

  return <Button onClick={addFeast} disabled={!hasHydrated || !available} className={styles.cta} aria-label={`${label}: add ${product.name} to cart`}>{label}<ArrowUpRight size={20} aria-hidden="true" /></Button>;
}
