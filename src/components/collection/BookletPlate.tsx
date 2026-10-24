import Image from "next/image";
import { SHOOT_BOXES } from "@/data/shoot";

/**
 * Between the collection's opener and its cards: the four fragrances
 * together, from the product shoot. Replaced the AI-recreated booklet spread
 * (site owner, 2026-10-24: real photography, not the AI image).
 */
export function BookletPlate() {
  return (
    <section className="booklet-plate on-ash" aria-label="The four Caviar Bakhoor fragrances">
      <Image
        src={SHOOT_BOXES.fourOpen.src}
        alt={SHOOT_BOXES.fourOpen.alt}
        width={SHOOT_BOXES.fourOpen.width}
        height={SHOOT_BOXES.fourOpen.height}
        sizes="100vw"
        className="booklet-plate-img"
      />
    </section>
  );
}
