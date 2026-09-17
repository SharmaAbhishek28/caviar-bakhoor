import Link from "next/link";
import Image from "next/image";
import {
  Container,
  Eyebrow,
  DisplayHeadline,
  CapsSubhead,
  Marquee,
  StackSection,
  Reveal,
} from "@/components/ui";

/**
 * 02 — The Innovation (opener).
 *
 * A single column at full container width: eyebrow, headline, subhead, then
 * the marquee, image, CTA bar and paragraph. Everything shares the container
 * gutters, so all six sit on the same two vertical lines.
 *
 * One marquee, time-based — it runs on its own and pauses on hover. The
 * scroll-linked variant lives on in ScrollMarquee for the credentials strip
 * and section 04's giant background band.
 *
 * Copy verbatim from docs/homepage.md § 02.
 *
 * SINCE 1937 is held back from the band: the founding year comes from Elixir's
 * own site and third-party coverage, not the client, and carries a [CONFIRM]
 * in § 07. Unverified claims stay out of display components.
 */

const PRODUCT_BAND = [
  "Four Caviar’s",
  "One New Category",
  "Noir",
  "Ward Baccarat",
  "Imperial Zafran",
  "Amber Blanc",
];

export function Innovation() {
  return (
    <StackSection index={2} label="Collection">
      <Container>
        <Reveal
          stagger
          className="flex flex-col"
          style={{
            /* Only the top carries the section rhythm. A full --section-y on
               the bottom too would put 160px between the subhead and the band
               that belongs to it. */
            paddingTop: "var(--section-y)",
            paddingBottom: "clamp(1.5rem, 3vw, 2.5rem)",
            gap: "clamp(1.5rem, 3vw, 2.5rem)",
          }}
        >
          <Eyebrow>The innovation</Eyebrow>

          <DisplayHeadline lines={["Bakhoor", "Reimagined"]} />

          <CapsSubhead style={{ maxWidth: "28ch" }}>
            Four Caviar&rsquo;s. One new category.
          </CapsSubhead>
        </Reveal>
      </Container>

      <Container>
        {/* One column at full container width. Every child sits on the same
            two vertical lines as the headline above. */}
        <div className="innovation-column">
          {/* Clipped by the column, so the band starts and ends on the gutters
              like everything else. */}
          <div
            style={{
              borderBlock: "1px solid var(--rule)",
              paddingBlock: "1rem",
              marginBottom: "clamp(0.5rem, 1.5vw, 1rem)",
            }}
          >
            <Marquee items={PRODUCT_BAND} />
          </div>

          <Link
            href="/collection"
            aria-label="View the Caviar Bakhoor collection"
            style={{ display: "block", lineHeight: 0 }}
          >
            <Image
              src="/images/collection/all-four-01.jpg"
              alt="The four Caviar Bakhoor tins — Noir, Ward Baccarat, Imperial Zafran and Amber Blanc — arranged on marble"
              width={2400}
              height={1350}
              sizes="(max-width: 1023px) 100vw, 1440px"
              className="media"
            />
          </Link>

          {/* The bar is the exact width of the image above it. */}
          <Link href="/collection" className="cta-bar">
            <span>Shop the collection</span>
            <span aria-hidden className="cta-arrow">
              ↗
            </span>
          </Link>

          <p
            className="type-body prose-justified"
            style={{
              /* The column's own flex gap handles the space above; only the
                 run-out to the divider is set here. */
              marginTop: "clamp(0.75rem, 2vw, 1.5rem)",
              marginBottom: "var(--section-y)",
            }}
          >
            Caviar Bakhoor reimagines traditional bakhoor in a long-lasting,
            highly diffusive form. Our patent-pending encapsulation technology
            transforms its scent into pearls that release their aroma as they
            burn.
          </p>
        </div>
      </Container>

      {/* Closes the section. */}
      <hr style={{ border: 0, borderTop: "1px solid var(--rule)", margin: 0 }} />
    </StackSection>
  );
}
