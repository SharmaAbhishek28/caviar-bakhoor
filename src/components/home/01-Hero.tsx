import fs from "node:fs";
import path from "node:path";
import { HeroMedia } from "./01-HeroMedia";

/**
 * 01 — Hero. Full viewport, full-bleed. The header sits over it, nothing else.
 *
 * This wrapper is a server component whose only job is to detect whether the
 * hero video exists. That means the video branch turns itself on the moment
 * public/video/hero.mp4 is added — no constant to remember to flip.
 *
 * Without it, it renders the spec's own stated fallback: a slow 1.06 → 1.0
 * settle on the pearl macro still (docs/homepage.md § 01, Assets).
 *
 * The video is docs/video-source/CAVIAR DE PARFUM.mp4 (9.6MB, 47s, 1080p),
 * uncut, compressed with the spec's § 01 recipe and keeping the audio for
 * the sound toggle — CLAUDE.md caps the hero at 3MB:
 *   hero.mp4         720p  -crf 30 -maxrate 420k, AAC 56k   ~2.2MB
 *   hero-mobile.mp4  540p  -crf 31 -maxrate 260k, AAC 48k   ~1.4MB
 *   hero-poster.jpg  the frame at 1s (the Elixir mark), so the poster
 *                    and the video's first frames match.
 * All with -preset slow -movflags +faststart.
 *
 * NOTE: the clip's title card (≈2–4s) reads "Presenting CAVIAR DE PARFUM",
 * the name the client retired on 2026-09-17. The site owner chose to ship
 * the video exactly as supplied (2026-10-17).
 */
const VIDEO_PUBLIC_PATH = "/video/hero.mp4";
const MOBILE_VIDEO_PUBLIC_PATH = "/video/hero-mobile.mp4";
const VIDEO_POSTER_PUBLIC_PATH = "/video/hero-poster.jpg";
const STILL_PUBLIC_PATH = "/images/texture/pearl-macro.jpg";

function videoExists(): boolean {
  try {
    return fs.existsSync(path.join(process.cwd(), "public", "video", "hero.mp4"));
  } catch {
    return false;
  }
}

export function Hero() {
  const hasVideo = videoExists();
  return (
    <HeroMedia
      hasVideo={hasVideo}
      videoSrc={VIDEO_PUBLIC_PATH}
      mobileVideoSrc={MOBILE_VIDEO_PUBLIC_PATH}
      posterSrc={hasVideo ? VIDEO_POSTER_PUBLIC_PATH : STILL_PUBLIC_PATH}
    />
  );
}
