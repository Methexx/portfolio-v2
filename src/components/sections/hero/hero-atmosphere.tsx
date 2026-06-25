"use client";

import { motion, useReducedMotion } from "motion/react";
import { useMemo } from "react";

import { useResponsiveAnimationDensity } from "@/hooks/use-responsive-animation-density";

function buildParticles(count: number) {
  return Array.from({ length: count }, (_, index) => ({
    delay: index * 0.22,
    duration: 8 + (index % 4) * 1.2,
    size: 4 + (index % 3) * 2,
    x: 18 + ((index * 11) % 68),
    y: 12 + ((index * 7) % 44),
  }));
}

export function HeroAtmosphere() {
  const shouldReduceMotion = useReducedMotion();
  const density = useResponsiveAnimationDensity();
  const particles = useMemo(
    () => buildParticles(density === "low" ? 7 : density === "medium" ? 10 : 14),
    [density],
  );

  if (shouldReduceMotion) {
    return null;
  }

  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute left-1/2 top-18 h-[22rem] w-[22rem] -translate-x-1/2 rounded-full bg-primary/12 blur-[110px] sm:h-[26rem] sm:w-[26rem] lg:h-[32rem] lg:w-[32rem]"
        animate={{ scale: [1, 1.06, 1], opacity: [0.52, 0.7, 0.52] }}
        transition={{ duration: 9.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute left-1/2 top-[28rem] h-[18rem] w-[36rem] -translate-x-1/2 rounded-full bg-[color:var(--accent-blue)]/10 blur-[120px] sm:w-[42rem] lg:top-[34rem] lg:w-[58rem]"
        animate={{ x: ["-3%", "3%", "-3%"], opacity: [0.32, 0.48, 0.32] }}
        transition={{ duration: 11, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />
      {particles.map((particle) => (
        <motion.span
          key={`${particle.x}-${particle.y}-${particle.delay}`}
          className="absolute rounded-full bg-white/38 shadow-[0_0_18px_rgba(162,196,255,0.28)]"
          style={{
            height: `${particle.size}px`,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
          }}
          animate={{
            opacity: [0.16, 0.55, 0.16],
            y: [0, -18, 0],
          }}
          transition={{
            delay: particle.delay,
            duration: particle.duration,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      ))}
      <motion.div
        className="absolute left-[20%] top-[23rem] h-px w-[24%] bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.52),transparent)]"
        animate={{ x: ["0%", "42%", "0%"], opacity: [0, 0.86, 0] }}
        transition={{ duration: 6.2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />
    </div>
  );
}
