import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Category } from "@/types/category";
import styles from "./category-discovery.module.css";

export function CategoryCard({
  category,
  number,
}: {
  category: Category;
  number: string;
}) {
  return (
    <Link className={styles.card} href={category.href}>
      {category.image && (
        <Image
          className={styles.cardImage}
          src={category.image}
          alt=""
          fill
          sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 60vw"
        />
      )}
      <span className={styles.cardShade} aria-hidden="true" />
      <span className={styles.cardIndex} aria-hidden="true">{number} / MENU</span>
      <span className={styles.cardStamp} aria-hidden="true">OK / G</span>
      <div className={styles.cardDetails}>
        <h3 className={styles.cardTitle}>{category.name}</h3>
        <span className={styles.cardAction}>
          <span>EXPLORE</span>
          <span className={styles.arrow} aria-hidden="true">
            <ArrowUpRight size={22} strokeWidth={1.8} />
          </span>
        </span>
      </div>
    </Link>
  );
}
