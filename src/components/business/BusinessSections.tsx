"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Container, Eyebrow } from "@/components/ui";
import { BUSINESS } from "@/data/business";
import { gsap, initScroll, prefersReducedMotion } from "@/lib/scroll";

/**
 * /for-business — seven animated sections (the eighth, the form, is the
 * shared EnquiryForm). Each owns one GSAP mechanic and its own context, so
 * they can be reordered or removed independently:
 *
 *   1  Opener      masked word reveal, then a frame that expands to full bleed
 *   2  Statement   words brighten as the scroll passes them
 *   3  Clients     rows slide in from alternating sides
 *   4  Offer       cards flip up with perspective
 *   5  Process     pinned; a line draws and steps light up as it reaches them
 *   6  Made        a sticky image that swaps as the rows scroll
 *   7  Collabs     panels parallax at their own rates and wipe open
 *
 * Every "from" starts at the resting state, so with reduced motion (or no
 * JS) the page is complete; the pin is desktop-only.
 */

const motionOff = () => prefersReducedMotion();

/* 1 — Opener ------------------------------------------------------------- */
export function BizOpener() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root || motionOff()) return;
    initScroll();
    const ctx = gsap.context(() => {
      gsap.timeline({ defaults: { ease: "expo.out" } })
        .from(".biz-eyebrow", { opacity: 0, y: 10, duration: 0.7 })
        .from(".biz-word", { yPercent: 115, skewY: 6, duration: 1.1, stagger: 0.07 }, "-=0.4")
        .from(".biz-lede, .biz-opener-cta", { opacity: 0, y: 14, duration: 0.8, stagger: 0.1 }, "-=0.6");
      gsap.fromTo(".biz-frame", { clipPath: "inset(0 30% 0 30%)" }, { clipPath: "inset(0 0% 0 0%)", ease: "none", scrollTrigger: { trigger: ".biz-frame", start: "top 85%", end: "top 15%", scrub: true } });
      gsap.fromTo(".biz-frame img", { scale: 1.2 }, { scale: 1, ease: "none", scrollTrigger: { trigger: ".biz-frame", start: "top 85%", end: "bottom top", scrub: true } });
    }, root);
    return () => ctx.revert();
  }, []);

  /* The space sits between the masks, not inside one: inside, it is part
     of the inline-block and the words run together. */
  const words = (s: string) => s.split(" ").map((w, i) => (
    <span key={i}><span className="biz-mask"><span className="biz-word">{w}</span></span>{" "}</span>
  ));

  return (
    <section ref={ref} className="biz-opener" data-label="Business">
      <Container>
        <div className="biz-opener-copy">
          <div className="biz-eyebrow"><Eyebrow>{BUSINESS.eyebrow}</Eyebrow></div>
          <h1 className="biz-h1">
            <span className="biz-h1-line">{words(BUSINESS.headline.first)}</span>
            <span className="biz-h1-line biz-h1-line--italic">{words(BUSINESS.headline.second)}</span>
          </h1>
          <p className="biz-lede type-body">{BUSINESS.line}</p>
          <a href="#enquire" className="cta-button biz-opener-cta">
            <span>{BUSINESS.cta}</span><span aria-hidden className="cta-arrow">↗</span>
          </a>
        </div>
      </Container>
      <div className="biz-frame">
        <Image src={BUSINESS.opener.src} alt={BUSINESS.opener.alt} width={BUSINESS.opener.width} height={BUSINESS.opener.height} sizes="100vw" priority />
      </div>
    </section>
  );
}

/* 2 — Statement ------------------------------------------------------------ */
export function BizStatement() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root || motionOff()) return;
    initScroll();
    const ctx = gsap.context(() => {
      gsap.fromTo(".biz-sw", { opacity: 0.14 }, { opacity: 1, stagger: 0.04, ease: "none", scrollTrigger: { trigger: ".biz-statement-p", start: "top 75%", end: "bottom 40%", scrub: true } });
    }, root);
    return () => ctx.revert();
  }, []);
  return (
    <section ref={ref} className="biz-statement" data-label="Business">
      <Container>
        <p className="biz-statement-p">
          {BUSINESS.statement.split(" ").map((w, i) => (
            <span key={i} className="biz-sw">{w}{" "}</span>
          ))}
        </p>
      </Container>
    </section>
  );
}

