import type { ReactNode } from "react";

/**
 * Switzer Regular caps at --smoke. Never gold — that rule is in the design
 * system, and the colour comes from .type-eyebrow rather than a prop so it
 * cannot drift per usage.
 */
export function Eyebrow({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <p className={`type-eyebrow ${className}`}>{children}</p>;
}
