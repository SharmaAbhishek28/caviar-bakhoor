"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { SplitText } from "gsap/SplitText";
import { ABOUT } from "@/data/about";
import { gsap, initScroll, prefersReducedMotion } from "@/lib/scroll";

/**
 * /about: the founder's note, second design (for comparison with
 * FounderNote): played like a film rather than laid out as a letter.
 *
 * Wide screens: pinned for five screens. The portrait fills the right of
 * the frame at full height, fading into the dark on its left, and slowly
 * brightens and pushes in. The note plays as subtitles: one sentence at a
 * time, each word sharpening out of a blur while the one before drifts up
 * and dissolves; a counter keeps place. It ends on the closing line, the
 * name and the role.
 *
 * Phones: no pin. The portrait, then each sentence sharpening as it
 * arrives. Reduced motion: all sentences shown, still.
 */
export function FounderFilm() {
  const ref = useRef<HTMLElement>(null);
  const f = ABOUT.founder;
  const lines = [f.opening, ...f.paragraphs, f.closing];

  useEffect(() => {
    const root = ref.current;
    if (!root || prefersReducedMotion()) return;
    initScroll();
    gsap.registerPlugin(SplitText);
    const q = gsap.utils.selector(root);
    const splits: SplitText[] = [];
    const words = q(".ff-line").map((el) => {
      const s = SplitText.create(el, { type: "words" });
      splits.push(s);
      return s.words;
    });

    const mm = gsap.matchMedia(root);
    mm.add({ desktop: "(min-width: 1024px)", mobile: "(max-width: 1023px)" }, (ctx) => {
      const { desktop } = ctx.conditions as { desktop: boolean };
      if (desktop) {
        const n = lines.length;
        gsap.set(q(".ff-line"), { autoAlpha: 0 });
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: q(".ff-stage")[0],
            start: "top top",
            end: () => `+=${window.innerHeight * 5}`,
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
            onUpdate: (st) => {
              const el = root.querySelector(".ff-count-now");
              if (el) el.textContent = String(Math.min(n, 1 + Math.floor(st.progress * n * 0.999))).padStart(2, "0");
            },
          },
        });
        tl.fromTo(q(".ff-portrait img"), { scale: 1.18, filter: "brightness(0.65)" }, { scale: 1, filter: "brightness(1)", duration: n * 1.2 }, 0)
          .fromTo(q(".ff-eyebrow, .ff-count"), { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.4 }, 0)
          .fromTo(q(".ff-progress-fill"), { scaleY: 0 }, { scaleY: 1, duration: n * 1.2 }, 0);
        words.forEach((w, i) => {
          const at = i * 1.2;
          const line = q(".ff-line")[i];
          tl.set(line, { autoAlpha: 1 }, at)
            .fromTo(w, { opacity: 0, filter: "blur(10px)", y: 14 }, { opacity: 1, filter: "blur(0px)", y: 0, duration: 0.6, stagger: 0.5 / w.length }, at);
          if (i < n - 1) tl.to(line, { autoAlpha: 0, y: -40, filter: "blur(6px)", duration: 0.35 }, at + 0.95);
        });
        tl.fromTo(q(".ff-sign"), { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.4 }, (n - 1) * 1.2 + 0.5)
          .fromTo(q(".ff-rule"), { scaleX: 0 }, { scaleX: 1, duration: 0.4 }, (n - 1) * 1.2 + 0.6);
      } else {
        gsap.fromTo(q(".ff-portrait img"), { scale: 1.15 }, {
          scale: 1, ease: "none",
          scrollTrigger: { trigger: q(".ff-portrait")[0], start: "top bottom", end: "bottom top", scrub: true },
        });
        words.forEach((w, i) => {
          gsap.fromTo(w, { opacity: 0.08, filter: "blur(6px)" }, {
            opacity: 1, filter: "blur(0px)", stagger: 0.04, ease: "none",
            scrollTrigger: { trigger: q(".ff-line")[i], start: "top 85%", end: "bottom 60%", scrub: true },
          });
        });
      }
    });
    return () => {
      mm.revert();
      splits.forEach((s) => s.revert());
    };
  }, [lines.length]);

  return (
    <section ref={ref} className="ff on-ash" data-label="Founder" aria-label="A note from the founder, second design" data-no-reveal>
      <div className="pin-host">
        <div className="ff-stage">
          <figure className="ff-portrait">
            <Image src={f.image.src} alt={f.image.alt} width={f.image.width} height={f.image.height} sizes="(max-width: 1023px) 100vw, 60vw" />
          </figure>
          <span className="ff-shade" aria-hidden />
          <div className="ff-copy">
            <p className="ff-eyebrow">{f.eyebrow}</p>
            <div className="ff-lines">
              {lines.map((l, i) => (
                <p key={l} className={`ff-line${i === 0 ? " ff-line--first" : ""}${i === lines.length - 1 ? " ff-line--last" : ""}`}>
                  {l}
                </p>
              ))}
            </div>
            <div className="ff-sign">
              <span className="ff-rule" aria-hidden />
              <span className="ff-name">{f.name}</span>
              <span className="ff-role">{f.role}</span>
            </div>
          </div>
          <div className="ff-count" aria-hidden>
            <span className="ff-count-now">01</span> / {String(lines.length).padStart(2, "0")}
            <span className="ff-progress">
              <span className="ff-progress-fill" />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
