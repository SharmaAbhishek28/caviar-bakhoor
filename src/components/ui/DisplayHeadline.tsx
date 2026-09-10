/**
 * Bodoni Moda uppercase display. One array entry per rendered line, so the
 * line breaks are content decisions rather than whatever the measure happens
 * to produce.
 *
 * `stagger` opts a headline into the hero's one orchestrated motion moment:
 * each line fades in 80ms after the one above it. Everywhere else, omit it.
 *
 * `italicLine` sets one line in Bodoni italic — the counterpoint the reference
 * uses for "CREATIVE / FEATURE". Index into `lines`; omit for all-roman.
 */
export function DisplayHeadline({
  lines,
  as: Tag = "h2",
  stagger = false,
  italicLine,
  className = "",
  style,
}: {
  lines: string[];
  as?: "h1" | "h2" | "h3";
  stagger?: boolean;
  /** Index of the line to set in italic. */
  italicLine?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <Tag className={`type-display-xl ${className}`} style={style}>
      {lines.map((line, i) => {
        const italic = i === italicLine;
        return (
          <span
            key={line}
            className={`block${stagger ? " hero-line" : ""}${
              italic ? " type-display-italic-line" : ""
            }`}
            style={stagger ? ({ "--i": i } as React.CSSProperties) : undefined}
          >
            {line}
          </span>
        );
      })}
    </Tag>
  );
}
