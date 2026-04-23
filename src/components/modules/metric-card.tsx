"use client";

import { ArrowUpRight, Info } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

import { AnimatedNumber } from "@/components/motion/animated-number";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { cardReveal, transitions } from "@/lib/motion";

export function MetricCard({
  title,
  value,
  helper,
  delta,
  bars,
  gradient,
}: {
  title: string;
  value: number;
  helper: string;
  delta: string;
  bars: number[];
  gradient: string;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? undefined : "hidden"}
      animate={reduceMotion ? undefined : "visible"}
      variants={reduceMotion ? undefined : cardReveal}
      whileHover={reduceMotion ? undefined : { y: -4 }}
      transition={reduceMotion ? undefined : transitions.fast}
      className="h-full"
    >
      <Card className={cn("group relative h-full overflow-hidden border border-white/15 p-4", gradient)}>
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_8%_0%,rgba(255,255,255,.24),transparent_28%)] opacity-60" />
        <div className="relative z-10 flex items-start justify-between gap-3">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/65">{title}</p>
            <p className="mt-2 text-[28px] font-semibold leading-none text-white">
              <AnimatedNumber value={value} />
            </p>
            <p className="mt-2 text-xs text-white/70">{helper}</p>
          </div>

          <div className="flex h-10 items-end gap-[3px]">
            {bars.map((height, index) => (
              <motion.span
                key={`${title}-bar-${index}`}
                initial={reduceMotion ? undefined : { height: 0, opacity: 0 }}
                animate={reduceMotion ? undefined : { height: `${height}%`, opacity: 1 }}
                transition={reduceMotion ? undefined : { delay: index * 0.03, duration: 0.22 }}
                className="w-1.5 rounded-sm bg-white/95"
                style={{ opacity: index < 2 ? 0.35 : 0.95, height: `${height}%` }}
              />
            ))}
          </div>
        </div>

        <div className="relative z-10 my-3 h-px bg-white/15" />

        <div className="relative z-10 flex items-center justify-between text-xs">
          <span className="inline-flex items-center gap-1 text-white/70">
            <Info size={12} />
            {helper}
          </span>
          <span className="inline-flex items-center gap-1 font-semibold text-emerald-200">
            {delta}
            <ArrowUpRight size={12} />
          </span>
        </div>
      </Card>
    </motion.div>
  );
}
