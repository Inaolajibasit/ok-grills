import type { BuildBoxItem, BuildBoxSection } from "@/types/build-your-box";

import { buildBoxProducts, sideProducts } from "./products";

const catalog = new Map([...buildBoxProducts, ...sideProducts].map((product) => [product.id, product]));

function ingredient(productId: string, itemId = productId): BuildBoxItem {
  const product = catalog.get(productId);
  if (!product) throw new Error(`Missing approved builder product: ${productId}`);
  return { id: itemId, name: product.name, price: product.price, image: product.image, available: product.available !== false };
}

// Build-your-box choices from the approved root menu.md.
export const buildBoxSections: BuildBoxSection[] = [
  {
    id: "grills",
    name: "Grills",
    description: "Start with the fire. Mix your favourite grills and pick your portions.",
    items: [
      ingredient("brisket"), ingredient("pork-chops"), ingredient("pork-ribs"),
      ingredient("agege-bread-sandwich"), ingredient("grilled-turkey", "turkey"),
      ingredient("chicken"), ingredient("sausage"),
    ],
  },
  {
    id: "sides",
    name: "Sides",
    description: "Make room for the good stuff. Add your sides, your way.",
    items: sideProducts.filter((product) => product.id !== "pepper-sauce").map((product) => ingredient(product.id)),
  },
  {
    id: "extras",
    name: "Extras",
    description: "Finish your box with sauce and a little extra.",
    items: [ingredient("pepper-sauce"), ingredient("extra-cheese"), ingredient("packaging")],
  },
];

