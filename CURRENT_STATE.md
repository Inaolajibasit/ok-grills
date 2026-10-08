# Current Development State

## Current Phase

Homepage features, /menu, the persisted cart, /build-a-box, /events, and /cart checkout with WhatsApp handoff are implemented. Heavy Hitters remains the next homepage section.

## Completed

- Next.js, TypeScript, Tailwind, dark design tokens, fonts, base layout, navigation, footer, reusable UI components, and reduced-motion aware Lenis integration.
- Typed local content architecture with async product, category, settings, build-box, and event services; no CMS or database.
- Approved root menu.md catalog: 41 original products plus eight standalone sides, seven category records (six featured on the homepage), and 17 build-box items. Unknown prices use null.
- Full viewport homepage hero redesigned around the supplied visual reference: burgundy field, oversized stacked white headline, supplied food video with an image fallback, transparent overlaid navigation, supporting copy, two CTAs, and a continuous food ticker.
- The uploaded OK Grills logo appears in the navigation; the homepage header overlays the hero while the standard header remains on other routes.
- The navigation uses a larger, centered logo without a visible wordmark. Desktop links align left and the cart aligns right; mobile keeps the menu button left of the centered logo.
- About is excluded from desktop and mobile navigation. The quality review also removed the footer's broken About destination until that page exists. Hovering the logo (on devices supporting hover) or focusing it with the keyboard speeds the star from a 20-second rotation to 4 seconds. Reduced motion still disables rotation.
- The supplied gold star illustration sits behind the centered logo and rotates continuously with CSS; reduced-motion preference keeps it still. Header and mobile hero spacing accommodate the larger graphic.
- The supplied `hero_section_video.mp4` plays muted, inline, and on a loop on desktop and mobile when motion is allowed; the image poster remains underneath it and is shown for reduced motion.
- GSAP masked headline reveal, supporting-copy entrance, and subtle media scale. Reduced-motion preference skips the entrance animation and stops the ticker.
- Hero copy and media paths live in site settings and reach the page through getSiteSettings().
- The hero headline uses Google Fonts Danfo as its primary display typeface; supporting copy and navigation retain the UI font.
- Homepage category discovery renders the six featured categories from getFeaturedCategories() beneath the hero. Reusable, fully linked editorial cards show their labels and actions at all screen sizes, with a restrained image zoom and graphic response on hover.
- Six optimized WebP category images provide provisional food photography. The desktop layout alternates wide and narrow cards; mobile stacks them vertically.
- The /menu route renders 49 products from getMenuProducts() through a reusable ProductCard. It has wrapping category filter pills, client-side filtering, responsive cards, descriptions, expandable box contents, prices, and availability states.
- Popular, category, and All filters support direct URLs via `?category=`. The Sides filter draws from the same side product records used by the build-box data; extra cheese and packaging remain build-box-only items.
- The /menu design uses the brand's dark background, an oversized Danfo “The Menu.” heading with a yellow accent, rounded category pills, three-column rounded charcoal food cards, orange naira prices, and yellow ordering and pagination controls. Anton remains the condensed card typeface. Cards stack on phones and use two columns on tablets.
- Menu photos render normally at full opacity on an isolated white image surface; the multiply blend that could darken the food photography has been removed.
- Menu pagination displays at most nine products per page, supports `?page=`, preserves the selected category, resets to page one when filtering, and handles browser back/forward and invalid page numbers. The supplied five menu food photos are attached in product data; category artwork provides provisional fallbacks where available.
- Add to Cart controls save products and selected options in a persisted Zustand cart store. Products with unconfirmed prices or marked unavailable cannot be added.
- The Zustand cart now supports adding and removing product rows, increasing/decreasing quantities, selected options, editable per-item notes, subtotal calculation, total quantity count, and clearing the cart. Matching products/options/notes merge; different selections or notes remain separate. Quantity has a minimum of one, with an explicit Remove control.
- CartDrawer opens as a side drawer on desktop and a full-height sheet on phones. Header cart controls show the live quantity count on desktop and mobile; adding an item opens the drawer. A native modal dialog provides keyboard focus containment, Escape handling, backdrop dismissal, focus restoration, and isolated drawer scrolling.
- Reusable CartItem, CartSummary, and CartContent components power /cart and the drawer. The cart uses dark brand styling and provides empty/loading states, a return to the menu, and checkout within /cart.
- The original `ok-grills-cart-v1` localStorage key is retained. Items, quantities, selected options, and notes survive reloads; drawer visibility and hydration flags are transient. Existing saved carts without notes are preserved. Explicit client hydration keeps server and initial client output consistent.
- Cart logic lives in src/lib/cart.ts and src/store/cart-store.ts, with a small useCart hook connecting calculations to presentation. Catalog data comes through services, and current product prices/option modifiers are resolved from IDs instead of duplicated in localStorage. Removed, unavailable, or changed-option items are flagged and excluded from the priced subtotal.

