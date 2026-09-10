"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { MarkedProse } from "@/components/ui";
import { gsap, initScroll } from "@/lib/scroll";
import type { ProjectCard } from "@/data/projects";
import { WHEEL_MARQUEE } from "@/data/projects";

/**
 * Desktop — the wheel: four cards at 12, 3, 6 and 9 o'clock on one circle.
 * Only the 12 o'clock card is visible at rest. As the page scrolls the circle
 * turns anticlockwise: the front card swings down and out to 9 o'clock while
 * the card at 3 o'clock rises into its place. Cards stay upright throughout,
 * like cabins on a ferris wheel — the brief's diagram shows them axis-aligned.
 *
 * Phone and tablet (below 1024px) — the track: the same four cards in one
 * row, left-aligned at the gutter, and vertical scroll slides the row right
 * to left, one card at a time, until the fourth has been seen and the pin
 * releases. There is no marquee and no arc at those widths.
 *
 * Both share one pin and one scrub. The wheel adds a dwell (turnFor) so a
 * card holds the front for half a step before the next one arrives; the
 * track is linear and 1:1 with scroll, because on touch a held card reads as
 * nothing happening.
 *
 * HOW THE WHEEL GEOMETRY IS DONE — and why it is not nested rotations. Three
 * earlier versions rotated the container and counter-rotated the cards.
 * Measured, every one pushed cards hundreds of pixels off an edge: a rotation
 * about a pivot far below the card is mostly translation, and nothing cancels
 * it. Here each card's position is computed directly — x = R·cosθ, y = R·sinθ
 * — every frame from a single progress value. There is no nesting to go
 * wrong, the arc is exactly the arc intended, and the container clips
 * anything that swings outside it.
 *
 * Under prefers-reduced-motion there is no pin, no wheel and no track: the
 * cards render as a plain vertical list at every width.
 */

/** Degrees between adjacent cards: 12, 3, 6 and 9 o'clock. */
const STEP = 90;
/** Card half-height incl. meta, paragraph and button, used to size the circle. */
const CARD_HALF_H = 360;
/** Extra clearance below the viewport before the next card can appear. */
const CLEARANCE = 180;
/** Fraction of each step the front card holds still before the move. */
const DWELL = 0.5;
/** Hold on the last card, in steps, before the pin releases. */
const TAIL = 0.5;
/** Viewports of scroll per wheel step. Above 1 slows the sweep: each step is
    a 1555px quarter-arc, and at one viewport per step the move half of it ran
    at 3.5x scroll speed — fast enough that any dropped frame read as a jump. */
const SCROLL_PER_STEP = 1.3;

const FRONT = -90; // top of the circle, in screen-space degrees

/**
 * Maps scroll progress to whole steps with a dwell. Each step is split in two:
 * for the first DWELL of it the front card holds still, for the rest the
 * cards move (eased, so they settle rather than stop dead). TAIL adds a hold
 * on the last card before the pin ends.
 */
function turnFor(p: number, steps: number): number {
  const u = p * (steps + TAIL);
  const k = Math.floor(u);
  if (k >= steps) return steps;
  const f = u - k;
  const t = Math.max(0, (f - DWELL) / (1 - DWELL));
  const eased = t * t * (3 - 2 * t); // smoothstep
  return k + eased;
}

