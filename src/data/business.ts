import { SHOOT_BOX_SEQUENCE } from "./shoot";
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
  headline: { first: "Your brand.", second: "Our innovation." },
  line: "Create your own Caviar Bakhoor with us.",
  cta: "Start a project",
  opener: { src: "/images/shoot/pearls-macro-03.jpg", alt: "Pearls and gold leaf, close", width: 2400, height: 1600 },

  statement:
    "Elixir develops and manufactures Caviar Bakhoor for perfume houses, luxury brands and private label. Your idea, your brand, your vision. Our execution.",

  clients: {
    title: "Who we work with",
    items: ["Perfume houses", "Luxury brands", "Retailers", "Private label", "Corporate gifting"],
  },

  offer: {
    title: "What we offer",
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
  // The client's timeline (site owner, 2026-10-21), rephrased.
  process: {
    title: "Timeline",
    lead: "From first brief to commercial dispatch in thirty days.",
    steps: [
      { name: "Discover your scent", body: "Days 0 to 7. Create or refine your fragrance with our master perfumers." },
      { name: "Sample and evaluate", body: "Days 7 to 10. Receive your Caviar Bakhoor samples and assess them in use." },
      { name: "Design and approve", body: "Days 10 to 15. Develop your tin and packaging, and sign off each detail." },
      { name: "Confirm and dispatch", body: "Days 15 to 30. Final confirmation, then commercial production and dispatch." },
    ],
  },

  made: {
    headline: { first: "Tailored collection", second: "development" },
    paragraph:
      "Elixir creates Caviar Bakhoor collections for your brand from start to finish. We develop and refine your scent, create custom tins and boxes, and manage production with one point of contact throughout.",
    rows: [
      { title: "Custom fragrance", body: "Your scent, transformed into pearls by our patent-pending encapsulation technology." },
      { title: "Custom tin", body: "The tin, its lid and its label, all yours." },
      { title: "Custom box", body: "The box and everything in it: charcoal, mesh disc, spoon, card." },
    ],
    /** The five box photographs from the shoot; the picture steps through
     *  them as the rows scroll (site owner, 2026-10-24). */
    images: SHOOT_BOX_SEQUENCE,
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
