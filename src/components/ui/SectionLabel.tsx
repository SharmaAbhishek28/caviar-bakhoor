"use client";

import { useEffect, useRef, useState } from "react";

/**
 * ONE label rail for the whole page, not one per section.
 *
 * Two chevrons sit fixed at the viewport edges and never move. Only the word
 * between them changes: as a new section takes over, the outgoing word slides
 * up and out while the incoming word slides up into its place. The chevrons
 * are static through the whole exchange.
 *
 * Which section owns the rail is decided by an IntersectionObserver watching
 * every `[data-label]` on the page — whichever is nearest the viewport centre
 * wins, so the handover happens once, cleanly, at the boundary.
 *
 * Desktop only, and nothing is shown until a section actually claims it.
 */
export function SectionLabel() {
  const [label, setLabel] = useState("");
  const [phase, setPhase] = useState<"in" | "out">("in");
  const pending = useRef<string>("");

  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-label]"),
    );
    if (!sections.length) return;

    const pick = () => {
      const mid = window.innerHeight / 2;
      let best: { el: HTMLElement; dist: number } | null = null;

      for (const el of sections) {
        const r = el.getBoundingClientRect();
        // Only sections actually crossing the viewport centre are candidates.
        if (r.top > mid || r.bottom < mid) continue;
        const dist = Math.abs(r.top + r.height / 2 - mid);
        if (!best || dist < best.dist) best = { el, dist };
      }

      const next = best?.el.dataset.label ?? "";
      if (next === pending.current) return;
      pending.current = next;

      // Slide the old word out, swap the text, slide the new one in.
      setPhase("out");
      window.setTimeout(() => {
        setLabel(next);
        setPhase("in");
      }, 260);
    };

    pick();
    window.addEventListener("scroll", pick, { passive: true });
    window.addEventListener("resize", pick);
    return () => {
      window.removeEventListener("scroll", pick);
      window.removeEventListener("resize", pick);
    };
  }, []);

  const side: React.CSSProperties = {
    position: "fixed",
    top: "50vh",
    transform: "translateY(-50%)",
    zIndex: 40,
    fontFamily: "var(--font-switzer-stack)",
    fontWeight: 500,
    fontSize: "clamp(0.9375rem, 1.05vw, 1.125rem)",
    letterSpacing: "0.1em",
    lineHeight: 1,
    textTransform: "uppercase",
    color: "var(--ink)",
    whiteSpace: "nowrap",
    pointerEvents: "none",
    display: "inline-flex",
    alignItems: "center",
    gap: "0.4em",
    /* The rail as a whole fades only when there is nothing to show. */
    opacity: label ? 1 : 0,
    transition: "opacity 400ms var(--ease)",
  };

  /* The word slides; the chevron does not. */
  const word = (
    <span className="section-label-word" data-phase={phase}>
      {label}
    </span>
  );

  return (
    <div aria-hidden className="section-label-rail">
      <span style={{ ...side, left: "1.25rem" }}>
        <span style={{ lineHeight: 1 }}>›</span>
        <span className="section-label-clip">{word}</span>
      </span>
      <span style={{ ...side, right: "1.25rem" }}>
        <span className="section-label-clip">{word}</span>
        <span style={{ lineHeight: 1 }}>‹</span>
      </span>
    </div>
  );
}
