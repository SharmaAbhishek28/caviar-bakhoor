/**
 * src/data/people.ts
 *
 * The people section on /about — the reference's staggered portraits, THE /
 * epithet titles and marked-up paragraphs, applied to Elixir's team.
 *
 * NO PEOPLE ARE NAMED. The client has supplied no names, roles, portraits or
 * bios, and CLAUDE.md forbids inventing them. Each entry below is a slot: a
 * null field renders its visible [CONFIRM] marker. The portraits are STAND-INS
 * — the fragrance photographs, 3:4, so the section reads as designed — and
 * are replaced by the real portraits in public/images/people/ when supplied.
 * Fill in the fields and the section is live — no code changes.
 *
 * Four slots because the reference has four; add or remove as the team is.
 */

export type Person = {
  /** Stable key, also the portrait filename stem. */
  id: string;
  /** The word after THE — "Unifier", "Climber" in the reference. */
  epithet: string | null;
  name: string | null;
  role: string | null;
  /** Two or three sentences, in the person's own words. */
  bio: string | null;
  /** Phrases in `bio` to weight. */
  strong?: string[];
  /** Phrases in `bio` to italicise. */
  em?: string[];
  portrait: { src: string; alt: string; width: number; height: number } | null;
};

export const PEOPLE_TITLE = { first: "The", second: "People" };
export const PEOPLE_SUBHEAD = "Behind the pearl";

export const PEOPLE: Person[] = [
  { id: "person-1", epithet: null, name: null, role: null, bio: null, portrait: { src: "/images/products/noir-portrait.jpg", alt: "Stand-in until the portrait is supplied: the Noir box, tin and spoon", width: 1200, height: 1600 } },
  { id: "person-2", epithet: null, name: null, role: null, bio: null, portrait: { src: "/images/products/ward-baccarat-portrait.jpg", alt: "Stand-in until the portrait is supplied: the Ward Baccarat box, tin and spoon", width: 1200, height: 1600 } },
  { id: "person-3", epithet: null, name: null, role: null, bio: null, portrait: { src: "/images/products/imperial-zafran-portrait.jpg", alt: "Stand-in until the portrait is supplied: the Imperial Zafran box, tin and spoon", width: 1200, height: 1600 } },
  { id: "person-4", epithet: null, name: null, role: null, bio: null, portrait: { src: "/images/products/amber-blanc-portrait.jpg", alt: "Stand-in until the portrait is supplied: the Amber Blanc box, tin and spoon", width: 1200, height: 1600 } },
];
