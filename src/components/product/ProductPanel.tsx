"use client";

import { useState, type SyntheticEvent } from "react";
import { MarkedProse } from "@/components/ui";
import type { Product } from "@/data/products";
import { addToBag } from "@/lib/cart";
import { formatPrice, formatWeight } from "./format";

/**
 * The floating panel beside the hero stage: the name, the line, the price
 * and Add to bag, then two accordions — the scent, and what is in the box.
 * Native <details>, so keyboard and screen-reader behaviour is the
 * browser's own and nothing needs JS to open.
 *
 * Kept deliberately short (site owner, 2026-10-17): no notes pyramid, no
 * delivery policy, and nothing the home page already explains. Price and
 * weight render only once the client has supplied them.
 *
 * One accordion open at a time: the details share a name, which the
 * platform treats as an exclusive group, and onToggle closes the others for
 * browsers that do not yet.
 */
export function ProductPanel({ product }: { product: Product }) {
  const [bag, setBag] = useState<"idle" | "adding" | "added">("idle");
  const price = formatPrice(product);
  const weight = formatWeight(product);

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
          <p className="pdp-line">Caviar Bakhoor</p>
        </div>
        {weight ? <p className="pdp-weight">{weight}</p> : null}
      </header>

      <div className="pdp-buy">
        {/* No price yet: no placeholder, so the button sits on the left. */}
        {price ? <span className="pdp-price">{price}</span> : null}
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
        <MarkedProse className="pdp-acc-body" text={product.longDescription ?? product.description} />
      </details>

      <details className="pdp-acc" name="pdp-accordion" onToggle={onToggle}>
        <summary>In the box</summary>
        <ul className="pdp-list pdp-list--caps">
          {product.inTheBox.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </details>
    </aside>
  );
}
