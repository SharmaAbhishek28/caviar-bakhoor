"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Container, Eyebrow } from "@/components/ui";
import type { Policy } from "@/data/policies";
import { POLICIES } from "@/data/policies";
import { gsap, initScroll, prefersReducedMotion } from "@/lib/scroll";

/**
 * One layout for the four policy pages. Left, a sticky index of the
 * sections whose current item is underlined as you read; right, the
 * sections themselves. On load the title rises out of its mask and the
 * index lines stagger in; on scroll a thin progress line at the top of the
 * page fills, and each section's hairline draws across as it enters.
 *
 * A null body renders the [CONFIRM] marker — the client's text is not
 * drafted here.
 */
export function PolicyPage({ policy }: { policy: Policy }) {
  const ref = useRef<HTMLElement>(null);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const root = ref.current;
    if (!root || prefersReducedMotion()) return;
    initScroll();
    const ctx = gsap.context(() => {
      gsap.timeline({ defaults: { ease: "expo.out" } })
        .from(".pol-eyebrow", { opacity: 0, y: 10, duration: 0.7 })
        .from(".pol-title-inner", { yPercent: 110, duration: 1.1 }, "-=0.4")
        .from(".pol-lede", { opacity: 0, y: 12, duration: 0.8 }, "-=0.6")
        .from(".pol-index li", { opacity: 0, x: -12, duration: 0.6, stagger: 0.06 }, "-=0.6");

      gsap.fromTo(".pol-progress", { scaleX: 0 }, { scaleX: 1, ease: "none", scrollTrigger: { trigger: root, start: "top top", end: "bottom bottom", scrub: true } });

      gsap.utils.toArray<HTMLElement>(".pol-section", root).forEach((sec, i) => {
        gsap.fromTo(sec.querySelector(".pol-rule"), { scaleX: 0 }, { scaleX: 1, duration: 1, ease: "expo.out", scrollTrigger: { trigger: sec, start: "top 85%", once: true } });
        gsap.from(sec.querySelector(".pol-section-body"), { opacity: 0, y: 16, duration: 0.8, ease: "expo.out", scrollTrigger: { trigger: sec, start: "top 85%", once: true } });
        gsap.to({}, { scrollTrigger: { trigger: sec, start: "top 40%", end: "bottom 40%", onEnter: () => setCurrent(i), onEnterBack: () => setCurrent(i) } });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <article ref={ref} className="pol" data-label={policy.title}>
      <span className="pol-progress" aria-hidden />
      <Container>
        <header className="pol-head">
          <div className="pol-eyebrow"><Eyebrow>Policies</Eyebrow></div>
          <h1 className="pol-title"><span className="pol-title-inner">{policy.title}</span></h1>
          <p className="pol-lede" role="note">{policy.lede}</p>
          <p className="pol-updated">{policy.updated ? `Last updated ${policy.updated}` : "Last updated [CONFIRM]"}</p>
        </header>

        <div className="pol-grid">
          <nav className="pol-index" aria-label="On this page">
            <ol>
              {policy.sections.map((s, i) => (
                <li key={s.heading} data-current={i === current || undefined}>
                  <a href={`#${slug(s.heading)}`}>{s.heading}</a>
                </li>
              ))}
            </ol>
            <ul className="pol-others">
              {POLICIES.filter((p) => p.slug !== policy.slug).map((p) => (
                <li key={p.slug}><Link href={`/${p.slug}`}>{p.title}</Link></li>
              ))}
            </ul>
          </nav>

          <div className="pol-body">
            {policy.sections.map((s, i) => (
              <section key={s.heading} id={slug(s.heading)} className="pol-section">
                <span className="pol-rule" aria-hidden />
                <h2 className="pol-section-title"><span className="pol-section-no">{String(i + 1).padStart(2, "0")}</span>{s.heading}</h2>
                <div className="pol-section-body">
                  {s.body ? s.body.map((p) => <p key={p} className="type-body">{p}</p>) : (
                    <p className="type-body pol-confirm">[CONFIRM] Text for this section is the client&rsquo;s to supply.</p>
                  )}
                </div>
              </section>
            ))}
          </div>
        </div>
      </Container>
    </article>
  );
}

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
