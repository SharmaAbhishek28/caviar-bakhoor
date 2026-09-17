/**
 * src/data/products.ts
 *
 * Single source of truth for product data.
 *
 * HANDOVER NOTE — read before changing the shape.
 * This mirrors the Shopify Storefront API product shape on purpose. When this site is
 * connected to Shopify, this file is replaced by a Storefront query and nothing else
 * needs to change. So:
 *   - never import a product directly into a component; pass it as a prop
 *   - never add a field here that Shopify could not supply as a field or metafield
 *   - keep `handle` matching the eventual Shopify product handle exactly
 *
 * Fields marked CONFIRM are placeholders awaiting the client. Do not replace them with
 * invented values — the UI is built to surface them so they cannot ship by accident.
 */

export type FragranceNotes = {
  top: string[];
  heart: string[];
  base: string[];
};

export type ProductImage = {
  /** First: the overhead crop of the open tin (landscape). Then the portrait
      used by the /collection cards. Both from the same shoot. */
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type Product = {
  handle: string;
  title: string;
  /** Shown under the title on the PDP. Constant across the line. */
  subtitle: string;
  /** Minor units, INR. Formatted at render. CONFIRM all four. */
  priceMinor: number | null;
  currency: 'INR';
  available: boolean;
  /** Net weight of pearls. CONFIRM. */
  weightGrams: number | null;
  /** Per-product accent, taken from the physical lid colour. */
  accent: string;
  /** Two or three sentences. Client-approved copy (BAKHOOR WEBSITE.pdf). */
  description: string;
  /** Five words, shown on /collection. PROPOSAL ONLY — CONFIRM with the perfumer. */
  fiveWords: string[];
  notes: FragranceNotes;
  images: ProductImage[];
  /** Everything physically in the box. Identical across the line. */
  inTheBox: string[];
};

const IN_THE_BOX = [
  'Caviar Bakhoor tin',
  'Charcoal block',
  'Gold mesh disc',
  'Gold serving spoon',
  'Instruction card',
];

export const products: Product[] = [
  {
    handle: 'noir',
    title: 'Noir',
    subtitle: 'Scented Bakhoor · Caviar Bakhoor',
    priceMinor: null, // CONFIRM
    currency: 'INR',
    available: true,
    weightGrams: null, // CONFIRM
    accent: '#1A1614',
    description:
      'Noir brings natural, aged Assamese oud and saffron together in a dark, ' +
      'seductive blend.',
    fiveWords: ['Dark', 'Resinous', 'Still', 'Unsweetened', 'Late'],
    notes: {
      top: [], // CONFIRM
      heart: [], // CONFIRM
      base: [], // CONFIRM
    },
    images: [
      {
        src: '/images/products/noir-tin-overhead.jpg',
        alt: 'Open tin of Noir Caviar Bakhoor, black pearls flecked with gold',
        width: 1536,
        height: 816,
      },
      {
        src: '/images/products/noir-portrait.jpg',
        alt: 'The Noir box open on black, the tin of pearls beside it and a gold spoon lifting a measure',
        width: 1200,
        height: 1600,
      },
      {
        src: '/images/products/noir-open.jpg',
        alt: 'The Noir box open, the tin seated inside beside its gold spoon',
        width: 1200,
        height: 1200,
      },
      {
        src: '/images/products/noir-front.jpg',
        alt: 'The Noir box and tin, front on',
        width: 1200,
        height: 1200,
      },
    ],
    inTheBox: IN_THE_BOX,
  },
  {
    handle: 'ward-baccarat',
    title: 'Ward Baccarat',
    subtitle: 'Scented Bakhoor · Caviar Bakhoor',
    priceMinor: null, // CONFIRM
    currency: 'INR',
    available: true,
    weightGrams: null, // CONFIRM
    accent: '#6B2230',
    description:
      'Ward Baccarat blends rare, aged Cambodian oud with dark truffle rose for a ' +
      'deep, regal aroma.',
    fiveWords: ['Rose', 'Heated', 'Crystalline', 'Sweet', 'Lasting'],
    notes: {
      top: [], // CONFIRM
      heart: [], // CONFIRM
      base: [], // CONFIRM
    },
    images: [
      {
        src: '/images/products/ward-baccarat-tin-overhead.jpg',
        alt: 'Open tin of Ward Baccarat Caviar Bakhoor with burgundy lid',
        width: 1536,
        height: 816,
      },
      {
        src: '/images/products/ward-baccarat-portrait.jpg',
        alt: 'The Ward Baccarat box open on black, its burgundy-lidded tin and a spoon of pearls',
        width: 1200,
        height: 1600,
      },
      {
        src: '/images/products/ward-baccarat-open.jpg',
        alt: 'The Ward Baccarat box open, the burgundy tin seated inside beside its spoon',
        width: 1200,
        height: 1200,
      },
      {
        src: '/images/products/ward-baccarat-front.jpg',
        alt: 'The Ward Baccarat box and tin, front on',
        width: 1200,
        height: 1200,
      },
    ],
    inTheBox: IN_THE_BOX,
  },
  {
    handle: 'imperial-zafran',
    title: 'Imperial Zafran',
    subtitle: 'Scented Bakhoor · Caviar Bakhoor',
    priceMinor: null, // CONFIRM
    currency: 'INR',
    available: true,
    weightGrams: null, // CONFIRM
    accent: '#B9762A',
    description:
      'Imperial Zafran pairs natural, aged Assamese oud with precious saffron for a ' +
      'rich, spiced warmth.',
    fiveWords: ['Saffron', 'Warm', 'Leathery', 'Dry', 'Regal'],
    notes: {
      top: [], // CONFIRM
      heart: [], // CONFIRM
      base: [], // CONFIRM
    },
    images: [
      {
        src: '/images/products/imperial-zafran-tin-overhead.jpg',
        alt: 'Open tin of Imperial Zafran Caviar Bakhoor, black and gold pearls',
        width: 1536,
        height: 816,
      },
      {
        src: '/images/products/imperial-zafran-portrait.jpg',
        alt: 'The Imperial Zafran box open on black, its green-lidded tin and a spoon of pearls',
        width: 1200,
        height: 1600,
      },
      {
        src: '/images/products/imperial-zafran-open.jpg',
        alt: 'The Imperial Zafran box open, the green tin seated inside beside its spoon',
        width: 1200,
        height: 1200,
      },
      {
        src: '/images/products/imperial-zafran-front.jpg',
        alt: 'The Imperial Zafran box and tin, front on',
        width: 1200,
        height: 1200,
      },
    ],
    inTheBox: IN_THE_BOX,
  },
  {
    handle: 'amber-blanc',
    title: 'Amber Blanc',
    subtitle: 'Scented Bakhoor · Caviar Bakhoor',
    priceMinor: null, // CONFIRM
    currency: 'INR',
    available: true,
    weightGrams: null, // CONFIRM
    accent: '#EDE7DA',
    description:
      'Amber Blanc unites rare, aged Cambodian oud with luminous amber in a warm ' +
      'play of light and dark.',
    fiveWords: ['White amber', 'Clean', 'Musky', 'Soft', 'Light'],
    notes: {
      top: [], // CONFIRM
      heart: [], // CONFIRM
      base: [], // CONFIRM
    },
    images: [
      {
        src: '/images/products/amber-blanc-tin-overhead.jpg',
        alt: 'Open tin of Amber Blanc Caviar Bakhoor with bone white lid',
        width: 1536,
        height: 816,
      },
      {
        src: '/images/products/amber-blanc-portrait.jpg',
        alt: 'The Amber Blanc box open on black, its white-lidded tin and a spoon of pearls',
        width: 1200,
        height: 1600,
      },
      {
        src: '/images/products/amber-blanc-open.jpg',
        alt: 'The Amber Blanc box open, the white tin seated inside beside its spoon',
        width: 1200,
        height: 1200,
      },
      {
        src: '/images/products/amber-blanc-front.jpg',
        alt: 'The Amber Blanc box and tin, front on',
        width: 1200,
        height: 1200,
      },
    ],
    inTheBox: IN_THE_BOX,
  },
];

export const getProduct = (handle: string): Product | undefined =>
  products.find((p) => p.handle === handle);

export const getOtherProducts = (handle: string): Product[] =>
  products.filter((p) => p.handle !== handle);

/** True while any product is still missing client-confirmed data. */
export const hasUnconfirmedData = products.some(
  (p) => p.priceMinor === null || p.notes.top.length === 0,
);
