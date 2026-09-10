# Design System — CaviarBakhoor.com

Goes in `docs/design-system.md`.

---

## The idea

Every incense and oud brand sells smoke. Smoke is the obvious move and it looks like
everyone else. What no one else has is **a black sphere with 24-karat gold suspended
inside it, served from a round tin with a gold spoon**.

So the pearl is the form language of this site. Round product cards, circular crops,
the perforated grid of the mesh disc as texture. Everything else stays quiet so that
one idea carries.

Reference registers: **Le Sablier** for commerce behaviour (sticky buy bar, narrative
PDP), **Identiscents** for editorial architecture (uppercase display headlines,
keyword marquee, generous negative space). Same register, our own execution — this is
not a copy of either.

The canvas is light. The product is what goes dark: full-bleed `--ash` photography
panels cut into the paper page, and that contrast is the rhythm of every page.

---

## Colour

The page is light. Product photography is what goes dark.

```css
--paper:     #EFEEEB;  /* the page. cool neutral, not a warm bone */
--ink:       #101012;  /* text on paper */
--rule:      #D6D4CF;  /* hairlines, dividers, input borders */

--ash:       #08070A;  /* full-bleed photography panels and the footer ONLY */

--gold-deep: #8A6E38;  /* the only gold */

--bone:      #EFEEEB;  /* text on --ash panels */
--smoke:     rgb(16 16 18 / 0.6);  /* labels, eyebrows, captions, meta */
```

Per-fragrance accent — each PDP tints its own details. Colour-picked from the lids in
`public/images/collection-tins-dark.jpg`. That shot is underexposed on black, so three
of the four are near-black and read almost identically on `--paper`.

```css
--noir:    #0C0301;  /* the black lid */
--ward:    #1E0102;  /* the burgundy lid */
--zafran:  #0C1E15;  /* the green lid — the tin is green, not saffron */
--amber:   #B5B9BB;  /* the pearl-white lid */
```

**Rules.**

- **`--ash` is not the canvas.** It is for full-bleed photography panels and the
  footer. Nothing else. Applying `.on-ash` inverts text to `--bone`, lifts `--rule`
  to 18% white and drops `--smoke` to 60% white.
- **Gold is rare.** `--gold-deep` is the only gold, used at most once per section —
  a rule, a single mark. Never a gradient wash, never a border on every card.
- **Gold never appears on a label or an eyebrow.** Those are `--ink` at 60%
  (`--smoke`).

---

## Type

**Bodoni Moda** (variable, self-hosted via `next/font/local`) — display, roman and
italic. **Switzer** (Fontshare, self-hosted) — subheads, marquee, body, labels, UI.

Display sizing is pure viewport scaling: no clamp, no min, no max, so the composition
holds its proportions at every width above the mobile break.

| Token | Spec |
|---|---|
| `display-xl` | Bodoni Moda, 6.48vw, wght 700, opsz 6, uppercase, leading 1, tracking 0 |
| `display-italic` | Bodoni Moda Italic, same scale, wght 700, opsz 6 |
| `display-sub` | Switzer Black, 1.55vw, uppercase, tracking 0, leading 1 |
| `eyebrow` | Switzer Regular, 0.85vw, uppercase, tracking 0.02em, `--smoke` |
| `marquee` | Switzer Black, 1.5rem, uppercase |
| `counter-xl` | Switzer Black Italic, 0.55× the Bodoni it sits beside, tracking -0.01em |
| `counter-sm` | Switzer Black, 0.14× the Bodoni, uppercase, tracking 0.06em |
| `fragrance` | Bodoni Moda Italic, clamp(2rem, 4vw, 3.5rem), wght 700, opsz 6 |
| `body` | Switzer Regular, 1rem/1.6, max 68ch |
| `meta` | Switzer Medium, 0.8125rem, uppercase, tracking 0.08em |

**Below 768px** the vw tokens take readable floors: `display-xl` becomes 13vw,
`display-sub` 0.875rem, `eyebrow` 0.75rem. Without these, 6.48vw is 24px on a phone
and the two subordinate tokens land near 5px.

**Keep opsz low.** Bodoni Moda renders its hairlines sub-pixel at high optical sizes
and they anti-alias into ghost outlines on A, K, H, E, I, M and N. Measured: wght 700
at opsz 6 is solid; the same weight at opsz 48 and 96 ghosts. Weight, not opsz, is the
lever for display presence.

**Uppercase is a display treatment, not a label default.** The display and its caps
subhead are uppercase because the type is doing compositional work. Do not put a
tracked-out uppercase eyebrow above every heading — use one only where it carries real
information (a step number, a fragrance family).

---

## The page opener

