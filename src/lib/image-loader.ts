/**
 * src/lib/image-loader.ts
 *
 * next/image loader for the static build (Cloudflare Pages has no image
 * server). Every photograph under public/images is resized ahead of time by
 * scripts/optimize-images.mjs into public/_img, one WebP per width in
 * image-sizes.json; this maps a request for (src, width) to that file.
 * Anything else (SVG, remote, outside /images) is served as it is.
 */
const RESIZED = /^\/images\/(?!_raw\/)(.+)\.(jpe?g|png|webp|avif)$/i;

export default function imageLoader({ src, width }: { src: string; width: number; quality?: number }): string {
  const m = RESIZED.exec(src);
  return m ? `/_img/${m[1]}-${width}.webp` : src;
}
