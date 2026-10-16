"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/scroll";

/**
 * The footer's giant wordmark, one span per letter. On hover the letters
 * nearest the pointer rise in a wave that follows it across the word; on
 * leave they settle back with an elastic ease. Motion answering an action,
 * per CLAUDE.md — nothing plays on its own.
 *
 * Fine pointers only (a touch has no hover), and off under reduced motion.
 * Decorative: the site name is in the header and the page title.
 */
export function FooterWordmark({ text }: { text: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root || prefersReducedMotion()) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const letters = Array.from(root.querySelectorAll<HTMLElement>(".footer-letter"));
    const lift = letters.map((el) =>
      gsap.quickTo(el, "yPercent", { duration: 0.5, ease: "power3.out" }),
    );

    const onMove = (e: PointerEvent) => {
      letters.forEach((el, i) => {
        const r = el.getBoundingClientRect();
        // Influence falls off over about two letters either side.
        const reach = r.width * 2.5;
        const d = Math.abs(e.clientX - (r.left + r.width / 2));
        const t = Math.max(0, 1 - d / reach);
        lift[i](-t * t * 22);
      });
    };

    const onLeave = () => {
      gsap.to(letters, {
        yPercent: 0,
        duration: 1.1,
        ease: "elastic.out(1, 0.4)",
        stagger: { each: 0.02, from: "center" },
        overwrite: true,
      });
    };

    root.addEventListener("pointermove", onMove);
    root.addEventListener("pointerleave", onLeave);
    return () => {
      root.removeEventListener("pointermove", onMove);
      root.removeEventListener("pointerleave", onLeave);
      gsap.killTweensOf(letters);
    };
  }, []);

  return (
    <div ref={ref} className="footer-wordmark" aria-hidden>
      {Array.from(text).map((ch, i) => (
        <span key={i} className="footer-letter">
          {ch === " " ? " " : ch}
        </span>
      ))}
    </div>
  );
}
