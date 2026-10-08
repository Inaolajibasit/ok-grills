import { create } from "zustand";
import { createJSONStorage, persist, type StateStorage } from "zustand/middleware";
import { addCartBuildBox, addCartProduct, changeCartQuantity, readPersistedCart, updateCartNotes } from "../lib/cart";
import type { BuildBoxSelection, CartItem, CartSelection } from "@/types/cart";
import type { BuildBoxSection } from "@/types/build-your-box";
import type { Product } from "@/types/product";

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  hasHydrated: boolean;
  persistenceUnavailable: boolean;
  addProduct: (product: Product, selections: CartSelection[], notes?: string) => void;
  addBuildBox: (sections: BuildBoxSection[], selections: BuildBoxSelection[], notes?: string) => boolean;
  removeProduct: (id: string) => void;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
  updateNotes: (id: string, notes: string) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
}

export const createCartStore = (storage?: StateStorage) => {
  const reportStorageFailure = () => queueMicrotask(() => {
    if (!store.getState().persistenceUnavailable) store.setState({ persistenceUnavailable: true });
  });
  const safeStorage: StateStorage = {
    getItem: (name) => { try { return (storage ?? localStorage).getItem(name); } catch { reportStorageFailure(); return null; } },
    setItem: (name, value) => { try { return (storage ?? localStorage).setItem(name, value); } catch { reportStorageFailure(); } },
    removeItem: (name) => { try { return (storage ?? localStorage).removeItem(name); } catch { reportStorageFailure(); } },
  };
  const store = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      hasHydrated: false,
      persistenceUnavailable: false,
      addProduct: (product, selections, notes) => set((state) => ({ items: addCartProduct(state.items, product, selections, notes) })),
      addBuildBox: (sections, selections, notes) => {
        const current = get().items;
        const items = addCartBuildBox(current, sections, selections, notes);
        if (items === current) return false;
        set({ items });
        return true;
      },
      removeProduct: (id) => set((state) => ({ items: state.items.filter((item) => item.id !== id) })),
      increaseQuantity: (id) => set((state) => ({ items: changeCartQuantity(state.items, id, 1) })),
      decreaseQuantity: (id) => set((state) => ({ items: changeCartQuantity(state.items, id, -1) })),
      updateNotes: (id, notes) => set((state) => ({ items: updateCartNotes(state.items, id, notes) })),
      clearCart: () => set({ items: [] }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
    }),
    {
      name: "ok-grills-cart-v1",
      storage: createJSONStorage(() => safeStorage),
      skipHydration: true,
      partialize: (state) => ({ items: state.items }),
      merge: (persisted, current) => ({ ...current, items: readPersistedCart(persisted) }),
    },
  ),
);
  return store;
};

export const useCartStore = createCartStore();
