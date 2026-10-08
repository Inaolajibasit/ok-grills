import type { ProductCategory } from "./product";

export type MenuFilterId = "all" | "popular" | ProductCategory;

export interface MenuFilter {
  id: MenuFilterId;
  label: string;
}