## Checkout Completed

- /cart now combines editable cart rows and the existing order summary with a delivery form collecting name, phone number, delivery area, full address, preferred delivery time, and optional order notes. React Hook Form uses the independent Zod schema in src/lib/checkout.ts; required fields, phone format/length, and text limits are validated with associated input errors.
- The final action reads CONTINUE ON WHATSAPP. src/lib/whatsapp.ts owns order eligibility, readable message generation, and encoded WhatsApp URL creation. The request includes quantities, product names, option labels, custom-box ingredient quantities per box, item notes, unit/line prices, subtotal, customer information, delivery details, and order notes.
- Delivery cost, availability, and final payment are explicitly confirmed by OK Grills on WhatsApp; no payment is claimed or recorded. Preferred delivery time is a request to be confirmed. The configured recipient remains the user-approved +2348109288279.
- Empty carts, unresolved prices/options, unavailable items, invalid quantities/totals, paused ordering, and invalid recipients cannot continue. The submission reads current store items again after form validation so cart changes cannot generate a stale request. Current catalog prices and option modifiers resolve through the existing cart logic.
- WhatsApp opens in a separate tab; a readable request and fallback CONTINUE ON WHATSAPP link remain on the page if the browser blocks opening. Editing delivery fields or cart contents invalidates the displayed previous handoff. Opening WhatsApp does not claim the message was sent and never clears the cart.
- CartDrawer links to /cart via Review order & delivery. The checkout form loads dynamically when rendered on /cart; drawer/menu views do not load the delivery form. Customer details stay in component state, with no database, payment integration, or customer-detail persistence. Form readiness guards prevent native submissions before validation is active.

## Events Completed

- /events is a Server Component with a large Danfo FEED THE FUNCTION. hero, supplied food photography, dark premium styling, and supporting copy for birthdays, house parties, office functions, weddings, large linkups, and events.
- THE LINKUP, THE FUNCTION, and THE BIG ONE are visual enquiry categories in src/data/event-packages.ts behind getEventPackages(). Prices remain null and no guest capacities are invented. Cards offer optional category selection and tailored quotes; supplied grill-box images illustrate them.
- The React Hook Form + Zod enquiry form collects name, phone, event type, event date, guest count, delivery area, budget, food preferences, and additional notes. The first six fields are required; budget/preferences/notes and package choice are optional. Errors are associated with their inputs, native controls have labels, and the layout stacks on mobile.
- Validation and WhatsApp formatting live separately in src/lib/event-enquiry.ts. Validation rejects past/impossible dates, invalid phone formats, nonpositive/fractional/unsafe guest counts, and unlisted types/packages. Date validation follows Africa/Lagos.
- Submission prepares a reviewable formatted enquiry with an Open WhatsApp link and Copy enquiry fallback. Editing the form clears the previous draft, avoiding a stale handoff. WhatsApp uses the user-approved +2348109288279 in site settings and correctly encodes every enquiry field. Customers review and send the message themselves; the UI never claims it has been sent.
- No database, server submission endpoint, or enquiry persistence was added. Form inputs and submission wait for client validation readiness; a noscript notice explains the requirement. eventEnquiryEnabled controls availability. A missing/invalid recipient suppresses the WhatsApp link while retaining the copyable draft.

## Breakfast and Local Completed

- Two homepage features follow Family Feast: THOUGHT WE ONLY DID GRILLS? / GOOD MORNING. on warm bone/cream, followed by LOCAL. / BUT DIFFERENT. on black with yellow accents. Matching angled section edges connect the dark campaign to breakfast, then return from cream to the darker brand direction.
- A reusable HomeMenuFeature Server Component handles both sections with Danfo campaign headings, existing category photography, three featured product cards, and category links. Desktop uses editorial copy/image columns and a three-card grid; mobile stacks copy, photography, and cards. No additional scroll motion, pinning, or snapping was added.
- Products load through getProductsByCategory(); category images/destinations come from the existing category service. Copy and featured count live in site settings. Product names, descriptions, prices, availability, contents, and options are not duplicated.
- The existing ProductCard powers both grids, preserving options, pricing, availability restrictions, cart feedback, and persisted cart integration. Scoped inherited color variables adapt those same cards to cream or dark surfaces; breakfast uses a deeper orange price color for legibility. /menu styling and cart surfaces retain their existing themes.
- Breakfast currently features Mixed Berries Waffles Box, Mixed Chocolates Waffles Box, and Mixed Berries Pancakes Box. Local features Advanced Abacha, Advanced Local Beans, and Grilled Turkey. Category links expose all eight breakfast and six local products. Selection follows approved service sort order and the count in settings.
- Existing category artwork is reused as provisional photography; individual breakfast/local product photography still needs approval, as already noted under Known Issues.

