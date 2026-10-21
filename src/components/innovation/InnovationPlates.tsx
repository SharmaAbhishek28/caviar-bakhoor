"use client";

import Image from "next/image";
import { Fragment, useEffect, useRef } from "react";
import type { Plate } from "@/data/innovation";
import { gsap, initScroll, prefersReducedMotion } from "@/lib/scroll";

/**
 * The seven plates of the client's technical deck, as chapters: each a
 * full-bleed band at its own natural height, light and dark alternating, so
 * no plate can outgrow its frame. Each has a tracked eyebrow and count, a
 * serif title, a lede, then one of five bodies:
 *
 *   specs    ruled label / value rows
 *   steps    numbered stages on a line that draws with the scroll; each
 *            number fills as the line reaches it
 *   stages   four round figures joined by arrows, wood to pearl, then a
 *            row of process marks
 *   anatomy  the pearl in section, with leader-ruled callouts
 *   phases   three numbered phases, each with a round figure
 *
 * Wide screens: the photograph holds (sticky) beside the copy while it
 * scrolls, uncovering as the chapter arrives and settling from a zoom as it
 * passes. Phones: the photograph sits under the copy. Reduced motion: all
 * at rest. RevealAll keeps off (data-no-reveal).
 */
export function InnovationPlates({ plates, footer }: { plates: Plate[]; footer: string }) {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || prefersReducedMotion()) return;
    initScroll();

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".pl", root).forEach((plate) => {
        const q = gsap.utils.selector(plate);
        const once = (trigger: Element | undefined, start = "top 80%") =>
          ({ trigger, start, toggleActions: "play none none reverse" }) as const;

        gsap
          .timeline({ scrollTrigger: once(plate, "top 70%"), defaults: { ease: "expo.out" } })
          .fromTo(q(".pl-headrow"), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.8 })
          .fromTo(q(".pl-title-line"), { yPercent: 110 }, { yPercent: 0, duration: 1.2, stagger: 0.1 }, 0.05)
          .fromTo(q(".pl-lede"), { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 1 }, 0.35);

        // The photograph: uncovers as the chapter arrives, settles as it passes.
        const main = q(".pl-media-main")[0];
        if (main) {
          gsap.fromTo(main, { clipPath: "inset(14% 14% 14% 14%)" }, { clipPath: "inset(0% 0% 0% 0%)", ease: "power2.out", scrollTrigger: { trigger: plate, start: "top 85%", end: "top 25%", scrub: 0.6 } });
          gsap.fromTo(main.querySelector("img"), { scale: 1.25 }, { scale: 1, ease: "none", scrollTrigger: { trigger: plate, start: "top bottom", end: "bottom top", scrub: true } });
        }
        q(".pl-inset").forEach((el) =>
          gsap.fromTo(el, { clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)", duration: 1.2, ease: "power3.inOut", scrollTrigger: once(el, "top 90%") }),
        );

        q(".pl-row").forEach((row) =>
          gsap
            .timeline({ scrollTrigger: once(row, "top 90%"), defaults: { ease: "expo.out" } })
            .fromTo(row, { x: -24, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 0.9 })
            .fromTo(row.querySelector(".pl-row-rule"), { scaleX: 0 }, { scaleX: 1, duration: 1.1, ease: "power3.inOut" }, 0),
        );

        // steps: the line draws with the scroll; each number fills as it is reached.
        const steps = q(".pl-steps")[0];
        if (steps) {
          gsap.fromTo(q(".pl-step-line"), { scaleY: 0 }, { scaleY: 1, ease: "none", scrollTrigger: { trigger: steps, start: "top 65%", end: "bottom 65%", scrub: 0.4 } });
          q(".pl-step").forEach((s) => gsap.to({}, { scrollTrigger: { trigger: s, start: "top 65%", toggleClass: { targets: s, className: "is-on" } } }));
        }

        const stages = q(".pl-stages")[0];
        if (stages) {
          gsap
            .timeline({ scrollTrigger: once(stages, "top 80%"), defaults: { ease: "expo.out" } })
            .fromTo(q(".pl-stage-disc"), { scale: 0.4, autoAlpha: 0, rotate: -40 }, { scale: 1, autoAlpha: 1, rotate: 0, duration: 1.1, stagger: 0.15 })
            .fromTo(q(".pl-stage-text"), { y: 16, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.8, stagger: 0.15 }, 0.25)
            .fromTo(q(".pl-stage-arrow"), { scaleX: 0 }, { scaleX: 1, duration: 0.5, stagger: 0.15 }, 0.4);
          gsap.fromTo(q(".pl-mark"), { y: 14, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.8, stagger: 0.08, ease: "expo.out", scrollTrigger: once(q(".pl-marks")[0], "top 92%") });
        }

        q(".pl-callout").forEach((c) =>
          gsap
            .timeline({ scrollTrigger: once(c, "top 88%"), defaults: { ease: "expo.out" } })
            .fromTo(c.querySelector(".pl-callout-rule"), { scaleX: 0 }, { scaleX: 1, duration: 0.8, ease: "power3.inOut" })
            .fromTo(c.querySelectorAll("dt, dd"), { x: 20, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 0.8, stagger: 0.06 }, 0.3),
        );

        q(".pl-phase").forEach((ph) =>
          gsap
            .timeline({ scrollTrigger: once(ph, "top 88%"), defaults: { ease: "expo.out" } })
            .fromTo(ph, { y: 30, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1 })
            .fromTo(ph.querySelector(".pl-phase-disc"), { clipPath: "circle(0% at 50% 50%)" }, { clipPath: "circle(50% at 50% 50%)", duration: 1.1 }, 0.1),
        );
      });
    }, root);
    return () => ctx.revert();
  }, []);

  const total = String(plates.length).padStart(2, "0");
  const no = (n: number) => String(n).padStart(2, "0");

  return (
    <section ref={rootRef} className="pl-stage" aria-label="How Caviar Bakhoor is made" data-no-reveal>
      {plates.map((p, i) => (
        <article
          key={p.tag}
          className={`pl pl--${p.kind}${p.tone === "dark" ? " pl--dark on-ash" : ""}`}
          data-label="Process"
        >
          <div className="pl-wrap">
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
                      <li key={r.label} className="pl-step">
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
                              <Image src={s.image.src} alt={s.image.alt} width={s.image.width} height={s.image.height} sizes="(max-width: 639px) 45vw, 20vw" />
                            </span>
                            <span className="pl-stage-text">
                              <span className="pl-stage-label">{s.label}</span>
                              <span className="pl-stage-caption">{s.caption}</span>
                            </span>
                          </li>
                          {n < p.stages.length - 1 ? (
                            <li className="pl-stage-arrow" aria-hidden>
                              →
                            </li>
                          ) : null}
                        </Fragment>
                      ))}
                    </ol>
                    <ul className="pl-marks">
                      {p.marks.map((m) => (
                        <li key={m} className="pl-mark">
                          {m}
                        </li>
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
                          <Image src={ph.image.src} alt={ph.image.alt} width={ph.image.width} height={ph.image.height} sizes="(max-width: 639px) 30vw, 12vw" />
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
                    <Image src={p.image.src} alt={p.image.alt} width={p.image.width} height={p.image.height} sizes="(max-width: 1023px) 100vw, 45vw" />
                  </div>
                  {p.inset ? (
                    <figure className="pl-inset">
                      <Image src={p.inset.src} alt={p.inset.alt} width={p.inset.width} height={p.inset.height} sizes="(max-width: 1023px) 100vw, 40vw" />
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
          </div>
        </article>
      ))}
    </section>
  );
}
