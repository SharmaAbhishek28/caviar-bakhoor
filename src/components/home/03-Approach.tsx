import Image from "next/image";
import {
  Container,
  Eyebrow,
  DisplayHeadline,
  CapsSubhead,
  StackSection,
  Reveal,
} from "@/components/ui";

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
 * Copy verbatim from docs/homepage.md § 03.
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

          <p
            className="type-body prose-justified"
            style={{ marginTop: "clamp(0.5rem, 1.5vw, 1rem)" }}
          >
            NO HELD IN A PEARL CHANGE TO A PATENT PENDING ENCAPSULATED
            TECHNOLOGY REMOVE NOTHING TO TO AND CHANGE IT TO REINVENTING THE
            BAKHROOR RITUAL LIKE NEVER BEFORE
          </p>
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
        />
      </Container>

      <Container>
        <div className="approach-row">
          <Image
            src="/images/packaging/spoon-01.jpg"
            alt="An open Caviar Bakhoor box on black, the Noir tin and its gold spoon inside"
            width={1200}
            height={1905}
            sizes="(max-width: 1023px) 100vw, 40vw"
            className="media-portrait"
          />

          {/* Subhead pinned top, paragraph pinned bottom, empty between. */}
          <div className="approach-copy">
            <CapsSubhead className="approach-subhead">
              Elixir × Caviar Bakhoor
            </CapsSubhead>

            <p className="type-body prose-justified" style={{ margin: 0 }}>
              EACH TIN HOLDS A COLLECTION OF FRAGRANT CAVIAR PEARLS. FOUR
              COMPOSITIONS OPEN THE COLLECTION: DARK, ROSE, SAFFRON AND AMBER.
              EACH REVEALS ITS CHARACTER SLOWLY AS THEY ARE WARMED.
            </p>
          </div>
        </div>

        <div style={{ height: "var(--section-y)" }} />
      </Container>

      <hr style={{ border: 0, borderTop: "1px solid var(--rule)", margin: 0 }} />
    </StackSection>
  );
}
