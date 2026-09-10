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
 * time-based marquee. When the fourth card has had its turn the pin releases
 * and the closing block scrolls normally.
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
          <Eyebrow>Caviar de Parfum</Eyebrow>

          <DisplayHeadline lines={["Creative", "Feature"]} italicLine={1} />

          <CapsSubhead>Crafted in-house</CapsSubhead>
        </Reveal>
      </Container>

      <ProjectWheel items={PROJECT_WHEEL} />

      {/* The closing block: left-aligned, as the reference's section ends.
          A step down from the section opener — display-md, and the block's
          own rhythm tighter than the opener's, so it reads as a coda. */}
      <Container>
        <Reveal
          stagger
          className="flex flex-col"
          style={{
            paddingTop: "clamp(2.5rem, 5vw, 4rem)",
            paddingBottom: "var(--section-y)",
            gap: "clamp(1rem, 1.5vw, 1.5rem)",
            alignItems: "flex-start",
          }}
        >
          <DisplayHeadline
            lines={["Beyond", "The tin"]}
            italicLine={0}
            style={{ maxWidth: "16ch", fontSize: "var(--text-display-md)" }}
          />

          <p className="type-body" style={{ maxWidth: "58ch" }}>
            Beyond the four we sell, Elixir builds Caviar Bakhoor for other
            names — <strong>custom fragrance</strong>, custom tin, custom box.
            Development, sampling, refinement and production, in sequence, with
            one point of contact throughout.
          </p>

          <a href="/for-business" className="cta-button">
            <span>Start a project</span>
            <span aria-hidden className="cta-arrow">
              ↗
            </span>
          </a>
        </Reveal>
      </Container>

      <hr style={{ border: 0, borderTop: "1px solid var(--rule)", margin: 0 }} />
    </StackSection>
  );
}
