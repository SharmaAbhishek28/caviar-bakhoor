import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/data/products";

/**
 * One catalogue card: the fragrance's portrait shot as the whole card, a
 * scrim, and centred over the foot of it the name in Bodoni caps, the line
 * "Scented Bakhoor · Caviar Bakhoor", and a paper button.
 *
 * Takes a Product, never imports one — CLAUDE.md. The portrait is whichever
 * of the product's images is taller than it is wide; the overhead crop is
 * the fallback.
 *
 * No price: every priceMinor is still null ([CONFIRM]), and the reference
 * card carries none. It joins the card from products.ts once confirmed.
 */
export function ProductCard({
  product,
  priority = false,
}: {
  product: Product;
  priority?: boolean;
}) {
  const image =
    product.images.find((i) => i.height > i.width) ?? product.images[0];

  return (
    <article id={product.handle} className="pcard">
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        sizes="(max-width: 767px) 100vw, 50vw"
        priority={priority}
        className="pcard-img"
      />
      <div className="pcard-scrim" aria-hidden />

      <div className="pcard-body">
        <h2 className="pcard-title">{product.title}</h2>
        <p className="pcard-sub">{product.subtitle}</p>
        <Link
          href={`/products/${product.handle}`}
          className="cta-button cta-button--paper"
          aria-label={`Shop ${product.title}`}
        >
          <span>Shop now</span>
          <span aria-hidden className="cta-arrow">
            ↗
          </span>
        </Link>
      </div>
    </article>
  );
}