## Family Feast Completed

- Homepage now features a Family Feast campaign after the grill story: FOR THE WHOLE CREW, oversized stacked Danfo FAMILY / FEAST, the approved ₦125,000 product price, and BRING THE FEAST. Dark charcoal, brand yellow, a red circular accent, restrained framing, and a large bright food photograph create the campaign layout; mobile stacks copy and photography.
- Campaign copy and the product slug live in site settings. Product price and photograph come from getProductBySlug(), using the existing Family Feast Box record rather than duplicated campaign prices or product data.
- BRING THE FEAST adds the approved product to the persisted cart and opens CartDrawer. The small action component waits for cart hydration and respects price/availability; any future required product options direct customers to the menu to select them first.
- FamilyFeast remains a Server Component; FamilyFeastMotion separately uses GSAP ScrollTrigger for a bounded image scale from 0.94 to 1.02 and 20px of headline movement during normal scrolling. Mobile uses only a smaller 0.98-to-1 image reveal. Reduced motion and JavaScript-disabled views remain fully visible and static. The section adds no pinning, snapping, scroll locks, or artificial scroll runway. Motion is scoped and reverted on navigation/preference changes.

## Grill Story Completed

- Homepage now includes PICK IT. / WE GRILL IT. / WE LOAD IT. / YOU DESTROY IT. after category discovery, with a Build your box CTA. Copy, media paths, and destination come from site settings through getSiteSettings(); the brand stamp uses the existing tagline.
- The section is a Server Component with semantic headings and an ordered stage list. A separate small GrillStoryMotion Client Component uses GSAP ScrollTrigger to crossfade four supplied food images in 350ms and highlight the active headline while scrolling forward or backward.
- Desktop uses CSS sticky media beside naturally scrolling stage copy, covering roughly two viewports. There is no ScrollTrigger pin, snap, wheel interception, or scroll locking. Triggers and tweens are scoped to this section and cleaned up on navigation; menu/cart components and the existing smooth-scroll configuration are unchanged.
- Mobile, short desktop windows, reduced motion, and JavaScript-disabled views display each image alongside its own stage in the regular document flow. GSAP matchMedia responds to viewport/preference changes and restores the static fallback. Images are lazy-loaded and optimized; no additional autoplay video was added. Process-specific photography can replace the current supplied food images in settings.

## Build-a-box Completed

- Builder step links match the menu's rounded category pills: Anton uppercase labels, charcoal backgrounds, and a yellow active/hover state. Ingredient prices, review line prices, and desktop/mobile totals match the menu orange (#FF7B38). Step links still navigate to the corresponding selection/review section.
- /build-a-box is a Server Component that loads approved ingredient sections and presentation settings through services. The dark interface has a large Danfo heading and three selection sections: grills, sides, and extras.
- Portion controls update the ingredient total and review automatically. Desktop places selections left and a sticky food preview, ingredient summary, and total right. Mobile stacks selections and review with a fixed bottom total and Add your box button, including safe-area spacing.
- The food preview is clearly labeled serving inspiration; the ingredient list represents actual selections. Small ingredient entrance and quantity animations are isolated in a motion stylesheet and respect reduced motion.
- Pure calculations and validation live in src/lib/build-your-box.ts; useBuildBox connects them to reusable IngredientCard, BoxSummary, and BoxTotal components. Empty boxes, unknown ingredients, invalid quantities, unavailable items, unconfirmed prices, and unsafe totals cannot be ordered.
- Builder-only product records live in src/data/products.ts, with builder sections referencing them. Turkey and sides reuse menu product records. The main menu remains 49 products. Packaging and sweet potatoes have no confirmed price and are not selectable; totals explicitly exclude packaging and delivery.
- Add your box saves section IDs, ingredient IDs, and portion quantities as build-box cart metadata and opens the existing drawer. Matching boxes merge; different ingredient quantities or notes remain separate. Box metadata and notes survive reloads, and cart totals resolve current approved ingredient prices rather than stored price snapshots.

