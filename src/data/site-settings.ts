import type { SiteSettings } from "@/types/settings";

export const siteSettings: SiteSettings = {
  businessName: "OK Grills",
  checkout: { confirmationNotice: "Delivery cost, availability, and final payment are confirmed by OK Grills on WhatsApp. No payment has been taken." },
  events: {
    eyebrow: "Fire. Food. Your function.",
    headlineLines: ["FEED THE", "FUNCTION."],
    supportingCopy: "Birthdays. House parties. Office functions. Weddings. Large linkups. Whatever the event, bring your people and let's talk food.",
    heroImage: "/images/menu_food_2.png",
    eventTypes: ["Birthday", "House party", "Office function", "Wedding", "Large linkup", "Other event"],
  },
  homeMenuFeatures: {
    breakfast: {
      eyebrow: "THOUGHT WE ONLY DID GRILLS?",
      headlineLines: ["GOOD", "MORNING."],
      description: "Waffles, pancakes, and breakfast boxes. Start your day with a little OK Grills.",
      actionLabel: "Explore breakfast",
      featuredProductCount: 3,
    },
    local: {
      headlineLines: ["LOCAL.", "BUT DIFFERENT."],
      description: "Familiar favourites, the OK Grills way. Abacha, local beans, and your choice of protein.",
      actionLabel: "Explore local",
      featuredProductCount: 3,
    },
  },
  familyFeast: {
    productSlug: "family-feast-box",
    eyebrow: "FOR THE WHOLE CREW",
    headlineLines: ["FAMILY", "FEAST"],
    actionLabel: "BRING THE FEAST",
  },
  grillStory: {
    eyebrow: "From the grill to your doorstep",
    title: "Four steps. Full flavour.",
    actionLabel: "Build your box",
    actionHref: "/build-a-box",
    stages: [
      { id: "pick", headline: "PICK IT.", description: "Your cravings call the shots. Choose your grills, sides, and all the extras.", imageSrc: "/images/menu_food_1.png", imageAlt: "A mixed grill box with meats, sauces, and toasted sandwiches" },
      { id: "grill", headline: "WE GRILL IT.", description: "Fire up the flavour. This is where your picks get the OK Grills treatment.", imageSrc: "/images/hero-image.webp", imageAlt: "A close view of grilled food" },
      { id: "load", headline: "WE LOAD IT.", description: "Grills meet sides. Everything comes together in one loaded box.", imageSrc: "/images/menu_food_2.png", imageAlt: "An open food box packed with grilled meats, fries, and sandwiches" },
      { id: "enjoy", headline: "YOU DESTROY IT.", description: "Open the box. Gather your people. Get stuck in.", imageSrc: "/images/menu_food_3.png", imageAlt: "A ready-to-eat box of grilled meats and sides" },
    ],
  },
  tagline: "Fire. Food. Functions.",
  whatsappNumber: "+2348109288279",
  email: "",
  orderingEnabled: true,
  deliveryNotice: "Delivery fee is confirmed after your order is received.",
  eventEnquiryEnabled: true,
  buildBox: {
    previewImageSrc: "/images/menu_food_3.png",
    priceNotice: "Ingredient total only. Packaging and delivery are confirmed separately.",
  },
  social: {
    instagram: "https://www.instagram.com/okgrills/",
  },
  hero: {
    logoSrc: "/images/okgrillslogo.png",
    starSrc: "/images/star-illustration.png",
    posterSrc: "/images/hero-image.webp",
    videoSrc: "/images/hero_section_video.mp4",
    headlineLines: ["FIRE UP", "YOUR", "APPETITE."],
    supportingCopy: "Big grills. Loaded boxes. Delivered to you.",
    orderLabel: "ORDER NOW",
    menuLabel: "VIEW MENU",
    ticker: ["TURKEY", "BRISKET", "WINGS", "RIBS", "FRIES", "BOLE", "HOTDOGS", "REPEAT"],
  },
};
