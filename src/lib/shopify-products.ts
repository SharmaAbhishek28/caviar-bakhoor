/**
 * src/lib/shopify-products.ts
 *
 * Server-side: lays Shopify's live price (USD or INR) and availability over a product
 * from data/products.ts, matched by handle. The story (descriptions,
 * images, notes) stays in data/products.ts; Shopify is the authority for
 * what a customer pays and whether they can buy.
 *
 * Read at build time: the site is static (Cloudflare Pages), and a product
 * saved in the Shopify admin triggers a rebuild through a webhook, so a new
 * price reaches the site in about two minutes (docs/deploy-cloudflare.md).
 * If the store is not configured or does not answer, the file's values stand.
 */

import type { Product } from "@/data/products";
import { shopifyEnabled } from "./shopify";

const DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN;

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
    });
    if (!res.ok) return product;
    const { data } = (await res.json()) as { data?: Live };
    const v = data?.product?.variants.nodes[0];
    if (!data?.product || !v) return product;
    // The store may price in USD (shown on the site) or INR; take whichever
    // Shopify sends, and keep the file's value for the other.
    const minor = Math.round(parseFloat(v.price.amount) * 100);
    const price =
      v.price.currencyCode === "USD" ? { priceUsdMinor: minor } :
      v.price.currencyCode === "INR" ? { priceMinor: minor } : {};
    return { ...product, ...price, available: data.product.availableForSale };
  } catch {
    return product;
  }
}
