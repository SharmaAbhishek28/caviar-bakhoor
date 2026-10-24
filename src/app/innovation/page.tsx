import type { Metadata } from "next";
import Link from "next/link";
import { Credentials } from "@/components/home/08-Credentials";
import { InnovationPlates } from "@/components/innovation/InnovationPlates";
import { CapsSubhead, Container, DarkPanel, DisplayHeadline, Eyebrow, MarkedProse, Marquee } from "@/components/ui";
import { INNOVATION, PLATES } from "@/data/innovation";

export const metadata: Metadata = {
  title: "What is Caviar Bakhoor? | Elixir Signature Scents",
  description:
    "Caviar Bakhoor is bakhoor encapsulated into pearls: a patent pending technology that seals fragrance in spheres which open under heat, with aged oud and pure 24 karat gold.",
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

      <section className="ab-close" data-label="Shop">
        <Container>
          <div className="ab-close-inner">
            <Eyebrow>{INNOVATION.close.eyebrow}</Eyebrow>
            <h2 className="ab-close-h">
              <span className="type-counter-xl ab-close-lead">{INNOVATION.close.lead}</span>
              <span className="type-display-xl ab-close-line">{INNOVATION.close.line}</span>
            </h2>
            <p className="ab-close-sub">{INNOVATION.close.sub}</p>
            <div className="ab-close-actions">
              <Link href={INNOVATION.close.primary.href} className="cta-button">
                <span>{INNOVATION.close.primary.label}</span>
                <span aria-hidden className="cta-arrow">↗</span>
              </Link>
              <Link href={INNOVATION.close.secondary.href} className="cta-button cta-button--ghost">
                <span>{INNOVATION.close.secondary.label}</span>
                <span aria-hidden className="cta-arrow">↗</span>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <Credentials />
    </>
  );
}
