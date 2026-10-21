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
 * Steps 01, 02 and 04 and the charcoal tile are stills from the client's own
 * film (public/images/shoot/ritual-*.jpg), cropped above its subtitles.
 */

export const RITUAL_PAGE = {
  eyebrow: "The ritual",
  headline: ["Four steps.", "No aroma", "until you want it."],
  lede: "Every box arrives with the charcoal, the mesh disc and the spoon.",

  /** One photograph per step, in step order. */
  stepImages: [
    { src: "/images/shoot/ritual-light.jpg", alt: "A torch lighting the charcoal in the white burner, the tin, spoon and tongs beside it", width: 1200, height: 1500 },
    { src: "/images/shoot/ritual-place.jpg", alt: "Gold tongs resting a silver disc over the lit charcoal in the burner", width: 1200, height: 1500 },
    { src: "/images/packaging/spoon-01.jpg", alt: "The gold spoon lifting a measure of pearls from the tin", width: 1200, height: 1905 },
    { src: "/images/shoot/ritual-release.jpg", alt: "Smoke lifting from the burner as the pearls warm", width: 1200, height: 1500 },
  ],

  box: {
    title: "In the box",
    items: [
      { name: "Caviar Bakhoor tin", image: { src: "/images/shoot/amber-blanc-front-square.jpg", alt: "The Amber Blanc box and tin, front on", width: 1200, height: 1200 } },
      { name: "Charcoal block", image: { src: "/images/shoot/ritual-charcoal-square.jpg", alt: "Gold tongs setting the charcoal block in the burner", width: 1200, height: 1200 } },
      { name: "Gold mesh disc", image: { src: "/images/box/mesh-studio.jpg", alt: "The double-layered mesh, gold and silver in a quilted pattern, resting on the burner", width: 1200, height: 1200 } },
      { name: "Gold serving spoon", image: { src: "/images/shoot/amber-blanc-spoon-square.jpg", alt: "The gold spoon with its marbled handle, beside a disc of foil", width: 1200, height: 1200 } },
      { name: "Instruction card", image: { src: "/images/ritual/card-directions.jpg", alt: "Elixir's Directions of use card", width: 1400, height: 933 } },
    ],
  },

  heat: {
    title: "No aroma until you want it.",
    lede: "Our patent-pending encapsulation technology transforms scent into pearls that release their aroma as they burn, long-lasting and highly diffusive.",
    states: [
      { name: "Sealed", body: "Closed at room temperature." },
      { name: "On the burner", body: "Rest the gold mesh disc over the heat." },
      { name: "The pearl opens", body: "Heat opens it slowly." },
      { name: "The scent lifts", body: "Long-lasting and highly diffusive: the aroma released as the pearls burn." },
    ],
  },

  objects: {
    title: "The objects",
    columns: [
      [
        { src: "/images/shoot/pearls-macro-03.jpg", alt: "Pearls and gold leaf", width: 2400, height: 1600 },
        { src: "/images/shoot/ward-baccarat-open-overhead.jpg", alt: "The Ward Baccarat box open, from above", width: 2400, height: 1600 },
        { src: "/images/shoot/amber-blanc-set.jpg", alt: "The Amber Blanc box, the open tin, the spoon and a disc of foil", width: 2400, height: 1600 },
      ],
      [
        { src: "/images/shoot/noir-open-overhead.jpg", alt: "The Noir box open, from above", width: 2400, height: 1600 },
        { src: "/images/shoot/ward-baccarat-set.jpg", alt: "The Ward Baccarat box, the open tin, the spoon and a disc of foil", width: 2400, height: 1600 },
        { src: "/images/ritual/card-front.jpg", alt: "The card, front", width: 1400, height: 933 },
      ],
      [
        { src: "/images/shoot/four-boxes-overhead.jpg", alt: "The four boxes, from above", width: 2400, height: 1600 },
        { src: "/images/shoot/amber-blanc-open-overhead.jpg", alt: "The Amber Blanc box open, from above", width: 2400, height: 1600 },
        { src: "/images/shoot/imperial-zafran-open-overhead.jpg", alt: "The Imperial Zafran box open, from above", width: 2400, height: 1600 },
      ],
    ],
  },

  close: {
    lead: "Ready to try",
    line: "the new bakhoor?",
    primary: { label: "Shop Caviar Bakhoor", href: "/collection" },
  },
};