## In Progress

- None.

## Not Started

- Heavy Hitters and remaining homepage sections (grill storytelling, Family Feast, breakfast, and local features are implemented).
- About page.

## Known Issues

- The supplied hero video is about 9.9 MB. It uses `preload="none"`, but autoplay still incurs video transfer; a smaller encoded version would improve mobile loading.
- The files in `public/images/` are currently untracked by Git; include them in a commit before deploying so the video, poster, logo, star, and category images are available there.
- ORDER NOW and the Build Your Own category card point to the implemented /build-a-box route. Header cart controls open the cart drawer; the footer cart link opens /cart.
- Additional product/category and catering photography are still needed. The generated category images are provisional and should be replaced with approved food photography when available. The business WhatsApp number is now configured from the user's supplied contact.
- Menu imagery is provisional: the supplied five grill-box photos are reused across related boxes, and existing category artwork fills other category previews. Individual product photography, including side images, still needs approval. Availability values are local mock data, not live stock status.
- Chicken Crave Box, packaging, and sweet potatoes have unconfirmed prices and remain null in data.

## Important Decisions

- V1 uses local typed data behind async services; no CMS or database.
- menu.md is the approved menu source. Homepage content is not copied into product records.
- The hero shell remains a Server Component; only GSAP entrance motion runs in a small Client Component.
- The supplied video is the primary hero media on all screen sizes when motion is allowed. The 267 KB WebP remains as its poster fallback, is served directly, and uses an explicit media stacking layer.
- V1 checkout will hand orders to WhatsApp after collecting delivery details; no payment gateway.
- Category display labels, image paths, and destinations live in local category data and reach the homepage through the service boundary. The Build Your Own card routes to /build-a-box.
- Menu products, including standalone sides, are defined once under src/data/products.ts; build-box sides reuse those records. The menu remains text-first until approved product photography is available.
- The /menu page is a Server Component. Client behavior is limited to filtering, pagination, and ProductCard cart interactions; no scroll animation was added.
- The menu retains the site's dark branding following the user's correction. The large page heading uses Danfo, matching the homepage brand font. Menu cards preserve product option selection, availability restrictions, and persisted cart behavior.
- Cart persistence stores selections and notes, not catalog snapshots. Item notes are limited to 500 characters and update immediately while keeping IDs stable. Only available, priced products with valid options can be added. /cart checkout generates a WhatsApp order request without clearing the cart or claiming payment/confirmation.

## Verification

