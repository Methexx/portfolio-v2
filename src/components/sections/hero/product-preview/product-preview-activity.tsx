"use client";

import { motion } from "motion/react";

type ProductPreviewActivityProps = {
  active: boolean;
  confirmVisible: boolean;
  connectorVisible: boolean;
  pointerVisible: boolean;
  pulseVisible: boolean;
  stateIndex: number;
};

const focusStates = [
  {
    chip: "Linked project note saved",
    connector: { left: "26%", top: "56%", width: "50%" },
    cursor: { x: "11%", y: "21%" },
    pulse: { height: "17%", left: "4.5%", top: "18.5%", width: "18%" },
  },
  {
    chip: "Architecture context connected",
    connector: { left: "34%", top: "58%", width: "42%" },
    cursor: { x: "42%", y: "35%" },
    pulse: { height: "28%", left: "26%", top: "20.5%", width: "28%" },
  },
  {
    chip: "Meeting follow-up resolved",
    connector: { left: "44%", top: "60%", width: "34%" },
    cursor: { x: "77%", y: "26%" },
    pulse: { height: "22%", left: "72%", top: "18.5%", width: "18%" },
  },
] as const;

export function ProductPreviewActivity({
  active,
  confirmVisible,
  connectorVisible,
  pointerVisible,
  pulseVisible,
  stateIndex,
}: ProductPreviewActivityProps) {
  const state = focusStates[stateIndex % focusStates.length];

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute right-6 top-5 rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-white/58 backdrop-blur-[4px]"
        animate={{
          opacity: confirmVisible && active ? 0.92 : 0.36,
          y: confirmVisible && active ? 0 : 6,
        }}
        transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
      >
        {state.chip}
      </motion.div>

      <motion.div
        className="absolute rounded-[1.35rem] border border-primary/18 bg-primary/[0.08] shadow-[0_0_0_1px_rgba(139,92,246,0.12),0_24px_40px_-34px_rgba(109,61,245,0.7)]"
        style={{
          height: state.pulse.height,
          left: state.pulse.left,
          top: state.pulse.top,
          width: state.pulse.width,
        }}
        animate={{
          opacity: pulseVisible && active ? 0.44 : 0,
          scale: pulseVisible && active ? [1, 1.02, 1] : 1,
        }}
        transition={{
          duration: 1.2,
          ease: "easeInOut",
          repeat: pulseVisible && active ? Number.POSITIVE_INFINITY : 0,
        }}
      />

      <motion.div
        className="absolute h-5 w-5 rounded-full border border-white/14 bg-white/[0.08] shadow-[0_10px_28px_-18px_rgba(255,255,255,0.65)] backdrop-blur-[4px]"
        animate={{
          opacity: pointerVisible && active ? 0.92 : 0,
          x: state.cursor.x,
          y: state.cursor.y,
          scale: pointerVisible && active ? 1 : 0.9,
        }}
        transition={{ duration: 0.82, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/76" />
      </motion.div>

      <motion.div
        className="absolute h-px bg-[linear-gradient(90deg,transparent,rgba(168,214,255,0.82),transparent)]"
        style={{
          left: state.connector.left,
          top: state.connector.top,
          width: state.connector.width,
        }}
        animate={{
          opacity: connectorVisible && active ? [0.1, 0.95, 0.1] : 0,
          x: connectorVisible && active ? ["-4%", "4%", "-4%"] : "0%",
        }}
        transition={{
          duration: 1.6,
          ease: "easeInOut",
          repeat: connectorVisible && active ? Number.POSITIVE_INFINITY : 0,
        }}
      />
    </div>
  );
}
