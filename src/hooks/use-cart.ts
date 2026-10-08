"use client";

import { useMemo } from "react";
import { calculateCartTotals, resolveCartLines } from "@/lib/cart";
import { useCartStore } from "@/store/cart-store";
import type { Product } from "@/types/product";
import type { BuildBoxSection } from "@/types/build-your-box";

export function useCart(products: Product[], buildBoxSections: BuildBoxSection[]) {
  const items = useCartStore((state) => state.items);
  const hasHydrated = useCartStore((state) => state.hasHydrated);
  const lines = useMemo(() => resolveCartLines(items, products, buildBoxSections), [items, products, buildBoxSections]);
  const totals = useMemo(() => calculateCartTotals(lines), [lines]);
  return { lines, totals, hasHydrated };
}
