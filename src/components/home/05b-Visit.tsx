"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { Container, MarkedProse, StackSection } from "@/components/ui";
import { VISIT } from "@/data/visit";
import { gsap, initScroll, prefersReducedMotion } from "@/lib/scroll";

/**
 * 05b — The royal visit (between the ritual and section 06).
 *
 * Wide screens: the section pins and the scroll plays it as a camera move.
 * The photograph opens out of a tight window on His Highness at the counter
 * (a clip and a zoom both easing out) to the whole scene; the headline rises
 * with it, then the body and the two notes light in turn, then the link and
 * the credit. Nothing is drawn on the photograph (site owner, 2026-10-24).
 *
 * Phones and tablets: no pin; the same beats play once as the section
 * scrolls in. Reduced motion: everything at rest. RevealAll keeps off.
 */
export function Visit() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root || prefersReducedMotion()) return;
    initScroll();
    const q = gsap.utils.selector(root);

    const mm = gsap.matchMedia(root);
    mm.add({ desktop: "(min-width: 1024px)", mobile: "(max-width: 1023px)" }, (ctx) => {
      const { desktop } = ctx.conditions as { desktop: boolean };

      // The copy's beats: eyebrow, headline, body, then the two notes.
      const copy = (tl: gsap.core.Timeline, notesAt: [number, number], footAt: number) =>
        tl
          .fromTo(q(".vs-eyebrow"), { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.5 }, 0.1)
          .fromTo(q(".vs-line-inner"), { yPercent: 110 }, { yPercent: 0, duration: 0.8, stagger: 0.15, ease: "power3.out" }, 0.2)
          .fromTo(q(".vs-body"), { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.6 }, 0.9)
          .fromTo(q(".vs-note--0"), { autoAlpha: 0.25, x: -12 }, { autoAlpha: 1, x: 0, duration: 0.5 }, notesAt[0])
          .to(q(".vs-note--0 .vs-note-rule"), { scaleX: 1, duration: 0.5 }, notesAt[0])
          .fromTo(q(".vs-note--1"), { autoAlpha: 0.25, x: -12 }, { autoAlpha: 1, x: 0, duration: 0.5 }, notesAt[1])
          .to(q(".vs-note--1 .vs-note-rule"), { scaleX: 1, duration: 0.5 }, notesAt[1])
          .fromTo(q(".vs-foot"), { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.5 }, footAt);

      // The photograph's beat: the camera opens out. No marks on it.
      const photo = (tl: gsap.core.Timeline, at = 0) =>
        tl
          .fromTo(q(".vs-frame"), { clipPath: "inset(24% 18% 40% 26% round 999px)" }, { clipPath: "inset(0% 0% 0% 0% round 0px)", duration: 1.4, ease: "power2.inOut" }, at)
          .fromTo(q(".vs-img"), { scale: 2.1 }, { scale: 1, duration: 1.6, ease: "power2.out" }, at)
          .fromTo(q(".vs-shade"), { opacity: 0.55 }, { opacity: 0, duration: 1.2 }, at + 0.2);

      if (desktop) {
        // One pinned, scrubbed timeline: copy and photograph in step.
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: { trigger: q(".vs-stage")[0], start: "top top", end: () => `+=${window.innerHeight * 2.2}`, pin: true, scrub: 0.7, invalidateOnRefresh: true },
        });
        photo(tl);
        copy(tl, [1.6, 2.4], 3);
      } else {
        // Phones: the copy plays as it arrives, the photograph as it does.
        const once = (el: Element | undefined) =>
          gsap.timeline({ defaults: { ease: "none" }, scrollTrigger: { trigger: el, start: "top 80%", toggleActions: "play none none reverse" } });
        copy(once(q(".vs-copy")[0]), [1.2, 1.5], 1.8).duration(2.2);
        photo(once(q(".vs-frame")[0])).duration(3);
      }
    });
    return () => mm.revert();
  }, []);

  return (
    <StackSection index={6} label="Visit" surface="ash" className="vs">
      <section ref={ref} aria-labelledby="vs-title" data-no-reveal>
        <div className="pin-host">
          <div className="vs-stage">
            <Container>
              <div className="vs-grid">
                <div className="vs-copy">
                  <p className="vs-eyebrow">{VISIT.eyebrow}</p>
                  <h2 id="vs-title" className="vs-title">
                    {VISIT.headline.map((l, i) => (
                      <span key={l} className={`vs-line${i === 1 ? " vs-line--italic" : ""}`}>
                        <span className="vs-line-inner">{l}</span>
                      </span>
                    ))}
                  </h2>
                  <MarkedProse className="vs-body" text={VISIT.body} strong={VISIT.strong} />
                  <ol className="vs-notes">
                    {VISIT.marks.map((m, i) => (
                      <li key={m.label} className={`vs-note vs-note--${i}`}>
                        <span className="vs-note-text">
                          <span className="vs-note-label">{m.label}</span>
                          <span className="vs-note-body">{m.note}</span>
                        </span>
                        <span className="vs-note-rule" aria-hidden />
                      </li>
                    ))}
                  </ol>
                  <div className="vs-foot">
                    <Link href={VISIT.link.href} className="vs-link">
                      {VISIT.link.label} <span aria-hidden>↗</span>
                    </Link>
                    <p className="vs-credit">{VISIT.credit}</p>
                  </div>
                </div>

                <figure className="vs-figure">
                  <div className="vs-frame">
                    <Image
                      src={VISIT.image.src}
                      alt={VISIT.image.alt}
                      width={VISIT.image.width}
                      height={VISIT.image.height}
                      sizes="(max-width: 1023px) 100vw, 40vw"
                      className="vs-img"
                      style={{ transformOrigin: `${VISIT.focus.x}% ${VISIT.focus.y}%` }}
                    />
                    <span className="vs-shade" aria-hidden />
                  </div>
                </figure>
              </div>
            </Container>
          </div>
        </div>
      </section>
    </StackSection>
  );
}
