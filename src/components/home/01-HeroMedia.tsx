"use client";

import Image from "next/image";
import { preload } from "react-dom";
import { useEffect, useRef, useState } from "react";
import { gsap, initScroll, prefersReducedMotion } from "@/lib/scroll";

/**
 * The hero's media layer and its sound control.
 *
 * `hasVideo` comes from the server wrapper, which checks whether
 * public/video/hero-1080.mp4 is actually on disk — so the video branch and the
 * sound toggle appear together, and neither can exist without the other.
 *
 * LOADING: the poster is preloaded at high priority, so the first frame is
 * on screen before the video has downloaded (it is the LCP image). Phones get
 * a 540p file (~1.1MB), wider screens the 720p one (~1.9MB); both are
 * faststart, so playback begins before the download ends. The video pauses
 * while the hero is off screen, and never plays under reduced motion.
 *
 * SOUND: browsers block autoplay with audio, so the video starts muted and
 * the toggle unmutes on request. Muted also has to be set on the element
 * directly, not only as an attribute, or Safari ignores it.
 */
export function HeroMedia({
  hasVideo,
  sources,
  posterSrc,
}: {
  hasVideo: boolean;
  /** In preference order: the browser plays the first it can. */
  sources: { src: string; type: string; media?: string }[];
  posterSrc: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);

  // The strip: drawn up out of the foot of the hero by the first scroll,
  // with the hero pinned so it plays in full view. Scrubbed, so scrolling
  // back lowers it again. Under reduced motion it is simply there.
  useEffect(() => {
    const section = sectionRef.current;
    const strip = stripRef.current;
    if (!section || !strip || prefersReducedMotion()) return;
    initScroll();
    const ctx = gsap.context(() => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${window.innerHeight * 0.7}`,
            pin: true,
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        })
        // y: 0 takes over the CSS translateY(100%) that hides the strip
        // before hydration, so the two offsets never stack.
        .fromTo(strip, { y: 0, yPercent: 100 }, { y: 0, yPercent: 0, ease: "power3.out", duration: 1 })
        .fromTo(".hero-line", { yPercent: 110 }, { yPercent: 0, ease: "power3.out", duration: 0.7 }, 0.35)
        .fromTo(".hero-logo, .hero-logo-split", { yPercent: 110 }, { yPercent: 0, ease: "power3.out", duration: 0.8 }, 0.5);
    }, section);
    return () => ctx.revert();
  }, []);
  const [muted, setMuted] = useState(true);

  if (hasVideo) preload(posterSrc, { as: "image", fetchPriority: "high" });

  useEffect(() => {
    const v = videoRef.current;
    if (v) v.muted = muted;
  }, [muted]);

  // Play only while on screen, and not at all under reduced motion.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      v.pause();
      v.removeAttribute("autoplay");
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.1 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="on-ash"
      style={{ position: "relative", height: "100svh", overflow: "hidden" }}
    >
      {hasVideo ? (
        <video
          ref={videoRef}
          className="hero-still"
          autoPlay
          loop
          playsInline
          muted
          preload="none"
          poster={posterSrc}
          aria-label="Elixir Caviar Bakhoor: the box, the tin and the ritual"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        >
          {sources.map((s) => (
            <source key={s.src} src={s.src} type={s.type} media={s.media} />
          ))}
        </video>
      ) : (
        <Image
          src={posterSrc}
          alt="Macro of Caviar Bakhoor pearls — dark spheres of encapsulated bakhoor scattered with flakes of 24-karat gold leaf"
          width={2400}
          height={1600}
          sizes="100vw"
          priority
          className="hero-still"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      )}

      {/* The caption sits on photography, so it needs its own floor. */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top, rgb(8 7 10 / 0.55) 0%, rgb(8 7 10 / 0.15) 30%, transparent 60%)",
          pointerEvents: "none",
        }}
      />

      {/* The strip: a band of paper at the foot of the hero carrying the
          line and the Caviar Bakhoor logotype. Hidden on load — the film
          alone fills the screen — and drawn up by the first scroll, the
          line and then the mark rising after it. The logotype's words stay
          in the h1 for search and screen readers. */}
      <div ref={stripRef} className="hero-strip">
        <h1 className="hero-caption" data-no-reveal>
          <span className="hero-line-mask">
            <span className="hero-line">An innovation in bakhoor.</span>
          </span>
          <span className="sr-only"> Caviar Bakhoor.</span>
          <span className="hero-logo-mask" aria-hidden>
            <span className="hero-logo" />
            <span className="hero-logo-split">
              <span className="hero-logo-word hero-logo-word--1" />
              <span className="hero-logo-word hero-logo-word--2" />
            </span>
          </span>
        </h1>
      </div>

      {hasVideo ? (
        <button
          type="button"
          onClick={() => setMuted((m) => !m)}
          className="sound-toggle hero-sound"
          aria-pressed={!muted}
          aria-label={muted ? "Turn sound on" : "Turn sound off"}
        >
          {/* A fine-line speaker. Muted: crossed out. On: two waves that
              ripple outward. */}
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
      ) : null}
    </section>
  );
}