- Checkout passed lint, TypeScript, and a production build. scripts/check-checkout.ts was compiled with scripts/tsconfig.cart-checks.json and manually run from .cache/cart-checks/scripts/check-checkout.js. Checks passed for Zod delivery validation, product options/item notes, custom-box metadata, quantities and subtotal, fresh cart edits, changed catalog prices, empty/unpriced/invalid cart rejection, confirmation wording, the approved recipient, and lossless WhatsApp encoding.
- Production /cart returned HTTP 200 with the heading, hydration fallback, checkout settings, recipient, and confirmation notice. The separate checkout client chunk returned HTTP 200 with all requested field labels, the exact CONTINUE ON WHATSAPP action, and the message formatter. /, /menu, /events, and /build-a-box also returned HTTP 200. No WhatsApp message was sent during verification. Populated-cart browser rendering, actual form interaction, popup/fallback behavior, screenshots, and the external WhatsApp handoff remain unverified because no browser is connected.
- /events passed lint, TypeScript, and a production build that prerendered the route. scripts/check-events.ts was compiled through scripts/tsconfig.cart-checks.json and manually run with node .cache/cart-checks/scripts/check-events.js. Checks passed for required fields, phone format/length, whole positive guest counts, invalid/past/leap dates, Lagos midnight rollover, allowed types/packages, optional values, message contents, the approved recipient, and lossless WhatsApp URL encoding (Unicode, ampersands, plus signs, and line breaks).
- Production HTTP checks cover /events with its hero, three quote-only package cards, all nine labeled enquiry fields, recipient settings, and validation-readiness fallback; /, /menu, /cart, and all package photos also returned HTTP 200. Served CSS includes Danfo, responsive package/form grids, and dark brand colors. No database or external message was used in testing. Browser form interaction, screenshots, clipboard access, and the actual WhatsApp app handoff remain unverified because no browser is connected.
- Breakfast/local homepage features passed lint, TypeScript, and a production build. Production / returned HTTP 200 with both headings in order, three shared product cards per section, approved catalog prices, Local Beans option controls, and category links. Breakfast/local menu links returned HTTP 200 with eight/six products; /cart and both category WebP assets returned HTTP 200. Served CSS confirms the light color scheme, angled cream-to-dark transitions, Danfo headings, and deeper orange price token. Source scans found no direct data imports or explicit any in the new component. Desktop/mobile screenshots and actual cart/option clicks remain unverified because no browser is connected.
- Family Feast passed lint, TypeScript, and a production build. A manual cart model check passed for the approved ₦125,000 price, product addition, repeated-add merging, ₦250,000 subtotal for two boxes, and reload persistence. Production route/asset checks cover the campaign hierarchy, product-bound CTA, image/reveal targets, /menu, /cart, and the supplied food photograph; served CSS includes the Danfo font, full-photo containment, brand accents, and reduced-motion fallback. Browser visual inspection, scroll reveal, mobile rendering, and actual CTA clicks remain unverified because no browser is connected.
- Sticky grill story passed lint, TypeScript, and a production build. Production / returned HTTP 200 with the four requested headings in order, four stage/media records, and the unenhanced static server fallback. /menu, /cart, /build-a-box, and all four story image URLs returned HTTP 200. Served CSS includes desktop sticky media, motion/viewport gating, and the Danfo font. Source inspection confirms scoped trigger cleanup and no pinning, snapping, global trigger deletion, or scroll interception. Scroll transitions, preference changes, mobile layout, and cart interaction during scrolling remain unverified in a browser because no browser is connected.
- Builder tab/price styling update passed lint, TypeScript, and a production build. /build-a-box returned HTTP 200 with all four section links and the initial active step; served CSS contained the menu-matched pill radius, Anton font variable, and #FF7B38 prices. Visual browser inspection remains unavailable as noted above.
- npm run lint passed.
- TypeScript check passed: tsc --noEmit --incremental false.
- Production build passed and prerendered /.
- Production / route returned HTTP 200 with all requested copy, CTAs, and ticker terms.
- Supplied logo and hero poster URLs returned HTTP 200.
- Source scan found no direct src/data imports from routes or components.
- The redesigned hero passed lint, TypeScript, and a production build; desktop and mobile screenshots were inspected with reduced motion enabled.
- The hero image visibility fix passed lint, TypeScript, and a production build. The production page and direct WebP URL returned HTTP 200, and a browser screenshot confirmed the image is visible.
- Danfo headline change passed lint, TypeScript, and a production build. The production homepage returned HTTP 200, emitted the Danfo font asset, and was visually inspected at desktop and narrow mobile sizes.
- Hero video change passed lint, TypeScript, and a production build. The production homepage and MP4 URL returned HTTP 200; the MP4 was served as `video/mp4` and a browser capture confirmed the hero layout.
- Centered logo navigation passed lint, TypeScript, and a production build. The production homepage returned HTTP 200, had no visible header wordmark, and desktop and narrow mobile renders were inspected.
- Spinning star addition passed lint, TypeScript, and a production build. The production homepage and star image returned HTTP 200, and desktop and narrow mobile renders were inspected with reduced motion enabled.
- Category discovery passed lint, TypeScript, and a production build. The production homepage returned HTTP 200 with the headline and all six category labels; each category WebP returned HTTP 200 as `image/webp`. Visual browser inspection was unavailable because no browser backend was connected.
- The /menu implementation passed lint, TypeScript, and a production build. Production HTTP checks returned 200 for /menu and category deep links, with 49 All products, 1 Popular product, 23 Grill Boxes, and 8 Sides. All eight filters, price-pending text, and Add to Cart controls appeared in the rendered route. Direct checks passed for cart item merging, required option validation, and option price modifiers. Browser interaction and visual inspection were unavailable because no browser backend was connected.

- The reference menu redesign passed lint, TypeScript, and a production build. Production HTTP checks returned 200 for the menu, category links, page links, and invalid-page inputs. All shows nine products per page and four on page six; Grill Boxes shows five on page three; Burgers shows one and Sides shows eight without redundant pagination. Browser interaction and screenshot inspection remain unverified because no browser backend is connected.

- The dark menu correction passed lint, TypeScript, and a production build. /menu and page two returned HTTP 200 with nine cards and the new heading. Served CSS confirmed the dark background, Danfo heading font, and normal image blending; the optimized food image returned HTTP 200. Visual browser inspection remains unavailable.

