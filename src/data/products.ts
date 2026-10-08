import type { Product } from "@/types/product";

// Transcribed from the approved root menu.md. Keep prices in NGN as numbers.
// An unclear or absent source price stays null until OK Grills confirms it.
export const sideProducts: Product[] = [
  { id: "bole", name: "Bole", slug: "bole", category: "sides", price: 4000, shortDescription: "Roasted plantain from the grill.", available: true, sortOrder: 42 },
  { id: "pepper-sauce", name: "Pepper Sauce", slug: "pepper-sauce", category: "sides", price: 1500, shortDescription: "A side cup of pepper sauce.", available: true, sortOrder: 43 },
  { id: "sweet-corn", name: "Sweet Corn", slug: "sweet-corn", category: "sides", price: 3000, shortDescription: "Sweet corn on the side.", available: true, sortOrder: 44 },
  { id: "sweet-potatoes", name: "Sweet Potatoes", slug: "sweet-potatoes", category: "sides", price: null, shortDescription: "Sweet potatoes for your box.", available: true, sortOrder: 45 },
  { id: "fries", name: "Fries", slug: "fries", category: "sides", price: 3000, shortDescription: "A portion of fries.", available: true, sortOrder: 46 },
  { id: "yam-fries", name: "Yam Fries", slug: "yam-fries", category: "sides", price: 3000, shortDescription: "A portion of yam fries.", available: true, sortOrder: 47 },
  { id: "dodo", name: "Dodo", slug: "dodo", category: "sides", price: 3000, shortDescription: "Fried plantain on the side.", available: true, sortOrder: 48 },
  { id: "veggies", name: "Box of Veggies", slug: "box-of-veggies", category: "sides", price: 5500, shortDescription: "A box of vegetables.", available: true, sortOrder: 49 },
];

