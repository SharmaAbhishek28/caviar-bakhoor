"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { Container } from "@/components/ui";
import { gsap, prefersReducedMotion } from "@/lib/scroll";

/**
 * The 404. The two zeros are pearls — the design system's hero form — that
 * drop in, settle with a bounce, then drift on their own; the 4s rise out
 * of masks; the pearls lean toward the cursor. Under reduced motion
 * everything simply sits.
 */
export function NotFoundStage() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.timeline({ defaults: { ease: "expo.out" } })
        .from(".nf-four", { yPercent: 110, duration: 1.1, stagger: 0.15 })
        .from(".nf-pearl", { y: -240, scale: 0.6, duration: 1.2, ease: "bounce.out", stagger: 0.12 }, "-=0.7")
        .from(".nf-copy > *", { opacity: 0, y: 14, duration: 0.8, stagger: 0.08 }, "-=0.5");

      // Idle drift, each pearl on its own rhythm.
      gsap.utils.toArray<HTMLElement>(".nf-pearl", root).forEach((p, i) => {
        gsap.to(p, { y: i ? -10 : 10, duration: 2.4 + i * 0.6, ease: "sine.inOut", yoyo: true, repeat: -1, delay: 1.5 });
      });

      // Lean toward the cursor.
      const lean = gsap.utils.toArray<HTMLElement>(".nf-pearl", root).map((p) => ({
        x: gsap.quickTo(p, "x", { duration: 0.6, ease: "power3.out" }),
        y: gsap.quickTo(p, "y", { duration: 0.6, ease: "power3.out" }),
      }));
      const onMove = (e: MouseEvent) => {
        const dx = (e.clientX / window.innerWidth - 0.5) * 24;
        const dy = (e.clientY / window.innerHeight - 0.5) * 24;
        lean.forEach((l, i) => { l.x(dx * (i ? 1.4 : 1)); l.y(dy * (i ? 1.4 : 1)); });
      };
      window.addEventListener("mousemove", onMove);
      return () => window.removeEventListener("mousemove", onMove);
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="nf" data-label="404">
      <Container>
        <div className="nf-figure" aria-label="404" role="img">
          <span className="nf-mask"><span className="nf-four">4</span></span>
          <span className="nf-pearl" aria-hidden />
          <span className="nf-mask"><span className="nf-four">4</span></span>
        </div>
        <div className="nf-copy">
          <h1 className="nf-title">Nothing here.</h1>
          <p className="type-body nf-lede">The page you&rsquo;re after has drifted. Try the collection, the ritual, or start again.</p>
          <div className="nf-actions">
            <Link href="/" className="cta-button"><span>Home</span><span aria-hidden className="cta-arrow">↗</span></Link>
            <Link href="/collection" className="cta-button cta-button--ghost"><span>The collection</span><span aria-hidden className="cta-arrow">↗</span></Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
