import type { Metadata } from "next";
import { NotFoundStage } from "@/components/policy/NotFoundStage";

export const metadata: Metadata = { title: "Nothing here | Caviar Bakhoor" };

/** The 404 — the layout still adds the header and footer around it. */
export default function NotFound() {
  return <NotFoundStage />;
}
