"use client";

import Link from "next/link";
import { useEffect } from "react";
import { MENU_NAV } from "@/data/nav";

/**
 * The slide-in menu: an inset floating card, not a full-height drawer. It
 * slides in from the right over 420ms expo-out, detached from all four edges
 * with the page visible around it. The page behind dims to 40%.
 *
 * The inset shape comes from the reference capture; docs/homepage.md describes
 * a flush 420px drawer, and homepage.md's own rule is that the capture wins on
 * behaviour. The 40% dim is kept from the written spec.
 *
 * Full-width (still inset) below the mobile break.
 *
 * Rendered always (not conditionally) so the panel can transition out as well
 * as in; `inert` and visibility keep it out of the tab order when closed.
 */
export function Menu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  // Lock the page behind the panel, and close on Escape.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <>
      {/* Scrim — dims the page to 40% without hiding it. */}
      <div
        onClick={onClose}
        aria-hidden
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 80,
          background: "var(--ink)",
          opacity: open ? 0.4 : 0,
          pointerEvents: open ? "auto" : "none",
          transition: "opacity var(--dur-menu) var(--ease)",
        }}
      />

      <div
        id="site-menu"
        className="menu-panel"
        data-open={open ? "true" : "false"}
        aria-hidden={!open}
        /* React 19 takes a real boolean here. An empty string reads as false,
           which would leave the closed panel focusable. */
        inert={!open}
        style={{
          position: "fixed",
          /* An inset card anchored to the bottom-right corner, with an equal
             margin from the right and bottom edges. */
          right: "var(--menu-inset)",
          bottom: "var(--menu-inset)",
          zIndex: 90,
          width: "var(--menu-width)",
          maxWidth: "calc(100vw - var(--menu-inset) * 2)",
          background: "var(--paper)",
          border: "1px solid var(--ink)",
          /* Lifts the card off the page, weighted downward. */
          boxShadow: "0 24px 48px -12px rgb(16 16 18 / 0.28)",
          transform: open
            ? "translateX(0)"
            : "translateX(calc(100% + var(--menu-inset) + 4rem))",
          transition: "transform var(--dur-menu) var(--ease)",
          display: "flex",
          flexDirection: "column",
          boxSizing: "border-box",
          paddingInline: "clamp(1.5rem, 2.5vw, 2.5rem)",
          paddingBlock: "clamp(1rem, 2vh, 1.5rem)",
        }}
      >
        <div className="flex justify-end">
          {/* Two spans rather than a ✕ glyph, so the stroke weight is ours to
              set and the whole mark can rotate as one. */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="menu-close"
          >
            <span aria-hidden />
            <span aria-hidden />
          </button>
        </div>

        <nav
          aria-label="Primary"
          className="flex flex-1 flex-col items-center justify-center"
          style={{ paddingBlock: "clamp(3.5rem, 9vh, 7rem)" }}
        >
          <ul className="flex flex-col items-center gap-3 text-center">
            {MENU_NAV.map((item, i) => (
              <li
                key={item.href}
                className="menu-item"
                style={{ "--i": i } as React.CSSProperties}
              >
                {/* Styled by class, not inline: the hover bar has to win over
                    the resting colour, and no :hover rule beats an inline style. */}
                <Link href={item.href} onClick={onClose} className="menu-link">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}
