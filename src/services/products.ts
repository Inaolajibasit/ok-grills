import { products } from "@/data/products";
import { getCategories } from "@/services/categories";
import type { Product, ProductCategory } from "@/types/product";

export async function getMenuProducts(): Promise<Product[]> {
  const categoryImages = new Map(
    (await getCategories()).map((category) => [category.id, category.image]),
  );

  return structuredClone(products)
    .map((product) => ({
      ...product,
      image: product.image ?? categoryImages.get(product.category),
    }))
    .sort((a, b) => (a.sortOrder ?? 999) - (b.sortOrder ?? 999));
}

export async function getProducts(): Promise<Product[]> {
  const allProducts = await getMenuProducts();
  return allProducts.filter((product) => product.available !== false);
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const allProducts = await getProducts();

  return allProducts.filter((product) => product.featured);
}

export async function getPopularProducts(): Promise<Product[]> {
  const allProducts = await getProducts();

  return allProducts.filter((product) => product.popular);
}

export async function getProductsByCategory(
  category: ProductCategory
): Promise<Product[]> {
  const allProducts = await getProducts();

  return allProducts.filter(
    (product) => product.category === category
  );
}

export async function getProductBySlug(
  slug: string
): Promise<Product | undefined> {
  const allProducts = await getProducts();

  return allProducts.find(
    (product) => product.slug === slug
  );
}
