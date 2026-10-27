"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { SplitText } from "gsap/SplitText";
import { ABOUT } from "@/data/about";
import { gsap, initScroll, prefersReducedMotion } from "@/lib/scroll";

/**
 * /about: a note from the founder, read as a letter.
 *
 * Wide screens: the section pins for about three screens and the scroll
 * reads the letter. The portrait opens out of a slit at its centre and
 * settles from a slow zoom; the opening line rises letter by letter; each
 * paragraph's words light in turn, as if read aloud; the closing line
 * follows in italic, then the signature rises out of its mask and a rule
 * draws under it.
 *
 * Phones and tablets: no pin. The portrait opens as it arrives and each
 * paragraph lights as it crosses the screen.
 *
 * Reduced motion: everything at rest. RevealAll keeps off (data-no-reveal).
 * The pinned element sits in a .pin-host so React can unmount it cleanly.
 */
export function FounderNote() {
  const ref = useRef<HTMLElement>(null);
  const f = ABOUT.founder;

  useEffect(() => {
    const root = ref.current;
    if (!root || prefersReducedMotion()) return;
    initScroll();
    gsap.registerPlugin(SplitText);
    const q = gsap.utils.selector(root);
    const splits: SplitText[] = [];
    const words = (el: Element) => {
      const s = SplitText.create(el, { type: "words" });
      splits.push(s);
      return s.words;
    };
    const chars = (el: Element) => {
      const s = SplitText.create(el, { type: "words,chars", mask: "chars" });
      splits.push(s);
      return s.chars;
    };

    const opening = chars(q(".fn-opening")[0]);
    const paras = q(".fn-para").map((p) => words(p));
    const closing = words(q(".fn-closing")[0]);

    const mm = gsap.matchMedia(root);
    mm.add({ desktop: "(min-width: 1024px)", mobile: "(max-width: 1023px)" }, (ctx) => {
      const { desktop } = ctx.conditions as { desktop: boolean };

      if (desktop) {
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: q(".fn-stage")[0],
            start: "top top",
            end: () => `+=${window.innerHeight * 3}`,
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        });
        tl.fromTo(q(".fn-portrait"), { clipPath: "inset(50% 0% 50% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.2, ease: "power2.inOut" }, 0)
          .fromTo(q(".fn-portrait img"), { scale: 1.3 }, { scale: 1.02, duration: 6 }, 0)
          .fromTo(q(".fn-glow"), { opacity: 0 }, { opacity: 1, duration: 1.5 }, 0.4)
          .fromTo(q(".fn-eyebrow"), { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.4 }, 0.5)
          .fromTo(opening, { yPercent: 110 }, { yPercent: 0, duration: 0.8, stagger: 0.025, ease: "power3.out" }, 0.7);
        // The letter, read word by word.
        let at = 1.8;
        paras.forEach((w) => {
          tl.fromTo(w, { opacity: 0.12 }, { opacity: 1, duration: 0.9, stagger: 0.9 / w.length }, at);
          at += 1;
        });
        tl.fromTo(closing, { opacity: 0.12 }, { opacity: 1, duration: 0.6, stagger: 0.6 / closing.length }, at)
          .fromTo(q(".fn-name-inner"), { yPercent: 110 }, { yPercent: 0, duration: 0.6, ease: "power3.out" }, at + 0.7)
          .fromTo(q(".fn-rule"), { scaleX: 0 }, { scaleX: 1, duration: 0.6, ease: "power2.inOut" }, at + 0.9)
          .fromTo(q(".fn-role"), { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.4 }, at + 1.1)
          .to({}, { duration: 0.6 });
      } else {
        gsap.timeline({ scrollTrigger: { trigger: q(".fn-portrait")[0], start: "top 85%", end: "bottom 40%", scrub: 0.6 } })
          .fromTo(q(".fn-portrait"), { clipPath: "inset(30% 0% 30% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", ease: "power2.out" }, 0)
          .fromTo(q(".fn-portrait img"), { scale: 1.25 }, { scale: 1, ease: "none" }, 0);
        gsap.fromTo(opening, { yPercent: 110 }, {
          yPercent: 0, stagger: 0.02, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: q(".fn-opening")[0], start: "top 85%", toggleActions: "play none none reverse" },
        });
        [...paras, closing].forEach((w) => {
          gsap.fromTo(w, { opacity: 0.12 }, {
            opacity: 1, stagger: 0.05, ease: "none",
            scrollTrigger: { trigger: w[0]?.parentElement, start: "top 80%", end: "bottom 55%", scrub: true },
          });
        });
        gsap.timeline({ scrollTrigger: { trigger: q(".fn-sign")[0], start: "top 90%", toggleActions: "play none none reverse" } })
          .fromTo(q(".fn-name-inner"), { yPercent: 110 }, { yPercent: 0, duration: 0.8, ease: "power3.out" })
          .fromTo(q(".fn-rule"), { scaleX: 0 }, { scaleX: 1, duration: 0.7, ease: "power2.inOut" }, 0.2)
          .fromTo(q(".fn-role"), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.5 }, 0.4);
      }
    });

    return () => {
      mm.revert();
      splits.forEach((s) => s.revert());
    };
  }, []);

  return (
    <section ref={ref} className="fn on-ash" data-label="Founder" aria-labelledby="fn-title" data-no-reveal>
      <div className="pin-host">
        <div className="fn-stage">
          <span className="fn-glow" aria-hidden />
          <figure className="fn-portrait">
            <Image src={f.image.src} alt={f.image.alt} width={f.image.width} height={f.image.height} sizes="(max-width: 1023px) 100vw, 42vw" />
          </figure>
          <div className="fn-letter">
            <p className="fn-eyebrow">{f.eyebrow}</p>
            <h2 id="fn-title" className="fn-opening">{f.opening}</h2>
            <div className="fn-body">
              {f.paragraphs.map((p) => (
                <p key={p} className="fn-para">{p}</p>
              ))}
              <p className="fn-closing">{f.closing}</p>
            </div>
            <div className="fn-sign">
              <p className="fn-name">
                <span className="fn-name-inner">{f.name}</span>
              </p>
              <span className="fn-rule" aria-hidden />
              <p className="fn-role">{f.role}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
