import type { Metadata } from "next";
import { Credentials } from "@/components/home/08-Credentials";
import { RitualBox, RitualClose, RitualHeat, RitualObjects, RitualOpener, RitualSteps } from "@/components/ritual/RitualSections";

export const metadata: Metadata = {
  title: "The Ritual — Four steps. No smoke until you want it. | Caviar Bakhoor",
  description:
    "Light, place, spoon, release. How Caviar Bakhoor is burned: the charcoal, the gold mesh disc, a measure of pearls, and a scent that unfolds instead of erupting.",
};

/** /ritual — opener, the four steps, in the box, the heat line, the objects, close. */
export default function RitualPage() {
  return (
    <>
      <RitualOpener />
      <RitualSteps />
      <RitualBox />
      <RitualHeat />
      <RitualObjects />
      <RitualClose />
      <Credentials />
    </>
  );
}
