/**
 * src/lib/shopify-products.ts
 *
 * Server-side: lays Shopify's live price and availability over a product
 * from data/products.ts, matched by handle. The story (descriptions,
 * images, notes) stays in data/products.ts; Shopify is the authority for
 * what a customer pays and whether they can buy.
 *
 * Pages that use this revalidate every 5 minutes, so a price changed in the
 * Shopify admin reaches the site within that time, with no redeploy. If the
 * store is not configured or does not answer, the file's values stand.
 */

import type { Product } from "@/data/products";
import { shopifyEnabled } from "./shopify";

const DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN;
export const PRICE_REVALIDATE_SECONDS = 300;

type Live = {
  product: {
    availableForSale: boolean;
    variants: { nodes: { price: { amount: string; currencyCode: string } }[] };
  } | null;
};

export async function withShopifyPrice(product: Product): Promise<Product> {
  if (!shopifyEnabled) return product;
  try {
    const res = await fetch(`https://${DOMAIN}/api/2025-07/graphql.json`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Shopify-Storefront-Access-Token": TOKEN as string },
      body: JSON.stringify({
        query: `query($handle: String!) { product(handle: $handle) { availableForSale variants(first: 1) { nodes { price { amount currencyCode } } } } }`,
        variables: { handle: product.handle },
      }),
      next: { revalidate: PRICE_REVALIDATE_SECONDS, tags: [`shopify:${product.handle}`] },
    });
    if (!res.ok) return product;
    const { data } = (await res.json()) as { data?: Live };
    const v = data?.product?.variants.nodes[0];
    if (!data?.product || !v || v.price.currencyCode !== "INR") return product;
    return {
      ...product,
      priceMinor: Math.round(parseFloat(v.price.amount) * 100),
      available: data.product.availableForSale,
    };
  } catch {
    return product;
  }
}
