"use client";

import { useEffect, useState } from "react";
import { useDesignLayers, type DesignLayers } from "./DesignLayerProvider";
import { cn } from "@/lib/utils";

const STYLE_LAYERS: { key: keyof DesignLayers; label: string; abbr: string }[] = [
  { key: "brutal", label: "Neobrutalism", abbr: "B" },
  { key: "neu", label: "Neumorphism", abbr: "N" },
  { key: "skeu", label: "Skeuomorphism", abbr: "S" },
];

export function DesignLayerToggle() {
  const { layers, toggle } = useDesignLayers();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const containerClass = layers.manga
    ? "flex items-center gap-0.5 border-2 border-[#111] bg-[#faf7f0] p-0.5 dark:border-[#d4d0c8] dark:bg-[#222]"
    : "portfolio-inset flex items-center gap-0.5 p-1";

  if (!mounted) {
    return (
      <div className={containerClass}>
        {[...STYLE_LAYERS, { key: "manga" as const, abbr: "M" }].map((l) => (
          <div key={l.key} className={cn("h-7 w-7", layers.manga ? "rounded-none" : "rounded-full")} />
        ))}
      </div>
    );
  }

  return (
    <div className={containerClass} role="group" aria-label="Design layer toggles">
      {STYLE_LAYERS.map((l) => {
        const active = layers[l.key];
        return (
          <button
            key={l.key}
            onClick={() => toggle(l.key)}
            aria-pressed={active}
            aria-label={`${active ? "Disable" : "Enable"} ${l.label}`}
            title={l.label}
            className={cn(
              "relative flex h-7 w-7 items-center justify-center text-[11px] font-bold transition-all duration-200",
              layers.manga ? "rounded-none" : "rounded-full",
              layers.manga && "opacity-30 pointer-events-none",
              active
                ? "bg-[var(--accent-blue)] text-white shadow-[0_0_0_3px_rgba(77,130,255,0.18)]"
                : "bg-transparent text-muted-foreground hover:bg-[var(--outline)]"
            )}
          >
            {l.abbr}
          </button>
        );
      })}

      <div className={cn("mx-0.5 h-4 w-px", layers.manga ? "bg-[#111] dark:bg-[#d4d0c8]" : "bg-[var(--outline)]")} />

      <button
        onClick={() => toggle("manga")}
        aria-pressed={layers.manga}
        aria-label={`${layers.manga ? "Disable" : "Enable"} Neo-Mangaism`}
        title="Neo-Mangaism"
        className={cn(
          "relative flex h-7 w-7 items-center justify-center text-[11px] font-bold transition-all duration-200",
          layers.manga ? "rounded-none" : "rounded-full",
          layers.manga
            ? "bg-red-500 text-white shadow-[0_0_0_2px_rgba(239,68,68,0.3)]"
            : "bg-transparent text-muted-foreground hover:bg-[var(--outline)]"
        )}
      >
        M
      </button>
    </div>
  );
}
