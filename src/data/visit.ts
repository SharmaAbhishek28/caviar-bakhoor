/**
 * src/data/visit.ts
 *
 * The royal visit on the home page (site owner, 2026-10-24): His Highness
 * Sheikh Mohammed bin Rashid Al Maktoum at the tripleA Perfumes counter,
 * Avenue Mall, Nad Al Sheba, where the Caviar Incense Collection made by
 * Elixir is presented.
 *
 * The photograph is tripleA Perfumes' own (their announcement), cropped to
 * the scene, without their caption. Copy states only what the photograph and
 * tripleA's announcement document: the visit, the place, the collection on
 * the counter. No claim of endorsement or of orders. Before launch: written
 * permission from tripleA to reuse their photograph, and clearance for using
 * His Highness's image on a commercial site.
 *
 * `marks` are points on the photograph, in percent of its frame, each
 * paired with a note in the copy.
 */

export const VISIT = {
  eyebrow: "Dubai · Avenue Mall, Nad Al Sheba",
  headline: ["A royal visit", "to the counter."],
  body: "His Highness Sheikh Mohammed bin Rashid Al Maktoum, Vice President and Prime Minister of the UAE and Ruler of Dubai, visited the tripleA Perfumes branch at Avenue Mall, where the Caviar Incense Collection, made by Elixir, is presented.",
  strong: ["His Highness Sheikh Mohammed bin Rashid Al Maktoum", "Caviar Incense Collection, made by Elixir"],
  marks: [
    { label: "The counter", note: "tripleA Perfumes, Avenue Mall", x: 24, y: 37, kind: "dot" as const },
    { label: "On it", note: "The Caviar Incense Collection, made by Elixir", x: 50, y: 91, kind: "band" as const },
  ],
  link: { label: "See the tripleA collaboration", href: "/for-business#triple-a" },
  credit: "Photograph: tripleA Perfumes",
  image: {
    src: "/images/visit/royal-visit.jpg",
    alt: "His Highness Sheikh Mohammed bin Rashid Al Maktoum at the tripleA Perfumes counter at Avenue Mall, Dubai, with his delegation; tins of the Caviar Incense Collection in the foreground",
    width: 720,
    height: 920,
  },
  /** Where the camera starts, close on His Highness at the counter. */
  focus: { x: 56, y: 32 },
};
