/**
 * src/lib/cart.ts
 *
 * The bag. A stub with the shape the Shopify developer replaces — Storefront
 * API cartCreate / cartLinesAdd — so the Add to bag button, the buy bar and
 * the header count are all wired now and change nothing later.
 *
 * Today it resolves after a short delay and logs in development. The header
 * count stays at zero until the real cart exists: a fake count would be a
 * lie about the customer's bag.
 */

export type AddToBagResult = { ok: true } | { ok: false; error: string };

export async function addToBag(handle: string, quantity = 1): Promise<AddToBagResult> {
  if (process.env.NODE_ENV !== "production") {
    console.info("[addToBag] stub", { handle, quantity });
  }
  await new Promise((r) => setTimeout(r, 400));
  return { ok: true };
}
