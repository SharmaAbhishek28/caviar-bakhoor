# Homepage — CaviarBakhoor.com

Goes in `docs/homepage.md`. Supersedes the Home section of `docs/content.md`.

Build **one section per prompt**, in order. Each section is a component in
`src/components/home/`. The page composes them in `app/page.tsx`.

Reference captures for every behaviour are in `docs/reference/` — look at them
before building each section. When the spec and a capture disagree on behaviour,
the capture wins. When they disagree on words or images, this file wins.

---

## Global behaviours — build these first

### Custom cursor
- Default cursor hidden (`cursor: none` on body). Replaced by a 14px filled circle,
  `--ink`, `mix-blend-mode: difference` so it inverts over dark panels.
- Follows the pointer with a short lerp (0.15) so it trails slightly.
- Over any link, button or CTA bar: scales to 40px, still filled.
- Hidden entirely on touch devices (`@media (hover: none)`).

### Header
- Wordmark top-left: `/images/brand/elixir-wordmark.svg` (dark). Fixed.
- Top-right, fixed: a rounded square (44px, `--paper` at 90% opacity, no border)
  containing two horizontal lines — the hamburger. Next to it, `BAG (0)` in
  Switzer Medium meta caps. Identiscents has no cart; we need one.
- No inline nav. Everything is behind the hamburger.

### Menu
- Clicking the hamburger slides a white panel in from the right: 420px wide on
  desktop, full-width on mobile. 420ms, expo-out. The page behind stays visible
  and dims to 40%.
- Close X top-right of the panel.
- Nav items centred, stacked, Switzer Black caps, ~2.6rem, generous leading:
  HOME · COLLECTION · THE RITUAL · FOR BUSINESS · ABOUT · CONTACT
- Items fade-and-rise in with 40ms stagger once the panel lands.

### Sticky side labels
Every section from 02 onward has a pair of labels — one at the left edge with `›`
before it, one at the right edge with `‹` after it — vertically centred in the
viewport, `position: sticky`, Switzer Black caps 0.875rem. They appear when the
section enters and fade out as it leaves. The label text is per section and is
listed below.

### Section stacking
Sections 02–08 stack: each is `position: sticky; top: 0` with increasing z-index,
so the next section slides **up over** the previous one. A 1px `--ink` hairline
runs along the top edge of each incoming section so the overlap is visible.
Exception: section 05 (Ritual) sits *beneath* section 04 — see its notes.

### Body copy
Switzer Regular, max 68ch, `--ink`. No random bolding of individual words.
Bold only where it carries meaning (a product name, a number).

---

## 01 — Hero

**Label:** none. The hero has no side labels.

**Layout**
- Full viewport, full-bleed. `<video autoplay muted loop playsinline preload="none" poster>`.
- Caption bottom-centre, ~8vh from the bottom: Switzer Black caps, white, ~2.2rem,
  centred, max two lines. Subtle text-shadow so it holds on light frames.
- Header sits over it. Nothing else.

**Copy**
> HELD IN A PEARL. RELEASED BY HEAT.

**Assets**
- `[CONFIRM]` which of the two source videos is usable. Requirements: no burned-in
  subtitles, no narration needed, 6–12 seconds that loop cleanly, ideally macro
  pearls or the ritual. If neither works, use a slow 1.06→1.0 scale on the pearl
  macro still as a fallback until footage exists.
- Compress before it goes in `public/video/`:
  ```
  ffmpeg -i source.mp4 -vf "scale=1920:-2" -c:v libx264 -crf 28 -preset slow -an -movflags +faststart hero.mp4
  ffmpeg -i hero.mp4 -ss 00:00:01 -frames:v 1 hero-poster.jpg
  ```
  Target under 3MB. Verify with `ls -lh`.

**Motion**
Video plays. Caption fades up once on load, 900ms, after the poster is visible.
That is the whole hero. Nothing else.

---

## 02 — The Innovation (opener)

**Label:** COLLECTION

**Layout** — the page-opener pattern, all inside the container (not full-bleed):
1. Eyebrow, top-left
2. Display headline, two lines
3. Caps subhead directly beneath
4. Scroll-linked marquee — one line, Switzer Black caps ~1.5rem, items separated by
   `·`, **translateX bound to scroll position** (ScrollTrigger scrub: 1), moving
   right-to-left as the user scrolls down. It does not move on its own.
