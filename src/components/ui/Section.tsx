import type { ReactNode } from "react";

/**
 * Vertical rhythm. `dark` switches the surface to --ash via .on-ash, which
 * inverts text to --bone and lifts --rule and --smoke to their light-on-dark
 * values.
 */
export function Section({
  children,
  dark = false,
  className = "",
  style,
}: {
  children: ReactNode;
  dark?: boolean;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <section
      className={`${dark ? "on-ash " : ""}${className}`}
      style={{ paddingBlock: "var(--section-y)", ...style }}
    >
      {children}
    </section>
  );
}
