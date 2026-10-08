"use client";

import Image from "next/image";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { formatNaira } from "@/lib/currency";
import { getProductAvailability, getProductDescription } from "@/lib/product-display";
import { getSelectedPrice, optionsAreComplete, toCartSelections, type SelectedChoices } from "@/lib/product-options";
import { useCartStore } from "@/store/cart-store";
import type { Product } from "@/types/product";
import styles from "../menu/menu.module.css";

export function ProductCard({ product }: { product: Product }) {
  const [optionsOpen, setOptionsOpen] = useState(false);
  const [selectedChoices, setSelectedChoices] = useState<SelectedChoices>({});
  const [addedCount, setAddedCount] = useState(0);
  const addProduct = useCartStore((state) => state.addProduct);
  const openCart = useCartStore((state) => state.openCart);
  const hasHydrated = useCartStore((state) => state.hasHydrated);
  const availability = getProductAvailability(product);
  const hasOptions = Boolean(product.options?.length);
  const canAdd = availability === "available";
  const selectedPrice = getSelectedPrice(product, selectedChoices);

  function addToCart(event?: FormEvent<HTMLFormElement>) {
    event?.preventDefault();
    if (!canAdd || !optionsAreComplete(product, selectedChoices)) return;
    addProduct(product, toCartSelections(product, selectedChoices));
    setAddedCount((count) => count + 1);
    setOptionsOpen(false);
    openCart();
  }

  return (
    <article className={styles.productCard}>
      {product.image && (
        <div className={styles.productMedia}>
          <Image src={product.image} alt="" fill sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 33vw" />
        </div>
      )}

      <div className={styles.productBody}>
        {availability !== "available" && (
          <p className={`${styles.availability} ${styles[availability]}`}>
            {availability === "sold-out" ? "Sold out" : "Price pending"}
          </p>
        )}

        <h3 className={styles.productName}>{product.name}</h3>
        <p className={styles.productDescription}>{getProductDescription(product)}</p>
        {product.contents && product.contents.length > 3 && (
          <details className={styles.contentsDetails}>
            <summary>See everything included</summary>
            <ul>
              {product.contents.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </details>
        )}
        {product.serves && <p className={styles.serves}>Serves {product.serves}</p>}

        <div className={styles.productFooter}>
          <p className={styles.price}>{product.price === null ? "Price to confirm" : formatNaira(product.price)}</p>
          <Button
            disabled={!canAdd || !hasHydrated}
            onClick={() => hasOptions ? setOptionsOpen((open) => !open) : addToCart()}
            aria-label={hasOptions ? `Choose options for ${product.name}` : `Add ${product.name} to cart`}
            aria-expanded={hasOptions ? optionsOpen : undefined}
            aria-controls={hasOptions && optionsOpen ? `${product.id}-options` : undefined}
            className={styles.addButton}
          >
            {!canAdd ? "Unavailable" : hasOptions ? "Choose options" : "Order now"}
          </Button>
        </div>

        {hasOptions && optionsOpen && canAdd && (
          <form id={`${product.id}-options`} className={styles.optionsForm} onSubmit={addToCart}>
            {product.options?.map((option) => {
              const selected = selectedChoices[option.id] ?? [];
              const minimum = option.minSelections ?? (option.required ? 1 : 0);
              const maximum = option.maxSelections ?? option.choices.length;

              return (
                <fieldset key={option.id} className={styles.optionGroup}>
                  <legend>{option.name}{minimum > 0 ? " *" : ""}</legend>
                  {maximum === 1 ? (
                    <select
                      aria-label={option.name}
                      required={minimum > 0}
                      value={selected[0] ?? ""}
                      onChange={(event) => setSelectedChoices((current) => ({
                        ...current,
                        [option.id]: event.target.value ? [event.target.value] : [],
                      }))}
                      className={styles.optionSelect}
                    >
                      <option value="">{minimum > 0 ? "Choose one" : "No extra"}</option>
                      {option.choices.map((choice) => (
                        <option key={choice.id} value={choice.id}>
                          {choice.label}{choice.priceModifier ? ` (${choice.priceModifier > 0 ? "+" : ""}${formatNaira(choice.priceModifier)})` : ""}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <div className={styles.optionChoices}>
                      {option.choices.map((choice) => (
                        <label key={choice.id}>
                          <input
                            type="checkbox"
                            checked={selected.includes(choice.id)}
                            disabled={!selected.includes(choice.id) && selected.length >= maximum}
                            onChange={(event) => setSelectedChoices((current) => ({
                              ...current,
                              [option.id]: event.target.checked
                                ? [...selected, choice.id]
                                : selected.filter((id) => id !== choice.id),
                            }))}
                          />
                          <span>{choice.label}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </fieldset>
              );
            })}
            <Button type="submit" disabled={!optionsAreComplete(product, selectedChoices)} className={styles.confirmButton}>
              Add to cart{selectedPrice !== null ? ` · ${formatNaira(selectedPrice)}` : ""}
            </Button>
          </form>
        )}

        <p className={styles.cartFeedback} aria-live="polite">
          {addedCount > 0 ? `${product.name} added to cart${addedCount > 1 ? ` (${addedCount})` : ""}.` : ""}
        </p>
      </div>
    </article>
  );
}
