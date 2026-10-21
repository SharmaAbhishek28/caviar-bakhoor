import Image from "next/image";

/**
 * The client's booklet spread, between the collection's opener and its cards:
 * the house mark, the cover lines and all four lids and boxes on one black
 * page. AI-recreated (Higgsfield, GPT Image 2.5, 2026-10-21) from a phone
 * photograph of the printed booklet, flattened and cleaned, with the retired
 * "Caviar de Parfum" title set as "Caviar Bakhoor".
 */
export function BookletPlate() {
  return (
    <section className="booklet-plate on-ash" aria-label="The four Caviar Bakhoor fragrances">
      <Image
        src="/images/brand/booklet-spread.jpg"
        alt="Elixir Signature Scents presenting Caviar Bakhoor: the four tins, Ward Baccarat, Amber Blanc, Imperial Zafran and Noir, with their boxes, in gold on black"
        width={2400}
        height={1357}
        sizes="100vw"
        className="booklet-plate-img"
      />
    </section>
  );
}
