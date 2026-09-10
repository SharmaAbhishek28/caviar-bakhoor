import Image from "next/image";
import { Container, MarkedProse } from "@/components/ui";
import type { Product } from "@/data/products";
import { STORY } from "@/data/story";

/**
 * The story, at the foot of /collection. The reference puts its products on
 * a dated timeline; ours puts the four fragrances on the same ruler with no
 * dates — a thumbnail and name above the line, a square marker on it, and
 * beneath, the five words in the reference's bold-caption slot and the
 * description.
 *
 * The five words and the descriptions are the perfumer's to approve
 * (PROPOSAL in products.ts); both carry data-confirm, no badge, as the
 * section 04 cards do. The lede and paragraphs are docs/content.md § What is
 * Caviar Bakhoor, verbatim — the headline and captions are caps, the
 * paragraphs sentence case per CLAUDE.md, where the reference sets all of it
 * in caps.
 */
export function Story({ products }: { products: Product[] }) {
  return (
    <section className="story" data-label="Story">
      <Container>
        <h2 className="story-title">{STORY.title}</h2>
        <p className="story-lede">{STORY.lede}</p>
        <div className="story-copy">
          {STORY.paragraphs.map((p) => (
            <p key={p} className="type-body">
              {p}
            </p>
          ))}
        </div>

        <ol className="story-line">
          {products.map((product) => {
            /* The portrait — tin, spoon and box together — reads as the
               product at thumbnail size; the overhead crop is mostly lid. */
            const thumb =
              product.images.find((i) => i.height > i.width) ?? product.images[0];
            return (
              <li key={product.handle} className="story-entry">
                <div className="story-thumb">
                  <Image
                    src={thumb.src}
                    alt=""
                    width={thumb.width}
                    height={thumb.height}
                    sizes="(max-width: 767px) 60vw, 240px"
                  />
                </div>
                <h3 className="story-name">{product.title}</h3>
                <span className="story-marker" aria-hidden />
                <p className="story-words" data-confirm="perfumer">
                  {product.fiveWords.join(" · ")}
                </p>
                <MarkedProse
                  className="type-body story-desc"
                  text={product.description}
                />
              </li>
            );
          })}
        </ol>
      </Container>
    </section>
  );
}
