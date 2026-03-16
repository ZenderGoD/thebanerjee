"use client";

import { useTheme } from "next-themes";
import { useCallback, useEffect, useRef, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useDesignLayers } from "./DesignLayerProvider";
import { cn } from "@/lib/utils";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const { layers } = useDesignLayers();
  const [mounted, setMounted] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => setMounted(true), []);

  const toggle = useCallback(() => {
    const next = resolvedTheme === "dark" ? "light" : "dark";

    if (
      buttonRef.current &&
      typeof document.startViewTransition === "function"
    ) {
      const { top, left, width, height } =
        buttonRef.current.getBoundingClientRect();
      const x = left + width / 2;
      const y = top + height / 2;
      const maxRadius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y),
      );

      const transition = document.startViewTransition(() => {
        setTheme(next);
      });

      transition.ready
        .then(() => {
          document.documentElement.animate(
            {
              clipPath: [
                `circle(0px at ${x}px ${y}px)`,
                `circle(${maxRadius}px at ${x}px ${y}px)`,
              ],
            },
            {
              duration: 500,
              easing: "cubic-bezier(0.22, 1, 0.36, 1)",
              pseudoElement: "::view-transition-new(root)",
            },
          );
        })
        .catch(() => {});
    } else {
      setTheme(next);
    }
  }, [resolvedTheme, setTheme]);

  const btnClass = layers.manga
    ? "flex h-8 w-8 items-center justify-center border-2 border-[#111] bg-[#faf7f0] text-foreground transition-transform hover:-translate-y-0.5 dark:border-[#d4d0c8] dark:bg-[#222]"
    : "portfolio-btn-neo portfolio-btn-neo-icon text-foreground";

  if (!mounted) {
    return (
      <button className={btnClass} aria-label="Toggle theme">
        <div className="h-4 w-4" />
      </button>
    );
  }

  return (
    <button
      ref={buttonRef}
      onClick={toggle}
      className={cn(btnClass, "relative")}
      aria-label={`Switch to ${resolvedTheme === "dark" ? "light" : "dark"} mode`}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={resolvedTheme}
          initial={{ rotate: -90, scale: 0, opacity: 0 }}
          animate={{ rotate: 0, scale: 1, opacity: 1 }}
          exit={{ rotate: 90, scale: 0, opacity: 0 }}
          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center justify-center"
        >
          {resolvedTheme === "dark" ? (
            <Sun className="h-4 w-4" />
          ) : (
            <Moon className="h-4 w-4" />
          )}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
