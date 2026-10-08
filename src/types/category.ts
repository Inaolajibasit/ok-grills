import type { ProductCategory } from "./product";

export interface Category {
  id: ProductCategory;
  name: string;
  slug: string;
  href: string;

  description?: string;
  image?: string;

  featured?: boolean;
  sortOrder?: number;
}
