import type { Metadata } from "next";
import { Catalogue } from "@/components/collection/Catalogue";
import { CollectionHero } from "@/components/collection/CollectionHero";
import { Story } from "@/components/collection/Story";
import { products } from "@/data/products";

export const metadata: Metadata = {
  title: "The Collection | Caviar Bakhoor",
  description:
    "Four Caviar’s. One new category. Noir, Ward Baccarat, Imperial Zafran and Amber Blanc — Caviar Bakhoor, a patent-pending encapsulation technology.",
};

/**
 * /collection — hero, the four cards, the story, then the layout's footer.
 * Server-rendered; the product list is passed down as props from the single
 * data source, so wiring this to Shopify later touches products.ts only.
 */
export default function CollectionPage() {
  return (
    <>
      <CollectionHero products={products} />
      <Catalogue products={products} />
      <Story products={products} />
    </>
  );
}
