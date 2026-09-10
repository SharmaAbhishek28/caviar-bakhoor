import Image from "next/image";
import { CREDENTIALS, CREDENTIALS_LABEL } from "@/data/credentials";

/**
 * 08 — Credentials strip.
 *
 * Full-bleed, hairline top and bottom. A fixed label cell on the left with
 * its own right hairline; a self-running band on the right that pauses on
 * hover. The band reuses the CSS-only .marquee mechanics (two identical runs,
 * -50% loop) but draws its own items, because an item may be a brand mark
 * rather than a word once the client confirms the collaborating brands.
 *
 * No side label: docs/homepage.md § 08.
 */
export function Credentials() {
  return (
    <section className="credentials" aria-label="Credentials">
      <div className="credentials-label">{CREDENTIALS_LABEL}</div>

      <div className="credentials-band">
        <div className="marquee credentials-marquee" aria-label="What we make">
          <div className="marquee-track">
            {[0, 1].map((run) => (
              <ul
                key={run}
                className="credentials-run"
                aria-hidden={run === 1 || undefined}
              >
                {CREDENTIALS.map((item, i) => (
                  <li key={i} className="credentials-item">
                    {item.logo ? (
                      <Image
                        src={item.logo.src}
                        alt={item.label}
                        width={item.logo.width}
                        height={item.logo.height}
                      />
                    ) : (
                      <span>{item.label}</span>
                    )}
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
