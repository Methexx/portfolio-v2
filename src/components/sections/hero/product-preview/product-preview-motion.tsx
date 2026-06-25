"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import type { ReactNode } from "react";

import { cn } from "@/lib/cn";
import { standardEase } from "@/lib/motion";
import { heroTimings } from "@/components/sections/hero/hero-entrance";

const previewTimings = {
  windowDelay: heroTimings.stageDelay + 0.2,
  columnsDelay: heroTimings.stageDelay + 0.34,
  detailsDelay: heroTimings.stageDelay + 0.5,
  mobileColumnsDelay: heroTimings.stageDelay + 0.26,
  mobileDetailsDelay: heroTimings.stageDelay + 0.38,
} as const;

const previewVariants = {
  window: {
    hidden: { opacity: 0.48, y: 26, scale: 0.992 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.82,
        delay: previewTimings.windowDelay,
        ease: standardEase,
      },
    },
  },
  sidebar: {
    hidden: { opacity: 0, x: -18 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.62,
        delay: previewTimings.columnsDelay,
        ease: standardEase,
      },
    },
  },
  editor: {
    hidden: { opacity: 0.48, y: 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: previewTimings.columnsDelay - 0.06,
        ease: standardEase,
      },
    },
  },
  inspector: {
    hidden: { opacity: 0, x: 18 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.62,
        delay: previewTimings.columnsDelay + 0.06,
        ease: standardEase,
      },
    },
  },
  search: {
    hidden: { opacity: 0, y: 7 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.42,
        delay: previewTimings.detailsDelay,
        ease: standardEase,
      },
    },
  },
  sidebarGroup: {
    hidden: {},
    visible: {
      transition: {
        delayChildren: previewTimings.detailsDelay + 0.05,
        staggerChildren: 0.04,
      },
    },
  },
  sidebarItem: {
    hidden: { opacity: 0, y: 7 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.42,
        ease: standardEase,
      },
    },
  },
  sidebarFooter: {
    hidden: { opacity: 0, y: 8 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.45,
        delay: previewTimings.detailsDelay + 0.24,
        ease: standardEase,
      },
    },
  },
  title: {
    hidden: { opacity: 0, y: 8 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.48,
        delay: previewTimings.detailsDelay + 0.02,
        ease: standardEase,
      },
    },
  },
  titleIndicator: {
    hidden: { opacity: 0, scaleY: 0.08 },
    visible: {
      opacity: 1,
      scaleY: 1,
      transition: {
        duration: 0.46,
        delay: previewTimings.detailsDelay,
        ease: standardEase,
      },
    },
  },
  documentGroups: {
    hidden: {},
    visible: {
      transition: {
        delayChildren: previewTimings.detailsDelay + 0.12,
        staggerChildren: 0.08,
      },
    },
  },
  documentGroup: {
    hidden: { opacity: 0, y: 8 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.44,
        ease: standardEase,
      },
    },
  },
  inspectorGroup: {
    hidden: {},
    visible: {
      transition: {
        delayChildren: previewTimings.detailsDelay + 0.1,
        staggerChildren: 0.07,
      },
    },
  },
  inspectorItem: {
    hidden: { opacity: 0, y: 7 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.42,
        ease: standardEase,
      },
    },
  },
  selectedDay: {
    hidden: { opacity: 0.55, scale: 0.92 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.32,
        delay: previewTimings.detailsDelay + 0.28,
        ease: standardEase,
      },
    },
  },
  selectedNav: {
    hidden: { opacity: 0.72, scale: 0.985 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        delay: previewTimings.detailsDelay + 0.12,
        ease: standardEase,
      },
    },
  },
} satisfies Record<string, Variants>;

type MotionWrapperProps = {
  children: ReactNode;
  className?: string;
};

type PreviewDayAccentProps = {
  children: ReactNode;
  selected?: boolean;
  className?: string;
};

function StaticOrMotion({
  children,
  className,
  variants,
}: MotionWrapperProps & { variants: Variants }) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="visible"
      variants={variants}
    >
      {children}
    </motion.div>
  );
}

