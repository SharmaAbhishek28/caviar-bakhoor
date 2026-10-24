/**
 * src/data/innovation.ts
 *
 * /innovation: the technology page. Owns "what is caviar bakhoor".
 *
 * The seven plates are Elixir's own process, from the client's technical
 * deck (2026-10-21): selection, cryogenic micro-refinement, the cold
 * process, the encapsulation and its thermal release. Their copy is the
 * deck's, with two corrections: the encapsulation is patent-pending (the
 * deck says "patented"; CLAUDE.md records patent-pending), and no ™ on
 * "Cryogenic Micro-Refinement" until a trademark is confirmed.
 *
 * Photographs on the plates are AI-generated illustrations (Higgsfield),
 * not photographs of Elixir's facility.
 *
 * Typed data, per CLAUDE.md: each plate becomes a Shopify metaobject.
 */

export type Img = { src: string; alt: string; width: number; height: number };

type PlateBase = {
  eyebrow: string;
  /** One entry per line. */
  title: string[];
  lede?: string;
  /** Dark plates alternate with light ones, as in the deck. */
  tone?: "dark";
  /** The footer's subject: "Caviar Bakhoor · <tag>". */
  tag: string;
  image?: Img;
  /** A second, smaller figure under the main one, with its caption. */
  inset?: Img & { caption: string };
};

export type Plate = PlateBase &
  (
    | { kind: "specs"; rows: { label: string; value: string }[] }
    | { kind: "steps"; rows: { label: string; value: string; note?: string }[] }
    | { kind: "stages"; stages: { label: string; caption: string; image: Img }[]; marks: string[] }
    | { kind: "anatomy"; callouts: { label: string; lines: string[] }[] }
    | { kind: "phases"; phases: { label: string; body: string; image: Img }[] }
  );

export const INNOVATION = {
  /* The booklet's cover lines (client, printed booklet). */
  eyebrow: "Revolutionizing the bakhoor experience",
  headline: ["What is", "Caviar Bakhoor?"],
  subhead: "Elevating bakhoor in a groundbreaking avatar",
  /** The direct answer, first: this is what a search result pulls. */
  answer:
    "Caviar Bakhoor is bakhoor reimagined in a long-lasting, highly diffusive form. Elixir's patent-pending encapsulation technology suspends fragrance inside a sphere that stays sealed at room temperature and opens under heat, pearls that release their aroma as they burn.",
  answerStrong: ["patent-pending encapsulation technology", "sealed at room temperature", "opens under heat"],
  marquee: ["Hojai, Assam", "Selection protocol", "Cryogenic micro-refinement", "200 µm", "Down to −100 °C", "Cold process", "Encapsulation", "Thermal release"],
  panel: { src: "/images/texture/pearl-macro.jpg", alt: "Caviar Bakhoor pearls, close, scattered with flakes of 24-karat gold", width: 2400, height: 1600 },
  footer: "Caviar Bakhoor",
  /** The close: content.md § Closing, with the booklet's line under it. */
  close: {
    eyebrow: "Caviar Bakhoor",
    lead: "Ready to try",
    line: "the new bakhoor?",
    sub: "A groundbreaking and luxurious way of Bakhoor, in the avatar of Caviar.",
    primary: { label: "Shop Caviar Bakhoor", href: "/collection" },
    secondary: { label: "Create with us", href: "/for-business" },
  },
};

const img = (file: string, alt: string, width = 1600, height = 2000): Img => ({
  src: `/images/innovation/${file}.jpg`,
  alt,
  width,
  height,
});
const disc = (file: string, alt: string) => img(file, alt, 1200, 1200);

