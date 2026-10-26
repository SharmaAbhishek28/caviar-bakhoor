import type { Product } from "@/data/products";

/**
 * Display helpers for product facts that may still be unconfirmed.
 *
 * The PDP no longer shows the [CONFIRM] marker (site owner, 2026-10-17): a
 * fact the client has not supplied returns null and is simply not rendered.
 * The data in products.ts keeps its CONFIRM comments, so the gaps stay
 * findable for whoever fills them in.
 */

/** The price shown on the site: USD only (site owner, 2026-10-26: no
 *  rupee price on the PDP). Shopify still charges in its store currency at
 *  checkout. Falls back to nothing when no USD price is set. */
export function formatPrice(product: Product): string | null {
  if (product.priceUsdMinor === null) return null;
  return `USD ${new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(product.priceUsdMinor / 100)}`;
}

export function formatWeight(product: Product): string | null {
  return product.weightGrams === null ? null : `${product.weightGrams} g`;
}
