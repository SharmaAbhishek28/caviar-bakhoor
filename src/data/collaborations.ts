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
 * public/images/projects/<id>/.
 */

type Img = { src: string; alt: string; width: number; height: number };

export type CaseStudy = {
  id: string;
  client: string;
  /** The name set large on the cover, when it is not the client's (an
   *  unnamed client is shown by its product line). Defaults to `client`. */
  title?: string;
  /** Set the name as the client writes it (e.g. "tripleA"), not in caps. */
  keepCase?: boolean;
  /** Left out where it would identify an unnamed client. */
  origin?: string;
  /** Two-letter country code: the flag shown beside the origin, from
   *  public/images/flags/<code>.svg (flag-icons, MIT). */
  flag?: string;
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
  variants?: {
    name: string;
    color: string;
    image: Img;
    /** "label": a front-on lid, clipped to its outline on a black disc.
     *  "photo": the whole tin, on a white disc. Default "label". */
    show?: "label" | "photo";
  }[];
  /** Everything else, on a scrolling track. */
  gallery?: Img[];
};

const sarib = (file: string, alt: string, size = 750): Img => ({
  src: `/images/projects/sarib/${file}.jpg`,
  alt,
  width: size,
  height: size,
});

const tripleA = (file: string, alt: string, square = false): Img => ({
  src: `/images/projects/triple-a/${file}.jpg`,
  alt,
  width: square ? 800 : 900,
  height: square ? 800 : 1200,
});

const fanAlOud = (file: string, alt: string, width: number, height: number): Img => ({
  src: `/images/projects/fan-al-oud/${file}.jpg`,
  alt,
  width,
  height,
});

