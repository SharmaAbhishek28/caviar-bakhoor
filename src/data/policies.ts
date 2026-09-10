/**
 * src/data/policies.ts
 *
 * The four policy pages: /shipping, /returns, /privacy, /terms. One shape,
 * one page component, typed data — CLAUDE.md.
 *
 * NO POLICY TEXT EXISTS YET. docs/content.md supplies none, and shipping
 * timings, return windows and privacy terms are legal statements the
 * client makes, not copy to be drafted here. Each section therefore has a
 * heading — the structure such a policy needs — and a null body, which
 * renders the visible [CONFIRM] marker. Fill `body` (plain paragraphs,
 * one per array item) and the page is done.
 *
 * `updated` is null for the same reason: it is stamped when the client
 * supplies the text.
 */

export type PolicySection = { heading: string; body: string[] | null };

export type Policy = {
  slug: string;
  title: string;
  lede: string;
  updated: string | null;
  sections: PolicySection[];
};

const CONFIRM_LEDE = "[CONFIRM] This policy is Elixir's to supply. The structure below is ready for it.";

export const POLICIES: Policy[] = [
  {
    slug: "shipping",
    title: "Shipping",
    lede: CONFIRM_LEDE,
    updated: null,
    sections: [
      { heading: "Where we ship", body: null },
      { heading: "Processing and delivery times", body: null },
      { heading: "Costs", body: null },
      { heading: "Tracking", body: null },
      { heading: "Duties and taxes", body: null },
    ],
  },
  {
    slug: "returns",
    title: "Returns",
    lede: CONFIRM_LEDE,
    updated: null,
    sections: [
      { heading: "Eligibility", body: null },
      { heading: "Return window", body: null },
      { heading: "How to return", body: null },
      { heading: "Refunds and exchanges", body: null },
      { heading: "Damaged or incorrect items", body: null },
    ],
  },
  {
    slug: "privacy",
    title: "Privacy",
    lede: CONFIRM_LEDE,
    updated: null,
    sections: [
      { heading: "What we collect", body: null },
      { heading: "How we use it", body: null },
      { heading: "Cookies", body: null },
      { heading: "Sharing", body: null },
      { heading: "Your rights", body: null },
      { heading: "Contact", body: null },
    ],
  },
  {
    slug: "terms",
    title: "Terms",
    lede: CONFIRM_LEDE,
    updated: null,
    sections: [
      { heading: "Use of this site", body: null },
      { heading: "Orders and payment", body: null },
      { heading: "Pricing", body: null },
      { heading: "Intellectual property", body: null },
      { heading: "Liability", body: null },
      { heading: "Governing law", body: null },
    ],
  },
];

export const getPolicy = (slug: string): Policy | undefined => POLICIES.find((p) => p.slug === slug);
