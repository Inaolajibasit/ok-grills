import type { EventPackage } from "@/types/event";

// Enquiry categories requested by OK Grills; no approved event prices or capacities.
export const eventPackages: EventPackage[] = [
  { id: "linkup", name: "THE LINKUP", slug: "the-linkup", description: "Birthdays, house parties, and getting your people together. Tell us what you have in mind.", image: "/images/menu_food_5.png", price: null },
  { id: "function", name: "THE FUNCTION", slug: "the-function", description: "Office functions, wedding celebrations, and occasions worth gathering for. Build the food around your plans.", image: "/images/menu_food_2.png", price: null },
  { id: "big-one", name: "THE BIG ONE", slug: "the-big-one", description: "Large linkups and bigger events. Let's talk guest numbers, food preferences, and the full occasion.", image: "/images/menu_food_3.png", price: null },
];
