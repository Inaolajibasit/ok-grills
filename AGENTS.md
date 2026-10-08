# Agent Instructions

Before writing code:

1. Read PROJECT_CONTEXT.md.
2. Read CURRENT_STATE.md.
3. Inspect relevant existing files.
4. Understand existing components before creating replacements.

## Coding

- TypeScript only.
- Avoid `any`.
- Use reusable components.
- Prefer Server Components unless client behavior is required.
- Keep Client Components small.
- Do not duplicate menu data.
- Do not hardcode business data that belongs in CMS/settings.
- Keep animation code separate from content/data logic.
- Keep business logic outside UI components.
- Use semantic HTML.
- Preserve accessibility.

## Design

- Brand primary: #FCEE23
- Brand secondary: #F5290A
- Dark-dominant UI.
- Bold typography.
- Mild Wild West motifs.
- Do not turn the design into cowboy cosplay.
- Food photography is the visual focus.
- Keep menu/cart clean.

## Workflow

After completing a meaningful task:

1. Run lint.
2. Run TypeScript checks.
3. Test the affected route.
4. Update CURRENT_STATE.md.
5. State exactly what changed.
6. State anything still incomplete.

Do not make unrelated refactors without permission.

## Data Architecture

The project intentionally uses local TypeScript data for V1.

All product, category, settings and event data belongs under:

src/data/

Components must not import data files directly.

Access data through:

src/services/

Example:

Correct:

getFeaturedProducts()

Incorrect:

import { products } from "@/data/products";

The service boundary exists so the project can migrate to Sanity or another CMS later without rewriting the UI.

Do not add Sanity, Contentful, Supabase or another content backend unless explicitly requested.

Do not hardcode menu prices or product descriptions inside components.