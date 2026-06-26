"use client";

import {
  motion,
  useInView,
  useReducedMotion,
  type Variants,
} from "motion/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { AiActionBar } from "@/components/sections/ai-showcase/ai-action-bar";
import { AiCapabilities } from "@/components/sections/ai-showcase/ai-capabilities";
import { AiDemoPanel } from "@/components/sections/ai-showcase/ai-demo-panel";
import { AiPromptCard } from "@/components/sections/ai-showcase/ai-prompt-card";
import { AiResponseCard } from "@/components/sections/ai-showcase/ai-response-card";
import { AiShowcaseHeader } from "@/components/sections/ai-showcase/ai-showcase-header";
import {
  aiCapabilities,
  aiShowcaseCopy,
  type AiAction,
} from "@/components/sections/ai-showcase/ai-showcase-data";
import { useAnimationActivity } from "@/hooks/use-animation-activity";
import { cn } from "@/lib/cn";
import { gentleEase, standardEase } from "@/lib/motion";

type AiDemoPhase =
  | "idle"
  | "prompt"
  | "processing"
  | "responding"
  | "complete"
  | "action"
  | "resting";
type ActionFeedbackMap = Partial<Record<AiAction["id"], string>>;

const demoTimings = {
  autoStartDelayMs: 1180,
  promptDelayMs: 520,
  processingDelayMs: 660,
  chunkIntervalMs: 300,
  completeDelayMs: 170,
  actionDelayMs: 620,
  restingDelayMs: 1380,
  feedbackResetMs: 1500,
} as const;

const sectionReveal: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.56, ease: gentleEase },
  },
};

const panelReveal: Variants = {
  hidden: { opacity: 0, y: 52, scale: 0.984 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.98, delay: 0.68, ease: standardEase },
  },
};

const capabilityParent: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.075,
      delayChildren: 0.06,
    },
  },
};

const capabilityChild: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: standardEase,
    },
  },
};

function joinResponseChunks(visibleChunkCount: number) {
  return aiShowcaseCopy.responseChunks.slice(0, visibleChunkCount).join(" ");
}

