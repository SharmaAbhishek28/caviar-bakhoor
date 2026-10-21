"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { SplitText } from "gsap/SplitText";
import { Container, MarkedProse } from "@/components/ui";
import type { CaseStudy } from "@/data/collaborations";
import { gsap, initScroll, prefersReducedMotion } from "@/lib/scroll";

/**
 * Collaborations on /for-business: one case study per client, built from
 * whatever photography the project has.
 *
 *  Cover    dark, pinned: the photograph opens out of a pearl (circle clip)
 *           as the client's name rises letter by letter and the facts rule
 *           in. Always present.
 *  Story    the summary, its words lighting up with the scroll, beside a
 *           second photograph drifting in parallax. If `feature` is set.
 *  Variants each composition's lid rolls in from the side, spinning to
 *           rest, round like the pearl. If `variants` is set.
 *  Gallery  pinned; the scroll drives a track of white cards sideways, each
 *           image drifting inside its card, a counter and progress rule
 *           keeping place. Over twelve images it runs on two tracks in
 *           opposite directions. If `gallery` is set.
 *
 * Phones and tablets: no pins; the same parts reveal as they scroll in and
 * the gallery is a native swipe row. Reduced motion: everything at rest.
 * Each pinned element sits in a .pin-host so React can unmount it cleanly.
 */
export function CaseStudies({ projects }: { projects: CaseStudy[] }) {
  if (!projects.length) return null;
  return (
    <section className="cs" data-label="Collaborations" data-no-reveal>
      <Container>
        <header className="cs-head">
          <p className="cs-eyebrow">Collaborations</p>
          <h2 className="cs-headline">
            <span>Made for</span>
            <span className="cs-headline-italic">other houses.</span>
          </h2>
          <p className="cs-sub">Caviar Bakhoor, under their own name.</p>
        </header>
      </Container>
      {projects.map((p, i) => (
        <Project key={p.id} project={p} index={i} total={projects.length} />
      ))}
    </section>
  );
}

const pad = (n: number) => String(n).padStart(2, "0");

