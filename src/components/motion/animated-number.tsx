"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

export function AnimatedNumber({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) {
  const [display, setDisplay] = useState(0);
  const previous = useRef(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) {
      setDisplay(value);
      previous.current = value;
      return;
    }

    let raf = 0;
    const startedAt = performance.now();
    const from = previous.current;
    const to = value;

    const tick = (t: number) => {
      const progress = Math.min((t - startedAt) / 600, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(from + (to - from) * eased);
      if (progress < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => {
      previous.current = value;
      cancelAnimationFrame(raf);
    };
  }, [value, reduceMotion]);

  const rounded = useMemo(() => Math.round(display), [display]);

  return (
    <motion.span layout className="font-semibold tracking-tight">
      {prefix}
      {rounded.toLocaleString("en-IN")}
      {suffix}
    </motion.span>
  );
}
