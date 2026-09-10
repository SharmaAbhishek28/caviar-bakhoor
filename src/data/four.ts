/**
 * src/data/four.ts
 *
 * Section 06 — the four fragrances presented the way the reference presents
 * its people: an epithet each, a portrait, a marked-up paragraph. A typed
 * array rather than JSX, per CLAUDE.md — this becomes a Shopify metaobject.
 *
 * Derived from products.ts (same handles, descriptions pulled at build, never
 * copied) plus the presentation fields a product does not carry: the epithet,
 * the portrait crop, and which phrases are weighted or italic.
 *
 * Each epithet is taken from the product's own description — "the darkest
 * of the four", "Rose", "Saffron", "the lightest in the range" — so nothing
 * here claims what the copy does not.
 */

import { getProduct } from "./products";

export type FourEntry = {
  /** Matches the Shopify product handle. */
  handle: string;
  title: string;
  /** The word after THE. Rendered in Bodoni italic caps. */
  epithet: string;
  /** Product description, verbatim, marker included. */
  blurb: string;
  /** Phrases in `blurb` to set in weighted type. Must appear verbatim. */
  strong: string[];
  /** Phrases in `blurb` to set in italic. Must appear verbatim. */
  em: string[];
  image: { src: string; alt: string; width: number; height: number };
};

const blurbOf = (handle: string): string => {
  const p = getProduct(handle);
  if (!p) throw new Error(`four.ts: no product with handle "${handle}"`);
  return p.description;
};

/** The opener composition: WHERE / BAKHOOR / BECOMES / CAVIAR. */
export const FOUR_OPENER = {
  lead: "Where",
  anchor: "Bakhoor",
  link: "Becomes",
  close: "Caviar",
};

export const FOUR: FourEntry[] = [
  {
    handle: "noir",
    title: "Noir",
    epithet: "Darkest",
    blurb: blurbOf("noir"),
    strong: ["darkest of the four", "Smoke and resin"],
    em: ["feel still"],
    image: {
      src: "/images/products/noir-portrait.jpg",
      alt: "The Noir box open on black, the tin of pearls beside it and a gold spoon lifting a measure",
      width: 1200,
      height: 1600,
    },
  },
  {
    handle: "ward-baccarat",
    title: "Ward Baccarat",
    epithet: "Rose",
    blurb: blurbOf("ward-baccarat"),
    strong: ["heated rather than fresh", "crystalline and sweet"],
    em: ["holds long"],
    image: {
      src: "/images/products/ward-baccarat-portrait.jpg",
      alt: "The Ward Baccarat box open on black, its burgundy-lidded tin and a spoon of pearls",
      width: 1200,
      height: 1600,
    },
  },
  {
    handle: "imperial-zafran",
    title: "Imperial Zafran",
    epithet: "Saffron",
    blurb: blurbOf("imperial-zafran"),
    strong: ["Saffron carries the whole composition", "faintly leathery"],
    em: ["Middle Eastern"],
    image: {
      src: "/images/products/imperial-zafran-portrait.jpg",
      alt: "The Imperial Zafran box open on black, its green-lidded tin and a spoon of pearls",
      width: 1200,
      height: 1600,
    },
  },
  {
    handle: "amber-blanc",
    title: "Amber Blanc",
    epithet: "Lightest",
    blurb: blurbOf("amber-blanc"),
    strong: ["lightest in the range", "White amber and clean musk"],
    em: ["start with"],
    image: {
      src: "/images/products/amber-blanc-portrait.jpg",
      alt: "The Amber Blanc box open on black, its white-lidded tin and a spoon of pearls",
      width: 1200,
      height: 1600,
    },
  },
];

/**
 * The closing block. The marquee line is docs/content.md § Closing, verbatim.
 * The paragraph is assembled from two lines already in use on the page —
 * § 03's "Four compositions..." and § The ritual's "Every box arrives..." —
 * so it introduces no new claim.
 */
export const FOUR_CLOSE = {
  marquee: "Ready to try the new bakhoor?",
  paragraph:
    "Four compositions to start — one dark, one rose, one saffron, one amber — each built to be heated, not sprayed. Every box arrives with the charcoal, the mesh disc and the spoon.",
  strong: ["heated, not sprayed"],
  cta: { label: "Shop Caviar Bakhoor", href: "/collection" },
};
