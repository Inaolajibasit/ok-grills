export type ProductCategory =
  | "grill-boxes"
  | "grills"
  | "burgers"
  | "breakfast"
  | "local"
  | "hotdogs"
  | "sides";

export interface ProductChoice {
  id: string;
  label: string;
  priceModifier?: number | null;
}

export interface ProductOption {
  id: string;
  name: string;
  required?: boolean;
  minSelections?: number;
  maxSelections?: number;
  choices: ProductChoice[];
}

export interface Product {
  id: string;

  name: string;
  slug: string;

  category: ProductCategory;

  /** Amount in NGN; null means the price is not yet confirmed. */
  price: number | null;

  shortDescription?: string;
  description?: string;

  image?: string;
  gallery?: string[];

  contents?: string[];

  options?: ProductOption[];

  popular?: boolean;
  featured?: boolean;
  available?: boolean;

  serves?: number;

  tags?: string[];

  sortOrder?: number;
}
