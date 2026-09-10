"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { Container, Eyebrow } from "@/components/ui";
import { ABOUT } from "@/data/about";
import { gsap, initScroll, prefersReducedMotion } from "@/lib/scroll";

/**
 * The /about opener — this page's one orchestrated motion moment.
 *
 * On mount: the eyebrow fades, the three headline lines rise out of their
 * masks in sequence, the lede fades, and the photograph settles from a
 * slight zoom. On scroll: the photograph parallaxes against the page as the
 * section leaves. Under reduced motion nothing animates and the markup's
 * resting state is what shows — every "from" here starts at the resting
 * values, so the page is complete without JS too.
 */
export function AboutOpener() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || prefersReducedMotion()) return;
    initScroll();

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      tl.from(".ab-eyebrow", { opacity: 0, y: 12, duration: 0.8 })
        .from(".ab-line-inner", { yPercent: 110, duration: 1.2, stagger: 0.12 }, "-=0.5")
        .from(".ab-lede", { opacity: 0, y: 16, duration: 0.9 }, "-=0.7")
        .from(".ab-opener-img", { scale: 1.15, duration: 1.8, ease: "power2.out" }, 0);

      // Parallax: the photo drifts up more slowly than the page.
      gsap.to(".ab-opener-img", {
        yPercent: -14,
        ease: "none",
        scrollTrigger: { trigger: ".ab-opener-media", start: "top bottom", end: "bottom top", scrub: true },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="ab-opener" data-label="About">
      <Container>
        <div className="ab-opener-copy">
          <div className="ab-eyebrow">
            <Eyebrow>{ABOUT.eyebrow}</Eyebrow>
          </div>
          <h1 className="ab-h1">
            {ABOUT.headline.map((line, i) => (
              <span key={line} className={`ab-line${i === 1 ? " ab-line--italic" : ""}`}>
                <span className="ab-line-inner">{line}</span>
              </span>
            ))}
          </h1>
          <p className="ab-lede type-body">{ABOUT.lede}</p>
        </div>
      </Container>

      <div className="ab-opener-media">
        <Image
          src={ABOUT.opener.src}
          alt={ABOUT.opener.alt}
          width={ABOUT.opener.width}
          height={ABOUT.opener.height}
          sizes="100vw"
          priority
          className="ab-opener-img"
        />
      </div>
    </section>
  );
}
