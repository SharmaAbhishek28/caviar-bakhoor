"use client";

import { useEffect, useRef } from "react";
import {
  gsap,
  ScrollTrigger,
  initScroll,
  startSmoothScroll,
  prefersReducedMotion,
} from "@/lib/scroll";

/**
 * A keyword band whose translateX is bound to scroll position — it moves
 * right-to-left as the page scrolls down and does not play on its own. The
 * time-based sibling in Marquee.tsx is still used by section 08; these are
 * deliberately two components, not one with a mode flag.
 *
 * Two identical runs are rendered and the track travels exactly one run's
 * width, so the loop point never shows as a gap.
 *
 * Under prefers-reduced-motion no ScrollTrigger is created at all and the
 * track sits at rest.
 */
export function ScrollMarquee({
  items,
  className = "",
  label = "Category keywords",
}: {
  items: string[];
  className?: string;
  /** Accessible name for the band. */
  label?: string;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const runRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const root = rootRef.current;
    const track = trackRef.current;
    const run = runRef.current;
    if (!root || !track || !run) return;

    initScroll();
    const stopSmooth = startSmoothScroll();

    const ctx = gsap.context(() => {
      // Measured, not assumed: the travel is one run's rendered width, so the
      // second run lands exactly where the first began.
      const distance = () => run.getBoundingClientRect().width;

      gsap.fromTo(
        track,
        { x: 0 },
        {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
            invalidateOnRefresh: true,
          },
        },
      );
    }, root);

    // Web fonts change the run width after first paint, so remeasure once
    // they are ready or the travel distance is wrong on load.
    let cancelled = false;
    document.fonts?.ready.then(() => {
      if (!cancelled) ScrollTrigger.refresh();
    });

    return () => {
      cancelled = true;
      ctx.revert();
      stopSmooth();
    };
  }, []);

  return (
    /* overflow-x: clip contains the track without creating a scroll container:
       a scrubbed translateX is the classic source of a page-level overflow-x
       bug on mobile, and `hidden` here would let the band scroll sideways. */
    <div
      ref={rootRef}
      className={className}
      style={{ overflowX: "clip" }}
      aria-label={label}
    >
      <div ref={trackRef} style={{ display: "flex", width: "max-content" }}>
        {[0, 1].map((i) => (
          <ul
            key={i}
            ref={i === 0 ? runRef : undefined}
            className="flex shrink-0 items-center"
            /* The second run is decorative repetition. */
            aria-hidden={i === 1 || undefined}
          >
            {/* Keyed by position: a band may repeat one phrase to fill its width. */}
            {items.map((item, j) => (
              <li
                key={j}
                className="type-marquee flex items-center whitespace-nowrap"
              >
                <span>{item}</span>
                <span
                  aria-hidden
                  className="px-6"
                  style={{ color: "var(--smoke)" }}
                >
                  ·
                </span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