export function AiShowcaseDemo() {
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const hasEntered = useInView(sectionRef, {
    amount: 0.25,
    once: true,
  });
  const isLoopInView = useInView(sectionRef, {
    amount: 0.2,
  });
  const { canAnimate } = useAnimationActivity({
    inView: isLoopInView,
    reducedMotion: Boolean(shouldReduceMotion),
  });

  const [phase, setPhase] = useState<AiDemoPhase>("idle");
  const [visibleChunkCount, setVisibleChunkCount] = useState(0);
  const [actionsReady, setActionsReady] = useState(false);
  const [activeActionId, setActiveActionId] = useState<AiAction["id"] | null>(null);
  const [capabilitiesReady, setCapabilitiesReady] = useState(false);
  const [hasRevealedCapabilities, setHasRevealedCapabilities] = useState(false);
  const [feedbackLabels, setFeedbackLabels] = useState<ActionFeedbackMap>({});
  const [hasCompletedRun, setHasCompletedRun] = useState(false);

  const runIdRef = useRef(0);
  const timeoutIdsRef = useRef<number[]>([]);
  const hasRevealedCapabilitiesRef = useRef(hasRevealedCapabilities);
  const hasAutoStartedRef = useRef(false);

  const hasEnteredView = shouldReduceMotion || hasEntered;

  useEffect(() => {
    hasRevealedCapabilitiesRef.current = hasRevealedCapabilities;
  }, [hasRevealedCapabilities]);

  const clearScheduled = useCallback(() => {
    timeoutIdsRef.current.forEach((timeoutId) => window.clearTimeout(timeoutId));
    timeoutIdsRef.current = [];
  }, []);

  const schedule = useCallback((callback: () => void, delayMs: number) => {
    const timeoutId = window.setTimeout(callback, delayMs);
    timeoutIdsRef.current.push(timeoutId);
  }, []);

  const startDemo = useCallback((mode: "full" | "response") => {
    if (shouldReduceMotion) {
      setPhase("complete");
      setVisibleChunkCount(aiShowcaseCopy.responseChunks.length);
      setActionsReady(true);
      setCapabilitiesReady(true);
      setHasRevealedCapabilities(true);
      setHasCompletedRun(true);
      return;
    }

    clearScheduled();
    const runId = runIdRef.current + 1;
    runIdRef.current = runId;

    setFeedbackLabels({});
    setVisibleChunkCount(0);
    setActionsReady(false);
    setActiveActionId(null);

    if (mode === "full") {
      setPhase("prompt");
      schedule(() => {
        if (runIdRef.current !== runId) return;
        setPhase("processing");
      }, demoTimings.promptDelayMs);

      schedule(() => {
        if (runIdRef.current !== runId) return;
        setPhase("responding");
        setVisibleChunkCount(1);
      }, demoTimings.promptDelayMs + demoTimings.processingDelayMs);
    } else {
      setPhase("processing");
      schedule(() => {
        if (runIdRef.current !== runId) return;
        setPhase("responding");
        setVisibleChunkCount(1);
      }, demoTimings.processingDelayMs);
    }

    const responseStartDelay =
      mode === "full"
        ? demoTimings.promptDelayMs + demoTimings.processingDelayMs
        : demoTimings.processingDelayMs;

    aiShowcaseCopy.responseChunks.slice(1).forEach((_, index) => {
      schedule(() => {
        if (runIdRef.current !== runId) return;
        setVisibleChunkCount(index + 2);
      }, responseStartDelay + demoTimings.chunkIntervalMs * (index + 1));
    });

    schedule(() => {
      if (runIdRef.current !== runId) return;
      setPhase("complete");
      setActionsReady(true);
      setHasCompletedRun(true);
      if (!hasRevealedCapabilitiesRef.current) {
        setCapabilitiesReady(true);
        setHasRevealedCapabilities(true);
      }
    }, responseStartDelay + demoTimings.chunkIntervalMs * aiShowcaseCopy.responseChunks.length + demoTimings.completeDelayMs);

    schedule(() => {
      if (runIdRef.current !== runId) return;
      setPhase("action");
      setActiveActionId("insert");
    }, responseStartDelay + demoTimings.chunkIntervalMs * aiShowcaseCopy.responseChunks.length + demoTimings.completeDelayMs + demoTimings.actionDelayMs);

    schedule(() => {
      if (runIdRef.current !== runId) return;
      setPhase("resting");
      setActiveActionId(null);
    }, responseStartDelay + demoTimings.chunkIntervalMs * aiShowcaseCopy.responseChunks.length + demoTimings.completeDelayMs + demoTimings.actionDelayMs + demoTimings.restingDelayMs);
  }, [clearScheduled, schedule, shouldReduceMotion]);

  useEffect(() => {
    if (shouldReduceMotion || !hasEnteredView || hasAutoStartedRef.current) {
      return;
    }

    hasAutoStartedRef.current = true;
    schedule(() => {
      startDemo("full");
    }, demoTimings.autoStartDelayMs);
  }, [hasEnteredView, schedule, shouldReduceMotion, startDemo]);

  useEffect(() => {
    if (shouldReduceMotion || !canAnimate || phase !== "resting") {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      startDemo("response");
    }, demoTimings.restingDelayMs);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [canAnimate, phase, shouldReduceMotion, startDemo]);

  useEffect(() => {
    return () => {
      clearScheduled();
      runIdRef.current += 1;
    };
  }, [clearScheduled]);

  const displayedResponse = useMemo(
    () =>
      shouldReduceMotion
        ? aiShowcaseCopy.responseText
        : joinResponseChunks(visibleChunkCount),
    [shouldReduceMotion, visibleChunkCount],
  );

  const isRunning = phase === "prompt" || phase === "processing" || phase === "responding";
  const isPromptActive = phase !== "idle";
  const isProcessing = phase === "processing";
  const runDemoLabel = hasCompletedRun ? "Replay demo" : "Run demo";

  const setTimedFeedback = useCallback((actionId: AiAction["id"], label: string) => {
    setFeedbackLabels((current) => ({ ...current, [actionId]: label }));
    schedule(() => {
      setFeedbackLabels((current) => {
        const next = { ...current };
        delete next[actionId];
        return next;
      });
    }, demoTimings.feedbackResetMs);
  }, [schedule]);

  const handleRunDemo = useCallback(() => {
    if (isRunning) return;
    startDemo("full");
  }, [isRunning, startDemo]);

  const handleAction = useCallback(async (actionId: AiAction["id"]) => {
    if (actionId === "rerun") {
      if (isRunning) return;
      startDemo("response");
      return;
    }

    if (actionId === "insert") {
      setTimedFeedback("insert", "Inserted");
      return;
    }

    if (actionId === "replace") {
      setTimedFeedback("replace", "Replaced");
      return;
    }

    if (actionId === "copy") {
      try {
        await navigator.clipboard.writeText(aiShowcaseCopy.responseText);
        setTimedFeedback("copy", "Copied");
      } catch {
        setTimedFeedback("copy", "Unavailable");
      }
    }
  }, [isRunning, setTimedFeedback, startDemo]);

  return (
    <div ref={sectionRef} className="mx-auto max-w-[84rem]">
      <AiShowcaseHeader
        labelSlot={
          shouldReduceMotion ? (
            <div className="inline-flex items-center gap-2 text-[0.82rem] font-semibold uppercase tracking-[0.22em] text-primary">
              <span aria-hidden="true" className="h-2 w-2 rounded-full bg-primary/80" />
              <span>{aiShowcaseCopy.label}</span>
            </div>
          ) : (
            <motion.div
              initial="hidden"
              animate={hasEnteredView ? "visible" : "hidden"}
              variants={sectionReveal}
              className="inline-flex items-center gap-2 text-[0.82rem] font-semibold uppercase tracking-[0.22em] text-primary"
            >
              <span aria-hidden="true" className="h-2 w-2 rounded-full bg-primary/80" />
              <span>{aiShowcaseCopy.label}</span>
            </motion.div>
          )
        }
        headingSlot={
          shouldReduceMotion ? (
            <h2 className="mt-5 max-w-[13ch] text-[clamp(2.8rem,6vw,4.75rem)] font-medium tracking-[-0.055em] text-foreground">
              {aiShowcaseCopy.headingLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h2>
          ) : (
            <h2 className="mt-5 max-w-[13ch] text-[clamp(2.8rem,6vw,4.75rem)] font-medium tracking-[-0.055em] text-foreground">
              {aiShowcaseCopy.headingLines.map((line, index) => (
                <span key={line} className="block overflow-hidden pb-[0.12em]">
                  <motion.span
                    className="block"
                    initial={{ opacity: 0.2, y: "108%" }}
                    animate={hasEnteredView ? { opacity: 1, y: "0%" } : { opacity: 0.2, y: "108%" }}
                    transition={{
                      delay: 0.12 + index * 0.09,
                      duration: 0.88,
                      ease: standardEase,
                    }}
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </h2>
          )
        }
        descriptionSlot={
          shouldReduceMotion ? (
            <p className="mt-6 max-w-[42rem] text-[1.05rem] leading-8 text-muted sm:text-[1.125rem]">
              {aiShowcaseCopy.description}
            </p>
          ) : (
            <motion.p
              className="mt-6 max-w-[42rem] text-[1.05rem] leading-8 text-muted sm:text-[1.125rem]"
              initial={{ opacity: 0, y: 14 }}
              animate={hasEnteredView ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
              transition={{ delay: 0.42, duration: 0.58, ease: gentleEase }}
            >
              {aiShowcaseCopy.description}
            </motion.p>
          )
        }
      />

      {shouldReduceMotion ? (
        <div className="mt-12 sm:mt-14 lg:mt-16">
          <AiDemoPanel
            headerSlot={
              <div className="max-w-[42rem]">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-[0.8rem] font-semibold uppercase tracking-[0.18em] text-ai-panel-accent">
                      {aiShowcaseCopy.promptContextLabel}
                    </p>
                    <h3 className="mt-3 text-[1.6rem] font-medium tracking-[-0.045em] text-white sm:text-[1.95rem] lg:text-[2.15rem]">
                      {aiShowcaseCopy.promptHeading}
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={handleRunDemo}
                    className="inline-flex min-h-10 items-center justify-center rounded-full border border-primary/20 bg-primary/14 px-4 py-2 text-sm font-medium text-primary-soft"
                  >
                    {runDemoLabel}
                  </button>
                </div>
                <div className="mt-4 space-y-2 text-[0.98rem] leading-7 text-ai-panel-muted">
                  {aiShowcaseCopy.promptSupportingLines.map((line) => (
                    <p key={line} className="max-w-[40rem]">
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            }
            promptCard={<AiPromptCard active />}
            responseCard={
              <AiResponseCard
                active
                displayedResponse={displayedResponse}
                fullResponseAriaText={aiShowcaseCopy.responseText}
              />
            }
            actionBar={
              <AiActionBar
                interactive
                enabled
                activeActionId={activeActionId}
                feedbackLabels={feedbackLabels}
                onAction={handleAction}
              />
            }
          />
        </div>
      ) : (
        <motion.div
          className="mt-12 sm:mt-14 lg:mt-16"
          initial="hidden"
          animate={hasEnteredView ? "visible" : "hidden"}
          variants={panelReveal}
        >
          <AiDemoPanel
            headerSlot={
              <div className="max-w-[42rem]">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={hasEnteredView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                    transition={{ delay: 0.9, duration: 0.52, ease: gentleEase }}
                  >
                    <p className="text-[0.8rem] font-semibold uppercase tracking-[0.18em] text-ai-panel-accent">
                      {aiShowcaseCopy.promptContextLabel}
                    </p>
                    <h3 className="mt-3 text-[1.6rem] font-medium tracking-[-0.045em] text-white sm:text-[1.95rem] lg:text-[2.15rem]">
                      {aiShowcaseCopy.promptHeading}
                    </h3>
                  </motion.div>
                  <motion.button
                    type="button"
                    onClick={handleRunDemo}
                    disabled={isRunning}
                    initial={{ opacity: 0, y: 12 }}
                    animate={hasEnteredView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                    transition={{ delay: 1.02, duration: 0.52, ease: gentleEase }}
                    className={cn(
                      "inline-flex min-h-10 items-center justify-center rounded-full border px-4 py-2 text-sm font-medium transition duration-200 ease-[var(--ease-standard)] focus-visible:outline-none",
                      isRunning
                        ? "border-primary/12 bg-primary/10 text-ai-panel-muted"
                        : "border-primary/20 bg-primary/14 text-primary-soft hover:border-primary/28 hover:bg-primary/18",
                    )}
                  >
                    {isRunning ? "Running..." : runDemoLabel}
                  </motion.button>
                </div>
                <motion.div
                  className="mt-4 space-y-2 text-[0.98rem] leading-7 text-ai-panel-muted"
                  initial={{ opacity: 0, y: 16 }}
                  animate={hasEnteredView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                  transition={{ delay: 1.04, duration: 0.56, ease: gentleEase }}
                >
                  {aiShowcaseCopy.promptSupportingLines.map((line) => (
                    <p key={line} className="max-w-[40rem]">
                      {line}
                    </p>
                  ))}
                </motion.div>
              </div>
            }
            promptCard={
              <AiPromptCard
                active={isPromptActive}
                processing={isProcessing}
                statusSlot={
                  phase === "processing" ? (
                    <motion.span
                      className="inline-flex items-center gap-1 rounded-full border border-primary/18 bg-primary/10 px-2.5 py-1 text-[0.72rem] font-medium text-ai-panel-accent"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0.45, 1, 0.7] }}
                      transition={{ duration: 0.56, times: [0, 0.55, 1], ease: gentleEase }}
                    >
                      <span>Processing</span>
                      <span className="inline-flex gap-1">
                        {[0, 1, 2].map((index) => (
                          <motion.span
                            key={index}
                            className="h-1.5 w-1.5 rounded-full bg-ai-panel-accent"
                            initial={{ opacity: 0.28, y: 0 }}
                            animate={{ opacity: [0.28, 1, 0.35], y: [0, -1, 0] }}
                            transition={{
                              duration: 0.36,
                              delay: index * 0.06,
                              repeat: 1,
                              ease: gentleEase,
                            }}
                          />
                        ))}
                      </span>
                    </motion.span>
                  ) : null
                }
              />
            }
            responseCard={
              <AiResponseCard
                active={
                  phase === "responding" ||
                  phase === "complete" ||
                  phase === "action" ||
                  phase === "resting"
                }
                displayedResponse={displayedResponse}
                fullResponseAriaText={aiShowcaseCopy.responseText}
                statusSlot={
                  phase === "processing" ? (
                    <span className="ml-auto rounded-full border border-white/8 px-2.5 py-1 text-[0.72rem] uppercase tracking-[0.16em] text-ai-panel-muted">
                      Preparing
                    </span>
                  ) : phase === "complete" ? (
                    <span className="ml-auto rounded-full border border-primary/16 bg-primary/10 px-2.5 py-1 text-[0.72rem] uppercase tracking-[0.16em] text-ai-panel-accent">
                      Ready
                    </span>
                  ) : phase === "action" ? (
                    <span className="ml-auto rounded-full border border-primary/16 bg-primary/10 px-2.5 py-1 text-[0.72rem] uppercase tracking-[0.16em] text-ai-panel-accent">
                      Action focus
                    </span>
                  ) : null
                }
              />
            }
            actionBar={
              <motion.div
                initial={{ opacity: 0.45, y: 12 }}
                animate={
                  actionsReady
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0.45, y: 12 }
                }
                transition={{ duration: 0.48, ease: gentleEase }}
              >
                <AiActionBar
                  interactive
                  enabled={actionsReady}
                  activeActionId={activeActionId}
                  feedbackLabels={feedbackLabels}
                  onAction={handleAction}
                  disabledActions={{ rerun: isRunning }}
                />
              </motion.div>
            }
          />
        </motion.div>
      )}

      {shouldReduceMotion ? (
        <AiCapabilities />
      ) : (
        <motion.div
          initial="hidden"
          animate={capabilitiesReady ? "visible" : "hidden"}
          variants={capabilityParent}
        >
          <AiCapabilities
            className={cn(
              "transition duration-300 ease-[var(--ease-standard)]",
              capabilitiesReady ? "opacity-100" : "opacity-0",
            )}
            headingSlot={
              <motion.h3
                variants={capabilityChild}
                className="text-[1.35rem] font-medium tracking-[-0.04em] text-foreground sm:text-[1.55rem]"
              >
                {aiShowcaseCopy.capabilitiesHeading}
              </motion.h3>
            }
            itemsSlot={
              <motion.ul
                variants={capabilityParent}
                className="mt-6 grid grid-cols-1 gap-x-8 gap-y-4 md:grid-cols-2 xl:grid-cols-3"
                role="list"
              >
                {aiCapabilities.map(({ label, icon: Icon }) => (
                  <motion.li
                    key={label}
                    variants={capabilityChild}
                    className="flex max-w-none items-start gap-3 border-t border-border/65 pt-4"
                  >
                    <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-[0.95rem] border border-primary/12 bg-primary/[0.045] text-primary">
                      <Icon aria-hidden="true" className="size-4.5" strokeWidth={1.85} />
                    </div>
                    <p className="max-w-none text-[0.98rem] leading-7 text-foreground/86">
                      {label}
                    </p>
                  </motion.li>
                ))}
              </motion.ul>
            }
          />
        </motion.div>
      )}
    </div>
  );
}
