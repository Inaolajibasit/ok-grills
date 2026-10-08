import type { Metadata } from "next";
import { Anton, Danfo } from "next/font/google";
import { MenuCatalog } from "@/components/menu/menu-catalog";
import { getMenuFilters } from "@/services/categories";
import { getMenuProducts } from "@/services/products";
import type { MenuFilterId } from "@/types/menu";

const menuFont = Anton({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-menu-display",
});

const headingFont = Danfo({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-menu-heading",
});

export const metadata: Metadata = {
  title: "Menu",
  description: "Explore the OK Grills menu and build your order.",
};

interface MenuPageProps {
  searchParams: Promise<{ category?: string | string[]; page?: string | string[] }>;
}

export default async function MenuPage({ searchParams }: MenuPageProps) {
  const [products, filters, params] = await Promise.all([
    getMenuProducts(),
    getMenuFilters(),
    searchParams,
  ]);
  const requestedFilter = typeof params.category === "string" ? params.category : "all";
  const initialFilter: MenuFilterId = filters.some((filter) => filter.id === requestedFilter)
    ? requestedFilter as MenuFilterId
    : "all";
  const requestedPage = typeof params.page === "string" ? Number(params.page) : 1;
  const initialPage = Number.isSafeInteger(requestedPage) && requestedPage > 0 ? requestedPage : 1;

  return (
    <div className={`${menuFont.variable} ${headingFont.variable}`}>
      <MenuCatalog key={`${initialFilter}:${initialPage}`} products={products} filters={filters} initialFilter={initialFilter} initialPage={initialPage} />
    </div>
  );
}