export function ProjectWheel({ items }: { items: ProjectCard[] }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const wheelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const wheel = wheelRef.current;
    if (!root || !wheel) return;

    initScroll();

    /* gsap.matchMedia owns the breakpoint: it builds the right variant for
       the current width, reverts it and builds the other when the viewport
       crosses 1024px (a tablet rotating), and reverts everything on unmount.
       The reduced-motion condition is part of the same query so the CSS list
       layout and the absence of any ScrollTrigger always agree. */
    const mm = gsap.matchMedia(root);

    mm.add(
      {
        desktop: "(min-width: 1024px)",
        motionOk: "(prefers-reduced-motion: no-preference)",
      },
      (ctx) => {
        const { desktop, motionOk } = ctx.conditions as {
          desktop: boolean;
          motionOk: boolean;
        };
        if (!motionOk) return;

        const cards = gsap.utils.toArray<HTMLElement>(".wheel-card", wheel);
        if (cards.length < 2) return;

        const steps = cards.length - 1;
        const state = { progress: 0 };

        /* Both layouts are a pure function of one number, recomputed every
           scrub tick — which is what makes them impossible to drift. */
        /* Per-frame writes go through quickSetters: no tween bookkeeping, no
           style diffing, and only x and y ever change. Everything else about
           the card's transform is set once below. Measured before this: a
           full gsap.set of five properties per card per tick, writing a 2D
           matrix() with no compositor layer, dropped 35 of 240 frames. */
        const setX = cards.map((card) => gsap.quickSetter(card, "x", "px"));
        const setY = cards.map((card) => gsap.quickSetter(card, "y", "px"));

        const layoutWheel = () => {
          /* The radius is sized so 3, 6 and 9 o'clock all sit BELOW the
             viewport: R > half the viewport + half a card + clearance. Cards
             are then hidden by geometry alone and never need an opacity fade.
             A fade was tried first — with the marquee at full opacity, a
             half-transparent card let the giant word bleed through. */
          const R = window.innerHeight / 2 + CARD_HALF_H + CLEARANCE;
          const turn = turnFor(state.progress, steps) * STEP;

          cards.forEach((_, i) => {
            const theta = FRONT + i * STEP - turn; // degrees
            const rad = (theta * Math.PI) / 180;
            setX[i](R * Math.cos(rad));
            setY[i](R + R * Math.sin(rad)); // 0 at the crest
          });
        };

        /* One stride is a card plus the gap, read from the layout rather
           than assumed, so the CSS can change either without touching this. */
        const stride = () => cards[1].offsetLeft - cards[0].offsetLeft;

        const layoutTrack = () => {
          /* Linear, no dwell: on a phone the row answers the very first
             pixel of scroll, 1:1 — a held front card read as "not working"
             on touch. The desktop wheel keeps its dwell. */
          gsap.set(wheel, { x: -state.progress * steps * stride() });
        };

        const layout = desktop ? layoutWheel : layoutTrack;

        if (desktop) {
          /* Upright (ferris-wheel cabins, per the brief's diagram), opaque,
             and force3D so the transform is a compositor-only translate3d —
             the cards carry a photo and a paragraph, and a 2D translate
             repaints all of that every frame. No z-index: only the crest card
             is on screen, and mid-turn the leaving and arriving cards are on
             opposite sides of the circle, so they never overlap. */
          gsap.set(cards, {
            xPercent: -50,
            yPercent: -50,
            rotate: 0,
            opacity: 1,
            force3D: true,
          });
        } else {
          gsap.set(cards, { clearProps: "transform,opacity,zIndex" });
        }
        layout();

        gsap.to(state, {
          progress: 1,
          ease: "none",
          onUpdate: layout,
          scrollTrigger: {
            trigger: root,
            /* Desktop pins the full-height root at the top. Below 1024px the
               root is only as tall as the card, so it pins a header's height
               down: the header returns on an upward scroll and would otherwise
               sit over the card's meta line. */
            start: desktop ? "top top" : "top 88px",
            /* Desktop: a viewport of scroll per card plus the tail. Track: one
               stride of vertical scroll per stride of horizontal travel, so
               the row moves exactly as far as the thumb does. */
            end: () =>
              "+=" +
              (desktop
                ? window.innerHeight * SCROLL_PER_STEP * (steps + TAIL)
                : steps * stride()),
            pin: true,
            /* No snap: with scrub, snap made the wheel bistable and skipped
               the middle cards. Measured before removing it. Desktop scrubs
               with a short lag; the track is direct so touch feels 1:1. */
            scrub: desktop ? 0.6 : true,
            invalidateOnRefresh: true,
            onRefresh: layout,
          },
        });
      },
    );

    return () => mm.revert();
  }, [items.length]);

  return (
    <div ref={rootRef} className="wheel-root">
      {/* The giant word behind everything, running on its own clock. */}
      <div className="wheel-marquee" aria-hidden>
        <div className="wheel-marquee-track">
          {[0, 1].map((run) => (
            <span key={run} className="wheel-marquee-word">
              {WHEEL_MARQUEE}
              <span className="wheel-marquee-gap" />
            </span>
          ))}
        </div>
      </div>

      <div ref={wheelRef} className="wheel">
        {/* Position and opacity are set by GSAP in the effect above, never in
            markup or CSS — GSAP owns the `transform` property. */}
        {items.map((item) => (
          <article key={item.handle} className="wheel-card">
            {/* Index left, identity right — the reference's
                "( PROJECT NO. 141 )  ·  IDENTISCENTS / DUBAI" line. */}
            <div className="wheel-card-meta">
              <span>
                ({item.no} / {String(items.length).padStart(2, "0")})
              </span>
              <span>{item.meta}</span>
            </div>

            <Link
              href={`/products/${item.handle}`}
              aria-label={item.cta}
              className="wheel-card-figure"
            >
              <Image
                src={item.image.src}
                alt={item.image.alt}
                width={item.image.width}
                height={item.image.height}
                sizes="(max-width: 1023px) 100vw, 768px"
                style={{
                  display: "block",
                  width: "100%",
                  aspectRatio: "768 / 408",
                  objectFit: "cover",
                }}
              />
            </Link>

            {/* Keywords weighted; the perfumer's marker stripped for display
                and kept as data-confirm — see MarkedProse. */}
            <MarkedProse
              className="wheel-card-blurb"
              text={item.blurb}
              strong={item.keywords}
            />

            <Link href={`/products/${item.handle}`} className="cta-button wheel-card-cta">
              <span>{item.cta}</span>
              <span aria-hidden className="cta-arrow">
                ↗
              </span>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
