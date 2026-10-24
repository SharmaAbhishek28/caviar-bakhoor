/**
 * src/data/shoot.ts
 *
 * The five box photographs from the product shoot (formerly the About page's
 * "The shoot" gallery), shared across the site (site owner, 2026-10-24):
 * all five on /for-business (Tailored collection development), and single
 * frames on /ritual (The objects), /contact and /collection.
 *
 * Typed data, per CLAUDE.md: these become Shopify files or a metaobject.
 */

export type ShootImage = { src: string; alt: string; width: number; height: number };

export const SHOOT_BOXES = {
  stacked: { src: "/images/about/gallery-02.jpg", alt: "Caviar Bakhoor boxes stacked beside the four tins", width: 1600, height: 1067 },
  fanned: { src: "/images/about/gallery-03.jpg", alt: "The four tins fanned in front of a box", width: 1600, height: 1067 },
  overhead: { src: "/images/about/gallery-04.jpg", alt: "The four tins resting among the boxes, from above", width: 1600, height: 1067 },
  shelf: { src: "/images/about/gallery-08.jpg", alt: "Caviar Bakhoor boxes and tins set out in two rows", width: 1600, height: 1067 },
  fourOpen: { src: "/images/shoot/four-boxes-with-tins.jpg", alt: "The four boxes, two of them open on their tins", width: 2400, height: 1600 },
} satisfies Record<string, ShootImage>;

/** All five, in the order they read best in sequence. */
export const SHOOT_BOX_SEQUENCE: ShootImage[] = [
  SHOOT_BOXES.fourOpen,
  SHOOT_BOXES.stacked,
  SHOOT_BOXES.fanned,
  SHOOT_BOXES.overhead,
  SHOOT_BOXES.shelf,
];
