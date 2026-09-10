/**
 * Navigation and footer links. Verbatim from docs/content.md — a typed array
 * rather than JSX so the Shopify developer can swap it in one place.
 */

export type NavItem = { label: string; href: string };

export const NAV: NavItem[] = [
  { label: "Caviar Bakhoor", href: "/innovation" },
  { label: "Collection", href: "/collection" },
  { label: "The Ritual", href: "/ritual" },
  { label: "For Business", href: "/for-business" },
  { label: "About", href: "/about" },
];

/**
 * The slide-in menu. Ordered per docs/homepage.md, which adds HOME and CONTACT
 * to the header nav in content.md.
 */
export const MENU_NAV: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Collection", href: "/collection" },
  { label: "The Ritual", href: "/ritual" },
  { label: "For Business", href: "/for-business" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const LEGAL: NavItem[] = [
  { label: "Shipping", href: "/shipping" },
  { label: "Returns", href: "/returns" },
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];

/** Category keywords for the marquee. */
export const KEYWORDS = [
  "Caviar Bakhoor",
  "Encapsulation",
  "24 Karat Gold",
  "Oud",
  "Bakhoor Reimagined",
  "Private Label",
  "Caviar de Parfum",
];
