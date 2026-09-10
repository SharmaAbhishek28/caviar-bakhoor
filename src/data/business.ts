/**
 * src/data/business.ts
 *
 * /for-business copy and options. Typed data, per CLAUDE.md.
 *
 * Sources, all verbatim: docs/content.md § For Business (headline, line,
 * who we work with, what we offer, process, enquiry) and docs/homepage.md
 * § 04 (the case paragraph, "Made for your brand", the second paragraph).
 *
 * "What we offer" carries [CONFIRM each capability] in content.md — the
 * cards show the marker until the client confirms Elixir has delivered it.
 * "Collaborations" carries [CONFIRM all four, with permission] — no brand is
 * named; every card is a slot with stand-in photography.
 * The brief's subhead "MADE IN-HOUSE FOR BRANDS WORLDWIDE" is not used:
 * "worldwide" is a claim nobody has confirmed.
 */

export const BUSINESS = {
  eyebrow: "For business",
  headline: { first: "Your fragrance.", second: "Our innovation." },
  line: "Create your own Caviar Bakhoor with Elixir.",
  cta: "Start a project",
  opener: { src: "/images/texture/pearl-macro.jpg", alt: "Pearls and gold leaf, close", width: 2400, height: 1600 },

  statement:
    "Elixir develops and manufactures Caviar Bakhoor for perfume houses, luxury brands, hotels and private label. Your scent, your packaging, our encapsulation. From the first brief to the finished tin, the work is done by the same hands that make Elixir's own.",

  clients: {
    title: "Who we work with",
    items: ["Perfume houses", "Luxury brands", "Hotels and hospitality", "Retailers", "Private label", "Corporate gifting"],
  },

  offer: {
    title: "What we offer",
    note: "[CONFIRM] Each capability stays marked until the client confirms Elixir has delivered it.",
    items: [
      "Custom fragrance development",
      "Caviar Bakhoor development",
      "Private label manufacturing",
      "Custom packaging",
      "Bespoke collections",
      "Commercial production",
    ],
  },

  process: {
    title: "Process",
    lead: "Genuinely sequential, so numbered.",
    steps: [
      { name: "Discover", body: "the brand, the brief, the market" },
      { name: "Develop", body: "the fragrance and the format" },
      { name: "Sample", body: "prototypes in your hands" },
      { name: "Refine", body: "product and packaging locked" },
      { name: "Produce", body: "into production" },
    ],
  },

  made: {
    headline: { first: "Made for", second: "your brand" },
    paragraph:
      "Beyond the four we sell, we build Caviar Bakhoor for other names — custom fragrance, custom tin, custom box. Development, sampling, refinement and production, in sequence, with one point of contact throughout.",
    rows: [
      { title: "Custom fragrance", body: "Your scent, encapsulated into pearls and set with 24-karat gold.", image: { src: "/images/about/circle-pearls.jpg", alt: "Pearls and gold leaf", width: 1000, height: 1000 } },
      { title: "Custom tin", body: "The tin, its lid and its label — yours.", image: { src: "/images/about/gallery-03.jpg", alt: "The four tins fanned on their boxes", width: 1600, height: 1067 } },
      { title: "Custom box", body: "The box and everything in it: charcoal, mesh disc, spoon, card.", image: { src: "/images/about/gallery-02.jpg", alt: "Tins and boxes, stacked", width: 1600, height: 913 } },
    ],
  },

  collabs: {
    title: "Collaborations",
    note: "[CONFIRM] All four, with written permission to name each one. Until then: slots, with stand-in photography.",
    items: [1, 2, 3, 4].map((i) => ({
      id: `collab-${i}`,
      brand: null as string | null,
      copy: null as string | null,
      image: { src: `/images/about/gallery-0${i + 4}.jpg`, alt: "Stand-in photograph until the collaboration is confirmed", width: 1600, height: 1067 },
    })),
  },

  enquiry: { title: "Start a project", line: "Tell us about the brand, the brief and the market." },
};
