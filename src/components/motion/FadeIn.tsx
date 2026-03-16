"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

type FadeInProps = {
  children: ReactNode;
  delay?: number;
  duration?: number;
  y?: number;
  className?: string;
  once?: boolean;
};

export function FadeIn({
  children,
  delay = 0,
  duration = 0.6,
  y = 24,
  className,
  once = true,
}: FadeInProps) {
  const shouldReduce = useReducedMotion();

  if (shouldReduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y, filter: "blur(4px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      viewport={{ once, margin: "-60px" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
