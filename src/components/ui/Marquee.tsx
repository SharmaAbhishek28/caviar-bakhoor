/**
 * Category keyword band. CSS-only: 45s linear infinite transform, paused on
 * hover and stopped entirely under prefers-reduced-motion. No JS, so it costs
 * nothing at runtime and needs no client boundary.
 *
 * The track holds two identical runs, which is what makes the -50% translate
 * loop seamlessly. The second run is decorative repetition, so it is hidden
 * from assistive tech.
 */
export function Marquee({
  items,
  className = "",
  label = "Category keywords",
}: {
  items: string[];
  className?: string;
  /** Accessible name for the band. */
  label?: string;
}) {
  return (
    <div className={`marquee ${className}`} aria-label={label}>
      <div className="marquee-track">
        {[0, 1].map((run) => (
          <ul
            key={run}
            className="flex shrink-0 items-center"
            aria-hidden={run === 1 || undefined}
          >
            {/* Keyed by position: a band may repeat one phrase to fill its width. */}
            {items.map((item, i) => (
              <li
                key={i}
                className="type-marquee flex items-center whitespace-nowrap"
              >
                <span>{item}</span>
                <span
                  aria-hidden
                  className="px-6"
                  style={{ color: "var(--smoke)" }}
                >
                  ·
                </span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
