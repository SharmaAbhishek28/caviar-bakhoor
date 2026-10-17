"use client";

import Image from "next/image";
import { preload } from "react-dom";
import { useEffect, useRef, useState } from "react";

/**
 * The hero's media layer and its sound control.
 *
 * `hasVideo` comes from the server wrapper, which checks whether
 * public/video/hero.mp4 is actually on disk — so the video branch and the
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
  videoSrc,
  mobileVideoSrc,
  posterSrc,
}: {
  hasVideo: boolean;
  videoSrc: string;
  mobileVideoSrc?: string;
  posterSrc: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
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
          {mobileVideoSrc ? (
            <source src={mobileVideoSrc} type="video/mp4" media="(max-width: 767px)" />
          ) : null}
          <source src={videoSrc} type="video/mp4" />
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

      <h1
        className="hero-caption"
        data-reveal-load
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: "8vh",
          margin: 0,
          paddingInline: "var(--gutter)",
          textAlign: "center",
          fontFamily: "var(--font-switzer-stack)",
          fontWeight: 900,
          fontSize: "clamp(1.35rem, 2.6vw, 2.2rem)",
          lineHeight: 1.15,
          letterSpacing: "0.01em",
          textTransform: "uppercase",
          color: "#fff",
          textShadow: "0 1px 24px rgb(8 7 10 / 0.45)",
        }}
      >
        An innovation in bakhoor.
        <br />
        Caviar Bakhoor.
      </h1>

      {hasVideo ? (
        <button
          type="button"
          onClick={() => setMuted((m) => !m)}
          className="sound-toggle"
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
