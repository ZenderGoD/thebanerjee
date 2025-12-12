"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { flushSync } from "react-dom";

import { cn } from "@/lib/utils";

export interface AnimatedThemeTogglerProps
  extends React.ComponentPropsWithoutRef<"button"> {
  duration?: number;
}

export function AnimatedThemeToggler({
  className,
  duration = 400,
  ...props
}: AnimatedThemeTogglerProps) {
  const [isDark, setIsDark] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem("theme") : null;
    const prefersDark = stored ? stored === "dark" : document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", prefersDark);
    setIsDark(prefersDark);

    const updateTheme = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };

    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  const animateTransition = useCallback(
    (applyTheme: () => void) => {
      const startViewTransition = document.startViewTransition;
      if (!buttonRef.current || typeof startViewTransition !== "function") {
        applyTheme();
        return;
      }

      const { top, left, width, height } = buttonRef.current.getBoundingClientRect();
      const x = left + width / 2;
      const y = top + height / 2;
      const maxRadius = Math.hypot(
        Math.max(left, window.innerWidth - left),
        Math.max(top, window.innerHeight - top),
      );

      const transition = startViewTransition(() => {
        applyTheme();
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
              duration,
              easing: "ease-in-out",
              pseudoElement: "::view-transition-new(root)",
            },
          );
        })
        .catch(() => {
          applyTheme();
        });
    },
    [duration],
  );

  const toggleTheme = useCallback(() => {
    const nextIsDark = !isDark;

    const applyTheme = () => {
      flushSync(() => {
        setIsDark(nextIsDark);
        document.documentElement.classList.toggle("dark", nextIsDark);
        localStorage.setItem("theme", nextIsDark ? "dark" : "light");
      });
    };

    animateTransition(applyTheme);
  }, [animateTransition, isDark]);

  return (
    <button
      ref={buttonRef}
      onClick={toggleTheme}
      className={cn(
        "inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-zinc-100 transition hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40",
        className,
      )}
      aria-label="Toggle theme"
      {...props}
    >
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}

export default AnimatedThemeToggler;


