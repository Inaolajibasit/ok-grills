# OK GRILLS — PROJECT CONTEXT

## Product

OK Grills is an online-first Lagos food brand.

The company primarily sells grilled food and currently takes orders online/socially.

The website exists to:
1. Present the brand.
2. Showcase the menu.
3. Allow customers to build food orders.
4. Convert orders into WhatsApp conversations.
5. Generate larger event/function enquiries.

---

## Brand Positioning

FIRE. FOOD. FUNCTIONS.

The visual direction is:

Modern Lagos grill house
+
streetwear/ecommerce
+
bold food photography
+
mild Wild West influence.

The site must NOT look like a generic restaurant template.

The Wild West influence should be subtle and expressed through typography, stamps, linework, textures and graphic details.

---

## Brand Colours

Primary:
#FCEE23

Secondary:
#F5290A

Supporting:

Black:
#0D0D0D

Charcoal:
#1B1A18

Smoke:
#272522

Bone:
#F5E9CC

Ash:
#BDB8AD

---

## Core Pages

/

/menu

/build-a-box

/events

/about

/cart

---

## Homepage Sections

1. Navigation
2. Hero
3. Category discovery
4. Heavy Hitters
5. Build Your Box
6. Scroll story
7. Family Feast
8. Events
9. Breakfast reveal
10. Local menu
11. Social/UGC
12. Final CTA
13. Footer

---

## Core Ecommerce Flow

Product
→ Add to cart
→ Cart
→ Customer delivery information
→ Generate formatted WhatsApp message
→ Open WhatsApp
→ OK Grills confirms availability, delivery and payment.

There is NO full payment gateway in V1.

---

## Technologies

Next.js
TypeScript
Tailwind
GSAP
ScrollTrigger
Lenis
Motion
Zustand
React Hook Form
Zod
Vercel

---

## UX Principles

Ordering comes before animation.

The site can be experimental but must remain easy to navigate.

Mobile is a priority because much traffic will come from Instagram.

Do not add unnecessary features.

Do not introduce new libraries unless they solve a clear problem.

Reuse components.

Keep TypeScript strict.

Avoid duplicated data.

Menu content should come from Sanity once CMS integration is complete.

---

## Motion

Use only a few major cinematic interactions.

Primary motion experiences:

1. Hero animation.
2. Build-a-box sequence.
3. Family Feast reveal.
4. Page transition.

Menu/cart interactions should remain fast.

Respect prefers-reduced-motion.

---

## Development Rule

Before making major architectural changes:

1. Read this file.
2. Read README.md.
3. Inspect existing implementation.
4. Do not rewrite functioning components unnecessarily.
5. Preserve the established design language.
6. Update this file when an important project decision changes.




## Content Architecture

V1 does not use a CMS.

Menu and business content currently live in typed local data files under:

src/data/

Application components must NOT import these files directly.

All content should be accessed through functions under:

src/services/

For example:

UI
→ getProducts()
→ local data

This abstraction is intentional.

A CMS such as Sanity may be introduced later.

When that happens, the service layer should be updated to retrieve CMS data while preserving existing Product, Category and Settings interfaces where practical.

Do not couple UI components to the current local data implementation.

Do not duplicate product data.

Do not hardcode prices directly inside components.