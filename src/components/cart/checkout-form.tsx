"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { checkoutSchema, type CheckoutDetails } from "@/lib/checkout";
import { canContinueOrder, createOrderWhatsAppMessage, createWhatsAppUrl } from "@/lib/whatsapp";
import { resolveCartLines } from "@/lib/cart";
import { useCart } from "@/hooks/use-cart";
import { useCartStore } from "@/store/cart-store";
import { Button } from "@/components/ui/button";
import type { Product } from "@/types/product";
import type { BuildBoxSection } from "@/types/build-your-box";
import styles from "./checkout.module.css";

export interface CheckoutConfig { businessName: string; whatsappNumber: string; orderingEnabled: boolean; confirmationNotice: string }
interface CheckoutFormProps { products: Product[]; buildBoxSections: BuildBoxSection[]; config: CheckoutConfig }

export function CheckoutForm({ products, buildBoxSections, config }: CheckoutFormProps) {
  const { lines, hasHydrated } = useCart(products, buildBoxSections);
  const { register, handleSubmit, formState: { errors, isSubmitting, isReady } } = useForm<CheckoutDetails>({ resolver: zodResolver(checkoutSchema), mode: "onBlur", defaultValues: { customerName: "", phoneNumber: "", area: "", address: "", preferredDeliveryTime: "", orderNotes: "" } });
  const [feedback, setFeedback] = useState("");
  const [handoff, setHandoff] = useState<{ url: string; message: string; cartKey: string } | null>(null);
  const validRecipient = Boolean(createWhatsAppUrl(config.whatsappNumber, ""));
  const canContinue = hasHydrated && canContinueOrder(lines) && config.orderingEnabled && validRecipient;
  const currentHandoff = handoff?.cartKey === JSON.stringify(lines) ? handoff : null;
  const attrs = (name: keyof CheckoutDetails) => ({ id: `checkout-${name}`, "aria-invalid": Boolean(errors[name]), "aria-describedby": errors[name] ? `checkout-${name}-error` : undefined });

  function continueOnWhatsApp(details: CheckoutDetails) {
    if (!config.orderingEnabled || !hasHydrated) return;
    // Read again after async validation so a cart edit cannot leave a stale order.
    const latest = resolveCartLines(useCartStore.getState().items, products, buildBoxSections);
    try {
      const message = createOrderWhatsAppMessage(latest, details, config.businessName, config.confirmationNotice);
      const url = createWhatsAppUrl(config.whatsappNumber, message);
      if (!url) throw new Error("WhatsApp ordering is currently unavailable.");
      setHandoff({ url, message, cartKey: JSON.stringify(latest) });
      setFeedback("Your order request is ready. Review and send it in WhatsApp. Your cart has been kept.");
      window.open(url, "_blank", "noopener,noreferrer");
    } catch (error: unknown) { setFeedback(error instanceof Error ? error.message : "Please check your cart and delivery details."); }
  }

  return <section className={styles.checkout} aria-labelledby="checkout-title">
    <p className={styles.eyebrow}>The next step</p><h2 id="checkout-title">Delivery details<span>.</span></h2>
    <p className={styles.notice} id="checkout-confirmation">{config.confirmationNotice}</p>
    <form method="post" noValidate onSubmit={handleSubmit(continueOnWhatsApp)} onChange={() => { setHandoff(null); setFeedback(""); }}>
      <noscript>Enable JavaScript to prepare your WhatsApp order.</noscript>
      <fieldset disabled={!hasHydrated || !isReady || !config.orderingEnabled} className={styles.fields}>
        <legend className="sr-only">Customer and delivery information</legend>
        {([{ name: "customerName", label: "Name", autoComplete: "name", max: 100 }, { name: "phoneNumber", label: "Phone number", autoComplete: "tel", type: "tel", max: 30 }, { name: "area", label: "Delivery area", max: 200 }, { name: "preferredDeliveryTime", label: "Preferred delivery time", placeholder: "ASAP, or your preferred date and time", max: 150 }] as const).map((field) => <div key={field.name} className={styles.field}><label htmlFor={`checkout-${field.name}`}>{field.label} *</label><input {...attrs(field.name)} {...register(field.name)} required maxLength={field.max} autoComplete={"autoComplete" in field ? field.autoComplete : undefined} type={"type" in field ? field.type : "text"} placeholder={"placeholder" in field ? field.placeholder : undefined} />{errors[field.name] && <p id={`checkout-${field.name}-error`} className={styles.error} role="alert">{errors[field.name]?.message}</p>}</div>)}
        <div className={`${styles.field} ${styles.wide}`}><label htmlFor="checkout-address">Full delivery address *</label><textarea {...attrs("address")} {...register("address")} autoComplete="street-address" rows={3} required maxLength={500} />{errors.address && <p id="checkout-address-error" className={styles.error} role="alert">{errors.address.message}</p>}</div>
        <div className={`${styles.field} ${styles.wide}`}><label htmlFor="checkout-orderNotes">Order notes (optional)</label><textarea {...attrs("orderNotes")} {...register("orderNotes")} rows={3} maxLength={1000} placeholder="Delivery instructions or anything else about your order" />{errors.orderNotes && <p id="checkout-orderNotes-error" className={styles.error} role="alert">{errors.orderNotes.message}</p>}</div>
      </fieldset>
      {!config.orderingEnabled ? <p role="status">Ordering is currently paused.</p> : !validRecipient ? <p role="status">WhatsApp ordering is currently unavailable.</p> : !canContinueOrder(lines) && <p className={styles.error} role="status">Update your cart before continuing. Every item needs a confirmed price and valid selections.</p>}
      <Button type="submit" disabled={!canContinue || !isReady || isSubmitting} aria-describedby="checkout-confirmation" className={styles.cta}>CONTINUE ON WHATSAPP</Button>
      <p className={styles.help}>Review the message and send it in WhatsApp. This does not confirm availability or payment.</p>
      <p role="status">{handoff && !currentHandoff ? "Your cart changed. Continue again to update your WhatsApp message." : feedback}</p>
      {currentHandoff && <div className={styles.handoff}><label htmlFor="checkout-message">Your order request</label><textarea id="checkout-message" readOnly rows={12} value={currentHandoff.message} /><a href={currentHandoff.url} target="_blank" rel="noopener noreferrer">CONTINUE ON WHATSAPP</a><p>If WhatsApp did not open, use the link above. Your order has not been submitted until you send the message.</p></div>}
    </form>
  </section>;
}
