import type { Metadata } from "next";
import Link from "next/link";
import { Credentials } from "@/components/home/08-Credentials";
import { InnovationPlates } from "@/components/innovation/InnovationPlates";
import { CapsSubhead, Container, DarkPanel, DisplayHeadline, Eyebrow, MarkedProse, Marquee } from "@/components/ui";
import { INNOVATION, PLATES } from "@/data/innovation";

export const metadata: Metadata = {
  title: "What is Caviar Bakhoor? | Elixir Signature Scents",
  description:
    "Caviar Bakhoor is bakhoor encapsulated into pearls: a patent-pending technology that seals fragrance in spheres which open under heat, with aged oud and pure 24-karat gold.",
};

/**
 * /innovation — the technology page; owns "what is caviar bakhoor".
 *
 * Opens as every page does (CLAUDE.md): eyebrow, display headline, caps
 * subhead, marquee, dark full-bleed panel — with the direct answer in the
 *  first paragraph, for search. Then the seven process plates (the client's technical deck, 2026-10-21),
 * the close and the credentials strip. Process only (site owner, 2026-10-19).
 */
export default function InnovationPage() {
  return (
    <>
      <section className="inv-opener" data-label="Innovation">
        <Container>
          <div className="inv-opener-body">
            <Eyebrow>{INNOVATION.eyebrow}</Eyebrow>
            <DisplayHeadline as="h1" lines={INNOVATION.headline} italicLine={1} />
            <CapsSubhead>{INNOVATION.subhead}</CapsSubhead>
            <MarkedProse className="type-body inv-answer" text={INNOVATION.answer} strong={INNOVATION.answerStrong} />
          </div>
        </Container>
        <div className="inv-marquee">
          <Marquee items={INNOVATION.marquee} label="The technology, in brief" />
        </div>
        <DarkPanel {...INNOVATION.panel} minHeight="70svh" zoom />
      </section>

      <InnovationPlates plates={PLATES} footer={INNOVATION.footer} />

      <section className="inv-close-section">
        <Container>
          <div className="inv-close">
            <Link href="/collection" className="cta-button">
              <span>Shop Caviar Bakhoor</span>
              <span aria-hidden className="cta-arrow">↗</span>
            </Link>
            <Link href="/for-business" className="cta-button">
              <span>Create with us</span>
              <span aria-hidden className="cta-arrow">↗</span>
            </Link>
          </div>
        </Container>
      </section>

      <Credentials />
    </>
  );
}
