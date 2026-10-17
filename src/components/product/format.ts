import type { Product } from "@/data/products";

/**
 * Display helpers for product facts that may still be unconfirmed.
 *
 * The PDP no longer shows the [CONFIRM] marker (site owner, 2026-10-17): a
 * fact the client has not supplied returns null and is simply not rendered.
 * The data in products.ts keeps its CONFIRM comments, so the gaps stay
 * findable for whoever fills them in.
 */

export function formatPrice(product: Product): string | null {
  if (product.priceMinor === null) return null;
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: product.currency,
    maximumFractionDigits: 0,
  }).format(product.priceMinor / 100);
}

export function formatWeight(product: Product): string | null {
  return product.weightGrams === null ? null : `${product.weightGrams} g`;
}