- Cart checks were manually compiled with `tsc -p scripts/tsconfig.cart-checks.json` and run with `node .cache/cart-checks/scripts/check-cart.js`. They passed for add/merge behavior, option and note separation, quantity bounds, unit count, positive/negative option modifiers, changed catalog prices, removal, clear, reload persistence, original saved-cart compatibility, changed/removed products, caller mutation isolation, and malformed storage.
- The completed cart passed lint, TypeScript, and a production build that prerendered /cart. Production HTTP checks returned 200 for /, /menu, and /cart with the dialog cart trigger. /menu still rendered nine product cards, and /cart rendered its heading and hydration loading state. Served cart CSS included the desktop drawer and full-height mobile sheet. Source scans found no direct data imports or explicit any in the new cart implementation. Browser interaction, focus behavior, and screenshots remain unverified because no browser backend is connected.

- Build-a-box passed lint, tsc --noEmit --incremental false, and a production build that prerendered /build-a-box. Manual scripts/check-build-box.ts checks passed for approved pricing, live totals, portion removal, invalid/empty/unpriced validation, cart metadata, identical-box merging, changed catalog prices, and reload persistence. Existing cart checks passed again. Both scripts were compiled with scripts/tsconfig.cart-checks.json and run from .cache/cart-checks/scripts/.
- Production route/asset and served CSS checks cover /build-a-box, /cart, /menu, the preview image, sticky desktop positioning, fixed mobile total, reduced motion, and the Danfo font. At this implementation stage browser interaction was unavailable; the later quality review below adds browser evidence. Checkout is now implemented.

## UX and Quality Review — 2026-10-06

### Verified fixes

- Removed the footer About link because /about does not exist. Header/footer navigation links now have larger touch targets. Added a branded, semantic 404 with working menu/home recovery links; /cart is noindex while retaining followable navigation.
- Reproduced a cart exception when localStorage rejects writes. The store now catches synchronous storage failures, keeps the session cart usable, and exposes a customer notice that reload persistence may be unavailable. Existing persistence and legacy-cart behavior remain intact. Added a regression check for blocked reads/writes.
- Hero entrance and ticker respond when reduced-motion preference changes. A keyboard-accessible Pause video & ticker control stops both continuous homepage media effects. Video also pauses outside the viewport, on a hidden tab, or with reduced motion. Rejected autoplay promises are handled.
- At 1440×600 the builder summary measured 711px tall with its CTA below the viewport. Desktop windows at or below 800px tall now use a normally scrolling summary; taller desktop windows retain sticky behavior. Mobile retains its bottom total/CTA and safe-area spacing.
- Changed the small red builder stamp's text from white to dark ink: calculated contrast increased from 4.04:1 to 4.82:1, meeting the 4.5:1 threshold for this text size.
- Isolated browser profiles, screenshots, and temporary review scripts live under ignored .cache/ux-review/; they are excluded from lint. No menu data, prices, content backend, payment behavior, or functioning section design was replaced.

### Review evidence

- Production HTTP checks returned 200 for /, /menu, /build-a-box, /cart, and /events; an unknown destination returned 404. Titles/descriptions are present, /cart emits noindex, and all source-data image/video paths exist. Menu checks confirmed nine cards on page one, four on page six, one burger, eight sides, and safe fallback for invalid filter/page values.
- The connector browser remained unavailable. An approved isolated headless Chrome session provided local browser testing without using the user's personal browser profile.
- Reviewed five routes at 320, 390, 768, 1024, and 1440px widths: 25 combinations, one h1 per route, no measured document overflow, no failed completed images, and zero page console errors/runtime exceptions. Inspected homepage/menu mobile and tablet screenshots and builder/events mobile and desktop screenshots. Screenshots and JSON evidence are in .cache/ux-review/.
- Browser ordering checks passed for product addition, required product options, drawer focus containment and Escape, editable notes, quantity increase, notes surviving reload, checkout required-field errors, and formatted WhatsApp URL generation to the approved recipient. window.open was intercepted for checkout verification; no external message was sent.
- Browser checks passed for category filtering, pagination and browser history, mobile menu dismissal/focus restoration, empty-box prevention, grill/side additions, custom-box cart metadata, normal desktop sticky positioning, event validation, encoded enquiry content/recipient, draft clearing after edits, and keyboard skip-link focus.
- Playback pause and preference changes passed in the browser. Eight initial layout-shift samples across homepage/menu/builder/events at 390 and 1440px measured zero under local, warmed-cache conditions. This is not a cold-network performance score or a guarantee of field CLS.
- Manually compiled and ran cart, builder, checkout, and event checks: all passed, including storage-failure recovery, persistence, changed catalog prices, invalid/empty selections, Zod validation, order/enquiry formatting, and lossless WhatsApp encoding. No duplicate menu data or direct data imports were found in UI/routes; business and animation logic remain separate.
- Final lint, standalone tsc --noEmit --incremental false, production build, and diff whitespace checks passed. Post-fix browser verification at 1440×600 confirms a static builder summary and a CTA reachable within the viewport through normal scrolling. Populated checkout at 390, 768, and 1440px contains all six fields without horizontal overflow. Final homepage/builder/cart HTTP checks passed. The existing ignored parent lockfile warning is informational.

