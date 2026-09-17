import { Fragment, type ReactNode } from "react";

/** The perfumer's approval marker, as it appears at the head of a blurb. */
export const PROPOSAL = "PROPOSAL — perfumer to approve.";

/**
 * A paragraph with named phrases set in weighted or italic type — the
 * reference's "wisdom and balance ... everything he does" device. Used by the
 * section 04 cards and the section 06 entries.
 *
 * `text` may carry the PROPOSAL prefix used for copy awaiting the perfumer.
 * It is stripped for display and kept as `data-confirm` on the paragraph, so
 * unapproved copy stays findable. The four fragrance descriptions no longer
 * carry it — the client supplied final copy — but the mechanism remains for
 * any future draft.
 *
 * Phrases must appear verbatim in `text`. Each is wrapped at its first
 * occurrence; longer phrases are wrapped first so a shorter one can never
 * split a longer one it sits inside.
 */
export function MarkedProse({
  text,
  strong = [],
  em = [],
  className = "",
}: {
  text: string;
  strong?: string[];
  em?: string[];
  className?: string;
}) {
  const flagged = text.startsWith(PROPOSAL);
  const prose = flagged ? text.slice(PROPOSAL.length).trim() : text;

  const marks = [
    ...strong.map((phrase) => ({ phrase, tag: "strong" as const })),
    ...em.map((phrase) => ({ phrase, tag: "em" as const })),
  ].sort((a, b) => b.phrase.length - a.phrase.length);

  let parts: ReactNode[] = [prose];
  for (const { phrase, tag } of marks) {
    parts = parts.flatMap((part, i): ReactNode[] => {
      if (typeof part !== "string") return [part];
      const at = part.indexOf(phrase);
      if (at === -1) return [part];
      const Tag = tag;
      return [
        part.slice(0, at),
        <Tag key={`${phrase}-${i}`}>{phrase}</Tag>,
        part.slice(at + phrase.length),
      ];
    });
  }

  return (
    <p className={className} data-confirm={flagged ? "perfumer" : undefined}>
      {parts.map((p, i) => (
        <Fragment key={i}>{p}</Fragment>
      ))}
    </p>
  );
}
