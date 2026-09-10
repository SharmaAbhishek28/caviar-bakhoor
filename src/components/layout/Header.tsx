"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Menu } from "./Menu";

/**
 * Fixed header. Wordmark top-left; top-right a 44px rounded-square hamburger
 * on --paper at 90%, then BAG (n) in meta caps. No inline nav — everything
 * lives behind the hamburger.
 *
 * The open state lives here rather than in Menu so the panel and the header
 * button stay in sync without the panel re-rendering the header.
 *
 * Hides on scroll down, returns on scroll up. The direction is read from a
 * ref rather than state so the listener itself never triggers a render — only
 * a genuine change of direction does.
 */
export function Header({ cartCount = 0 }: { cartCount?: number }) {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    lastY.current = window.scrollY;
    let frame = 0;

    const read = () => {
      frame = 0;
      const y = window.scrollY;
      const delta = y - lastY.current;

      // Ignore sub-pixel jitter and rubber-band scroll past the top.
      if (Math.abs(delta) < 6 || y < 0) return;

      // Always visible at the very top, whichever way the last move went.
      if (y < 80) setHidden(false);
      else setHidden(delta > 0);

      lastY.current = y;
    };

    const onScroll = () => {
      // Coalesce to one read per frame; scroll fires far more often than that.
      if (!frame) frame = requestAnimationFrame(read);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  // The menu is anchored to the viewport, so the header must not slide away
  // while it is open and leave the close control unreachable.
  const isHidden = hidden && !open;

  return (
    <>
      <header
        data-hidden={isHidden ? "true" : "false"}
        style={{
          position: "fixed",
          insetInline: 0,
          top: 0,
          zIndex: 70,
          pointerEvents: "none",
          transform: isHidden ? "translateY(-100%)" : "translateY(0)",
          transition: "transform var(--dur-nav) var(--ease)",
        }}
      >
        {/* The header spans 90% of the viewport at every size, so it is wider
            than the content column and reads as its own band. */}
        <div
          className="mx-auto flex items-center justify-between"
          style={{
            width: "var(--nav-width)",
            paddingBlock: "1rem",
            boxSizing: "border-box",
          }}
        >
          <Link
            href="/"
            aria-label="Elixir Signature Scents — home"
            style={{ pointerEvents: "auto", display: "block", lineHeight: 0 }}
          >
            <Image
              src="/images/Frame_90.avif"
              alt="Elixir Signature Scents"
              width={270}
              height={94}
              priority
              style={{ width: "clamp(108px, 9vw, 148px)", height: "auto" }}
            />
          </Link>

          <div
            className="flex items-center gap-4"
            style={{ pointerEvents: "auto" }}
          >
            <span
              className="type-meta"
              style={{ color: "var(--ink)" }}
              aria-label={`Bag, ${cartCount} item${cartCount === 1 ? "" : "s"}`}
            >
              Bag ({cartCount})
            </span>

            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-expanded={open}
              aria-controls="site-menu"
              className="hamburger"
            >
              <span className="sr-only">Open menu</span>
              <span aria-hidden />
              <span aria-hidden />
            </button>
          </div>
        </div>
      </header>

      <Menu open={open} onClose={() => setOpen(false)} />
    </>
  );
}
