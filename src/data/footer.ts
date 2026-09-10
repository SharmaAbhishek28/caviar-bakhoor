/**
 * src/data/footer.ts
 *
 * Footer copy, per docs/homepage.md § 09. The paragraph there reads "...
 * fragrance, encapsulation and packaging, under one roof, since 1937." Both
 * "under one roof" and the founding year carry [CONFIRM] markers, so the
 * line is used up to the claim: what remains is docs/content.md § Elixir's
 * own "builds what it sells", restated.
 */

export const FOOTER = {
  /** Two lines; the last word of the second is set in italic. */
  headline: { first: "Experience", second: "The new", emphasis: "Bakhoor" },
  paragraph:
    "From the first pearl to the finished tin, Elixir makes what it sells.",
  strong: ["first pearl", "finished tin"],
  em: ["makes what it sells"],
  /** The giant clipped wordmark. Lowercase by design. */
  wordmark: "caviar bakhoor",
  house: "Elixir Signature Scents",
};
