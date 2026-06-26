"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";

import { integrationsCopy } from "@/components/sections/integrations/integrations-data";
import { gentleEase, standardEase } from "@/lib/motion";

export function IntegrationsHeader() {
  const shouldReduceMotion = useReducedMotion();
  const headerRef = useRef<HTMLDivElement | null>(null);
  const hasEntered = useInView(headerRef, { amount: 0.4, once: true });
  const isActive = shouldReduceMotion || hasEntered;

  return (
    <div ref={headerRef} className="mx-auto flex max-w-[50rem] flex-col items-center text-center">
      {shouldReduceMotion ? (
        <div className="inline-flex items-center gap-2 text-[0.82rem] font-semibold uppercase tracking-[0.22em] text-primary">
          <span aria-hidden="true" className="h-2 w-2 rounded-full bg-primary/80" />
          <span>{integrationsCopy.label}</span>
        </div>
      ) : (
        <motion.div
          className="inline-flex items-center gap-2 text-[0.82rem] font-semibold uppercase tracking-[0.22em] text-primary"
          initial={{ opacity: 0, y: 10 }}
          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ delay: 0.04, duration: 0.5, ease: gentleEase }}
        >
          <span aria-hidden="true" className="h-2 w-2 rounded-full bg-primary/80" />
          <span>{integrationsCopy.label}</span>
        </motion.div>
      )}

      {shouldReduceMotion ? (
        <h2 className="mt-5 max-w-[14ch] text-[clamp(2.7rem,6vw,4.75rem)] font-medium tracking-[-0.055em] text-foreground">
          {integrationsCopy.headingLines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h2>
      ) : (
        <h2 className="mt-5 max-w-[14ch] text-[clamp(2.7rem,6vw,4.75rem)] font-medium tracking-[-0.055em] text-foreground">
          {integrationsCopy.headingLines.map((line, index) => (
            <span key={line} className="block overflow-hidden pb-[0.12em]">
              <motion.span
                className="block"
                initial={{ opacity: 0.18, y: "108%" }}
                animate={isActive ? { opacity: 1, y: "0%" } : { opacity: 0.18, y: "108%" }}
                transition={{
                  delay: 0.14 + index * 0.09,
                  duration: 0.88,
                  ease: standardEase,
                }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h2>
      )}

      {shouldReduceMotion ? (
        <p className="mt-6 max-w-[43rem] text-[1.05rem] leading-8 text-muted sm:text-[1.125rem]">
          {integrationsCopy.description}
        </p>
      ) : (
        <motion.p
          className="mt-6 max-w-[43rem] text-[1.05rem] leading-8 text-muted sm:text-[1.125rem]"
          initial={{ opacity: 0, y: 14 }}
          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
          transition={{ delay: 0.4, duration: 0.56, ease: gentleEase }}
        >
          {integrationsCopy.description}
        </motion.p>
      )}
    </div>
  );
}
