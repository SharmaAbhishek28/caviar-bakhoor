# CaviarBakhoor.com

Frontend for **Elixir Signature Scents — Caviar Bakhoor**. Built to be handed to a
Shopify developer who will wire it to a real store. Read this file before every task.

## What this is

Two audiences, one site.

- **D2C** — sell four fragrances to someone who has never heard of this product category.
- **B2B** — convince a perfume house, hotel group or retailer that Elixir can
  manufacture Caviar Bakhoor for them.

The site's real job is **category creation**. Four SKUs are the proof, not the point.

## Naming — do not mix these up

| Term | What it means | Where it appears |
|---|---|---|
| Caviar Bakhoor | The **category** and the **product line**. Both. | SEO, education, headlines, domain, packaging, product pages |
| Elixir Signature Scents | The **house** | Brand mark, About, B2B |

**Caviar de Parfum is retired.** The client collapsed the two names into one on
2026-09-17 (BAKHOOR WEBSITE.pdf): "NO CAVIAR DE PARFUM CHANGE TO CAVIAR BAKHOOR".
Do not reintroduce it. Likewise "Encapsulated Fragrance" is now **Encapsulated
Technology**.

The four fragrances are **Noir**, **Ward Baccarat**, **Imperial Zafran**, **Amber Blanc**.

## Stack

- Next.js (App Router) — SSR is non-negotiable, the whole SEO goal depends on it
- TypeScript, strict
- Tailwind v4, tokens defined in `app/globals.css` as CSS custom properties
- GSAP + ScrollTrigger for scroll-driven motion
- Lenis for smooth scroll
- Fonts self-hosted via `next/font/local` — Switzer (Fontshare) and Bodoni Moda
- Deploys to Vercel

## Handover rules — these matter more than they look

A different developer connects this to Shopify later. Build so that swap is one file.

- **All product data lives in `src/data/products.ts`** and mirrors the Shopify product
  shape: `handle`, `title`, `price`, `images`, `description`, metafield-style extras.
  No product data hardcoded into components, ever.
- Components take props. A product card receives a `Product`, it does not import one.
- Anything that will become a Shopify metaobject (collaborations, ritual steps,
  fragrance notes) lives in `src/data/` as typed arrays, not JSX.
- Forms post to a single `src/lib/submitEnquiry.ts` stub. One function to replace.
- No client-side data fetching for anything that should be server-rendered.

## Content rules

- **Never invent factual claims.** Not about the facility, certifications, years in
  business, or client names.
- Real copy is in `docs/content.md`, plus the client's own `BAKHOOR WEBSITE.pdf`
  (2026-09-17), which supersedes it where the two disagree. Use both verbatim.
- **Confirmed by the client in that PDF**, so these may now be stated: the
  encapsulation technology is **patent-pending**; the fragrance descriptions and
  their oud origins (aged Assamese, aged Cambodian) are final, not proposals.
- Anything marked `[CONFIRM]` is awaiting the client. Leave the marker visible in the
  UI during development so it cannot ship by accident. Do not write around it with
  something plausible.
- No lorem ipsum anywhere.
- Sentence case for body and buttons. Uppercase is a deliberate display treatment,
  not a default for labels.

## Design non-negotiables

Full system in `docs/design-system.md`. The short version:

- **Light canvas.** The page is `--paper` (#EFEEEB). `--ash` (#08070A) is only for
  full-bleed photography panels and the footer — never the page background. The
  product is what goes dark, and that contrast is the rhythm.
- The **pearl** is the hero form. Round product cards, circular crops, the mesh-disc
  grid as texture. This is the one bold idea — protect it.
- **Display is Bodoni Moda** — 6.48vw, wght 700, opsz 6, uppercase, leading 1,
  tracking 0. Keep opsz low: high values render the hairlines sub-pixel and they ghost.
  Switzer Black for caps subheads and the marquee; Switzer Regular for body and
  eyebrows. Gambetta is gone.
- **Gold is rare.** `--gold-deep` is the only gold, at most once per section. Never on
  a label or an eyebrow — those are `--ink` at 60%. Never body copy: it is 4.14:1.
- **Every page opens the same way:** eyebrow → display headline → caps subhead →
  marquee → dark full-bleed panel. Use the primitives in `src/components/ui/`.
- **One orchestrated motion moment** — the hero. Elsewhere, motion answers an action
  (opening, expanding, adding to cart). Do not put a fade-and-slide-up on every
  section; it is slow and it looks generated.
- Mobile first. Every section is built at 375px before it is built at 1440px.

## Performance budget

Hard limits. If a change breaks one of these, the change is wrong.

- LCP under 2.5s on 4G
- Hero video under 3MB, with a poster frame, `muted playsinline preload="none"`
- No CLS from images — every `next/image` has explicit dimensions
- No canvas, no WebGL, no 3D engine
- `prefers-reduced-motion` disables all non-essential motion

## Pages — the whole scope

Nothing outside this list ships in phase 1.

1. `/` — Home
2. `/innovation` — The Innovation. Standalone and indexable. Owns "what is caviar bakhoor"
3. `/ritual` — How It Works. The four-step ritual
4. `/collection` — Four products. No filters
5. `/products/[handle]` — PDP ×4
6. `/for-business` — B2B landing + enquiry form
7. `/collaborations` — The four brand case studies
8. `/about` — Elixir the house

**Explicitly out of scope:** configurators, customer accounts, wholesale pricing
tiers, 3D, blog, multi-language, CRM integrations.

## Build order

Do not skip ahead. Commit after each step.

1. Tokens and fonts in `globals.css`
2. Layout primitives — `Section`, `Container`, `Grid`
3. Motion primitives — `Reveal`, `Marquee`, `StickyBuyBar`, `PearlHero`
4. Header, footer, mobile nav
5. Home, section by section
6. PDP, then collection
7. Innovation, ritual
8. B2B, collaborations, about
9. SEO — metadata, JSON-LD, sitemap
10. QA — Lighthouse, keyboard, reduced motion, 375px

## Working style

- Use Plan Mode before any section. Show the plan, wait, then build.
- One section per commit.
- Screenshot and review your own work before saying a section is done.
- If a requirement here conflicts with something asked in chat, say so rather than
  silently picking one.