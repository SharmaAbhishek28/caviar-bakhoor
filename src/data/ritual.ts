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
 * Open question: content.md says "gold mesh disc"; Elixir's own Scodix
 * "Directions of use" card says "gold foil". The on-page [CONFIRM] marker
 * was removed at the site owner's request (2026-10-15); the step 02 wording
 * below is still unconfirmed by the client.
 */

export type RitualStep = {
  /** Two-digit step number, as displayed. */
  no: string;
  /** Step name. Rendered in caps by the component, stored in sentence case. */
  name: string;
  /** One line of body copy. */
  body: string;
};

export const RITUAL_HEADLINE = "Four steps. No aroma until you want it.";

export const RITUAL_STEPS: RitualStep[] = [
  { no: "01", name: "Light", body: "Set the charcoal and let it settle." },
  { no: "02", name: "Place", body: "Rest the gold mesh disc over the burner." },
  { no: "03", name: "Spoon", body: "A small measure of pearls onto the mesh." },
  { no: "04", name: "Release", body: "The pearls open, and the fragrance lifts." },
];

export const RITUAL_CTA = { label: "View the ritual", href: "/ritual" };

/** The background photograph: the burner lit, smoke rising, the four tins
 *  around it — a still from the client's own film. */
export const RITUAL_IMAGE = {
  src: "/images/shoot/burner-smoke-tins.jpg",
  alt: "The white burner with smoke rising from it, the four Caviar Bakhoor tins and boxes around it",
  width: 2400,
  height: 1350,
};
