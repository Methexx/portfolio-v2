"use client";

import { useMemo } from "react";

import { useDocumentVisibility } from "@/hooks/use-document-visibility";

type UseAnimationActivityOptions = {
  inView: boolean;
  reducedMotion?: boolean;
};

export function useAnimationActivity({
  inView,
  reducedMotion = false,
}: UseAnimationActivityOptions) {
  const isDocumentVisible = useDocumentVisibility();

  return useMemo(
    () => ({
      canAnimate: !reducedMotion && inView && isDocumentVisible,
      isDocumentVisible,
      isStatic: reducedMotion,
    }),
    [inView, isDocumentVisible, reducedMotion],
  );
}
