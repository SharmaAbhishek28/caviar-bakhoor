import Image from "next/image";
import Link from "next/link";
import { Eyebrow, StackSection } from "@/components/ui";
import {
  RITUAL_CONFIRM,
  RITUAL_CTA,
  RITUAL_HEADLINE,
  RITUAL_IMAGE,
  RITUAL_STEPS,
} from "@/data/ritual";

/**
 * 05 — The Ritual (fixed background).
 *
 * The one section whose photograph does not scroll. The image layer is
 * `position: fixed` and the section carries `clip-path: inset(0)`, which
 * clips fixed descendants to the section's own box — so the photo holds
 * still against the viewport while section 04 scrolls off it and section 06
 * slides over it. No JS, and it works on iOS, where
 * `background-attachment: fixed` does not.
 *
 * The four steps sit one in each corner on desktop and stack on smaller
 * screens, scrolling over the held image either way.
 *
 * `beneath`: per docs/homepage.md § 05 this section sits under the one before
 * it in z-order and draws no hairline — nothing slides over onto it, it is
 * revealed.
 */
export function Ritual() {
  return (
    <StackSection
      index={5}
      label="Ritual"
      beneath
      surface="ash"
      className="ritual"
    >
      <div className="ritual-bg">
        <Image
          src={RITUAL_IMAGE.src}
          alt={RITUAL_IMAGE.alt}
          width={RITUAL_IMAGE.width}
          height={RITUAL_IMAGE.height}
          sizes="100vw"
          /* The layer is position: fixed, so this sits in the first viewport
             and the browser scores it as the home page's LCP element even
             though the section is far down the page. Lazy-loading it cost
             the LCP budget in CLAUDE.md. */
          priority
        />
        {/* Darkens toward the edges, where the text sits. */}
        <div className="ritual-scrim" aria-hidden />
      </div>

      <div className="ritual-layer">
        <div className="ritual-head">
          <Eyebrow>The ritual</Eyebrow>
          <p className="type-display-sub">{RITUAL_HEADLINE}</p>
          <p className="ritual-confirm" role="note">
            {RITUAL_CONFIRM}
          </p>
        </div>

        <ol className="ritual-steps">
          {RITUAL_STEPS.map((step) => (
            <li key={step.no} className="ritual-step">
              <span className="ritual-step-no">{step.no}</span>
              <h3 className="ritual-step-name">{step.name}</h3>
              <p className="ritual-step-body">{step.body}</p>
              <Link href={RITUAL_CTA.href} className="ritual-link">
                {RITUAL_CTA.label}
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </StackSection>
  );
}
