/**
 * src/data/ugc.ts
 *
 * Creator videos of the tripleA Caviar Incense Collection (Caviar Bakhoor
 * made by Elixir), for the home page (site owner, 2026-10-24). Supplied as
 * WhatsApp videos; two were screen recordings of Instagram and are cropped
 * to the film alone (public/video/ugc/).
 *
 * Credits are only what the recordings themselves show. Before launch:
 * permission from tripleA and from each creator to reuse their videos.
 *
 * Typed data, per CLAUDE.md: each entry becomes a Shopify metaobject.
 */

export type UgcVideo = {
  id: string;
  /** What the film shows, in a few words. */
  title: string;
  /** Who made it, as the recording shows; null when it does not. */
  credit: string | null;
  src: string;
  poster: string;
};

export const UGC = {
  eyebrow: "Caviar Bakhoor, out in the world",
  headline: ["In their", "hands."],
  line: "The Caviar Incense Collection, made by Elixir for tripleA Perfumes, as its first customers film it.",
  videos: [
    { id: "saffron-unboxing", title: "Unboxing the Saffron tin", credit: null, src: "/video/ugc/saffron-unboxing.mp4", poster: "/video/ugc/saffron-unboxing-poster.jpg" },
    { id: "in-store", title: "At the counter", credit: "@wowviruae", src: "/video/ugc/in-store.mp4", poster: "/video/ugc/in-store-poster.jpg" },
    { id: "collection-reel", title: "The collection, on film", credit: "@bawwabah.bykaya", src: "/video/ugc/collection-reel.mp4", poster: "/video/ugc/collection-reel-poster.jpg" },
  ] satisfies UgcVideo[],
};
