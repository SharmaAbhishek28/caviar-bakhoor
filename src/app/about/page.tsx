import type { Metadata } from "next";
import { AboutOpener } from "@/components/about/AboutOpener";
import { Approach, Disciplines, Partnership, Philosophy } from "@/components/about/AboutHouse";
import { BookletSpread, HouseFacts, People, WhatWeMake } from "@/components/about/AboutSections";
import { ShootGallery } from "@/components/about/ShootGallery";
import { Credentials } from "@/components/home/08-Credentials";

export const metadata: Metadata = {
  title: "About Elixir: fragrance, engineered in-house | Caviar Bakhoor",
  description:
    "Elixir Signature Scents: a fragrance manufacturer with a fully integrated R&D facility, responsibly sourced pure agarwood and in-house oud grading. Makers of Caviar Bakhoor.",
};

/**
 * /about, after the About page concept (2026-10-21): the opener, the
 * philosophy, the disciplines, the approach and the integrated house; then
 * the house's facts, the booklet spread, the shoot, the people, what we
 * make, the partnership close and the credentials strip. The layout adds
 * the footer.
 */
export default function AboutPage() {
  return (
    <>
      <AboutOpener />
      <Philosophy />
      <Disciplines />
      <Approach />
      <HouseFacts />
      <BookletSpread />
      <ShootGallery />
      <People />
      <WhatWeMake />
      <Partnership />
      <Credentials />
    </>
  );
}
