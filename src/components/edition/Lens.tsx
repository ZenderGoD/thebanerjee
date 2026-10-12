"use client";

import { useEffect, useRef } from "react";
import type { StaticImageData } from "next/image";
import { DepthPlate } from "./DepthPlate";
import { gsap } from "gsap";

const SIZE = 220;
const ZOOM = 2.6;

// A magnifying glass over an engraving: it follows a fine pointer and shows the plate up close.
// Touch screens and reduced motion get the plate alone.
export function Lens({
  src,
  depthMap,
  alt,
  className,
  depth,
}: {
  src: StaticImageData;
  depthMap: string;
  alt: string;
  className?: string;
  depth?: number;
}) {
  const wrap = useRef<HTMLDivElement>(null);
  const glass = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wrap.current;
    const lens = glass.current;
    if (!el || !lens) return;
    const mm = gsap.matchMedia();
    mm.add("(pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
      const x = gsap.quickTo(lens, "x", { duration: 0.35, ease: "power3.out" });
      const y = gsap.quickTo(lens, "y", { duration: 0.35, ease: "power3.out" });
      const move = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        const px = e.clientX - r.left;
        const py = e.clientY - r.top;
        x(px - SIZE / 2);
        y(py - SIZE / 2);
        lens.style.backgroundSize = `${r.width * ZOOM}px ${r.height * ZOOM}px`;
        lens.style.backgroundPosition = `${-(px * ZOOM - SIZE / 2)}px ${-(py * ZOOM - SIZE / 2)}px`;
      };
      const enter = () => gsap.to(lens, { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.6)" });
      const leave = () => gsap.to(lens, { scale: 0.4, opacity: 0, duration: 0.3, ease: "power2.in" });
      el.addEventListener("pointermove", move);
      el.addEventListener("pointerenter", enter);
      el.addEventListener("pointerleave", leave);
      return () => {
        el.removeEventListener("pointermove", move);
        el.removeEventListener("pointerenter", enter);
        el.removeEventListener("pointerleave", leave);
      };
    });
    return () => mm.revert();
  }, []);

  return (
    <div ref={wrap} className={`relative bg-paper ${className ?? ""}`} data-flea data-depth={depth}>
      <DepthPlate src={src} depth={depthMap} alt={alt} sizes="(min-width: 768px) 46vw, 100vw" strength={0.08} />
      <div
        ref={glass}
        aria-hidden
        className="pointer-events-none absolute top-0 left-0 hidden scale-[0.4] rounded-full border-[1.5px] border-ink bg-paper opacity-0 shadow-[6px_6px_0_var(--color-ink)] [@media(pointer:fine)]:block"
        style={{
          width: SIZE,
          height: SIZE,
          backgroundImage: `url(${src.src})`,
          backgroundRepeat: "no-repeat",
          backgroundBlendMode: "multiply",
          filter: "grayscale(1) contrast(1.08)",
        }}
      />
    </div>
  );
}
