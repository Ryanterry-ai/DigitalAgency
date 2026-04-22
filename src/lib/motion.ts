import type { Transition, Variants } from "framer-motion";

export const MOTION = {
  fast: 0.16,
  base: 0.24,
  slow: 0.34,
  stagger: 0.045,
  ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
};

export const transitions: Record<"fast" | "base" | "slow", Transition> = {
  fast: { duration: MOTION.fast, ease: MOTION.ease },
  base: { duration: MOTION.base, ease: MOTION.ease },
  slow: { duration: MOTION.slow, ease: MOTION.ease },
};

export const fadeSlideIn: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: transitions.base },
};

export const cardReveal: Variants = {
  hidden: { opacity: 0, y: 12, scale: 0.99 },
  visible: { opacity: 1, y: 0, scale: 1, transition: transitions.base },
};

export const drawerMotion = {
  overlay: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: transitions.fast },
    exit: { opacity: 0, transition: transitions.fast },
  },
  panel: {
    hidden: { opacity: 0, x: -28 },
    visible: { opacity: 1, x: 0, transition: transitions.base },
    exit: { opacity: 0, x: -20, transition: transitions.fast },
  },
};
