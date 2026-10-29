"use client";

import { useEffect, useRef, useState } from "react";
import { AMBIENT_VOLUME, useNear } from "@/lib/media";

/**
 * The film under the composition line on the PDP: the client's ritual film
 * (the hero's earlier video), in a 16:9 frame, muted, looping, with the
 * same sound toggle as the hero.
 *
 * The poster and sources are set only as it nears the screen; it
 * plays only while on screen and never under reduced motion, where the
 * poster stands.
 */
export function ProductFilm({
  src,
  mobileSrc,
  poster,
  label,
}: {
  src: string;
  mobileSrc: string;
  poster: string;
  label: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const near = useNear(ref);

  useEffect(() => {
    if (near) ref.current?.load();
  }, [near]);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.volume = AMBIENT_VOLUME;
    v.muted = muted;
  }, [muted]);

  useEffect(() => {
    const v = ref.current;
    if (!v || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.25 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  return (
    <div className="pdp-film" data-no-reveal>
      <video
        ref={ref}
        className="pdp-film-video"
        loop
        playsInline
        muted
        preload="none"
        poster={near ? poster : undefined}
        aria-label={label}
      >
        {near ? (
          <>
            <source src={mobileSrc} type="video/mp4" media="(max-width: 767px)" />
            <source src={src} type="video/mp4" />
          </>
        ) : null}
      </video>

      <button
        type="button"
        onClick={() => setMuted((m) => !m)}
        className="sound-toggle"
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
  );
}
