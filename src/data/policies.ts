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
  lede: string | null;
  updated: string | null;
  sections: PolicySection[];
};

/* No policy text has been supplied yet. A policy whose sections are all
   empty is unpublished: its route 404s and its link is hidden (site owner,
   2026-10-18 — no [CONFIRM] markers on the site). Fill `body` to publish. */
const AWAITING = null;

export const POLICIES: Policy[] = [
  {
    slug: "shipping",
    title: "Shipping",
    lede: AWAITING,
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
    lede: AWAITING,
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
    lede: AWAITING,
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
    lede: AWAITING,
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

/** True once at least one section has text. */
export const isPublished = (p: Policy) => p.sections.some((s) => s.body && s.body.length > 0);

export const PUBLISHED_POLICIES = POLICIES.filter(isPublished);

export const getPolicy = (slug: string): Policy | undefined => PUBLISHED_POLICIES.find((p) => p.slug === slug);
