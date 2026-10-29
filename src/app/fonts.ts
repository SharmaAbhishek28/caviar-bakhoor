import localFont from "next/font/local";

/**
 * Bodoni Moda — display. Roman and italic both used.
 *
 * Variable on both `opsz` and `wght`. Self-hosted rather than pulled through
 * next/font/google: the subsets Google generated carried malformed glyphs that
 * rendered as ghost outlines on several capitals (A, K, H, E, I, M, N).
 * These are the full upstream variable files, and they render clean.
 */
export const bodoni = localFont({
  src: [
    {
      path: "../fonts/BodoniModa-VariableFont_opsz,wght.woff2",
      weight: "400 900",
      style: "normal",
    },
    {
      path: "../fonts/BodoniModa-Italic-VariableFont_opsz,wght.woff2",
      weight: "400 900",
      style: "italic",
    },
  ],
  variable: "--font-bodoni",
  display: "swap",
  fallback: ["Didot", "Bodoni MT", "Georgia", "serif"],
});

/**
 * Switzer — counterpoint words, labels, body, UI.
 *
 * Two weights only (site owner, 2026-10-24): Regular, and Medium for every
 * heavier use. The Medium file is declared across 500 to 900, so anything
 * set semibold, bold or black in Switzer (labels, buttons, caps subheads,
 * the marquee, <strong> in body) renders Medium, with no faux-bolding.
 */
export const switzer = localFont({
  src: [
    { path: "../fonts/Switzer-Regular.woff2", weight: "400", style: "normal" },
    /* True italics at body weights: without these an <em> in body copy fell
       back to Black Italic, the only italic face loaded, and read as bold. */
    { path: "../fonts/Switzer-Italic.woff2", weight: "400", style: "italic" },
    { path: "../fonts/Switzer-Medium.woff2", weight: "500 900", style: "normal" },
    { path: "../fonts/Switzer-MediumItalic.woff2", weight: "500 900", style: "italic" },
  ],
  variable: "--font-switzer",
  display: "swap",
  fallback: ["system-ui", "Segoe UI", "Helvetica Neue", "Arial", "sans-serif"],
});

/**
 * Monument Extended — the FRAGMENT wordmark in the footer credit, nothing
 * else. A subset holding only those letters (1 KB), the same file the studio
 * uses on its other sites. Not preloaded: it sits at the foot of every page.
 */
export const monument = localFont({
  src: [{ path: "../fonts/MonumentExtended-Fragment.woff2", weight: "400", style: "normal" }],
  variable: "--font-monument",
  display: "swap",
  preload: false,
  fallback: ["Arial Black", "sans-serif"],
});
