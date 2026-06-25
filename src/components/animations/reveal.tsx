"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

import { cn } from "@/lib/cn";
import { revealTransition } from "@/lib/motion";

type RevealProps = {
  children: ReactNode;
  className?: string;
  childClassName?: string;
  delay?: number;
  duration?: number;
  mode?: "in-view" | "mount";
};

export function Reveal({
  children,
  className,
  childClassName,
  delay = 0,
  duration = 0.8,
  mode = "in-view",
}: RevealProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const animationProps =
    mode === "mount"
      ? { animate: { opacity: 1, y: 0 } }
      : {
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.35 },
        };

  return (
    <div className={cn("overflow-hidden", className)}>
      <motion.div
        className={cn(childClassName)}
        initial={{ opacity: 0.78, y: "14%" }}
        transition={{ ...revealTransition, delay, duration }}
        {...animationProps}
      >
        {children}
      </motion.div>
    </div>
  );
}