/* 3 — Who we work with ------------------------------------------------------ */
export function BizClients() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root || motionOff()) return;
    initScroll();
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".biz-row").forEach((row, i) => {
        gsap.fromTo(row, { xPercent: i % 2 ? 18 : -18, opacity: 0 }, { xPercent: 0, opacity: 1, ease: "none", scrollTrigger: { trigger: row, start: "top 95%", end: "top 60%", scrub: true } });
      });
    }, root);
    return () => ctx.revert();
  }, []);
  return (
    <section ref={ref} className="biz-clients" data-label="Clients">
      <Container>
        <h2 className="biz-h2">{BUSINESS.clients.title}</h2>
      </Container>
      <ol className="biz-rows">
        {BUSINESS.clients.items.map((item, i) => (
          <li key={item} className="biz-row">
            <Container>
              <div className="biz-row-inner">
                <span className="biz-row-no">{String(i + 1).padStart(2, "0")}</span>
                <span className="biz-row-label">{item}</span>
              </div>
            </Container>
          </li>
        ))}
      </ol>
    </section>
  );
}

/* 4 — What we offer ------------------------------------------------------- */
export function BizOffer() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root || motionOff()) return;
    initScroll();
    const ctx = gsap.context(() => {
      gsap.from(".biz-card", { rotationX: 90, opacity: 0, transformOrigin: "50% 0%", duration: 1.1, ease: "expo.out", stagger: 0.1, scrollTrigger: { trigger: ".biz-cards", start: "top 80%", once: true } });
    }, root);
    return () => ctx.revert();
  }, []);
  return (
    <section ref={ref} className="biz-offer" data-label="Offer">
      <Container>
        <div className="biz-offer-head">
          <h2 className="biz-h2">{BUSINESS.offer.title}</h2>
          <p className="biz-note" role="note">{BUSINESS.offer.note}</p>
        </div>
        <ul className="biz-cards">
          {BUSINESS.offer.items.map((item, i) => (
            <li key={item} className="biz-card" data-confirm="capability">
              <span className="biz-card-no">{String(i + 1).padStart(2, "0")}</span>
              <span className="biz-card-title">{item}</span>
              <span className="biz-card-confirm">[CONFIRM]</span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

/* 5 — Process ------------------------------------------------------------- */
export function BizProcess() {
  const ref = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const n = BUSINESS.process.steps.length;

  useEffect(() => {
    const root = ref.current;
    const pin = pinRef.current;
    if (!root || !pin) return;
    initScroll();
    const mm = gsap.matchMedia(root);
    mm.add({ desktop: "(min-width: 1024px)", motionOk: "(prefers-reduced-motion: no-preference)" }, (ctx) => {
      const { desktop, motionOk } = ctx.conditions as { desktop: boolean; motionOk: boolean };
      if (!motionOk) { setActive(n - 1); return; }
      if (!desktop) {
        // No pin: each step lights as it passes the middle of the screen.
        gsap.utils.toArray<HTMLElement>(".biz-step", root).forEach((el, i) => {
          gsap.to({}, { scrollTrigger: { trigger: el, start: "top 60%", onEnter: () => setActive(i), onLeaveBack: () => setActive(Math.max(0, i - 1)) } });
        });
        return;
      }
      const state = { p: 0 };
      gsap.to(state, {
        p: 1, ease: "none",
        onUpdate: () => {
          gsap.set(".biz-line-fill", { scaleY: state.p });
          setActive(Math.min(n - 1, Math.floor(state.p * n + 0.0001)));
        },
        scrollTrigger: { trigger: root, start: "top top", end: () => "+=" + window.innerHeight * 1.6, pin, scrub: 0.4, invalidateOnRefresh: true },
      });
    });
    return () => mm.revert();
  }, [n]);

  return (
    <section ref={ref} className="biz-process" data-label="Process">
      <div ref={pinRef} className="biz-process-pin">
        <Container>
          <div className="biz-process-grid">
            <div className="biz-process-head">
              <h2 className="biz-h2">{BUSINESS.process.title}</h2>
              <p className="type-body">{BUSINESS.process.lead}</p>
            </div>
            <ol className="biz-steps">
              <span className="biz-line" aria-hidden><span className="biz-line-fill" /></span>
              {BUSINESS.process.steps.map((s, i) => (
                <li key={s.name} className="biz-step" data-active={i <= active || undefined} data-current={i === active || undefined}>
                  <span className="biz-step-no">{String(i + 1).padStart(2, "0")}</span>
                  <span className="biz-step-name">{s.name}</span>
                  <span className="biz-step-body">{s.body}</span>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </div>
    </section>
  );
}

/* 6 — Made for your brand ------------------------------------------------- */
export function BizMade() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  useEffect(() => {
    const root = ref.current;
    if (!root || motionOff()) return;
    initScroll();
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".biz-made-row", root).forEach((row, i) => {
        gsap.to({}, { scrollTrigger: { trigger: row, start: "top 55%", end: "bottom 55%", onEnter: () => setActive(i), onEnterBack: () => setActive(i) } });
      });
    }, root);
    return () => ctx.revert();
  }, []);
  return (
    <section ref={ref} className="biz-made" data-label="Made">
      <Container>
        <div className="biz-made-head">
          <h2 className="biz-made-h">
            <span className="type-counter-xl biz-made-lead">{BUSINESS.made.headline.first}</span>
            <span className="type-display-xl">{BUSINESS.made.headline.second}</span>
          </h2>
          <p className="type-body biz-made-p">{BUSINESS.made.paragraph}</p>
        </div>
        <div className="biz-made-grid">
          <div className="biz-made-col">
            <div className="biz-made-sticky">
              {BUSINESS.made.rows.map((r, i) => (
                <Image key={r.image.src} src={r.image.src} alt={r.image.alt} width={r.image.width} height={r.image.height} sizes="(max-width: 1023px) 100vw, 45vw" className="biz-made-img" data-active={i === active || undefined} />
              ))}
            </div>
          </div>
          <ol className="biz-made-rows">
            {BUSINESS.made.rows.map((r, i) => (
              <li key={r.title} className="biz-made-row" data-active={i === active || undefined}>
                <span className="biz-made-no">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="biz-made-title">{r.title}</h3>
                <p className="type-body">{r.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}

/* 7 — Collaborations ------------------------------------------------------ */
export function BizCollabs() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root || motionOff()) return;
    initScroll();
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".biz-case", root).forEach((card, i) => {
        const img = card.querySelector("img");
        gsap.fromTo(card, { clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0% 0)", duration: 1.2, ease: "expo.out", scrollTrigger: { trigger: card, start: "top 85%", once: true } });
        if (img) gsap.fromTo(img, { yPercent: i % 2 ? -12 : -4 }, { yPercent: i % 2 ? 4 : 12, ease: "none", scrollTrigger: { trigger: card, start: "top bottom", end: "bottom top", scrub: true } });
      });
    }, root);
    return () => ctx.revert();
  }, []);
  return (
    <section ref={ref} className="biz-collabs" data-label="Collaborations">
      <Container>
        <div className="biz-offer-head">
          <h2 className="biz-h2">{BUSINESS.collabs.title}</h2>
          <p className="biz-note" role="note">{BUSINESS.collabs.note}</p>
        </div>
        <ol className="biz-cases">
          {BUSINESS.collabs.items.map((c, i) => (
            <li key={c.id} className="biz-case">
              <div className="biz-case-media">
                <Image src={c.image.src} alt={c.image.alt} width={c.image.width} height={c.image.height} sizes="(max-width: 1023px) 100vw, 60vw" />
              </div>
              <div className="biz-case-body">
                <p className="biz-case-meta"><span>( Collaboration {String(i + 1).padStart(2, "0")} )</span><span>Elixir</span></p>
                <h3 className="biz-case-brand">{c.brand ?? "[CONFIRM] Brand"}</h3>
                <p className="type-body biz-case-copy">{c.copy ?? "[CONFIRM] Two or three sentences on what Elixir built, with the brand's permission."}</p>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
