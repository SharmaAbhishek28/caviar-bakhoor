import type { ReactNode } from "react";

/**
 * Sections 02–08. Each carries its own surface, a rising z-index and a 1px
 * --ink hairline on its top edge, so the boundary between consecutive sections
 * is always visible.
 *
 * NOT sticky. docs/homepage.md § Section stacking asks for
 * `position: sticky; top: 0`, but that assumes sections are about a viewport
 * tall. Ours run 1800–2500px against a 900px viewport, so sticky pinned each
 * section at the top for ~1900px of scrolling while the next one crawled over
 * it — a stall, not a transition. Measured before changing it.
 *
 * `stick` re-enables the spec's behaviour for any section that is short enough
 * to want it.
 *
 * `surface` sets the section's own background. Every stacking section needs
 * one — it paints over the section below as it rises, and a transparent
 * section would let the previous one show through.
 *
 *   paper   the page default
 *   raised  a half-step lighter, so consecutive light sections are
 *           distinguishable at the overlap without going dark
 *   ash     full-bleed dark, for photography sections
 *
 * `beneath` is the section 05 (Ritual) exception: it sits *under* the section
 * before it in z-order, so as 04 scrolls away 05 is revealed already in place
 * rather than sliding over. It is not sticky, and it draws no hairline —
 * nothing overlaps onto it.
 *
 * `label` renders the paired edge labels. Sections 01 and 08 have none.
 */
export function StackSection({
  children,
  index,
  label,
  beneath = false,
  stick = false,
  surface = "paper",
  className = "",
  style,
}: {
  children: ReactNode;
  /** Stacking order. Higher sits over lower. */
  index: number;
  /** Edge label text. Omit for sections with no label. */
  label?: string;
  /** Section 05 only: sit beneath the previous section instead of over it. */
  beneath?: boolean;
  /** Opt into `position: sticky`. Only for sections around a viewport tall. */
  stick?: boolean;
  /** The section's own background. */
  surface?: "paper" | "raised" | "ash";
  className?: string;
  style?: React.CSSProperties;
}) {
  const background =
    surface === "ash"
      ? "var(--ash)"
      : surface === "raised"
        ? "var(--paper-raised)"
        : "var(--paper)";

  return (
    <section
      data-label={label || undefined}
      className={`${surface === "ash" ? "on-ash " : ""}${className}`}
      style={{
        position: stick && !beneath ? "sticky" : "relative",
        top: stick && !beneath ? 0 : undefined,
        zIndex: beneath ? 0 : index,
        background,
        borderTop: beneath ? undefined : "1px solid var(--ink)",
        ...style,
      }}
    >
      {children}
    </section>
  );
}
