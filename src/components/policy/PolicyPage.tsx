"use client";

import { useEffect, useRef, useState } from "react";
import { Container, Eyebrow } from "@/components/ui";
import type { Policy, PolicyBlock } from "@/data/policies";
import { PUBLISHED_POLICIES } from "@/data/policies";
import { CAREER_FORM } from "@/data/career";
import { CareerForm } from "./CareerForm";
import { gsap, initScroll, prefersReducedMotion } from "@/lib/scroll";

/**
 * One layout for the four policy pages. Left, a sticky index of the
 * sections whose current item is underlined as you read; right, the
 * sections themselves. On load the title rises out of its mask and the
 * index lines stagger in; on scroll a thin progress line at the top of the
 * page fills, and each section's hairline draws across as it enters.
 *
 * A body is paragraphs, bullet lists and question-and-answer pairs (see
 * PolicyBlock); [text](url) inside any of them becomes a link.
 */
export function PolicyPage({ policy }: { policy: Policy }) {
  const sections = policy.sections.filter((s) => s.body && s.body.length > 0);
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
    <article ref={ref} className="pol" data-label={policy.label ?? "Policies"}>
      <span className="pol-progress" aria-hidden />
      <Container>
        <header className="pol-head">
          <div className="pol-eyebrow"><Eyebrow>{policy.eyebrow ?? "Policies"}</Eyebrow></div>
          <h1 className="pol-title"><span className="pol-title-inner">{policy.title}</span></h1>
          {policy.lede ? <p className="pol-lede"><Inline text={policy.lede} /></p> : null}
          {policy.updated ? <p className="pol-updated">Last updated {policy.updated}</p> : null}
        </header>

        <div className="pol-grid">
          <nav className="pol-index" aria-label="On this page">
            <ol>
              {sections.map((s, i) => (
                <li key={s.heading} data-current={i === current || undefined}>
                  <a href={`#${slug(s.heading)}`}>{s.heading}</a>
                </li>
              ))}
              {policy.form === "career" ? (
                <li>
                  <a href="#career-apply">{CAREER_FORM.heading}</a>
                </li>
              ) : null}
            </ol>
            <ul className="pol-others">
              {PUBLISHED_POLICIES.filter((p) => p.slug !== policy.slug).map((p) => (
                <li key={p.slug}><a href={`/${p.slug}`}>{p.title}</a></li>
              ))}
            </ul>
          </nav>

          <div className="pol-body">
            {sections.map((s, i) => (
              <section key={s.heading} id={slug(s.heading)} className="pol-section">
                <span className="pol-rule" aria-hidden />
                <h2 className="pol-section-title"><span className="pol-section-no">{String(i + 1).padStart(2, "0")}</span>{s.heading}</h2>
                <div className="pol-section-body">
                  {s.body?.map((b, j) => <Block key={j} block={b} />)}
                </div>
              </section>
            ))}
            {policy.form === "career" ? <CareerForm /> : null}
          </div>
        </div>
      </Container>
    </article>
  );
}

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

/** A paragraph, a bullet list, or a question with its answer. */
function Block({ block }: { block: PolicyBlock }) {
  if (typeof block === "string") return <p className="type-body"><Inline text={block} /></p>;
  if (Array.isArray(block)) {
    return (
      <ul className="pol-list">
        {block.map((item) => <li key={item} className="type-body"><Inline text={item} /></li>)}
      </ul>
    );
  }
  return (
    <div className="pol-qa">
      <h3 className="pol-q">{block.q}</h3>
      <p className="type-body"><Inline text={block.a} /></p>
    </div>
  );
}

/** Text with [label](url) links, as plain anchors; outside links open in a new tab. */
function Inline({ text }: { text: string }) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g);
  return (
    <>
      {parts.map((part, i) => {
        const m = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(part);
        if (!m) return part;
        const [, label, href] = m;
        const external = href.startsWith("http");
        return (
          <a key={i} href={href} {...(external ? { target: "_blank", rel: "noopener" } : {})}>
            {label}
          </a>
        );
      })}
    </>
  );
}
