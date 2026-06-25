"use client";

import {
  motion,
  useReducedMotion,
  type HTMLMotionProps,
} from "motion/react";
import type { ReactNode } from "react";

import { cn } from "@/lib/cn";
import {
  staggerChildVariants as defaultChildVariants,
  staggerParentVariants,
} from "@/lib/motion";

type StaggerGroupProps = {
  children: ReactNode;
  className?: string;
  once?: boolean;
  staggerDelay?: number;
} & Omit<HTMLMotionProps<"div">, "children" | "className">;

type StaggerItemProps = {
  children: ReactNode;
  className?: string;
} & Omit<HTMLMotionProps<"div">, "children" | "className" | "variants">;

export function StaggerGroup({
  children,
  className,
  once = true,
  staggerDelay = 0.12,
  ...props
}: StaggerGroupProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.2 }}
      variants={{
        ...staggerParentVariants,
        visible: {
          transition: { staggerChildren: staggerDelay, delayChildren: 0.04 },
        },
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  ...props
}: StaggerItemProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div className={cn(className)} variants={defaultChildVariants} {...props}>
      {children}
    </motion.div>
  );
}

export { defaultChildVariants as staggerChildVariants };
