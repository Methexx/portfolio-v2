"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import type { ReactNode } from "react";

import { cn } from "@/lib/cn";
import { standardEase } from "@/lib/motion";

const heroTimings = {
  announcementDelay: 0.16,
  headingDelay: 0.26,
  headingLineStagger: 0.1,
  paragraphDelay: 0.56,
  actionsDelay: 0.72,
  secondaryActionDelay: 0.07,
  stageDelay: 0.78,
  glowDelay: 0.08,
} as const;

const heroVariants = {
  announcement: {
    hidden: { opacity: 0.38, y: 12, scale: 0.985 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.58,
        delay: heroTimings.announcementDelay,
        ease: standardEase,
      },
    },
  },
  paragraph: {
    hidden: { opacity: 0.48, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.58,
        delay: heroTimings.paragraphDelay,
        ease: standardEase,
      },
    },
  },
  actions: {
    hidden: {},
    visible: {
      transition: {
        delayChildren: heroTimings.actionsDelay,
        staggerChildren: heroTimings.secondaryActionDelay,
      },
    },
  },
  actionItem: {
    hidden: { opacity: 0.52, y: 14 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.54,
        ease: standardEase,
      },
    },
  },
  stage: {
    hidden: { opacity: 0.32, y: 64, scale: 0.972 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 1.05,
        delay: heroTimings.stageDelay,
        ease: standardEase,
      },
    },
  },
  glow: {
    hidden: { opacity: 0.62, scale: 0.97 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1.45,
        delay: heroTimings.glowDelay,
        ease: standardEase,
      },
    },
  },
} satisfies Record<string, Variants>;

type WrapperProps = {
  children: ReactNode;
  className?: string;
};

type HeadingRevealProps = {
  className?: string;
  desktopDuplicateClassName?: string;
  lineClassName?: string;
  lines: readonly string[];
};

export function HeroGlowEntrance({ children, className }: WrapperProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="visible"
      variants={heroVariants.glow}
    >
      {children}
    </motion.div>
  );
}

export function HeroAnnouncementEntrance({
  children,
  className,
}: WrapperProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="visible"
      variants={heroVariants.announcement}
    >
      {children}
    </motion.div>
  );
}

export function HeroParagraphEntrance({ children, className }: WrapperProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="visible"
      variants={heroVariants.paragraph}
    >
      {children}
    </motion.div>
  );
}

export function HeroActionsEntrance({ children, className }: WrapperProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="visible"
      variants={heroVariants.actions}
    >
      {children}
    </motion.div>
  );
}

export function HeroActionItem({ children, className }: WrapperProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div className={className} variants={heroVariants.actionItem}>
      {children}
    </motion.div>
  );
}

export function HeroStageEntrance({ children, className }: WrapperProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={cn("overflow-visible", className)}
      initial="hidden"
      animate="visible"
      variants={heroVariants.stage}
    >
      {children}
    </motion.div>
  );
}

export function HeroHeadingReveal({
  className,
  desktopDuplicateClassName,
  lineClassName,
  lines,
}: HeadingRevealProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return (
      <h1 className={className}>
        {lines.map((line, index) => (
          <span key={`${line}-${index}`} className="block">
            {line}
          </span>
        ))}
      </h1>
    );
  }

  return (
    <h1 className={cn("relative", className)}>
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0 hidden select-none md:block",
          desktopDuplicateClassName,
        )}
      >
        {lines.map((line, index) => (
          <span
            key={`decorative-${line}-${index}`}
            className="block overflow-hidden pb-[0.12em]"
          >
            <motion.span
              className="block text-primary/12"
              initial={{ opacity: 0, y: "112%" }}
              animate={{ opacity: [0, 0.16, 0], y: ["112%", "8%", "0%"] }}
              transition={{
                delay: heroTimings.headingDelay + index * heroTimings.headingLineStagger,
                duration: 0.92,
                ease: standardEase,
                times: [0, 0.54, 1],
              }}
            >
              {line}
            </motion.span>
          </span>
        ))}
      </span>
      <span className="relative block">
        {lines.map((line, index) => (
          <span
            key={`${line}-${index}`}
            className="block overflow-hidden pb-[0.12em]"
          >
            <motion.span
              className={cn("block", lineClassName)}
              initial={{ opacity: 0.16, y: "112%" }}
              animate={{ opacity: 1, y: "0%" }}
              transition={{
                delay: heroTimings.headingDelay + index * heroTimings.headingLineStagger,
                duration: 0.92,
                ease: standardEase,
              }}
            >
              {line}
            </motion.span>
          </span>
        ))}
      </span>
    </h1>
  );
}

export { heroTimings };
