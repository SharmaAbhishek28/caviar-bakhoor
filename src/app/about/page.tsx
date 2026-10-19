import type { Metadata } from "next";
import { AboutOpener } from "@/components/about/AboutOpener";
import { AboutClose, BookletSpread, HouseFacts, People, WhatWeMake } from "@/components/about/AboutSections";
import { ShootGallery } from "@/components/about/ShootGallery";
import { Credentials } from "@/components/home/08-Credentials";

export const metadata: Metadata = {
  title: "About Elixir: a perfume house that builds what it sells | Caviar Bakhoor",
  description:
    "Elixir Signature Scents makes Caviar Bakhoor: a patent-pending encapsulation technology that transforms scent into pearls. Four Caviar’s, one new category.",
};

/**
 * /about — the opener, the house and its facts, the booklet spread, the shoot, the people, what
 * we make, the close, the credentials strip; the layout adds the footer.
 */
export default function AboutPage() {
  return (
    <>
      <AboutOpener />
      <HouseFacts />
      <BookletSpread />
      <ShootGallery />
      <People />
      <WhatWeMake />
      <AboutClose />
      <Credentials />
    </>
  );
}
