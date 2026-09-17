import type { Metadata } from "next";
import {
  Eyebrow,
  DisplayHeadline,
  CapsSubhead,
  Marquee,
  DarkPanel,
} from "@/components/ui";

export const metadata: Metadata = {
  title: "Styleguide — Caviar Bakhoor",
  description: "Colour and type tokens.",
  robots: { index: false, follow: false },
};

/* --------------------------------------------------------------------------
   Token tables mirror docs/design-system.md exactly. If a value changes there
   and in globals.css, change it here too — this page is the visual proof.
   -------------------------------------------------------------------------- */

type Swatch = {
  token: string;
  hex: string;
  use: string;
};

const CANVAS: Swatch[] = [
  { token: "--paper", hex: "#EFEEEB", use: "The page. Cool neutral, not warm bone" },
  { token: "--ink", hex: "#101012", use: "Text on paper" },
  { token: "--rule", hex: "#D6D4CF", use: "Hairlines, dividers, input borders" },
  {
    token: "--ash",
    hex: "#08070A",
    use: "Full-bleed photography panels and the footer. Not the page canvas",
  },
];

const GOLD: Swatch[] = [
  {
    token: "--gold-deep",
    hex: "#8A6E38",
    use: "The only gold. At most one element per section, never on a label or eyebrow",
  },
];

const TEXT: Swatch[] = [
  { token: "--bone", hex: "#EFEEEB", use: "Text on --ash panels" },
  {
    token: "--smoke",
    hex: "rgb(16 16 18 / 0.6)",
    use: "Labels, eyebrows, captions, meta — --ink at 60%",
  },
];

/* Colour-picked from the lids in the opener panel photograph. */
const FRAGRANCE: Swatch[] = [
  { token: "--noir", hex: "#0C0301", use: "Noir — the black lid" },
  { token: "--ward", hex: "#1E0102", use: "Ward Baccarat — the burgundy lid" },
  {
    token: "--zafran",
    hex: "#0C1E15",
    use: "Imperial Zafran — the green lid. The tin is green, not saffron",
  },
  { token: "--amber", hex: "#B5B9BB", use: "Amber Blanc — the pearl-white lid" },
];

function SwatchCard({ token, hex, use }: Swatch) {
  return (
    <li className="flex min-w-0 flex-col gap-3">
      {/* Literal hex, not the token: swatches document the canonical palette,
          so they hold their value even inside an .on-ash panel. */}
      <div
        className="aspect-[3/2] w-full"
        style={{
          background: hex,
          boxShadow: "inset 0 0 0 1px var(--rule)",
        }}
      />
      <div className="flex flex-col gap-1">
        <code
          className="type-meta"
          style={{
            color: "var(--ink)",
            letterSpacing: "0.04em",
            textTransform: "none",
          }}
        >
          {token}
        </code>
        <span className="type-meta" style={{ color: "var(--smoke)" }}>
          {hex}
        </span>
        <span
          className="type-body"
          style={{
            color: "var(--smoke)",
            fontSize: "0.875rem",
            lineHeight: 1.5,
          }}
        >
          {use}
        </span>
      </div>
    </li>
  );
}

function ColourGroup({ title, swatches }: { title: string; swatches: Swatch[] }) {
  return (
    <div className="flex flex-col gap-6">
      <h3 className="type-meta" style={{ color: "var(--smoke)" }}>
        {title}
      </h3>
      <ul className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,11rem),1fr))] gap-6">
        {swatches.map((s) => (
          <SwatchCard key={s.token} {...s} />
        ))}
      </ul>
    </div>
  );
}

/* -------------------------------------------------------------------------- */

type Specimen = {
  token: string;
  spec: string;
  use: string;
  className: string;
  /** Real copy from docs/content.md. No lorem ipsum anywhere. */
  sample: React.ReactNode;
};

