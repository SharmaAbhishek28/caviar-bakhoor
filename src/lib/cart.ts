/**
 * src/lib/cart.ts
 *
 * The bag, on Shopify's Storefront Cart API when the store is connected
 * (see lib/shopify.ts); a stub that changes nothing otherwise.
 *
 * Products are matched by handle: a Shopify product's handle must equal the
 * one in data/products.ts (noir, ward-baccarat, imperial-zafran,
 * amber-blanc). Its first variant is the one added.
 *
 * The cart id lives in localStorage, so the bag survives reloads. Every
 * change is announced with a "cart:change" event carrying the item count
 * and Shopify's checkout URL; the header listens (useCart).
 */

import { useEffect, useState } from "react";
import { shopifyEnabled, storefront } from "./shopify";

export type AddToBagResult = { ok: true } | { ok: false; error: string };
export type CartState = { count: number; checkoutUrl: string | null };

const KEY = "cb-cart-id";
const EVENT = "cart:change";

const CART_FIELDS = `id checkoutUrl totalQuantity`;
type CartPayload = { id: string; checkoutUrl: string; totalQuantity: number };

const readId = () => {
  try {
    return localStorage.getItem(KEY);
  } catch {
    return null;
  }
};
const writeId = (id: string | null) => {
  try {
    if (id) localStorage.setItem(KEY, id);
    else localStorage.removeItem(KEY);
  } catch {
    /* private mode: the bag lasts for this page only */
  }
};

const announce = (cart: CartPayload | null) => {
  const detail: CartState = { count: cart?.totalQuantity ?? 0, checkoutUrl: cart?.checkoutUrl ?? null };
  window.dispatchEvent(new CustomEvent<CartState>(EVENT, { detail }));
};

async function variantFor(handle: string): Promise<string> {
  const data = await storefront<{ product: { variants: { nodes: { id: string; availableForSale: boolean }[] } } | null }>(
    `query($handle: String!) { product(handle: $handle) { variants(first: 1) { nodes { id availableForSale } } } }`,
    { handle },
  );
  const v = data.product?.variants.nodes[0];
  if (!v) throw new Error(`No Shopify product with handle "${handle}"`);
  if (!v.availableForSale) throw new Error("Sold out");
  return v.id;
}

export async function addToBag(handle: string, quantity = 1): Promise<AddToBagResult> {
  if (!shopifyEnabled) {
    if (process.env.NODE_ENV !== "production") console.info("[addToBag] stub", { handle, quantity });
    await new Promise((r) => setTimeout(r, 400));
    return { ok: true };
  }
  try {
    const merchandiseId = await variantFor(handle);
    const lines = [{ merchandiseId, quantity }];
    const id = readId();
    let cart: CartPayload | null = null;
    if (id) {
      const d = await storefront<{ cartLinesAdd: { cart: CartPayload | null; userErrors: { message: string }[] } }>(
        `mutation($id: ID!, $lines: [CartLineInput!]!) { cartLinesAdd(cartId: $id, lines: $lines) { cart { ${CART_FIELDS} } userErrors { message } } }`,
        { id, lines },
      );
      cart = d.cartLinesAdd.cart;
    }
    if (!cart) {
      // No cart yet, or the stored one expired: start a new one.
      const d = await storefront<{ cartCreate: { cart: CartPayload | null; userErrors: { message: string }[] } }>(
        `mutation($lines: [CartLineInput!]!) { cartCreate(input: { lines: $lines }) { cart { ${CART_FIELDS} } userErrors { message } } }`,
        { lines },
      );
      cart = d.cartCreate.cart;
      if (!cart) throw new Error(d.cartCreate.userErrors.map((e) => e.message).join("; ") || "Could not create the bag");
    }
    writeId(cart.id);
    announce(cart);
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Could not add to the bag" };
  }
}

/** The bag's count and checkout URL, kept current. */
export function useCart(): CartState {
  const [state, setState] = useState<CartState>({ count: 0, checkoutUrl: null });
  useEffect(() => {
    const on = (e: Event) => setState((e as CustomEvent<CartState>).detail);
    window.addEventListener(EVENT, on);
    const id = shopifyEnabled ? readId() : null;
    if (id) {
      storefront<{ cart: CartPayload | null }>(`query($id: ID!) { cart(id: $id) { ${CART_FIELDS} } }`, { id })
        .then((d) => {
          if (!d.cart) writeId(null);
          announce(d.cart);
        })
        .catch(() => {});
    }
    return () => window.removeEventListener(EVENT, on);
  }, []);
  return state;
}
