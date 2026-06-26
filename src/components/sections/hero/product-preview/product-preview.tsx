"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";

import {
  PreviewEditorEntrance,
  PreviewInspectorEntrance,
  PreviewSidebarEntrance,
} from "@/components/sections/hero/product-preview/product-preview-motion";
import { ProductPreviewActivity } from "@/components/sections/hero/product-preview/product-preview-activity";
import {
  previewWorkspaceStates,
  type PreviewWorkspaceState,
} from "@/components/sections/hero/product-preview/preview-placeholder-data";
import { PreviewEditor } from "@/components/sections/hero/product-preview/preview-editor";
import { PreviewInspector } from "@/components/sections/hero/product-preview/preview-inspector";
import { PreviewShell } from "@/components/sections/hero/product-preview/preview-shell";
import { PreviewSidebar } from "@/components/sections/hero/product-preview/preview-sidebar";
import { useAnimationActivity } from "@/hooks/use-animation-activity";

type PreviewPhase =
  | "rest"
  | "pointer"
  | "content"
  | "status"
  | "connector"
  | "confirm";

const previewPhaseDurations: readonly [PreviewPhase, number][] = [
  ["pointer", 640],
  ["content", 760],
  ["status", 760],
  ["connector", 700],
  ["confirm", 760],
  ["rest", 1480],
] as const;

const reducedMotionState = previewWorkspaceStates[previewWorkspaceStates.length - 1];

export function ProductPreview() {
  const shouldReduceMotion = useReducedMotion();
  const previewRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(previewRef, { amount: 0.38 });
  const { canAnimate } = useAnimationActivity({
    inView: isInView,
    reducedMotion: Boolean(shouldReduceMotion),
  });
  const [activeStateIndex, setActiveStateIndex] = useState(0);
  const [phase, setPhase] = useState<PreviewPhase>("rest");

  useEffect(() => {
    if (shouldReduceMotion || !canAnimate) {
      return;
    }

    let cancelled = false;
    const timeoutIds: number[] = [];

    const runState = (stateIndex: number) => {
      let elapsed = 0;

      previewPhaseDurations.forEach(([nextPhase, duration]) => {
        elapsed += duration;
        const timeoutId = window.setTimeout(() => {
          if (cancelled) {
            return;
          }

          setPhase(nextPhase);

          if (nextPhase === "rest") {
            const nextIndex = (stateIndex + 1) % previewWorkspaceStates.length;
            setActiveStateIndex(nextIndex);
            runState(nextIndex);
          }
        }, elapsed);

        timeoutIds.push(timeoutId);
      });
    };

    const initialTimeoutId = window.setTimeout(() => {
      if (cancelled) {
        return;
      }

      setPhase("pointer");
      runState(activeStateIndex);
    }, 120);

    timeoutIds.push(initialTimeoutId);

    return () => {
      cancelled = true;
      timeoutIds.forEach((timeoutId) => window.clearTimeout(timeoutId));
    };
  }, [activeStateIndex, canAnimate, shouldReduceMotion]);

  const activeState: PreviewWorkspaceState = shouldReduceMotion
    ? reducedMotionState
    : previewWorkspaceStates[activeStateIndex];

  return (
    <div ref={previewRef}>
      <PreviewShell aria-hidden="true">
      <ProductPreviewActivity
        active={canAnimate}
        confirmVisible={phase === "confirm" || phase === "rest"}
        connectorVisible={phase === "connector" || phase === "confirm" || phase === "rest"}
        pointerVisible={phase !== "rest"}
        pulseVisible={phase === "pointer" || phase === "content" || phase === "status"}
        stateIndex={activeStateIndex}
      />
      <div className="absolute inset-x-0 top-0 flex h-10 items-center justify-between border-b border-preview-border bg-white/[0.03] px-4 sm:h-11 sm:px-5">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-white/22" />
          <span className="h-2 w-2 rounded-full bg-white/14" />
          <span className="h-2 w-2 rounded-full bg-white/10" />
        </div>
        <div className="h-2 w-24 rounded-full bg-white/8 sm:w-32" />
      </div>

      <div className="grid h-full grid-cols-[5.3rem_minmax(0,1fr)] pt-10 sm:grid-cols-[7.25rem_minmax(0,1fr)] sm:pt-11 md:grid-cols-[25%_48%_27%] lg:grid-cols-[26%_48%_26%]">
        <PreviewSidebarEntrance className="h-full min-h-0">
          <PreviewSidebar state={activeState} />
        </PreviewSidebarEntrance>
        <PreviewEditorEntrance className="h-full min-h-0">
          <PreviewEditor state={activeState} />
        </PreviewEditorEntrance>
        <PreviewInspectorEntrance className="hidden h-full min-h-0 md:flex">
          <PreviewInspector state={activeState} />
        </PreviewInspectorEntrance>
      </div>
      </PreviewShell>
    </div>
  );
}
