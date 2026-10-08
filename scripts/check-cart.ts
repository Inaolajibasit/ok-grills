import assert from "node:assert/strict";
import type { StateStorage } from "zustand/middleware";
import { products } from "../src/data/products";
import { createCartStore } from "../src/store/cart-store";
import { addCartProduct, calculateCartTotals, getCartCount, MAX_PRODUCT_NOTES_LENGTH, readPersistedCart, resolveCartLines } from "../src/lib/cart";
import type { Product } from "../src/types/product";

function product(id: string): Product {
  const found = products.find((item) => item.id === id);
  assert.ok(found, `Approved menu fixture ${id} exists`);
  return found;
}

async function checkCart() {
  const saved = new Map<string, string>();
  const storage: StateStorage = {
    getItem: (key) => saved.get(key) ?? null,
    setItem: (key, value) => { saved.set(key, value); },
    removeItem: (key) => { saved.delete(key); },
  };
  const cart = createCartStore(storage);
  await cart.persist.rehydrate();
  const mini = product("mini-grill-box");
  const turkey = [{ optionId: "grill-choice", choiceIds: ["turkey"] }];
  const chicken = [{ optionId: "grill-choice", choiceIds: ["chicken-wings"] }];

  cart.getState().addProduct(mini, []);
  assert.equal(cart.getState().items.length, 0, "Required options cannot be skipped");
  cart.getState().addProduct(mini, [{ optionId: "grill-choice", choiceIds: ["invalid"] }]);
  assert.equal(cart.getState().items.length, 0, "Unknown choices cannot be added");
  cart.getState().addProduct(mini, [...turkey, ...turkey]);
  assert.equal(cart.getState().items.length, 0, "Duplicate option groups cannot be added");
  cart.getState().addProduct(mini, turkey);
  cart.getState().addProduct(mini, turkey);
  assert.equal(cart.getState().items.length, 1, "Matching product and options merge");
  assert.equal(cart.getState().items[0].quantity, 2);
  cart.getState().addProduct(mini, chicken);
  assert.equal(cart.getState().items.length, 2, "Different choices stay separate");
  const id = cart.getState().items[0].id;
  cart.getState().updateNotes(id, "No pepper, sauce on the side");
  assert.equal(cart.getState().items[0].id, id, "Editing notes keeps the row identity stable");
  cart.getState().addProduct(mini, turkey);
  assert.equal(cart.getState().items.length, 3, "Items with different notes stay separate");
  cart.getState().addProduct(mini, turkey, "No pepper, sauce on the side");
  assert.equal(cart.getState().items[0].quantity, 3, "Same options and notes merge");
  cart.getState().increaseQuantity(id);
  assert.equal(cart.getState().items[0].quantity, 4);
  cart.getState().decreaseQuantity(id);
  assert.equal(cart.getState().items[0].quantity, 3);
  const singleId = cart.getState().items[1].id;
  cart.getState().decreaseQuantity(singleId);
  assert.equal(cart.getState().items[1].quantity, 1, "Quantity stays at a minimum of one");
  assert.equal(getCartCount(cart.getState().items), 5, "Cart count uses units, not rows");
  assert.equal(calculateCartTotals(resolveCartLines(cart.getState().items, products)).subtotal, 95000);

  cart.getState().addProduct(product("pork-ribs-heaven-box"), [{ optionId: "sandwiches", choiceIds: ["pork"] }]);
  cart.getState().addProduct(product("caramelized-onions-chicken-burger"), [{ optionId: "cheese", choiceIds: ["without-cheese"] }]);
  const lines = resolveCartLines(cart.getState().items, products);
  assert.equal(lines[3].unitPrice, 70000, "Positive option modifiers are included");
  assert.equal(lines[4].unitPrice, 12500, "Negative option modifiers are included");
  assert.deepEqual(lines[3].options, ["Sandwiches: With 2 Pork Sandwiches"]);
  assert.equal(calculateCartTotals(lines).subtotal, 177500);
  assert.equal(calculateCartTotals(lines).count, 7);
  assert.equal(calculateCartTotals(lines).hasUnpricedItems, false);
  assert.equal(calculateCartTotals(resolveCartLines(cart.getState().items, products.map((item) => item.id === mini.id ? { ...item, price: 20000 } : item))).subtotal, 182500, "Reloaded catalog prices are used");

  cart.getState().openCart();
  const payload = JSON.parse(saved.get("ok-grills-cart-v1") ?? "{}") as { state: Record<string, unknown> };
  assert.deepEqual(Object.keys(payload.state), ["items"], "Only cart records are persisted");
  assert.equal(saved.get("ok-grills-cart-v1")?.includes('"price"'), false, "Prices are not duplicated in storage");
  const reloaded = createCartStore(storage);
  await reloaded.persist.rehydrate();
  assert.deepEqual(reloaded.getState().items, cart.getState().items, "Reload preserves quantities, notes, and options");
  assert.equal(reloaded.getState().isOpen, false, "Drawer visibility is not persisted");
  reloaded.getState().removeProduct(id);
  assert.equal(getCartCount(reloaded.getState().items), 4, "Remove deletes just the selected row");
  reloaded.getState().updateNotes(singleId, "x".repeat(1000));
  assert.equal(reloaded.getState().items.find((item) => item.id === singleId)?.notes?.length, MAX_PRODUCT_NOTES_LENGTH);
  reloaded.getState().clearCart();
  const clearedReload = createCartStore(storage);
  await clearedReload.persist.rehydrate();
  assert.deepEqual(clearedReload.getState().items, [], "Clear cart survives reload");

  assert.deepEqual(addCartProduct([], product("chicken-crave-box"), []), [], "Price-pending products cannot be added");
  assert.deepEqual(addCartProduct([], { ...mini, available: false }, turkey), [], "Unavailable products cannot be added");
  const legacy = { id: "product:mini-grill-box:legacy", kind: "product", productId: mini.id, selections: turkey, quantity: 2 };
  const restored = readPersistedCart({ items: [legacy, { ...legacy, id: "negative", quantity: -1 }, { ...legacy, id: "fractional", quantity: 1.5 }, { ...legacy, id: "broken", selections: null }] });
  assert.equal(restored.length, 1, "Legacy carts are preserved while malformed records are dropped");
  assert.equal(restored[0].notes, "");
  saved.set("ok-grills-cart-v1", JSON.stringify({ state: { items: [legacy] }, version: 0 }));
  const legacyReload = createCartStore(storage);
  await legacyReload.persist.rehydrate();
  assert.equal(legacyReload.getState().items[0].quantity, 2, "Original localStorage format still rehydrates");

  const missing = resolveCartLines(restored, []);
  assert.ok(missing[0].issue);
  assert.equal(calculateCartTotals(missing).hasUnpricedItems, true);
  assert.equal(calculateCartTotals(missing).subtotal, 0, "Removed products are not silently priced");
  const changedOptions = resolveCartLines(restored, [{ ...mini, options: [] }]);
  assert.equal(changedOptions[0].lineTotal, null, "Changed catalog options require a fresh selection");
  const selected = [{ optionId: "grill-choice", choiceIds: ["turkey"] }];
  const independent = addCartProduct([], mini, selected);
  selected[0].choiceIds.push("chicken-wings");
  assert.equal(independent[0].kind === "product" && independent[0].selections[0].choiceIds.length, 1, "Caller mutations cannot change saved choices");
  saved.set("ok-grills-cart-v1", "invalid JSON");
  const corrupt = createCartStore(storage);
  await corrupt.persist.rehydrate();
  assert.deepEqual(corrupt.getState().items, [], "Corrupt storage does not crash the cart");
  const blockedStorage = createCartStore({ getItem: () => { throw new Error("Blocked"); }, setItem: () => { throw new Error("Quota exceeded"); }, removeItem: () => { throw new Error("Blocked"); } });
  await blockedStorage.persist.rehydrate();
  assert.doesNotThrow(() => blockedStorage.getState().addProduct(mini, turkey));
  await Promise.resolve();
  assert.equal(blockedStorage.getState().items.length, 1, "Storage failure preserves in-memory cart actions");
  assert.equal(blockedStorage.getState().persistenceUnavailable, true, "Storage failure is exposed for a customer notice");
  assert.doesNotThrow(() => blockedStorage.getState().clearCart());
  console.log("Cart checks passed: product/options/notes merging, quantity controls, count, price modifiers, current catalog prices, removal, clear, reload persistence, legacy carts, and malformed storage.");
}

void checkCart().catch((error: unknown) => { console.error(error); process.exitCode = 1; });
