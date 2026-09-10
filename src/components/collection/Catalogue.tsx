import type { Product } from "@/data/products";
import { ProductCard } from "./ProductCard";

/**
 * The catalogue: a 2 x 2 grid of full-bleed cards, flush, no gutters — the
 * reference's split-screen pairs, stacked. One column on phones.
 *
 * The first two cards are above the fold on most desktops, so they load
 * eagerly; the rest lazily.
 */
export function Catalogue({ products }: { products: Product[] }) {
  return (
    <section className="catalogue" aria-label="The collection">
      {products.map((product, i) => (
        <ProductCard key={product.handle} product={product} priority={i < 2} />
      ))}
    </section>
  );
}
