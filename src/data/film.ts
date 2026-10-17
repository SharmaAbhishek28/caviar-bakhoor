/**
 * src/data/film.ts
 *
 * The ritual film shown under the composition line on every PDP: the
 * client's "VE Project 5-2" (docs/video-source), the hero's earlier video,
 * compressed with the spec's § 01 recipe and keeping its sound:
 *   pdp-film.mp4         720p  -crf 30 -maxrate 560k, AAC 64k   ~1.9MB
 *   pdp-film-mobile.mp4  540p  -crf 31 -maxrate 380k, AAC 48k   ~1.1MB
 *   pdp-film-poster.jpg  the frame at 9s, the product on the table.
 * Uncut: its opening title cards include "Presenting CAVIAR DE PARFUM", the
 * retired name, as the hero film's do.
 */
export const PDP_FILM = {
  src: "/video/pdp-film.mp4",
  mobileSrc: "/video/pdp-film-mobile.mp4",
  poster: "/video/pdp-film-poster.jpg",
  label: "Caviar Bakhoor: the box, the tin, the pearls lit on the burner",
};
