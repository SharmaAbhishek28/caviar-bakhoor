import type { NextConfig } from "next";
import sizes from "./image-sizes.json";

/**
 * A fully static site (`out/`), hosted on Cloudflare Pages. Nothing here
 * needs a server: the cart and checkout talk to Shopify from the browser,
 * and product prices are read from Shopify at build time (a Shopify
 * webhook triggers a rebuild when a product changes; see
 * docs/deploy-cloudflare.md).
 *
 * Images: no image server on a static host, so photographs are resized
 * ahead of time (scripts/optimize-images.mjs) and next/image picks the
 * right width through src/lib/image-loader.ts.
 */
const nextConfig: NextConfig = {
  output: "export",
  images: {
    loader: "custom",
    loaderFile: "./src/lib/image-loader.ts",
    deviceSizes: sizes.deviceSizes,
    imageSizes: sizes.imageSizes,
  },
};

export default nextConfig;
