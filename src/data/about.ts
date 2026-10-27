/**
 * src/data/about.ts
 *
 * Copy and images for /about. Typed data rather than JSX, per CLAUDE.md.
 *
 * The house's story (opener, philosophy, disciplines, approach, the
 * integrated house, the partnership close) is the site owner's About page
 * concept, verbatim (Caviar_Bakhoor_About_Page_Concept.pdf, 2026-10-21),
 * including the founding year, 1947. Circle copy: content.md § What is
 * Caviar Bakhoor, § The collection, § The ritual.
 */

export const ABOUT = {
  eyebrow: "The house behind the innovation",
  headline: ["Rooted in tradition.", "Driven by discovery."],
  lede: "An extraordinary understanding of oriental aromatics. An uncompromising pursuit of fragrance innovation.",
  signature: { house: "Elixir Signature Scents", founded: "Est. 1947" },
  /** The founder's note (site owner, 2026-10-27), verbatim; "Caviar Bakhoo"
   *  in the supplied title corrected to "Caviar Bakhoor". The portrait is
   *  the supplied photograph, resized only: nothing about the person is
   *  altered. */
  founder: {
    eyebrow: "A note from the founder",
    opening: "Bakhoor deserves much more.",
    paragraphs: [
      "I didn't set out to make another bakhoor. I wanted to change what bakhoor could become.",
      "A more opulent experience. A new way to enjoy bakhoor. A category that belongs in perfumery houses around the world.",
      "I envision a future where every perfumery house has a dedicated Caviar Bakhoor collection of its own.",
    ],
    closing: "Caviar Bakhoor is ready for the world.",
    name: "Swaraj R. Sunku",
    role: "Founder, Caviar Bakhoor",
    image: {
      src: "/images/about/founder.jpg",
      alt: "Swaraj R. Sunku, founder of Caviar Bakhoor, eyes closed over smouldering agarwood, smoke rising, pieces of agarwood beside him",
      width: 1600,
      height: 2400,
    },
  },
  philosophy: {
    eyebrow: "Our philosophy",
    lines: ["We understand the past.", "We engineer what comes next."],
    /** Set in italic within its line. */
    em: "engineer",
    body: "Our foundation is built on generations of agarwood expertise. Our future is shaped by master perfumery, research-led innovation and precision manufacturing.",
  },
  disciplines: {
    eyebrow: "What defines us",
    title: "Our Disciplines.",
    lede: "Expertise across every stage of fragrance creation.",
    items: [
      { title: "Agarwood Heritage", body: "Generations of expertise in rare and resinous aromatics." },
      { title: "Master Perfumery", body: "In-house fragrance creation and olfactory development." },
      { title: "Research & Development", body: "Dedicated laboratories and formulation expertise." },
      { title: "Biotechnological Innovation", body: "Advanced fragrance processing and encapsulation research." },
      { title: "Precision Manufacturing", body: "Integrated facilities engineered for consistency and scale." },
      { title: "Bespoke Development", body: "End-to-end fragrance and product creation for partners." },
    ],
  },
  approach: {
    eyebrow: "Our approach",
    lines: ["Not just fragrance makers.", "Creators of possibility."],
    body: ["From the first formulation to the final creation.", "All under one house."],
  },
  integrated: {
    eyebrow: "The integrated house",
    title: ["From imagination", "to realization."],
    steps: ["Concept", "Research", "Perfumery", "Engineering", "Production", "Finished Creation"],
  },
  partnership: {
    eyebrow: "A partnership in innovation",
    lines: ["Your vision.", "Our expertise.", "One extraordinary creation."],
    cta: { label: "Create with us", href: "/for-business" },
  },
  opener: {
    src: "/images/shoot/all-four-boxes-marble.jpg",
    alt: "The four Caviar Bakhoor boxes on white marble",
    width: 2400,
    height: 1349,
  },
  house: {
    title: "The house",
    statement:
      "Elixir Signature Scents develops and manufactures fragrance with the discipline of a laboratory. Every formulation is built in our fully integrated fragrance R&D facility, from pure agarwood we source responsibly and grade in-house. Caviar Bakhoor is the result: a patent-pending encapsulation technology that transforms scent into pearls, set with pure 24-karat gold.",
    strong: ["fully integrated fragrance R&D facility", "source responsibly and grade in-house", "patent-pending encapsulation technology"],
  },
  /** The ledger. A null value renders the visible [CONFIRM] marker. */
  facts: [
    { label: "House", value: "Elixir Signature Scents" },
    { label: "Category", value: "Caviar Bakhoor" },
    { label: "Product line", value: "Caviar Bakhoor" },
    { label: "Technology", value: "Patent-pending encapsulation" },
    { label: "R&D", value: "Fully integrated fragrance R&D facility" },
    { label: "Raw material", value: "Pure agarwood, responsibly sourced" },
    { label: "Oud grading", value: "In-house" },
    { label: "Fragrances", value: "Noir · Ward Baccarat · Imperial Zafran · Amber Blanc" },
    { label: "Founded", value: "1947" },
    { label: "Certifications", value: null },
  ] as { label: string; value: string | null }[],

  /** The booklet's second spread, recreated: three gold-framed photographs
   *  with its captions, verbatim ("complimenting" corrected to
   *  "complementing"). The photographs are the same shots the booklet uses,
   *  from the raw shoot. */
  booklet: {
    lead: "Using our patent-pending encapsulation technology, we have blended rare, natural, sustainably sourced, aged oud with expertly crafted natural fragrances.",
    items: [
      {
        caption: "The caviar is enriched with pure 24k gold, enhancing its royalty.",
        image: { src: "/images/about/gallery-01.jpg", alt: "Caviar Bakhoor pearls scattered with flakes of 24-karat gold", width: 1600, height: 1067 },
      },
      {
        caption: "A groundbreaking and luxurious way of Bakhoor, in the avatar of Caviar.",
        image: { src: "/images/shoot/noir-open-overhead.jpg", alt: "The Noir box open, from above, the tin seated in its gold frame", width: 2400, height: 1600 },
      },
      {
        caption: "This seamless experience kit comes with the Caviar, Foil, and a complementing golden spoon.",
        image: { src: "/images/shoot/ward-baccarat-set.jpg", alt: "The Ward Baccarat kit: the box, the open tin, the golden spoon and the foil", width: 2400, height: 1600 },
      },
    ],
  },
  circles: [
    {
      title: "Caviar Bakhoor",
      kicker: "The category",
      body: "Caviar Bakhoor reimagines traditional bakhoor in a long-lasting, highly diffusive form. Our patent-pending encapsulation technology transforms its scent into pearls.",
      href: "/innovation",
      cta: "Read about the innovation",
      image: { src: "/images/about/circle-pearls.jpg", alt: "Pearls and gold leaf", width: 1000, height: 1000 },
    },
    {
      title: "The collection",
      kicker: "Four Caviar’s",
      body: "Four Caviar’s. One new category. Noir, Ward Baccarat, Imperial Zafran and Amber Blanc. Each reveals its character slowly as they are warmed.",
      href: "/collection",
      cta: "Shop the collection",
      image: { src: "/images/about/circle-tins.jpg", alt: "The four tins", width: 1000, height: 1000 },
    },
    {
      title: "The ritual",
      kicker: "Four steps",
      body: "Light, place, spoon, release. Each tin holds a collection of fragrant caviar pearls that reveal their character slowly as they are warmed.",
      href: "/ritual",
      cta: "See the full ritual",
      image: { src: "/images/shoot/noir-open-overhead-square.jpg", alt: "The Noir box open, from above", width: 1200, height: 1200 },
    },
  ],
};
