import type { CartItem } from "./cart";

export interface DeliveryDetails {
  customerName: string;
  phoneNumber: string;
  address: string;
  area: string;
  instructions?: string;
}

export interface OrderDraft {
  items: CartItem[];
  delivery: DeliveryDetails;
  notes?: string;
}
