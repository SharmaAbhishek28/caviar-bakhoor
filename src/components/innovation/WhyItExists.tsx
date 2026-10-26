import { MarkedProse } from "@/components/ui";
import type { WhyItem } from "@/data/innovation";

/**
 * /innovation: Why it needed to exist. The buyer's and the perfume house's
 * questions, each opening to its answer (native <details>, so it works
 * without JS and is keyboard-accessible). The first is open. Questions
 * whose answer is still null are not rendered.
 *
 * Emits FAQPage JSON-LD for the answered questions, so search engines can
 * show them as rich results.
 */
export function WhyItExists({
  eyebrow,
  headline,
  lede,
  items,
}: {
  eyebrow: string;
  headline: string[];
  lede: string;
  items: WhyItem[];
}) {
  const answered = items.filter((i): i is WhyItem & { a: string } => Boolean(i.a));
  if (!answered.length) return null;
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: answered.map((i) => ({ "@type": "Question", name: i.q, acceptedAnswer: { "@type": "Answer", text: i.a } })),
  };
  return (
    <section className="inv-faq why" data-label="Why">
      <div className="why-inner">
        <header className="why-head">
          <p className="why-eyebrow">{eyebrow}</p>
          <h2 className="why-title">
            {headline.map((l, i) => (
              <span key={l} className={i === 1 ? "why-title-italic" : undefined}>
                {l}
              </span>
            ))}
          </h2>
          <p className="type-body why-lede">{lede}</p>
        </header>
        <div className="inv-faq-list">
          {answered.map((i, n) => (
            <details key={i.q} className="inv-faq-item" open={n === 0}>
              <summary>
                <span className="why-no">{String(n + 1).padStart(2, "0")}</span>
                <span className="why-q">{i.q}</span>
              </summary>
              <MarkedProse className="type-body" text={i.a} strong={i.strong ?? []} />
            </details>
          ))}
        </div>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </section>
  );
}
