"use client";

import {
  motion,
  useReducedMotion,
  type HTMLMotionProps,
  type Variants,
} from "motion/react";
import type { ReactNode } from "react";

import { cn } from "@/lib/cn";
import { gentleEase, standardEase } from "@/lib/motion";

const featureReveal = {
  amount: 0.2,
  margin: "0px 0px -10% 0px",
  once: true,
} as const;

const sectionVariants: Variants = {
  hidden: {
    opacity: 0.16,
    y: 12,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.62,
      ease: gentleEase,
      staggerChildren: 0.065,
      delayChildren: 0.03,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 14,
    scale: 0.988,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.56,
      ease: standardEase,
    },
  },
};

type FeatureGridMotionProps = {
  children: ReactNode;
  className?: string;
} & Omit<HTMLMotionProps<"ul">, "children" | "className" | "role">;

type FeatureGridMotionItemProps = {
  children: ReactNode;
  className?: string;
};

export function FeatureGridMotion({
  children,
  className,
  ...props
}: FeatureGridMotionProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return (
      <ul className={cn(className)} role="list">
        {children}
      </ul>
    );
  }

  return (
    <motion.ul
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={featureReveal}
      variants={sectionVariants}
      role="list"
      {...props}
    >
      {children}
    </motion.ul>
  );
}

export function FeatureGridMotionItem({
  children,
  className,
}: FeatureGridMotionItemProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <li className={cn(className)}>{children}</li>;
  }

  return (
    <motion.li className={cn(className)} variants={itemVariants}>
      {children}
    </motion.li>
  );
}
