"use client";

import { Boxes } from "lucide-react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";

import { IntegrationCard } from "@/components/sections/integrations/integration-card";
import { integrationItems, integrationsHub } from "@/components/sections/integrations/integrations-data";
import { IntegrationFlow } from "@/components/sections/integrations/integration-flow";
import { useAnimationActivity } from "@/hooks/use-animation-activity";

const desktopPlacements = [
  "lg:col-[1] lg:row-[1]",
  "lg:col-[3] lg:row-[1]",
  "lg:col-[1] lg:row-[3]",
  "lg:col-[3] lg:row-[3]",
] as const;

export function IntegrationsShowcase() {
  const shouldReduceMotion = useReducedMotion();
  const showcaseRef = useRef<HTMLDivElement | null>(null);
  const hasEntered = useInView(showcaseRef, { amount: 0.22, once: true });
  const isLoopInView = useInView(showcaseRef, { amount: 0.16 });
  const { canAnimate } = useAnimationActivity({
    inView: isLoopInView,
    reducedMotion: Boolean(shouldReduceMotion),
  });
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const mobileQuery = window.matchMedia("(max-width: 47.99rem)");
    const updateMobile = () => {
      setIsMobile(mobileQuery.matches);
    };

    updateMobile();
    mobileQuery.addEventListener("change", updateMobile);

    return () => {
      mobileQuery.removeEventListener("change", updateMobile);
    };
  }, []);

  useEffect(() => {
    if (!canAnimate) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % integrationItems.length);
    }, isMobile ? 2200 : 2800);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [canAnimate, isMobile]);

  const decorativeTrack = useMemo(
    () => [...integrationItems, ...integrationItems],
    [],
  );

  return (
    <motion.div
      ref={showcaseRef}
      initial={shouldReduceMotion ? false : { opacity: 0, y: 48, scale: 0.988 }}
      animate={
        shouldReduceMotion || hasEntered
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0, y: 48, scale: 0.988 }
      }
      transition={{ duration: 0.96, ease: [0.22, 1, 0.36, 1] }}
      className="relative mt-14 overflow-hidden rounded-[2.5rem] border border-integrations-border bg-[radial-gradient(circle_at_top,rgba(109,61,245,0.14),transparent_32%),linear-gradient(180deg,rgba(250,247,252,0.94),rgba(241,237,247,0.98))] p-4 shadow-[0_26px_72px_-48px_rgba(36,21,47,0.18),inset_0_1px_0_rgba(255,255,255,0.82)] sm:mt-16 sm:p-6"
      aria-labelledby="integrations-showcase-title"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(109,61,245,0.08)_1px,transparent_1px)] bg-[size:1.65rem_1.65rem] opacity-22 sm:opacity-28" />
      <IntegrationFlow activeIndex={activeIndex} canAnimate={canAnimate} isMobile={isMobile} />
      {!isMobile ? (
        <motion.div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-4 overflow-hidden px-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: canAnimate ? 0.7 : 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <motion.div
            className="flex w-max gap-4"
            animate={canAnimate ? { x: ["0%", "-50%"] } : undefined}
            transition={
              canAnimate
                ? {
                    duration: 20,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }
                : undefined
            }
          >
            {decorativeTrack.map((item, index) => (
              <div key={`${item.id}-${index}`} className="w-[16rem] shrink-0" aria-hidden="true">
                <IntegrationCard item={item} muted />
              </div>
            ))}
          </motion.div>
        </motion.div>
      ) : null}

      <div className="relative">
        <motion.div
          animate={
            canAnimate
              ? {
                  boxShadow: [
                    "0 24px 60px -36px rgba(36,21,47,0.45), inset 0 1px 0 rgba(255,255,255,0.16)",
                    "0 30px 72px -36px rgba(109,61,245,0.36), inset 0 1px 0 rgba(255,255,255,0.18)",
                    "0 24px 60px -36px rgba(36,21,47,0.45), inset 0 1px 0 rgba(255,255,255,0.16)",
                  ],
                }
              : undefined
          }
          transition={{ duration: 3.2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          className="mx-auto max-w-[18rem] rounded-[1.85rem] border border-integrations-border bg-[radial-gradient(circle_at_top,rgba(109,61,245,0.24),transparent_56%),linear-gradient(180deg,rgba(66,43,98,0.96),rgba(33,22,48,0.98))] px-5 py-5 text-center shadow-[0_24px_60px_-36px_rgba(36,21,47,0.45),inset_0_1px_0_rgba(255,255,255,0.16)] lg:absolute lg:left-1/2 lg:top-1/2 lg:z-10 lg:w-[16rem] lg:max-w-none lg:-translate-x-1/2 lg:-translate-y-1/2"
        >
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-[1.2rem] border border-white/12 bg-white/[0.08] text-primary-soft shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]">
            <Boxes aria-hidden="true" className="size-6" strokeWidth={1.8} />
          </div>
          <p
            id="integrations-showcase-title"
            className="mt-4 max-w-none text-[1.12rem] font-medium tracking-[-0.04em] text-white"
          >
            {integrationsHub.label}
          </p>
          <p className="mt-2 max-w-none text-[0.82rem] font-semibold uppercase tracking-[0.16em] text-primary-soft/86">
            {integrationsHub.supportingText}
          </p>
          <p className="mt-4 max-w-none text-[0.9rem] leading-6 text-white/72">
            {integrationsHub.microcopy}
          </p>
        </motion.div>

        <ul className="mt-6 grid list-none gap-4 p-0 lg:mt-0 lg:min-h-[35rem] lg:grid-cols-[1fr_13rem_1fr] lg:grid-rows-[1fr_auto_1fr] lg:items-center lg:gap-x-8 lg:gap-y-6">
          {integrationItems.map((item, index) => (
            <motion.li
              key={item.id}
              className={desktopPlacements[index]}
              animate={
                canAnimate && index === activeIndex
                  ? { y: [0, -4, 0] }
                  : undefined
              }
              transition={{
                duration: 1.6,
                ease: "easeInOut",
                repeat: canAnimate && index === activeIndex ? Number.POSITIVE_INFINITY : 0,
              }}
            >
              <IntegrationCard item={item} active={canAnimate && index === activeIndex} />
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