const TYPE: Specimen[] = [
  {
    token: "display-xl",
    spec: "Bodoni Moda · 6.48vw (13vw below 768px) · wght 700 · opsz 6 · uppercase · leading 1 · tracking 0",
    use: "Display",
    className: "type-display-xl",
    sample: "Bakhoor, reimagined.",
  },
  {
    token: "display-sub",
    spec: "Switzer Black · 1.55vw · uppercase · tracking 0",
    use: "The caps subhead under a display line",
    className: "type-display-sub",
    sample: "Four Caviar’s. One category.",
  },
  {
    token: "display-italic",
    spec: "Bodoni Moda Italic · same scale · wght 700 · opsz 6",
    use: "Display, italic",
    className: "type-display-italic",
    sample: "A new form of fragrance.",
  },
  {
    token: "eyebrow",
    spec: "Switzer Regular · 0.85vw · uppercase · tracking 0.02em · --ink at 60%",
    use: "Section eyebrow. Never gold",
    className: "type-eyebrow",
    sample: "The innovation",
  },
  {
    token: "marquee",
    spec: "Switzer Black · 1.5rem · uppercase",
    use: "Category keywords in the scrolling band",
    className: "type-marquee",
    sample: "Caviar Bakhoor · Encapsulation",
  },
  {
    token: "counter-xl",
    spec: "Switzer Black Italic · 0.55× the Bodoni beside it · tracking -0.01em",
    use: "The large counterpoint word",
    className: "type-counter-xl",
    sample: "encapsulated",
  },
  {
    token: "counter-sm",
    spec: "Switzer Black · 0.14× the Bodoni · uppercase · tracking 0.06em",
    use: "The small tracked-out counterpoint",
    className: "type-counter-sm",
    sample: "24 karat gold",
  },
  {
    token: "fragrance",
    spec: "Bodoni Moda Italic · clamp(2rem, 4vw, 3.5rem) · wght 700 · opsz 6",
    use: "Fragrance names",
    className: "type-fragrance",
    sample: (
      <span className="flex flex-col gap-1">
        <span>Noir</span>
        <span>Ward Baccarat</span>
        <span>Imperial Zafran</span>
        <span>Amber Blanc</span>
      </span>
    ),
  },
  {
    token: "body",
    spec: "Switzer Regular · 1rem / 1.6 · max 68ch",
    use: "Prose",
    className: "type-body",
    sample:
      "Traditional bakhoor, encapsulated into pearls — each one holding fragrance and pure 24-karat gold until heat releases it. Heat opens the pearl slowly. What you get is a scent that unfolds instead of erupting — and lasts.",
  },
  {
    token: "meta",
    spec: "Switzer Medium · 0.8125rem · uppercase · tracking 0.08em",
    use: "Price, product weight, form labels",
    className: "type-meta",
    sample: "Caviar Bakhoor · Shop the collection",
  },
];

/* --------------------------------------------------------------------------
   Headline composition — the signature device. Both faces at different sizes
   and baselines inside one headline. All copy verbatim from docs/content.md.
   -------------------------------------------------------------------------- */

/** Lifts or drops a run of type off the shared baseline. */
function Shift({
  by,
  children,
}: {
  by: string;
  children: React.ReactNode;
}) {
  return (
    <span style={{ display: "inline-block", verticalAlign: "baseline", transform: `translateY(${by})` }}>
      {children}
    </span>
  );
}

