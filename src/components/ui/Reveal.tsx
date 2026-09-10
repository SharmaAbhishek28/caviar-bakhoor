"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap, initScroll, prefersReducedMotion } from "@/lib/scroll";

/**
 * Reveals its children as they enter the viewport: a short rise and fade,
 * once, on the expo-out curve the rest of the system uses.
 *
 * `stagger` animates the element's direct children in sequence instead of the
 * wrapper as a whole — for a stack of lines or a row of cards.
 *
 * docs/design-system.md warns against fade-up on every section: it is slow and
 * it is the most obvious generated-page tell. So the distance here is small
 * (24px, not 80) and the duration short, and it is applied to composition
 * blocks rather than wrapped around every element on the page.
 *
 * Under prefers-reduced-motion nothing animates and the content is simply
 * there — no opacity is ever set, so there is no chance of it being stranded
 * invisible.
 */
export function Reveal({
  children,
  stagger = false,
  delay = 0,
  className = "",
  style,
}: {
  children: ReactNode;
  /** Animate direct children in sequence rather than the block as one. */
  stagger?: boolean;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const el = ref.current;
    if (!el) return;

    initScroll();

    const targets = stagger
      ? (Array.from(el.children) as HTMLElement[])
      : [el];
    if (!targets.length) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          delay,
          ease: "expo.out",
          stagger: stagger ? 0.08 : 0,
          scrollTrigger: {
            trigger: el,
            /* Fires when the block is a fifth into the viewport, so it is
               already moving before the reader's eye arrives. */
            start: "top 85%",
            once: true,
          },
        },
      );
    }, el);

    return () => ctx.revert();
  }, [stagger, delay]);

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}
