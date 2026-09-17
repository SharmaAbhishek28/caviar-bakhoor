import { ScrollMarquee } from "@/components/ui";

/**
 * The credentials strip, sitting directly under the hero.
 *
 * Full-bleed and dark, with a scroll-linked band: it moves right-to-left as
 * the page scrolls down and does not play on its own.
 *
 * BRAND LOGOS ARE DELIBERATELY ABSENT. The reference capture for this strip
 * shows named third-party perfume houses. Placing those marks here asserts a
 * client relationship, docs/homepage.md § 08 says collaboration brands join
 * "when confirmed", and CLAUDE.md forbids inventing client names. This renders
 * category terms instead — every one of them verifiable from the product.
 *
 * When the client confirms real collaborators, swap ITEMS for their marks and
 * change the label to TRUSTED BY. That is a data change, not a rebuild.
 *
 * EST. 1937 is held back for the same reason as § 02: the founding year is
 * unconfirmed and carries a [CONFIRM] in § 07.
 */
const ITEMS = [
  "Caviar Bakhoor",
  "Encapsulated Technology",
  "24 Karat Gold",
  "Oud",
  "Private Label",
  "Caviar Bakhoor",
  "Handmade",
  "Scented Bakhoor",
];

export function TrustStrip() {
  return (
    <section
      className="trust-strip"
      aria-label="What we make"
      style={{
        background: "var(--paper)",
        borderBlock: "1px solid var(--rule)",
        paddingBlock: "clamp(1rem, 2vw, 1.5rem)",
        position: "relative",
        zIndex: 1,
      }}
    >
      <ScrollMarquee items={ITEMS} />
    </section>
  );
}
