import { categories } from "@/data/categories";
import type { Category } from "@/types/category";
import type { MenuFilter } from "@/types/menu";

export async function getCategories(): Promise<Category[]> {
  return structuredClone(categories).sort(
    (a, b) =>
      (a.sortOrder ?? 999) - (b.sortOrder ?? 999)
  );
}

export async function getFeaturedCategories(): Promise<Category[]> {
  const allCategories = await getCategories();

  return allCategories.filter(
    (category) => category.featured
  );
}

export async function getMenuFilters(): Promise<MenuFilter[]> {
  const allCategories = await getCategories();

  return [
    { id: "all", label: "All" },
    { id: "popular", label: "Popular" },
    ...allCategories
      .filter((category) => category.id !== "grills")
      .map((category) => ({ id: category.id, label: category.name })),
  ];
}
