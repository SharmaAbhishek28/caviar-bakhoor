import {
  Container,
  Eyebrow,
  DisplayHeadline,
  CapsSubhead,
  StackSection,
  Reveal,
} from "@/components/ui";
import { PROJECT_WHEEL } from "@/data/projects";
import { ProjectWheel } from "./04-ProjectWheel";

/**
 * 04 — The collection, as a rotating wheel of project cards.
 *
 * Opens with the display headline, then pins: four cards ride a wheel that
 * turns as the page scrolls, one card facing front at a time, over a giant
 * time-based marquee. When the fourth card has had its turn the pin releases.
 * The Tailored collection development block that closed this section moved
 * to section 06, under Where caviar becomes bakhoor (site owner, 2026-10-24).
 *
 * Card proportions are taken from the reference, measured rather than guessed:
 * its project image renders 403 x 576 at a 1440px viewport, so roughly 28% of
 * viewport and a 3:4 portrait.
 */
export function Projects() {
  return (
    <StackSection index={4} label="Collection" surface="paper">
      <Container>
        <Reveal
          stagger
          className="flex flex-col"
          style={{
            paddingTop: "var(--section-y)",
            paddingBottom: "clamp(2rem, 4vw, 3.5rem)",
            gap: "clamp(1.5rem, 3vw, 2.5rem)",
          }}
        >
          <Eyebrow>Caviar Bakhoor</Eyebrow>

          <DisplayHeadline lines={["In four original", "signatures"]} italicLine={1} />

          <CapsSubhead>Crafted in-house</CapsSubhead>
        </Reveal>
      </Container>

      <ProjectWheel items={PROJECT_WHEEL} />

      {/* Room after the last card before the section ends, now that the
          Tailored block no longer closes it. */}
      <div aria-hidden style={{ height: "clamp(3rem, 7vw, 6rem)" }} />

      <hr style={{ border: 0, borderTop: "1px solid var(--rule)", margin: 0 }} />
    </StackSection>
  );
}
