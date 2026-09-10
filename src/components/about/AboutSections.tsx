import Image from "next/image";
import Link from "next/link";
import { Container, MarkedProse, Reveal } from "@/components/ui";
import { ABOUT } from "@/data/about";
import { PEOPLE, PEOPLE_SUBHEAD, PEOPLE_TITLE, type Person } from "@/data/people";

/** The house: a statement, and the facts ledger with its markers showing. */
export function HouseFacts() {
  return (
    <section className="ab-house" data-label="House">
      <Container>
        <div className="ab-house-grid">
          <Reveal className="ab-house-copy">
            <h2 className="ab-h2">{ABOUT.house.title}</h2>
            <MarkedProse className="type-body ab-statement" text={ABOUT.house.statement} strong={ABOUT.house.strong} />
          </Reveal>
          <Reveal stagger className="ab-ledger">
            {ABOUT.facts.map((f) => (
              <div key={f.label} className="ab-ledger-row" data-confirm={f.value === null ? "client" : undefined}>
                <dt>{f.label}</dt>
                <dd>{f.value ?? "[CONFIRM]"}</dd>
              </div>
            ))}
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

/**
 * The people, in the reference's structure: THE / epithet, a portrait signed
 * with the name, a marked-up paragraph, two columns staggered. Every slot is
 * empty until the client supplies the person — see data/people.ts.
 */
function PersonCard({ person }: { person: Person }) {
  return (
    <li className="four-entry people-entry">
      <h3 className="four-title">
        <span className="four-title-the">The</span>
        <span className="four-title-epithet">{person.epithet ?? "[Confirm]"}</span>
      </h3>
      <figure className="four-figure">
        {person.portrait ? (
          <Image src={person.portrait.src} alt={person.portrait.alt} width={person.portrait.width} height={person.portrait.height} sizes="(max-width: 1023px) 100vw, 45vw" className="media" />
        ) : (
          <div className="people-portrait" role="img" aria-label="Portrait to be supplied">
            <span>[CONFIRM] portrait</span>
          </div>
        )}
        <figcaption className="four-signature">{person.name ?? "[CONFIRM] name"}</figcaption>
      </figure>
      <p className="people-role">{person.role ?? "[CONFIRM] role"}</p>
      {person.bio ? (
        <MarkedProse className="type-body prose-justified four-blurb" text={person.bio} strong={person.strong} em={person.em} />
      ) : (
        <p className="type-body four-blurb people-bio-empty">
          [CONFIRM] Two or three sentences, in this person&rsquo;s own words.
        </p>
      )}
    </li>
  );
}

export function People() {
  return (
    <section className="ab-people" data-label="People">
      <Container>
        <Reveal className="ab-people-head">
          <h2 className="ab-people-title">
            <span className="four-title-the">{PEOPLE_TITLE.first}</span>
            <span className="four-title-epithet">{PEOPLE_TITLE.second}</span>
          </h2>
          <p className="type-display-sub">{PEOPLE_SUBHEAD}</p>
        </Reveal>
        <ol className="four-grid">
          {PEOPLE.map((p) => (
            <PersonCard key={p.id} person={p} />
          ))}
        </ol>
      </Container>
    </section>
  );
}

/** What we make: the pearl form, three times. */
export function WhatWeMake() {
  return (
    <section className="ab-make" data-label="Make">
      <Container>
        <Reveal stagger className="ab-circles">
          {ABOUT.circles.map((c) => (
            <article key={c.title} className="ab-circle">
              <Link href={c.href} className="ab-circle-img" aria-label={c.cta}>
                <Image src={c.image.src} alt={c.image.alt} width={c.image.width} height={c.image.height} sizes="(max-width: 767px) 70vw, 30vw" />
              </Link>
              <p className="ab-circle-kicker">{c.kicker}</p>
              <h3 className="ab-circle-title">{c.title}</h3>
              <p className="type-body ab-circle-body">{c.body}</p>
              <Link href={c.href} className="ab-circle-link">
                {c.cta} <span aria-hidden>↗</span>
              </Link>
            </article>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}

/** The close: the composition, two buttons. */
export function AboutClose() {
  return (
    <section className="ab-close" data-label="Contact">
      <Container>
        <Reveal stagger className="ab-close-inner">
          <h2 className="ab-close-h">
            <span className="type-counter-xl ab-close-lead">{ABOUT.close.lead}</span>
            <span className="type-display-xl ab-close-line">{ABOUT.close.line}</span>
          </h2>
          <div className="ab-close-actions">
            <Link href={ABOUT.close.primary.href} className="cta-button">
              <span>{ABOUT.close.primary.label}</span>
              <span aria-hidden className="cta-arrow">↗</span>
            </Link>
            <Link href={ABOUT.close.secondary.href} className="cta-button cta-button--ghost">
              <span>{ABOUT.close.secondary.label}</span>
              <span aria-hidden className="cta-arrow">↗</span>
            </Link>
          </div>
        </Reveal>
      </Container>
      <hr className="pdp-rule" />
    </section>
  );
}