5. Image directly under the marquee, same width as the marquee, ~16:9. Not full-bleed —
   it keeps the container gutters.
6. Full-width CTA bar the exact width of the image: `--ink` background, white Switzer
   Black caps, centred, with a `↗` icon after the text. 72px tall.
7. Paragraph beneath, same width, justified like a column.

**Copy**
- Eyebrow: THE INNOVATION
- Headline: BAKHOOR / REIMAGINED
- Subhead: FOUR FRAGRANCES. ONE NEW CATEGORY.
- Marquee: CAVIAR BAKHOOR · SPHERIFIED · 24 KARAT GOLD · OUD · ENCAPSULATION ·
  PRIVATE LABEL · CAVIAR DE PARFUM · SINCE 1937
- CTA bar: SHOP THE COLLECTION
- Paragraph:
  > Caviar Bakhoor reimagines traditional bakhoor in a long-lasting, highly
  > oil — lit, and gone. Caviar Bakhoor holds the same fragrance inside a pearl.
  > Sealed at room temperature, opened only by heat, and set with pure 24-karat
  > gold. The scent arrives slowly, and it stays.

**Assets**
Image: the four tins in a row on black — `collection/all-four-01.jpg` (DSC07524 or
the tins-in-a-row frame from the raw set).

---

## 03 — Held in a Pearl (approach)

**Label:** INNOVATION

**Layout**
1. Eyebrow
2. Display headline, two lines
3. Caps subhead
4. Paragraph, full container width
5. Large image, full container width, ~16:9
6. Two-column row: left, a tall portrait image (~40% width); right, a paragraph
   sitting at the *bottom* of the column, aligned to the image's bottom edge — the
   space above it stays empty. Caps subhead above the right column, top-aligned.

**Copy**
- Eyebrow: THE INNOVATION
- Headline: HELD / IN A PEARL
- Subhead: NOTHING ESCAPES UNTIL YOU WANT IT TO.
- Paragraph:
  > Traditional bakhoor releases everything at once. Elixir's encapsulation holds
  > the fragrance oil inside a sphere that stays closed at room temperature. On the
  > burner the pearl opens and the oil lifts through the gold. What you notice is
  > not smoke but scent — and how long it holds.
- Two-column subhead: ELIXIR × CAVIAR DE PARFUM
- Two-column paragraph:
  > Every tin carries pure 24-karat gold flakes set among the pearls. Gold has been
  > Elixir's signature across its parfum collections for years; here it is in the
  > fragrance you burn rather than the one you wear. Four compositions to start —
  > dark, rose, saffron and amber — each reveals its character slowly as warmed.

`[CONFIRM: is the gold decorative, or does it affect the burn? Adjust the first
sentence if it does something.]`

**Assets**
- Large image: the sharpest pearl macro — `texture/pearls-macro-01.jpg`
- Portrait image: spoon and mesh disc on black — `packaging/spoon-01.jpg`

---

## 04 — For Business (feature)

**Label:** BUSINESS

**Layout**
1. Eyebrow
2. Display headline — two lines, roman then italic
3. Caps subhead
4. Case block: a meta line above the image with `( COLLABORATION )` left and
   `ELIXIR / INDIA` right, both Switzer Black caps 0.75rem. Then the image, narrower
   than the container (~50% width, centred). **Behind the image**, a giant
   scroll-linked marquee — Switzer Black caps at ~14vw, `--ink`, one line, clipped by
   the section, moving left as the user scrolls down. The image sits on top of it
   with the marquee visible either side.
5. Paragraph under the image, same width as the image
6. CTA button right-aligned under the paragraph: `--ink` fill, white caps, `↗`
7. Second block, ~25vh below: a two-line headline in **Switzer Black Italic caps**
   (not Bodoni), ~5rem, then a paragraph, then a left-aligned CTA button.

