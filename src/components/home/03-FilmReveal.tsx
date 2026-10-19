"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, initScroll, prefersReducedMotion } from "@/lib/scroll";

export type FilmSource = { src: string; type: string; media?: string };

/**
 * Section 03's film, full width, revealed through a pearl.
 *
 * The stage is one viewport tall and pins while the reveal runs on the
 * scroll: the film starts as a small pearl at the centre of a dark screen —
 * zoomed in, turned a few degrees, dimmed — and the pearl opens until the
 * frame is the whole viewport, the film settling square and coming up to
 * full brightness. Then it holds, full screen, and the pin lets go.
 *
 * The pearl is the site's one bold form (CLAUDE.md), so the reveal is a
 * circle, not a wipe. clip-path, transform and filter only: nothing reflows.
 *
 * Sources are listed AV1 first, then H.264, each at 1080p for wide screens
 * and 720p for phones — the browser plays the first it can. preload="none"
 * behind the poster; plays only on screen; no motion under reduced motion,
 * where the film simply sits full width.
 */
export function FilmReveal({
  sources,
  poster,
  label,
}: {
  sources: FilmSource[];
  poster: string;
  label: string;
}) {
  const stageRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const v = videoRef.current;
    if (v) v.muted = muted;
  }, [muted]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.05 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const stage = stageRef.current;
    const frame = frameRef.current;
    const v = videoRef.current;
    if (!stage || !frame || !v || prefersReducedMotion()) return;
    initScroll();
    const ctx = gsap.context(() => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: stage,
            start: "top top",
            end: () => `+=${window.innerHeight * 1.8}`,
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        })
        .fromTo(
          frame,
          { clipPath: "circle(7% at 50% 50%)" },
          { clipPath: "circle(75% at 50% 50%)", ease: "power2.inOut", duration: 1.4 },
          0,
        )
        .fromTo(
          v,
          { scale: 1.6, rotate: -8, filter: "brightness(0.45) saturate(0.6)" },
          { scale: 1, rotate: 0, filter: "brightness(1) saturate(1)", ease: "power3.out", duration: 1.4 },
          0,
        )
        .fromTo(
          ".fr-sound",
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 0.3 },
          1.1,
        )
        .to({}, { duration: 0.4 });
    }, stage);
    return () => ctx.revert();
  }, []);

  // The pin host: GSAP wraps the pinned element in a pin-spacer, so React
  // must own a parent that the spacer sits inside. Without it React cannot
  // remove the pinned element on navigation (removeChild error).
  return (
    <div className="pin-host">
    <section ref={stageRef} className="fr-stage" data-no-reveal>
      <div ref={frameRef} className="fr-frame">
        <video
          ref={videoRef}
          className="fr-video"
          loop
          playsInline
          muted
          preload="none"
          poster={poster}
          aria-label={label}
        >
          {sources.map((s) => (
            <source key={s.src} src={s.src} type={s.type} media={s.media} />
          ))}
        </video>
      </div>

      <button
        type="button"
        onClick={() => setMuted((m) => !m)}
        className="sound-toggle fr-sound"
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
    </section>
    </div>
  );
}
