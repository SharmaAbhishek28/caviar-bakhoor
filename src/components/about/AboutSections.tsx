import Image from "next/image";
import Link from "next/link";
import { Container, MarkedProse, Reveal } from "@/components/ui";
import { ABOUT } from "@/data/about";
import { PEOPLE, PEOPLE_SUBHEAD, PEOPLE_TITLE, type Person } from "@/data/people";

/** The booklet's second spread, recreated on the dark panel: the lead line,
 *  then three gold-framed photographs, each with its caption, laid out as the
 *  printed page has them. One column on a phone. */
export function BookletSpread() {
  const { lead, items } = ABOUT.booklet;
  return (
    <section className="ab-booklet on-ash" data-label="Booklet">
      <Container>
        <div className="bk-grid">
          <p className="bk-lead">{lead}</p>
          {items.map((item, i) => (
            <figure key={item.image.src} className={`bk-item bk-item--${i + 1}`}>
              <div className="bk-frame">
                <Image
                  src={item.image.src}
                  alt={item.image.alt}
                  width={item.image.width}
                  height={item.image.height}
                  sizes="(max-width: 767px) 100vw, 45vw"
                />
              </div>
              <figcaption className="bk-caption">{item.caption}</figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}

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
            {ABOUT.facts.filter((f) => f.value !== null).map((f) => (
              <div key={f.label} className="ab-ledger-row">
                <dt>{f.label}</dt>
                <dd>{f.value}</dd>
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
      {person.epithet ? (
        <h3 className="four-title">
          <span className="four-title-the">The</span>
          <span className="four-title-epithet">{person.epithet}</span>
        </h3>
      ) : null}
      {person.portrait ? (
        <figure className="four-figure">
          <Image src={person.portrait.src} alt={person.portrait.alt} width={person.portrait.width} height={person.portrait.height} sizes="(max-width: 1023px) 100vw, 45vw" className="media" />
          {/* The reference signs its portraits. */}
          {person.name ? <figcaption className="four-signature">{person.name}</figcaption> : null}
        </figure>
      ) : null}
      {person.role ? <p className="people-role">{person.role}</p> : null}
      {person.bio ? (
        <MarkedProse className="type-body prose-justified four-blurb" text={person.bio} strong={person.strong} em={person.em} />
      ) : null}
    </li>
  );
}

export function People() {
  // Only people the client has named are shown; with none named, the
  // section is not rendered.
  const named = PEOPLE.filter((p) => p.name);
  if (!named.length) return null;
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
          {named.map((p) => (
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
