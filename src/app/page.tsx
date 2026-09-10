import { Hero } from "@/components/home/01-Hero";
import { TrustStrip } from "@/components/home/01b-TrustStrip";
import { Innovation } from "@/components/home/02-Innovation";
import { Approach } from "@/components/home/03-Approach";
import { Projects } from "@/components/home/04-Projects";
import { Ritual } from "@/components/home/05-Ritual";
import { Four } from "@/components/home/06-Four";
import { Credentials } from "@/components/home/08-Credentials";

/**
 * Home. Sections land here one per prompt, in the order set out in
 * docs/homepage.md § Build order.
 *
 * Sections 02–08 sit in normal flow with a rising z-index (see StackSection
 * for why they are not sticky). 05 is the exception: its photograph is fixed
 * and the sections either side scroll over it.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <Innovation />
      <Approach />
      <Projects />
      <Ritual />
      <Four />
      {/* 07 Closing follows here. */}
      <Credentials />
    </>
  );
}
