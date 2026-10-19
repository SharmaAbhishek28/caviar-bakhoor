/**
 * src/data/box.ts
 *
 * What comes in the box — home section 03's row. Typed data rather than JSX,
 * per CLAUDE.md: it becomes a Shopify metaobject.
 *
 * Copy is the client's own feedback (2026-10-17), one row per tool: the
 * spoon's 0.5g dose, the mesh's double layer, two-tone quilted pattern
 * and two sizes, the foil's everyday use on the charcoal.
 *
 * The photographs are stills from the client's own films: the spoon and the
 * foil from "CAVIAR ITALIAN SUBS" (61.5s, 60.5s), the mesh from "VE Project
 * 5-2" (23s), cropped square above the burned-in subtitles.
 */

export type BoxItem = {
  /** The tool, as the row's heading. */
  name: string;
  /** One or two sentences, the client's words (feedback, 2026-10-17). */
  body: string;
  /** Phrases in `body` set in weight. */
  strong: string[];
  image: { src: string; alt: string; width: number; height: number };
};

/** The line above the three rows. */
export const BOX_INTRO =
  "Everything the ritual needs is in the box: 75 grams of Caviar Bakhoor pearls and three tools to burn them well.";
export const BOX_INTRO_STRONG = ["75 grams of Caviar Bakhoor pearls"];

/** The three tools, one row each, alternating sides. */
export const BOX_ITEMS: BoxItem[] = [
  {
    name: "The spoon",
    body: "A convenient spoon to scoop the caviar and place it on the charcoal, a perfect 0.5 gram dose per burn.",
    strong: ["convenient spoon", "0.5 gram dose per burn"],
    image: { src: "/images/box/spoon.jpg", alt: "The gold spoon scooping pearls from the open tin", width: 1000, height: 1000 },
  },
  {
    name: "The mesh",
    body: "A double-layered stainless-steel mesh in a two-tone quilted pattern, made in two sizes, to ensure consistent heat dispersal for a clean, smooth and long-lasting burn.",
    strong: ["double-layered stainless-steel mesh", "two-tone quilted pattern", "two sizes"],
    image: { src: "/images/box/mesh.jpg", alt: "The gold two-tone mesh resting on the burner", width: 700, height: 700 },
  },
  {
    name: "The foil",
    body: "Extra-thick aluminium foil for everyday burning, placed directly on the charcoal.",
    strong: ["Extra-thick aluminium foil", "everyday burning"],
    image: { src: "/images/box/foil.jpg", alt: "A disc of thick aluminium foil on the charcoal in the burner", width: 1000, height: 1000 },
  },
];

/** The film after the row, revealed full width through a pearl. 1080p for
 *  wide screens, 720p for phones; AV1 first, H.264 for browsers without it.
 *  From the client's 4K "CAVIAR ITALIAN SUBS", 7–109s, cropped above its
 *  burned-in subtitles. */
export const BOX_VIDEO = {
  sources: [
    { src: "/video/box-1080.webm", type: 'video/webm; codecs="av01.0.08M.08, opus"', media: "(min-width: 768px)" },
    { src: "/video/box-1080.mp4", type: "video/mp4", media: "(min-width: 768px)" },
    { src: "/video/box-720.webm", type: 'video/webm; codecs="av01.0.05M.08, opus"' },
    { src: "/video/box-720.mp4", type: "video/mp4" },
  ],
  poster: "/video/box-poster.jpg",
  label: "Caviar Bakhoor: the four tins, the box opened, the pearls and gold, and the ritual on the burner",
};
