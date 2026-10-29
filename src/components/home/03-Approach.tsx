import Image from "next/image";
import {
  Container,
  Eyebrow,
  DisplayHeadline,
  CapsSubhead,
  StackSection,
  Reveal,
} from "@/components/ui";
import { BOX_VIDEO } from "@/data/box";
import { FilmReveal } from "./03-FilmReveal";

/**
 * 03 — Encapsulated Technology (approach).
 *
 * Stacks over 02 on a lifted surface, so the boundary between the two sections
 * is visible as the new one slides up — that plus the hairline is the whole
 * stacking interaction.
 *
 * The two-column row is the one unusual piece: the right paragraph sits at the
 * BOTTOM of its column, aligned to the portrait image's bottom edge, with the
 * space above it deliberately empty. Its caps subhead is top-aligned in the
 * same column, so the emptiness sits between them.
 *
 * Copy verbatim from docs/homepage.md § 03. The box's contents moved to
 * 04b-InTheBox, after the collection (site owner, 2026-10-27); its left column is a film that opens
 * from the portrait slot into a landscape frame below as the page scrolls
 * (03-ApproachVideo).
 */
export function Approach() {
  return (
    <StackSection index={3} label="Innovation" surface="raised">
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
          <Eyebrow>The innovation</Eyebrow>

          <DisplayHeadline lines={["What is", "Caviar Bakhoor?"]} />

          <CapsSubhead style={{ maxWidth: "60ch" }}>
            CAVIAR BAKHOOR REIMAGINES TRADITIONAL BAKHOOR IN A LONG-LASTING,
            HIGHLY DIFFUSIVE FORM. OUR PATENT-PENDING ENCAPSULATION TECHNOLOGY
            TRANSFORMS ITS SCENT INTO PEARLS THAT RELEASE THEIR AROMA AS THEY
            BURN
          </CapsSubhead>
        </Reveal>
      </Container>

      <Container>
        <Image
          src="/images/texture/pearl-macro.jpg"
          alt="Macro of Caviar Bakhoor pearls, dark spheres scattered with flakes of 24-karat gold leaf"
          width={2400}
          height={1600}
          sizes="(max-width: 1023px) 100vw, 1440px"
          className="media"
          /* Paper between the photograph and the dark film below, so the
             two do not run together. */
          style={{ marginBottom: "clamp(2.5rem, 7vw, 5rem)" }}
        />
      </Container>

      {/* Then the film, full width, opening through a pearl. */}
      <FilmReveal {...BOX_VIDEO} />

      <hr style={{ border: 0, borderTop: "1px solid var(--rule)", margin: 0 }} />
    </StackSection>
  );
}
