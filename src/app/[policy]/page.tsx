import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PolicyPage } from "@/components/policy/PolicyPage";
import { getPolicy, POLICIES } from "@/data/policies";

type Params = { policy: string };

/** Only the four policies render here; anything else is a 404. */
export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return POLICIES.map((p) => ({ policy: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { policy } = await params;
  const p = getPolicy(policy);
  return p ? { title: `${p.title} | Caviar Bakhoor`, description: `${p.title} policy — Elixir Signature Scents, Caviar de Parfum.` } : {};
}

export default async function Policy({ params }: { params: Promise<Params> }) {
  const { policy } = await params;
  const p = getPolicy(policy);
  if (!p) notFound();
  return <PolicyPage policy={p} />;
}
