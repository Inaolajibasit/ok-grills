import type { CartLine } from "./cart";
import { calculateCartTotals } from "./cart";
import { checkoutSchema, type CheckoutDetails } from "./checkout";
import { formatNaira } from "./currency";

export function canContinueOrder(lines: CartLine[]): boolean {
  const totals = calculateCartTotals(lines);
  return lines.length > 0 && !totals.hasUnpricedItems && Number.isSafeInteger(totals.subtotal) && Number.isSafeInteger(totals.count) && lines.every((line) =>
    !line.issue && Number.isSafeInteger(line.item.quantity) && line.item.quantity > 0 &&
    line.unitPrice !== null && Number.isSafeInteger(line.unitPrice) && line.unitPrice >= 0 &&
    line.lineTotal === line.unitPrice * line.item.quantity && Number.isSafeInteger(line.lineTotal));
}

export function createOrderWhatsAppMessage(lines: CartLine[], details: CheckoutDetails, businessName: string, confirmationNotice: string): string {
  if (!canContinueOrder(lines)) throw new Error("Update your cart before continuing. Every item needs a confirmed price and valid selections.");
  const customer = checkoutSchema.parse(details);
  const items = lines.flatMap((line, index) => [
    `${index + 1}. ${line.item.quantity} × ${line.name}`,
    `   Unit price: ${formatNaira(line.unitPrice!)} | Line total: ${formatNaira(line.lineTotal!)}`,
    ...(line.options.length ? [line.item.kind === "build-box" ? "   Ingredients per box:" : "   Options per item:"] : []),
    ...line.options.map((option) => `   ${option}`),
    ...(line.item.notes ? [`   Item notes: ${line.item.notes}`] : []), "",
  ]);
  return [
    `${businessName} — Order request`, "", "ITEMS", ...items,
    `Subtotal: ${formatNaira(calculateCartTotals(lines).subtotal)}`, "Delivery cost: To be confirmed", "",
    "CUSTOMER & DELIVERY", `Name: ${customer.customerName}`, `Phone: ${customer.phoneNumber}`,
    `Delivery area: ${customer.area}`, `Full address: ${customer.address}`, `Preferred delivery time: ${customer.preferredDeliveryTime}`,
    `Order notes: ${customer.orderNotes || "None"}`, "", confirmationNotice,
    "Please confirm availability and my preferred delivery time before finalising this order.",
  ].join("\n");
}

export function createWhatsAppUrl(number: string, message: string): string | null {
  const recipient = number.trim();
  return /^\+?[1-9]\d{7,14}$/.test(recipient) ? `https://wa.me/${recipient.replace(/^\+/, "")}?text=${encodeURIComponent(message)}` : null;
}
