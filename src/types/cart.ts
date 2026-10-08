export interface CartSelection {
  optionId: string;
  choiceIds: string[];
}

interface CartItemBase {
  id: string;
  quantity: number;
  notes?: string;
}

export interface ProductCartItem extends CartItemBase {
  kind: "product";
  productId: string;
  selections: CartSelection[];
}

export interface BuildBoxSelection {
  sectionId: string;
  itemId: string;
  quantity: number;
}

export interface BuildBoxCartItem extends CartItemBase {
  kind: "build-box";
  selections: BuildBoxSelection[];
}

export type CartItem = ProductCartItem | BuildBoxCartItem;

export interface Cart {
  items: CartItem[];
}
