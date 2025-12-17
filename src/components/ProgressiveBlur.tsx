"use client";

import React, { useEffect, useMemo, useState } from "react";

import { cn } from "@/lib/utils";

export interface ProgressiveBlurProps {
  className?: string;
  height?: string;
  position?: "top" | "bottom" | "both";
  blurLevels?: number[];
  children?: React.ReactNode;
  hideOnEdges?: boolean;
}

export function ProgressiveBlur({
  className,
  height = "30%",
  position = "bottom",
  blurLevels = [0.5, 1, 2, 4, 8, 16, 32, 64],
  hideOnEdges = true,
  children,
}: ProgressiveBlurProps) {
  // Detect mobile device and reduce blur levels for better performance
  const isMobile = useMemo(() => {
    if (typeof window === "undefined") return false;
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    ) || window.innerWidth < 768;
  }, []);

  // Reduce blur levels on mobile (use every other level)
  const optimizedBlurLevels = useMemo(() => {
    if (isMobile && blurLevels.length > 4) {
      // Take first 2, then every other level
      const reduced = [blurLevels[0], blurLevels[1]];
      for (let i = 3; i < blurLevels.length; i += 2) {
        reduced.push(blurLevels[i]);
      }
      return reduced;
    }
    return blurLevels;
  }, [isMobile, blurLevels]);

  const layers = Array.from({ length: Math.max(optimizedBlurLevels.length - 2, 0) });
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (!hideOnEdges || typeof window === "undefined") return;

    let frame = 0;
    const update = () => {
      const scrollTop =
        window.scrollY || document.documentElement.scrollTop || 0;
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;

      let shouldShow = true;
      if (position === "top") {
        shouldShow = scrollTop > 4;
      } else if (position === "bottom") {
        shouldShow = scrollTop < maxScroll - 4;
      }
      setVisible(shouldShow);
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
    };
  }, [hideOnEdges, position]);

  return (
    <div
      className={cn(
        "gradient-blur pointer-events-none absolute inset-x-0 z-10",
        className,
        position === "top"
          ? "top-0"
          : position === "bottom"
            ? "bottom-0"
            : "inset-y-0",
      )}
      style={{
        height: position === "both" ? "100%" : height,
        opacity: visible ? 1 : 0,
        transition: "opacity 180ms ease-in-out",
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          zIndex: 1,
          backdropFilter: `blur(${optimizedBlurLevels[0]}px)`,
          WebkitBackdropFilter: `blur(${optimizedBlurLevels[0]}px)`,
          maskImage:
            position === "bottom"
              ? `linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 12.5%, rgba(0,0,0,1) 25%, rgba(0,0,0,0) 37.5%)`
              : position === "top"
                ? `linear-gradient(to top, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 12.5%, rgba(0,0,0,1) 25%, rgba(0,0,0,0) 37.5%)`
                : `linear-gradient(rgba(0,0,0,0) 0%, rgba(0,0,0,1) 5%, rgba(0,0,0,1) 95%, rgba(0,0,0,0) 100%)`,
          WebkitMaskImage:
            position === "bottom"
              ? `linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 12.5%, rgba(0,0,0,1) 25%, rgba(0,0,0,0) 37.5%)`
              : position === "top"
                ? `linear-gradient(to top, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 12.5%, rgba(0,0,0,1) 25%, rgba(0,0,0,0) 37.5%)`
                : `linear-gradient(rgba(0,0,0,0) 0%, rgba(0,0,0,1) 5%, rgba(0,0,0,1) 95%, rgba(0,0,0,0) 100%)`,
        }}
      />

      {layers.map((_, index) => {
        const blurIndex = index + 1;
        const totalLayers = optimizedBlurLevels.length;
        const segmentSize = 100 / totalLayers;
        const startPercent = blurIndex * segmentSize;
        const midPercent = (blurIndex + 1) * segmentSize;
        const endPercent = (blurIndex + 2) * segmentSize;

        const maskGradient =
          position === "bottom"
            ? `linear-gradient(to bottom, rgba(0,0,0,0) ${startPercent}%, rgba(0,0,0,1) ${midPercent}%, rgba(0,0,0,1) ${endPercent}%, rgba(0,0,0,0) ${endPercent + segmentSize}%)`
            : position === "top"
              ? `linear-gradient(to top, rgba(0,0,0,0) ${startPercent}%, rgba(0,0,0,1) ${midPercent}%, rgba(0,0,0,1) ${endPercent}%, rgba(0,0,0,0) ${endPercent + segmentSize}%)`
              : `linear-gradient(rgba(0,0,0,0) 0%, rgba(0,0,0,1) 5%, rgba(0,0,0,1) 95%, rgba(0,0,0,0) 100%)`;

        return (
          <div
            key={`blur-${index}`}
            className="absolute inset-0"
            style={{
              zIndex: index + 2,
              backdropFilter: `blur(${optimizedBlurLevels[blurIndex]}px)`,
              WebkitBackdropFilter: `blur(${optimizedBlurLevels[blurIndex]}px)`,
              maskImage: maskGradient,
              WebkitMaskImage: maskGradient,
            }}
          />
        );
      })}

      <div
        className="absolute inset-0"
        style={{
          zIndex: optimizedBlurLevels.length,
          backdropFilter: `blur(${optimizedBlurLevels[optimizedBlurLevels.length - 1]}px)`,
          WebkitBackdropFilter: `blur(${optimizedBlurLevels[optimizedBlurLevels.length - 1]}px)`,
          maskImage:
            position === "bottom"
              ? `linear-gradient(to bottom, rgba(0,0,0,0) 87.5%, rgba(0,0,0,1) 100%)`
              : position === "top"
                ? `linear-gradient(to top, rgba(0,0,0,0) 87.5%, rgba(0,0,0,1) 100%)`
                : `linear-gradient(rgba(0,0,0,0) 0%, rgba(0,0,0,1) 5%, rgba(0,0,0,1) 95%, rgba(0,0,0,0) 100%)`,
          WebkitMaskImage:
            position === "bottom"
              ? `linear-gradient(to bottom, rgba(0,0,0,0) 87.5%, rgba(0,0,0,1) 100%)`
              : position === "top"
                ? `linear-gradient(to top, rgba(0,0,0,0) 87.5%, rgba(0,0,0,1) 100%)`
                : `linear-gradient(rgba(0,0,0,0) 0%, rgba(0,0,0,1) 5%, rgba(0,0,0,1) 95%, rgba(0,0,0,0) 100%)`,
        }}
      />

      {children}
    </div>
  );
}


