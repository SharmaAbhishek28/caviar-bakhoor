import Image from "next/image";

/**
 * Between the collection's opener and its cards: the four fragrances
 * together, from the product shoot. Replaced the AI-recreated booklet spread
 * (site owner, 2026-10-24: real photography, not the AI image).
 */
export function BookletPlate() {
  return (
    <section className="booklet-plate on-ash" aria-label="The four Caviar Bakhoor fragrances">
      <Image
        src="/images/shoot/four-boxes-with-tins.jpg"
        alt="The four Caviar Bakhoor boxes, Noir, Ward Baccarat, Imperial Zafran and Amber Blanc, two of them open on their tins"
        width={2400}
        height={1600}
        sizes="100vw"
        className="booklet-plate-img"
      />
    </section>
  );
}
