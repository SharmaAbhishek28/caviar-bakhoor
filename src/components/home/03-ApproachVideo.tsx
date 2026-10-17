"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { Container } from "@/components/ui";
import { gsap, initScroll, prefersReducedMotion } from "@/lib/scroll";

/**
 * Section 03's row and its film.
 *
 * The film plays inside the portrait slot beside the copy. When the whole
 * row is on screen the stage pins, and the sequence runs on the scroll:
 *
 *   50vh   nothing moves — a breathing space after the row arrives;
 *   120vh  the film grows, slowly, from the slot to the full viewport,
 *          100vw × 100vh;
 *   30vh   it holds, full screen; then the pin lets go and the page moves on.
 *
 * One <video>, laid out at its final, full-viewport place at the foot of
 * the stage. Throughout, it is moved and scaled onto the visible box and
 * clipped to it — transform and clip-path only, so nothing reflows, and the
 * visible box is computed exactly so it never pokes past the slot or the
 * screen.
 *
 * The mute button rides the visible box's bottom-right corner and is
 * counter-scaled, so it stays the same size throughout.
 *
 * Under reduced motion there is no pin: the film just plays in the slot.
 * Without JavaScript the slot keeps its photograph.
 */
const HOLD_BEFORE = 0.5;
const GROW = 1.2;
const HOLD_AFTER = 0.3;

export function ApproachVideo({
  slot,
  copy,
  src,
  mobileSrc,
  poster,
  label,
}: {
  /** The portrait slot's photograph: the fallback when the film can't run. */
  slot: ReactNode;
  copy: ReactNode;
  src: string;
  mobileSrc: string;
  poster: string;
  label: string;
}) {
  const stageRef = useRef<HTMLDivElement>(null);
  const slotRef = useRef<HTMLDivElement>(null);
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
    const frame = frameRef.current;
    if (!stage || !slotEl || !frame) return;

    // The slot's box and the frame's own (full-viewport) box, both in the
    // stage's coordinates. offset* ignore transforms, so the frame's box is
    // read untransformed; the slot is read against the stage's rect.
    let slot = { w: 0, h: 0, cx: 0, cy: 0 };
    let full = { w: 0, h: 0, cx: 0, cy: 0 };
    const measure = () => {
      const o = stage.getBoundingClientRect();
      const r = slotEl.getBoundingClientRect();
      slot = { w: r.width, h: r.height, cx: r.left - o.left + r.width / 2, cy: r.top - o.top + r.height / 2 };
      full = {
        w: frame.offsetWidth,
        h: frame.offsetHeight,
        cx: frame.offsetLeft + frame.offsetWidth / 2,
        cy: frame.offsetTop + frame.offsetHeight / 2,
      };
    };

    // The visible box at progress p, slot → full screen, on one gentle curve.
    // The video is scaled just enough to cover it, then clipped to it.
    const ease = gsap.parseEase("power2.inOut");
    const apply = (p: number) => {
      const a = ease(p);
      const lerp = (from: number, to: number) => from + (to - from) * a;
      const w = lerp(slot.w, full.w);
      const h = lerp(slot.h, full.h);
      const s = Math.max(w / full.w, h / full.h);
      const set = (k: string, v: string) => frame.style.setProperty(k, v);
      set("--x", `${lerp(slot.cx, full.cx) - full.cx}px`);
      set("--y", `${lerp(slot.cy, full.cy) - full.cy}px`);
      set("--s", String(s));
      set("--ix", `${Math.max(0, (full.w - w / s) / 2)}px`);
      set("--iy", `${Math.max(0, (full.h - h / s) / 2)}px`);
    };

    const cleanup = () => {
      ["--x", "--y", "--s", "--ix", "--iy"].forEach((k) => frame.style.removeProperty(k));
      delete stage.dataset.animated;
    };

    measure();
    apply(0);
    stage.dataset.animated = "";

    // Reduced motion: the film plays in the slot, and stays there.
    if (prefersReducedMotion()) {
      const onResize = () => {
        measure();
        apply(0);
      };
      window.addEventListener("resize", onResize);
      return () => {
        window.removeEventListener("resize", onResize);
        cleanup();
      };
    }

    initScroll();
    const state = { p: 0 };
    const ctx = gsap.context(() => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: stage,
            // The whole row is on screen: the stage's foot meets the screen's.
            start: "bottom bottom",
            end: () => `+=${window.innerHeight * (HOLD_BEFORE + GROW + HOLD_AFTER)}`,
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
            onRefresh: () => {
              measure();
              apply(state.p);
            },
          },
        })
        .to({}, { duration: HOLD_BEFORE })
        .to(state, { p: 1, duration: GROW, ease: "none", onUpdate: () => apply(state.p) })
        .to({}, { duration: HOLD_AFTER });
    }, stage);

    return () => {
      ctx.revert();
      cleanup();
    };
  }, []);

  return (
    <div ref={stageRef} className="av-stage">
      <Container>
        <div className="approach-row">
          {/* The slot and the frame run their own motion: RevealAll keeps off. */}
          <div ref={slotRef} className="av-slot" data-no-reveal>
            {slot}
          </div>
          {copy}
        </div>
      </Container>

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
