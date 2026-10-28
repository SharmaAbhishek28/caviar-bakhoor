# Deploying to Cloudflare Pages

The site is a fully static export (`output: "export"` in `next.config.ts`).
`npm run build` writes everything to `out/`, and any static host can serve it.
Cloudflare Pages is the intended host: free, commercial use allowed, no
bandwidth charge.

## What the build does

| Step | Script | Why |
|---|---|---|
| `prebuild` | `scripts/optimize-images.mjs` | There is no image server on a static host. Every photograph in `public/images` (except `_raw`) is resized to each width in `image-sizes.json` as WebP, into `public/_img` (git-ignored). `src/lib/image-loader.ts` points `next/image` at those files. |
| `build` | `next build` | Static HTML for every page. Product prices and stock are read from Shopify **at build time**. |
| `postbuild` | `scripts/flatten-prefetch.mjs` | Next writes link-prefetch data as `about/__next.about/__PAGE__.txt` but the browser requests `about/__next.about.__PAGE__.txt`. Vercel rewrites this; a static host cannot, so the script writes the dotted copy. |

## One-time setup

1. **Cloudflare dashboard → Workers & Pages → Create → Pages → Connect to Git.** Pick the repository and the `main` branch.
2. **Build settings**
   - Framework preset: None
   - Build command: `npm run build`
   - Build output directory: `out`
   - Node version comes from `.node-version` (22).
3. **Environment variables** (Production and Preview):
   - `NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN`: the store's `*.myshopify.com` domain
   - `NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN`: the Headless channel's **public** Storefront token (never an Admin token)

   Without them the site still builds, but the bag runs as an offline stub and
   prices come from `src/data/products.ts`.
4. **Custom domain:** Pages project → Custom domains → add `caviarbakhoor.com` and
   `www.caviarbakhoor.com`. Easiest when the domain's nameservers are on Cloudflare.
5. **Checkout domain:** add a DNS record `CNAME shop → shops.myshopify.com`
   (DNS only, not proxied), then in Shopify: Settings → Domains → Connect existing
   domain → `shop.caviarbakhoor.com`.
6. **Theme redirect:** in the Shopify theme's `layout/theme.liquid`, change the
   redirect target from the Vercel URL to `https://caviarbakhoor.com`.

## Rebuild when a product changes in Shopify

Prices and stock are baked in at build time, so a change in Shopify needs a rebuild.

1. Cloudflare: Pages project → Settings → Builds → **Deploy hooks** → Add, branch
   `main`. Copy the URL.
2. Shopify admin: Settings → Notifications → **Webhooks** → Create webhook, once for
   each event below, format JSON, URL = the deploy hook:
   - Product update
   - Inventory levels update

A saved product then rebuilds the site in a few minutes. Checkout always charges
the price saved in Shopify, whatever the page showed.

## Limits to remember

- Cloudflare Pages: 25 MiB per file, 20,000 files per deploy. The largest file today
  is `public/video/box-1080.mp4` at about 23 MB. Encode new videos small (see
  `public/video/ugc`).
- 500 builds a month on the free plan. One per product save is far below that.

## Local preview

```
npm run build
npm start        # serves out/ on http://localhost:3000
```
