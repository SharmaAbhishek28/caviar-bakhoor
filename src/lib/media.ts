import { useEffect, useState, type RefObject } from "react";

/**
 * Playback volume for every film on the site when its sound is turned on:
 * ambient, under the page rather than over it (site owner, 2026-10-19).
 * 0–1; one place to change it.
 */
export const AMBIENT_VOLUME = 0.25;


/**
 * True once the element is within `margin` of the screen, and stays true.
 * Films below the fold set their poster and sources only then: a poster
 * attribute downloads at once wherever the video sits on the page, and a
 * dozen of them competed with the scripts on first load.
 */
export function useNear(ref: RefObject<Element | null>, margin = "1200px"): boolean {
  const [near, setNear] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || near) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setNear(true), { rootMargin: margin });
    io.observe(el);
    return () => io.disconnect();
  }, [ref, margin, near]);
  return near;
}

/**
 * True once the page has finished loading (or after `fallbackMs`, whichever
 * is first). The hero film waits for this, so its megabytes never queue in
 * front of the scripts and images the first screen needs.
 */
export function usePageLoaded(fallbackMs = 4000): boolean {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    let done = false;
    const go = () => {
      if (done) return;
      done = true;
      setLoaded(true);
    };
    if (document.readyState === "complete") {
      go();
      return;
    }
    window.addEventListener("load", go, { once: true });
    const t = window.setTimeout(go, fallbackMs);
    return () => {
      window.removeEventListener("load", go);
      window.clearTimeout(t);
    };
  }, [fallbackMs]);
  return loaded;
}
