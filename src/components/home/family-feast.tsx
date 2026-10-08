import Image from "next/image";
import { BulletHole } from "@/components/ui/bullet-hole";
import { Danfo } from "next/font/google";
import { Container } from "@/components/ui/container";
import { FamilyFeastMotion } from "@/components/motion/family-feast-motion";
import { formatNaira } from "@/lib/currency";
import type { Product } from "@/types/product";
import type { SiteSettings } from "@/types/settings";
import { FamilyFeastAction } from "./family-feast-action";
import styles from "./family-feast.module.css";

const display = Danfo({ subsets: ["latin"], display: "swap", variable: "--font-feast-display" });

interface FamilyFeastProps {
  product: Product;
  content: SiteSettings["familyFeast"];
}

export function FamilyFeast({ product, content }: FamilyFeastProps) {
  return (
    <section className={`${styles.campaign} ${display.variable}`} aria-labelledby="family-feast-title" data-family-feast>
      <Container className={styles.layout}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>{content.eyebrow}</p>
          <h2 id="family-feast-title" className={styles.headline}>
            {content.headlineLines.map((line) => <span key={line} data-feast-headline>{line}</span>)}
          </h2>
          <p className={styles.price}>{product.price === null ? "Price to confirm" : formatNaira(product.price)}</p>
          <FamilyFeastAction product={product} label={content.actionLabel} />
        </div>
        {product.image && (
          <div className={styles.visual}>
            <div className={styles.photoFrame} data-feast-image>
              <Image src={product.image} alt={product.name} fill sizes="(max-width: 767px) 92vw, 58vw" className={styles.photo} />
            </div>
            <BulletHole className={styles.cornerMark} />
          </div>
        )}
      </Container>
      <FamilyFeastMotion />
    </section>
  );
}