export const products: Product[] = [
  {
    id: "family-feast-box", name: "Family Feast Box", slug: "family-feast-box", category: "grill-boxes", price: 125000,
    contents: ["3 Grilled Turkey", "3 Grilled Chicken Wings", "Pork Ribs / Chops / Brisket", "2 Advanced Agege Bread Sandwiches", "3 Sausages", "2 Cups of Pepper Sauce"],
    image: "/images/menu_food_2.png", available: true, sortOrder: 1,
  },
  {
    id: "ultimate-grill-heaven-box", name: "Ultimate Grill Heaven Box", slug: "ultimate-grill-heaven-box", category: "grill-boxes", price: 95000,
    contents: ["4 Grilled Turkey", "3 Grilled Chicken Wings", "Pork Ribs / Chops", "2 Advanced Agege Bread Sandwiches", "3 Sausages", "2 Cups of Pepper Sauce"],
    image: "/images/menu_food_3.png", available: true, sortOrder: 2,
  },
  {
    id: "mini-grill-box", name: "Mini Grill Box", slug: "mini-grill-box", category: "grill-boxes", price: 19000,
    contents: ["2 Grilled Turkey or 4 Grilled Chicken Wings", "1 Portion of Fries", "1 Sausage", "1 Cup of Pepper Sauce"],
    options: [{ id: "grill-choice", name: "Choose your grill", required: true, minSelections: 1, maxSelections: 1,
      choices: [{ id: "turkey", label: "2 Grilled Turkey" }, { id: "chicken-wings", label: "4 Grilled Chicken Wings" }] }],
    image: "/images/menu_food_5.png", featured: true, popular: true, available: true, sortOrder: 3,
  },
  {
    id: "mixed-regular-box", name: "Mixed Regular Box", slug: "mixed-regular-box", category: "grill-boxes", price: 30500,
    contents: ["2 Grilled Turkey or 4 Grilled Chicken Wings", "1 Agege Bread Sandwich", "2 Portions of Fries", "2 Sausages", "1 Cup of Pepper Sauce"],
    options: [{ id: "grill-choice", name: "Choose your grill", required: true, minSelections: 1, maxSelections: 1,
      choices: [{ id: "turkey", label: "2 Grilled Turkey" }, { id: "chicken-wings", label: "4 Grilled Chicken Wings" }] }],
    image: "/images/menu_food_5.png", available: true, sortOrder: 4,
  },
  {
    id: "mandate-box", name: "Mandate Box", slug: "mandate-box", category: "grill-boxes", price: 11500,
    contents: ["1 Grilled Turkey or 2 Grilled Chicken Wings", "1 Portion of Fries", "1 Sausage", "1 Cup of Pepper Sauce"],
    options: [{ id: "grill-choice", name: "Choose your grill", required: true, minSelections: 1, maxSelections: 1,
      choices: [{ id: "turkey", label: "1 Grilled Turkey" }, { id: "chicken-wings", label: "2 Grilled Chicken Wings" }] }],
    image: "/images/menu_food_1.png", available: true, sortOrder: 5,
  },
  {
    id: "regular-turkey-box", name: "Regular Turkey Box", slug: "regular-turkey-box", category: "grill-boxes", price: 36000,
    contents: ["4 Grilled Turkey or 8 Grilled Chicken Wings", "2 Portions of Fries", "2 Sausages", "1 Cup of Pepper Sauce"],
    options: [{ id: "grill-choice", name: "Choose your grill", required: true, minSelections: 1, maxSelections: 1,
      choices: [{ id: "turkey", label: "4 Grilled Turkey" }, { id: "chicken-wings", label: "8 Grilled Chicken Wings" }] }],
    image: "/images/menu_food_5.png", available: true, sortOrder: 6,
  },
  {
    id: "sandwich-mini-box", name: "Sandwich Mini Box", slug: "sandwich-mini-box", category: "grill-boxes", price: 19000,
    contents: ["1 Advanced Agege Bread Sandwich", "1 Portion of Fries", "1 Sausage", "1 Cup of Pepper Sauce"], image: "/images/menu_food_1.png", available: true, sortOrder: 7,
  },
  {
    id: "chicken-wings-heaven-box", name: "Chicken Wings Heaven Box", slug: "chicken-wings-heaven-box", category: "grill-boxes", price: 66500,
    contents: ["12 Grilled Chicken Wings", "2 Advanced Agege Bread Sandwiches", "3 Portions of Fries", "3 Sausages", "2 Cups of Pepper Sauce"], image: "/images/menu_food_3.png", available: true, sortOrder: 8,
  },
  {
    id: "full-chicken-feast-box", name: "Full Chicken Feast Box", slug: "full-chicken-feast-box", category: "grill-boxes", price: 55000,
    contents: ["1 Grilled Full Chicken", "3 Portion of Fries sausages", "2 Cups of Pepper Sauce"], image: "/images/menu_food_5.png", available: true, sortOrder: 9,
  },
  {
    id: "sandwich-regular-box", name: "Sandwich Regular Box", slug: "sandwich-regular-box", category: "grill-boxes", price: 36000,
    contents: ["2 Advanced Agege Bread Sandwiches", "2 Portions of Fries", "2 Sausages", "1 Cup of Pepper Sauce"], image: "/images/menu_food_4.png", available: true, sortOrder: 10,
  },
  {
    id: "turkey-heaven-box", name: "Turkey Heaven Box", slug: "turkey-heaven-box", category: "grill-boxes", price: 66500,
    contents: ["6 Grilled Turkey", "2 Advanced Agege Bread Sandwiches", "3 Portions of Fries", "3 Sausages", "2 Cups of Pepper Sauce"], available: true, sortOrder: 11,
  },
  {
    id: "pork-ribs-heaven-box", name: "Pork Ribs Heaven's Box", slug: "pork-ribs-heaven-box", category: "grill-boxes", price: 60000,
    contents: ["Grilled Pork Ribs", "3 Portions of Fries", "2 Cups of Pepper Sauce"],
    options: [{ id: "sandwiches", name: "Sandwiches", maxSelections: 1, choices: [
      { id: "pork", label: "With 2 Pork Sandwiches", priceModifier: 10000 },
      { id: "turkey", label: "With 2 Turkey Sandwiches", priceModifier: 10000 },
    ] }], available: true, sortOrder: 12,
  },
  {
    id: "pork-chops-box", name: "Pork Chops", slug: "pork-chops-box", category: "grill-boxes", price: 30000,
    contents: ["Pork Chops", "3 Portions of Fries", "2 Cups of Pepper Sauce"], available: true, sortOrder: 13,
  },
  {
    id: "mixed-heaven-box", name: "Mixed Heaven Box", slug: "mixed-heaven-box", category: "grill-boxes", price: 66500,
    contents: ["3 Grilled Turkey", "6 Grilled Chicken Wings", "2 Advanced Agege Bread Sandwiches", "3 Portions of Fries", "3 Sausages", "2 Cups of Pepper Sauce"], available: true, sortOrder: 14,
  },
  {
    id: "pork-heaven-platter", name: "Pork Heaven Platter", slug: "pork-heaven-platter", category: "grill-boxes", price: 96000,
    contents: ["Whole Rack of Grilled Pork Ribs", "Brisket", "Pork Chops"], available: true, sortOrder: 15,
  },
  {
    id: "brisket-turkey-box", name: "Brisket & Turkey Box", slug: "brisket-turkey-box", category: "grill-boxes", price: 49500,
    contents: ["2 Portions of Brisket", "2 Grilled Turkey", "1 Portion of Fries", "1 Sausage", "1 Cup of Pepper Sauce"], available: true, sortOrder: 16,
  },
  {
    id: "chicken-crave-box", name: "Chicken Crave Box", slug: "chicken-crave-box", category: "grill-boxes", price: null,
    contents: ["4 Grilled Chicken Wings", "1 Portion of Fries", "1 Sausage", "1 Cup of Pepper Sauce"], available: true, sortOrder: 17,
  },
  {
    id: "chicken-turkey-mix-box", name: "Chicken & Turkey Mix Box", slug: "chicken-turkey-mix-box", category: "grill-boxes", price: 40500,
    contents: ["3 Grilled Turkey", "3 Grilled Chicken Wings", "2 Portions of Fries", "2 Sausages", "1 Cup of Pepper Sauce"], available: true, sortOrder: 18,
  },
  {
    id: "pork-lovers-box", name: "Pork Lover's Box", slug: "pork-lovers-box", category: "grill-boxes", price: 38500,
    contents: ["2 Portions of Pork Ribs / Chops", "2 Portions of Fries", "2 Sausages", "1 Cup of Pepper Sauce"], available: true, sortOrder: 19,
  },
  {
    id: "brisket-grill-box", name: "Brisket Grill Box", slug: "brisket-grill-box", category: "grill-boxes", price: 42500,
    contents: ["Brisket", "2 Portions of Fries", "2 Sausages", "1 Cup of Pepper Sauce"], available: true, sortOrder: 20,
  },
  {
    id: "croaker-fish-heaven-box", name: "Croaker Fish Heaven Box", slug: "croaker-fish-heaven-box", category: "grill-boxes", price: 35500,
    contents: ["2 Grilled Croaker Fishes", "2 Corns", "3 Portions of Fries", "2 Cups of Pepper Sauce"], available: true, sortOrder: 21,
  },
  {
    id: "burger-box", name: "Burger Box", slug: "burger-box", category: "grill-boxes", price: 22500,
    contents: ["1 Caramelized Onions Chicken Burger", "A Side of Choice", "1 Sweet or Spicy Grilled Turkey", "1 Sausage", "1 Cup of Pepper Sauce"], available: true, sortOrder: 22,
  },
  {
    id: "catfish-heaven-box", name: "Catfish Heaven Box", slug: "catfish-heaven-box", category: "grill-boxes", price: 53500,
    contents: ["1 Large Grilled Catfish", "2 Corns", "3 Portions of Fries", "2 Cups of Pepper Sauce"], available: true, sortOrder: 23,
  },
  {
    id: "caramelized-onions-chicken-burger", name: "Caramelized Onions Chicken Burger", slug: "caramelized-onions-chicken-burger", category: "burgers", price: 14000,
    shortDescription: "Chicken burger with caramelized onions.",
    options: [{ id: "cheese", name: "Cheese", maxSelections: 1, choices: [{ id: "without-cheese", label: "Without Cheese", priceModifier: -1500 }] }],
    available: true, sortOrder: 24,
  },
  {
    id: "mixed-berries-waffles-box", name: "Mixed Berries Waffles Box", slug: "mixed-berries-waffles-box", category: "breakfast", price: 17500,
    contents: ["2 Mixed Berries Waffles", "1 Sausage", "1 Bacon", "1 Small Plate of Eggs", "1 Small Plate of Baked Beans", "1 Sweet Grilled Turkey", "2 Small Cups of Syrup"], available: true, sortOrder: 25,
  },
  {
    id: "mixed-chocolates-waffles-box", name: "Mixed Chocolates Waffles Box", slug: "mixed-chocolates-waffles-box", category: "breakfast", price: 15500,
    contents: ["2 Mixed Chocolates Waffles", "1 Sausage", "1 Bacon", "1 Small Plate of Eggs", "1 Small Plate of Baked Beans", "Sweet Grilled Turkey", "2 Small Cups of Syrup"], available: true, sortOrder: 26,
  },
  {
    id: "mixed-berries-pancakes-box", name: "Mixed Berries Pancakes Box", slug: "mixed-berries-pancakes-box", category: "breakfast", price: 17500,
    contents: ["2 Mixed Berries Pancakes", "1 Sausage", "1 Bacon", "1 Small Plate of Eggs", "1 Small Plate of Bakes Beans", "1 Sweet Grilled Turkey", "2 Small Cups of Syrup"], available: true, sortOrder: 27,
  },
  {
    id: "mixed-chocolates-pancakes-box", name: "Mixed Chocolates Pancakes Box", slug: "mixed-chocolates-pancakes-box", category: "breakfast", price: 15500,
    contents: ["2 Mixed Chocolates Pancakes", "1 Sausage", "1 Bacon", "1 Small Plate of Eggs", "1 Small Plate of Bakes Beans", "1 Sweet Grilled Turkey", "2 Small Cups of Syrup"], available: true, sortOrder: 28,
  },
  {
    id: "banana-waffles-box", name: "Banana Waffles Box", slug: "banana-waffles-box", category: "breakfast", price: 15500,
    contents: ["2 Banana Waffles", "1 Sausage", "1 Bacon", "1 Small Plate of Eggs", "1 Small Plate of Bakes Beans", "1 Sweet Grilled Turkey", "2 Small Cups of Syrup"], available: true, sortOrder: 29,
  },
  {
    id: "spicy-avocado-chicken-salad", name: "Spicy Avocado Chicken Salad", slug: "spicy-avocado-chicken-salad", category: "breakfast", price: 15000,
    shortDescription: "Spicy chicken and avocado salad.",
    available: true, sortOrder: 30,
  },
  {
    id: "banana-pancakes-box", name: "Banana Pancakes Box", slug: "banana-pancakes-box", category: "breakfast", price: 15500,
    contents: ["2 Banana Pancakes", "1 Sausage", "1 Bacon", "1 Small Plate of Eggs", "1 Small Plate of Bakes Beans", "1 Sweet Grilled Turkey", "2 Small Cups of Syrup"], available: true, sortOrder: 31,
  },
  {
    id: "breakfast-heaven-box", name: "Breakfast Heaven Box", slug: "breakfast-heaven-box", category: "breakfast", price: 53500,
    contents: ["3 Banana, Mixed Chocolates or Mixed Berries Waffles", "4 Banana, Mixed Chocolates or Mixed Berries Pancakes", "3 Sausages", "3 Bacons", "3 Small Plates of Eggs", "2 Small Plates of Bakes Beans", "4 Sweet Grilled Turkey", "3 Small Cups of Syrup"],
    serves: 4, available: true, sortOrder: 32,
  },
  {
    id: "advanced-abacha", name: "Advanced Abacha", slug: "advanced-abacha", category: "local", price: 5500,
    contents: ["1 Box of Abacha", "Sweet Corn", "Utazi Leaves", "Uba", "Onion", "Garden Egg"], available: true, sortOrder: 33,
  },
  {
    id: "advanced-local-beans", name: "Advanced Local Beans", slug: "advanced-local-beans", category: "local", price: 7000,
    contents: ["1 Box of Local Beans", "Utazi Leaves", "Roasted Yam", "Bole", "Roasted Sweet Potatoes"],
    options: [{ id: "extra-side", name: "Extra side", maxSelections: 1, choices: [
      { id: "bole", label: "Extra Bole", priceModifier: 4000 },
      { id: "roasted-yam", label: "Extra Roasted Yam", priceModifier: 4000 },
      { id: "sweet-potatoes", label: "Extra Roasted Sweet Potatoes", priceModifier: 4000 },
    ] }], available: true, sortOrder: 34,
  },
  { id: "grilled-turkey", name: "Grilled Turkey", slug: "grilled-turkey", category: "local", price: 6500, shortDescription: "Grilled turkey from the local protein selection.", available: true, sortOrder: 35 },
  { id: "oven-baked-catfish", name: "Oven Baked Catfish", slug: "oven-baked-catfish", category: "local", price: 5000, shortDescription: "Oven baked catfish from the local protein selection.", available: true, sortOrder: 36 },
  { id: "smoked-titus-fish", name: "Smoked Titus Fish", slug: "smoked-titus-fish", category: "local", price: 3500, shortDescription: "Smoked Titus fish from the local protein selection.", available: true, sortOrder: 37 },
  { id: "kpomo", name: "Kpomo", slug: "kpomo", category: "local", price: 2500, shortDescription: "Kpomo from the local protein selection.", available: true, sortOrder: 38 },
  {
    id: "classic-hotdog", name: "Classic Hotdog", slug: "classic-hotdog", category: "hotdogs", price: 5500,
    contents: ["1 Hotdog with 1 Sausage", "Ketchup", "Mayo", "Mustard"], available: true, sortOrder: 39,
  },
  {
    id: "turkey-loaded-hotdog", name: "Turkey Loaded Hotdog", slug: "turkey-loaded-hotdog", category: "hotdogs", price: 11000,
    contents: ["1 Hotdog with 1 Sausage", "Shredded Grilled Turkey", "Ketchup", "Mayo", "Mustard"],
    options: [{ id: "cheese", name: "Cheese", maxSelections: 1, choices: [{ id: "with-cheese", label: "With Cheese", priceModifier: 1000 }] }],
    available: true, sortOrder: 40,
  },
  {
    id: "chicken-loaded-hotdog", name: "Chicken Loaded Hotdog", slug: "chicken-loaded-hotdog", category: "hotdogs", price: 8000,
    contents: ["1 Hotdog with 1 Sausage", "Shredded Grilled Chicken", "Ketchup", "Mayo", "Mustard"],
    options: [{ id: "cheese", name: "Cheese", maxSelections: 1, choices: [{ id: "with-cheese", label: "With Cheese", priceModifier: 1000 }] }],
    available: true, sortOrder: 41,
  },
  ...sideProducts,
];

const grilledTurkey = products.find((product) => product.id === "grilled-turkey");
if (!grilledTurkey) throw new Error("The approved grilled turkey product is missing.");

// Builder-only portions from menu.md. Shared menu products are reused, not repriced.
export const buildBoxProducts: Product[] = [
  { id: "brisket", name: "Brisket", slug: "brisket", category: "grills", price: 35000, available: true },
  { id: "pork-chops", name: "Pork Chops", slug: "pork-chops", category: "grills", price: 40000, available: true },
  { id: "pork-ribs", name: "Pork Ribs 1kg", slug: "pork-ribs", category: "grills", price: 60000, available: true },
  { id: "agege-bread-sandwich", name: "Advanced Agege Bread Sandwich", slug: "agege-bread-sandwich", category: "grills", price: 6500, available: true },
  grilledTurkey,
  { id: "chicken", name: "Chicken", slug: "chicken", category: "grills", price: 3000, available: true },
  { id: "sausage", name: "Sausage", slug: "sausage", category: "grills", price: 1500, available: true },
  { id: "extra-cheese", name: "Extra Cheese", slug: "extra-cheese", category: "sides", price: 1500, available: true },
  { id: "packaging", name: "Packaging", slug: "packaging", category: "sides", price: null, available: true },
];
