"use client";

import { useMemo, useState } from "react";
import { calculateBuildBox, changeBuildBoxQuantity, removeBuildBoxIngredient } from "@/lib/build-your-box";
import { useCartStore } from "@/store/cart-store";
import type { BuildBoxSection } from "@/types/build-your-box";
import type { BuildBoxSelection } from "@/types/cart";

export function useBuildBox(sections: BuildBoxSection[]) {
  const [selections, setSelections] = useState<BuildBoxSelection[]>([]);
  const [feedback, setFeedback] = useState("");
  const hasHydrated = useCartStore((state) => state.hasHydrated);
  const addBuildBox = useCartStore((state) => state.addBuildBox);
  const openCart = useCartStore((state) => state.openCart);
  const result = useMemo(() => calculateBuildBox(selections, sections), [selections, sections]);

  function changeQuantity(sectionId: string, itemId: string, change: number) {
    setSelections((current) => changeBuildBoxQuantity(current, sections, sectionId, itemId, change));
    setFeedback("");
  }

  function removeIngredient(sectionId: string, itemId: string) {
    setSelections((current) => removeBuildBoxIngredient(current, sectionId, itemId));
    setFeedback("");
  }

  function reset() { setSelections([]); setFeedback(""); }

  function addToCart() {
    if (!hasHydrated) return;
    if (!addBuildBox(sections, selections)) {
      setFeedback(result.errors[0] ?? "Please check your box selections.");
      return;
    }
    setFeedback("Your custom box has been added to the cart.");
    openCart();
  }

  return { selections, result, changeQuantity, removeIngredient, reset, addToCart, feedback, canOrder: hasHydrated && result.canAdd };
}
