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
 * Static weight files, so each weight is declared explicitly: no faux-bolding.
 * Black (900) carries both counterpoint tokens; Regular and Medium carry body
 * and meta.
 */
export const switzer = localFont({
  src: [
    { path: "../fonts/Switzer-Regular.woff2", weight: "400", style: "normal" },
    /* True italics at body weights: without these an <em> in body copy fell
       back to Black Italic, the only italic face loaded, and read as bold. */
    { path: "../fonts/Switzer-Italic.woff2", weight: "400", style: "italic" },
    { path: "../fonts/Switzer-MediumItalic.woff2", weight: "500", style: "italic" },
    { path: "../fonts/Switzer-Medium.woff2", weight: "500", style: "normal" },
    { path: "../fonts/Switzer-Semibold.woff2", weight: "600", style: "normal" },
    { path: "../fonts/Switzer-Black.woff2", weight: "900", style: "normal" },
    {
      path: "../fonts/Switzer-BlackItalic.woff2",
      weight: "900",
      style: "italic",
    },
  ],
  variable: "--font-switzer",
  display: "swap",
  fallback: ["system-ui", "Segoe UI", "Helvetica Neue", "Arial", "sans-serif"],
});
