import Link from "next/link";
import { MarkedProse } from "@/components/ui";
import { LEGAL, MENU_NAV } from "@/data/nav";
import { FOOTER } from "@/data/footer";

/**
 * 09 — Footer, per docs/homepage.md § 09 and the reference.
 *
 * Spans the header's 90% width rather than the content column — the
 * reference's footer runs edge to edge under its nav, not under its copy.
 *
 * Top row: the two-line headline left, the nav in one row right, each item
 * followed by an arrow. Then the paragraph at ~42% width with the legal
 * links small at the right end of the same row. Then the wordmark: Switzer
 * Black lowercase, sized to the viewport, its baseline pushed below the
 * footer's bottom edge so the top two-thirds of the letters show and the
 * rest is clipped.
 *
 * Light, on --paper, like the reference; the mesh-disc dot texture sits
 * behind it at low opacity. The legal links sit beside the paragraph rather
 * than beneath the wordmark — the brief puts them beneath, but the wordmark
 * is clipped at the page's bottom edge and nothing can sit below it.
 *
 * The previous newsletter form was dropped with this rebuild; it returns
 * through the single submitEnquiry stub if the client wants one.
 */
export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-top">
          <h2 className="footer-headline">
            <span>{FOOTER.headline.first}</span>
            <span>
              {FOOTER.headline.second} <em>{FOOTER.headline.emphasis}</em>
            </span>
          </h2>

          <nav aria-label="Footer" className="footer-nav">
            <ul>
              {MENU_NAV.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>
                    <span>{item.label}</span>
                    <span aria-hidden className="footer-arrow">
                      ↗
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="footer-body">
          <MarkedProse
            className="type-body footer-copy"
            text={FOOTER.paragraph}
            strong={FOOTER.strong}
            em={FOOTER.em}
          />

          <div className="footer-legal">
            <ul>
              {LEGAL.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
            <p>
              © {new Date().getFullYear()} {FOOTER.house}
            </p>
          </div>
        </div>
      </div>

      {/* Decorative: the site name is in the header and the page title. */}
      <div className="footer-wordmark" aria-hidden>
        {FOOTER.wordmark}
      </div>
    </footer>
  );
}
