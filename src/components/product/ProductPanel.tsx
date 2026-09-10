"use client";

import { useState, type SyntheticEvent } from "react";
import { MarkedProse } from "@/components/ui";
import type { Product } from "@/data/products";
import { addToBag } from "@/lib/cart";
import { formatNotes, formatPrice, formatWeight } from "./format";

/**
 * The floating panel beside the hero stage: name, line, weight, price,
 * Add to bag, then the accordions — native <details>, so keyboard and
 * screen-reader behaviour is the browser's own and nothing needs JS to open.
 *
 * One accordion open at a time: the details share a name, which the
 * platform treats as an exclusive group, and onToggle closes the others for
 * browsers that do not yet.
 *
 * Every fact that is still the client's to confirm renders its [CONFIRM]
 * marker: price, weight, the notes, the delivery policy. The scent copy is
 * the perfumer's proposal and carries data-confirm, as everywhere else.
 */
export function ProductPanel({ product }: { product: Product }) {
  const [bag, setBag] = useState<"idle" | "adding" | "added">("idle");

  function onToggle(e: SyntheticEvent<HTMLDetailsElement>) {
    const el = e.currentTarget;
    if (!el.open) return;
    el.parentElement
      ?.querySelectorAll<HTMLDetailsElement>("details[open]")
      .forEach((d) => {
        if (d !== el) d.open = false;
      });
  }

  async function onAdd() {
    setBag("adding");
    const r = await addToBag(product.handle);
    setBag(r.ok ? "added" : "idle");
    if (r.ok) setTimeout(() => setBag("idle"), 2000);
  }

  return (
    <aside className="pdp-panel" aria-label={`${product.title} details`}>
      <header className="pdp-panel-head">
        <div>
          <h1 className="pdp-title">{product.title}</h1>
          <p className="pdp-line">{product.subtitle}</p>
        </div>
        <p className="pdp-weight">{formatWeight(product)}</p>
      </header>

      <div className="pdp-buy">
        <span className="pdp-price">{formatPrice(product)}</span>
        <button
          type="button"
          className="pdp-add"
          onClick={onAdd}
          disabled={bag === "adding"}
        >
          {bag === "added" ? "Added to bag" : bag === "adding" ? "Adding…" : "Add to bag"}
        </button>
      </div>

      <details className="pdp-acc" name="pdp-accordion" onToggle={onToggle} open>
        <summary>The scent</summary>
        <MarkedProse className="pdp-acc-body" text={product.description} />
      </details>

      <details className="pdp-acc" name="pdp-accordion" onToggle={onToggle}>
        <summary>Notes</summary>
        <dl className="pdp-notes">
          <dt>Top</dt>
          <dd>{formatNotes(product.notes.top)}</dd>
          <dt>Heart</dt>
          <dd>{formatNotes(product.notes.heart)}</dd>
          <dt>Base</dt>
          <dd>{formatNotes(product.notes.base)}</dd>
        </dl>
      </details>

      <details className="pdp-acc" name="pdp-accordion" onToggle={onToggle}>
        <summary>In the box</summary>
        <ul className="pdp-list">
          {product.inTheBox.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </details>

      <details className="pdp-acc" name="pdp-accordion" onToggle={onToggle}>
        <summary>Delivery &amp; returns</summary>
        <p className="pdp-acc-body">
          [CONFIRM] Shipping regions, timings, costs and the returns policy are
          the client&rsquo;s to supply. Nothing is stated here until they do.
        </p>
      </details>
    </aside>
  );
}
