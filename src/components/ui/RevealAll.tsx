"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { SplitText } from "gsap/SplitText";
import { gsap, initScroll, prefersReducedMotion, ScrollTrigger } from "@/lib/scroll";

/**
 * Site-wide scroll reveal (site owner, 2026-10-16 — overrides the CLAUDE.md
 * "one motion moment" rule, by request). Everything replays: it resets when
 * scrolled back above, and plays again on the way down.
 *
 *  - Headings and caps subheads: split into lines, each line rising out of
 *    its own mask, staggered (SplitText — free since GSAP 3.13).
 *  - Paragraphs and buttons: fade and rise 40px.
 *  - Images and video: fade and settle from a slight zoom, so they never
 *    slide out of a cropping frame.
 *
 * Left alone:
 *  - anything already on screen at load (the hero, and the LCP element:
 *    hiding it would delay Largest Contentful Paint);
 *  - elements a section already animates itself (SKIP_*), which a second
 *    animation would fight;
 *  - anything under [data-no-reveal].
 * Off entirely under prefers-reduced-motion. Rebuilt on every route change,
 * and on a resize that changes the width (line breaks move).
 */
export const HEADINGS = "h1, h2, h3, h4, .type-display-sub";
const TEXT = "p:not(.type-display-sub), blockquote, .cta-button";
const MEDIA = "img, video";

/* Owners of their own choreography. Headings are skipped only where the
   section animates the heading itself; text and media also skip <Reveal>
   blocks, which fade their children already. */
const SKIP_COMMON = [
  "[data-reveal-load]",
  "header",
  "footer",
  "[data-no-reveal]",
  ".wheel-root",
  ".ab-opener",
  ".ab-gallery",
  ".ab-frame",
  ".biz-opener",
  ".biz-statement",
  ".biz-card",
  ".biz-step",
  ".nf",
  ".pol",
  ".pdp-hero",
  ".rt-opener",
  ".rt-step-copy",
  ".rt-step-img",
  ".rt-item",
  ".rt-col",
];
const SKIP_HEADINGS = SKIP_COMMON.join(", ");
const SKIP_OTHER = [
  ...SKIP_COMMON,
  "[data-reveal]",
  ".biz-clients",
  ".biz-offer",
  ".biz-process",
  ".rt-steps",
  ".rt-box",
  ".rt-heat",
  ".rt-objects",
].join(", ");

function pick(main: HTMLElement, selector: string, skip: string) {
  const fold = window.innerHeight;
  const all = `${HEADINGS}, ${TEXT}, ${MEDIA}`;
  return Array.from(main.querySelectorAll<HTMLElement>(selector)).filter((el) => {
    if (el.closest(skip)) return false;
    // Nested matches (an image inside a picked link): the outer one animates.
    const parent = el.parentElement?.closest(all);
    if (parent && main.contains(parent)) return false;
    const r = el.getBoundingClientRect();
    if (r.width === 0 && r.height === 0) return false;
    return r.top > fold;
  });
}

export function RevealAll() {
  const pathname = usePathname();

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const main = document.querySelector("main");
    if (!main) return;
    initScroll();
    gsap.registerPlugin(SplitText);

    let triggers: ScrollTrigger[] = [];
    let splits: SplitText[] = [];
    let animated: HTMLElement[] = [];
    let cancelled = false;

    const teardown = () => {
      triggers.forEach((t) => t.kill());
      gsap.killTweensOf(animated);
      gsap.set(animated, { clearProps: "opacity,transform" });
      splits.forEach((s) => s.revert());
      triggers = [];
      splits = [];
      animated = [];
    };

    const riseIn = (lines: HTMLElement[], delay = 0) =>
      gsap.to(lines, { yPercent: 0, duration: 1.1, ease: "expo.out", stagger: 0.1, delay, overwrite: true });

    const build = () => {
      // [data-reveal-load]: first-screen headings (the hero caption). They
      // rise as the page loads, hide once scrolled fully out of view, and
      // rise again when scrolled back to.
      main.querySelectorAll<HTMLElement>("[data-reveal-load]").forEach((h) => {
        // Text is split into masked lines; a heading that is an image (the
        // hero logotype) marks its own parts, each already inside a mask.
        const parts = Array.from(h.querySelectorAll<HTMLElement>("[data-reveal-part]"));
        let lines = parts;
        if (!parts.length) {
          const split = SplitText.create(h, { type: "lines", mask: "lines" });
          splits.push(split);
          lines = split.lines as HTMLElement[];
        }
        animated.push(...lines, h);
        gsap.set(lines, { yPercent: 110 });
        gsap.set(h, { opacity: 1 });
        riseIn(lines, 0.25);
        triggers.push(
          ScrollTrigger.create({
            trigger: h,
            start: "top bottom",
            end: "bottom top",
            onLeave: () => gsap.set(lines, { yPercent: 110, overwrite: true }),
            onEnterBack: () => riseIn(lines),
          }),
        );
      });

      const headings = pick(main, HEADINGS, SKIP_HEADINGS);
      const text = pick(main, TEXT, SKIP_OTHER);
      const media = pick(main, MEDIA, SKIP_OTHER);

      // Headings: one mask per line; the line rises out of it.
      headings.forEach((h) => {
        const split = SplitText.create(h, { type: "lines", mask: "lines" });
        splits.push(split);
        const lines = split.lines as HTMLElement[];
        animated.push(...lines);
        gsap.set(lines, { yPercent: 110 });
        triggers.push(
          ScrollTrigger.create({
            trigger: h,
            start: "top 92%",
            onEnter: () => riseIn(lines),
            onLeaveBack: () => gsap.set(lines, { yPercent: 110, overwrite: true }),
          }),
        );
      });

      const TEXT_FROM = { opacity: 0, y: 40 };
      const MEDIA_FROM = { opacity: 0, scale: 1.06 };
      gsap.set(text, TEXT_FROM);
      gsap.set(media, MEDIA_FROM);
      animated.push(...text, ...media);

      const batch = (els: HTMLElement[], from: gsap.TweenVars, to: gsap.TweenVars) =>
        ScrollTrigger.batch(els, {
          start: "top 92%",
          onEnter: (b) =>
            gsap.to(b, { ...to, duration: 1, ease: "expo.out", stagger: 0.08, overwrite: true }),
          onLeaveBack: (b) => gsap.set(b, { ...from, overwrite: true }),
        });

      triggers.push(
        ...batch(text, TEXT_FROM, { opacity: 1, y: 0 }),
        ...batch(media, MEDIA_FROM, { opacity: 1, scale: 1 }),
      );
      ScrollTrigger.refresh();
    };

    // Line breaks depend on the web fonts, so split only once they're in.
    let frame = 0;
    document.fonts.ready.then(() => {
      if (cancelled) return;
      frame = requestAnimationFrame(build);
    });

    // A width change moves the line breaks: rebuild. Height-only resizes
    // (a phone's address bar) are ignored.
    let width = window.innerWidth;
    let timer = 0;
    const onResize = () => {
      if (Math.abs(window.innerWidth - width) < 40) return;
      width = window.innerWidth;
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        teardown();
        build();
      }, 200);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      window.clearTimeout(timer);
      window.removeEventListener("resize", onResize);
      teardown();
    };
  }, [pathname]);

  return null;
}
