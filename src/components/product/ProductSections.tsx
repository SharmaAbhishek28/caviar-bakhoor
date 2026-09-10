import Image from "next/image";
import Link from "next/link";
import { Container, MarkedProse } from "@/components/ui";
import type { Product } from "@/data/products";
import { RITUAL_STEPS } from "@/data/ritual";
import { formatWeight } from "./format";

/**
 * The sections beneath the hero, in docs/content.md's PDP order: the notes
 * line and image, the ritual condensed with the details rows, the story with
 * three square images, reviews, and the previous / next fragrance.
 *
 * Server components: nothing here needs state.
 */

/** The reference sets its top notes in display type; ours are [CONFIRM], so
    the five words stand in, marked as the perfumer's proposal. */
export function NotesSection({ product }: { product: Product }) {
  const wide = product.images.find((i) => i.width > i.height) ?? product.images[0];
  return (
    <section className="pdp-notes-section" data-label="Notes">
      <Container>
        <p className="pdp-notes-line" data-confirm="perfumer">
          {product.fiveWords.join(", ")}
        </p>
        <Image
          src={wide.src}
          alt={wide.alt}
          width={wide.width}
          height={wide.height}
          sizes="(max-width: 1023px) 100vw, 1200px"
          className="media"
        />
      </Container>
    </section>
  );
}

export function DetailsSection({ product }: { product: Product }) {
  return (
    <section className="pdp-details" data-label="Ritual">
      <Container>
        <div className="pdp-details-grid">
          <div>
            <h2 className="pdp-h2">The ritual</h2>
            <ol className="pdp-steps">
              {RITUAL_STEPS.map((s) => (
                <li key={s.no}>
                  <span className="pdp-step-no">{s.no}</span>
                  <span className="pdp-step-name">{s.name}</span>
                  <span className="pdp-step-body">{s.body}</span>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <h2 className="pdp-h2">Details</h2>
            <dl className="pdp-facts">
              <dt>Net weight</dt>
              <dd>{formatWeight(product)}</dd>
              <dt>Approximate uses</dt>
              <dd>[CONFIRM]</dd>
              <dt>In the box</dt>
              <dd>{product.inTheBox.join(" · ")}</dd>
              <dt>Care</dt>
              <dd>[CONFIRM]</dd>
            </dl>
          </div>
        </div>
      </Container>
    </section>
  );
}

/** The story: the description centred, then three square images, then a divider. */
export function StorySection({ product }: { product: Product }) {
  /* The two square crops, then the portrait to make three — cropped to a
     square by the grid. */
  const squares = [
    ...product.images.filter((i) => i.width === i.height),
    ...product.images.filter((i) => i.height > i.width),
  ].slice(0, 3);
  return (
    <section className="pdp-story" data-label="Story">
      <Container>
        <MarkedProse className="type-body pdp-story-copy" text={product.description} />
        <div className="pdp-squares">
          {squares.map((img) => (
            <Image
              key={img.src}
              src={img.src}
              alt={img.alt}
              width={img.width}
              height={img.height}
              sizes="(max-width: 767px) 100vw, 33vw"
              className="pdp-square"
            />
          ))}
        </div>
      </Container>
      <hr className="pdp-rule" />
    </section>
  );
}

/** No reviews exist yet, so this is the honest empty state — nothing fabricated. */
export function ReviewsSection({ product }: { product: Product }) {
  return (
    <section className="pdp-reviews" data-label="Reviews">
      <Container>
        <div className="pdp-reviews-head">
          <div>
            <h2 className="pdp-h2">Reviews</h2>
            <p className="pdp-reviews-count">No reviews yet</p>
          </div>
          <Link href={`/contact?review=${product.handle}`} className="pdp-review-btn">
            Write a review
          </Link>
        </div>
        <p className="pdp-reviews-empty">
          Be the first to write about {product.title}.
        </p>
      </Container>
    </section>
  );
}

/** Previous and next fragrance, in collection order, wrapping at the ends. */
export function ProductNav({ product, all }: { product: Product; all: Product[] }) {
  const i = all.findIndex((p) => p.handle === product.handle);
  const prev = all[(i - 1 + all.length) % all.length];
  const next = all[(i + 1) % all.length];
  const thumb = (p: Product) => p.images.find((im) => im.width > im.height) ?? p.images[0];
  return (
    <nav className="pdp-nav" aria-label="Other fragrances">
      {[
        { label: "Previous", p: prev, cls: "pdp-nav-prev" },
        { label: "Next", p: next, cls: "pdp-nav-next" },
      ].map(({ label, p, cls }) => (
        <Link key={p.handle} href={`/products/${p.handle}`} className={`pdp-nav-link ${cls}`}>
          <Image src={thumb(p).src} alt="" width={thumb(p).width} height={thumb(p).height} sizes="(max-width: 767px) 100vw, 50vw" className="pdp-nav-img" />
          <span className="pdp-nav-body">
            <span className="pdp-nav-label">{label}</span>
            <span className="pdp-nav-title">{p.title}</span>
          </span>
        </Link>
      ))}
    </nav>
  );
}
