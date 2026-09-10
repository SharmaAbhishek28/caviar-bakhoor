"use client";

import { useEffect, useRef } from "react";

/**
 * The custom cursor: a 14px filled --ink dot with mix-blend-mode: difference,
 * so it inverts over dark panels. Trails the pointer on a 0.15 lerp and grows
 * to 40px over anything interactive.
 *
 * Only mounts when the device has a real pointer AND the viewer has not asked
 * for reduced motion. Everyone else keeps the native cursor — the matching
 * `cursor: none` in globals.css is behind the same media query, so the two can
 * never disagree.
 *
 * Position is written straight to the node via rAF rather than through state:
 * a re-render per mousemove would be far too expensive.
 */
export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const allowed = window.matchMedia(
      "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
    );
    if (!allowed.matches) return;

    const dot = dotRef.current;
    if (!dot) return;

    // Start centred so the first frame does not fly in from the corner.
    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const target = { ...pos };
    let scale = 1;
    let targetScale = 1;
    let frame = 0;
    let visible = false;

    const onMove = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      if (!visible) {
        visible = true;
        dot.style.opacity = "1";
      }
    };

    const INTERACTIVE = "a, button, [role='button'], input, select, textarea, label, summary";
    const onOver = (e: PointerEvent) => {
      const el = e.target as Element | null;
      const over = Boolean(el?.closest?.(INTERACTIVE));
      targetScale = over ? 40 / 14 : 1;
      // Drops the blend over interactive targets so the dot reads as a solid
      // gold disc rather than an inversion of whatever is underneath.
      dot.dataset.over = over ? "true" : "false";
    };

    const onLeave = () => {
      visible = false;
      dot.style.opacity = "0";
    };

    const tick = () => {
      pos.x += (target.x - pos.x) * 0.15;
      pos.y += (target.y - pos.y) * 0.15;
      scale += (targetScale - scale) * 0.15;
      dot.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%) scale(${scale})`;
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    document.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={dotRef}
      aria-hidden
      className="custom-cursor"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: 14,
        height: 14,
        borderRadius: "50%",
        /* --paper, not --ink. `difference` only inverts strongly against
           near-white or near-black; against --ink (#101012) the mid-tones of a
           photograph barely shift and the dot vanishes. Measured over the hero:
           --ink gave a luminance delta of 14 on mid-brown pearls. White inverts
           hard against everything except white, which the paper page never is. */
        background: "var(--paper)",
        mixBlendMode: "difference",
        pointerEvents: "none",
        zIndex: 9999,
        opacity: 0,
        transition: "opacity var(--dur-fast) var(--ease)",
      }}
    />
  );
}
