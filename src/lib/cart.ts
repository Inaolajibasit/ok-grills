import type { BuildBoxCartItem, BuildBoxSelection, CartItem, CartSelection, ProductCartItem } from "@/types/cart";
import type { BuildBoxSection } from "@/types/build-your-box";
import type { Product } from "@/types/product";
import { getSelectedPrice, optionsAreComplete } from "./product-options";
import { calculateBuildBox, normalizeBuildBoxSelections } from "./build-your-box";

export const MAX_PRODUCT_NOTES_LENGTH = 500;

export interface CartLine {
  item: CartItem;
  name: string;
  image?: string;
  options: string[];
  unitPrice: number | null;
  lineTotal: number | null;
  issue?: string;
}

export interface CartTotals {
  count: number;
  subtotal: number;
  hasUnpricedItems: boolean;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

export function normalizeCartSelections(selections: CartSelection[]): CartSelection[] {
  return selections
    .map(({ optionId, choiceIds }) => ({ optionId, choiceIds: [...new Set(choiceIds)].sort() }))
    .filter(({ choiceIds }) => choiceIds.length > 0)
    .sort((a, b) => a.optionId.localeCompare(b.optionId));
}

export function selectionsAreValid(product: Product, selections: CartSelection[]): boolean {
  if (new Set(selections.map((selection) => selection.optionId)).size !== selections.length) return false;
  if (!selections.every((selection) => {
    const option = product.options?.find((candidate) => candidate.id === selection.optionId);
    return option && new Set(selection.choiceIds).size === selection.choiceIds.length &&
      selection.choiceIds.every((choiceId) => option.choices.some((choice) => choice.id === choiceId));
  })) return false;
  return optionsAreComplete(product, Object.fromEntries(selections.map(({ optionId, choiceIds }) => [optionId, choiceIds])));
}

export function addCartProduct(items: CartItem[], product: Product, selections: CartSelection[], notes = ""): CartItem[] {
  if (product.available === false || product.price === null || !selectionsAreValid(product, selections)) return items;
  const selectedPrice = getSelectedPrice(product, Object.fromEntries(selections.map(({ optionId, choiceIds }) => [optionId, choiceIds])));
  if (selectedPrice === null || !Number.isSafeInteger(selectedPrice) || selectedPrice < 0) return items;
  const normalized = normalizeCartSelections(selections);
  const productNotes = notes.slice(0, MAX_PRODUCT_NOTES_LENGTH);
  const existing = items.find((item) => item.kind === "product" && item.productId === product.id &&
    (item.notes ?? "") === productNotes && JSON.stringify(normalizeCartSelections(item.selections)) === JSON.stringify(normalized));
  if (existing) return changeCartQuantity(items, existing.id, 1);
  const item: ProductCartItem = {
    id: `product:${product.id}:${crypto.randomUUID()}`,
    kind: "product",
    productId: product.id,
    selections: normalized,
    quantity: 1,
    notes: productNotes,
  };
  return [...items, item];
}

export function changeCartQuantity(items: CartItem[], id: string, change: number): CartItem[] {
  return items.map((item) => {
    if (item.id !== id) return item;
    const quantity = item.quantity + change;
    return Number.isSafeInteger(quantity) && quantity >= 1 ? { ...item, quantity } : item;
  });
}

export function addCartBuildBox(items: CartItem[], sections: BuildBoxSection[], selections: BuildBoxSelection[], notes = ""): CartItem[] {
  if (!calculateBuildBox(selections, sections).canAdd) return items;
  const normalized = normalizeBuildBoxSelections(selections);
  const boxNotes = notes.slice(0, MAX_PRODUCT_NOTES_LENGTH);
  const existing = items.find((item) => item.kind === "build-box" && (item.notes ?? "") === boxNotes &&
    JSON.stringify(normalizeBuildBoxSelections(item.selections)) === JSON.stringify(normalized));
  if (existing) return changeCartQuantity(items, existing.id, 1);
  const item: BuildBoxCartItem = { id: `build-box:${crypto.randomUUID()}`, kind: "build-box", selections: normalized, quantity: 1, notes: boxNotes };
  return [...items, item];
}

export function updateCartNotes(items: CartItem[], id: string, notes: string): CartItem[] {
  return items.map((item) => item.id === id ? { ...item, notes: notes.slice(0, MAX_PRODUCT_NOTES_LENGTH) } : item);
}

export function getCartCount(items: CartItem[]): number {
  return items.reduce((count, item) => count + item.quantity, 0);
}

export function resolveCartLines(items: CartItem[], products: Product[], buildBoxSections: BuildBoxSection[] = []): CartLine[] {
  const catalog = new Map(products.map((product) => [product.id, product]));
  return items.map((item) => {
    if (item.kind === "build-box") {
      const box = calculateBuildBox(item.selections, buildBoxSections);
      const unitPrice = box.canAdd ? box.total : null;
      const amount = unitPrice === null ? null : unitPrice * item.quantity;
      const lineTotal = amount !== null && Number.isSafeInteger(amount) ? amount : null;
      return {
        item, name: "Custom grill box", unitPrice, lineTotal,
        options: box.lines.map((line) => `${line.sectionName}: ${line.quantity} × ${line.name}`),
        issue: !box.canAdd ? box.errors.join(" ") : lineTotal === null ? "Please reduce the number of boxes." : undefined,
      };
    }
    const product = item.kind === "product" ? catalog.get(item.productId) : undefined;
    if (!product || item.kind !== "product") {
      return { item, name: "Unavailable menu item", options: [], unitPrice: null, lineTotal: null, issue: "This item is no longer listed. Please remove it or choose another item." };
    }
    const validOptions = selectionsAreValid(product, item.selections);
    const selected = Object.fromEntries(item.selections.map(({ optionId, choiceIds }) => [optionId, choiceIds]));
    const price = validOptions ? getSelectedPrice(product, selected) : null;
    const unitPrice = product.available !== false && price !== null && Number.isSafeInteger(price) && price >= 0 ? price : null;
    const total = unitPrice === null ? null : unitPrice * item.quantity;
    const lineTotal = total !== null && Number.isSafeInteger(total) ? total : null;
    const options = (product.options ?? []).flatMap((option) => {
      const choiceIds = selected[option.id] ?? [];
      const labels = option.choices.filter((choice) => choiceIds.includes(choice.id)).map((choice) => choice.label);
      return labels.length > 0 ? [`${option.name}: ${labels.join(", ")}`] : [];
    });
    const issue = !validOptions ? "These options have changed. Remove this item and select it again from the menu." :
      product.available === false ? "This item is currently unavailable." :
      lineTotal === null ? "The price for this item needs to be confirmed." : undefined;
    return { item, name: product.name, image: product.image, options, unitPrice, lineTotal, issue };
  });
}

export function calculateCartTotals(lines: CartLine[]): CartTotals {
  return {
    count: getCartCount(lines.map((line) => line.item)),
    subtotal: lines.reduce((subtotal, line) => subtotal + (line.lineTotal ?? 0), 0),
    hasUnpricedItems: lines.some((line) => line.lineTotal === null),
  };
}

/** Read the original persisted cart format as well as carts with notes. */
export function readPersistedCart(value: unknown): CartItem[] {
  if (!isRecord(value) || !Array.isArray(value.items)) return [];
  const ids = new Set<string>();
  return value.items.flatMap((raw: unknown): CartItem[] => {
    if (!isRecord(raw) || typeof raw.id !== "string" || !raw.id || ids.has(raw.id) ||
      typeof raw.quantity !== "number" || !Number.isSafeInteger(raw.quantity) || raw.quantity < 1 ||
      !Array.isArray(raw.selections)) return [];
    const base = { id: raw.id, quantity: raw.quantity, notes: typeof raw.notes === "string" ? raw.notes.slice(0, MAX_PRODUCT_NOTES_LENGTH) : "" };
    if (raw.kind === "product" && typeof raw.productId === "string" && raw.productId && raw.selections.every((selection: unknown) =>
      isRecord(selection) && typeof selection.optionId === "string" && Array.isArray(selection.choiceIds) && selection.choiceIds.every((id: unknown) => typeof id === "string"))) {
      const selections = raw.selections.map((selection: Record<string, unknown>) => ({ optionId: selection.optionId as string, choiceIds: [...selection.choiceIds as string[]] }));
      ids.add(raw.id);
      return [{ ...base, kind: "product", productId: raw.productId, selections }];
    }
    if (raw.kind === "build-box" && raw.selections.every((selection: unknown) =>
      isRecord(selection) && typeof selection.sectionId === "string" && typeof selection.itemId === "string" &&
      typeof selection.quantity === "number" && Number.isSafeInteger(selection.quantity) && selection.quantity > 0)) {
      const selections = raw.selections.map((selection: Record<string, unknown>) => ({ sectionId: selection.sectionId as string, itemId: selection.itemId as string, quantity: selection.quantity as number }));
      ids.add(raw.id);
      return [{ ...base, kind: "build-box", selections }];
    }
    return [];
  });
}
