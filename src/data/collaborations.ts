/**
 * src/data/collaborations.ts
 *
 * The collaborations on /for-business: Caviar Bakhoor that Elixir has made
 * for other houses. One case study per client. Typed data, per CLAUDE.md:
 * each becomes a Shopify metaobject.
 *
 * The component scales to whatever a project supplies: a cover image alone
 * makes a complete case study; `feature`, `variants` and `gallery` each add
 * a section when present, and a long gallery runs on two tracks.
 *
 * Clients are named, with their photography, at the site owner's direction
 * (2026-10-21). Add a project by adding an entry here and its images under
 * public/images/projects/<id>/. Companies 2, 3 and 4 follow when their
 * images are supplied.
 */

type Img = { src: string; alt: string; width: number; height: number };

export type CaseStudy = {
  id: string;
  client: string;
  origin: string;
  /** The client's product line. */
  line: string;
  summary: string;
  /** Phrases in `summary` set in weight. */
  strong: string[];
  facts: { label: string; value: string }[];
  /** The opening photograph. */
  cover: Img;
  /** A second photograph beside the summary. */
  feature?: Img;
  /** The compositions, each shown as its lid, with its label colour. */
  variants?: { name: string; color: string; image: Img }[];
  /** Everything else, on a scrolling track. */
  gallery?: Img[];
};

const sarib = (file: string, alt: string, size = 750): Img => ({
  src: `/images/projects/sarib/${file}.jpg`,
  alt,
  width: size,
  height: size,
});

export const COLLABORATIONS: CaseStudy[] = [
  {
    id: "sarib",
    client: "Sarib",
    origin: "Saudi Arabia",
    line: "Remal Caviar Bakhoor",
    summary:
      "For Sarib, the Arabian perfume house, Elixir made Remal: Sarib's own Caviar Bakhoor. Encapsulated bakhoor finished with pure 24-karat gold flakes, in two compositions, Black Oud and Oud Nights, dressed in Sarib's calligraphic identity.",
    strong: ["Remal", "Sarib's own Caviar Bakhoor", "Black Oud and Oud Nights"],
    facts: [
      { label: "Client", value: "Sarib" },
      { label: "Origin", value: "Saudi Arabia" },
      { label: "Line", value: "Remal Caviar Bakhoor" },
      { label: "Compositions", value: "Black Oud · Oud Nights" },
    ],
    cover: sarib("lifestyle-smoke", "Remal Caviar Bakhoor: an open tin of pearls, a charcoal disc smoking under a measure of them, saffron and agarwood around", 1080),
    feature: sarib("lifestyle-tin", "An open tin of Remal pearls with a gold spoon, agarwood and rose petals", 1080),
    variants: [
      { name: "Black Oud", color: "#2b2b2e", image: sarib("black-oud-lid", "The Remal Black Oud tin lid, black and gold") },
      { name: "Oud Nights", color: "#7a0f2e", image: sarib("oud-nights-lid", "The Remal Oud Nights tin lid, burgundy and gold") },
    ],
    gallery: [
      sarib("black-oud-set", "Remal Black Oud: the gift box and the open tin"),
      sarib("black-oud-spoon", "A gold spoon lifting pearls from the Black Oud tin"),
      sarib("black-oud-box", "The Remal Black Oud gift box"),
      sarib("box-top", "The lid of the Remal Caviar Bakhoor box"),
      sarib("black-oud-open", "The Black Oud tin, open"),
      sarib("oud-nights-gift-box", "The Oud Nights gift box opened, with its presentation card"),
      sarib("oud-nights-set", "Remal Oud Nights: the gift box and the open tin"),
      sarib("oud-nights-spoon", "A gold spoon lifting pearls from the Oud Nights tin"),
      sarib("oud-nights-box", "The Remal Oud Nights gift box"),
      sarib("oud-nights-open", "The Oud Nights tin, open"),
    ],
  },
];
