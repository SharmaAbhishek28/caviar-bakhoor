import type { Metadata } from "next";
import { AboutOpener } from "@/components/about/AboutOpener";
import { Approach, Disciplines, Partnership, Philosophy } from "@/components/about/AboutHouse";
import { HouseFacts } from "@/components/about/AboutSections";
import { FounderNote } from "@/components/about/FounderNote";
import { Credentials } from "@/components/home/08-Credentials";

export const metadata: Metadata = {
  title: "About Elixir: fragrance, engineered in-house | Caviar Bakhoor",
  description:
    "Elixir Signature Scents: a fragrance manufacturer with a fully integrated R&D facility, responsibly sourced pure agarwood and in-house oud grading. Makers of Caviar Bakhoor.",
};

/**
 * /about, after the About page concept (2026-10-21): the opener, the
 * philosophy, the disciplines, the approach and the integrated house; the
 * house's facts, then the partnership close and the credentials strip
 * (the booklet spread, the shoot, the people and the circles removed,
 * site owner 2026-10-24; the shoot's box photographs live on in
 * data/shoot.ts). The layout adds the footer.
 */
export default function AboutPage() {
  return (
    <>
      <AboutOpener />
      <Philosophy />
      <Disciplines />
      <FounderNote />
      {/* Second design, for comparison with FounderNote (site owner, 2026-10-27). */}
      <Approach />
      <HouseFacts />
      <Partnership />
      <Credentials />
    </>
  );
}
