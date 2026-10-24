import Link from "next/link";
import { Container, DisplayHeadline, MarkedProse, Marquee, Reveal, StackSection } from "@/components/ui";
import { FOUR_CLOSE, FOUR_OPENER } from "@/data/four";

/**
 * 06 — The Four.
 *
 * DIVERGES FROM docs/homepage.md § 06, which specifies a pinned circular-tin
 * carousel and says it "replaces the team-bio section". The client asked, in
 * chat with screenshots, for the reference's team-bio structure instead:
 * a mixed-face opener, a staggered two-column run of portraits with THE /
 * epithet titles and marked-up paragraphs, then a scroll-linked marquee line,
 * a paragraph and a button. The four fragrances stand in for the four people.
 * The docs pass should bring § 06 in line with this.
 *
 * The four portraits were removed (site owner, 2026-10-24): the opener now
 * leads straight into the close. Their photographs live on as the section
 * 04 cards.
 *
 * Slides over section 05's fixed photograph: it carries its own paper
 * surface, so the image is covered as this rises.
 */
export function Four() {
  return (
    <StackSection index={7} label="Collection" surface="paper" className="four">
      <Container>
        {/* WHERE CAVIAR / BECOMES BAKHOOR — two lines in reading order,
            three faces sharing a baseline. data-no-reveal: the line-splitting
            reveal would break the composition. */}
        <h2 className="four-opener" data-no-reveal>
          <span className="four-opener-row">
            <span className="four-opener-small">{FOUR_OPENER.lead}</span>{" "}
            <span className="four-opener-caviar">{FOUR_OPENER.first}</span>
          </span>{" "}
          <span className="four-opener-row">
            <span className="four-opener-small">{FOUR_OPENER.link}</span>{" "}
            <span className="four-opener-bakhoor">{FOUR_OPENER.second}</span>
          </span>
        </h2>

        {/* Tailored collection development, moved here from section 04
            (site owner, 2026-10-24), centred under the opener; a row of
            pearls after its button separates it from the close. */}
        <Reveal stagger className="four-tailored">
          <DisplayHeadline
            lines={["Tailored collection", "Development"]}
            italicLine={0}
            style={{ fontSize: "var(--text-display-md)" }}
          />
          <p className="type-body four-tailored-copy">
            Elixir creates Caviar Bakhoor collections for your brand{" "}
            <strong>from start to finish</strong>. We develop and refine your
            scent, create custom tins and boxes, and manage production with{" "}
            <strong>one point of contact</strong> throughout.
          </p>
          <Link href="/for-business" className="cta-button">
            <span>Start a project</span>
            <span aria-hidden className="cta-arrow">
              ↗
            </span>
          </Link>
        </Reveal>
        <div className="pearl-rule four-pearls" aria-hidden />
      </Container>

      <div className="four-close">
        <Container>
          {/* Runs on its own clock and is clipped at the column edges, as the
              reference's is. The phrase is repeated so one run is always
              wider than the column — a single run shorter than its box
              shows a gap at the loop point. */}
          <Marquee
            items={[FOUR_CLOSE.marquee, FOUR_CLOSE.marquee, FOUR_CLOSE.marquee]}
            className="four-marquee"
            label={FOUR_CLOSE.marquee}
          />
        </Container>
        <Container>
          <div className="four-close-inner">
            <MarkedProse
              className="type-body four-close-copy"
              text={FOUR_CLOSE.paragraph}
              strong={FOUR_CLOSE.strong}
            />
            <Link href={FOUR_CLOSE.cta.href} className="cta-button">
              <span>{FOUR_CLOSE.cta.label}</span>
              <span aria-hidden className="cta-arrow">
                ↗
              </span>
            </Link>
          </div>
        </Container>
      </div>

      <hr style={{ border: 0, borderTop: "1px solid var(--rule)", margin: 0 }} />
    </StackSection>
  );
}