### Launch checklist

- [ ] Include the currently untracked public assets and implementation files in the deployment commit.
- [ ] Approve provisional food photography and confirm catalog prices/availability; unconfirmed prices must stay unavailable.
- [ ] Supply a smaller encoding of the 9.9 MB hero video and verify cold loading on a slow mobile connection.
- [ ] Configure the approved production origin, then verify canonical URLs, social preview metadata, and sitemap on that domain. No domain was invented in this review.
- [ ] Smoke-test on real iPhone/Safari and Android devices, including keyboard/zoom, delivery fields, and WhatsApp app handoff. Local Chromium passed; actual external handoff and real-device behavior are not verified.

## Mobile Hero Update — 2026-10-08

- Mobile hero copy now aligns to the bottom of the available hero content area above the playback control and ticker. The headline increases from 12.8vw to 17vw, with line-height reduced from 0.95 to 0.65; responsive bounds keep the longest line within the mobile layout.
- The mobile ticker SVG minimum width increases from 750px to 1050px, enlarging both lettering and ribbon without changing the shared ticker component or animation logic. The lower mobile image overlay is darker for readable bottom-aligned copy.
- Lint, standalone TypeScript validation, production build, and diff whitespace checks passed. The live homepage returned HTTP 200 and its served CSS contains the updated headline/ticker sizes. Mobile screenshots and real-device visual verification remain outstanding for this adjustment.

## Mobile Hero Video Blend — 2026-10-08

- Removed the mobile media's 35% top offset so video and poster cover the full hero. A gradual multi-stop burgundy overlay blends the header into the food imagery and retains lower-copy contrast, replacing the visible media boundary.
- Lint and standalone TypeScript checks passed. The affected homepage returned HTTP 200 and served CSS includes the new gradient. Screenshot and real-device verification of this fade remain outstanding.

## Western Decorative Accents — 2026-10-08

- Saved the supplied transparent bullet-hole PNG as public/images/bullet-hole.png. A reusable server-rendered BulletHole component adds three restrained static marks: the hero's open upper space, the category section's upper margin, and the Family Feast lower border.
- Accents scale responsively, use varied rotations and subdued opacity, are hidden from assistive technology, and cannot intercept pointer interactions. No business data or animation behavior changed.
- Lint, standalone TypeScript validation, and diff whitespace checks passed. Homepage and asset returned HTTP 200; rendered HTML includes exactly three decorative marks. Browser screenshots remain outstanding.

## Revised Bullet-hole Placements — 2026-10-08

- Replaced the previous bullet-hole asset with a transparent cutout of the newly supplied silver design. Built-in image generation removed the supplied image's baked checkerboard background; the project asset remains public/images/bullet-hole.png.
- Removed the hero, category upper-margin, and Family Feast lower-border placements. Bullet holes now replace the Local photo's lower-left diamond, the Family Feast photo's corner star, and the grill-story yellow tagline badge at the upper-left of its sticky photo. The same upper-left decoration appears on fallback stage photos for mobile/reduced-motion views.
- The menu heading's yellow period is now a small inline bullet-hole accent. Removed the unused tagline prop from GrillStory and its homepage invocation; business content and ordering behavior remain unchanged.
- Lint and standalone TypeScript checks passed. Homepage, /menu, and the replacement asset returned HTTP 200; rendered HTML confirms the new photo decorations and menu heading accent. Screenshot/real-device verification remains outstanding.

## Brand Favicon — 2026-10-08

- Replaced the starter favicon with the existing OK Grills logo on a bone background, encoded as a multi-size ICO (16, 32, and 48px). Added a 180px Apple touch icon using the same logo. Next.js file metadata automatically emits both icon links.
- Lint and standalone TypeScript checks passed. Homepage returned HTTP 200 with favicon and Apple touch links; both icon routes returned HTTP 200 with their expected image types. ICO entries were checked for all three sizes. Browser tab/home-screen appearance remains unverified.

