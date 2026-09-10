import type { Product } from "@/data/products";

/**
 * Display helpers for product facts that may still be unconfirmed. Each
 * returns the visible [CONFIRM] marker rather than a plausible stand-in —
 * CLAUDE.md content rules.
 */

export function formatPrice(product: Product): string {
  if (product.priceMinor === null) return "[CONFIRM]";
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: product.currency,
    maximumFractionDigits: 0,
  }).format(product.priceMinor / 100);
}

export function formatWeight(product: Product): string {
  return product.weightGrams === null ? "[CONFIRM] g" : `${product.weightGrams} g`;
}

/** Top/heart/base as a display string, or the marker when the perfumer has not supplied them. */
export function formatNotes(notes: string[]): string {
  return notes.length ? notes.join(", ") : "[CONFIRM]";
}
