"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { MarkedProse } from "@/components/ui";
import type { BoxItem } from "@/data/box";
import { gsap, initScroll, prefersReducedMotion } from "@/lib/scroll";

/**
 * The box's three tools, one row each, alternating: copy left and photograph
 * right, then the reverse, then copy left again (one column on phones,
 * photograph first).
 *
 * Each row reveals as it scrolls in:
 *  - a curtain of ink sweeps across the photograph from the copy's side and
 *    off the far edge, uncovering it as it zooms back from 1.4x and
 *    straightens from a slight turn;
 *  - a giant outlined numeral slides in behind the copy;
 *  - the name, a rule that draws itself, and the copy rise in turn.
 * It plays in reverse when scrolled back above, so it replays. Off under
 * reduced motion; RevealAll keeps off (data-no-reveal).
 */
export function BoxRows({ items }: { items: BoxItem[] }) {
  const ref = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root || prefersReducedMotion()) return;
    initScroll();
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".br-row", root).forEach((row, i) => {
        const fromLeft = i % 2 === 1; // image on the left: curtain enters from the right
        const dir = fromLeft ? -1 : 1;
        gsap
          .timeline({
            scrollTrigger: { trigger: row, start: "top 78%", toggleActions: "play none none reverse" },
            defaults: { ease: "expo.out" },
          })
          // x: 0 takes over the CSS translateX that parks the curtain off-frame.
          .fromTo(row.querySelector(".br-curtain"), { x: 0, xPercent: -101 * dir }, { x: 0, xPercent: 0, duration: 0.55, ease: "power3.in" })
          .set(row.querySelector(".br-img"), { autoAlpha: 1 })
          .to(row.querySelector(".br-curtain"), { x: 0, xPercent: 101 * dir, duration: 0.75, ease: "power3.out" })
          .fromTo(row.querySelector(".br-img img"), { scale: 1.4, rotate: 4 * dir }, { scale: 1, rotate: 0, duration: 1.4 }, "<")
          .fromTo(row.querySelector(".br-no"), { xPercent: 40 * dir, autoAlpha: 0 }, { xPercent: 0, autoAlpha: 1, duration: 1.2 }, 0.2)
          .fromTo(row.querySelector(".br-name"), { yPercent: 110 }, { yPercent: 0, duration: 1 }, 0.35)
          .fromTo(row.querySelector(".br-rule"), { scaleX: 0 }, { scaleX: 1, duration: 1 }, 0.5)
          .fromTo(row.querySelector(".br-body"), { y: 40, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1 }, 0.6);
        gsap.set(row.querySelector(".br-img"), { autoAlpha: 0 });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <ol ref={ref} className="br-list" data-no-reveal>
      {items.map((item, i) => (
        <li key={item.name} className={`br-row${i % 2 === 1 ? " br-row--flip" : ""}`}>
          <div className="br-copy">
            <span className="br-no" aria-hidden>
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="br-name-mask">
              <span className="br-name">{item.name}</span>
            </h3>
            <span className="br-rule" aria-hidden />
            <MarkedProse className="type-body br-body" text={item.body} strong={item.strong} />
          </div>
          <div className="br-media">
            <div className="br-img">
              <Image
                src={item.image.src}
                alt={item.image.alt}
                width={item.image.width}
                height={item.image.height}
                sizes="(max-width: 767px) 100vw, 45vw"
              />
            </div>
            <span className="br-curtain" aria-hidden />
          </div>
        </li>
      ))}
    </ol>
  );
}
