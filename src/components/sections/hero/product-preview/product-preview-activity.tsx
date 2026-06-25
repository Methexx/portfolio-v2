"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

import { useAnimationActivity } from "@/hooks/use-animation-activity";

type ProductPreviewActivityProps = {
  active: boolean;
};

const focusStates = [
  {
    chip: "Linked context visible",
    cursor: { x: "18%", y: "22%" },
    pulse: { left: "12%", top: "18%", width: "24%" },
  },
  {
    chip: "Project note selected",
    cursor: { x: "48%", y: "36%" },
    pulse: { left: "34%", top: "28%", width: "30%" },
  },
  {
    chip: "Meeting metadata updated",
    cursor: { x: "82%", y: "28%" },
    pulse: { left: "72%", top: "18%", width: "18%" },
  },
] as const;

export function ProductPreviewActivity({ active }: ProductPreviewActivityProps) {
  const shouldReduceMotion = useReducedMotion();
  const { canAnimate } = useAnimationActivity({
    inView: active,
    reducedMotion: Boolean(shouldReduceMotion),
  });
  const [focusIndex, setFocusIndex] = useState(0);

  useEffect(() => {
    if (!canAnimate) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setFocusIndex((current) => (current + 1) % focusStates.length);
    }, 2600);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [canAnimate]);

  if (shouldReduceMotion) {
    return null;
  }

  const state = focusStates[focusIndex];

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute right-6 top-5 rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-white/58 backdrop-blur-[4px]"
        animate={{ opacity: canAnimate ? [0.56, 0.9, 0.56] : 0.56 }}
        transition={{ duration: 2.2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      >
        {state.chip}
      </motion.div>

      <motion.div
        className="absolute rounded-[1.35rem] border border-primary/18 bg-primary/[0.08] shadow-[0_0_0_1px_rgba(139,92,246,0.12),0_24px_40px_-34px_rgba(109,61,245,0.7)]"
        style={{
          height: "20%",
          left: state.pulse.left,
          top: state.pulse.top,
          width: state.pulse.width,
        }}
        animate={{
          opacity: canAnimate ? [0.28, 0.5, 0.28] : 0.3,
          scale: canAnimate ? [1, 1.02, 1] : 1,
        }}
        transition={{ duration: 1.8, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute h-5 w-5 rounded-full border border-white/14 bg-white/[0.08] shadow-[0_10px_28px_-18px_rgba(255,255,255,0.65)] backdrop-blur-[4px]"
        animate={{
          x: state.cursor.x,
          y: state.cursor.y,
          opacity: canAnimate ? [0.52, 1, 0.82] : 0.72,
        }}
        transition={{ duration: 0.82, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/76" />
      </motion.div>

      <motion.div
        className="absolute left-[22%] top-[58%] h-px w-[56%] bg-[linear-gradient(90deg,transparent,rgba(168,214,255,0.64),transparent)]"
        animate={{
          opacity: canAnimate ? [0, 0.94, 0] : 0,
          x: canAnimate ? ["-8%", "8%", "-8%"] : "0%",
        }}
        transition={{ duration: 4.8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />
    </div>
  );
}
