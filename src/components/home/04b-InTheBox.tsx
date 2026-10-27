import { CapsSubhead, Container, MarkedProse, StackSection } from "@/components/ui";
import { BOX_INTRO, BOX_INTRO_STRONG, BOX_ITEMS } from "@/data/box";
import { BoxRows } from "./03-BoxRows";

/**
 * 04b — In the box: the line, then the spoon, the mesh and the foil, one
 * row each. After the collection (site owner, 2026-10-27): once the four
 * fragrances are shown, what comes with each of them.
 */
export function InTheBox() {
  return (
    <StackSection index={5} label="In the box" surface="raised" style={{ paddingBottom: "var(--section-y)" }}>
      <Container>
        <div className="br-head">
          <CapsSubhead>Elixir × Caviar Bakhoor</CapsSubhead>
          <MarkedProse className="type-body br-intro" text={BOX_INTRO} strong={BOX_INTRO_STRONG} />
        </div>
        <BoxRows items={BOX_ITEMS} />
      </Container>
      <hr style={{ border: 0, borderTop: "1px solid var(--rule)", margin: 0 }} />
    </StackSection>
  );
}
