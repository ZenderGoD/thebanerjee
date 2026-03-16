"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "motion/react";

type AnimatedCounterProps = {
  value: string;
  className?: string;
};

function parseNumeric(v: string): { prefix: string; num: number; suffix: string } {
  const match = v.match(/^([^\d]*)([\d.]+)(.*)$/);
  if (!match) return { prefix: "", num: 0, suffix: v };
  return {
    prefix: match[1],
    num: parseFloat(match[2]),
    suffix: match[3],
  };
}

export function AnimatedCounter({ value, className }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const shouldReduce = useReducedMotion();
  const { prefix, num, suffix } = parseNumeric(value);
  const isDecimal = value.includes(".");

  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, {
    stiffness: 60,
    damping: 20,
    mass: 1,
  });

  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (shouldReduce) {
      setDisplay(value);
      return;
    }
    if (isInView) {
      motionVal.set(num);
    }
  }, [isInView, num, motionVal, shouldReduce, value]);

  useEffect(() => {
    if (shouldReduce) return;
    const unsub = spring.on("change", (v: number) => {
      if (isDecimal) {
        setDisplay(`${prefix}${v.toFixed(1)}${suffix}`);
      } else {
        setDisplay(`${prefix}${Math.round(v)}${suffix}`);
      }
    });
    return unsub;
  }, [spring, prefix, suffix, isDecimal, shouldReduce]);

  if (shouldReduce) {
    return <span className={className}>{value}</span>;
  }

  return (
    <motion.span
      ref={ref}
      className={className}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.3 }}
    >
      {display}
    </motion.span>
  );
}
