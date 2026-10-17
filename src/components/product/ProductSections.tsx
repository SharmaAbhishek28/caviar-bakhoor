import { Container } from "@/components/ui";
import { ProductCard } from "@/components/collection/ProductCard";
import type { Product } from "@/data/products";
import { PDP_FILM } from "@/data/film";
import { ProductFilm } from "./ProductFilm";

/**
 * The PDP below the hero, kept short (site owner, 2026-10-17): the
 * composition line, then the other fragrances. The ritual, the details and
 * the story are covered on the home page and in the panel's own accordions,
 * so they are not repeated here. No side labels on this page.
 */

/** The fragrance's composition from the client's booklet, then the ritual film. */
export function NotesSection({ product }: { product: Product }) {
  return (
    <section className="pdp-notes-section">
      <Container>
        <p className="pdp-notes-line">{product.accord}</p>
        <ProductFilm {...PDP_FILM} />
      </Container>
    </section>
  );
}

/** Previous and next fragrance, in collection order, wrapping at the ends —
 *  the same cards as /collection, so the two pages read as one set. */
export function ProductNav({ product, all }: { product: Product; all: Product[] }) {
  const i = all.findIndex((p) => p.handle === product.handle);
  const prev = all[(i - 1 + all.length) % all.length];
  const next = all[(i + 1) % all.length];
  return (
    <nav className="catalogue pdp-more" aria-label="Other fragrances">
      <ProductCard product={prev} />
      <ProductCard product={next} />
    </nav>
  );
}
