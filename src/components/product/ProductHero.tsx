"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Product } from "@/data/products";
import { gsap, initScroll, ScrollTrigger } from "@/lib/scroll";
import { ProductPanel } from "./ProductPanel";

/**
 * The PDP hero: a pinned stage that walks through the product's images as
 * the page scrolls, with the reference's vertical rail (arrows and a
 * progress track) on the left, and the floating panel on the right.
 *
 * Desktop with motion: the section pins for one viewport of scroll per
 * image. Each step holds the current image for its first quarter, crossfades
 * through the middle half, and holds the next for the last quarter — so the
 * reader rests on whole images without a snap. (Snap was tried: with scrub
 * and Lenis it was bistable and skipped images, as it had on the home
 * wheel.) The arrows step by one. When the last image has been seen the
 * pin releases. The panel rides the pin, so it floats beside the stage the
 * whole way — the reference's card.
 *
 * Phone, tablet and reduced motion: no pin; the images become a native
 * scroll-snap row the reader swipes, and the panel follows beneath.
 */
export function ProductHero({ product }: { product: Product }) {
  const rootRef = useRef<HTMLDivElement>(null);
  /* The pinned node is this inner wrapper, never the section itself.
     ScrollTrigger wraps whatever it pins in a spacer, re-parenting it; if
     that were the section, React's own removeChild on navigation would
     find the section no longer a child of <main> and throw. The section
     stays untouched, and the spacer lives inside it. */
  const pinRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [pinned, setPinned] = useState(false);
  /* Portraits lead: the stage is tall, and the reference opens on the
     product standing. Then the squares, then the landscape overhead. */
  const images = [
    ...product.images.filter((i) => i.height > i.width),
    ...product.images.filter((i) => i.height === i.width),
    ...product.images.filter((i) => i.width > i.height),
  ];
  const last = images.length - 1;

  useEffect(() => {
    const root = rootRef.current;
    const pin = pinRef.current;
    const stage = stageRef.current;
    const panel = panelRef.current;
    if (!root || !pin || !stage || !panel || last < 1) return;

    initScroll();
    const mm = gsap.matchMedia(root);

    mm.add(
      { desktop: "(min-width: 1024px)", motionOk: "(prefers-reduced-motion: no-preference)" },
      (ctx) => {
        const { desktop, motionOk } = ctx.conditions as { desktop: boolean; motionOk: boolean };
        if (!desktop || !motionOk) { setPinned(false); return; }
        setPinned(true);

        const slides = gsap.utils.toArray<HTMLElement>(".pdp-slide", stage);
        const state = { p: 0 };

        /* Progress → a fractional image index with a hold at each whole
           number: within a step, the first and last quarters hold and the
           middle half crossfades (smoothstep). */
        const stepped = (p: number) => {
          const u = p * last;
          const k = Math.floor(u);
          if (k >= last) return last;
          const t = Math.min(1, Math.max(0, (u - k - 0.25) / 0.5));
          return k + t * t * (3 - 2 * t);
        };

        /* Each slide's opacity is 1 at its own index and falls off linearly
           to 0 one index away — a scrubbed crossfade with no timeline. */
        const layout = () => {
          const at = stepped(state.p);
          slides.forEach((s, i) => {
            const o = Math.max(0, 1 - Math.abs(at - i));
            gsap.set(s, { opacity: o, scale: 0.97 + 0.03 * o });
          });
          setIndex(Math.round(at));

          /* The panel rides the pin. When it is taller than the viewport it
             cannot all be seen at once, so it slides up with the pin's
             progress: its foot arrives as the last image does. Measured
             each tick, so an accordion opening mid-pin is accounted for. */
          const overflow = Math.max(0, panel.offsetHeight - window.innerHeight);
          gsap.set(panel, { y: -overflow * state.p });
        };
        layout();

        const ro = new ResizeObserver(layout);
        ro.observe(panel);

        gsap.to(state, {
          p: 1,
          ease: "none",
          onUpdate: layout,
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: () => "+=" + window.innerHeight * last,
            pin,
            scrub: 0.5,
            invalidateOnRefresh: true,
            onRefresh: layout,
          },
        });
        return () => ro.disconnect();
      },
    );

    return () => mm.revert();
  }, [last]);

  /** Arrow step: scroll to the position where image i rests. */
  function goTo(i: number) {
    const clamped = Math.max(0, Math.min(last, i));
    const root = rootRef.current;
    if (!root) return;
    if (!pinned) {
      // Native row: scroll it sideways.
      const slide = stageRef.current?.querySelectorAll<HTMLElement>(".pdp-slide")[clamped];
      slide?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
      setIndex(clamped);
      return;
    }
    const st = ScrollTrigger.getAll().find((t) => t.trigger === root);
    if (!st) return;
    const y = st.start + (st.end - st.start) * (clamped / last);
    if (window.__caviarLenis) window.__caviarLenis.scrollTo(y);
    else window.scrollTo({ top: y, behavior: "smooth" });
  }

  return (
    <section ref={rootRef} className="pdp-hero" data-label="Collection">
      <div ref={pinRef} className="pdp-hero-pin">
      <div className="pdp-stage-wrap">
        <div className="pdp-rail" aria-label="Product images">
          <button type="button" className="pdp-rail-btn" onClick={() => goTo(index - 1)} aria-label="Previous image" disabled={index === 0}>
            <span aria-hidden>︿</span>
          </button>
          <div className="pdp-rail-track" aria-hidden>
            <span className="pdp-rail-thumb" style={{ height: `${((index + 1) / images.length) * 100}%` }} />
          </div>
          <button type="button" className="pdp-rail-btn" onClick={() => goTo(index + 1)} aria-label="Next image" disabled={index === last}>
            <span aria-hidden>﹀</span>
          </button>
          <span className="sr-only" aria-live="polite">
            Image {index + 1} of {images.length}
          </span>
        </div>

        <div ref={stageRef} className="pdp-stage" data-pinned={pinned || undefined}>
          {images.map((img, i) => (
            <figure key={img.src} className="pdp-slide" aria-hidden={pinned && i !== index ? true : undefined}>
              <Image
                src={img.src}
                alt={img.alt}
                width={img.width}
                height={img.height}
                sizes="(max-width: 1023px) 100vw, 60vw"
                priority={i === 0}
              />
            </figure>
          ))}
        </div>
      </div>

      <div ref={panelRef} className="pdp-panel-slot">
        <ProductPanel product={product} />
      </div>
      </div>
    </section>
  );
}
