import type { Transition, Variants } from "motion/react";

export const standardEase = [0.22, 1, 0.36, 1] as const;
export const gentleEase = [0.16, 1, 0.3, 1] as const;

export const revealTransition: Transition = {
  duration: 0.8,
  ease: standardEase,
};

export const fadeTransition: Transition = {
  duration: 0.55,
  ease: gentleEase,
};

export const staggerParentVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.04,
    },
  },
};

export const staggerChildVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: fadeTransition,
  },
};

export const upwardRevealVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: revealTransition,
  },
};