export const PLATES: Plate[] = [
  {
    kind: "specs",
    eyebrow: "The innovation",
    title: ["Agarwood", "Micro-Pearls"],
    lede: "From naturally aged agarwood to fragrance-encapsulated bakhoor spheres.",
    rows: [
      { label: "Origin", value: "Hojai, Assam, India" },
      { label: "Procurement", value: "Contract-based sourcing" },
      { label: "Selection", value: "High resin, high density" },
      { label: "Ultra-fine refinement", value: "200 micron class" },
      { label: "Cryogenic processing", value: "Down to −100 °C" },
      { label: "Encapsulation", value: "Fragrance within agarwood" },
    ],
    tag: "Innovation laboratory",
    image: img("micro-pearls", "Aged agarwood beside glossy black pearls flecked with gold"),
  },
  {
    kind: "steps",
    tone: "dark",
    eyebrow: "Raw material science",
    title: ["The", "Selection Protocol"],
    lede: "Only the finest, resin-rich agarwood advances to our process.",
    rows: [
      { label: "Origin", value: "Hojai, Assam, India", note: "The heart of the world's agarwood" },
      { label: "Procurement", value: "Responsibly sourced", note: "through farmer contracts" },
      { label: "Grading", value: "Material classification", note: "by resin density" },
      { label: "Qualification", value: "High resin content", note: "Dense, sinking wood" },
      { label: "Final selection", value: "Premium grade agarwood", note: "with highest natural oil content" },
    ],
    tag: "Material selection",
    image: img("resin-agarwood", "Resin-rich agarwood, close, dark resin running through the grain"),
  },
  {
    kind: "specs",
    eyebrow: "Particle engineering",
    title: ["Cryogenic", "Micro-Refinement"],
    lede: "Transforming aged agarwood into ultra-fine particles without harming the oil content.",
    rows: [
      { label: "Cryogenic preconditioning", value: "Stabilize material at low temperature" },
      { label: "Specialized micronization", value: "Convert to ultra-fine particles" },
      { label: "Particle classification", value: "100 to 500 µm (target ~200 µm)" },
      { label: "Low-temperature stabilization", value: "Preserve volatile aromatic compounds" },
    ],
    tag: "Particle engineering",
    image: img("micronization", "A brass spatula pouring ultra-fine agarwood powder into a glass dish"),
    inset: { ...img("sieves", "Agarwood powder on a stack of test sieves", 1920, 1080), caption: "Classification by particle size" },
  },
  {
    kind: "steps",
    tone: "dark",
    eyebrow: "Low-temperature processing",
    title: ["The Cold Process"],
    lede: "A multi-stage, low-temperature process designed to protect the natural aromatic integrity of agarwood.",
    rows: [
      { label: "Primary conditioning", value: "−10 °C to −40 °C" },
      { label: "Secondary cryogenic processing", value: "−40 °C to −100 °C (liquid nitrogen)" },
      { label: "Particle classification", value: "100 to 500 µm" },
      { label: "Controlled pressing", value: "0 °C ± 5 °C" },
      { label: "Secondary freezing & suspension", value: "Freeze again, suspend in water, press" },
      { label: "Filtration & concentration", value: "Centrifugal filtration without heating" },
    ],
    tag: "Cryogenic processing",
    image: img("cold-process", "Liquid nitrogen vapour rolling over a steel cryogenic vessel"),
    inset: { ...img("centrifuge", "Centrifuge tubes holding a layered agarwood extract", 1920, 1080), caption: "Centrifugal filtration, no heat" },
  },
  {
    kind: "stages",
    eyebrow: "Advanced material transformation",
    title: ["Not Classical Bakhoor."],
    lede: "A precision-engineered process from wood to fragrance-encapsulated micro-pearls.",
    stages: [
      { label: "Naturally aged agarwood", caption: "Hojai, Assam, India", image: disc("stage-wood", "A piece of naturally aged agarwood") },
      { label: "Cryogenic micro-refinement", caption: "Ultra-fine particles (~200 µm)", image: disc("stage-powder", "A mound of ultra-fine agarwood powder") },
      { label: "Water → cryoextract → oil", caption: "Refined agarwood extract with proprietary formulation", image: disc("stage-oil", "A falling drop of golden agarwood oil") },
      { label: "Biotechnological encapsulation", caption: "Fragrance-encapsulated bakhoor spheres", image: disc("stage-pearls", "Glossy black pearls flecked with gold") },
    ],
    marks: ["No direct maceration", "No heat extraction", "No loss of aromatic integrity", "Engineered encapsulation"],
    tag: "Process differentiation",
  },
  {
    kind: "anatomy",
    tone: "dark",
    eyebrow: "Encapsulation technology",
    title: ["The Encapsulation", "Architecture"],
    lede: "An engineered micro-sphere with a dual-phase fragrance system.",
    callouts: [
      { label: "Outer layer", lines: ["Refined agarwood matrix", "High-resin, aromatic shell"] },
      { label: "Inner core", lines: ["Concentrated fragrance", "composition"] },
      { label: "Encapsulation matrix", lines: ["Patent-pending technology", "Biotechnological synthesis"] },
      { label: "Result", lines: ["Controlled release during", "thermal activation"] },
    ],
    tag: "Encapsulation architecture",
    image: img("architecture", "A pearl cut in half: an agarwood shell around an amber fragrance core"),
  },
  {
    kind: "phases",
    eyebrow: "The thermal activation principle",
    title: ["Two Phases.", "One Extraordinary Ritual."],
    lede: "A unique sequential fragrance release.",
    phases: [
      { label: "The agarwood awakens", body: "The outer agarwood layer warms, releasing its rich, resinous character.", image: disc("phase-awakens", "A pearl on a mesh over a glowing ember, a first wisp of smoke") },
      { label: "The fragrance unfolds", body: "Heat activates the encapsulated core, releasing the fragrance composition like a blooming wave.", image: disc("phase-unfolds", "Smoke blooming from a pearl as it opens over heat") },
      { label: "A layered olfactory experience", body: "A harmonious fusion of natural agarwood and the encapsulated fragrance, creating a deep, long-lasting aromatic experience.", image: disc("phase-layered", "Ribbons of smoke rising and intertwining") },
    ],
    tag: "Thermal fragrance delivery",
  },
];
