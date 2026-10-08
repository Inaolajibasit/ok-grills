import { Danfo } from "next/font/google";
import { Container } from "@/components/ui/container";
import type { Category } from "@/types/category";
import { CategoryCard } from "./category-card";
import styles from "./category-discovery.module.css";

const danfo = Danfo({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-danfo",
});

export function CategoryDiscovery({ categories }: { categories: Category[] }) {
  return (
    <section
      className={`${styles.section} ${danfo.variable}`}
      aria-labelledby="category-discovery-title"
    >
      <Container>
        <div className={styles.intro}>
          <p className={styles.eyebrow}>
            <span className={styles.eyebrowLine} aria-hidden="true" />
            FIND YOUR FIRE
          </p>
          <h2 id="category-discovery-title" className={styles.title}>
            WHAT ARE YOU <span>HUNGRY FOR?</span>
          </h2>
          <p className={styles.count} aria-label={`${categories.length} menu categories`}>
            01 / {String(categories.length).padStart(2, "0")}
          </p>
        </div>

        <div className={styles.grid}>
          {categories.map((category, index) => (
            <CategoryCard
              key={category.id}
              category={category}
              number={String(index + 1).padStart(2, "0")}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
