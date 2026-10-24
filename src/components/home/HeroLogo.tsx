"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/scroll";

/**
 * The Caviar Bakhoor logotype in the hero strip, cut into its letters so it
 * can answer the pointer the way the footer wordmark does: the letters
 * nearest the pointer rise in a wave that follows it, tilting away from it,
 * and caviar pearls scatter from the pointer and fall. On leave the letters
 * settle back with a spring. They stay in ink: no gold on this mark (site
 * owner, 2026-10-17).
 *
 * The mark is the traced SVG (public/images/brand/caviar-bakhoor.svg, 4176
 * by 312), shown through a CSS mask. Each letter is its own box showing
 * only its slice of that SVG, so the artwork is untouched. Slices are cut
 * in the white space between letters, measured from the SVG; the
 * interlocking OO stays one piece, and A and V, kerned so their diagonals
 * share columns, are separated along a slanted line through the channel
 * between them (x 582 at the top to x 717 at the foot).
 *
 * Wide screens only: phones show the two-line split mark, and a touch has
 * no hover. Fine pointers only, and off under reduced motion.
 */
const ART_W = 4176;

type Glyph = { x0: number; x1: number; clip?: string };

const GLYPHS: Glyph[] = [
  { x0: 0, x1: 334 }, // C
  { x0: 334, x1: 717, clip: "polygon(0 0, 64.75% 0, 100% 100%, 0 100%)" }, // A
  { x0: 582, x1: 978, clip: "polygon(0 0, 100% 0, 100% 100%, 34.1% 100%)" }, // V
  { x0: 978, x1: 1064 }, // I
  { x0: 1064, x1: 1428 }, // A
  { x0: 1428, x1: 1740 }, // R
  { x0: 2040, x1: 2339 }, // B
  { x0: 2339, x1: 2696 }, // A
  { x0: 2696, x1: 2982 }, // K
  { x0: 2982, x1: 3281 }, // H
  { x0: 3281, x1: 3865 }, // OO
  { x0: 3865, x1: ART_W }, // R
];

/** The box and mask geometry that shows one slice of the art. */
const glyphStyle = ({ x0, x1, clip }: Glyph): React.CSSProperties => {
  const w = x1 - x0;
  // mask-position as a percentage p places the image at (box - image) * p;
  // the image is box * ART_W / w wide, and must sit at -x0 / w * box.
  const p = x0 === 0 ? 0 : (x0 / (ART_W - w)) * 100;
  return {
    left: `${(x0 / ART_W) * 100}%`,
    width: `${(w / ART_W) * 100}%`,
    WebkitMaskSize: `${(ART_W / w) * 100}% 100%`,
    maskSize: `${(ART_W / w) * 100}% 100%`,
    WebkitMaskPosition: `${p}% 0`,
    maskPosition: `${p}% 0`,
    clipPath: clip,
  };
};

const MAX_PEARLS = 36;
const SPAWN_EVERY_PX = 22;

export function HeroLogo() {
  const markRef = useRef<HTMLSpanElement>(null);
  const layerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const mark = markRef.current;
    const layer = layerRef.current;
    if (!mark || !layer || prefersReducedMotion()) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const letters = Array.from(mark.querySelectorAll<HTMLElement>(".hero-glyph"));

    // Letter centres relative to the mark, measured untransformed (on
    // enter and resize, never while the letters move).
    let centres: number[] = [];
    let reach = 0;
    const measure = () => {
      const w = mark.offsetWidth;
      centres = GLYPHS.map((g) => (((g.x0 + g.x1) / 2) / ART_W) * w);
      reach = (w / GLYPHS.length) * 2.2;
    };

    let lastX = -Infinity;
    let lastY = -Infinity;
    let live = 0;

    const spawnPearl = (x: number, y: number) => {
      if (live >= MAX_PEARLS) return;
      const size = gsap.utils.random(7, 16);
      const p = document.createElement("span");
      p.className = "footer-pearl";
      p.style.width = p.style.height = `${size}px`;
      p.style.left = `${x - size / 2}px`;
      p.style.top = `${y - size / 2}px`;
      layer.appendChild(p);
      live++;
      const drift = gsap.utils.random(-50, 50);
      gsap
        .timeline({ onComplete: () => { p.remove(); live--; } })
        .fromTo(p, { scale: 0 }, { scale: 1, duration: 0.25, ease: "back.out(3)" })
        .to(p, { y: gsap.utils.random(-40, -15), x: drift * 0.4, duration: 0.3, ease: "power2.out" }, 0)
        .to(p, { y: gsap.utils.random(180, 320), x: drift, duration: gsap.utils.random(0.9, 1.4), ease: "power2.in" }, 0.3)
        .to(p, { opacity: 0, duration: 0.4 }, "-=0.4");
    };

    const onMove = (e: PointerEvent) => {
      const box = mark.getBoundingClientRect();
      const x = e.clientX - box.left;
      letters.forEach((el, i) => {
        const d = x - centres[i];
        const t = Math.max(0, 1 - Math.abs(d) / reach);
        const k = t * t;
        gsap.to(el, {
          yPercent: -k * 26,
          // Tilts away from the pointer, as if it pushed past.
          rotation: k * 7 * (d > 0 ? -1 : 1),
          scale: 1 + k * 0.06,
          duration: 0.45,
          ease: "power3.out",
          overwrite: "auto",
        });
      });
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      if (dx * dx + dy * dy > SPAWN_EVERY_PX * SPAWN_EVERY_PX) {
        lastX = e.clientX;
        lastY = e.clientY;
        const lb = layer.getBoundingClientRect();
        spawnPearl(e.clientX - lb.left, e.clientY - lb.top);
      }
    };

    const onLeave = () => {
      lastX = lastY = -Infinity;
      gsap.to(letters, {
        yPercent: 0,
        rotation: 0,
        scale: 1,
        duration: 1.1,
        ease: "elastic.out(1, 0.4)",
        stagger: { each: 0.02, from: "center" },
        overwrite: "auto",
      });
    };

    measure();
    mark.addEventListener("pointerenter", measure);
    mark.addEventListener("pointermove", onMove);
    mark.addEventListener("pointerleave", onLeave);
    window.addEventListener("resize", measure);
    return () => {
      mark.removeEventListener("pointerenter", measure);
      mark.removeEventListener("pointermove", onMove);
      mark.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("resize", measure);
      gsap.killTweensOf(letters, "yPercent,rotation,scale");
      layer.replaceChildren();
    };
  }, []);

  return (
    <>
      <span ref={layerRef} className="footer-pearls hero-pearls" aria-hidden />
      <span className="hero-logo-mask" aria-hidden>
        <span ref={markRef} className="hero-logo">
          {GLYPHS.map((g, i) => (
            <span key={i} className="hero-glyph" style={glyphStyle(g)} />
          ))}
        </span>
        <span className="hero-logo-split">
          <span className="hero-logo-word hero-logo-word--1" />
          <span className="hero-logo-word hero-logo-word--2" />
        </span>
      </span>
    </>
  );
}
