import type { ReactNode } from "react";

/** Switzer Black caps, 1.55vw. Sits under a DisplayHeadline. */
export function CapsSubhead({
  children,
  className = "",
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <p className={`type-display-sub ${className}`} style={style}>
      {children}
    </p>
  );
}
