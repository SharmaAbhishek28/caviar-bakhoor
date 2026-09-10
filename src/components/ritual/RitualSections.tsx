"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Container, Eyebrow } from "@/components/ui";
import { RITUAL_STEPS } from "@/data/ritual";
import { RITUAL_PAGE } from "@/data/ritual-page";
import { gsap, initScroll, prefersReducedMotion } from "@/lib/scroll";

/**
 * /ritual — six sections, six mechanics, none shared with About or For
 * Business:
 *
 *   1  Opener    character reveal; a dark circle grows from a dot to fill
 *                the screen as you scroll — the pearl opening
 *   2  Steps     pinned: numeral flips, image crossfades, copy slides in,
 *                a ring draws
 *   3  Box       the five contents fan out from the centre — an unboxing
 *   4  Heat      a marker travels a line that warms to gold; states light
 *   5  Objects   three columns at three parallax rates
 *   6  Close
 *
 * Every from-state is the resting state, so reduced motion and no-JS show
 * a finished page; the pin is desktop-only.
 */

const motionOff = () => prefersReducedMotion();
const pad = (i: number) => String(i + 1).padStart(2, "0");

/* 1 — Opener ------------------------------------------------------------- */
export function RitualOpener() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root || motionOff()) return;
    initScroll();
    const ctx = gsap.context(() => {
      gsap.timeline({ defaults: { ease: "expo.out" } })
        .from(".rt-eyebrow", { opacity: 0, y: 10, duration: 0.7 })
        .from(".rt-char", { yPercent: 110, opacity: 0, duration: 0.9, stagger: 0.018 }, "-=0.4")
        .from(".rt-lede", { opacity: 0, y: 12, duration: 0.8 }, "-=0.5");
      // The pearl: a 40px dot that grows to cover the viewport over the
      // section's scroll, and the copy inverts once it is under the dot.
      gsap.fromTo(".rt-pearl", { scale: 1 }, {
        scale: () => (Math.hypot(window.innerWidth, window.innerHeight) / 40) * 1.05,
        ease: "power2.in",
        scrollTrigger: {
          trigger: root, start: "top top", end: "bottom bottom", scrub: true, invalidateOnRefresh: true,
          /* The dot is 40px; at scale ~9 it is ~360px across and sits behind
             the headline's middle — invert the copy from there. */
          onUpdate: (self) => root.toggleAttribute("data-dark", self.progress > 0.42),
        },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  const chars = (line: string) => line.split("").map((c, i) => (
    <span key={i} className="rt-mask"><span className="rt-char">{c === " " ? " " : c}</span></span>
  ));

  return (
    <section ref={ref} className="rt-opener" data-label="Ritual">
      {/* The sticky frame holds the pearl and the copy for the whole section,
          so the circle grows over the headline rather than after it. */}
      <div className="rt-opener-sticky">
      <span className="rt-pearl" aria-hidden />
      <Container>
        <div className="rt-opener-copy">
          <div className="rt-eyebrow"><Eyebrow>{RITUAL_PAGE.eyebrow}</Eyebrow></div>
          <h1 className="rt-h1">
            {RITUAL_PAGE.headline.map((line, i) => (
              <span key={line} className={`rt-h1-line${i === 1 ? " rt-h1-line--italic" : ""}`}>{chars(line)}</span>
            ))}
          </h1>
          <p className="rt-lede type-body">{RITUAL_PAGE.lede}</p>
        </div>
      </Container>
      </div>
    </section>
  );
}

/* 2 — The four steps, pinned ------------------------------------------------ */
export function RitualSteps() {
  const ref = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const prev = useRef(0);
  const n = RITUAL_STEPS.length;
  const CIRC = 2 * Math.PI * 48;

  useEffect(() => {
    const root = ref.current;
    const pin = pinRef.current;
    if (!root || !pin) return;
    initScroll();
    const mm = gsap.matchMedia(root);
    mm.add({ desktop: "(min-width: 1024px)", motionOk: "(prefers-reduced-motion: no-preference)" }, (ctx) => {
      const { desktop, motionOk } = ctx.conditions as { desktop: boolean; motionOk: boolean };
      if (!desktop || !motionOk) return;

      const numerals = gsap.utils.toArray<HTMLElement>(".rt-numeral", root);
      const images = gsap.utils.toArray<HTMLElement>(".rt-step-img", root);
      const copies = gsap.utils.toArray<HTMLElement>(".rt-step-copy", root);
      const ring = root.querySelector<SVGCircleElement>(".rt-ring-fill");
      const state = { p: 0 };

      const show = (i: number) => {
        const from = prev.current;
        if (from === i) return;
        prev.current = i;
        setActive(i);
        gsap.to(numerals[from], { rotationX: 90, opacity: 0, duration: 0.5, ease: "power2.in", overwrite: true });
        gsap.fromTo(numerals[i], { rotationX: -90, opacity: 0 }, { rotationX: 0, opacity: 1, duration: 0.7, ease: "expo.out", overwrite: true });
        gsap.to(images[from], { opacity: 0, scale: 1.04, duration: 0.6, overwrite: true });
        gsap.fromTo(images[i], { opacity: 0, scale: 1.08 }, { opacity: 1, scale: 1, duration: 0.9, ease: "power2.out", overwrite: true });
        gsap.to(copies[from], { x: 24, opacity: 0, duration: 0.35, overwrite: true });
        gsap.fromTo(copies[i], { x: 48, opacity: 0 }, { x: 0, opacity: 1, duration: 0.7, ease: "expo.out", delay: 0.15, overwrite: true });
      };

      gsap.set(numerals, { rotationX: 90, opacity: 0, transformPerspective: 900 });
      gsap.set(numerals[0], { rotationX: 0, opacity: 1 });
      gsap.set(images, { opacity: 0 }); gsap.set(images[0], { opacity: 1 });
      gsap.set(copies, { opacity: 0, x: 48 }); gsap.set(copies[0], { opacity: 1, x: 0 });

      gsap.to(state, {
        p: 1, ease: "none",
        onUpdate: () => {
          if (ring) gsap.set(ring, { strokeDashoffset: CIRC * (1 - state.p) });
          show(Math.min(n - 1, Math.floor(state.p * n + 0.0001)));
        },
        scrollTrigger: { trigger: root, start: "top top", end: () => "+=" + window.innerHeight * n, pin, scrub: 0.4, invalidateOnRefresh: true },
      });
    });
    return () => mm.revert();
  }, [n, CIRC]);

  return (
    <section ref={ref} className="rt-steps" data-label="Steps">
      <div ref={pinRef} className="rt-steps-pin">
        <div className="rt-stage">
          <div className="rt-numerals" aria-hidden>
            <svg className="rt-ring" viewBox="0 0 112 112">
              <circle cx="56" cy="56" r="48" className="rt-ring-track" />
              <circle cx="56" cy="56" r="48" className="rt-ring-fill" style={{ strokeDasharray: CIRC, strokeDashoffset: CIRC }} />
            </svg>
            {RITUAL_STEPS.map((s) => (
              <span key={s.no} className="rt-numeral">{s.no}</span>
            ))}
          </div>

          <div className="rt-step-media">
            {RITUAL_PAGE.stepImages.map((img, i) => (
              <Image key={img.src} src={img.src} alt={img.alt} width={img.width} height={img.height} sizes="(max-width: 1023px) 100vw, 40vw" className="rt-step-img" priority={i === 0} />
            ))}
          </div>

          <ol className="rt-step-copies">
            {RITUAL_STEPS.map((s, i) => (
              <li key={s.no} className="rt-step-copy" data-active={i === active || undefined}>
                {/* Shown only below 1024px, where the stage is not rendered. */}
                <Image src={RITUAL_PAGE.stepImages[i].src} alt={RITUAL_PAGE.stepImages[i].alt} width={RITUAL_PAGE.stepImages[i].width} height={RITUAL_PAGE.stepImages[i].height} sizes="100vw" className="rt-step-copy-img" />
                <span className="rt-step-kicker">Step {s.no} of {pad(n - 1)}</span>
                <h2 className="rt-step-name">{s.name}</h2>
                <p className="rt-step-body">{s.body}</p>
                {i === RITUAL_PAGE.stepConfirm.index ? <p className="rt-confirm" role="note">{RITUAL_PAGE.stepConfirm.note}</p> : null}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* 3 — In the box: the unboxing --------------------------------------------- */
export function RitualBox() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root || motionOff()) return;
    initScroll();
    const ctx = gsap.context(() => {
      const grid = root.querySelector<HTMLElement>(".rt-box-grid");
      const items = gsap.utils.toArray<HTMLElement>(".rt-item", root);
      if (!grid) return;
      const g = grid.getBoundingClientRect();
      const cx = g.left + g.width / 2, cy = g.top + g.height / 2;
      items.forEach((el) => {
        const r = el.getBoundingClientRect();
        gsap.from(el, {
          x: cx - (r.left + r.width / 2), y: cy - (r.top + r.height / 2), scale: 0.5, opacity: 0,
          duration: 1.3, ease: "expo.out",
          scrollTrigger: { trigger: grid, start: "top 75%", once: true },
          delay: Math.random() * 0.15,
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);
  return (
    <section ref={ref} className="rt-box" data-label="In the box">
      <Container>
        <h2 className="rt-h2">{RITUAL_PAGE.box.title}</h2>
        <p className="type-body rt-box-lede">{RITUAL_PAGE.lede}</p>
        <ul className="rt-box-grid">
          {RITUAL_PAGE.box.items.map((item, i) => (
            <li key={item.name} className={`rt-item rt-item--${i + 1}`}>
              {item.image ? (
                <Image src={item.image.src} alt={item.image.alt} width={item.image.width} height={item.image.height} sizes="(max-width: 767px) 50vw, 25vw" className="rt-item-img" />
              ) : (
                <div className="rt-item-blank"><span>{item.note}</span></div>
              )}
              <span className="rt-item-no">{pad(i)}</span>
              <span className="rt-item-name">{item.name}</span>
              {"confirm" in item && item.confirm ? <span className="rt-confirm">{item.confirm}</span> : null}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

/* 4 — Heat line ------------------------------------------------------------ */
export function RitualHeat() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const n = RITUAL_PAGE.heat.states.length;
  useEffect(() => {
    const root = ref.current;
    if (!root || motionOff()) return;
    initScroll();
    const ctx = gsap.context(() => {
      const track = root.querySelector<HTMLElement>(".rt-heat-track");
      const pearl = root.querySelector<HTMLElement>(".rt-heat-pearl");
      const fill = root.querySelector<HTMLElement>(".rt-heat-fill");
      if (!track || !pearl || !fill) return;
      const state = { p: 0 };
      gsap.to(state, {
        p: 1, ease: "none",
        onUpdate: () => {
          gsap.set(fill, { scaleX: state.p });
          gsap.set(pearl, { x: state.p * (track.clientWidth - pearl.offsetWidth) });
          setActive(Math.min(n - 1, Math.floor(state.p * n + 0.0001)));
        },
        scrollTrigger: { trigger: root, start: "top 60%", end: "bottom 60%", scrub: 0.3, invalidateOnRefresh: true },
      });
    }, root);
    return () => ctx.revert();
  }, [n]);
  return (
    <section ref={ref} className="rt-heat" data-label="Heat">
      <Container>
        <div className="rt-heat-head">
          <h2 className="rt-heat-title">{RITUAL_PAGE.heat.title}</h2>
          <p className="type-body rt-heat-lede">{RITUAL_PAGE.heat.lede}</p>
        </div>
        <div className="rt-heat-track" aria-hidden>
          <span className="rt-heat-fill" />
          <span className="rt-heat-pearl" />
        </div>
        <ol className="rt-heat-states">
          {RITUAL_PAGE.heat.states.map((s, i) => (
            <li key={s.name} className="rt-heat-state" data-active={i <= active || undefined} data-current={i === active || undefined}>
              <span className="rt-heat-no">{pad(i)}</span>
              <span className="rt-heat-name">{s.name}</span>
              <span className="rt-heat-body">{s.body}</span>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

/* 5 — The objects: parallax columns --------------------------------------- */
export function RitualObjects() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root || motionOff()) return;
    initScroll();
    const ctx = gsap.context(() => {
      const rates = [-14, 8, -22];
      gsap.utils.toArray<HTMLElement>(".rt-col", root).forEach((col, i) => {
        gsap.fromTo(col, { yPercent: -rates[i] / 2 }, { yPercent: rates[i] / 2, ease: "none", scrollTrigger: { trigger: root, start: "top bottom", end: "bottom top", scrub: true } });
      });
    }, root);
    return () => ctx.revert();
  }, []);
  return (
    <section ref={ref} className="rt-objects" data-label="Objects">
      <Container>
        <h2 className="rt-h2 rt-objects-title">{RITUAL_PAGE.objects.title}</h2>
      </Container>
      <div className="rt-cols">
        {RITUAL_PAGE.objects.columns.map((col, i) => (
          <div key={i} className="rt-col">
            {col.map((img) => (
              <figure key={img.src} className="rt-obj">
                <Image src={img.src} alt={img.alt} width={img.width} height={img.height} sizes="(max-width: 767px) 50vw, 33vw" />
              </figure>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

/* 6 — Close ------------------------------------------------------------------ */
export function RitualClose() {
  return (
    <section className="ab-close" data-label="Collection">
      <Container>
        <div className="ab-close-inner">
          <h2 className="ab-close-h">
            <span className="type-counter-xl ab-close-lead">{RITUAL_PAGE.close.lead}</span>
            <span className="type-display-xl ab-close-line">{RITUAL_PAGE.close.line}</span>
          </h2>
          <div className="ab-close-actions">
            <Link href={RITUAL_PAGE.close.primary.href} className="cta-button"><span>{RITUAL_PAGE.close.primary.label}</span><span aria-hidden className="cta-arrow">↗</span></Link>
            <Link href={RITUAL_PAGE.close.secondary.href} className="cta-button cta-button--ghost"><span>{RITUAL_PAGE.close.secondary.label}</span><span aria-hidden className="cta-arrow">↗</span></Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
