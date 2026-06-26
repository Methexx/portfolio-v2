"use client";

import { motion } from "motion/react";

type IntegrationFlowProps = {
  activeIndex: number;
  canAnimate: boolean;
  isMobile: boolean;
};

const primaryPaths = [
  { d: "M 22 24 C 34 24, 39 34, 50 43", opacity: 0.64, width: 1.25 },
  { d: "M 78 24 C 66 24, 61 34, 50 43", opacity: 0.64, width: 1.25 },
  { d: "M 22 69 C 34 69, 39 59, 50 54", opacity: 0.58, width: 1.05 },
  { d: "M 78 69 C 66 69, 61 59, 50 54", opacity: 0.58, width: 1.05 },
] as const;

export function IntegrationFlow({
  activeIndex,
  canAnimate,
  isMobile,
}: IntegrationFlowProps) {
  if (isMobile) {
    return null;
  }

  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 hidden h-full w-full md:block"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      {primaryPaths.map((path, index) => {
        const isActive = activeIndex === index;

        return (
          <g key={path.d}>
            <motion.path
              d={path.d}
              fill="none"
              stroke="var(--integrations-line)"
              strokeLinecap="round"
              strokeWidth={path.width}
              initial={{ opacity: 0, pathLength: 0 }}
              animate={{
                opacity: canAnimate ? (isActive ? path.opacity + 0.2 : path.opacity) : 0.4,
                pathLength: 1,
              }}
              transition={{
                duration: 0.72,
                delay: 0.16 + index * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
            />
            <motion.circle
              cx="0"
              cy="0"
              r="1.25"
              fill="color-mix(in srgb, var(--integrations-accent) 72%, white)"
              animate={
                canAnimate
                  ? {
                      opacity: isActive ? [0, 1, 0] : 0,
                      offsetDistance: ["0%", "100%"],
                    }
                  : { opacity: 0 }
              }
              transition={{
                duration: 1.25,
                ease: "easeInOut",
                repeat: canAnimate && isActive ? Number.POSITIVE_INFINITY : 0,
                repeatDelay: 1.1,
              }}
              style={{ offsetPath: `path("${path.d}")` }}
            />
          </g>
        );
      })}

      {[
        { d: "M 16 86 C 30 84, 39 80, 50 70", opacity: 0.3, width: 0.9 },
        { d: "M 84 86 C 70 84, 61 80, 50 70", opacity: 0.3, width: 0.9 },
      ].map((path, index) => (
        <motion.path
          key={path.d}
          d={path.d}
          fill="none"
          stroke="color-mix(in srgb, var(--integrations-line) 82%, white)"
          strokeLinecap="round"
          strokeWidth={path.width}
          initial={{ opacity: 0, pathLength: 0 }}
          animate={{ opacity: path.opacity, pathLength: 1 }}
          transition={{
            duration: 0.66,
            delay: 0.52 + index * 0.08,
            ease: [0.22, 1, 0.36, 1],
          }}
        />
      ))}

      {[
        { cx: 22, cy: 24 },
        { cx: 78, cy: 24 },
        { cx: 22, cy: 69 },
        { cx: 78, cy: 69 },
        { cx: 50, cy: 49 },
      ].map((point, index) => (
        <motion.circle
          key={`${point.cx}-${point.cy}`}
          cx={point.cx}
          cy={point.cy}
          r="1.15"
          fill="color-mix(in srgb, var(--integrations-accent) 58%, white)"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: activeIndex === index ? 1.12 : 1 }}
          transition={{
            duration: 0.4,
            delay: 0.46 + index * 0.04,
            ease: [0.22, 1, 0.36, 1],
          }}
        />
      ))}
    </svg>
  );
}
