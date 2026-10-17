"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { gsap, initScroll, prefersReducedMotion } from "@/lib/scroll";

/**
 * Section 03's film. It plays inside the portrait slot beside the copy; as
 * the page scrolls on, it travels down and its left and right edges open
 * out until it is a full-width landscape frame below the row.
 *
 * One <video>, laid out at its final, landscape place. At the start it is
 * moved and scaled onto the portrait slot and clipped to the slot's width;
 * the scroll scrubs all of that back to nothing. Transform and clip-path
 * only, so it never triggers layout. Its travel down matches the page's
 * travel up, so it holds still on screen while it opens.
 *
 * The mute button rides the visible frame's bottom-right corner and is
 * counter-scaled, so it stays the same size throughout.
 *
 * Under reduced motion it simply sits in the landscape frame, and the
 * portrait slot keeps its photograph.
 */
export function ApproachVideo({
  slot,
  copy,
  src,
  mobileSrc,
  poster,
  label,
}: {
  /** The portrait slot's own content, seen when the film isn't over it. */
  slot: ReactNode;
  copy: ReactNode;
  src: string;
  mobileSrc: string;
  poster: string;
  label: string;
}) {
  const stageRef = useRef<HTMLDivElement>(null);
  const slotRef = useRef<HTMLDivElement>(null);
  const landRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const v = videoRef.current;
    if (v) v.muted = muted;
  }, [muted]);

  // Play only while on screen.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.15 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const stage = stageRef.current;
    const slotEl = slotRef.current;
    const land = landRef.current;
    const frame = frameRef.current;
    if (!stage || !slotEl || !land || !frame || prefersReducedMotion()) return;
    initScroll();

    // Both boxes, in the stage's own coordinates (scroll doesn't change them).
    let slot = { w: 0, h: 0, cx: 0, cy: 0 };
    let landBox = { w: 0, h: 0, cx: 0, cy: 0 };
    const measure = () => {
      const o = stage.getBoundingClientRect();
      const box = (r: DOMRect) => ({
        w: r.width,
        h: r.height,
        cx: r.left - o.left + r.width / 2,
        cy: r.top - o.top + r.height / 2,
      });
      slot = box(slotEl.getBoundingClientRect());
      landBox = box(land.getBoundingClientRect());
    };

    // The visible frame at progress p, from the slot's box to the landscape
    // one. Two curves: it drops early (ease-out), and widens and slides to
    // centre late (ease-in), so it leaves the row before it opens over the
    // copy. The video is scaled just enough to cover the visible box and
    // clipped to it, so the frame never pokes past either box.
    const easeOut = gsap.parseEase("power2.out");
    const easeIn = gsap.parseEase("power2.in");
    const apply = (p: number) => {
      const a = easeIn(p);
      const b = easeOut(p);
      const lerp = (from: number, to: number, t: number) => from + (to - from) * t;
      const w = lerp(slot.w, landBox.w, a);
      const h = lerp(slot.h, landBox.h, a);
      const s = Math.max(w / landBox.w, h / landBox.h);
      const set = (k: string, v: string) => frame.style.setProperty(k, v);
      set("--x", `${lerp(slot.cx, landBox.cx, a) - landBox.cx}px`);
      set("--y", `${lerp(slot.cy, landBox.cy, b) - landBox.cy}px`);
      set("--s", String(s));
      set("--ix", `${Math.max(0, (landBox.w - w / s) / 2)}px`);
      set("--iy", `${Math.max(0, (landBox.h - h / s) / 2)}px`);
    };

    const state = { p: 0 };
    measure();
    apply(0);
    stage.dataset.animated = "";

    const ctx = gsap.context(() => {
      gsap.to(state, {
        p: 1,
        ease: "none",
        onUpdate: () => apply(state.p),
        scrollTrigger: {
          trigger: slotEl,
          start: "top 15%",
          endTrigger: land,
          end: "bottom bottom",
          scrub: 0.6,
          onRefresh: () => {
            measure();
            apply(state.p);
          },
        },
      });
    }, stage);
    return () => {
      ctx.revert();
      ["--x", "--y", "--s", "--ix", "--iy"].forEach((k) => frame.style.removeProperty(k));
      delete stage.dataset.animated;
    };
  }, []);

  return (
    <div ref={stageRef} className="av-stage">
      <div className="approach-row">
        {/* The slot and the frame run their own motion: RevealAll keeps off. */}
        <div ref={slotRef} className="av-slot" data-no-reveal>
          {slot}
        </div>
        {copy}
      </div>

      <div ref={landRef} className="av-land" aria-hidden />

      <div ref={frameRef} className="av-frame" data-no-reveal>
        <video
          ref={videoRef}
          className="av-video"
          loop
          playsInline
          muted
          preload="none"
          poster={poster}
          aria-label={label}
        >
          <source src={mobileSrc} type="video/mp4" media="(max-width: 767px)" />
          <source src={src} type="video/mp4" />
        </video>

        <button
          type="button"
          onClick={() => setMuted((m) => !m)}
          className="sound-toggle av-sound"
          aria-pressed={!muted}
          aria-label={muted ? "Turn sound on" : "Turn sound off"}
        >
          <svg
            aria-hidden
            viewBox="0 0 24 24"
            width="20"
            height="20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 9.5h3.2L12 5.5v13l-4.8-4H4z" />
            <g className="sound-off">
              <path d="M16 9.5l5 5M21 9.5l-5 5" />
            </g>
            <g className="sound-on">
              <path className="sound-wave sound-wave--1" d="M15.5 9.2a4 4 0 0 1 0 5.6" />
              <path className="sound-wave sound-wave--2" d="M18 6.8a7.5 7.5 0 0 1 0 10.4" />
            </g>
          </svg>
        </button>
      </div>
    </div>
  );
}
