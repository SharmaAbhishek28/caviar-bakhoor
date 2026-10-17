import fs from "node:fs";
import path from "node:path";
import { HeroMedia } from "./01-HeroMedia";

/**
 * 01 — Hero. Full viewport, full-bleed. The header sits over it, nothing else.
 *
 * This wrapper is a server component whose only job is to detect whether the
 * hero video exists. That means the video branch turns itself on the moment
 * public/video/hero-1080.mp4 is added — no constant to remember to flip.
 *
 * Without it, it renders the spec's own stated fallback: a slow 1.06 → 1.0
 * settle on the pearl macro still (docs/homepage.md § 01, Assets).
 *
 * The video is docs/video-source/CAVIAR DE PARFUM.mp4 (9.6MB, 47s, 1080p),
 * uncut, keeping the audio for the sound toggle. Encoded for quality at the
 * source's full 1080p (site owner, 2026-10-17), AV1 first:
 *   hero-1080.webm  AV1  -crf 34, Opus 64k        wide screens
 *   hero-1080.mp4   H.264 -crf 22 -maxrate 1.5M   wide screens, no AV1
 *   hero-720.webm   AV1  -crf 36, Opus 48k        phones
 *   hero-720.mp4    H.264 -crf 24 -maxrate 800k   phones, no AV1
 *   hero-poster.jpg  the frame at 1s (the Elixir mark), so the poster
 *                    and the video's first frames match.
 * All with -preset slow -movflags +faststart.
 *
 * NOTE: the clip's title card (≈2–4s) reads "Presenting CAVIAR DE PARFUM",
 * the name the client retired on 2026-09-17. The site owner chose to ship
 * the video exactly as supplied (2026-10-17).
 */
/* AV1 first (sharper at the same size), H.264 for browsers without it;
   1080p from 768px, 720p below. The browser plays the first it can. */
const VIDEO_SOURCES = [
  { src: "/video/hero-1080.webm", type: 'video/webm; codecs="av01.0.08M.08, opus"', media: "(min-width: 768px)" },
  { src: "/video/hero-1080.mp4", type: "video/mp4", media: "(min-width: 768px)" },
  { src: "/video/hero-720.webm", type: 'video/webm; codecs="av01.0.05M.08, opus"' },
  { src: "/video/hero-720.mp4", type: "video/mp4" },
];
const VIDEO_POSTER_PUBLIC_PATH = "/video/hero-poster.jpg";
const STILL_PUBLIC_PATH = "/images/texture/pearl-macro.jpg";

function videoExists(): boolean {
  try {
    return fs.existsSync(path.join(process.cwd(), "public", "video", "hero-1080.mp4"));
  } catch {
    return false;
  }
}

export function Hero() {
  const hasVideo = videoExists();
  return (
    <HeroMedia
      hasVideo={hasVideo}
      sources={VIDEO_SOURCES}
      posterSrc={hasVideo ? VIDEO_POSTER_PUBLIC_PATH : STILL_PUBLIC_PATH}
    />
  );
}
