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
 * Until then it renders the spec's own stated fallback: a slow 1.06 → 1.0
 * settle on the pearl macro still (docs/homepage.md § 01, Assets).
 *
 * The source clips in docs/video-source/ still need compressing before they
 * can ship — CLAUDE.md caps the hero video at 3MB with a poster frame, and
 * the "Copy of CAVIAR ITALIAN SUBS" file is 1.06 GB. The spec's own ffmpeg
 * recipe is in § 01.
 */
const VIDEO_PUBLIC_PATH = "/video/hero.mp4";
const POSTER_PUBLIC_PATH = "/images/texture/pearl-macro.jpg";

function videoExists(): boolean {
  try {
    return fs.existsSync(path.join(process.cwd(), "public", "video", "hero.mp4"));
  } catch {
    return false;
  }
}

export function Hero() {
  return (
    <HeroMedia
      hasVideo={videoExists()}
      videoSrc={VIDEO_PUBLIC_PATH}
      posterSrc={POSTER_PUBLIC_PATH}
    />
  );
}
