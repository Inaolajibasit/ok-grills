import Image from "next/image";
import { BulletHole } from "@/components/ui/bullet-hole";
import { Anton, Danfo } from "next/font/google";
import { ArrowUpRight, Sun } from "lucide-react";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { ProductCard } from "@/components/products/product-card";
import type { Category } from "@/types/category";
import type { Product } from "@/types/product";
import type { HomeMenuFeatureContent } from "@/types/settings";
import styles from "./home-menu-feature.module.css";

const heading = Danfo({ subsets: ["latin"], display: "swap", variable: "--font-feature-heading" });
const cards = Anton({ weight: "400", subsets: ["latin"], display: "swap", variable: "--font-menu-display" });

interface HomeMenuFeatureProps {
  category: Category;
  products: Product[];
  content: HomeMenuFeatureContent;
  theme: "light" | "dark";
}

export function HomeMenuFeature({ category, products, content, theme }: HomeMenuFeatureProps) {
  const featured = products.slice(0, content.featuredProductCount);
  if (featured.length === 0) return null;
  const headingId = `home-${category.id}-title`;
  return (
    <section className={`${styles.feature} ${styles[theme]} ${heading.variable} ${cards.variable}`} aria-labelledby={headingId} data-home-menu-feature={category.id}>
      <Container>
        <div className={styles.intro}>
          <header className={styles.copy}>
            {content.eyebrow && <p className={styles.eyebrow}>{content.eyebrow}</p>}
            <h2 id={headingId} className={styles.title} aria-label={content.headlineLines.join(" ")}>
              {content.headlineLines.map((line) => <span key={line} aria-hidden="true">{line}</span>)}
            </h2>
            <p className={styles.description}>{content.description}</p>
            <ButtonLink href={category.href} variant="secondary" className={styles.categoryLink}>{content.actionLabel}<ArrowUpRight size={19} aria-hidden="true" /></ButtonLink>
          </header>
          {category.image && (
            <div className={styles.visual}>
              <div className={styles.photo}><Image src={category.image} alt={`${category.name} food inspiration`} fill sizes="(max-width: 767px) 90vw, 45vw" /></div>
              {theme === "light" ? <span className={styles.sun} aria-hidden="true"><Sun size={44} strokeWidth={1.5} /></span> : <BulletHole className={styles.photoBullet} />}
            </div>
          )}
        </div>
        <ul className={styles.products} aria-label={`Featured ${category.name.toLowerCase()} products`}>
          {featured.map((product) => <li key={product.id}><ProductCard product={product} /></li>)}
        </ul>
      </Container>
    </section>
  );
}
