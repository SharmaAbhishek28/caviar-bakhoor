"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap, initScroll, prefersReducedMotion } from "@/lib/scroll";
import type { BoxItem } from "@/data/box";

/**
 * The box's three tools as a loose collage of prints: three squares of
 * different sizes, overlapping, each slightly turned, with a paper border
 * and a soft shadow so they sit up off the page.
 *
 * They pop in as the collage scrolls into view — a little up and a little
 * small, settling with an overshoot, one after another — and reset when
 * scrolled back above, so it replays. Hover lifts a print. Off under
 * reduced motion.
 */
export function BoxCollage({ items }: { items: BoxItem[] }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root || prefersReducedMotion()) return;
    initScroll();
    const prints = root.querySelectorAll<HTMLElement>(".bc-print");
    const ctx = gsap.context(() => {
      gsap.fromTo(
        prints,
        { opacity: 0, y: 40, scale: 0.7 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
          ease: "back.out(1.7)",
          stagger: 0.14,
          scrollTrigger: {
            trigger: root,
            start: "top 85%",
            toggleActions: "play none none reset",
          },
        },
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className="box-collage" data-no-reveal>
      {items.map((item, i) => (
        <figure key={item.name} className={`bc-print bc-print--${i + 1}`}>
          <Image
            src={item.image.src}
            alt={item.image.alt}
            width={item.image.width}
            height={item.image.height}
            sizes="(max-width: 767px) 45vw, 260px"
          />
        </figure>
      ))}
    </div>
  );
}
