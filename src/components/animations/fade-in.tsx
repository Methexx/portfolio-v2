"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

import { cn } from "@/lib/cn";
import { fadeTransition } from "@/lib/motion";

type FadeInProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  once?: boolean;
};

export function FadeIn({
  children,
  className,
  delay = 0,
  duration = 0.55,
  once = true,
}: FadeInProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0.72, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.24 }}
      transition={{
        ...fadeTransition,
        delay,
        duration,
      }}
    >
      {children}
    </motion.div>
  );
}
