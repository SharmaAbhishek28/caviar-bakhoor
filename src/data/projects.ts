/**
 * src/data/projects.ts
 *
 * The four cards on the section 04 wheel. A typed array rather than JSX, per
 * the handover rules in CLAUDE.md, this becomes a Shopify metaobject later.
 *
 * The card images (public/images/cards/) are AI-generated (Higgsfield, GPT
 * Image 2.5, 2026-10-19) from the real product photographs, one styled
 * surface per fragrance after the client's booklet; labels checked against
 * the real packaging.
 *
 * Derived from products.ts (same four fragrances, same handles), but kept
 * separate because a card carries presentation fields a product does not: the
 * index shown on the card, the crop used on the wheel, and which words in the
 * blurb are weighted.
 *
 * `blurb` is the product description verbatim from products.ts. The copy is
 * the client's own (BAKHOOR WEBSITE.pdf), so it no longer carries the
 * perfumer's PROPOSAL prefix and MarkedProse finds nothing to flag.
 *
 * `no` is the card's position in the set, not a project number. The reference
 * shows "( PROJECT NO. 141 )" — an Elixir equivalent would be a real internal
 * reference, so this stays a simple 01–04 index until the client supplies one.
 */

import { getProduct } from "./products";

export type ProjectCard = {
  /** Matches the Shopify product handle. */
  handle: string;
  title: string;
  /** Card index, shown as ( 01 / 04 ). */
  no: string;
  /** Right-hand meta line on the card. */
  meta: string;
  /** The composition line, from the product record (the client's booklet). */
  words: string;
  /** The card paragraph. Verbatim from products.ts, marker included. */
  blurb: string;
  /** Phrases in `blurb` to set in weighted type. Must appear verbatim. */
  keywords: string[];
  /** Button label. */
  cta: string;
  image: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
};

/** The booklet's one-line composition, from the product record. */
const accordOf = (handle: string): string => {
  const p = getProduct(handle);
  if (!p) throw new Error(`projects.ts: no product with handle "${handle}"`);
  return p.accord;
};

/** Pulls the description straight from the product record, never a copy. */
const blurbOf = (handle: string): string => {
  const p = getProduct(handle);
  if (!p) throw new Error(`projects.ts: no product with handle "${handle}"`);
  return p.description;
};

export const PROJECT_WHEEL: ProjectCard[] = [
  {
    handle: "noir",
    title: "Noir",
    no: "01",
    meta: "Noir / Caviar Bakhoor",
    words: accordOf("noir"),
    blurb: blurbOf("noir"),
    keywords: ["natural, aged Assamese oud", "saffron", "dark, seductive blend"],
    cta: "View Noir",
    image: {
      src: "/images/cards/noir.jpg",
      alt: "Noir: the open tin of pearls flecked with gold leaf, a gold spoon, the closed tin and its box, on black leather",
      width: 1600,
      height: 900,
    },
  },
  {
    handle: "ward-baccarat",
    title: "Ward Baccarat",
    no: "02",
    meta: "Ward Baccarat / Caviar Bakhoor",
    words: accordOf("ward-baccarat"),
    blurb: blurbOf("ward-baccarat"),
    keywords: ["rare, aged Cambodian oud", "dark truffle rose", "deep, regal aroma"],
    cta: "View Ward Baccarat",
    image: {
      src: "/images/cards/ward-baccarat.jpg",
      alt: "Ward Baccarat: the open tin of pearls with gold leaf, a rose-handled gold spoon, the burgundy tin and its box, on burgundy velvet with rose petals",
      width: 1600,
      height: 900,
    },
  },
  {
    handle: "imperial-zafran",
    title: "Imperial Zafran",
    no: "03",
    meta: "Imperial Zafran / Caviar Bakhoor",
    words: accordOf("imperial-zafran"),
    blurb: blurbOf("imperial-zafran"),
    keywords: ["natural, aged Assamese oud", "precious saffron", "rich, spiced warmth"],
    cta: "View Imperial Zafran",
    image: {
      src: "/images/cards/imperial-zafran.jpg",
      alt: "Imperial Zafran: the open tin of pearls with gold leaf, a gold spoon, the green tin and its box, on emerald green with threads of saffron",
      width: 1600,
      height: 900,
    },
  },
  {
    handle: "amber-blanc",
    title: "Amber Blanc",
    no: "04",
    meta: "Amber Blanc / Caviar Bakhoor",
    words: accordOf("amber-blanc"),
    blurb: blurbOf("amber-blanc"),
    keywords: ["rare, aged Cambodian oud", "luminous amber", "warm play of light and dark"],
    cta: "View Amber Blanc",
    image: {
      src: "/images/cards/amber-blanc.jpg",
      alt: "Amber Blanc: the open tin of pearls with gold leaf, a marble-handled gold spoon, the ivory tin and its box, on white feathers",
      width: 1600,
      height: 900,
    },
  },
];

/** The word that runs behind the wheel, in one continuous band. */
export const WHEEL_MARQUEE = "Caviar Bakhoor";
