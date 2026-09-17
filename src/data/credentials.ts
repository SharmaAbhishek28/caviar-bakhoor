/**
 * src/data/credentials.ts
 *
 * Section 08 — the credentials strip above the footer. A typed array rather
 * than JSX, per CLAUDE.md.
 *
 * Today the strip carries claims verifiable from the product itself, under
 * the label ELIXIR. When the client confirms the collaborating brands and
 * supplies written permission to name each one (docs/content.md § For
 * business), their marks go in as `logo` entries and the label becomes
 * TRUSTED BY — a data change, not a rebuild.
 *
 * HELD BACK, each carrying a [CONFIRM] in docs/homepage.md § 08: EST. 1937,
 * THIRD GENERATION, ESXENCE MILAN 2024, and "IN INDIA" after HANDMADE. They
 * come from Elixir's own site and third-party coverage, not from the client.
 * Add them here the moment they are confirmed.
 */

export type Credential = {
  label: string;
  /** A brand mark. When present the label becomes the image's alt text. */
  logo?: { src: string; width: number; height: number };
};

export const CREDENTIALS_LABEL = "Elixir";

export const CREDENTIALS: Credential[] = [
  { label: "Handmade" },
  { label: "24 Karat Gold" },
  { label: "Encapsulated Technology" },
  { label: "Private Label" },
  { label: "Caviar Bakhoor" },
  { label: "Scented Bakhoor" },
];
