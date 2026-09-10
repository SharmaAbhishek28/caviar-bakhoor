import Image from "next/image";
import type { ReactNode } from "react";

/**
 * Full-bleed photography on --ash. Explicit width/height on every image, per
 * the performance budget — no CLS.
 *
 * `children` render bottom-left over a scrim, so a caption keeps its contrast
 * wherever the crop lands. `zoom` opts the image into the hero's settle.
 */
export function DarkPanel({
  src,
  alt,
  width,
  height,
  children,
  minHeight = "clamp(20rem, 55vw, 48rem)",
  priority = false,
  zoom = false,
  className = "",
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  children?: ReactNode;
  minHeight?: string;
  priority?: boolean;
  zoom?: boolean;
  className?: string;
}) {
  return (
    <div className={`on-ash relative overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes="100vw"
        priority={priority}
        className={`w-full${zoom ? " hero-zoom" : ""}`}
        style={{
          display: "block",
          height: minHeight,
          objectFit: "cover",
          objectPosition: "center",
        }}
      />
      {children ? (
        <div
          className="pointer-events-none absolute inset-0 flex flex-col justify-end gap-3"
          style={{
            padding: "clamp(1.5rem, 5vw, 4rem)",
            background:
              "linear-gradient(to top, rgb(8 7 10 / 0.85) 0%, rgb(8 7 10 / 0.4) 25%, transparent 55%)",
          }}
        >
          {children}
        </div>
      ) : null}
    </div>
  );
}
