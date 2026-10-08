"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { BulletHole } from "@/components/ui/bullet-hole";
import { Container } from "@/components/ui/container";
import { ProductCard } from "@/components/products/product-card";
import type { MenuFilter, MenuFilterId } from "@/types/menu";
import type { Product } from "@/types/product";
import styles from "./menu.module.css";

const PAGE_SIZE = 9;

interface MenuCatalogProps {
  products: Product[];
  filters: MenuFilter[];
  initialFilter: MenuFilterId;
  initialPage: number;
}

export function MenuCatalog({ products, filters, initialFilter, initialPage }: MenuCatalogProps) {
  const [activeFilter, setActiveFilter] = useState<MenuFilterId>(initialFilter);
  const [page, setPage] = useState(initialPage);
  const resultsRef = useRef<HTMLDivElement>(null);
  const visibleProducts = products.filter((product) =>
    activeFilter === "all" ||
    (activeFilter === "popular" ? product.popular : product.category === activeFilter),
  );
  const totalPages = Math.max(1, Math.ceil(visibleProducts.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageProducts = visibleProducts.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  useEffect(() => {
    function syncFromUrl() {
      const params = new URLSearchParams(window.location.search);
      const category = params.get("category");
      const requestedPage = Number(params.get("page") ?? "1");
      setActiveFilter(filters.find((filter) => filter.id === category)?.id ?? "all");
      setPage(Number.isSafeInteger(requestedPage) && requestedPage > 0 ? requestedPage : 1);
    }

    window.addEventListener("popstate", syncFromUrl);
    return () => window.removeEventListener("popstate", syncFromUrl);
  }, [filters]);

  function updateUrl(filter: MenuFilterId, nextPage: number) {
    const url = new URL(window.location.href);
    if (filter === "all") url.searchParams.delete("category");
    else url.searchParams.set("category", filter);
    if (nextPage === 1) url.searchParams.delete("page");
    else url.searchParams.set("page", String(nextPage));
    window.history.pushState(null, "", url);
  }

  function selectFilter(filter: MenuFilterId) {
    setActiveFilter(filter);
    setPage(1);
    updateUrl(filter, 1);
  }

  function selectPage(nextPage: number) {
    if (nextPage < 1 || nextPage > totalPages || nextPage === currentPage) return;
    setPage(nextPage);
    updateUrl(activeFilter, nextPage);
    resultsRef.current?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
      block: "start",
    });
  }

  return (
    <section className={styles.catalog} aria-labelledby="menu-title">
      <Container className={styles.container}>
        <div className={styles.intro}>
          <span className={styles.eyebrow}>Pick your craving</span>
          <h1 id="menu-title" className={styles.title}>The Menu<BulletHole className={styles.titleBullet} /></h1>
          <p className={styles.subtitle}>Every bite hits different. Choose your category and feast.</p>
        </div>

        <nav className={styles.filterBar} aria-label="Menu categories">
          {filters.map((filter) => (
            <button
              key={filter.id}
              type="button"
              aria-pressed={activeFilter === filter.id}
              onClick={() => selectFilter(filter.id)}
              className={styles.filterButton}
            >
              {filter.label}
            </button>
          ))}
        </nav>

        <div className={styles.results} ref={resultsRef}>
          <div className={styles.resultsHeading}>
            <h2>{filters.find((filter) => filter.id === activeFilter)?.label ?? "All"}</h2>
            <p aria-live="polite">{visibleProducts.length} {visibleProducts.length === 1 ? "item" : "items"}</p>
          </div>

          {pageProducts.length > 0 ? (
            <div className={styles.grid}>
              {pageProducts.map((product) => <ProductCard key={product.id} product={product} />)}
            </div>
          ) : (
            <p className={styles.emptyState}>Nothing is listed in this category yet.</p>
          )}

          {totalPages > 1 && (
            <nav className={styles.pagination} aria-label="Menu pages">
              <button type="button" onClick={() => selectPage(currentPage - 1)} disabled={currentPage === 1} aria-label="Previous page" className={styles.pageArrow}>
                <ArrowLeft size={20} aria-hidden="true" />
              </button>
              <span className={styles.pageCount} aria-live="polite">{currentPage} / {totalPages}</span>
              <button type="button" onClick={() => selectPage(currentPage + 1)} disabled={currentPage === totalPages} aria-label="Next page" className={styles.pageArrow}>
                <ArrowRight size={20} aria-hidden="true" />
              </button>
            </nav>
          )}
        </div>
      </Container>
    </section>
  );
}
