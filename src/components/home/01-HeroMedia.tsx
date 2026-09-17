"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/**
 * The hero's media layer and its sound control.
 *
 * `hasVideo` comes from the server wrapper, which checks whether
 * public/video/hero.mp4 is actually on disk — so the video branch and the
 * sound toggle appear together, and neither can exist without the other.
 *
 * SOUND: browsers block autoplay with audio, so the video starts muted and
 * the toggle unmutes on request. Muted also has to be set on the element
 * directly, not only as an attribute, or Safari ignores it.
 */
export function HeroMedia({
  hasVideo,
  videoSrc,
  posterSrc,
}: {
  hasVideo: boolean;
  videoSrc: string;
  posterSrc: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const v = videoRef.current;
    if (v) v.muted = muted;
  }, [muted]);

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
          preload="metadata"
          poster={posterSrc}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        >
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
          aria-label={muted ? "Unmute video" : "Mute video"}
        >
          <span aria-hidden className="sound-bars">
            <span />
            <span />
            <span />
            <span />
          </span>
        </button>
      ) : null}
    </section>
  );
}
