"use client";

import { Info } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

import { AnimatedNumber } from "@/components/motion/animated-number";
import { Card } from "@/components/ui/card";
import { cardReveal, transitions } from "@/lib/motion";

export function MetricCard({
  title,
  value,
  helper,
  delta,
  bars,
}: {
  title: string;
  value: number;
  helper: string;
  delta: string;
  bars: number[];
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? undefined : "hidden"}
      animate={reduceMotion ? undefined : "visible"}
      variants={reduceMotion ? undefined : cardReveal}
      whileHover={reduceMotion ? undefined : { y: -3 }}
      transition={reduceMotion ? undefined : transitions.fast}
      className="h-full"
    >
      <Card className="h-full rounded-xl border border-[#2a2a2a] p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#666666]">{title}</p>
            <p className="mt-2 text-2xl font-semibold text-white">
              <AnimatedNumber value={value} />
            </p>
            <p className="mt-1 text-xs text-[#9ca3af]">{helper}</p>
          </div>

          <div className="flex h-10 items-end gap-1">
            {bars.map((height, index) => (
              <motion.span
                key={`${title}-bar-${index}`}
                initial={reduceMotion ? undefined : { height: 0, opacity: 0 }}
                animate={reduceMotion ? undefined : { height: `${height}%`, opacity: 1 }}
                transition={reduceMotion ? undefined : { delay: index * 0.03, duration: 0.22 }}
                className="w-1.5 rounded-sm bg-[#e8822a]"
                style={{ opacity: index < 2 ? 0.4 : 1, height: `${height}%` }}
              />
            ))}
          </div>
        </div>

        <div className="my-3 h-px bg-[#2a2a2a]" />

        <div className="flex items-center justify-between text-xs">
          <span className="inline-flex items-center gap-1 text-[#9ca3af]">
            <Info size={12} />
            {helper}
          </span>
          <span className="font-semibold text-[#4ade80]">{delta}</span>
        </div>
      </Card>
    </motion.div>
  );
}
