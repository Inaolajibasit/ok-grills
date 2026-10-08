import type { BuildBoxItem, BuildBoxSection } from "@/types/build-your-box";
import type { BuildBoxSelection } from "@/types/cart";

export interface BuildBoxLine {
  sectionId: string;
  sectionName: string;
  itemId: string;
  name: string;
  quantity: number;
  unitPrice: number | null;
  lineTotal: number | null;
}

export interface BuildBoxResult {
  lines: BuildBoxLine[];
  total: number | null;
  ingredientCount: number;
  isEmpty: boolean;
  canAdd: boolean;
  errors: string[];
}

export function buildBoxSelectionKey(sectionId: string, itemId: string): string {
  return JSON.stringify([sectionId, itemId]);
}

export function isBuildBoxItemOrderable(item: BuildBoxItem): boolean {
  return item.available && item.price !== null && Number.isSafeInteger(item.price) && item.price >= 0;
}

export function normalizeBuildBoxSelections(selections: BuildBoxSelection[]): BuildBoxSelection[] {
  return selections.map((selection) => ({ ...selection })).sort((a, b) =>
    a.sectionId.localeCompare(b.sectionId) || a.itemId.localeCompare(b.itemId));
}

export function removeBuildBoxIngredient(selections: BuildBoxSelection[], sectionId: string, itemId: string): BuildBoxSelection[] {
  return selections.filter((selection) => selection.sectionId !== sectionId || selection.itemId !== itemId);
}

export function changeBuildBoxQuantity(selections: BuildBoxSelection[], sections: BuildBoxSection[], sectionId: string, itemId: string, change: number): BuildBoxSelection[] {
  if (!Number.isSafeInteger(change)) return selections;
  const item = sections.find((section) => section.id === sectionId)?.items.find((candidate) => candidate.id === itemId);
  if (change > 0 && (!item || !isBuildBoxItemOrderable(item))) return selections;
  const existing = selections.find((selection) => selection.sectionId === sectionId && selection.itemId === itemId);
  const quantity = (existing?.quantity ?? 0) + change;
  if (!Number.isSafeInteger(quantity) || quantity < 0) return selections;
  if (quantity === 0) return removeBuildBoxIngredient(selections, sectionId, itemId);
  if (existing) return selections.map((selection) => selection === existing ? { ...selection, quantity } : selection);
  return [...selections, { sectionId, itemId, quantity }];
}

export function calculateBuildBox(selections: BuildBoxSelection[], sections: BuildBoxSection[]): BuildBoxResult {
  if (selections.length === 0) return { lines: [], total: 0, ingredientCount: 0, isEmpty: true, canAdd: false, errors: ["Pick at least one ingredient for your box."] };
  const errors: string[] = [];
  const seen = new Set<string>();
  const lines: BuildBoxLine[] = [];
  let total = 0;
  let ingredientCount = 0;

  for (const selection of selections) {
    const key = buildBoxSelectionKey(selection.sectionId, selection.itemId);
    if (seen.has(key)) { errors.push("An ingredient is listed twice. Please update your box."); continue; }
    seen.add(key);
    const section = sections.find((candidate) => candidate.id === selection.sectionId);
    const item = section?.items.find((candidate) => candidate.id === selection.itemId);
    if (!Number.isSafeInteger(selection.quantity) || selection.quantity <= 0) {
      errors.push("Every ingredient needs a valid quantity.");
      continue;
    }
    if (!item) errors.push("An ingredient is no longer available. Please update your box.");
    else if (!item.available) errors.push(`${item.name} is currently unavailable.`);
    else if (!isBuildBoxItemOrderable(item)) errors.push(`The price for ${item.name} needs confirmation.`);
    const unitPrice = item && isBuildBoxItemOrderable(item) ? item.price : null;
    const amount = unitPrice === null ? null : unitPrice * selection.quantity;
    const lineTotal = amount !== null && Number.isSafeInteger(amount) ? amount : null;
    if (amount !== null && lineTotal === null) errors.push("The ingredient quantity is too large. Please reduce it.");
    ingredientCount += selection.quantity;
    total += lineTotal ?? 0;
    lines.push({ ...selection, sectionName: section?.name ?? "Unlisted ingredient", name: item?.name ?? "Unavailable ingredient", unitPrice, lineTotal });
  }
  if (!Number.isSafeInteger(total) || !Number.isSafeInteger(ingredientCount)) errors.push("The box quantity is too large. Please reduce it.");
  for (const section of sections) {
    if (section.required && !lines.some((line) => line.sectionId === section.id)) errors.push(`Choose at least one item from ${section.name}.`);
  }
  lines.sort((a, b) => sections.findIndex((section) => section.id === a.sectionId) - sections.findIndex((section) => section.id === b.sectionId));
  return { lines, total: errors.length === 0 ? total : null, ingredientCount, isEmpty: false, canAdd: errors.length === 0 && lines.length > 0, errors };
}
