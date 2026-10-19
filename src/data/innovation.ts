/**
 * src/data/innovation.ts
 *
 * /innovation — the technology page. Owns "what is caviar bakhoor".
 *
 * Written in the register of a fragrance-lab explainer (site owner's
 * reference, 2026-10-18): tracked eyebrows, short declarative lines, arrow
 * flows, ruled tables, a ruled aside. Built ONLY from facts the client has
 * confirmed — docs/content.md, BAKHOOR WEBSITE.pdf, the printed booklet and
 * the client's feedback on the box. No temperatures, percentages or process
 * steps are stated: content.md is explicit that process specifics are not
 * published while the patent is pending. Tables carry components and
 * confirmed values only.
 *
 * Typed data, per CLAUDE.md: each plate becomes a Shopify metaobject.
 */

type Img = { src: string; alt: string; width: number; height: number };

export type Plate =
  | { kind: "list"; eyebrow: string; title: string; lede?: string; items: string[]; tag?: string; aside?: string; image: Img }
  | { kind: "steps"; eyebrow: string; title: string; items: string[]; aside?: string; image: Img }
  | { kind: "flow"; eyebrow: string; title: string; items: string[]; result?: string; aside?: string; image: Img }
  | { kind: "table"; eyebrow: string; title: string; groups: { label?: string; rows: [string, string][] }[]; highlight?: string; aside?: string; image: Img };

export const INNOVATION = {
  /* The booklet's cover lines (client, printed booklet). */
  eyebrow: "Revolutionizing the bakhoor experience",
  headline: ["What is", "Caviar Bakhoor?"],
  subhead: "Elevating bakhoor in a groundbreaking avatar",
  /** The direct answer, first: this is what a search result pulls. */
  answer:
    "Caviar Bakhoor is bakhoor reimagined in a long-lasting, highly diffusive form. Elixir's patent-pending encapsulation technology suspends fragrance inside a sphere that stays sealed at room temperature and opens under heat — pearls that release their aroma as they burn. Rare, natural, sustainably sourced aged oud is blended with expertly crafted natural fragrances, and pure 24-karat gold flakes are set into every batch.",
  answerStrong: ["patent-pending encapsulation technology", "sealed at room temperature", "opens under heat", "24-karat gold"],
  marquee: ["Patent-pending", "Encapsulation", "Aged oud", "24 Karat gold", "Slow-burn", "Highly diffusive"],
  panel: { src: "/images/texture/pearl-macro.jpg", alt: "Caviar Bakhoor pearls, close, scattered with flakes of 24-karat gold", width: 2400, height: 1600 },
  footer: "Elixir Signature Scents · Caviar Bakhoor",
};

