"use client";

import { useEffect, useRef, useState } from "react";

/**
 * "Website by FRAGMENT", held at low opacity. With a mouse it lights up on
 * hover (CSS); on touch screens, which have no hover, it lights up while it
 * is fully in view and dims again when scrolled away.
 */
export function FooterCredit({ by, studio, href }: { by: string; studio: string; href: string }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(hover: hover)").matches) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 1 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener"
      className="footer-credit-link"
      data-inview={inView || undefined}
    >
      <span>{by}</span>
      <span className="footer-credit-mark">{studio}</span>
    </a>
  );
}
