import { Check, Minus, Plus } from "lucide-react";
import { isBuildBoxItemOrderable } from "@/lib/build-your-box";
import { formatNaira } from "@/lib/currency";
import type { BuildBoxItem } from "@/types/build-your-box";
import styles from "./build-box.module.css";
import motion from "./motion.module.css";

interface IngredientCardProps {
  item: BuildBoxItem;
  quantity: number;
  onChange: (change: number) => void;
}

export function IngredientCard({ item, quantity, onChange }: IngredientCardProps) {
  const orderable = isBuildBoxItemOrderable(item);
  return (
    <li className={`${styles.ingredient} ${quantity > 0 ? styles.selected : ""}`}>
      <div className={styles.ingredientHeading}>
        <h3>{item.name}</h3>
        {quantity > 0 && <Check size={18} aria-label="Selected" className={styles.check} />}
      </div>
      <p className={styles.ingredientPrice}>{item.price === null ? "Price pending" : formatNaira(item.price)}{item.price !== null && <span> / portion</span>}</p>
      {orderable ? (
        <div className={styles.quantityControls} role="group" aria-label={`Portions of ${item.name}`}>
          <button type="button" onClick={() => onChange(-1)} disabled={quantity === 0} aria-label={`Remove one portion of ${item.name}`}><Minus size={17} aria-hidden="true" /></button>
          <span key={quantity} className={quantity > 0 ? motion.quantityPulse : ""} aria-live="polite" aria-atomic="true">{quantity}</span>
          <button type="button" onClick={() => onChange(1)} disabled={quantity === Number.MAX_SAFE_INTEGER} aria-label={`Add one portion of ${item.name}`}><Plus size={17} aria-hidden="true" /></button>
        </div>
      ) : (
        <p className={styles.unavailable}>{item.available ? "Available once the price is confirmed" : "Currently unavailable"}</p>
      )}
    </li>
  );
}
