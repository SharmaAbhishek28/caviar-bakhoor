"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { StackSection } from "@/components/ui";
import { UGC } from "@/data/ugc";
import { AMBIENT_VOLUME, useNear } from "@/lib/media";
import { gsap, initScroll, prefersReducedMotion } from "@/lib/scroll";

/**
 * 05c — In their hands: videos and photographs on one sideways track.
 *
 * The heading sits centred above and scrolls with the page. Below it the
 * film row pins for a screen and the scroll drives it right to left, at
 * every width; a counter and a progress rule keep place. Wide screens add
 * alternating tilts that straighten as each card crosses the middle.
 * Reduced motion: no pin, a native swipe row.
 *
 * The videos play, muted, each while it is on screen. A
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
  /* The films' posters and files load only as the section nears the
     screen: eleven posters at page load held up the first screen. */
  const near = useNear(ref);

  // The films play while on screen.
  useEffect(() => {
    if (prefersReducedMotion()) {
      videos.current.forEach((v) => v && (v.controls = true));
      return;
    }
    if (!near) return;
    // Each film plays only while it is itself on screen, so the track never
    // downloads all eleven at once.
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          const v = e.target as HTMLVideoElement;
          if (e.isIntersecting) v.play().catch(() => {});
          else v.pause();
        }),
      { threshold: 0.2 },
    );
    videos.current.forEach((v) => v && io.observe(v));
    return () => io.disconnect();
  }, [near]);

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
    /* The callback runs only while one condition matches, so the motion
       query is listed too: it is what holds at phone widths. */
    mm.add({ desktop: "(min-width: 1024px)", motionOk: "(prefers-reduced-motion: no-preference)" }, (ctx) => {
      const { desktop } = ctx.conditions as { desktop: boolean };
      const track = q(".ugc-track")[0] as HTMLElement;
      const pin = q(".ugc-pin")[0];
      const travel = () => Math.max(0, track.scrollWidth - window.innerWidth);
      const slide = gsap.to(track, {
        x: () => -travel(),
        ease: "none",
        scrollTrigger: {
          trigger: pin,
          start: "top top",
          end: () => `+=${travel()}`,
          pin: true,
          /* Direct on touch, so the row moves with the thumb. */
          scrub: desktop ? 0.6 : true,
          invalidateOnRefresh: true,
          onUpdate: (st) => setCurrent(Math.min(total, 1 + Math.floor(st.progress * total))),
        },
      });
      gsap.fromTo(q(".ugc-progress-fill"), { scaleX: 0 }, {
        scaleX: 1, ease: "none",
        scrollTrigger: { trigger: pin, start: "top top", end: () => `+=${travel()}`, scrub: true, invalidateOnRefresh: true },
      });
      // Wide screens: each card straightens as it crosses the middle.
      if (desktop) {
        q(".ugc-card").forEach((card, i) => {
          const r = TILT[i % TILT.length];
          gsap.timeline({
            scrollTrigger: { trigger: card, containerAnimation: slide, start: "left right", end: "right left", scrub: true },
          })
            .fromTo(card, { rotation: r, y: 30 }, { rotation: 0, y: 0, ease: "power1.out", duration: 1 })
            .to(card, { rotation: -r, y: 30, ease: "power1.in", duration: 1 });
        });
      }
      // The heading's lines rise as it arrives.
      gsap.fromTo(q(".ugc-line-inner"), { yPercent: 110 }, {
        yPercent: 0, stagger: 0.15, duration: 1, ease: "expo.out",
        scrollTrigger: { trigger: q(".ugc-intro")[0], start: "top 80%", toggleActions: "play none none reverse" },
      });
    });
    return () => mm.revert();
  }, [total]);

  // Each video's position among the videos, for its ref and its sound.
  const videoIndex = UGC.items.map((_, i) => UGC.items.slice(0, i + 1).filter((x) => x.kind === "video").length - 1);

  return (
    <StackSection index={7} surface="paper" className="ugc">
      <section ref={ref} aria-labelledby="ugc-title" data-no-reveal>
        {/* The heading scrolls with the page; only the films pin. */}
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
        <div className="pin-host">
          <div className="ugc-pin">
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
                            src={near ? it.src : undefined}
                            poster={near ? it.poster : undefined}
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
