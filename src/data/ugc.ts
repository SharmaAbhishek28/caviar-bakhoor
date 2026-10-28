/**
 * src/data/ugc.ts
 *
 * "In their hands" on the home page (site owner, 2026-10-24): creator
 * videos, partner films and photographs of Caviar Bakhoor out in the world,
 * on one sideways track. Add an item by adding an entry here: a video
 * (9:16, public/video/ugc/) or a photograph (public/images/ugc/).
 *
 * Supplied as WhatsApp files; the Instagram screen recordings are cropped to
 * the film alone. Credits are only what the files themselves show. Before
 * launch: permission from tripleA, Fan Al Oud, Golden Scent and each creator to reuse
 * their films, and from the people in the booth photographs.
 *
 * Typed data, per CLAUDE.md: each entry becomes a Shopify metaobject.
 */

export type UgcItem =
  | { kind: "video"; id: string; title: string; credit: string | null; src: string; poster: string }
  | { kind: "image"; id: string; title: string; credit: string | null; src: string; alt: string; width: number; height: number };

export const UGC: {
  eyebrow: string;
  headline: string[];
  line?: string;
  items: UgcItem[];
} = {
  eyebrow: "Caviar Bakhoor, out in the world",
  headline: ["In their", "hands."],
  items: [
    { kind: "video", id: "saffron-unboxing", title: "Unboxing the Saffron tin", credit: null, src: "/video/ugc/saffron-unboxing.mp4", poster: "/video/ugc/saffron-unboxing-poster.jpg" },
    { kind: "video", id: "in-store", title: "At the counter", credit: "@wowviruae", src: "/video/ugc/in-store.mp4", poster: "/video/ugc/in-store-poster.jpg" },
    { kind: "video", id: "collection-reel", title: "The collection, on film", credit: "@bawwabah.bykaya", src: "/video/ugc/collection-reel.mp4", poster: "/video/ugc/collection-reel-poster.jpg" },
    { kind: "video", id: "fan-al-oud-film", title: "Fan Al Oud, on film", credit: null, src: "/video/ugc/fan-al-oud-film.mp4", poster: "/video/ugc/fan-al-oud-film-poster.jpg" },
    { kind: "video", id: "saffron-burner", title: "Saffron, on the burner", credit: null, src: "/video/ugc/saffron-burner.mp4", poster: "/video/ugc/saffron-burner-poster.jpg" },
    { kind: "video", id: "fan-al-oud-booth", title: "At the Fan Al Oud booth", credit: "@fanaloud", src: "/video/ugc/fan-al-oud-booth.mp4", poster: "/video/ugc/fan-al-oud-booth-poster.jpg" },
    { kind: "video", id: "golden-scent-film", title: "Golden Scent, on film", credit: null, src: "/video/ugc/golden-scent-film.mp4", poster: "/video/ugc/golden-scent-film-poster.jpg" },
    { kind: "video", id: "exhibition-tin", title: "Opening the gold tin", credit: null, src: "/video/ugc/exhibition-tin.mp4", poster: "/video/ugc/exhibition-tin-poster.jpg" },
    { kind: "video", id: "fan-al-oud-g103", title: "Fan Al Oud, booth G103", credit: "@nammoola", src: "/video/ugc/fan-al-oud-g103.mp4", poster: "/video/ugc/fan-al-oud-g103-poster.jpg" },
    {
      kind: "image",
      id: "booth-02",
      title: "In conversation",
      credit: null,
      src: "/images/ugc/booth-02.jpg",
      alt: "At the Elixir booth, Caviar Bakhoor explained to visitors over the boxes and burners",
      width: 1600,
      height: 1067,
    },
  ],
};
