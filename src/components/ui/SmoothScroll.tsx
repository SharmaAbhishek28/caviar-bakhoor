"use client";

import { useEffect } from "react";
import { startSmoothScroll } from "@/lib/scroll";

/**
 * Starts Lenis for the whole page. Mounted once in the root layout.
 *
 * Renders nothing — it exists so the smooth-scroll lifecycle is owned by one
 * place rather than by whichever section happens to load first. Under
 * prefers-reduced-motion startSmoothScroll is a no-op and native scrolling is
 * left alone.
 */
export function SmoothScroll() {
  useEffect(() => startSmoothScroll(), []);
  return null;
}
