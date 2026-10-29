"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { StackSection } from "@/components/ui";
import { UGC } from "@/data/ugc";
import { AMBIENT_VOLUME } from "@/lib/media";
import { gsap, initScroll, prefersReducedMotion } from "@/lib/scroll";

/**
 * 05c — In their hands: videos and photographs on one sideways track.
 *
 * Wide screens: the section pins and the scroll drives the track right to
 * left; the heading is its first panel, carried on the same rail. Cards sit at alternating tilts and
 * straighten as they cross the middle of the screen; a counter and a
 * progress rule keep place. No edge labels: the cards cross the whole
 * screen. Phones: the heading, then a native swipe row of the films.
 *
 * The videos play, muted, together while the section is on screen. A
 * card's sound button unmutes it (ambient volume) and mutes the others.
 * Reduced motion: no autoplay, native controls, no tilt.
 */
const TILT = [-4, 3, -2, 4, -3, 2];

export function Ugc() {
  const ref = useRef<HTMLElement>(null);
  const videos = useRef<(HTMLVideoElement | null)[]>([]);
  const [sound, setSound] = useState<number | null>(null);
  const [current, setCurrent] = useState(1);
  const total = UGC.items.length;

  // All the videos play together while the track is on screen.
  useEffect(() => {
    if (prefersReducedMotion()) {
      videos.current.forEach((v) => v && (v.controls = true));
      return;
    }
    const track = ref.current?.querySelector(".ugc-track");
    if (!track) return;
    const io = new IntersectionObserver(
      ([e]) =>
        videos.current.forEach((v) => {
          if (!v) return;
          if (e.isIntersecting) v.play().catch(() => {});
          else v.pause();
        }),
      { threshold: 0.2 },
    );
    io.observe(track);
    return () => io.disconnect();
  }, []);

  // One voice at a time.
  useEffect(() => {
    videos.current.forEach((v, i) => {
      if (!v) return;
      v.volume = AMBIENT_VOLUME;
      v.muted = sound !== i;
      if (sound === i) v.play().catch(() => {});
    });
  }, [sound]);

  useEffect(() => {
    const root = ref.current;
    if (!root || prefersReducedMotion()) return;
    initScroll();
    const q = gsap.utils.selector(root);
    const mm = gsap.matchMedia(root);
    mm.add("(min-width: 1024px)", () => {
      const track = q(".ugc-track")[0] as HTMLElement;
      const rail = q(".ugc-rail")[0] as HTMLElement;
      const stage = q(".ugc-stage")[0];
      const travel = () => Math.max(0, track.scrollWidth - window.innerWidth);
      const slide = gsap.to(rail, {
        x: () => -travel(),
        ease: "none",
        scrollTrigger: {
          trigger: stage,
          start: "top top",
          end: () => `+=${travel()}`,
          pin: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
          onUpdate: (st) => setCurrent(Math.min(total, 1 + Math.floor(st.progress * total))),
        },
      });
      gsap.fromTo(q(".ugc-progress-fill"), { scaleX: 0 }, {
        scaleX: 1, ease: "none",
        scrollTrigger: { trigger: stage, start: "top top", end: () => `+=${travel()}`, scrub: true, invalidateOnRefresh: true },
      });
      // Each card straightens as it crosses the middle of the screen.
      q(".ugc-card").forEach((card, i) => {
        const r = TILT[i % TILT.length];
        gsap.timeline({
          scrollTrigger: { trigger: card, containerAnimation: slide, start: "left right", end: "right left", scrub: true },
        })
          .fromTo(card, { rotation: r, y: 30 }, { rotation: 0, y: 0, ease: "power1.out", duration: 1 })
          .to(card, { rotation: -r, y: 30, ease: "power1.in", duration: 1 });
      });
      // The heading panel's lines rise as the section arrives.
      gsap.fromTo(q(".ugc-line-inner"), { yPercent: 110 }, {
        yPercent: 0, stagger: 0.15, duration: 1, ease: "expo.out",
        scrollTrigger: { trigger: stage, start: "top 70%", toggleActions: "play none none reverse" },
      });
    });
    mm.add("(max-width: 1023px)", () => {
      gsap.fromTo(q(".ugc-card"), { y: 40, autoAlpha: 0 }, {
        y: 0, autoAlpha: 1, stagger: 0.1, duration: 0.9, ease: "expo.out",
        scrollTrigger: { trigger: q(".ugc-track")[0], start: "top 85%", toggleActions: "play none none reverse" },
      });
    });
    return () => mm.revert();
  }, [total]);

  // Each video's position among the videos, for its ref and its sound.
  const videoIndex = UGC.items.map((_, i) => UGC.items.slice(0, i + 1).filter((x) => x.kind === "video").length - 1);

  return (
    <StackSection index={7} surface="paper" className="ugc">
      <section ref={ref} aria-labelledby="ugc-title" data-no-reveal>
        <div className="pin-host">
          <div className="ugc-stage">
            {/* The rail carries the heading and the track together, so on wide
                screens the heading slides away as the first panel. On phones
                the heading sits above and the films start at the gutter. */}
            <div className="ugc-rail">
            <div className="ugc-intro">
              <p className="ugc-eyebrow">{UGC.eyebrow}</p>
              <h2 id="ugc-title" className="ugc-title">
                {UGC.headline.map((l, i) => (
                  <span key={l} className={`ugc-line${i === 1 ? " ugc-line--italic" : ""}`}>
                    <span className="ugc-line-inner">{l}</span>
                  </span>
                ))}
              </h2>
              {UGC.line ? <p className="ugc-copy">{UGC.line}</p> : null}
            </div>
            <ol className="ugc-track">
              {UGC.items.map((it, i) => {
                const vi = videoIndex[i];
                return (
                  <li key={it.id} className={`ugc-card ugc-card--${it.kind}`}>
                    <div className="ugc-media">
                      {it.kind === "video" ? (
                        <>
                          <video
                            ref={(el) => {
                              videos.current[vi] = el;
                            }}
                            className="ugc-video"
                            src={it.src}
                            poster={it.poster}
                            muted
                            loop
                            playsInline
                            preload="none"
                            aria-label={it.title}
                          />
                          <button
                            type="button"
                            className="ugc-sound"
                            aria-pressed={sound === vi}
                            aria-label={sound === vi ? `Turn sound off: ${it.title}` : `Turn sound on: ${it.title}`}
                            onClick={() => setSound((s) => (s === vi ? null : vi))}
                          >
                            <svg viewBox="0 0 24 24" aria-hidden fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z" />
                              {sound === vi ? (
                                <>
                                  <path d="M15.5 9a4 4 0 0 1 0 6" />
                                  <path d="M18 6.5a7.5 7.5 0 0 1 0 11" />
                                </>
                              ) : (
                                <path d="M16 9.5l5 5M21 9.5l-5 5" />
                              )}
                            </svg>
                          </button>
                        </>
                      ) : (
                        <Image src={it.src} alt={it.alt} width={it.width} height={it.height} sizes="(max-width: 1023px) 90vw, 60vw" className="ugc-photo" />
                      )}
                    </div>
                    <p className="ugc-caption">
                      <span className="ugc-caption-no">{String(i + 1).padStart(2, "0")}</span>
                      <span className="ugc-caption-title">{it.title}</span>
                      {it.credit ? <span className="ugc-caption-credit">{it.credit}</span> : null}
                    </p>
                  </li>
                );
              })}
            </ol>
            </div>
            <div className="ugc-meter" aria-hidden>
              <span className="ugc-count">
                {String(current).padStart(2, "0")} / {String(total).padStart(2, "0")}
              </span>
              <span className="ugc-progress">
                <span className="ugc-progress-fill" />
              </span>
            </div>
          </div>
        </div>
      </section>
    </StackSection>
  );
}