const COMPOSITIONS: {
  source: string;
  note: string;
  headline: React.ReactNode;
}[] = [
  {
    source: "Home — hero",
    note: "Bodoni caps carry the noun; Switzer Black Italic cuts into the second word. Monochrome — the size and weight break does the work.",
    headline: (
      <span className="flex flex-col" style={{ lineHeight: 1 }}>
        <span className="type-counter-sm">Caviar Bakhoor</span>
        <span className="type-display-xl">Bakhoor,</span>
        <span style={{ textTransform: "uppercase" }}>
          <Shift by="-0.05em">
            <span className="type-counter-xl">re</span>
          </Shift>
          <span className="type-display-italic">imagined.</span>
        </span>
      </span>
    ),
  },
  {
    source: "Collection — Imperial Zafran",
    note: "The family name in Switzer Black Italic, lifted; the fragrance name in Bodoni italic caps beneath it.",
    headline: (
      <span className="flex flex-col" style={{ lineHeight: 1 }}>
        <Shift by="0.12em">
          <span className="type-counter-xl" style={{ textTransform: "uppercase" }}>
            Imperial
          </span>
        </Shift>
        <Shift by="-0.06em">
          <span className="type-display-italic" style={{ textTransform: "uppercase" }}>
            Zafran
          </span>
        </Shift>
      </span>
    ),
  },
  {
    source: "For business — B2B opener",
    note: "Two halves, two faces. Switzer Black Italic answers the Bodoni caps across the line break.",
    headline: (
      <span className="flex flex-col" style={{ lineHeight: 1 }}>
        <span style={{ textTransform: "uppercase" }}>
          <span className="type-display-xl">Your </span>
          <Shift by="-0.03em">
            <span className="type-counter-xl">fragrance.</span>
          </Shift>
        </span>
        <span style={{ textTransform: "uppercase" }}>
          <span className="type-counter-sm">Our </span>
          <span className="type-display-italic">innovation.</span>
        </span>
      </span>
    ),
  },
];

/* --------------------------------------------------------------------------
   Page opener — eyebrow, display, caps subhead, keyword marquee, dark panel.
   Keywords verbatim from docs/content.md, [CONFIRM] marker left visible.
   -------------------------------------------------------------------------- */

const KEYWORDS = [
  "Caviar Bakhoor",
  "Encapsulation",
  "24 Karat Gold",
  "Oud",
  "Bakhoor Reimagined",
  "Private Label",
  "Caviar Bakhoor",
];

/* -------------------------------------------------------------------------- */

function Row({
  label,
  children,
}: {
  label: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div
      className="grid gap-6 border-t py-12 md:grid-cols-[minmax(0,16rem)_minmax(0,1fr)] md:gap-16"
      style={{ borderColor: "var(--rule)" }}
    >
      <div className="flex min-w-0 flex-col gap-2">{label}</div>
      <div className="min-w-0">{children}</div>
    </div>
  );
}

