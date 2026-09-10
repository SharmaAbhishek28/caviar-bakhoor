import Link from "next/link";
import { CapsSubhead, Container, DisplayHeadline, Eyebrow } from "@/components/ui";
import type { Product } from "@/data/products";

/**
 * /collection opener: half a viewport of --ash, copy at the foot, no
 * photograph — the cards below are the photography. Like the reference's
 * "ZEUS | PHARAON", a row of the four names jumps to each card below.
 *
 * Copy is docs/content.md § The collection, verbatim: "Four fragrances." and
 * the category line. The headline is one thought across two lines.
 */
export function CollectionHero({ products }: { products: Product[] }) {
  return (
    <section className="chero on-ash" data-label="Collection">
      <Container>
        <div className="chero-body">
          <Eyebrow>The collection</Eyebrow>
          <DisplayHeadline as="h1" lines={["Four", "Fragrances"]} />
          <CapsSubhead>One new category.</CapsSubhead>

          <nav aria-label="Jump to a fragrance" className="chero-jump">
            {products.map((p, i) => (
              <span key={p.handle}>
                {i > 0 ? <span aria-hidden className="chero-jump-sep">|</span> : null}
                <Link href={`#${p.handle}`}>{p.title}</Link>
              </span>
            ))}
          </nav>
        </div>
      </Container>
    </section>
  );
}
