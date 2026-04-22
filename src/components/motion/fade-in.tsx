"use client";

import { motion, useReducedMotion } from "framer-motion";
import { MOTION, transitions } from "@/lib/motion";

export function FadeIn({
  children,
  delay = 0,
  distance = 10,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  distance?: number;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: distance }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...transitions.base, duration: MOTION.base, delay }}
    >
      {children}
    </motion.div>
  );
}
