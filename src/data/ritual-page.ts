/**
 * src/data/ritual-page.ts
 *
 * /ritual copy and images. The steps themselves live in ritual.ts (shared
 * with the home page); this holds what the page adds: the photograph for
 * each step, the box contents, the heat line's four states, the objects.
 *
 * Copy: docs/content.md § The ritual and § What is Caviar Bakhoor, § The
 * innovation, verbatim. Nothing about burn time or how long the scent holds
 * is stated — that is the [CONFIRM] in content.md.
 *
 * Charcoal has no photograph in the shoot; its tile says so rather than
 * borrowing an image of something else.
 */

export const RITUAL_PAGE = {
  eyebrow: "The ritual",
  headline: ["Four steps.", "No smoke", "until you want it."],
  lede: "Every box arrives with the charcoal, the mesh disc and the spoon.",

  /** One photograph per step, in step order. */
  stepImages: [
    { src: "/images/ritual/ritual-01.jpg", alt: "The tin, the gold spoon and the mesh packet, laid out", width: 2400, height: 1600 },
    { src: "/images/products/noir-open.jpg", alt: "The Noir box open, the tin seated inside beside its spoon", width: 1200, height: 1200 },
    { src: "/images/packaging/spoon-01.jpg", alt: "The gold spoon lifting a measure of pearls from the tin", width: 1200, height: 1905 },
    { src: "/images/texture/pearl-macro.jpg", alt: "Pearls and flakes of 24-karat gold, close", width: 2400, height: 1600 },
  ],
  /** Step 02 names the mesh disc; Elixir's own card says gold foil. */
  stepConfirm: { index: 1, note: "[CONFIRM] content.md says gold mesh disc; the Directions of use card says gold foil." },

  box: {
    title: "In the box",
    items: [
      { name: "Caviar Bakhoor tin", image: { src: "/images/products/noir-front.jpg", alt: "The Noir tin, front on", width: 1200, height: 1200 } },
      { name: "Charcoal block", image: null, note: "[CONFIRM] no photograph in the shoot" },
      { name: "Gold mesh disc", image: { src: "/images/ritual/ritual-01.jpg", alt: "The mesh packet beside the tin and spoon", width: 2400, height: 1600 }, confirm: "[CONFIRM] mesh disc / gold foil" },
      { name: "Gold serving spoon", image: { src: "/images/packaging/spoon-01.jpg", alt: "The gold spoon over the open tin", width: 1200, height: 1905 } },
      { name: "Instruction card", image: { src: "/images/ritual/card-directions.jpg", alt: "Elixir's Directions of use card", width: 1400, height: 933 } },
    ],
  },

  heat: {
    title: "No smoke until you want it.",
    lede: "The pearls are made by suspending fragrance oil inside a sphere that stays sealed at room temperature and opens under heat.",
    states: [
      { name: "Sealed", body: "Closed at room temperature." },
      { name: "On the burner", body: "Rest the gold mesh disc over the heat." },
      { name: "The pearl opens", body: "Heat opens it slowly." },
      { name: "The scent lifts", body: "A scent that unfolds instead of erupting — and lasts." },
    ],
  },

  objects: {
    title: "The objects",
    columns: [
      [
        { src: "/images/about/gallery-01.jpg", alt: "Pearls and gold leaf", width: 1600, height: 1067 },
        { src: "/images/products/ward-baccarat-open.jpg", alt: "The Ward Baccarat box open", width: 1200, height: 1200 },
        { src: "/images/about/gallery-07.jpg", alt: "The long gift box with the gold holder", width: 1600, height: 974 },
      ],
      [
        { src: "/images/products/imperial-zafran-portrait.jpg", alt: "The Imperial Zafran box, tin and spoon", width: 1200, height: 1600 },
        { src: "/images/about/gallery-04.jpg", alt: "Tins resting on the boxes", width: 1600, height: 1067 },
        { src: "/images/ritual/card-front.jpg", alt: "The card, front", width: 1400, height: 933 },
      ],
      [
        { src: "/images/about/gallery-05.jpg", alt: "Oud boxes with the gold holder", width: 1600, height: 1067 },
        { src: "/images/products/amber-blanc-front.jpg", alt: "The Amber Blanc box and tin", width: 1200, height: 1200 },
        { src: "/images/about/gallery-08.jpg", alt: "Caviar Bakhoor boxes on a shelf", width: 1600, height: 877 },
      ],
    ],
  },

  close: {
    lead: "Ready to try",
    line: "the new bakhoor?",
    primary: { label: "Shop Caviar Bakhoor", href: "/collection" },
    secondary: { label: "The four fragrances", href: "/collection#noir" },
  },
};
