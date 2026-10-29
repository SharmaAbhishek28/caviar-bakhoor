import { PUBLISHED_POLICIES } from "./policies";
/**
 * Navigation and footer links. Verbatim from docs/content.md — a typed array
 * rather than JSX so the Shopify developer can swap it in one place.
 */

export type NavItem = { label: string; href: string };

export const NAV: NavItem[] = [
  { label: "Caviar Bakhoor", href: "/innovation" },
  { label: "Collection", href: "/collection" },
  { label: "The Ritual", href: "/ritual" },
  { label: "Private Label", href: "/for-business" },
  { label: "About", href: "/about" },
];

/**
 * The slide-in menu. Ordered per docs/homepage.md, which adds HOME and CONTACT
 * to the header nav in content.md.
 */
export const MENU_NAV: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "The Innovation", href: "/innovation" },
  { label: "Collection", href: "/collection" },
  { label: "The Ritual", href: "/ritual" },
  { label: "Private Label", href: "/for-business" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

/** Policy links: only the policies that have been published. */
export const LEGAL: NavItem[] = PUBLISHED_POLICIES.map((p) => ({ label: p.title, href: `/${p.slug}` }));

/**
 * The footer's customer links, in the parent house's footer order
 * (elixirperfumery.com): read down the first column, then the second.
 * A policy not yet published drops out.
 */
const FOOTER_ORDER = ["shipping", "returns", "payment-methods", "career", "privacy", "terms", "help-centre"];
export const FOOTER_LINKS: NavItem[] = [
  ...FOOTER_ORDER.flatMap((slug) => {
    const p = PUBLISHED_POLICIES.find((x) => x.slug === slug);
    return p ? [{ label: p.title, href: `/${p.slug}` }] : [];
  }),
  { label: "Contact us", href: "/contact" },
];

/** Category keywords for the marquee. */
export const KEYWORDS = [
  "Caviar Bakhoor",
  "Encapsulated Technology",
  "24 Karat Gold",
  "Oud",
  "Bakhoor Reimagined",
  "Private Label",
  "Scented Bakhoor",
];
