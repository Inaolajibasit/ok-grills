import type { Product } from "@/types/product";

export function getProductDescription(product: Product): string {
  if (product.description) return product.description;
  if (product.shortDescription) return product.shortDescription;
  if (!product.contents?.length) return "Details available on request.";

  const preview = product.contents.slice(0, 3).join(" · ");
  return product.contents.length > 3 ? `${preview} · and more` : preview;
}

export function getProductAvailability(product: Product) {
  if (product.available === false) return "sold-out" as const;
  if (product.price === null) return "price-pending" as const;
  return "available" as const;
}
