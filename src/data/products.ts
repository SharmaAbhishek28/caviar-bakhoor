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
  /** Minor units, INR (paise). Formatted at render. */
  priceMinor: number | null;
  /** Minor units, USD (cents), shown beside the INR price. */
  priceUsdMinor: number | null;
  currency: 'INR';
  available: boolean;
  /** Net weight of pearls. CONFIRM. */
  weightGrams: number | null;
  /** Per-product accent, taken from the physical lid colour. */
  accent: string;
  /** Two or three sentences. Client-approved copy (BAKHOOR WEBSITE.pdf). */
  description: string;
  /** The composition in one line, as the client's booklet captions each tin
      ("Natural, Aged Assamese Oud with Saffron"). Shown wherever the five
      words used to stand in. Ward Baccarat has no booklet page: its line is
      taken from its client-approved description above. */
  accord: string;
  /** The booklet's long description, verbatim. Null where the booklet has no
      page for the fragrance (Ward Baccarat); the PDP falls back to
      `description`. */
  longDescription: string | null;
  /** Five words. PROPOSAL ONLY, never confirmed by the perfumer — no longer
      displayed now the booklet supplies `accord`. Kept for the record. */
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
    priceMinor: 2500000, // Rs. 25,000 (site owner, 2026-10-24)
    priceUsdMinor: 25000, // USD 250
    currency: 'INR',
    available: true,
    weightGrams: null, // CONFIRM
    accent: '#1A1614',
    description:
      'Noir brings natural, aged Assamese oud and saffron together in a dark, ' +
      'seductive blend.',
    accord: 'Natural, aged Assamese oud with saffron',
    longDescription: 
      "Step into the darkness with Noir, where the natural, aged Assamese oud collides with the luxurious aroma of saffron, creating a sense of mystery and intrigue. The scent is seductive, yet refined, evoking feelings of sensuality and sophistication. Close your eyes, inhale deeply, and let the Noir experience transport you to another world.",
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
      {
        src: '/images/shoot/noir-open-overhead.jpg',
        alt: 'The Noir box open, from above, among its closed boxes',
        width: 2400,
        height: 1600,
      },
    ],
    inTheBox: IN_THE_BOX,
  },
  {
    handle: 'ward-baccarat',
    title: 'Ward Baccarat',
    subtitle: 'Scented Bakhoor · Caviar Bakhoor',
    priceMinor: 2500000, // Rs. 25,000 (site owner, 2026-10-24)
    priceUsdMinor: 25000, // USD 250
    currency: 'INR',
    available: true,
    weightGrams: null, // CONFIRM
    accent: '#6B2230',
    description:
      'Ward Baccarat blends rare, aged Cambodian oud with dark truffle rose for a ' +
      'deep, regal aroma.',
    accord: 'Rare, aged Cambodian oud with dark truffle rose',
    longDescription: null,
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
      {
        src: '/images/shoot/ward-baccarat-open-overhead.jpg',
        alt: 'The Ward Baccarat box open, from above, among its closed boxes',
        width: 2400,
        height: 1600,
      },
    ],
    inTheBox: IN_THE_BOX,
  },
  {
    handle: 'imperial-zafran',
    title: 'Imperial Zafran',
    subtitle: 'Scented Bakhoor · Caviar Bakhoor',
    priceMinor: 2500000, // Rs. 25,000 (site owner, 2026-10-24)
    priceUsdMinor: 25000, // USD 250
    currency: 'INR',
    available: true,
    weightGrams: null, // CONFIRM
    accent: '#B9762A',
    description:
      'Imperial Zafran pairs natural, aged Assamese oud with precious saffron for a ' +
      'rich, spiced warmth.',
    accord: 'Natural, aged Assamese oud with saffron',
    longDescription: 
      "Imperial Zafran is the perfect combination of spicy saffron and exotic oud. The natural, aged Assamese oud and the precious saffron blend together to create a heady aroma that will awaken your senses. The smoky notes of the oud enhance the spicy fragrance of saffron, making this scent perfect for those who love a touch of heat.",
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
      {
        src: '/images/shoot/imperial-zafran-open-overhead.jpg',
        alt: 'The Imperial Zafran box open, from above, among its closed boxes',
        width: 2400,
        height: 1600,
      },
    ],
    inTheBox: IN_THE_BOX,
  },
  {
    handle: 'amber-blanc',
    title: 'Amber Blanc',
    subtitle: 'Scented Bakhoor · Caviar Bakhoor',
    priceMinor: 2500000, // Rs. 25,000 (site owner, 2026-10-24)
    priceUsdMinor: 25000, // USD 250
    currency: 'INR',
    available: true,
    weightGrams: null, // CONFIRM
    accent: '#EDE7DA',
    description:
      'Amber Blanc unites rare, aged Cambodian oud with luminous amber in a warm ' +
      'play of light and dark.',
    accord: 'Rare, aged Cambodian oud with amber',
    longDescription: 
      "Enter a world of contrasts with Amber Blanc, where the sharp and luminous facets of amber and oud are pitted against each other. The rare, aged Cambodian oud is blended perfectly with the warm and inviting scent of amber, creating a fragrance that is both bold and beautiful. Each spray of Amber Blanc will transport you to a world of contrasts, where light and dark mingle in perfect harmony.",
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
      {
        src: '/images/shoot/amber-blanc-open-overhead.jpg',
        alt: 'The Amber Blanc box open, from above, among its closed boxes',
        width: 2400,
        height: 1600,
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
