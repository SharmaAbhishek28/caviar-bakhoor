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
 * 03 — Held in a Pearl (approach).
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

          <DisplayHeadline lines={["Held", "In a pearl"]} />

          <CapsSubhead style={{ maxWidth: "34ch" }}>
            Nothing escapes until you want it to.
          </CapsSubhead>

          <p
            className="type-body prose-justified"
            style={{ marginTop: "clamp(0.5rem, 1.5vw, 1rem)" }}
          >
            Traditional bakhoor releases <strong>everything at once</strong>.
            Elixir&rsquo;s <strong>encapsulation</strong> holds the fragrance oil
            inside a sphere that stays <strong>closed at room temperature</strong>.
            On the burner the pearl opens and the oil lifts through the gold.
            What you notice is <strong>not smoke but scent</strong> — and how
            long it holds.
          </p>
        </Reveal>
      </Container>

      <Container>
        <Image
          src="/images/texture/pearl-macro.jpg"
          alt="Macro of Caviar de Parfum pearls, dark spheres scattered with flakes of 24-karat gold leaf"
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
            alt="An open Caviar de Parfum box on black, the Noir tin and its gold spoon inside"
            width={1200}
            height={1905}
            sizes="(max-width: 1023px) 100vw, 40vw"
            className="media-portrait"
          />

          {/* Subhead pinned top, paragraph pinned bottom, empty between. */}
          <div className="approach-copy">
            <CapsSubhead className="approach-subhead">
              Elixir × Caviar de Parfum
            </CapsSubhead>

            <p className="type-body prose-justified" style={{ margin: 0 }}>
              Every tin carries <strong>pure 24-karat gold flakes</strong> set
              among the pearls. Gold has been Elixir&rsquo;s{" "}
              <strong>signature</strong> across its parfum collections for
              years; here it is in the fragrance you{" "}
              <strong>burn</strong> rather than the one you{" "}
              <strong>wear</strong>. <strong>Four compositions</strong> to
              start — one dark, one rose, one saffron, one amber — each built to
              be <strong>heated, not sprayed</strong>.
            </p>
          </div>
        </div>

        <div style={{ height: "var(--section-y)" }} />
      </Container>

      <hr style={{ border: 0, borderTop: "1px solid var(--rule)", margin: 0 }} />
    </StackSection>
  );
}
