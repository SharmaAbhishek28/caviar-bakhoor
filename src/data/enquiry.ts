/**
 * src/data/enquiry.ts
 *
 * The /contact page's copy and the enquiry form's options. Typed arrays
 * rather than JSX, per CLAUDE.md.
 *
 * Headline and paragraph: docs/content.md § For Business and § Home / For
 * business, verbatim. Business types: content.md "Who we work with", which
 * carries no [CONFIRM] — the "What we offer" capabilities do, so they are not
 * offered as options. Field list and labels: content.md § Enquiry form.
 *
 * CONTACT DETAILS are the email and phone numbers printed on Elixir's own
 * "Directions of use" card (public/images/_raw). They are the client's, not
 * invented, but whether they are the right ones for this site is a question
 * for the client — hence the visible marker. No address: none was supplied.
 */

export const CONTACT = {
  headline: ["Create your own", "Caviar Bakhoor with Elixir."],
  paragraph:
    "Elixir manufactures Caviar Bakhoor for perfume houses, luxury brands, hotel groups and private label. Your scent, your packaging, our technology.",
  em: ["Your scent, your packaging, our technology."],
  email: "contact@elixirperfumery.com",
  phones: ["+91 98864 78926", "+91 63600 09375"],
  detailsConfirm: "[CONFIRM] From the Directions of use card — are these the contacts for this site?",
  success: "Enquiry received. Elixir will reply within [CONFIRM] working days.",
  submitLabel: "Send enquiry",
};

export const BUSINESS_TYPES = [
  "Perfume house",
  "Luxury brand",
  "Hotel & hospitality",
  "Retailer",
  "Private label",
  "Corporate gifting",
  "Other",
];

export const CONTACT_METHODS = ["Phone", "Email", "WhatsApp"];
