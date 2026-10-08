"use client";

import Image from "next/image";
import { useId } from "react";
import { Minus, Plus, Trash2 } from "lucide-react";
import { MAX_PRODUCT_NOTES_LENGTH, type CartLine } from "@/lib/cart";
import { formatNaira } from "@/lib/currency";
import { useCartStore } from "@/store/cart-store";
import styles from "./cart.module.css";

export function CartItem({ line }: { line: CartLine }) {
  const increaseQuantity = useCartStore((state) => state.increaseQuantity);
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);
  const removeProduct = useCartStore((state) => state.removeProduct);
  const updateNotes = useCartStore((state) => state.updateNotes);
  const { item, name } = line;
  const notesId = useId();

  return (
    <li className={styles.item}>
      <div className={styles.itemTop}>
        {line.image && (
          <div className={styles.itemImage}>
            <Image src={line.image} alt="" fill sizes="88px" />
          </div>
        )}
        <div className={styles.itemDetails}>
          <h3>{name}</h3>
          {line.options.length > 0 && <ul className={styles.options}>{line.options.map((option) => <li key={option}>{option}</li>)}</ul>}
          {line.unitPrice !== null && <p className={styles.unitPrice}>{formatNaira(line.unitPrice)} each</p>}
          {line.issue && <p className={styles.issue}>{line.issue}</p>}
        </div>
        <button type="button" className={styles.iconButton} onClick={() => removeProduct(item.id)} aria-label={`Remove ${name}`}>
          <Trash2 size={18} aria-hidden="true" />
        </button>
      </div>
      <div className={styles.itemControls}>
        <div className={styles.quantity} role="group" aria-label={`Quantity for ${name}`}>
          <button type="button" onClick={() => decreaseQuantity(item.id)} disabled={item.quantity <= 1} aria-label={`Decrease quantity of ${name}`}>
            <Minus size={16} aria-hidden="true" />
          </button>
          <span aria-live="polite" aria-atomic="true">{item.quantity}</span>
          <button type="button" onClick={() => increaseQuantity(item.id)} disabled={line.issue !== undefined || item.quantity === Number.MAX_SAFE_INTEGER} aria-label={`Increase quantity of ${name}`}>
            <Plus size={16} aria-hidden="true" />
          </button>
        </div>
        <p className={styles.lineTotal}>{line.lineTotal === null ? "Price to confirm" : formatNaira(line.lineTotal)}</p>
      </div>
      <label htmlFor={notesId} className={styles.notesLabel}>Notes for this item <span>(optional)</span></label>
      <textarea
        id={notesId}
        className={styles.notes}
        rows={2}
        maxLength={MAX_PRODUCT_NOTES_LENGTH}
        value={item.notes ?? ""}
        onChange={(event) => updateNotes(item.id, event.target.value)}
        placeholder="For example, sauce on the side"
      />
    </li>
  );
}
