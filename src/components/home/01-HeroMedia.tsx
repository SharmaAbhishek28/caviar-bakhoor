"use client";

import Image from "next/image";
import { preload } from "react-dom";
import { useEffect, useRef, useState } from "react";
import { AMBIENT_VOLUME, usePageLoaded } from "@/lib/media";
import { gsap, initScroll, prefersReducedMotion } from "@/lib/scroll";
import { HeroLogo } from "./HeroLogo";

/**
 * The hero's media layer and its sound control.
 *
 * `hasVideo` comes from the server wrapper, which checks whether
 * public/video/hero-1080.mp4 is actually on disk — so the video branch and the
 * sound toggle appear together, and neither can exist without the other.
 *
 * LOADING: the poster is preloaded at high priority, so the first frame is
 * on screen before the video has downloaded (it is the LCP image). The
 * film's sources are added only once the page has finished loading: with
 * autoplay on, the browser fetched it at once and its megabytes held up
 * the scripts for seconds on a slow connection. Phones get
 * a 540p file (~1.1MB), wider screens the 720p one (~1.9MB); both are
 * faststart, so playback begins before the download ends. The video pauses
 * while the hero is off screen, and never plays under reduced motion.
 *
 * SOUND (site owner, 2026-10-24): the film's sound is on from the start.
 * Browsers only allow sound without a gesture where the visitor has
 * engaged with the site before, so the page tries to play with sound; if
 * the browser refuses, the film plays muted and the sound comes on at the
 * visitor's first click, tap or key. Scrolling the hero mostly off screen
 * mutes it; scrolling back brings the sound back. The toggle is the
 * visitor's own choice and overrides both: once off, it stays off. Muted is
 * set on the element directly, not only as an attribute, or Safari
 * ignores it.
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
  /** The visitor's choice: sound on unless they turn it off. */
  const [wanted, setWanted] = useState(true);
  /** Whether the browser will let the film play with sound yet. */
  const [unlocked, setUnlocked] = useState(false);
  /** Whether at least half of the hero is on screen. */
  const [inView, setInView] = useState(true);
  const audible = wanted && unlocked && inView;

  if (hasVideo) preload(posterSrc, { as: "image", fetchPriority: "high" });
  /** The film's sources wait for the page to finish loading. */
  const ready = usePageLoaded();

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.volume = AMBIENT_VOLUME;
    v.muted = !audible;
  }, [audible]);

  // Try sound straight away; if the browser refuses, unlock it at the
  // first gesture anywhere on the page.
  useEffect(() => {
    const v = videoRef.current;
    if (!v || !ready || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // The sources have just been added; load them before the first play.
    v.load();
    let done = false;
    const unlock = () => {
      if (done) return;
      done = true;
      setUnlocked(true);
      off();
    };
    const events = ["pointerdown", "keydown", "touchstart"] as const;
    const off = () => events.forEach((e) => window.removeEventListener(e, unlock, true));
    v.volume = AMBIENT_VOLUME;
    v.muted = false;
    v.play()
      .then(() => unlock())
      .catch(() => {
        // Refused with sound: play muted, wait for a gesture.
        v.muted = true;
        v.play().catch(() => {});
        events.forEach((e) => window.addEventListener(e, unlock, { capture: true, passive: true }));
      });
    return off;
  }, [ready]);

  // Mute once the hero is mostly scrolled away.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const io = new IntersectionObserver(([e]) => setInView(e.intersectionRatio >= 0.5), { threshold: [0, 0.5, 1] });
    io.observe(section);
    return () => io.disconnect();
  }, []);

  // Play only while on screen, and not at all under reduced motion.
  useEffect(() => {
    const v = videoRef.current;
    if (!v || !ready) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      v.pause();
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
  }, [ready]);

  // The pin host: GSAP wraps the pinned element in a pin-spacer, so React
  // must own a parent that the spacer sits inside. Without it React cannot
  // remove the pinned element on navigation (removeChild error).
  return (
    <div className="pin-host">
    <section
      ref={sectionRef}
      className="on-ash"
      style={{ position: "relative", height: "100svh", overflow: "hidden" }}
    >
      {hasVideo ? (
        <video
          ref={videoRef}
          className="hero-still"
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
          {ready
            ? sources.map((s) => <source key={s.src} src={s.src} type={s.type} media={s.media} />)
            : null}
        </video>
      ) : (
        <Image
          src={posterSrc}
          alt="Macro of Caviar Bakhoor pearls: dark spheres of encapsulated bakhoor scattered with flakes of 24-karat gold leaf"
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
          <HeroLogo />
        </h1>
      </div>

      {hasVideo ? (
        <button
          type="button"
          onClick={() => {
            // The click is itself a gesture, so sound can always start here.
            setUnlocked(true);
            setWanted(!audible);
          }}
          className="sound-toggle hero-sound"
          aria-pressed={audible}
          aria-label={audible ? "Turn sound off" : "Turn sound on"}
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
    </div>
  );
}
