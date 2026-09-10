"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

/**
 * The single place scrolling and GSAP are configured. Every scroll-driven
 * section imports from here rather than registering the plugin itself.
 *
 * Smooth scroll is Lenis, not GSAP's ScrollSmoother: ScrollSmoother is a Club
 * GSAP plugin and this project uses the standard no-charge licence. Lenis is
 * MIT and already a dependency. ScrollTrigger is driven from Lenis's own tick
 * so the two never disagree about scroll position.
 */

/* Module-scope state does NOT survive a hot reload: Fast Refresh re-evaluates
   this file and every `let` below starts fresh, while the previous Lenis
   instance keeps its wheel listeners and keeps animating. Two live instances
   then fight over scrollTop and the page appears frozen. Keeping the handle on
   `window` instead lets a re-evaluated module find and destroy the old one. */
declare global {
  interface Window {
    __caviarLenis?: Lenis | null;
  }
}

let registered = false;
let lenis: Lenis | null = null;

/** Registers ScrollTrigger once per page, whoever asks first. */
export function initScroll() {
  if (registered || typeof window === "undefined") return;
  gsap.registerPlugin(ScrollTrigger);
  gsap.ticker.lagSmoothing(0);
  /* On phones the address bar collapsing fires a resize; without this every
     one would refresh the pinned sections and jump the scroll position. */
  ScrollTrigger.config({ ignoreMobileResize: true });
  registered = true;
}

/**
 * Starts Lenis and wires ScrollTrigger to it. Safe to call from more than one
 * component — the second caller gets the running instance. Returns a teardown
 * that only tears down when the last caller releases.
 */
let refCount = 0;
/** Teardown for the re-measure hooks below; set when Lenis is created. */
let stopResizeHooks: (() => void) | null = null;

export function startSmoothScroll(): () => void {
  initScroll();
  if (typeof window === "undefined") return () => {};

  // Respect the viewer's preference: no hijacked scrolling under reduced motion.
  if (prefersReducedMotion()) return () => {};

  refCount += 1;

  // A previous evaluation of this module (hot reload) may have left an
  // instance running. Destroy it before creating ours, or the two fight.
  if (!lenis && window.__caviarLenis) {
    window.__caviarLenis.destroy();
    window.__caviarLenis = null;
  }

  if (!lenis) {
    lenis = new Lenis({
      duration: 1.05,
      // Expo-out, matching --ease elsewhere in the system.
      easing: (t: number) => 1 - Math.pow(1 - t, 4),
      smoothWheel: true,
      touchMultiplier: 1.6,
    });

    // ScrollTrigger reads position from Lenis rather than the native event,
    // so scrubbed animations stay locked to the smoothed position.
    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add(lenisRaf);
    window.__caviarLenis = lenis;

    /* Lenis caps scrolling at a limit it measures itself, and its own
       observer is debounced and watches only <html>. Pins change the page
       height when ScrollTrigger refreshes, fonts change it when they land,
       and hot reloads change it whenever a section is edited — a stale
       limit stops the page short of its real end. Re-measure on every one
       of those. */
    const remeasure = () => lenis?.resize();
    ScrollTrigger.addEventListener("refresh", remeasure);
    const observer = new ResizeObserver(remeasure);
    observer.observe(document.body);
    document.fonts?.ready.then(remeasure);
    stopResizeHooks = () => {
      ScrollTrigger.removeEventListener("refresh", remeasure);
      observer.disconnect();
    };
  }

  return () => {
    refCount -= 1;
    if (refCount <= 0) {
      stopResizeHooks?.();
      stopResizeHooks = null;
      gsap.ticker.remove(lenisRaf);
      lenis?.destroy();
      lenis = null;
      window.__caviarLenis = null;
      refCount = 0;
    }
  };
}

/** Lenis expects milliseconds; the GSAP ticker reports seconds. */
function lenisRaf(time: number) {
  lenis?.raf(time * 1000);
}

/** True when the viewer has asked for reduced motion. */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export { gsap, ScrollTrigger };
