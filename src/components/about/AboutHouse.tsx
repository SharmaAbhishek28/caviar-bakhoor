"use client";

import Link from "next/link";
import { Fragment, useEffect, useRef, type RefObject } from "react";
import { Container } from "@/components/ui";
import { ABOUT } from "@/data/about";
import { gsap, initScroll, prefersReducedMotion } from "@/lib/scroll";

/**
 * The house, after the About page concept: philosophy, disciplines,
 * approach, the integrated house, the partnership close. Each section owns
 * its motion (so RevealAll keeps off, data-no-reveal):
 *
 *  Philosophy   dark; the two lines rise out of masks, the italic word
 *               last, the paragraph follows.
 *  Disciplines  each rule draws across, its number and title slide in;
 *               on hover the row's pearl marker swells.
 *  Approach     the two lines rise, the short rule draws from the centre.
 *  Integrated   the six stages light in turn as the grid scrolls through,
 *               a rule running ahead of them.
 *  Partnership  dark; three lines rise, then the button.
 *
 * Every "from" starts at the resting state, so with reduced motion (or no
 * JS) the sections are complete and still.
 */

function useMotion(ref: RefObject<HTMLElement | null>, build: (q: (s: string) => Element[], root: HTMLElement) => void) {
  useEffect(() => {
    const root = ref.current;
    if (!root || prefersReducedMotion()) return;
    initScroll();
    const ctx = gsap.context(() => build(gsap.utils.selector(root), root), root);
    return () => ctx.revert();
    // The builders are static; run once.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

const rise = (q: (s: string) => Element[], sel: string, trigger: Element, extra?: () => void) => {
  gsap
    .timeline({ scrollTrigger: { trigger, start: "top 78%", toggleActions: "play none none reverse" }, defaults: { ease: "expo.out" } })
    .fromTo(q(".ah-eyebrow"), { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.8 })
    .fromTo(q(sel), { yPercent: 110 }, { yPercent: 0, duration: 1.2, stagger: 0.12 }, 0.1)
    .add(() => extra?.(), 0.6);
};

/** A line with one word set in italic. */
function withEm(line: string, em?: string) {
  if (!em || !line.includes(em)) return line;
  const [a, b] = line.split(em);
  return (
    <>
      {a}
      <em>{em}</em>
      {b}
    </>
  );
}

export function Philosophy() {
  const ref = useRef<HTMLElement>(null);
  const p = ABOUT.philosophy;
  useMotion(ref, (q, root) => {
    rise(q, ".ah-line-inner", root);
    gsap.fromTo(q(".ah-phil-body"), { autoAlpha: 0, y: 20 }, {
      autoAlpha: 1, y: 0, duration: 1, ease: "expo.out",
      scrollTrigger: { trigger: q(".ah-phil-body")[0], start: "top 88%", toggleActions: "play none none reverse" },
    });
  });
  return (
    <section ref={ref} className="ah-phil on-ash" data-label="Philosophy" data-no-reveal>
      <Container>
        <p className="ah-eyebrow">{p.eyebrow}</p>
        <h2 className="ah-phil-h">
          {p.lines.map((l) => (
            <span key={l} className="ah-line">
              <span className="ah-line-inner">{withEm(l, p.em)}</span>
            </span>
          ))}
        </h2>
        <p className="ah-phil-body">{p.body}</p>
      </Container>
    </section>
  );
}

export function Disciplines() {
  const ref = useRef<HTMLElement>(null);
  const d = ABOUT.disciplines;
  useMotion(ref, (q, root) => {
    rise(q, ".ah-line-inner", root);
    gsap.fromTo(q(".ah-disc-lede"), { autoAlpha: 0 }, { autoAlpha: 1, duration: 1, scrollTrigger: { trigger: root, start: "top 70%", toggleActions: "play none none reverse" } });
    q(".ah-disc-row").forEach((row) => {
      const r = gsap.utils.selector(row);
      gsap
        .timeline({ scrollTrigger: { trigger: row, start: "top 88%", toggleActions: "play none none reverse" }, defaults: { ease: "expo.out" } })
        .fromTo(r(".ah-disc-rule"), { scaleX: 0 }, { scaleX: 1, duration: 1.2, ease: "power3.inOut" })
        .fromTo(r(".ah-disc-no"), { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.7 }, 0.25)
        .fromTo(r(".ah-disc-title"), { xPercent: -6, autoAlpha: 0 }, { xPercent: 0, autoAlpha: 1, duration: 1 }, 0.3)
        .fromTo(r(".ah-disc-body"), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.8 }, 0.5);
    });
  });
  const no = (n: number) => String(n).padStart(2, "0");
  return (
    <section ref={ref} className="ah-disc" data-label="Disciplines" data-no-reveal>
      <Container>
        <header className="ah-disc-head">
          <div>
            <p className="ah-eyebrow">{d.eyebrow}</p>
            <h2 className="ah-disc-h">
              <span className="ah-line">
                <span className="ah-line-inner">{d.title}</span>
              </span>
            </h2>
          </div>
          <p className="ah-disc-lede">{d.lede}</p>
        </header>
        <ol className="ah-disc-list">
          {d.items.map((it, i) => (
            <li key={it.title} className="ah-disc-row">
              <span className="ah-disc-rule" aria-hidden />
              <span className="ah-disc-no">{no(i + 1)}</span>
              <h3 className="ah-disc-title">
                <span className="ah-disc-pearl" aria-hidden />
                {it.title}
              </h3>
              <p className="ah-disc-body">{it.body}</p>
            </li>
          ))}
          <li className="ah-disc-end" aria-hidden />
        </ol>
      </Container>
    </section>
  );
}

export function Approach() {
  const ref = useRef<HTMLElement>(null);
  const a = ABOUT.approach;
  const h = ABOUT.integrated;
  useMotion(ref, (q, root) => {
    rise(q, ".ah-approach .ah-line-inner", q(".ah-approach")[0] ?? root);
    gsap.fromTo(q(".ah-approach-rule"), { scaleX: 0 }, { scaleX: 1, duration: 1.1, ease: "power3.inOut", scrollTrigger: { trigger: q(".ah-approach-rule")[0], start: "top 85%", toggleActions: "play none none reverse" } });
    gsap.fromTo(q(".ah-approach-body"), { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.9, ease: "expo.out", scrollTrigger: { trigger: q(".ah-approach-body")[0], start: "top 90%", toggleActions: "play none none reverse" } });

    const grid = q(".ah-int-grid")[0];
    gsap.fromTo(q(".ah-int-h .ah-line-inner"), { yPercent: 110 }, { yPercent: 0, duration: 1.2, stagger: 0.12, ease: "expo.out", scrollTrigger: { trigger: q(".ah-int-h")[0], start: "top 82%", toggleActions: "play none none reverse" } });
    gsap.fromTo(q(".ah-int .ah-eyebrow"), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.8, scrollTrigger: { trigger: q(".ah-int-h")[0], start: "top 86%", toggleActions: "play none none reverse" } });
    // The stages light in turn as the grid crosses the screen.
    const cells = q(".ah-int-cell");
    const lit = gsap.timeline({ scrollTrigger: { trigger: grid, start: "top 80%", end: "bottom 45%", scrub: 0.5 } });
    lit.fromTo(q(".ah-int-progress"), { scaleX: 0 }, { scaleX: 1, ease: "none", duration: cells.length }, 0);
    cells.forEach((cell, i) => {
      // One stage lit at a time; the last stays lit.
      lit.fromTo(cell, { "--lit": 0 }, { "--lit": 1, ease: "none", duration: 0.5 }, i);
      if (i < cells.length - 1) lit.to(cell, { "--lit": 0, ease: "none", duration: 0.5 }, i + 1);
      lit.fromTo(cell.querySelector(".ah-int-name"), { y: 18, autoAlpha: 0.15 }, { y: 0, autoAlpha: 1, ease: "power2.out", duration: 0.6 }, i);
    });
  });
  return (
    <section ref={ref} className="ah-approach-wrap" data-label="Approach" data-no-reveal>
      <div className="ah-approach">
        <Container>
          <p className="ah-eyebrow">{a.eyebrow}</p>
          <h2 className="ah-approach-h">
            {a.lines.map((l, i) => (
              <span key={l} className={`ah-line${i === 1 ? " ah-line--italic" : ""}`}>
                <span className="ah-line-inner">{l}</span>
              </span>
            ))}
          </h2>
          <span className="ah-approach-rule" aria-hidden />
          <p className="ah-approach-body">
            {a.body.map((l, i) => (
              <Fragment key={l}>
                {i ? <br /> : null}
                {l}
              </Fragment>
            ))}
          </p>
        </Container>
      </div>
      <div className="ah-int">
        <Container>
          <p className="ah-eyebrow">{h.eyebrow}</p>
          <h2 className="ah-int-h">
            {h.title.map((l) => (
              <span key={l} className="ah-line">
                <span className="ah-line-inner">{l}</span>
              </span>
            ))}
          </h2>
          <div className="ah-int-frame">
            <span className="ah-int-progress" aria-hidden />
            <ol className="ah-int-grid">
              {h.steps.map((s, i) => (
                <li key={s} className="ah-int-cell">
                  <span className="ah-int-no">{String(i + 1).padStart(2, "0")} /</span>
                  <span className="ah-int-name">{s}</span>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </div>
    </section>
  );
}

export function Partnership() {
  const ref = useRef<HTMLElement>(null);
  const p = ABOUT.partnership;
  useMotion(ref, (q, root) => {
    rise(q, ".ah-line-inner", root);
    gsap.fromTo(q(".ah-part-cta, .ah-part-sign"), { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.1, ease: "expo.out", scrollTrigger: { trigger: q(".ah-part-cta")[0], start: "top 92%", toggleActions: "play none none reverse" } });
  });
  return (
    <section ref={ref} className="ah-part on-ash" data-label="Partnership" data-no-reveal>
      <Container>
        <div className="ah-part-inner">
          <p className="ah-eyebrow">{p.eyebrow}</p>
          <h2 className="ah-part-h">
            {p.lines.map((l) => (
              <span key={l} className="ah-line">
                <span className="ah-line-inner">{l}</span>
              </span>
            ))}
          </h2>
          <Link href={p.cta.href} className="cta-button ah-part-cta">
            <span>{p.cta.label}</span>
            <span aria-hidden className="cta-arrow">↗</span>
          </Link>
          <p className="ah-part-sign">
            Caviar Bakhoor <span aria-hidden>·</span> {ABOUT.signature.house}
          </p>
        </div>
      </Container>
    </section>
  );
}