export const COLLABORATIONS: CaseStudy[] = [
  {
    id: "sarib",
    client: "Sarib",
    origin: "Saudi Arabia",
    flag: "sa",
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
  {
    id: "triple-a",
    client: "tripleA",
    keepCase: true,
    origin: "United Arab Emirates",
    flag: "ae",
    line: "Caviar Incense Collection",
    summary:
      "For tripleA Perfumes, the Emirati fragrance house, Elixir made the Caviar Incense Collection: Caviar Bakhoor in three compositions, Amber, Oud and Saffron, a hundred grams to each tin, presented in tripleA's burgundy gift box with a gold spoon.",
    strong: ["Caviar Incense Collection", "Amber, Oud and Saffron"],
    facts: [
      { label: "Client", value: "tripleA Perfumes" },
      { label: "Origin", value: "United Arab Emirates" },
      { label: "Line", value: "Caviar Incense Collection" },
      { label: "Compositions", value: "Amber · Oud · Saffron" },
    ],
    cover: tripleA("oud-set", "tripleA Caviar Incense, Oud: the burgundy gift box, the tin and a gold spoon"),
    feature: tripleA("saffron-set", "tripleA Caviar Incense, Saffron: the gift box, the gold tin and a gold spoon"),
    variants: [
      { name: "Amber", color: "#8e8fa3", image: tripleA("amber-lid", "The tripleA Amber tin", true), show: "photo" },
      { name: "Oud", color: "#22232b", image: tripleA("oud-lid", "The tripleA Oud tin", true), show: "photo" },
      { name: "Saffron", color: "#b08a3a", image: tripleA("saffron-lid", "The tripleA Saffron tin", true), show: "photo" },
    ],
    gallery: [
      tripleA("gift-set", "The tripleA gift chest in gold lacquer, open: the Saffron, Amber and Oud tins, a black burner, three gold spoons, a mesh disc and the card"),
      tripleA("saffron-case", "The Saffron case in burgundy lacquer, open: the tin, a gold spoon, a mesh disc and a cloth"),
      tripleA("amber-box", "The Amber gift box with its silver label"),
      tripleA("oud-box", "The Oud gift box with its black label"),
      tripleA("saffron-box", "The Saffron gift box with its gold label"),
      tripleA("amber-open", "The Amber gift box open, the tin and spoon inside"),
      tripleA("oud-open", "The Oud gift box open, the tin and spoon inside"),
      tripleA("saffron-open", "The Saffron gift box open, the tin and spoon inside"),
      tripleA("amber-set", "The Amber tin and spoon before its gift box"),
      tripleA("amber-box-front", "The tripleA gift box, front"),
      tripleA("oud-box-front", "The tripleA gift box with the Oud band"),
      tripleA("saffron-box-front", "The tripleA gift box with the Saffron band"),
      tripleA("amber-back", "The back of the Amber box: ingredients and directions of use"),
      tripleA("oud-back", "The back of the Oud box"),
      tripleA("saffron-back", "The back of the Saffron box"),
    ],
  },
  {
    /* Shown as Oud Gourmet, at the site owner's direction (2026-10-24); the
       house's own name stays blurred out of the photograph. */
    id: "oud-gourmet",
    client: "Oud Gourmet",
    line: "Vibrance Vue Bakhoor",
    summary:
      "For Oud Gourmet, Elixir made Vibrance Vue Bakhoor: Caviar Bakhoor under the line \"a new era of oud\", in a black tin and a white gift box embossed with OUD, finished in black and white.",
    strong: ["Vibrance Vue Bakhoor", "a new era of oud"],
    facts: [
      { label: "Client", value: "Oud Gourmet" },
      { label: "Line", value: "Caviar Bakhoor" },
      { label: "Product", value: "Vibrance Vue Bakhoor" },
    ],
    cover: {
      src: "/images/projects/oud-gourmet/set.jpg",
      alt: "Oud Gourmet, Vibrance Vue Bakhoor: a white gift box embossed with OUD, its sleeve, and an open black tin of pearls",
      width: 1024,
      height: 724,
    },
  },
  {
    id: "fan-al-oud",
    client: "Fan Al Oud",
    origin: "United Arab Emirates",
    flag: "ae",
    line: "Caviar Collection",
    summary:
      "For Fan Al Oud, the Emirati oud house, Elixir made the Caviar Collection: Caviar Bakhoor in two compositions, Oud Khas and Oud Amiri, each tin set with a gold spoon and a mesh disc in a black and gold gift box, an illustrated card inside showing the ritual.",
    strong: ["Caviar Collection", "Oud Khas and Oud Amiri"],
    facts: [
      { label: "Client", value: "Fan Al Oud" },
      { label: "Origin", value: "United Arab Emirates" },
      { label: "Line", value: "Caviar Collection" },
      { label: "Compositions", value: "Oud Khas · Oud Amiri" },
    ],
    cover: fanAlOud("amiri-lava", "Fan Al Oud Oud Amiri: an open tin of pearls on volcanic stone, smoke rising, a gold spoon beside it", 959, 1600),
    feature: fanAlOud("amiri-hands", "Hands holding a Fan Al Oud Oud Amiri tin, a burner and the gift box on the table", 947, 1600),
    variants: [
      { name: "Oud Khas", color: "#1d4a3a", image: fanAlOud("khas-kit", "The Oud Khas set: the tin, a gold spoon with a green handle, a mesh disc and a small black box", 1080, 1080), show: "photo" },
      { name: "Oud Amiri", color: "#a8834a", image: fanAlOud("amiri-kit", "The Oud Amiri set: the tin, a gold spoon with a black handle, a mesh disc and a small black box", 1080, 1080), show: "photo" },
    ],
    gallery: [
      fanAlOud("khas-spoon", "A gold spoon lifting pearls from the Oud Khas tin, on slate", 952, 1600),
      fanAlOud("gift-box-open", "The Fan Al Oud gift box open: the tin, spoon and mesh disc, the ritual card in the lid", 1080, 1080),
      fanAlOud("khas-marble", "Oud Khas on marble, beside a piece of agarwood, smoke rising", 899, 1599),
      fanAlOud("ritual", "A man tending a burner, smoke rising", 1080, 1440),
      fanAlOud("khas-satin", "Two Oud Khas tins on black satin, one open", 964, 1600),
      fanAlOud("gift-box-table", "A woman with the Fan Al Oud gift box and an open tin", 1076, 1344),
      fanAlOud("khas-burner", "Oud Khas on dark marble before a brass burner", 1080, 1428),
    ],
  },
];
