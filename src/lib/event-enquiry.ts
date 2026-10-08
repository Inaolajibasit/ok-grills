import { z } from "zod";
import type { EventPackage } from "../types/event";

export function getEventToday(now = new Date()): string {
  return new Intl.DateTimeFormat("sv-SE", { timeZone: "Africa/Lagos", year: "numeric", month: "2-digit", day: "2-digit" }).format(now);
}

function isRealDate(value: string): boolean {
  const date = new Date(`${value}T12:00:00Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
}

export function createEventEnquirySchema(packageIds: string[], eventTypes: string[]) {
  return z.object({
    name: z.string().trim().min(2, "Enter your name.").max(100, "Use 100 characters or fewer."),
    phone: z.string().trim().regex(/^\+?[\d\s()-]+$/, "Enter a valid phone number.").refine((value) => { const digits = value.replace(/\D/g, ""); return digits.length >= 10 && digits.length <= 15; }, "Enter a phone number with 10–15 digits."),
    eventType: z.string().refine((value) => eventTypes.includes(value), "Choose your event type."),
    eventDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Choose your event date.").refine(isRealDate, "Choose a valid date.").refine((value) => value >= getEventToday(), "Choose today or a future date."),
    guestCount: z.string().trim().regex(/^[1-9]\d*$/, "Enter a whole number of guests, at least 1.").refine((value) => Number.isSafeInteger(Number(value)), "Enter a valid guest count.").transform(Number),
    deliveryArea: z.string().trim().min(2, "Enter the delivery area.").max(200, "Use 200 characters or fewer."),
    budget: z.string().trim().max(150, "Use 150 characters or fewer."),
    foodPreferences: z.string().trim().max(1000, "Use 1,000 characters or fewer."),
    additionalNotes: z.string().trim().max(1500, "Use 1,500 characters or fewer."),
    packageId: z.string().refine((value) => value === "" || packageIds.includes(value), "Choose a listed package."),
  });
}

export type EventEnquiryInput = z.input<ReturnType<typeof createEventEnquirySchema>>;
export type EventEnquiryValues = z.output<ReturnType<typeof createEventEnquirySchema>>;

export function formatEventEnquiry(values: EventEnquiryValues, packages: EventPackage[], businessName: string): string {
  const chosen = packages.find((entry) => entry.id === values.packageId);
  const date = new Intl.DateTimeFormat("en-GB", { timeZone: "Africa/Lagos", day: "numeric", month: "long", year: "numeric" }).format(new Date(`${values.eventDate}T12:00:00Z`));
  return [
    `${businessName} — Event enquiry`, "",
    `Name: ${values.name}`, `Phone: ${values.phone}`, `Event type: ${values.eventType}`, `Event date: ${date}`,
    `Guests: ${values.guestCount}`, `Delivery area: ${values.deliveryArea}`, `Package: ${chosen?.name ?? "Please recommend"}`,
    `Budget: ${values.budget || "To discuss"}`, `Food preferences: ${values.foodPreferences || "Please recommend"}`,
    `Additional notes: ${values.additionalNotes || "None"}`, "", "Please confirm availability and a tailored quote for this event.",
  ].join("\n");
}

export function getEnquiryWhatsAppUrl(number: string, message: string): string | null {
  const trimmed = number.trim();
  if (!/^\+?[1-9]\d{7,14}$/.test(trimmed)) return null;
  return `https://wa.me/${trimmed.replace(/^\+/, "")}?text=${encodeURIComponent(message)}`;
}
