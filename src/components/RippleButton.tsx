"use client";

import React, { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

type RippleTarget = HTMLElement;

type RippleButtonProps = {
  rippleColor?: string;
  duration?: number;
  as?: "button" | "a";
} & React.ButtonHTMLAttributes<HTMLButtonElement> &
  React.AnchorHTMLAttributes<HTMLAnchorElement>;

type Ripple = { x: number; y: number; size: number; key: number };

const RippleButton = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  RippleButtonProps
>(
  (
    {
      className,
      children,
      rippleColor = "#ffffff",
      duration = 600,
      onClick,
      as = "button",
      ...props
    },
    ref,
  ) => {
    const [ripples, setRipples] = useState<Ripple[]>([]);

    const createRipple = (event: React.MouseEvent<RippleTarget> | React.TouchEvent<RippleTarget>) => {
      const target = event.currentTarget as RippleTarget;
      const rect = target.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);

      let clientX: number, clientY: number;
      if ('touches' in event && event.touches.length > 0) {
        // Touch event
        clientX = event.touches[0].clientX;
        clientY = event.touches[0].clientY;
      } else if ('clientX' in event) {
        // Mouse event
        clientX = event.clientX;
        clientY = event.clientY;
      } else {
        return;
      }

      const x = clientX - rect.left - size / 2;
      const y = clientY - rect.top - size / 2;

      const newRipple: Ripple = { x, y, size, key: Date.now() };
      setRipples((prev) => [...prev, newRipple]);
    };

    const handleClick = (event: React.MouseEvent<RippleTarget>) => {
      createRipple(event);
      onClick?.(event as unknown as React.MouseEvent<HTMLButtonElement>);
    };

    const handleTouchStart = (event: React.TouchEvent<RippleTarget>) => {
      createRipple(event);
    };

    useEffect(() => {
      if (!ripples.length) return;
      const last = ripples[ripples.length - 1];
      const timer = setTimeout(() => {
        setRipples((prev) => prev.filter((ripple) => ripple.key !== last.key));
      }, duration);
      return () => clearTimeout(timer);
    }, [ripples, duration]);

    const componentProps = props as any;

    if (as === "a") {
      return (
        <a
          className={cn(
            "relative inline-flex items-center justify-center overflow-hidden rounded-full border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-semibold text-zinc-100 transition hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30",
            className,
          )}
          onClick={handleClick}
          onTouchStart={handleTouchStart}
          ref={ref as React.Ref<HTMLAnchorElement>}
          {...(componentProps as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          <span className="relative z-10">{children}</span>
          <span className="pointer-events-none absolute inset-0">
            {ripples.map((ripple) => (
              <span
                key={ripple.key}
                className="animate-rippling absolute rounded-full opacity-30"
                style={{
                  width: `${ripple.size}px`,
                  height: `${ripple.size}px`,
                  top: `${ripple.y}px`,
                  left: `${ripple.x}px`,
                  backgroundColor: rippleColor,
                  animationDuration:
                    typeof duration === "number" ? `${duration}ms` : duration,
                  transform: "scale(0)",
                }}
              />
            ))}
          </span>
        </a>
      );
    }

    return (
      <button
        className={cn(
          "relative inline-flex items-center justify-center overflow-hidden rounded-full border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-semibold text-zinc-100 transition hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30",
          className,
        )}
        onClick={handleClick}
        onTouchStart={handleTouchStart}
        ref={ref as React.Ref<HTMLButtonElement>}
        type="button"
        {...(componentProps as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        <span className="relative z-10">{children}</span>
        <span className="pointer-events-none absolute inset-0">
          {ripples.map((ripple) => (
            <span
              key={ripple.key}
              className="animate-rippling absolute rounded-full opacity-30"
              style={{
                width: `${ripple.size}px`,
                height: `${ripple.size}px`,
                top: `${ripple.y}px`,
                left: `${ripple.x}px`,
                backgroundColor: rippleColor,
                animationDuration:
                  typeof duration === "number" ? `${duration}ms` : duration,
                transform: "scale(0)",
              }}
            />
          ))}
        </span>
      </button>
    );
  },
);

RippleButton.displayName = "RippleButton";

export default RippleButton;


