/**
 * src/data/about.ts
 *
 * Copy and images for /about. Typed data rather than JSX, per CLAUDE.md.
 *
 * Almost everything a house page usually claims — founding year, facility,
 * R&D, certifications — is [CONFIRM] in docs/content.md § Elixir. So the
 * page is built from what is verifiable: the house name, the category, the
 * product line, the four fragrances, the ritual, the shoot. The facts ledger
 * shows its markers until the client fills them in.
 *
 * Headline: content.md § Elixir, verbatim. Lede and circle copy: content.md
 * § Hero, § What is Caviar Bakhoor, § The collection, § The ritual.
 */

export const ABOUT = {
  eyebrow: "Elixir Signature Scents",
  headline: ["A perfume house", "that builds", "what it sells."],
  lede: "Caviar Bakhoor reimagines traditional bakhoor in a long-lasting, highly diffusive form — pearls that release their aroma as they burn.",
  opener: {
    src: "/images/texture/pearl-macro.jpg",
    alt: "Macro of Caviar Bakhoor pearls scattered with flakes of 24-karat gold leaf",
    width: 2400,
    height: 1600,
  },
  house: {
    title: "The house",
    statement:
      "Elixir Signature Scents makes Caviar Bakhoor: a patent-pending encapsulation technology that transforms scent into pearls, set with pure 24-karat gold. Handmade. Four Caviar’s to start — Noir, Ward Baccarat, Imperial Zafran and Amber Blanc.",
    strong: ["patent-pending encapsulation technology", "24-karat gold", "Handmade"],
  },
  /** The ledger. A null value renders the visible [CONFIRM] marker. */
  facts: [
    { label: "House", value: "Elixir Signature Scents" },
    { label: "Category", value: "Caviar Bakhoor" },
    { label: "Product line", value: "Caviar Bakhoor" },
    { label: "Technology", value: "Patent-pending encapsulation" },
    { label: "Fragrances", value: "Noir · Ward Baccarat · Imperial Zafran · Amber Blanc" },
    { label: "Founded", value: null },
    { label: "Facility", value: null },
    { label: "In-house R&D", value: null },
    { label: "Certifications", value: null },
  ] as { label: string; value: string | null }[],
  gallery: {
    title: "The shoot",
    items: [
      { src: "/images/about/gallery-01.jpg", alt: "Pearls and gold leaf, close", width: 1600, height: 1067 },
      { src: "/images/about/gallery-02.jpg", alt: "Caviar Bakhoor tins and boxes, stacked", width: 1600, height: 1067 },
      { src: "/images/about/gallery-03.jpg", alt: "The four tins fanned on their boxes", width: 1600, height: 1067 },
      { src: "/images/about/gallery-04.jpg", alt: "Tins resting on the boxes, from above", width: 1600, height: 1067 },
      { src: "/images/about/gallery-05.jpg", alt: "Elixir oud incense boxes with the gold holder", width: 1600, height: 1067 },
      { src: "/images/about/gallery-06.jpg", alt: "Oud incense boxes, sticks and the holder, laid out", width: 1600, height: 1067 },
      { src: "/images/about/gallery-07.jpg", alt: "The long gift box with the gold holder", width: 1600, height: 1067 },
      { src: "/images/about/gallery-08.jpg", alt: "Caviar Bakhoor boxes and tins on a shelf", width: 1600, height: 1067 },
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
      body: "Four Caviar’s. One new category. Noir, Ward Baccarat, Imperial Zafran and Amber Blanc — each reveals its character slowly as they are warmed.",
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
      image: { src: "/images/products/noir-open.jpg", alt: "The Noir box open, tin and spoon inside", width: 1200, height: 1200 },
    },
  ],
  close: {
    lead: "Ready to try",
    line: "the new bakhoor?",
    primary: { label: "Shop Caviar Bakhoor", href: "/collection" },
    secondary: { label: "Create with us", href: "/contact" },
  },
};
