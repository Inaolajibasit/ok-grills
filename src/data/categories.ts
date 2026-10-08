import type { Category } from "@/types/category";

// Category names follow the approved menu; display order is editorial configuration.
export const categories: Category[] = [
  { id: "grill-boxes", name: "Grill Boxes", slug: "grill-boxes", href: "/menu?category=grill-boxes", image: "/images/categories/grill-boxes.webp", featured: true, sortOrder: 1 },
  { id: "grills", name: "Build Your Own", slug: "grills", href: "/build-a-box", image: "/images/categories/build-your-own.webp", featured: true, sortOrder: 2 },
  { id: "burgers", name: "Burgers", slug: "burgers", href: "/menu?category=burgers", image: "/images/categories/burgers.webp", featured: true, sortOrder: 3 },
  { id: "breakfast", name: "Breakfast", slug: "breakfast", href: "/menu?category=breakfast", image: "/images/categories/breakfast.webp", featured: true, sortOrder: 4 },
  { id: "local", name: "Local", slug: "local", href: "/menu?category=local", image: "/images/categories/local.webp", featured: true, sortOrder: 5 },
  { id: "hotdogs", name: "Hotdogs", slug: "hotdogs", href: "/menu?category=hotdogs", image: "/images/categories/hotdogs.webp", featured: true, sortOrder: 6 },
  { id: "sides", name: "Sides", slug: "sides", href: "/menu?category=sides", featured: false, sortOrder: 7 },
];
