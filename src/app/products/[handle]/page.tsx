import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BuyBar } from "@/components/product/BuyBar";
import { ProductHero } from "@/components/product/ProductHero";
import { NotesSection, ProductNav } from "@/components/product/ProductSections";
import { getProduct, products } from "@/data/products";
import { withShopifyPrice } from "@/lib/shopify-products";

/** Shopify price and availability are read at build time; a product saved in
 * Shopify triggers a rebuild (docs/deploy-cloudflare.md). */

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
    description: `${product.title}: scented bakhoor, encapsulated in pearls with 24-karat gold. ${product.accord}.`,
  };
}

/**
 * /products/[handle] — the PDP, simplified (site owner, 2026-10-17): the
 * pinned hero with the floating panel, the composition line, then the other
 * two fragrances as collection cards, and the layout's footer. The sticky
 * buy bar lives outside the flow.
 *
 * Server-rendered from the single data source; the product reaches every
 * component as a prop.
 */
export default async function ProductPage({ params }: { params: Promise<Params> }) {
  const { handle } = await params;
  const base = getProduct(handle);
  if (!base) notFound();
  const product = await withShopifyPrice(base);

  return (
    <>
      <ProductHero product={product} />
      <NotesSection product={product} />
      <ProductNav product={product} all={products} />
      <BuyBar product={product} />
    </>
  );
}
