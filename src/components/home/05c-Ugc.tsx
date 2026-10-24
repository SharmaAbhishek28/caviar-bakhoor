"use client";

import { useEffect, useRef, useState } from "react";
import { Container, StackSection } from "@/components/ui";
import { UGC } from "@/data/ugc";
import { AMBIENT_VOLUME } from "@/lib/media";
import { gsap, initScroll, prefersReducedMotion } from "@/lib/scroll";

/**
 * 05c — In their hands: three creator videos, after the royal visit.
 *
 * Wide screens: the three phone-shaped cards are dealt out of one stack
 * into a loose fan as the section scrolls in (scrubbed), the headline
 * rising with them; then the middle card drifts against the scroll.
 * Hovering a card straightens and lifts it. Phones: a swipe row.
 *
 * All three play, muted, together while the deck is on screen. A card's sound
 * button unmutes it and mutes the others. Reduced motion: no autoplay and
 * no dealing; the posters show and a tap plays.
 */
const FAN = [
  { r: -7, y: 40 },
  { r: 0, y: -10 },
  { r: 7, y: 40 },
];

export function Ugc() {
  const ref = useRef<HTMLElement>(null);
  const videos = useRef<(HTMLVideoElement | null)[]>([]);
  const [sound, setSound] = useState<number | null>(null);

  // Play only on screen; never autoplay under reduced motion.
  useEffect(() => {
    // Reduced motion: no autoplay; the native controls let a tap play.
    if (prefersReducedMotion()) {
      videos.current.forEach((v) => v && (v.controls = true));
      return;
    }
    // All three play together while the deck is on screen (site owner,
    // 2026-10-24), including the cards off to the side of the phone swipe
    // row; all pause when it leaves.
    const deck = ref.current?.querySelector(".ugc-deck");
    if (!deck) return;
    const io = new IntersectionObserver(
      ([e]) =>
        videos.current.forEach((v) => {
          if (!v) return;
          if (e.isIntersecting) v.play().catch(() => {});
          else v.pause();
        }),
      { threshold: 0.2 },
    );
    io.observe(deck);
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
      const cards = q(".ugc-card");
      // Dealt from one stack at the centre into the fan.
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: { trigger: q(".ugc-deck")[0], start: "top 85%", end: "top 25%", scrub: 0.8 },
      });
      cards.forEach((c, i) => {
        const dx = (1 - i) * (c as HTMLElement).offsetWidth * 1.06;
        tl.fromTo(c, { x: dx, y: 160, rotation: (i - 1) * -3, autoAlpha: 0 }, { x: 0, y: FAN[i].y, rotation: FAN[i].r, autoAlpha: 1, duration: 1 }, i === 1 ? 0 : 0.25);
      });
      tl.fromTo(q(".ugc-line-inner"), { yPercent: 110 }, { yPercent: 0, stagger: 0.15, duration: 0.8 }, 0);
      // After the deal, the middle card drifts against the page.
      gsap.to(cards[1], {
        yPercent: -8, ease: "none",
        scrollTrigger: { trigger: q(".ugc-deck")[0], start: "top 25%", end: "bottom top", scrub: true },
      });
    });
    mm.add("(max-width: 1023px)", () => {
      gsap.fromTo(q(".ugc-card"), { y: 40, autoAlpha: 0 }, {
        y: 0, autoAlpha: 1, stagger: 0.12, duration: 0.9, ease: "expo.out",
        scrollTrigger: { trigger: q(".ugc-deck")[0], start: "top 85%", toggleActions: "play none none reverse" },
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <StackSection index={7} label="In their hands" surface="paper" className="ugc">
      <section ref={ref} aria-labelledby="ugc-title" data-no-reveal>
        <Container>
          <header className="ugc-head">
            <p className="ugc-eyebrow">{UGC.eyebrow}</p>
            <h2 id="ugc-title" className="ugc-title">
              {UGC.headline.map((l, i) => (
                <span key={l} className={`ugc-line${i === 1 ? " ugc-line--italic" : ""}`}>
                  <span className="ugc-line-inner">{l}</span>
                </span>
              ))}
            </h2>
            <p className="ugc-copy">{UGC.line}</p>
          </header>
        </Container>

        <ol className="ugc-deck">
          {UGC.videos.map((v, i) => (
            <li key={v.id} className="ugc-card" style={{ "--r": `${FAN[i].r}deg` } as React.CSSProperties}>
              <div className="ugc-phone">
                <video
                  ref={(el) => {
                    videos.current[i] = el;
                  }}
                  className="ugc-video"
                  src={v.src}
                  poster={v.poster}
                  muted
                  loop
                  playsInline
                  preload="none"
                  aria-label={v.title}
                />
                <button
                  type="button"
                  className="ugc-sound"
                  aria-pressed={sound === i}
                  aria-label={sound === i ? `Turn sound off: ${v.title}` : `Turn sound on: ${v.title}`}
                  onClick={() => setSound((s) => (s === i ? null : i))}
                >
                  <svg viewBox="0 0 24 24" aria-hidden fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z" />
                    {sound === i ? (
                      <>
                        <path d="M15.5 9a4 4 0 0 1 0 6" />
                        <path d="M18 6.5a7.5 7.5 0 0 1 0 11" />
                      </>
                    ) : (
                      <path d="M16 9.5l5 5M21 9.5l-5 5" />
                    )}
                  </svg>
                </button>
              </div>
              <p className="ugc-caption">
                <span className="ugc-caption-no">{String(i + 1).padStart(2, "0")}</span>
                <span className="ugc-caption-title">{v.title}</span>
                {v.credit ? <span className="ugc-caption-credit">{v.credit}</span> : null}
              </p>
            </li>
          ))}
        </ol>
      </section>
    </StackSection>
  );
}