export const PLATES: Plate[] = [
  {
    kind: "list",
    eyebrow: "How it is built",
    title: "Caviar Bakhoor",
    lede: "From aged oud to sealed fragrant spheres.",
    items: [
      "Rare, natural, sustainably sourced aged oud",
      "Blended with expertly crafted natural fragrances",
      "Encapsulated → pearls · Finished → pure 24-karat gold",
    ],
    tag: "Patent-pending encapsulation technology",
    aside: "Bakhoor, in the avatar of caviar.",
    image: { src: "/images/shoot/pearls-macro-03.jpg", alt: "Caviar Bakhoor pearls, close, with flakes of gold", width: 2400, height: 1600 },
  },
  {
    kind: "table",
    eyebrow: "The raw material",
    title: "Aged oud, two origins",
    groups: [
      {
        rows: [
          ["Noir", "Aged Assamese oud · saffron"],
          ["Imperial Zafran", "Aged Assamese oud · saffron"],
          ["Ward Baccarat", "Aged Cambodian oud · dark truffle rose"],
          ["Amber Blanc", "Aged Cambodian oud · amber"],
        ],
      },
    ],
    aside: "Every composition begins with natural, aged oud — Assamese or Cambodian — set against a single counterpoint.",
    image: { src: "/images/collection-tins-dark.jpg", alt: "The four tins, Ward Baccarat, Amber Blanc, Imperial Zafran and Noir, lit against black", width: 2400, height: 1302 },
  },
  {
    kind: "flow",
    eyebrow: "The principle",
    title: "Fragrance, encapsulated.",
    items: [
      "Fragrance oil",
      "Suspended inside a sphere",
      "Sealed at room temperature",
      "Opened by heat",
    ],
    result: "The aroma is released as the pearl burns.",
    aside: "The principle, not the process: the method itself is patent-pending.",
    image: { src: "/images/about/gallery-01.jpg", alt: "Pearls and gold leaf, close", width: 1600, height: 1067 },
  },
  {
    kind: "table",
    eyebrow: "Not classical bakhoor",
    title: "A new form of fragrance",
    groups: [
      {
        rows: [
          ["Form", "Pearls, in the avatar of caviar"],
          ["At rest", "Sealed at room temperature"],
          ["On heat", "The pearls open"],
          ["Release", "Slow-burn, long-lasting"],
          ["Throw", "Highly diffusive"],
        ],
      },
    ],
    aside: "The ritual of bakhoor, kept. Its form, reimagined.",
    image: { src: "/images/shoot/burner-smoke-tins.jpg", alt: "The white burner with smoke rising, the four tins around it", width: 2400, height: 1350 },
  },
  {
    kind: "steps",
    eyebrow: "How the pearls release",
    title: "The burn",
    items: [
      "Light the charcoal and let it settle",
      "Rest the mesh — or the foil — over the charcoal",
      "Spoon a 0.5 gram measure of pearls onto it",
      "Heat opens the pearls",
      "The aroma lifts: slow, long-lasting, highly diffusive",
    ],
    aside: "No aroma until you want it.",
    image: { src: "/images/shoot/ritual-light.jpg", alt: "A torch lighting the charcoal in the white burner", width: 1200, height: 1500 },
  },
  {
    kind: "table",
    eyebrow: "The kit",
    title: "Engineered for a clean burn",
    groups: [
      {
        label: "In the tin",
        rows: [
          ["Caviar Bakhoor pearls", "75 g"],
          ["Dose per burn", "0.5 g"],
        ],
      },
      {
        label: "On the charcoal",
        rows: [
          ["Mesh", "Double-layered stainless steel"],
          ["Pattern", "Two-tone, quilted"],
          ["Sizes", "Two"],
          ["Foil", "Extra-thick aluminium"],
        ],
      },
    ],
    highlight: "Mesh",
    aside: "The double layer ensures consistent heat dispersal, for a clean, smooth and long-lasting burn.",
    image: { src: "/images/shoot/amber-blanc-set.jpg", alt: "The Amber Blanc kit: the box, the open tin, the spoon and a disc of foil", width: 2400, height: 1600 },
  },
  {
    kind: "list",
    eyebrow: "The finish",
    title: "Pure 24-karat gold",
    lede: "Set into every batch.",
    items: [
      "Flakes of pure 24-karat gold, through every tin",
      "Visible in the pearl, from the first spoon",
      "The caviar, enriched — its royalty, enhanced",
    ],
    image: { src: "/images/shoot/pearls-macro-02.jpg", alt: "Dark pearls with flakes of 24-karat gold", width: 1897, height: 1262 },
  },
  {
    kind: "flow",
    eyebrow: "There is another way",
    title: "Made for your brand",
    items: [
      "Your scent",
      "Encapsulated into pearls",
      "Your tin, your box",
      "Into production",
    ],
    result: "Your fragrance. Our innovation.",
    aside: "Elixir develops and manufactures Caviar Bakhoor for perfume houses, luxury brands and private label.",
    image: { src: "/images/shoot/four-boxes-overhead.jpg", alt: "The four Caviar Bakhoor boxes, from above", width: 2400, height: 1600 },
  },
];

/** Common questions — answered only from confirmed facts. Rendered, and
 *  emitted as FAQPage JSON-LD. */
export const FAQ: { q: string; a: string }[] = [
  {
    q: "What is Caviar Bakhoor?",
    a: "Caviar Bakhoor is bakhoor reimagined as pearls. A patent-pending encapsulation technology suspends fragrance inside spheres that stay sealed at room temperature and open under heat, releasing their aroma as they burn.",
  },
  {
    q: "How is it different from traditional bakhoor?",
    a: "The ritual is the same — charcoal, heat, scent. The form is new: sealed fragrant pearls of aged oud and natural fragrance, finished with pure 24-karat gold, for a slow-burn, long-lasting and highly diffusive aroma.",
  },
  {
    q: "How do you use it?",
    a: "Light the charcoal and let it settle. Rest the double-layered mesh or the extra-thick foil over it, spoon a 0.5 gram measure of pearls onto it, and let the heat open them.",
  },
  {
    q: "What is in the box?",
    a: "75 grams of Caviar Bakhoor pearls, a spoon for a 0.5 gram dose, a double-layered stainless-steel mesh in two sizes, and extra-thick aluminium foil.",
  },
  {
    q: "Can it be made for my brand?",
    a: "Yes. Elixir develops and manufactures Caviar Bakhoor for perfume houses, luxury brands and private label — your scent, your tin and box, into production.",
  },
];
