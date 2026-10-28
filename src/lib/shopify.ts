/**
 * src/lib/shopify.ts
 *
 * The one connection to Shopify: the Storefront API (headless). The site
 * is static, on Cloudflare Pages; Shopify holds the products, the cart and the checkout.
 *
 * Configured by two public environment variables, set in the host's build settings:
 *   NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN       e.g. caviar-bakhoor.myshopify.com
 *   NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN   the Headless channel's public
 *                                          Storefront access token
 * The public token is designed to ship to the browser: it can read the
 * catalogue and build carts, nothing else. Never put an Admin token here.
 *
 * Unset (as in development), `shopifyEnabled` is false and the bag falls
 * back to its stub, so the site works with or without the store.
 */

const DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN;
const API_VERSION = "2025-07";

export const shopifyEnabled = Boolean(DOMAIN && TOKEN);

export async function storefront<T>(query: string, variables: Record<string, unknown> = {}): Promise<T> {
  if (!shopifyEnabled) throw new Error("Shopify is not configured");
  const res = await fetch(`https://${DOMAIN}/api/${API_VERSION}/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": TOKEN as string,
    },
    body: JSON.stringify({ query, variables }),
  });
  if (!res.ok) throw new Error(`Storefront API ${res.status}`);
  const json = (await res.json()) as { data?: T; errors?: { message: string }[] };
  if (json.errors?.length) throw new Error(json.errors.map((e) => e.message).join("; "));
  return json.data as T;
}