export function PreviewWindowEntrance({
  children,
  className,
}: MotionWrapperProps) {
  return (
    <StaticOrMotion className={className} variants={previewVariants.window}>
      {children}
    </StaticOrMotion>
  );
}

export function PreviewSidebarEntrance({
  children,
  className,
}: MotionWrapperProps) {
  return (
    <StaticOrMotion className={className} variants={previewVariants.sidebar}>
      {children}
    </StaticOrMotion>
  );
}

export function PreviewEditorEntrance({
  children,
  className,
}: MotionWrapperProps) {
  return (
    <StaticOrMotion className={className} variants={previewVariants.editor}>
      {children}
    </StaticOrMotion>
  );
}

export function PreviewInspectorEntrance({
  children,
  className,
}: MotionWrapperProps) {
  return (
    <StaticOrMotion className={className} variants={previewVariants.inspector}>
      {children}
    </StaticOrMotion>
  );
}

export function PreviewSearchEntrance({
  children,
  className,
}: MotionWrapperProps) {
  return (
    <StaticOrMotion className={className} variants={previewVariants.search}>
      {children}
    </StaticOrMotion>
  );
}

export function PreviewSidebarGroup({
  children,
  className,
}: MotionWrapperProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="visible"
      variants={previewVariants.sidebarGroup}
    >
      {children}
    </motion.div>
  );
}

export function PreviewSidebarItem({
  children,
  className,
}: MotionWrapperProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div className={className} variants={previewVariants.sidebarItem}>
      {children}
    </motion.div>
  );
}

export function PreviewSidebarFooterEntrance({
  children,
  className,
}: MotionWrapperProps) {
  return (
    <StaticOrMotion className={className} variants={previewVariants.sidebarFooter}>
      {children}
    </StaticOrMotion>
  );
}

export function PreviewTitleEntrance({
  children,
  className,
}: MotionWrapperProps) {
  return (
    <StaticOrMotion className={className} variants={previewVariants.title}>
      {children}
    </StaticOrMotion>
  );
}

export function PreviewTitleIndicator({
  children,
  className,
}: MotionWrapperProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={cn(className)}
      style={{ transformOrigin: "top" }}
      initial="hidden"
      animate="visible"
      variants={previewVariants.titleIndicator}
    >
      {children}
    </motion.div>
  );
}

export function PreviewDocumentGroups({
  children,
  className,
}: MotionWrapperProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.ul
      className={className}
      initial="hidden"
      animate="visible"
      variants={previewVariants.documentGroups}
    >
      {children}
    </motion.ul>
  );
}

export function PreviewDocumentGroup({
  children,
  className,
}: MotionWrapperProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <li className={className}>{children}</li>;
  }

  return (
    <motion.li className={className} variants={previewVariants.documentGroup}>
      {children}
    </motion.li>
  );
}

export function PreviewInspectorGroups({
  children,
  className,
}: MotionWrapperProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="visible"
      variants={previewVariants.inspectorGroup}
    >
      {children}
    </motion.div>
  );
}

export function PreviewInspectorItem({
  children,
  className,
}: MotionWrapperProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div className={className} variants={previewVariants.inspectorItem}>
      {children}
    </motion.div>
  );
}

export function PreviewSelectedDayAccent({
  children,
  selected,
  className,
}: PreviewDayAccentProps) {
  const shouldReduceMotion = useReducedMotion();

  if (!selected || shouldReduceMotion) {
    return <span className={className}>{children}</span>;
  }

  return (
    <motion.span
      className={className}
      initial="hidden"
      animate="visible"
      variants={previewVariants.selectedDay}
    >
      {children}
    </motion.span>
  );
}

export function PreviewSelectedNavAccent({
  children,
  active,
  className,
}: MotionWrapperProps & { active?: boolean }) {
  const shouldReduceMotion = useReducedMotion();

  if (!active || shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="visible"
      variants={previewVariants.selectedNav}
    >
      {children}
    </motion.div>
  );
}
