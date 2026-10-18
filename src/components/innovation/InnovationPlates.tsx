"use client";

import Image from "next/image";
import { Fragment, useEffect, useRef } from "react";
import type { Plate } from "@/data/innovation";
import { gsap, initScroll, prefersReducedMotion, ScrollTrigger } from "@/lib/scroll";

/**
 * The eight plates — the page's technical body, set like a lab explainer's
 * slides: tracked eyebrow, serif title, then a list, numbered steps, an
 * arrow flow or a ruled table; a ruled aside; a footer with the plate count.
 *
 * Wide screens: the plates sit on one horizontal track; the section pins and
 * the vertical scroll drives the track sideways. Each plate animates its own
 * parts as it slides in (containerAnimation): the photograph uncovers and
 * settles, table rules draw, flow boxes drop in turn, step numbers pop, the
 * result bar slides through, the aside rule grows.
 *
 * Phones and tablets: the plates stack; each animates as it scrolls in.
 * Reduced motion: stacked, still. RevealAll keeps off (data-no-reveal).
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
        .fromTo(q(".pl-media"), { clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0% 0)", duration: 1.1, ease: "power3.inOut" })
        .fromTo(q(".pl-media img"), { scale: 1.35 }, { scale: 1, duration: 1.6 }, "<")
        .fromTo(q(".pl-eyebrow, .pl-title, .pl-lede"), { y: 30, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.9, stagger: 0.08 }, 0.2)
        .fromTo(q(".pl-list li, .pl-step"), { x: -24, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 0.8, stagger: 0.08 }, 0.45)
        .fromTo(q(".pl-step-no"), { scale: 0 }, { scale: 1, duration: 0.6, ease: "back.out(2.5)", stagger: 0.08 }, 0.5)
        .fromTo(q(".pl-flow-box"), { y: -26, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.7, stagger: 0.12 }, 0.4)
        .fromTo(q(".pl-flow-arrow"), { scaleY: 0 }, { scaleY: 1, duration: 0.4, stagger: 0.12 }, 0.55)
        .fromTo(q(".pl-result"), { xPercent: -12, autoAlpha: 0 }, { xPercent: 0, autoAlpha: 1, duration: 0.9 }, 0.95)
        .fromTo(q(".pl-row"), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.5, stagger: 0.06 }, 0.45)
        .fromTo(q(".pl-row-rule"), { scaleX: 0 }, { scaleX: 1, duration: 0.9, stagger: 0.06 }, 0.45)
        .fromTo(q(".pl-tag"), { letterSpacing: "0.6em", autoAlpha: 0 }, { letterSpacing: "0.22em", autoAlpha: 1, duration: 1.2 }, 0.7)
        .fromTo(q(".pl-aside"), { autoAlpha: 0, x: 16 }, { autoAlpha: 1, x: 0, duration: 0.8 }, 0.9)
        .fromTo(q(".pl-aside-rule"), { scaleY: 0 }, { scaleY: 1, duration: 0.8 }, 0.9);
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

  return (
    <section ref={rootRef} className="pl-stage" aria-label="How Caviar Bakhoor works" data-no-reveal>
      <ol ref={trackRef} className="pl-track">
        {plates.map((p, i) => (
          <li key={p.title} className="pl">
            <div className="pl-card">
              <div className="pl-copy">
                <p className="pl-eyebrow">{p.eyebrow}</p>
                <h2 className="pl-title">{p.title}</h2>
                {p.kind === "list" && p.lede ? <p className="pl-lede">{p.lede}</p> : null}

                {p.kind === "list" ? (
                  <ul className="pl-list">
                    {p.items.map((it) => (
                      <li key={it}>{it}</li>
                    ))}
                  </ul>
                ) : null}

                {p.kind === "steps" ? (
                  <ol className="pl-steps">
                    {p.items.map((it, n) => (
                      <li key={it} className="pl-step">
                        <span className="pl-step-no">{n + 1}</span>
                        <span>{it}</span>
                      </li>
                    ))}
                  </ol>
                ) : null}

                {p.kind === "flow" ? (
                  <div className="pl-flow">
                    {p.items.map((it, n) => (
                      <Fragment key={it}>
                        <span className="pl-flow-box">{it}</span>
                        {n < p.items.length - 1 || p.result ? <span className="pl-flow-arrow" aria-hidden>↓</span> : null}
                      </Fragment>
                    ))}
                    {p.result ? <span className="pl-result">{p.result}</span> : null}
                  </div>
                ) : null}

                {p.kind === "table" ? (
                  <div className="pl-table">
                    {p.groups.map((g, gi) => (
                      <div key={gi} className="pl-group">
                        {g.label ? <p className="pl-group-label">{g.label}</p> : null}
                        <dl>
                          {g.rows.map(([k, v]) => (
                            <div key={k} className={`pl-row${p.highlight === k ? " pl-row--hl" : ""}`}>
                              <dt>{k}</dt>
                              <dd>{v}</dd>
                              <span className="pl-row-rule" aria-hidden />
                            </div>
                          ))}
                        </dl>
                      </div>
                    ))}
                  </div>
                ) : null}

                {p.kind === "list" && p.tag ? <p className="pl-tag">{p.tag}</p> : null}

                {p.aside ? (
                  <p className="pl-aside">
                    <span className="pl-aside-rule" aria-hidden />
                    {p.aside}
                  </p>
                ) : null}
              </div>

              <div className="pl-media">
                <Image
                  src={p.image.src}
                  alt={p.image.alt}
                  width={p.image.width}
                  height={p.image.height}
                  sizes="(max-width: 1023px) 100vw, 34vw"
                />
              </div>

              <footer className="pl-foot">
                <span>{footer}</span>
                <span>
                  {String(i + 1).padStart(2, "0")} / {total}
                </span>
              </footer>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
