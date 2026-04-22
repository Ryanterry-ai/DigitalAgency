"use client";

import { motion, useReducedMotion } from "framer-motion";

import { AnimatedNumber } from "@/components/motion/animated-number";
import { Card } from "@/components/ui/card";
import { cardReveal, transitions } from "@/lib/motion";

export function MetricCard({
  title,
  value,
  helper,
  icon,
  accent,
}: {
  title: string;
  value: number;
  helper: string;
  icon: React.ReactNode;
  accent: string;
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
      <Card className="h-full p-4 transition-shadow duration-200 hover:shadow-[0_14px_34px_rgba(15,23,42,.10)]">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-500">{title}</p>
            <p className="mt-2 text-2xl font-bold text-slate-900">
              <AnimatedNumber value={value} />
            </p>
            <p className="mt-1 text-xs text-slate-500">{helper}</p>
          </div>
          <div className="rounded-xl p-2" style={{ backgroundColor: `${accent}15`, color: accent }}>
            {icon}
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