Every page opens the same way. This is the standard pattern, not a home-page special.

```
eyebrow            Switzer Regular caps, --smoke
display headline   Bodoni Moda uppercase, one line per array entry
gold rule          the section's single --gold-deep element
caps subhead       Switzer Black
marquee            category keywords, full-bleed, hairline top and bottom
dark panel         full-bleed --ash photography, caption bottom-left
```

The rhythm is the point: light page, then the photograph goes dark and full-bleed.

---

## Layout

Left-aligned throughout. Centred type is the default for luxury sites and it makes
everything feel like a fragrance advert from 2012; left alignment with big negative
space to the right feels edited.

```
Container    max 1440px, 24px gutter mobile / 64px desktop
Grid         12 col desktop, 6 col tablet, 4 col mobile, 24px gap
Rhythm       section padding 96px mobile / 160px desktop
Radius       pill (9999px) for buttons and tins. 0 for everything else.
             No 8px-radius-on-everything.
```

### The pearl grid

The collection is four **circles**, not four rectangles. Open tins shot from directly
overhead, cropped to a circle, on the paper canvas. Desktop: 2×2 with generous
space. Mobile: single column, each circle at 78vw.

```
   ┌──────────── COLLECTION ────────────┐
   │                                    │
   │      ( ● )            ( ● )        │
   │      Noir            Ward Baccarat │
   │      Bodoni italic    Bodoni italic │
   │      ₹—                ₹—          │
   │                                    │
   │      ( ● )            ( ● )        │
   │   Imperial Zafran    Amber Blanc   │
   │                                    │
   └────────────────────────────────────┘
```

### Mesh texture

The gold mesh disc in the box has a fine perforated grid. Reproduce it as a CSS
`radial-gradient` dot pattern at 3px spacing, `--gold-deep` at 6% opacity, used for
section dividers and the footer field. It is our texture because it is literally in
the box.
Never use it behind body text.

---

## Motion

Spend the motion budget in one place. Performance is a stated client priority and
fade-up-on-every-section is both slow and the most obvious generated-page tell.

**The one moment: the hero.** On load, macro pearls settle into the frame and the
headline resolves. Runs once. Around 1600ms total. After that the page is calm.

Everywhere else, motion answers an action — a drawer opening, an accordion expanding,
an item entering the cart. Those are welcome because they show what changed.

```css
--ease:      cubic-bezier(0.16, 1, 0.3, 1);
--dur-fast:  180ms;   /* hover, focus */
--dur-base:  420ms;   /* accordions, drawers */
--dur-slow:  900ms;   /* the hero only */
```

Permitted, and that's the list:

- Hero pearl settle — once, on load
- Sticky buy bar sliding in past the fold on PDP
- Keyword marquee — CSS transform, 45s linear infinite, category terms only, paused on
  hover and under reduced motion
- Accordion expand on PDP
- Cart drawer
- Image crossfade on product thumbnail change

Not permitted: parallax on every image, hover-lift on every card, counters, section
reveals as a blanket rule, anything above 1200ms outside the hero.

Under `prefers-reduced-motion: reduce`, all of the above becomes an instant state
change. The marquee stops. The hero renders in its final position.

---

## Components to build first

Build these before any page. Every section inherits them.

Built, in `src/components/ui/`:

```
Container        max width, gutters
Section          vertical rhythm; `dark` variant switches to --ash
Eyebrow          Switzer Regular caps, --smoke
DisplayHeadline  takes lines: string[], one per line
CapsSubhead      Switzer Black caps
Marquee          takes items: string[], CSS-only, pauses on hover + reduced motion
DarkPanel        full-bleed next/image, explicit dimensions
```

Still to build:

```
FragranceCard  circular crop, Bodoni italic name, price
StickyBuyBar   PDP. thumbnail, name, price, add to cart
Accordion      PDP. story / notes / ritual / details
NoteList       top / heart / base
StepSequence   the four ritual steps — numbered, because it IS a sequence
EnquiryForm    B2B. single submit handler
```

---

## Accessibility floor

Non-negotiable, not a phase 2 item.

- Measured against the real tokens: ink on paper is 16.4:1, smoke on paper is 4.7:1,
  bone on ash is 17.3:1.
- **`--gold-deep` on paper is 4.14:1.** That is below the 4.5:1 body threshold — it
  passes for large type and UI only. Never set body copy in gold. It is 4.18:1 on
  `--ash`, with the same restriction.
- Visible focus ring: 2px `--gold-deep`, 2px offset. Never `outline: none`.
- Every tin image gets a real alt describing the fragrance, not "product image".
- Full keyboard path through nav, accordions, cart, form.
- Form errors sit next to their field and say what to fix.
