"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { gsap, initScroll, prefersReducedMotion, ScrollTrigger } from "@/lib/scroll";

/**
 * Site-wide scroll reveal (site owner, 2026-10-16 — overrides the CLAUDE.md
 * "one motion moment" rule, by request). Every headline, paragraph, image,
 * video and button in <main> fades and rises in as it enters the viewport,
 * and resets when scrolled back above it, so it replays on every visit.
 *
 * Text rises 40px; images settle from a slight zoom instead, so they never
 * slide out of a cropping frame.
 *
 * Left alone:
 *  - anything already on screen at load (the hero, and the LCP element:
 *    hiding it would delay Largest Contentful Paint);
 *  - sections that run their own GSAP choreography (SKIP below), which a
 *    second animation would fight;
 *  - anything inside a <Reveal> block, which does the same thing itself;
 *  - anything under [data-no-reveal].
 * Off entirely under prefers-reduced-motion. Re-runs on every route change.
 */
const TEXT = "h1, h2, h3, h4, p, blockquote, .cta-button";
const MEDIA = "img, video";

const SKIP = [
  "header",
  "footer",
  "[data-reveal]",
  "[data-no-reveal]",
  ".wheel-root",
  ".ab-opener",
  ".ab-gallery",
  ".biz-opener",
  ".biz-statement",
  ".biz-clients",
  ".biz-offer",
  ".biz-process",
  ".nf",
  ".pol",
  ".pdp-hero",
  ".rt-opener",
  ".rt-steps",
  ".rt-box",
  ".rt-heat",
  ".rt-objects",
].join(", ");

function pick(main: HTMLElement, selector: string) {
  const fold = window.innerHeight;
  return Array.from(main.querySelectorAll<HTMLElement>(selector)).filter((el) => {
    if (el.closest(SKIP)) return false;
    // A paragraph inside a button, an image inside a picked link: the outer
    // element animates, not both.
    const parent = el.parentElement?.closest(`${TEXT}, ${MEDIA}`);
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

    let triggers: ScrollTrigger[] = [];
    let text: HTMLElement[] = [];
    let media: HTMLElement[] = [];

    // After the page has laid out, so "on screen at load" is measured right.
    const frame = requestAnimationFrame(() => {
      text = pick(main, TEXT);
      media = pick(main, MEDIA);

      const TEXT_FROM = { opacity: 0, y: 40 };
      const MEDIA_FROM = { opacity: 0, scale: 1.06 };
      gsap.set(text, TEXT_FROM);
      gsap.set(media, MEDIA_FROM);

      const batch = (els: HTMLElement[], from: gsap.TweenVars, to: gsap.TweenVars) =>
        ScrollTrigger.batch(els, {
          start: "top 92%",
          onEnter: (b) =>
            gsap.to(b, { ...to, duration: 1, ease: "expo.out", stagger: 0.08, overwrite: true }),
          onLeaveBack: (b) => gsap.set(b, { ...from, overwrite: true }),
        });

      triggers = [
        ...batch(text, TEXT_FROM, { opacity: 1, y: 0 }),
        ...batch(media, MEDIA_FROM, { opacity: 1, scale: 1 }),
      ];
      ScrollTrigger.refresh();
    });

    return () => {
      cancelAnimationFrame(frame);
      triggers.forEach((t) => t.kill());
      gsap.killTweensOf([...text, ...media]);
      gsap.set([...text, ...media], { clearProps: "opacity,transform" });
    };
  }, [pathname]);

  return null;
}
