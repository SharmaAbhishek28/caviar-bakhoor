"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { Product } from "@/data/products";
import { addToBag } from "@/lib/cart";
import { formatPrice, formatWeight } from "./format";

/**
 * The sticky bar along the bottom: thumbnail, name, weight, price and Add
 * to bag. Appears once the hero has scrolled away and leaves as the footer
 * arrives, so it is never over either. Positions are read on scroll
 * (rAF-throttled) rather than observed, because the hero is inside a
 * ScrollTrigger pin-spacer and its rect, not its intersection, is what
 * tells us when it is gone.
 */
export function BuyBar({ product }: { product: Product }) {
  const [shown, setShown] = useState(false);
  const [bag, setBag] = useState<"idle" | "adding" | "added">("idle");

  useEffect(() => {
    const hero = document.querySelector<HTMLElement>(".pdp-hero");
    const footer = document.querySelector<HTMLElement>(".footer");
    if (!hero || !footer) return;
    let raf = 0;
    const check = () => {
      raf = 0;
      const heroGone = hero.getBoundingClientRect().bottom <= 0;
      const footerIn = footer.getBoundingClientRect().top < window.innerHeight;
      setShown(heroGone && !footerIn);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(check); };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    check();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  async function onAdd() {
    setBag("adding");
    const r = await addToBag(product.handle);
    setBag(r.ok ? "added" : "idle");
    if (r.ok) setTimeout(() => setBag("idle"), 2000);
  }

  const thumb = product.images[0];

  return (
    <div className="pdp-bar" data-shown={shown || undefined} aria-hidden={!shown}>
      <div className="pdp-bar-inner">
        <div className="pdp-bar-product">
          <Image src={thumb.src} alt="" width={thumb.width} height={thumb.height} sizes="72px" className="pdp-bar-thumb" />
          <div>
            <p className="pdp-bar-title">{product.title}</p>
            <p className="pdp-bar-meta">{formatWeight(product)}</p>
          </div>
        </div>
        <div className="pdp-bar-buy">
          <span className="pdp-bar-price">{formatPrice(product)}</span>
          <button type="button" className="pdp-add" onClick={onAdd} disabled={bag === "adding"} tabIndex={shown ? 0 : -1}>
            {bag === "added" ? "Added to bag" : bag === "adding" ? "Adding…" : "Add to bag"}
          </button>
        </div>
      </div>
    </div>
  );
}
