"use client";

import { useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

import { featureItems } from "@/components/sections/features/feature-data";
import { FeatureItem } from "@/components/sections/features/feature-item";
import {
  FeatureGridMotion,
  FeatureGridMotionItem,
} from "@/components/sections/features/feature-grid-motion";
import { useAnimationActivity } from "@/hooks/use-animation-activity";
import { cn } from "@/lib/cn";

type FeatureGridProps = { className?: string };

export function FeatureGrid({ className }: FeatureGridProps) {
  const shouldReduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [hasEntered, setHasEntered] = useState(false);
  const { canAnimate } = useAnimationActivity({
    inView: hasEntered,
    reducedMotion: Boolean(shouldReduceMotion),
  });

  useEffect(() => {
    if (!canAnimate) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % featureItems.length);
    }, 1800);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [canAnimate]);

  return (
    <FeatureGridMotion
      className={cn(
        "grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-2 md:gap-x-10 md:gap-y-10 xl:grid-cols-4 xl:gap-x-12 xl:gap-y-8",
        className,
      )}
      onViewportEnter={() => setHasEntered(true)}
    >
      {featureItems.map((item, index) => (
        <FeatureGridMotionItem key={item.id}>
          <FeatureItem {...item} active={canAnimate && index === activeIndex} />
        </FeatureGridMotionItem>
      ))}
    </FeatureGridMotion>
  );
}
