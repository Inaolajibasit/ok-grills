import { z } from "zod";

export const checkoutSchema = z.object({
  customerName: z.string().trim().min(2, "Enter your name.").max(100, "Use 100 characters or fewer."),
  phoneNumber: z.string().trim().regex(/^\+?[\d\s()-]+$/, "Enter a valid phone number.").refine((value) => { const length = value.replace(/\D/g, "").length; return length >= 10 && length <= 15; }, "Enter a phone number with 10–15 digits."),
  area: z.string().trim().min(2, "Enter your delivery area.").max(200, "Use 200 characters or fewer."),
  address: z.string().trim().min(5, "Enter your full delivery address.").max(500, "Use 500 characters or fewer."),
  preferredDeliveryTime: z.string().trim().min(2, "Enter your preferred delivery time, or ASAP.").max(150, "Use 150 characters or fewer."),
  orderNotes: z.string().trim().max(1000, "Use 1,000 characters or fewer."),
});
export type CheckoutDetails = z.infer<typeof checkoutSchema>;
