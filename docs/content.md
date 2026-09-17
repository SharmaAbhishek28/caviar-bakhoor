# Content — CaviarBakhoor.com

Goes in `docs/content.md`. Use verbatim. Anything marked **`[CONFIRM]`** is waiting on
the client — leave the marker visible in the UI, do not write a plausible substitute.

Voice: plain, confident, unhurried. Short sentences. The product is strange enough
that it does not need adjectives. Never "elevate", "indulge", "journey", "experience
like never before".

---

## Global

- Site name — Caviar Bakhoor by Elixir
- House — Elixir Signature Scents
- Product line — Caviar Bakhoor
- Primary CTA — Shop the collection
- Secondary CTA — Create with us

**Navigation:** Caviar Bakhoor · Collection · The Ritual · For Business · About

**Marquee keywords** (category SEO doing quiet visual work):
Caviar Bakhoor · Encapsulation · 24 Karat Gold · Oud · Bakhoor Reimagined ·
Private Label · Caviar Bakhoor · Made in India `[CONFIRM manufacturing location]`

---

## Home

### Hero
> **BAKHOOR,**
> **REIMAGINED.**

Traditional bakhoor, encapsulated into pearls — each one holding fragrance and pure
24-karat gold until heat releases it.

`Shop the collection` · `See how it works`

### What is Caviar Bakhoor

> **Bakhoor has been burned the same way for a thousand years.**

Wood chips, resin, oil. Smoke that arrives all at once and fades just as fast.

Elixir's encapsulation technology holds the fragrance inside a pearl. Heat opens it
slowly. What you get is a scent that unfolds instead of erupting — and lasts.

`[CONFIRM: how long does the scent hold vs traditional bakhoor? A real number here is
worth more than any adjective.]`

### The innovation

> **A new form of fragrance.**

The pearls are made by suspending fragrance oil inside a sphere that stays sealed at
room temperature and opens under heat. Pure 24-karat gold flakes are set into every
batch.

`[CONFIRM: patent status — filed, pending, granted? Number and jurisdiction if
shareable. Do not publish anything about process specifics.]`

`Read about the innovation`

### The ritual

> **Four steps. No smoke until you want it.**

1. **Light** — set the charcoal and let it settle
2. **Place** — rest the gold mesh disc over the burner
3. **Spoon** — a small measure of pearls onto the mesh
4. **Release** — the pearls open, and the fragrance lifts

Every box arrives with the charcoal, the mesh disc and the spoon.

`See the full ritual`

### The collection

> **Four fragrances.**

Names in Gambetta, prices from `products.ts`, circular tins. No descriptions on the
card — the tin does the work.

`Shop all`

### Elixir

> **A perfume house that builds what it sells.**

`[CONFIRM: founding year, facility location, in-house R&D and lab capability, any
certifications. This section is credibility for the B2B buyer — it needs real detail,
not atmosphere.]`

`About Elixir`

### For business

> **YOUR FRAGRANCE.**
> **OUR INNOVATION.**

Elixir manufactures Caviar Bakhoor for perfume houses, luxury brands, hotel groups and
private label. Your scent, your packaging, our technology.

`[CONFIRM: the four collaborating brands, and written permission to name each one.]`

`Create with us`

### Closing

> **Ready to try the new bakhoor?**

`Shop Caviar Bakhoor` · `Enquire for business`

---

## Product page

Structure follows the same order for all four.

- Circular tin image, then three supporting shots
- Fragrance name (Gambetta), "Scented Bakhoor · Caviar Bakhoor"
- Weight `[CONFIRM]` and price
- Add to cart, sticky past the fold
- **The scent** — two or three sentences. Written, not listed.
- **Notes** — top / heart / base, from `products.ts`
- **The ritual** — the four steps, condensed
- **In the box** — tin, charcoal, gold mesh disc, spoon, instruction card
- **Details** — weight, approximate uses `[CONFIRM]`, care, shipping
- Reviews
- The other three fragrances

Draft scent copy is in `products.ts` and is marked as a proposal. All four need the
client's perfumer to approve or rewrite — do not ship my guesses as fact.

---

## The Innovation `/innovation`

The page that has to rank for "what is caviar bakhoor". Write it long and answer the
question directly in the first hundred words, because that is what gets pulled into a
search result.

Sections:

1. **What Caviar Bakhoor is** — direct definition, first paragraph
2. **How it differs from traditional bakhoor** — a real comparison, honest about what
   traditional bakhoor does better too. Hedged marketing reads as evasive; a fair
   comparison reads as confident
3. **Encapsulation** — the principle, not the process `[CONFIRM what is shareable]`
4. **The gold** — why 24-karat flakes are in it `[CONFIRM: decorative, or does it
   affect the burn?]`
5. **Common questions** — this is where the Section 9 / Section 12 conflict resolves.
   FAQ block with schema markup instead of a blog

FAQ entries to build:
- What is Caviar Bakhoor?
- How is it different from traditional bakhoor?
- How do you use it?
- How long does one tin last? `[CONFIRM]`
- Is it safe to burn indoors? `[CONFIRM]`
- Can it be made for my brand?

---

## For Business `/for-business`

> **YOUR FRAGRANCE.**
> **OUR INNOVATION.**

Create your own Caviar Bakhoor with Elixir.

`Start a project`

**Who we work with** — Perfume houses · Luxury brands · Hotels and hospitality ·
Retailers · Private label · Corporate gifting

**What we offer** — `[CONFIRM each capability before it goes on the page. Only list
what Elixir has actually delivered.]` Custom fragrance development · Caviar Bakhoor
development · Private label manufacturing · Custom packaging · Bespoke collections ·
Commercial production

**Process** — genuinely sequential, so numbered:

1. **Discover** — the brand, the brief, the market
2. **Develop** — the fragrance and the format
3. **Sample** — prototypes in your hands
4. **Refine** — product and packaging locked
5. **Produce** — into production

**Collaborations** — four full-width case cards. Not a logo wall; four logos in a grid
reads as thin. Each card: brand mark, product photograph, two or three sentences on
what Elixir built. `[CONFIRM all four, with permission.]`

**Enquiry form** — Name · Company · Email · Phone · Country · Business type ·
Requirement · Estimated quantity · Message. Submit label: `Send enquiry`.
Success state: "Enquiry received. Elixir will reply within `[CONFIRM]` working days."

---

## Metadata

```
/            Caviar Bakhoor by Elixir — Bakhoor, Reimagined
             Traditional bakhoor encapsulated into pearls with 24-karat gold.
             Four fragrances from Elixir Signature Scents.

/innovation  What is Caviar Bakhoor? | Elixir Signature Scents
             Caviar Bakhoor is bakhoor encapsulated into pearls that release
             fragrance under heat. How it works, and how it differs from
             traditional bakhoor.

/for-business Caviar Bakhoor Manufacturing & Private Label | Elixir
             Elixir develops and manufactures Caviar Bakhoor for perfume houses,
             luxury brands and private label.
```

JSON-LD: `Organization` on all pages, `Product` + `AggregateRating` on PDPs, `FAQPage`
on `/innovation`, `BreadcrumbList` sitewide.
