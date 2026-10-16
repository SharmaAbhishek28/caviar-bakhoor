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

/** A collaboration card's look, in the brand's own identity. */
export type CollabTheme = {
  /** Card background, under the photograph. */
  bg: string;
  /** Brand name and copy. */
  fg: string;
  /** The meta line. Defaults to `fg`. */
  accent?: string;
  /** Font-family stack for the brand name. Defaults to Bodoni. */
  font?: string;
};

export const BUSINESS = {
  eyebrow: "For business",
  headline: { first: "Your brand.", second: "Our innovation." },
  line: "Create your own Caviar Bakhoor with Elixir.",
  cta: "Start a project",
  opener: { src: "/images/texture/pearl-macro.jpg", alt: "Pearls and gold leaf, close", width: 2400, height: 1600 },

  statement:
    "Elixir develops and manufactures Caviar Bakhoor for perfume houses, luxury brands and private label. Your idea, your brand, your vision. Our execution.",

  clients: {
    title: "Who we work with",
    items: ["Perfume houses", "Luxury brands", "Retailers", "Private label", "Corporate gifting"],
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

  // Steps 01 and 03 and their durations are the site owner's (2026-10-15).
  // Step 02, step 05 and the packaging duration are awaiting the client.
  process: {
    title: "Timeline",
    lead: "Genuinely sequential, so numbered.",
    steps: [
      { name: "Discover or create a scent with us", body: "7 days" },
      { name: "[CONFIRM] Step 02", body: "[CONFIRM] Duration" },
      { name: "Caviar approval", body: "14 days" },
      { name: "Packaging approval", body: "[CONFIRM] Duration" },
      { name: "[CONFIRM] Step 05", body: "[CONFIRM] Duration" },
    ],
  },

  made: {
    headline: { first: "Tailored collection", second: "development" },
    paragraph:
      "Elixir creates Caviar Bakhoor collections for your brand from start to finish. We develop and refine your scent, create custom tins and boxes, and manage production with one point of contact throughout.",
    rows: [
      { title: "Custom fragrance", body: "Your scent, transformed into pearls by our patent-pending encapsulation technology.", image: { src: "/images/about/circle-pearls.jpg", alt: "Pearls and gold leaf", width: 1000, height: 1000 } },
      { title: "Custom tin", body: "The tin, its lid and its label — yours.", image: { src: "/images/about/gallery-03.jpg", alt: "The four tins fanned on their boxes", width: 1600, height: 1067 } },
      { title: "Custom box", body: "The box and everything in it: charcoal, mesh disc, spoon, card.", image: { src: "/images/about/gallery-02.jpg", alt: "Tins and boxes, stacked", width: 1600, height: 913 } },
    ],
  },

  collabs: {
    title: "Collaborations",
    note: "[CONFIRM] All four, with written permission to name each one. Until then: slots, with stand-in photography.",
    // Each card is themed in the brand's own colours and font. Until the
    // client supplies them, every card uses the site's ash and paper and
    // falls back to Bodoni. `font` is a CSS font-family stack: add the
    // brand's face to app/fonts.ts (self-hosted) and reference its variable.
    items: [1, 2, 3, 4].map((i) => ({
      id: `collab-${i}`,
      brand: null as string | null,
      copy: null as string | null,
      image: { src: `/images/about/gallery-0${i + 4}.jpg`, alt: "Stand-in photograph until the collaboration is confirmed", width: 1600, height: 1067 },
      theme: { bg: "#08070A", fg: "#EFEEEB" } as CollabTheme,
    })),
  },

  enquiry: { title: "Start a project", line: "Tell us about the brand, the brief and the market." },

  // The enquiry is a WhatsApp chat rather than a form (site owner, 2026-10-16).
  // The number is +91 98864 78926 from data/enquiry.ts; it lives only in the
  // link and is never displayed.
  whatsapp: {
    label: "Chat on WhatsApp",
    number: "919886478926",
    message: "Hello Elixir, I'd like to start a Caviar Bakhoor project for my brand.",
  },
};