export default function StyleguidePage() {
  return (
    <div
      className="mx-auto w-full"
      style={{
        maxWidth: "var(--container-max)",
        paddingInline: "var(--gutter)",
        paddingBlock: "var(--section-y)",
      }}
    >
      <header className="flex flex-col gap-4">
        <p className="type-meta" style={{ color: "var(--smoke)" }}>
          Elixir Signature Scents
        </p>
        <h1 className="type-page-title">Styleguide</h1>
        <p className="type-body" style={{ color: "var(--smoke)" }}>
          Colour and type tokens as defined in docs/design-system.md and
          implemented in app/globals.css. Specimen copy is real, from
          docs/content.md.
        </p>
      </header>

      {/* --- Colour ------------------------------------------------------- */}
      <section className="mt-24 flex flex-col gap-4">
        <h2 className="type-page-title">Colour</h2>
        <p className="type-body" style={{ color: "var(--smoke)" }}>
          The page is paper — a cool neutral, not a warm bone. Gold is rare: one
          element per section at most, and never on a label or an eyebrow, which
          are --ink at 60%. The near-black --ash is now only for full-bleed
          photography panels and the footer.
        </p>

        <div className="mt-8 flex flex-col gap-16">
          <ColourGroup title="Canvas" swatches={CANVAS} />
          <ColourGroup title="Gold" swatches={GOLD} />
          <ColourGroup title="Text" swatches={TEXT} />
          <ColourGroup title="Per-fragrance accent" swatches={FRAGRANCE} />
        </div>
      </section>

      {/* --- Type --------------------------------------------------------- */}
      <section className="mt-32 flex flex-col gap-4">
        <h2 className="type-page-title">Type</h2>
        <p className="type-body" style={{ color: "var(--smoke)" }}>
          Bodoni Moda for display, roman and italic. Switzer for counterpoint
          words, labels, body and UI. Display sizing is pure viewport scaling —
          6.48vw with no clamp, dropping to 13vw below 768px, so the
          composition holds its proportions at every width.
        </p>

        <div className="mt-8">
          {TYPE.map((t) => (
            <Row
              key={t.token}
              label={
                <>
                  <code
                    className="type-meta"
                    style={{
                      color: "var(--ink)",
                      textTransform: "none",
                      letterSpacing: "0.04em",
                    }}
                  >
                    {t.token}
                  </code>
                  <span
                    className="type-body"
                    style={{
                      color: "var(--smoke)",
                      fontSize: "0.8125rem",
                      lineHeight: 1.5,
                    }}
                  >
                    {t.spec}
                  </span>
                  <span
                    className="type-body"
                    style={{
                      color: "var(--smoke)",
                      fontSize: "0.8125rem",
                      lineHeight: 1.5,
                    }}
                  >
                    {t.use}
                  </span>
                </>
              }
            >
              <div className={t.className}>{t.sample}</div>
            </Row>
          ))}
        </div>
      </section>

      {/* --- Headline composition ------------------------------------------ */}
      <section className="mt-32 flex flex-col gap-4">
        <h2 className="type-page-title">Headline composition</h2>
        <p className="type-body" style={{ color: "var(--smoke)" }}>
          The signature device: both faces at different sizes and baselines
          inside a single headline. A headline set entirely in one face is a
          missed opportunity.
        </p>

        <div className="mt-8">
          {COMPOSITIONS.map((c) => (
            <Row
              key={c.source}
              label={
                <>
                  <span className="type-meta" style={{ color: "var(--smoke)" }}>
                    {c.source}
                  </span>
                  <span
                    className="type-body"
                    style={{
                      color: "var(--smoke)",
                      fontSize: "0.8125rem",
                      lineHeight: 1.5,
                    }}
                  >
                    {c.note}
                  </span>
                </>
              }
            >
              {c.headline}
            </Row>
          ))}
        </div>
      </section>

      {/* --- Page opener --------------------------------------------------
          The whole rhythm in one go: light page, then the dark photography
          panel. Full-bleed, so it breaks the main gutter with a negative
          margin rather than sitting inside it.
          ------------------------------------------------------------------ */}
      <section className="mt-32 flex flex-col gap-4">
        <h2 className="type-page-title">Page opener</h2>
        <p className="type-body" style={{ color: "var(--smoke)" }}>
          Eyebrow, display, caps subhead, keyword marquee, then the full-bleed
          dark panel. Gold appears exactly once in this section — the rule under
          the subhead.
        </p>
      </section>

      {/* Rebuilt from the primitives in src/components/ui. */}
      <div
        className="mt-12"
        style={{
          marginInline: "calc(var(--gutter) * -1)",
          borderTop: "1px solid var(--rule)",
        }}
      >
        <div
          className="flex flex-col gap-8"
          style={{
            paddingInline: "var(--gutter)",
            paddingBlock: "clamp(3rem, 8vw, 6rem)",
          }}
        >
          <Eyebrow>The innovation</Eyebrow>

          <DisplayHeadline
            as="h3"
            lines={["Bakhoor,", "reimagined."]}
            style={{ maxWidth: "14ch" }}
          />

          {/* The one gold element in this section. */}
          <hr
            style={{
              width: "4rem",
              height: 2,
              border: 0,
              background: "var(--gold-deep)",
            }}
          />

          <CapsSubhead style={{ maxWidth: "28ch" }}>
            Four Caviar’s. One category.
          </CapsSubhead>
        </div>

        <div
          style={{
            borderBlock: "1px solid var(--rule)",
            paddingBlock: "1.25rem",
          }}
        >
          <Marquee items={KEYWORDS} />
        </div>

        <DarkPanel
          src="/images/collection-tins-dark.jpg"
          alt="The four Caviar Bakhoor tins — Ward Baccarat, Amber Blanc, Imperial Zafran and Noir — lit against black"
          width={2400}
          height={1302}
        >
          <Eyebrow>The collection</Eyebrow>
          <CapsSubhead>Four Caviar’s. No filters.</CapsSubhead>
        </DarkPanel>
      </div>
    </div>
  );
}
