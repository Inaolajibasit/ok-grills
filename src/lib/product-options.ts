import type { CartSelection } from "@/types/cart";
import type { Product } from "@/types/product";

export type SelectedChoices = Record<string, string[]>;

export function optionsAreComplete(product: Product, selected: SelectedChoices): boolean {
  return (product.options ?? []).every((option) => {
    const count = selected[option.id]?.length ?? 0;
    const minimum = option.minSelections ?? (option.required ? 1 : 0);
    const maximum = option.maxSelections ?? option.choices.length;
    return count >= minimum && count <= maximum;
  });
}

export function toCartSelections(product: Product, selected: SelectedChoices): CartSelection[] {
  return (product.options ?? [])
    .map((option) => ({ optionId: option.id, choiceIds: selected[option.id] ?? [] }))
    .filter((selection) => selection.choiceIds.length > 0);
}

export function getSelectedPrice(product: Product, selected: SelectedChoices): number | null {
  if (product.price === null) return null;

  const modifiers = (product.options ?? []).reduce((total, option) => {
    const choiceIds = selected[option.id] ?? [];
    return total + option.choices.reduce(
      (choiceTotal, choice) => choiceTotal + (choiceIds.includes(choice.id) ? choice.priceModifier ?? 0 : 0),
      0,
    );
  }, 0);

  return product.price + modifiers;
}
