/**
 * src/data/innovation.ts
 *
 * /innovation: the technology page. Owns "what is caviar bakhoor".
 *
 * Process only (site owner, 2026-10-19), in the register of a fragrance-lab
 * explainer: tracked eyebrows, numbered steps, arrow flows, ruled tables
 * with right-set values, a ruled aside.
 *
 * Elixir's own process is patent-pending and unpublished, so the plates
 * explain the general science of fragrance encapsulation (emulsion,
 * ionic gelation, curing, coacervation, thermal release) with typical
 * ranges from the encapsulation literature. Every plate carries PLATE_NOTE
 * saying so, the way the reference marks its figures as patent examples.
 * Nothing here is presented as Elixir's formula. If the client shares
 * publishable figures, they replace these ranges and the note goes.
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
    "Caviar Bakhoor is bakhoor reimagined in a long-lasting, highly diffusive form. Elixir's patent-pending encapsulation technology suspends fragrance inside a sphere that stays sealed at room temperature and opens under heat: pearls that release their aroma as they burn.",
  answerStrong: ["patent-pending encapsulation technology", "sealed at room temperature", "opens under heat"],
  marquee: ["Emulsion", "Ionic gelation", "Curing", "Coacervation", "Thermal release", "Encapsulation"],
  panel: { src: "/images/texture/pearl-macro.jpg", alt: "Caviar Bakhoor pearls, close, scattered with flakes of 24-karat gold", width: 2400, height: 1600 },
  footer: "Elixir · The scent lab",
};

/** On every plate, as the reference marks its patent examples. */
export const PLATE_NOTE = "Encapsulation principles, typical ranges. Not Elixir's confirmed formula.";

export const PLATES: Plate[] = [
  {
    kind: "list",
    eyebrow: "How to build",
    title: "Fragrant micro-pearls",
    lede: "From an oil phase to sealed fragrant spheres.",
    items: [
      "A fragrance oil phase: aged oud with natural absolutes",
      "Dispersed through a water-soluble biopolymer",
      "Oil → emulsion · Drop → gel pearl",
    ],
    tag: "The principle of encapsulation",
    image: { src: "/images/shoot/pearls-macro-03.jpg", alt: "Fragrant pearls, close, with flakes of gold", width: 2400, height: 1600 },
  },
  {
    kind: "table",
    eyebrow: "The core",
    title: "The oil phase",
    groups: [
      {
        rows: [
          ["Aged oud oil", "Base, the resinous heart"],
          ["Natural absolutes", "Character: saffron, rose, amber"],
          ["Carrier oil", "Dilution and flow"],
          ["Antioxidant", "Guards the oud against oxidation"],
        ],
      },
    ],
    highlight: "Aged oud oil",
    aside: "The oil is what the pearl protects. Everything after this step exists to hold it still until it meets heat.",
    image: { src: "/images/collection-tins-dark.jpg", alt: "Four tins of fragrant pearls, lit against black", width: 2400, height: 1302 },
  },
  {
    kind: "steps",
    eyebrow: "How the emulsion is made",
    title: "The wet phase",
    items: [
      "Dissolve sodium alginate in water, 1 to 2% w/v",
      "Hydrate until clear and free of bubbles",
      "Add the oil phase with an emulsifier",
      "High-shear mix to fine droplets, 1 to 10 µm",
      "De-aerate before the drop",
    ],
    aside: "The point: lock the oil into fine droplets before the sphere is formed.",
    image: { src: "/images/about/gallery-01.jpg", alt: "Pearls and gold leaf, close", width: 1600, height: 1067 },
  },
  {
    kind: "flow",
    eyebrow: "Ionic gelation",
    title: "How the pearls are formed",
    items: [
      "Emulsion drawn through a fine nozzle",
      "Drops fall into calcium chloride, 1 to 5% w/v",
      "Calcium cross-links the alginate at the surface",
      "A gel wall closes around the oil droplets",
    ],
    result: "The droplets set into sealed pearls.",
    aside: "Nozzle diameter sets the pearl. The caviar scale is roughly 1 to 3 mm.",
    image: { src: "/images/shoot/pearls-macro-02.jpg", alt: "Dark glossy pearls with flakes of gold leaf", width: 1897, height: 1262 },
  },
  {
    kind: "table",
    eyebrow: "Curing and finishing",
    title: "From gel to pearl",
    groups: [
      {
        label: "Cure",
        rows: [
          ["Time in the calcium bath", "10 to 30 min"],
          ["Rinse", "Purified water"],
        ],
      },
      {
        label: "Finish",
        rows: [
          ["Drying", "Low heat, 35 to 45 °C"],
          ["Residual moisture", "Low, shelf-stable"],
          ["Inclusion", "24-karat gold leaf"],
        ],
      },
    ],
    highlight: "Drying",
    aside: "Low heat matters: the top of the oud is volatile, and a hot dry would spend it before the pearl reaches the burner.",
    image: { src: "/images/shoot/noir-open-overhead.jpg", alt: "An open tin of finished pearls in its box, from above", width: 2400, height: 1600 },
  },
  {
    kind: "flow",
    eyebrow: "There is another way",
    title: "A protein and gum wall",
    items: [
      "Oil emulsified in gelatin and gum arabic, 40 to 50 °C",
      "pH lowered to about 4 to 4.5",
      "The two polymers coacervate onto each droplet",
      "Cooled below 10 °C to set the wall",
    ],
    result: "A cross-linked shell, stable at room temperature.",
    aside: "Complex coacervation builds a thinner, harder membrane than ionic gelation, at the cost of a slower process.",
    image: { src: "/images/shoot/four-boxes-overhead.jpg", alt: "Four boxes of fragrant pearls, from above", width: 2400, height: 1600 },
  },
  {
    kind: "steps",
    eyebrow: "How the pearl releases",
    title: "Thermal release",
    items: [
      "Charcoal heats the mesh or the foil",
      "Bound water in the matrix flashes off",
      "The gel wall softens, then ruptures",
      "The fragrance oil volatilises",
      "The resins smoulder: a slow, diffusive tail",
    ],
    aside: "Sealed at room temperature. Opened by heat. The release is the point of the whole process.",
    image: { src: "/images/shoot/ritual-release.jpg", alt: "Smoke lifting from the burner as the pearls warm", width: 1200, height: 1500 },
  },
  {
    kind: "table",
    eyebrow: "Why encapsulate",
    title: "Loose bakhoor, sealed pearl",
    groups: [
      {
        label: "Loose bakhoor → sealed pearl",
        rows: [
          ["In storage", "Volatiles escape → Sealed in"],
          ["Dose", "By eye → Measured spoon"],
          ["On heat", "Flares fast → Opens slowly"],
          ["Throw", "Short → Long, diffusive"],
        ],
      },
    ],
    aside: "The ritual is kept. Its form, and what reaches the room, is not.",
    image: { src: "/images/shoot/burner-smoke-tins.jpg", alt: "The burner with smoke rising, four tins around it", width: 2400, height: 1350 },
  },
];
