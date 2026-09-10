"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { ABOUT } from "@/data/about";
import { gsap, initScroll, ScrollTrigger } from "@/lib/scroll";

/**
 * The shoot: eight photographs in one row. On desktop with motion the
 * section pins and the row travels right to left with scroll; each image
 * parallaxes inside its frame at its own rate, the row skews a little with
 * scroll velocity and settles, and each frame wipes open as it enters the
 * viewport — a clip-path reveal driven by the row's own motion
 * (containerAnimation), not the page's.
 *
 * Phone, tablet and reduced motion: a swipeable row, no pin.
 */
export function ShootGallery() {
  const rootRef = useRef<HTMLElement>(null);
  /* Pinned inner wrapper, not the section — see ProductHero for why. */
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const pin = pinRef.current;
    const track = trackRef.current;
    if (!root || !pin || !track) return;
    initScroll();

    const mm = gsap.matchMedia(root);
    mm.add(
      { desktop: "(min-width: 1024px)", motionOk: "(prefers-reduced-motion: no-preference)" },
      (ctx) => {
        const { desktop, motionOk } = ctx.conditions as { desktop: boolean; motionOk: boolean };
        if (!desktop || !motionOk) return;

        const frames = gsap.utils.toArray<HTMLElement>(".ab-frame", track);
        const travel = () => track.scrollWidth - window.innerWidth;

        const tween = gsap.to(track, {
          x: () => -travel(),
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: () => "+=" + travel(),
            pin,
            scrub: 0.8,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              // Skew with velocity, then ease back. Clamped so it stays a
              // lean, never a smear.
              const v = self.getVelocity();
              const skew = gsap.utils.clamp(-6, 6, v / 400);
              gsap.to(track, { skewX: skew, duration: 0.4, ease: "power2.out", overwrite: "auto" });
              gsap.to(track, { skewX: 0, duration: 0.8, ease: "power3.out", delay: 0.1, overwrite: false });
            },
          },
        });

        frames.forEach((frame, i) => {
          const img = frame.querySelector("img");
          // Wipe open as the frame enters from the right.
          gsap.fromTo(
            frame,
            { clipPath: "inset(0 0 0 100%)" },
            {
              clipPath: "inset(0 0 0 0%)",
              ease: "power3.out",
              scrollTrigger: { trigger: frame, containerAnimation: tween, start: "left 95%", end: "left 55%", scrub: true },
            },
          );
          // Parallax inside the frame: alternating rates, so neighbours
          // move against each other.
          if (img) {
            gsap.fromTo(
              img,
              { xPercent: i % 2 ? -8 : -2 },
              {
                xPercent: i % 2 ? 2 : 8,
                ease: "none",
                scrollTrigger: { trigger: frame, containerAnimation: tween, start: "left right", end: "right left", scrub: true },
              },
            );
          }
        });

        ScrollTrigger.refresh();
      },
    );

    return () => mm.revert();
  }, []);

  return (
    <section ref={rootRef} className="ab-gallery" data-label="Shoot" aria-label={ABOUT.gallery.title}>
      <div ref={pinRef} className="ab-gallery-pin">
      <div ref={trackRef} className="ab-track">
        <div className="ab-track-title" aria-hidden>
          <span>{ABOUT.gallery.title}</span>
        </div>
        {ABOUT.gallery.items.map((img, i) => (
          <figure key={img.src} className={`ab-frame ab-frame--${(i % 3) + 1}`}>
            <Image src={img.src} alt={img.alt} width={img.width} height={img.height} sizes="(max-width: 1023px) 80vw, 45vw" loading={i < 2 ? "eager" : "lazy"} />
          </figure>
        ))}
      </div>
      </div>
    </section>
  );
}
