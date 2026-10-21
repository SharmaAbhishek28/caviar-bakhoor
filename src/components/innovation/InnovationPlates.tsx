"use client";

import Image from "next/image";
import { Fragment, useEffect, useRef } from "react";
import type { Plate } from "@/data/innovation";
import { gsap, initScroll, prefersReducedMotion, ScrollTrigger } from "@/lib/scroll";

/**
 * The seven plates: the page's technical body, set like the client's lab
 * deck. Light and dark plates alternate; each has a tracked eyebrow, a
 * serif title, a lede, then one of five bodies:
 *
 *   specs    ruled label / value rows
 *   steps    numbered stages on a drawn line, value and note
 *   stages   four round figures joined by arrows, wood to pearl, then a
 *            row of process marks
 *   anatomy  the pearl in section, with leader-ruled callouts
 *   phases   three numbered phases, each with a round figure
 *
 * Wide screens: the plates sit on one horizontal track; the section pins
 * and the vertical scroll drives the track sideways. Each plate animates
 * its parts as it slides in (containerAnimation). Phones and tablets: the
 * plates stack, each animating as it scrolls in. Reduced motion: still.
 * RevealAll keeps off (data-no-reveal).
 */
export function InnovationPlates({ plates, footer }: { plates: Plate[]; footer: string }) {
  const rootRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const track = trackRef.current;
    if (!root || !track || prefersReducedMotion()) return;
    initScroll();

    const animatePlate = (plate: HTMLElement, trigger: ScrollTrigger.Vars) => {
      const q = gsap.utils.selector(plate);
      gsap
        .timeline({ scrollTrigger: trigger, defaults: { ease: "expo.out" } })
        .fromTo(q(".pl-media-main"), { clipPath: "inset(100% 0 0 0)" }, { clipPath: "inset(0% 0 0 0)", duration: 1.1, ease: "power3.inOut" })
        .fromTo(q(".pl-media-main img"), { scale: 1.35 }, { scale: 1, duration: 1.6 }, "<")
        .fromTo(q(".pl-inset"), { clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)", duration: 1, ease: "power3.inOut" }, 0.5)
        .fromTo(q(".pl-eyebrow, .pl-title-line, .pl-lede"), { yPercent: 60, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 0.9, stagger: 0.07 }, 0.15)
        .fromTo(q(".pl-row"), { x: -24, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 0.7, stagger: 0.07 }, 0.4)
        .fromTo(q(".pl-row-rule"), { scaleX: 0 }, { scaleX: 1, duration: 0.9, stagger: 0.07 }, 0.4)
        .fromTo(q(".pl-step-line"), { scaleY: 0 }, { scaleY: 1, duration: 1.2, ease: "power2.inOut" }, 0.4)
        .fromTo(q(".pl-step-no"), { scale: 0 }, { scale: 1, duration: 0.6, ease: "back.out(2.5)", stagger: 0.08 }, 0.45)
        .fromTo(q(".pl-stage-disc"), { scale: 0.4, autoAlpha: 0, rotate: -40 }, { scale: 1, autoAlpha: 1, rotate: 0, duration: 1, stagger: 0.14 }, 0.35)
        .fromTo(q(".pl-stage-text"), { y: 16, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.7, stagger: 0.14 }, 0.6)
        .fromTo(q(".pl-stage-arrow"), { scaleX: 0 }, { scaleX: 1, duration: 0.5, stagger: 0.14 }, 0.75)
        .fromTo(q(".pl-mark"), { y: 14, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.6, stagger: 0.08 }, 1)
        .fromTo(q(".pl-callout"), { x: 30, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 0.8, stagger: 0.12 }, 0.6)
        .fromTo(q(".pl-callout-rule"), { scaleX: 0 }, { scaleX: 1, duration: 0.7, stagger: 0.12 }, 0.6)
        .fromTo(q(".pl-phase"), { y: 30, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.9, stagger: 0.12 }, 0.4)
        .fromTo(q(".pl-phase-disc"), { clipPath: "circle(0% at 50% 50%)" }, { clipPath: "circle(50% at 50% 50%)", duration: 1, stagger: 0.12 }, 0.5);
    };

    const mm = gsap.matchMedia(root);
    mm.add("(min-width: 1024px)", () => {
      const distance = () => track.scrollWidth - window.innerWidth;
      const slide = gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      });
      gsap.utils.toArray<HTMLElement>(".pl", track).forEach((plate, i) => {
        // The first plate is in view as the pin begins; the rest animate as
        // they slide in from the right.
        animatePlate(
          plate,
          i === 0
            ? { trigger: root, start: "top 60%", toggleActions: "play none none reverse" }
            : { trigger: plate, containerAnimation: slide, start: "left 75%", toggleActions: "play none none reverse" },
        );
        // The main photograph drifts against the slide.
        const media = plate.querySelector(".pl-media-main img");
        if (media) {
          gsap.fromTo(media, { xPercent: -6 }, {
            xPercent: 6, ease: "none",
            scrollTrigger: { trigger: plate, containerAnimation: slide, start: "left right", end: "right left", scrub: true },
          });
        }
      });
    });
    mm.add("(max-width: 1023px)", () => {
      gsap.utils.toArray<HTMLElement>(".pl", track).forEach((plate) =>
        animatePlate(plate, { trigger: plate, start: "top 75%", toggleActions: "play none none reverse" }),
      );
    });
    return () => mm.revert();
  }, []);

  const total = String(plates.length).padStart(2, "0");
  const no = (n: number) => String(n).padStart(2, "0");

  // The pin host: GSAP wraps the pinned element in a pin-spacer, so React
  // must own a parent that the spacer sits inside. Without it React cannot
  // remove the pinned element on navigation (removeChild error).
  return (
    <div className="pin-host">
      <section ref={rootRef} className="pl-stage" aria-label="How Caviar Bakhoor is made" data-no-reveal>
        <ol ref={trackRef} className="pl-track">
          {plates.map((p, i) => (
            <li key={p.tag} className={`pl pl--${p.kind}${p.tone === "dark" ? " pl--dark" : ""}`}>
              <div className="pl-card">
                <header className="pl-headrow">
                  <span className="pl-eyebrow">{p.eyebrow}</span>
                  <span className="pl-count">
                    {no(i + 1)} / {total}
                  </span>
                </header>

                <div className="pl-copy">
                  <div className="pl-head">
                    <h2 className="pl-title">
                      {p.title.map((line) => (
                        <span key={line} className="pl-title-mask">
                          <span className="pl-title-line">{line}</span>
                        </span>
                      ))}
                    </h2>
                    {p.lede ? <p className="pl-lede">{p.lede}</p> : null}
                  </div>

                  {p.kind === "specs" ? (
                    <dl className="pl-specs">
                      {p.rows.map((r) => (
                        <div key={r.label} className="pl-row">
                          <dt>{r.label}</dt>
                          <dd>{r.value}</dd>
                          <span className="pl-row-rule" aria-hidden />
                        </div>
                      ))}
                    </dl>
                  ) : null}

                  {p.kind === "steps" ? (
                    <ol className="pl-steps">
                      <span className="pl-step-line" aria-hidden />
                      {p.rows.map((r, n) => (
                        <li key={r.label} className="pl-row pl-step">
                          <span className="pl-step-no">{no(n + 1)}</span>
                          <span className="pl-step-body">
                            <span className="pl-step-label">{r.label}</span>
                            <span className="pl-step-value">{r.value}</span>
                            {r.note ? <span className="pl-step-note">{r.note}</span> : null}
                          </span>
                        </li>
                      ))}
                    </ol>
                  ) : null}

                  {p.kind === "stages" ? (
                    <>
                      <ol className="pl-stages">
                        {p.stages.map((s, n) => (
                          <Fragment key={s.label}>
                            <li className="pl-stage-item">
                              <span className="pl-stage-disc">
                                <Image src={s.image.src} alt={s.image.alt} width={s.image.width} height={s.image.height} sizes="(max-width: 1023px) 40vw, 14vw" />
                              </span>
                              <span className="pl-stage-text">
                                <span className="pl-stage-label">{s.label}</span>
                                <span className="pl-stage-caption">{s.caption}</span>
                              </span>
                            </li>
                            {n < p.stages.length - 1 ? <li className="pl-stage-arrow" aria-hidden>→</li> : null}
                          </Fragment>
                        ))}
                      </ol>
                      <ul className="pl-marks">
                        {p.marks.map((m) => (
                          <li key={m} className="pl-mark">{m}</li>
                        ))}
                      </ul>
                    </>
                  ) : null}

                  {p.kind === "anatomy" ? (
                    <dl className="pl-callouts">
                      {p.callouts.map((c) => (
                        <div key={c.label} className="pl-callout">
                          <span className="pl-callout-rule" aria-hidden />
                          <dt>{c.label}</dt>
                          {c.lines.map((l) => (
                            <dd key={l}>{l}</dd>
                          ))}
                        </div>
                      ))}
                    </dl>
                  ) : null}

                  {p.kind === "phases" ? (
                    <ol className="pl-phases">
                      {p.phases.map((ph, n) => (
                        <li key={ph.label} className="pl-phase">
                          <span className="pl-phase-no">{no(n + 1)}</span>
                          <span className="pl-phase-disc">
                            <Image src={ph.image.src} alt={ph.image.alt} width={ph.image.width} height={ph.image.height} sizes="(max-width: 1023px) 30vw, 10vw" />
                          </span>
                          <span className="pl-phase-text">
                            <span className="pl-phase-label">{ph.label}</span>
                            <span className="pl-phase-body">{ph.body}</span>
                          </span>
                        </li>
                      ))}
                    </ol>
                  ) : null}
                </div>

                {p.image ? (
                  <div className="pl-media">
                    <div className="pl-media-main">
                      <Image src={p.image.src} alt={p.image.alt} width={p.image.width} height={p.image.height} sizes="(max-width: 1023px) 100vw, 34vw" />
                    </div>
                    {p.inset ? (
                      <figure className="pl-inset">
                        <Image src={p.inset.src} alt={p.inset.alt} width={p.inset.width} height={p.inset.height} sizes="(max-width: 1023px) 100vw, 30vw" />
                        <figcaption>{p.inset.caption}</figcaption>
                      </figure>
                    ) : null}
                  </div>
                ) : null}

                <footer className="pl-foot">
                  <span>
                    {footer} · {p.tag}
                  </span>
                </footer>
              </div>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
