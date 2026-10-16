"use client";

import { useEffect, useRef } from "react";
import { gsap, initScroll, prefersReducedMotion } from "@/lib/scroll";

/**
 * The footer's giant wordmark, one span per letter.
 *
 * On hover, the letters nearest the pointer rise in a wave that follows it
 * and warm towards gold, and caviar pearls scatter from the pointer and fall
 * off the bottom of the page. On leave the letters settle back. Motion
 * answering an action, per CLAUDE.md — nothing plays on its own.
 *
 * Letter positions are measured once on enter (and on resize), not on every
 * move: measuring while the letters are moving read back their transformed
 * boxes and made the wave jitter. Every tween targets the same properties
 * with overwrite "auto", so the settle and the next hover never fight.
 *
 * Fine pointers only (a touch has no hover), and off under reduced motion.
 * Decorative: the site name is in the header and the page title.
 */
const MAX_PEARLS = 36;
const SPAWN_EVERY_PX = 22;

export function FooterWordmark({ text }: { text: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);

  // Reveal: the letters fade and rise into place as the footer scrolls in,
  // staggered left to right, and replay every time it is scrolled to again.
  // Animates `y` and opacity; the hover wave uses `yPercent` and colour, so
  // the two compose rather than fight. Off under reduced motion.
  useEffect(() => {
    const root = ref.current;
    if (!root || prefersReducedMotion()) return;
    initScroll();
    const letters = root.querySelectorAll<HTMLElement>(".footer-letter");
    const ctx = gsap.context(() => {
      // Hide every letter up front: a staggered fromTo only renders the first
      // letter's start state, and the rest flashed before the reveal.
      gsap.set(letters, { opacity: 0, y: () => root.offsetHeight * 0.6 });
      gsap.to(
        letters,
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "expo.out",
          stagger: 0.045,
          scrollTrigger: {
            trigger: root,
            start: "top 95%",
            toggleActions: "restart none none reset",
            invalidateOnRefresh: true,
          },
        },
      );
    }, root);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const root = ref.current;
    const layer = layerRef.current;
    if (!root || !layer || prefersReducedMotion()) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const letters = Array.from(root.querySelectorAll<HTMLElement>(".footer-letter"));
    const rest = getComputedStyle(root).color;
    const gold = getComputedStyle(document.documentElement).getPropertyValue("--gold-deep").trim() || "#a8823a";

    // Letter centres relative to the wordmark, measured untransformed.
    let centres: number[] = [];
    let reach = 0;
    const measure = () => {
      const box = root.getBoundingClientRect();
      centres = letters.map((el) => el.offsetLeft + el.offsetWidth / 2);
      reach = (box.width / letters.length) * 2.2;
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

    const onEnter = () => measure();

    const onMove = (e: PointerEvent) => {
      const box = root.getBoundingClientRect();
      const x = e.clientX - box.left;

      letters.forEach((el, i) => {
        const t = Math.max(0, 1 - Math.abs(x - centres[i]) / reach);
        const k = t * t;
        gsap.to(el, {
          yPercent: -k * 24,
          color: k > 0.02 ? gsap.utils.interpolate(rest, gold, Math.min(1, k * 1.3)) : rest,
          duration: 0.45,
          ease: "power3.out",
          overwrite: "auto",
        });
      });

      // Pearls: one per stretch of travel, from the pointer, in the footer's space.
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
        color: rest,
        duration: 1.1,
        ease: "elastic.out(1, 0.4)",
        stagger: { each: 0.02, from: "center" },
        overwrite: "auto",
      });
    };

    measure();
    root.addEventListener("pointerenter", onEnter);
    root.addEventListener("pointermove", onMove);
    root.addEventListener("pointerleave", onLeave);
    window.addEventListener("resize", measure);
    return () => {
      root.removeEventListener("pointerenter", onEnter);
      root.removeEventListener("pointermove", onMove);
      root.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("resize", measure);
      gsap.killTweensOf(letters, "yPercent,color");
      layer.replaceChildren();
    };
  }, []);

  return (
    <>
      <div ref={layerRef} className="footer-pearls" aria-hidden />
      <div ref={ref} className="footer-wordmark" aria-hidden>
        {Array.from(text).map((ch, i) => (
          <span key={i} className="footer-letter">
            {ch === " " ? " " : ch}
          </span>
        ))}
      </div>
    </>
  );
}
