import { formatNaira } from "@/lib/currency";
import type { CartTotals } from "@/lib/cart";
import styles from "./cart.module.css";

interface CartSummaryProps {
  totals: CartTotals;
  deliveryNotice: string;
}

export function CartSummary({ totals, deliveryNotice }: CartSummaryProps) {
  return (
    <section className={styles.summary} aria-label="Cart summary">
      <dl aria-live="polite" aria-atomic="true">
        <div><dt>Items</dt><dd>{totals.count}</dd></div>
        <div className={styles.subtotal}>
          <dt>{totals.hasUnpricedItems ? "Priced items subtotal" : "Subtotal"}</dt>
          <dd>{formatNaira(totals.subtotal)}</dd>
        </div>
      </dl>
      {totals.hasUnpricedItems && <p className={styles.issue}>Some items need updating and are excluded from this subtotal.</p>}
      <p className={styles.deliveryNotice}>{deliveryNotice}</p>
    </section>
  );
}
