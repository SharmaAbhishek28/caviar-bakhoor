/**
 * src/data/projects.ts
 *
 * The four cards on the section 04 wheel. A typed array rather than JSX, per
 * the handover rules in CLAUDE.md — this becomes a Shopify metaobject later.
 *
 * Derived from products.ts (same four fragrances, same handles), but kept
 * separate because a card carries presentation fields a product does not: the
 * index shown on the card, the crop used on the wheel, and which words in the
 * blurb are weighted.
 *
 * `blurb` is the product description verbatim. It carries the perfumer's
 * "PROPOSAL — perfumer to approve." prefix on purpose. The card no longer
 * shows it as a badge (removed at the client's request) but strips it for
 * display and keeps it as `data-confirm` on the paragraph, so unapproved copy
 * is still findable. Remove the prefix in products.ts only on the perfumer's
 * sign-off (CLAUDE.md, content rules).
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
  /** Five words, from the perfumer. CONFIRM before shipping. */
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
    meta: "Noir / Caviar de Parfum",
    words: "Dark. Resinous. Still. Unsweetened. Late.",
    blurb: blurbOf("noir"),
    keywords: ["darkest of the four", "Smoke and resin", "feel still"],
    cta: "View Noir",
    image: {
      src: "/images/products/noir-tin-overhead.jpg",
      alt: "The Noir box — black with a gold Elixir mark and a gold-edged Noir label",
      width: 1536,
      height: 816,
    },
  },
  {
    handle: "ward-baccarat",
    title: "Ward Baccarat",
    no: "02",
    meta: "Ward Baccarat / Caviar de Parfum",
    words: "Rose. Heated. Crystalline. Sweet. Lasting.",
    blurb: blurbOf("ward-baccarat"),
    keywords: ["heated rather than fresh", "crystalline and sweet", "holds long"],
    cta: "View Ward Baccarat",
    image: {
      src: "/images/products/ward-baccarat-tin-overhead.jpg",
      alt: "The Ward Baccarat box — black with a gold Elixir mark and a burgundy label",
      width: 1536,
      height: 816,
    },
  },
  {
    handle: "imperial-zafran",
    title: "Imperial Zafran",
    no: "03",
    meta: "Imperial Zafran / Caviar de Parfum",
    words: "Saffron. Warm. Leathery. Dry. Regal.",
    blurb: blurbOf("imperial-zafran"),
    keywords: ["Saffron carries the whole composition", "faintly leathery", "Middle Eastern"],
    cta: "View Imperial Zafran",
    image: {
      src: "/images/products/imperial-zafran-tin-overhead.jpg",
      alt: "The Imperial Zafran box — black with a gold Elixir mark and a deep green label",
      width: 1536,
      height: 816,
    },
  },
  {
    handle: "amber-blanc",
    title: "Amber Blanc",
    no: "04",
    meta: "Amber Blanc / Caviar de Parfum",
    words: "White amber. Clean. Musky. Soft. Light.",
    blurb: blurbOf("amber-blanc"),
    keywords: ["lightest in the range", "White amber and clean musk", "start with"],
    cta: "View Amber Blanc",
    image: {
      src: "/images/products/amber-blanc-tin-overhead.jpg",
      alt: "The Amber Blanc box — black with a gold Elixir mark and a white label",
      width: 1536,
      height: 816,
    },
  },
];

/** The word that runs behind the wheel, in one continuous band. */
export const WHEEL_MARQUEE = "Caviar de Parfum";
