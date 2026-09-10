import type { ReactNode } from "react";

/**
 * Max width and gutters. 1440px / 24px mobile / 64px above 1024px.
 */
export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`mx-auto ${className}`}
      style={{
        /* --content IS the rendered width, so the padding must not be
           subtracted from it: content-box, not border-box. On a phone
           --content is 100% and the gutter is what insets it from the edges;
           above 1024px --content is a fixed px measure and the gutter is 0.

           The width subtracts the padding explicitly. With content-box, a
           plain 100% plus 24px each side rendered 423px on a 375px phone,
           which widened the mobile layout viewport and clipped every
           paragraph on the right — measured before this was changed. */
        width: "calc(100% - 2 * var(--container-pad))",
        maxWidth: "var(--content)",
        paddingInline: "var(--container-pad)",
        boxSizing: "content-box",
      }}
    >
      {children}
    </div>
  );
}
