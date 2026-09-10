import Image from "next/image";
import Link from "next/link";
import { Container, MarkedProse, Marquee, StackSection } from "@/components/ui";
import { FOUR, FOUR_CLOSE, FOUR_OPENER } from "@/data/four";

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
 * Slides over section 05's fixed photograph: it carries its own paper
 * surface, so the image is covered as this rises.
 */
export function Four() {
  return (
    <StackSection index={6} label="Collection" surface="paper" className="four">
      <Container>
        {/* WHERE / BAKHOOR / BECOMES / CAVIAR — the reference's four-word
            composition, three faces, staggered baselines. The visible words
            are presentational; the heading's name is the sentence. */}
        <h2 className="four-opener" aria-label="Where bakhoor becomes caviar">
          <span aria-hidden className="four-opener-lead type-counter-xl">
            {FOUR_OPENER.lead}
          </span>
          <span aria-hidden className="four-opener-anchor type-display-xl">
            {FOUR_OPENER.anchor}
          </span>
          <span aria-hidden className="four-opener-link type-counter-sm">
            {FOUR_OPENER.link}
          </span>
          <span aria-hidden className="four-opener-close type-counter-xl">
            {FOUR_OPENER.close}
          </span>
        </h2>

        <ol className="four-grid">
          {FOUR.map((entry, i) => (
            <li key={entry.handle} className="four-entry">
              <h3 className="four-title">
                <span className="four-title-the">The</span>
                <span className="four-title-epithet">{entry.epithet}</span>
              </h3>

              <figure className="four-figure">
                <Link href={`/products/${entry.handle}`} aria-label={`View ${entry.title}`}>
                  <Image
                    src={entry.image.src}
                    alt={entry.image.alt}
                    width={entry.image.width}
                    height={entry.image.height}
                    sizes="(max-width: 1023px) 100vw, 45vw"
                    className="media"
                    /* The first two are near the fold of the section. */
                    loading={i < 2 ? "eager" : "lazy"}
                  />
                </Link>
                {/* Where the reference signs the portrait. */}
                <figcaption className="four-signature">{entry.title}</figcaption>
              </figure>

              <MarkedProse
                className="type-body prose-justified four-blurb"
                text={entry.blurb}
                strong={entry.strong}
                em={entry.em}
              />
            </li>
          ))}
        </ol>
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
