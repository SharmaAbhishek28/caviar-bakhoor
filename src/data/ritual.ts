/**
 * src/data/ritual.ts
 *
 * The four ritual steps, as shown in section 05 and on /ritual. A typed
 * array rather than JSX, per CLAUDE.md — this becomes a Shopify metaobject.
 *
 * Copy is docs/content.md § The ritual, verbatim. The only change is that
 * each step's line is capitalised and given a full stop, because it stands
 * alone under its heading here rather than after an em dash in a list.
 *
 * CONFIRM: content.md says "gold mesh disc"; Elixir's own Scodix
 * "Directions of use" card says "gold foil". docs/homepage.md § 05 says
 * Elixir's wording wins, so the client should settle this before launch.
 * The marker is rendered in the section until they do.
 */

export type RitualStep = {
  /** Two-digit step number, as displayed. */
  no: string;
  /** Step name. Rendered in caps by the component, stored in sentence case. */
  name: string;
  /** One line of body copy. */
  body: string;
};

export const RITUAL_HEADLINE = "Four steps. No smoke until you want it.";

export const RITUAL_STEPS: RitualStep[] = [
  { no: "01", name: "Light", body: "Set the charcoal and let it settle." },
  { no: "02", name: "Place", body: "Rest the gold mesh disc over the burner." },
  { no: "03", name: "Spoon", body: "A small measure of pearls onto the mesh." },
  { no: "04", name: "Release", body: "The pearls open, and the fragrance lifts." },
];

export const RITUAL_CONFIRM =
  "[CONFIRM] Step 02 — content.md says “gold mesh disc”; Elixir’s Directions of use card says “gold foil”.";

export const RITUAL_CTA = { label: "View the ritual", href: "/ritual" };

/** The background photograph. Stand-in until the burner shot exists. */
export const RITUAL_IMAGE = {
  src: "/images/ritual/ritual-01.jpg",
  alt: "The Noir tin open on its box, a gold spoon lifting pearls, the mesh packet beside it",
  width: 2400,
  height: 1600,
};
