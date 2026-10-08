import assert from "node:assert/strict";
import { buildBoxSections } from "../src/data/build-your-box";
import { products } from "../src/data/products";
import { calculateBuildBox, changeBuildBoxQuantity } from "../src/lib/build-your-box";
import { calculateCartTotals, getCartCount, resolveCartLines } from "../src/lib/cart";
import { createCartStore } from "../src/store/cart-store";
import type { BuildBoxSelection } from "../src/types/cart";

async function check() {
  const sections = buildBoxSections;
  assert.equal(products.length, 49);
  assert.equal(sections.flatMap((section) => section.items).length, 17);
  assert.equal(calculateBuildBox([], sections).canAdd, false);
  let selections: BuildBoxSelection[] = [];
  selections = changeBuildBoxQuantity(selections, sections, "grills", "turkey", 2);
  selections = changeBuildBoxQuantity(selections, sections, "sides", "fries", 1);
  selections = changeBuildBoxQuantity(selections, sections, "extras", "pepper-sauce", 1);
  selections = changeBuildBoxQuantity(selections, sections, "extras", "extra-cheese", 1);
  assert.equal(calculateBuildBox(selections, sections).total, 19000);
  assert.equal(calculateBuildBox(selections, sections).ingredientCount, 5);
  assert.deepEqual(changeBuildBoxQuantity([], sections, "extras", "packaging", 1), []);
  assert.deepEqual(changeBuildBoxQuantity([], sections, "sides", "sweet-potatoes", 1), []);
  assert.equal(calculateBuildBox([...selections, selections[0]], sections).canAdd, false);
  for (const invalid of [0, -1, 1.5, Number.MAX_SAFE_INTEGER]) {
    assert.equal(calculateBuildBox([{ ...selections[0], quantity: invalid }], sections).canAdd, false);
  }
  assert.equal(calculateBuildBox([{ sectionId: "extras", itemId: "packaging", quantity: 1 }], sections).total, null);
  assert.equal(calculateBuildBox([{ sectionId: "grills", itemId: "missing", quantity: 1 }], sections).canAdd, false);
  assert.deepEqual(changeBuildBoxQuantity([selections[1]], sections, "sides", "fries", -1), []);
  const saved = new Map<string, string>();
  const storage = { getItem: (key: string) => saved.get(key) ?? null, setItem: (key: string, value: string) => { saved.set(key, value); }, removeItem: (key: string) => { saved.delete(key); } };
  const cart = createCartStore(storage);
  await cart.persist.rehydrate();
  assert.equal(cart.getState().addBuildBox(sections, []), false);
  assert.equal(cart.getState().addBuildBox(sections, selections, "Sauce separately"), true);
  assert.equal(cart.getState().addBuildBox(sections, [...selections].reverse(), "Sauce separately"), true);
  assert.equal(cart.getState().items.length, 1);
  assert.equal(getCartCount(cart.getState().items), 2);
  assert.equal(calculateCartTotals(resolveCartLines(cart.getState().items, products, sections)).subtotal, 38000);
  assert.ok(resolveCartLines(cart.getState().items, products, sections)[0].options.includes("Grills: 2 × Grilled Turkey"));
  const reload = createCartStore(storage);
  await reload.persist.rehydrate();
  assert.deepEqual(reload.getState().items, cart.getState().items);
  assert.equal(saved.get("ok-grills-cart-v1")?.includes('"price"'), false);
  const changed = sections.map((section) => ({ ...section, items: section.items.map((item) => item.id === "turkey" ? { ...item, price: 7000 } : item) }));
  assert.equal(calculateCartTotals(resolveCartLines(reload.getState().items, products, changed)).subtotal, 40000);
  assert.equal(resolveCartLines(reload.getState().items, products, [])[0].lineTotal, null);
  const unavailable = sections.map((section) => ({ ...section, items: section.items.map((item) => item.id === "turkey" ? { ...item, available: false } : item) }));
  assert.equal(calculateBuildBox(selections, unavailable).canAdd, false);
  const different = changeBuildBoxQuantity(selections, sections, "grills", "turkey", 1);
  cart.getState().addBuildBox(sections, different);
  assert.equal(cart.getState().items.length, 2);
  console.log("Build-box checks passed: approved prices, automatic totals, empty/invalid/unpriced validation, portion removal, cart metadata, merging, current-price resolution, and reload persistence.");
}
void check().catch((error: unknown) => { console.error(error); process.exitCode = 1; });
