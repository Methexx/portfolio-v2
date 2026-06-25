"use client";

import { useEffect, useState } from "react";

export type AnimationDensity = "low" | "medium" | "high";

export function useResponsiveAnimationDensity() {
  const [density, setDensity] = useState<AnimationDensity>("medium");

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const mediaQueries = {
      mobile: window.matchMedia("(max-width: 47.99rem)"),
      desktop: window.matchMedia("(min-width: 80rem)"),
    };

    const updateDensity = () => {
      if (mediaQueries.mobile.matches) {
        setDensity("low");
        return;
      }

      if (mediaQueries.desktop.matches) {
        setDensity("high");
        return;
      }

      setDensity("medium");
    };

    updateDensity();
    mediaQueries.mobile.addEventListener("change", updateDensity);
    mediaQueries.desktop.addEventListener("change", updateDensity);

    return () => {
      mediaQueries.mobile.removeEventListener("change", updateDensity);
      mediaQueries.desktop.removeEventListener("change", updateDensity);
    };
  }, []);

  return density;
}