function Project({ project: p, index, total }: { project: CaseStudy; index: number; total: number }) {
  const ref = useRef<HTMLElement>(null);
  const [current, setCurrent] = useState(1);
  const gallery = p.gallery ?? [];
  const twoRows = gallery.length > 12;
  const rows = twoRows
    ? [gallery.filter((_, i) => i % 2 === 0), gallery.filter((_, i) => i % 2 === 1)]
    : gallery.length
      ? [gallery]
      : [];

  useEffect(() => {
    const root = ref.current;
    if (!root || prefersReducedMotion()) return;
    initScroll();
    gsap.registerPlugin(SplitText);
    const q = gsap.utils.selector(root);
    const splits: SplitText[] = [];

    const mm = gsap.matchMedia(root);
    mm.add({ desktop: "(min-width: 1024px)", mobile: "(max-width: 1023px)" }, (ctx) => {
      const { desktop } = ctx.conditions as { desktop: boolean };

      /* Cover */
      const cover = q(".cs-cover")[0];
      const coverTl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: desktop
          ? { trigger: cover, start: "top top", end: () => `+=${window.innerHeight * 1.1}`, pin: true, scrub: 0.6, invalidateOnRefresh: true }
          : { trigger: cover, start: "top 70%", toggleActions: "play none none reverse" },
      });
      coverTl
        .fromTo(q(".cs-cover-media"), { clipPath: "circle(6% at 50% 50%)" }, { clipPath: "circle(72% at 50% 50%)", duration: 1, ease: "power2.inOut" }, 0)
        .fromTo(q(".cs-cover-media img"), { scale: 1.45 }, { scale: 1, duration: 1, ease: "power2.out" }, 0)
        .fromTo(q(".cs-char"), { yPercent: 110 }, { yPercent: 0, duration: 0.6, stagger: 0.05, ease: "power3.out" }, 0.05)
        .fromTo(q(".cs-index, .cs-line"), { y: 24, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.4, stagger: 0.1 }, 0.3)
        .fromTo(q(".cs-fact"), { autoAlpha: 0, x: -20 }, { autoAlpha: 1, x: 0, duration: 0.4, stagger: 0.08 }, 0.45)
        .fromTo(q(".cs-fact-rule"), { scaleX: 0 }, { scaleX: 1, duration: 0.5, stagger: 0.08 }, 0.45);
      if (!desktop) coverTl.duration(1.6);

      /* Story */
      const para = q(".cs-summary")[0];
      if (para) {
        const split = SplitText.create(para, { type: "words" });
        splits.push(split);
        gsap.fromTo(split.words, { opacity: 0.12 }, {
          opacity: 1, stagger: 0.05, ease: "none",
          scrollTrigger: { trigger: para, start: "top 80%", end: "bottom 45%", scrub: true },
        });
        gsap.fromTo(q(".cs-feature img"), { yPercent: -12 }, {
          yPercent: 12, ease: "none",
          scrollTrigger: { trigger: q(".cs-feature")[0], start: "top bottom", end: "bottom top", scrub: true },
        });
        gsap.fromTo(q(".cs-feature"), { clipPath: "inset(18% 18% 18% 18%)" }, {
          clipPath: "inset(0% 0% 0% 0%)", ease: "power2.out",
          scrollTrigger: { trigger: q(".cs-feature")[0], start: "top 85%", end: "top 35%", scrub: 0.5 },
        });
      }

      /* Variants */
      q(".cs-variant").forEach((v, i) => {
        const dir = i % 2 === 0 ? -1 : 1;
        gsap.timeline({ scrollTrigger: { trigger: q(".cs-variants")[0], start: "top 85%", end: "center 55%", scrub: 0.6 } })
          .fromTo(v.querySelector(".cs-lid"), { xPercent: 140 * dir, rotate: 220 * dir }, { xPercent: 0, rotate: 0, ease: "power3.out" }, 0)
          .fromTo(v.querySelector(".cs-variant-name"), { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, ease: "power2.out" }, 0.4);
      });

      /* Gallery */
      const gal = q(".cs-gallery")[0];
      const tracks = q(".cs-track");
      if (gal && tracks.length && desktop) {
        const longest = () => Math.max(...tracks.map((t) => t.scrollWidth));
        const travel = () => Math.max(0, longest() - window.innerWidth);
        const slide = gsap.timeline({
          scrollTrigger: {
            trigger: gal, start: "top top", end: () => `+=${travel()}`, pin: true, scrub: 0.6, invalidateOnRefresh: true,
            onUpdate: (st) => setCurrent(Math.min(gallery.length, 1 + Math.floor(st.progress * gallery.length))),
          },
        });
        tracks.forEach((t, ti) => {
          const span = () => Math.max(0, t.scrollWidth - window.innerWidth);
          slide.fromTo(t, { x: () => (ti === 1 ? -span() : 0) }, { x: () => (ti === 1 ? 0 : -span()), ease: "none" }, 0);
        });
        slide.fromTo(q(".cs-progress-fill"), { scaleX: 0 }, { scaleX: 1, ease: "none" }, 0);
        q(".cs-card").forEach((card) => {
          gsap.fromTo(card.querySelector("img"), { xPercent: -8, scale: 1.15 }, {
            xPercent: 8, scale: 1.15, ease: "none",
            scrollTrigger: { trigger: card, containerAnimation: slide, start: "left right", end: "right left", scrub: true },
          });
        });
      } else if (gal) {
        gsap.fromTo(q(".cs-card"), { y: 40, autoAlpha: 0 }, {
          y: 0, autoAlpha: 1, stagger: 0.08, duration: 0.8, ease: "expo.out",
          scrollTrigger: { trigger: gal, start: "top 80%", toggleActions: "play none none reverse" },
        });
      }
    });

    return () => {
      mm.revert();
      splits.forEach((s) => s.revert());
    };
  }, [gallery.length]);

  return (
    <article ref={ref} className="cs-project" aria-label={`${p.client}, ${p.line}`}>
      {/* Cover */}
      <div className="pin-host">
        <div className="cs-cover on-ash">
          <div className="cs-cover-grid">
            <div className="cs-cover-text">
              <p className="cs-index">
                ( {pad(index + 1)} / {pad(total)} ) · {p.origin}
              </p>
              <h3 className={`cs-client${p.keepCase ? " cs-client--as-is" : ""}`} aria-label={p.client}>
                {Array.from(p.client).map((ch, i) => (
                  <span key={i} className="cs-char-mask" aria-hidden>
                    <span className="cs-char">{ch}</span>
                  </span>
                ))}
              </h3>
              <p className="cs-line">{p.line}</p>
              <dl className="cs-facts">
                {p.facts.map((f) => (
                  <div key={f.label} className="cs-fact">
                    <dt>{f.label}</dt>
                    <dd>{f.value}</dd>
                    <span className="cs-fact-rule" aria-hidden />
                  </div>
                ))}
              </dl>
            </div>
            <div className="cs-cover-media">
              <Image src={p.cover.src} alt={p.cover.alt} width={p.cover.width} height={p.cover.height} sizes="(max-width: 1023px) 100vw, 50vw" />
            </div>
          </div>
        </div>
      </div>

      {/* Story */}
      {p.feature ? (
        <Container>
          <div className="cs-story">
            <MarkedProse className="cs-summary" text={p.summary} strong={p.strong} />
            <div className="cs-feature">
              <Image src={p.feature.src} alt={p.feature.alt} width={p.feature.width} height={p.feature.height} sizes="(max-width: 1023px) 100vw, 40vw" />
            </div>
          </div>
        </Container>
      ) : (
        <Container>
          <div className="cs-story cs-story--solo">
            <MarkedProse className="cs-summary" text={p.summary} strong={p.strong} />
          </div>
        </Container>
      )}

      {/* Variants */}
      {p.variants?.length ? (
        <Container>
          <ul className="cs-variants">
            {p.variants.map((v) => (
              <li key={v.name} className="cs-variant">
                <div className={`cs-lid${v.show === "photo" ? " cs-lid--photo" : ""}`}>
                  <Image src={v.image.src} alt={v.image.alt} width={v.image.width} height={v.image.height} sizes="(max-width: 767px) 70vw, 30vw" />
                </div>
                <p className="cs-variant-name">
                  <span className="cs-swatch" style={{ background: v.color }} aria-hidden />
                  {v.name}
                </p>
              </li>
            ))}
          </ul>
        </Container>
      ) : null}

      {/* Gallery */}
      {rows.length ? (
        <div className="pin-host">
          <div className="cs-gallery">
            <div className="cs-gallery-head">
              <span>{p.line}</span>
              <span aria-live="polite">
                {pad(current)} / {pad(gallery.length)}
              </span>
            </div>
            <div className="cs-tracks">
              {rows.map((row, ri) => (
                <ul key={ri} className="cs-track">
                  {row.map((img) => (
                    <li key={img.src} className="cs-card">
                      <Image src={img.src} alt={img.alt} width={img.width} height={img.height} sizes="(max-width: 1023px) 75vw, 30vw" />
                    </li>
                  ))}
                </ul>
              ))}
            </div>
            <div className="cs-progress" aria-hidden>
              <span className="cs-progress-fill" />
            </div>
          </div>
        </div>
      ) : null}
    </article>
  );
}
