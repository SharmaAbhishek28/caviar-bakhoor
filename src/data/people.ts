/**
 * src/data/people.ts
 *
 * The people section on /about — the reference's staggered portraits, THE /
 * epithet titles and marked-up paragraphs, applied to Elixir's team.
 *
 * NO PEOPLE ARE NAMED. The client has supplied no names, roles, portraits or
 * bios, and CLAUDE.md forbids inventing them. Each entry below is a slot: a
 * null field renders its visible [CONFIRM] marker and a null portrait renders
 * a neutral frame. Fill in the fields and drop the portraits into
 * public/images/people/ and the section is live — no code changes.
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
  { id: "person-1", epithet: null, name: null, role: null, bio: null, portrait: null },
  { id: "person-2", epithet: null, name: null, role: null, bio: null, portrait: null },
  { id: "person-3", epithet: null, name: null, role: null, bio: null, portrait: null },
  { id: "person-4", epithet: null, name: null, role: null, bio: null, portrait: null },
];