**Copy**
- Eyebrow: FOR BUSINESS
- Headline: YOUR FRAGRANCE. / *OUR INNOVATION.*
- Subhead: MADE IN-HOUSE FOR BRANDS WORLDWIDE.
- Giant marquee: CAVIAR BAKHOOR · CAVIAR BAKHOOR · CAVIAR BAKHOOR
- Case paragraph:
  > Elixir develops and manufactures Caviar Bakhoor for perfume houses, luxury
  > brands, hotels and private label. Your scent, your packaging, our
  > encapsulation. From the first brief to the finished tin, the work is done
  > by the same hands that make Elixir's own.
- Case CTA: EXPLORE THE COLLABORATION
- Second headline: MADE FOR / YOUR BRAND
- Second paragraph:
  > Elixir creates Caviar Bakhoor collections for your brand from start to
  > fragrance, custom tin, custom box. Development, sampling, refinement and
  > production, in sequence, with one point of contact throughout.
- Second CTA: START A PROJECT

**Assets**
Case image: `[CONFIRM]` — if Fan Al Oud is a collaboration, use their open box
shot. Otherwise the Elixir open box, `packaging/box-open-01.jpg`, with the meta line
reading `( CAVIAR DE PARFUM )`.

---

## 05 — The Ritual (fixed background)

**Label:** RITUAL

This section is the one exception to the stacking rule. It sits **beneath** section
04 in z-order. As section 04 scrolls away upward, this section is revealed already
in place, as if it was always there.

**Layout**
- Full-bleed, 100vh minimum. Background image is **fixed** (`background-attachment:
  fixed`, or a sticky inner element on mobile where fixed is unreliable). The image
  does not scroll; the content over it does.
- Four content blocks, one in each corner, each ~28% width. Text on the image, so
  the image needs a subtle darkening gradient toward the edges. Text colour: `--paper`.
- Each block, top to bottom: step number in Bodoni Moda italic ~1.1rem; step name in
  Switzer Black caps ~2rem; two lines of body; an underlined "View the ritual" link.

**Copy**
- Top-left: *01* / LIGHT / Set the charcoal and let it settle to a grey edge.
- Top-right: *02* / PLACE / Rest the gold mesh disc over the heat.
- Bottom-left: *03* / SPOON / A small measure of pearls onto the mesh.
- Bottom-right: *04* / RELEASE / The pearls open. The fragrance lifts.
- All four links: View the ritual → `/ritual`

`[CONFIRM against the Scodix "Directions for Use" card — Elixir's own wording wins
over mine.]`

**Assets**
Background: a burner with smoke rising, shot in the same light as the product set.
This doesn't exist yet — generate it. Fallback until then: `texture/pearls-macro-02.jpg`.

---

## 06 — The Four (scroll-driven product carousel)

**Label:** COLLECTION

This replaces the team-bio section. It's the one section that is unmistakably ours.

**Layout**
- Pinned section, 400vh of scroll, 100vh visible. Four states, one per product,
  ScrollTrigger snap so the user always lands on a whole product.
- Left ~55%: the open tin, overhead, cropped to a **circle**, ~60vh diameter, on
  `--paper`. Under it, a small `01 / 04` counter in Switzer Medium meta.
- Right ~45%, vertically centred: the mixed-face name — "THE" in Switzer Black caps
  ~2rem, then the fragrance name in Bodoni Moda Italic caps ~5rem on the next line.
  Beneath: five words separated by `·` in Switzer Regular; a two-sentence paragraph;
  the price in meta caps; a CTA button `VIEW {NAME} ↗`.

**Motion — the circular transition**
On each scroll step: the current tin rotates −12° and slides 40% left while scaling
to 0.85 and fading; the next tin enters from 40% right, rotating from +12° to 0°,
scaling 0.85→1.0. Both over 600ms, expo-out, scrubbed to scroll so reversing scroll
reverses the motion. The right-column text crossfades (200ms out, 300ms in). The
counter ticks.

Under prefers-reduced-motion: no pin, four static rows.

**Data**
All from `src/data/products.ts`. Add a `fiveWords: string[]` field. Draft values —
`[CONFIRM] with the perfumer`:
- Noir — Dark. Resinous. Still. Unsweetened. Late.
- Ward Baccarat — Rose. Heated. Crystalline. Sweet. Lasting.
- Imperial Zafran — Saffron. Warm. Leathery. Dry. Regal.
- Amber Blanc — White amber. Clean. Musky. Soft. Light.

