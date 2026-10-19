import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PolicyPage } from "@/components/policy/PolicyPage";
import { getPolicy, PUBLISHED_POLICIES } from "@/data/policies";

type Params = { policy: string };

/** Only the four policies render here; anything else is a 404. */
export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  // Next needs at least one param with dynamicParams off; an unpublished
  // policy 404s from the page itself.
  const live = PUBLISHED_POLICIES.map((p) => ({ policy: p.slug }));
  return live.length ? live : [{ policy: "shipping" }];
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { policy } = await params;
  const p = getPolicy(policy);
  return p ? { title: `${p.title} | Caviar Bakhoor`, description: `${p.title} policy for Elixir Signature Scents, Caviar Bakhoor.` } : {};
}

export default async function Policy({ params }: { params: Promise<Params> }) {
  const { policy } = await params;
  const p = getPolicy(policy);
  if (!p) notFound();
  return <PolicyPage policy={p} />;
}
