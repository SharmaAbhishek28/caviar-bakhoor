import type { Product } from "@/data/products";

/**
 * Display helpers for product facts that may still be unconfirmed.
 *
 * The PDP no longer shows the [CONFIRM] marker (site owner, 2026-10-17): a
 * fact the client has not supplied returns null and is simply not rendered.
 * The data in products.ts keeps its CONFIRM comments, so the gaps stay
 * findable for whoever fills them in.
 */

/** "Rs. 25,000 · USD 250". Written out rather than with the rupee sign,
 *  which Switzer does not draw. */
export function formatPrice(product: Product): string | null {
  if (product.priceMinor === null) return null;
  const n = (minor: number, locale: string) => new Intl.NumberFormat(locale, { maximumFractionDigits: 0 }).format(minor / 100);
  const inr = `Rs. ${n(product.priceMinor, "en-IN")}`;
  return product.priceUsdMinor === null ? inr : `${inr} · USD ${n(product.priceUsdMinor, "en-US")}`;
}

export function formatWeight(product: Product): string | null {
  return product.weightGrams === null ? null : `${product.weightGrams} g`;
}