**Assets**
Four overhead open-tin shots, identical framing — `products/{handle}-tin-overhead-01.jpg`.
The circular crop is done in CSS (`border-radius: 50%; object-fit: cover`), not in the file.

---

## 07 — Since 1937 (closing composition)

**Label:** HERITAGE

**Layout**
- Centred composition, four words, four treatments, staggered baselines:
  - SINCE — Switzer Black Italic caps, ~2.5rem, upper-left of the block
  - 1937 — Bodoni Moda caps, ~11vw, the anchor
  - STILL — Switzer Black caps, ~1.2rem, riding the top-right shoulder of the 7
  - INVENTING — Switzer Black Italic caps, ~6vw, lower-right, overlapping into the
    empty space below the numerals but never onto a glyph
- Beneath, centred, max 60ch: a caps subhead then a paragraph, then a CTA button.

**Copy**
- Subhead: THIRD GENERATION. ONE NEW CATEGORY.
- Paragraph:
  > Elixir began in 1937 as a family incense workshop and became one of the largest
  > producers of handmade incense in the world. Three generations on, the same
  > house has taken the oldest form of fragrance and given it a new one.
- CTA: ABOUT ELIXIR

`[CONFIRM the founding year and "one of the largest" claim with the client before
this ships. Both come from Elixir's own site and third-party coverage, not from the
client directly.]`

---

## 08 — Credentials strip

No side label.

**Layout**
Full-bleed strip, ~120px tall, `--ink` hairline top and bottom. Left cell, fixed
width ~180px, `--paper`, `ELIXIR` in Switzer Black caps with a right hairline.
Right cell: a time-based marquee (this one *does* move on its own, 45s linear,
pauses on hover), Switzer Black caps 1.1rem, items separated by ~80px.

**Copy**
EST. 1937 · THIRD GENERATION · HANDMADE IN INDIA · 24 KARAT GOLD · ESXENCE MILAN 2024 ·
CAVIAR DE PARFUM

`[CONFIRM Esxence 2024 — it's reported by a Fragrantica reviewer who met them
there, not stated by Elixir.]` When collaboration brands are confirmed, their
names join this strip and the strip label changes to `TRUSTED BY`.

---

## 09 — Footer

**Layout**
- Top row: left, a two-line caps headline with the second line's last word in
  italic — Switzer Black, ~2.2rem. Right, the nav in a single row, Switzer Black
  caps 0.8rem, each item followed by `↗`.
- Beneath the headline, left, a short paragraph at ~40% width.
- Then the wordmark: `elixir` in Switzer Black lowercase at ~24vw, `--ink`, set so
  its baseline sits just below the viewport bottom — the top two-thirds of the
  letters are visible, the rest clipped. `overflow: hidden` on the footer.
- Legal line beneath the wordmark, tiny, left.
- Mesh-disc dot texture behind the whole footer at 6% opacity.

**Copy**
- Headline: EXPERIENCE / THE NEW *BAKHOOR*
- Nav: HOME · COLLECTION · THE RITUAL · FOR BUSINESS · ABOUT · CONTACT
- Paragraph:
  > From the first pearl to the finished tin, Elixir makes what it sells —
  > fragrance, encapsulation and packaging, under one roof, since 1937.
- Legal: © Jiyo Fragrances · Caviar Bakhoor is a product of Elixir Signature
  Scents · Privacy · Terms

`[CONFIRM "under one roof" — only true if packaging is in-house.]`

---

## Build order

Run one prompt per line. Commit after each.

1. Global: cursor, header, menu, sticky-label primitive, stacking-section primitive
2. 01 Hero
3. 02 Opener (this validates the scroll-linked marquee and the CTA bar)
4. 03 Approach
5. 04 Feature (this validates the giant background marquee)
6. 05 Ritual (this validates fixed-background and the beneath-stacking exception)
7. 06 Carousel (the hardest one — Plan Mode, and expect two rounds)
8. 07 Closing, 08 Strip, 09 Footer together
9. 375px pass on the whole page
10. Reduced-motion pass

The prompt shape for every section is the same:

> Read docs/homepage.md, section NN. Look at the matching captures in
> docs/reference/. Build it as src/components/home/NN-Name.tsx and mount it in
> app/page.tsx. Use only the primitives in src/components/ui/. Show me the plan first.