## Mobile Ticker and Navigation — 2026-10-08

- Straight TextLoop tickers now use a dedicated LineTicker component with two equal, naturally sized HTML text groups. Removed SVG text-length compression from the hero ticker, eliminating cramped/overlapping lettering. Travel distance is exactly one group; ResizeObserver adjusts duration for the configured speed. Existing playback pause, hover pause, reverse direction, and reduced-motion behavior are preserved. Mobile ticker remains large with a 32px font and 80px minimum height.
- Mobile navigation is a native modal dialog with a full-height, 80%-width right drawer and dark backdrop. Tapping outside, pressing Escape, selecting a link, or using Close dismisses it; desktop resizing closes it. Native focus containment, restored trigger focus, body scroll locking, safe-area padding, and independent panel scrolling are included. Links enter from the left with staggered subtle horizontal overshoot; reduced motion disables the slides/bounce. Your cart links directly to /cart.
- Lint and standalone TypeScript checks passed without warnings. Homepage and /menu returned HTTP 200. An isolated headless Chrome test at 390x844 verified a 312px-wide, 844px-tall panel, focus inside the open dialog, body scroll locking, backdrop dismissal with trigger focus restoration, and Escape dismissal. Ticker groups have equal widths and zero overlap/gap at their boundary; page has no horizontal overflow. Real iPhone/Safari verification remains outstanding. The ignored browser check is .cache/ux-review/check-mobile-menu.mts.

## Smaller Mobile Logo — 2026-10-08

- Shared header logo now uses explicit responsive CSS: 64px on screens below 640px, with a 112px rotating star behind it. Larger screens retain the 96px logo and 176px star.
- Lint and standalone TypeScript checks passed. Homepage and /menu returned HTTP 200. Isolated Chrome at 390px confirmed the 64px rendered logo, 112px computed star dimensions, and no document overflow. Real-device appearance remains unverified.

## Sticky Navigation — 2026-10-08

- Shared header now sticks at the top on every route. Homepage retains the header overlay via a negative margin instead of absolute positioning, with a dark 92%-opaque background for readability while scrolling. Anchor scroll padding accounts for the header height on mobile and desktop.
- Lint and standalone TypeScript checks passed. Isolated Chrome checks on / and /menu at 390px and 1440px confirmed sticky positioning, a header top of 0 after scrolling 700px, and no horizontal overflow. Real-device Safari testing remains outstanding.

## Delayed Navbar Background — 2026-10-08

- Homepage sticky navbar stays transparent through the hero and category sections. A small HeaderScrollState client component adds the dark background when the grill-story section reaches the header, reversing when scrolling back above that boundary. Passive scroll updates are coalesced with requestAnimationFrame; resize/layout changes and route cleanup are handled. Header remains server-rendered; other routes retain their dark background.
- Lint and standalone TypeScript checks passed. Isolated Chrome at 390px and 1440px confirmed transparent homepage entry, dark background at grill story, transparent restoration at the top, and dark /menu header, with no horizontal overflow. Real-device Safari verification remains outstanding.

## Hide-on-scroll Navigation — 2026-10-08

- Shared navbar hides while scrolling down past its own height and reappears when scrolling up or returning near the top. An 8px scroll threshold prevents small-motion flicker. Keyboard focus and open dialogs keep navigation visible; route changes reset visibility. Homepage delayed background still uses the grill-story boundary, measured independently of the header transform. Existing reduced-motion rules suppress transition motion.
- Lint and standalone TypeScript checks passed. Isolated Chrome checks on / and /menu at 390px and 1440px confirmed full upward concealment on down-scroll, return to top:0 on up-scroll, visible navigation at page top, and no horizontal overflow. Real-device Safari testing remains outstanding.

## Navbar Background After Hero — 2026-10-08

- Homepage navbar background now turns dark when the end of the hero reaches the navbar, replacing the previous grill-story threshold. Hide-on-scroll behavior is preserved; returning into the hero restores transparency.
- Lint and standalone TypeScript checks passed. Isolated Chrome at 390px and 1440px verified transparency at the top, dark background at the hero boundary, and transparent restoration when returning to the top. /menu retains its dark header. Real-device Safari verification remains outstanding.

## Next Task

Heavy Hitters remains the next homepage section. About and remaining homepage sections can follow when requested; V1 ordering now hands requests to WhatsApp for confirmation.

