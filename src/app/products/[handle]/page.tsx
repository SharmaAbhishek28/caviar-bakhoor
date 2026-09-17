import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BuyBar } from "@/components/product/BuyBar";
import { ProductHero } from "@/components/product/ProductHero";
import {
  DetailsSection,
  NotesSection,
  ProductNav,
  ReviewsSection,
  StorySection,
} from "@/components/product/ProductSections";
import { getProduct, products } from "@/data/products";

type Params = { handle: string };

export function generateStaticParams(): Params[] {
  return products.map((p) => ({ handle: p.handle }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { handle } = await params;
  const product = getProduct(handle);
  if (!product) return {};
  return {
    title: `${product.title} | Caviar Bakhoor`,
    description: `${product.title}: scented bakhoor, encapsulated in pearls with 24-karat gold. ${product.fiveWords.join(", ")}.`,
  };
}

/**
 * /products/[handle] — the PDP, in docs/content.md's order: the pinned hero
 * with the floating panel, the notes line, the ritual and details, the story
 * with three square images, reviews, the other fragrances, then the layout's
 * footer. The sticky buy bar lives outside the flow.
 *
 * Server-rendered from the single data source; the product reaches every
 * component as a prop.
 */
export default async function ProductPage({ params }: { params: Promise<Params> }) {
  const { handle } = await params;
  const product = getProduct(handle);
  if (!product) notFound();

  return (
    <>
      <ProductHero product={product} />
      <NotesSection product={product} />
      <DetailsSection product={product} />
      <StorySection product={product} />
      <ReviewsSection product={product} />
      <ProductNav product={product} all={products} />
      <BuyBar product={product} />
    </>
  );
}
