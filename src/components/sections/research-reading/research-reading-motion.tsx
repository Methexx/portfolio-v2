"use client";

import { Highlighter } from "lucide-react";
import {
  motion,
  useInView,
  useReducedMotion,
  type Transition,
  type Variants,
} from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";

import { DeviceSyncRow } from "@/components/sections/research-reading/device-sync-row";
import { ReadingHighlightsPanel } from "@/components/sections/research-reading/reading-highlights-panel";
import {
  deviceSyncItems,
  exportIndicators,
  readingHighlights,
  recentCaptureActivity,
  researchReadingCopy,
  researchReadingFeatures,
  researchSources,
  researchStats,
} from "@/components/sections/research-reading/research-reading-data";
import { ResearchReadingFeatures } from "@/components/sections/research-reading/research-reading-features";
import { ResearchReadingHeader } from "@/components/sections/research-reading/research-reading-header";
import { ResearchReadingVisual } from "@/components/sections/research-reading/research-reading-visual";
import { ResearchSourceCard } from "@/components/sections/research-reading/research-source-card";
import { cn } from "@/lib/cn";
import { gentleEase, standardEase } from "@/lib/motion";

const sectionReveal = {
  amount: 0.22,
  margin: "0px 0px -16% 0px",
  once: true,
} as const;

const desktopTiming = {
  featureDelay: 1.88,
  featureStagger: 0.12,
  headingDelay: 0.12,
  headingStagger: 0.1,
  highlightDelay: 1.34,
  highlightStagger: 0.09,
  labelDelay: 0,
  metaDelay: 1.52,
  metaStagger: 0.08,
  paragraphDelay: 0.42,
  readingDelay: 1.02,
  readingGroupDelay: 1.16,
  readingGroupStagger: 0.08,
  sourceDelay: 0.88,
  sourceHeadingDelay: 0.82,
  sourceStagger: 0.06,
  syncDelay: 1.18,
  syncRowDelay: 1.32,
  syncRowStagger: 0.06,
  visualDelay: 0.58,
} as const;

const mobileTiming = {
  featureDelay: 1.62,
  featureStagger: 0.1,
  headingDelay: 0.1,
  headingStagger: 0.08,
  highlightDelay: 1.1,
  highlightStagger: 0.08,
  labelDelay: 0,
  metaDelay: 1.48,
  metaStagger: 0.06,
  paragraphDelay: 0.36,
  readingDelay: 0.82,
  readingGroupDelay: 0.94,
  readingGroupStagger: 0.06,
  sourceDelay: 1.2,
  sourceHeadingDelay: 1.14,
  sourceStagger: 0.05,
  syncDelay: 1.34,
  syncRowDelay: 1.45,
  syncRowStagger: 0.05,
  visualDelay: 0.52,
} as const;

const visualReveal: Variants = {
  hidden: { opacity: 0, y: 56, scale: 0.986 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 1,
      ease: standardEase,
    },
  },
};

const featureItem: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: gentleEase,
    },
  },
};

export function ResearchReadingMotion() {
  const reducedMotionPreference = useReducedMotion();
  const shouldReduceMotion = Boolean(reducedMotionPreference);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const hasEntered = useInView(sectionRef, sectionReveal);
  const [isMobile, setIsMobile] = useState(false);
  const [allowHover, setAllowHover] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const mobileQuery = window.matchMedia("(max-width: 47.99rem)");
    const hoverQuery = window.matchMedia("(hover: hover) and (pointer: fine)");

    const updateQueries = () => {
      setIsMobile(mobileQuery.matches);
      setAllowHover(hoverQuery.matches);
    };

    updateQueries();
    mobileQuery.addEventListener("change", updateQueries);
    hoverQuery.addEventListener("change", updateQueries);

    return () => {
      mobileQuery.removeEventListener("change", updateQueries);
      hoverQuery.removeEventListener("change", updateQueries);
    };
  }, []);

  const timing = isMobile ? mobileTiming : desktopTiming;
  const sourceTravelX = isMobile ? -10 : -14;
  const sourceTravelY = isMobile ? 6 : 8;
  const bodyTravelY = isMobile ? 7 : 10;
  const rowTravelY = isMobile ? 5 : 7;
  const canHover = allowHover && !shouldReduceMotion;

  const visibleSources = useMemo(
    () =>
      isMobile
        ? researchSources.filter(
            (source) => !("mobileHidden" in source && source.mobileHidden),
          )
        : researchSources,
    [isMobile],
  );

  const visibleHighlights = useMemo(() => readingHighlights.slice(0, 3), []);
  const visibleTags = ["architecture", "research", "highlights"] as const;
  const isActive = shouldReduceMotion || hasEntered;

  const visualTransition: Transition = {
    delay: timing.visualDelay,
    duration: isMobile ? 0.9 : 1.02,
    ease: standardEase,
  };

  return (
    <div ref={sectionRef} className="mx-auto max-w-[84rem]">
      <ResearchReadingHeader
        labelSlot={
          shouldReduceMotion ? (
            <div className="inline-flex items-center gap-2 text-[0.82rem] font-semibold uppercase tracking-[0.22em] text-primary">
              <span aria-hidden="true" className="h-2 w-2 rounded-full bg-primary/80" />
              <span>{researchReadingCopy.label}</span>
            </div>
          ) : (
            <motion.div
              className="inline-flex items-center gap-2 text-[0.82rem] font-semibold uppercase tracking-[0.22em] text-primary"
              initial={{ opacity: 0, y: 10 }}
              animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ delay: timing.labelDelay, duration: 0.54, ease: gentleEase }}
            >
              <span aria-hidden="true" className="h-2 w-2 rounded-full bg-primary/80" />
              <span>{researchReadingCopy.label}</span>
            </motion.div>
          )
        }
        headingSlot={
          shouldReduceMotion ? (
            <h2 className="mt-5 max-w-[14ch] text-[clamp(2.8rem,6vw,4.75rem)] font-medium tracking-[-0.055em] text-foreground">
              {researchReadingCopy.headingLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h2>
          ) : (
            <h2 className="mt-5 max-w-[14ch] text-[clamp(2.8rem,6vw,4.75rem)] font-medium tracking-[-0.055em] text-foreground">
              {researchReadingCopy.headingLines.map((line, index) => (
                <span key={line} className="block overflow-hidden pb-[0.12em]">
                  <motion.span
                    className="block"
                    initial={{ opacity: 0.18, y: "108%" }}
                    animate={isActive ? { opacity: 1, y: "0%" } : { opacity: 0.18, y: "108%" }}
                    transition={{
                      delay: timing.headingDelay + index * timing.headingStagger,
                      duration: isMobile ? 0.78 : 0.9,
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
            <p className="mt-6 max-w-[44rem] text-[1.05rem] leading-8 text-muted sm:text-[1.125rem]">
              {researchReadingCopy.description}
            </p>
          ) : (
            <motion.p
              className="mt-6 max-w-[44rem] text-[1.05rem] leading-8 text-muted sm:text-[1.125rem]"
              initial={{ opacity: 0, y: isMobile ? 10 : 14 }}
              animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: isMobile ? 10 : 14 }}
              transition={{ delay: timing.paragraphDelay, duration: 0.58, ease: gentleEase }}
            >
              {researchReadingCopy.description}
            </motion.p>
          )
        }
      />

      {shouldReduceMotion ? (
        <ResearchReadingVisual
          sourceCardsSlot={
            <div className="space-y-3">
              {visibleSources.map((source) => (
                <ResearchSourceCard key={source.id} source={source} />
              ))}
            </div>
          }
        />
      ) : (
        <motion.div
          initial="hidden"
          animate={isActive ? "visible" : "hidden"}
          variants={visualReveal}
          transition={visualTransition}
        >
          <ResearchReadingVisual
            className="motion-safe:transform-gpu"
            sourceHeadingSlot={
              <motion.div
                initial={{ opacity: 0, x: sourceTravelX / 2, y: sourceTravelY }}
                animate={
                  isActive
                    ? { opacity: 1, x: 0, y: 0 }
                    : { opacity: 0, x: sourceTravelX / 2, y: sourceTravelY }
                }
                transition={{
                  delay: timing.sourceHeadingDelay,
                  duration: 0.5,
                  ease: gentleEase,
                }}
                className="rounded-[1.35rem] border border-research-border bg-research-panel-muted px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.72)]"
              >
                <h3 className="text-[0.82rem] font-semibold uppercase tracking-[0.18em] text-muted">
                  {researchReadingCopy.sourcesHeading}
                </h3>
              </motion.div>
            }
            sourceCardsSlot={
              <div className="space-y-3">
                {visibleSources.map((source, index) => (
                  <motion.div
                    key={source.id}
                    initial={{ opacity: 0, x: sourceTravelX, y: sourceTravelY, scale: 0.992 }}
                    animate={
                      isActive
                        ? { opacity: 1, x: 0, y: 0, scale: 1 }
                        : { opacity: 0, x: sourceTravelX, y: sourceTravelY, scale: 0.992 }
                    }
                    transition={{
                      delay: timing.sourceDelay + index * timing.sourceStagger,
                      duration: isMobile ? 0.42 : 0.5,
                      ease: standardEase,
                    }}
                  >
                    <ResearchSourceCard
                      source={source}
                      className={cn(
                        canHover &&
                          "transition duration-200 ease-[var(--ease-standard)] hover:-translate-y-0.5 hover:border-primary/20",
                      )}
                    />
                  </motion.div>
                ))}
              </div>
            }
            readingPanelSlot={
              <motion.div
                initial={{ opacity: 0.35, y: isMobile ? 18 : 26, scale: 0.992 }}
                animate={
                  isActive
                    ? { opacity: 1, y: 0, scale: 1 }
                    : { opacity: 0.35, y: isMobile ? 18 : 26, scale: 0.992 }
                }
                transition={{
                  delay: timing.readingDelay,
                  duration: isMobile ? 0.72 : 0.82,
                  ease: standardEase,
                }}
              >
                <ReadingHighlightsPanel
                  metadataSlot={
                    <motion.div
                      className="flex flex-wrap items-center gap-3"
                      initial={{ opacity: 0, y: bodyTravelY }}
                      animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: bodyTravelY }}
                      transition={{
                        delay: timing.readingGroupDelay,
                        duration: 0.45,
                        ease: gentleEase,
                      }}
                    >
                      <div className="rounded-full border border-primary/12 bg-primary/[0.05] px-3 py-1 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-primary">
                        {researchReadingCopy.readingSource}
                      </div>
                      <p className="max-w-none text-[0.8rem] font-medium uppercase tracking-[0.08em] text-muted">
                        {researchReadingCopy.readingMeta}
                      </p>
                    </motion.div>
                  }
                  titleSlot={
                    <motion.h3
                      className="mt-5 text-[1.45rem] font-medium tracking-[-0.045em] text-foreground sm:text-[1.7rem]"
                      initial={{ opacity: 0, y: bodyTravelY }}
                      animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: bodyTravelY }}
                      transition={{
                        delay: timing.readingGroupDelay + timing.readingGroupStagger,
                        duration: 0.5,
                        ease: gentleEase,
                      }}
                    >
                      {researchReadingCopy.readingTitle}
                    </motion.h3>
                  }
                  bodySlot={
                    <div className="mt-5 space-y-4 text-[0.98rem] leading-7 text-foreground/82">
                      {researchReadingCopy.readingBody.map((paragraph, index) => (
                        <motion.p
                          key={paragraph}
                          className="max-w-none"
                          initial={{ opacity: 0, y: bodyTravelY }}
                          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: bodyTravelY }}
                          transition={{
                            delay:
                              timing.readingGroupDelay +
                              timing.readingGroupStagger * (index + 2),
                            duration: 0.46,
                            ease: gentleEase,
                          }}
                        >
                          {paragraph}
                        </motion.p>
                      ))}
                    </div>
                  }
                  highlightsSlot={
                    <div className="mt-6 space-y-3">
                      {visibleHighlights.map((highlight, index) => (
                        <motion.div
                          key={highlight.id}
                          className={cn(
                            "rounded-[1.2rem] border border-primary/10 bg-research-highlight px-4 py-3",
                            canHover &&
                              "transition duration-200 ease-[var(--ease-standard)] hover:border-primary/14 hover:bg-primary/[0.1]",
                          )}
                          initial={{ opacity: 0, y: bodyTravelY, backgroundColor: "rgba(157,125,255,0.08)" }}
                          animate={
                            isActive
                              ? { opacity: 1, y: 0, backgroundColor: "rgba(157,125,255,0.14)" }
                              : { opacity: 0, y: bodyTravelY, backgroundColor: "rgba(157,125,255,0.08)" }
                          }
                          transition={{
                            delay: timing.highlightDelay + index * timing.highlightStagger,
                            duration: 0.38,
                            ease: standardEase,
                          }}
                        >
                          <div className="flex gap-3">
                            <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-[0.9rem] border border-primary/12 bg-white/70 text-primary">
                              <Highlighter aria-hidden="true" className="size-4" strokeWidth={1.85} />
                            </div>
                            <div>
                              <p className="max-w-none text-[0.95rem] font-medium leading-6 text-foreground/88">
                                {highlight.excerpt}
                              </p>
                              {highlight.location ? (
                                <p className="mt-2 max-w-none text-[0.74rem] font-semibold uppercase tracking-[0.16em] text-muted">
                                  {highlight.location}
                                </p>
                              ) : null}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  }
                  tagRowSlot={
                    <motion.div
                      className="mt-6 flex flex-wrap gap-2"
                      initial={{ opacity: 0, y: bodyTravelY }}
                      animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: bodyTravelY }}
                      transition={{
                        delay:
                          timing.highlightDelay +
                          visibleHighlights.length * timing.highlightStagger +
                          0.04,
                        duration: 0.42,
                        ease: gentleEase,
                      }}
                    >
                      {visibleTags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-border/80 bg-white/72 px-3 py-1 text-[0.76rem] font-medium text-muted"
                        >
                          {tag}
                        </span>
                      ))}
                    </motion.div>
                  }
                />
              </motion.div>
            }
            syncPanelSlot={
              <motion.div
                className="rounded-[1.5rem] border border-research-border bg-research-panel p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.72)] sm:p-5"
                initial={{ opacity: 0, x: isMobile ? 8 : 16 }}
                animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0, x: isMobile ? 8 : 16 }}
                transition={{
                  delay: timing.syncDelay,
                  duration: 0.6,
                  ease: gentleEase,
                }}
              >
                <h3 className="text-[0.82rem] font-semibold uppercase tracking-[0.18em] text-muted">
                  {researchReadingCopy.syncHeading}
                </h3>
                <div className="mt-4 space-y-3">
                  {deviceSyncItems.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: rowTravelY }}
                      animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: rowTravelY }}
                      transition={{
                        delay: timing.syncRowDelay + index * timing.syncRowStagger,
                        duration: 0.42,
                        ease: gentleEase,
                      }}
                    >
                      <DeviceSyncRow
                        item={item}
                        className={cn(
                          canHover &&
                            "transition duration-200 ease-[var(--ease-standard)] hover:border-primary/18",
                        )}
                        dotClassName="motion-safe:transform-gpu"
                        statusClassName="transition duration-200 ease-[var(--ease-standard)]"
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            }
            statsPanelSlot={
              <motion.div
                className="rounded-[1.5rem] border border-research-border bg-research-panel p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.72)] sm:p-5"
                initial={{ opacity: 0, y: rowTravelY + 4 }}
                animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: rowTravelY + 4 }}
                transition={{
                  delay: timing.metaDelay,
                  duration: 0.48,
                  ease: gentleEase,
                }}
              >
                <div className="grid grid-cols-1 gap-3">
                  {researchStats.map((stat, index) => (
                    <motion.div
                      key={stat.id}
                      className="rounded-[1rem] border border-border/65 bg-white/72 px-3.5 py-3"
                      initial={{ opacity: 0, y: rowTravelY }}
                      animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: rowTravelY }}
                      transition={{
                        delay: timing.metaDelay + 0.06 + index * timing.metaStagger,
                        duration: 0.38,
                        ease: gentleEase,
                      }}
                    >
                      <p className="max-w-none text-[0.82rem] font-semibold uppercase tracking-[0.14em] text-muted">
                        {stat.label}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            }
            recentPanelSlot={
              <motion.div
                className="rounded-[1.5rem] border border-research-border bg-research-panel p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.72)] sm:p-5"
                initial={{ opacity: 0, y: rowTravelY + 4 }}
                animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: rowTravelY + 4 }}
                transition={{
                  delay: timing.metaDelay + 0.12,
                  duration: 0.48,
                  ease: gentleEase,
                }}
              >
                <h3 className="text-[0.82rem] font-semibold uppercase tracking-[0.18em] text-muted">
                  Recent capture activity
                </h3>
                <div className="mt-4 space-y-3">
                  {recentCaptureActivity.map((activity, index) => (
                    <motion.div
                      key={activity.id}
                      className="flex items-center justify-between gap-3 rounded-[1rem] border border-border/65 bg-white/72 px-3.5 py-3"
                      initial={{ opacity: 0, y: rowTravelY }}
                      animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: rowTravelY }}
                      transition={{
                        delay: timing.metaDelay + 0.18 + index * timing.metaStagger,
                        duration: 0.38,
                        ease: gentleEase,
                      }}
                    >
                      <span className="text-[0.92rem] font-medium text-foreground">
                        {activity.label}
                      </span>
                      <span className="text-[0.76rem] font-medium uppercase tracking-[0.12em] text-muted">
                        {activity.time}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            }
            exportPanelSlot={
              <motion.div
                className="rounded-[1.5rem] border border-research-border bg-research-panel p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.72)] sm:p-5"
                initial={{ opacity: 0, y: rowTravelY + 4 }}
                animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: rowTravelY + 4 }}
                transition={{
                  delay: timing.metaDelay + 0.26,
                  duration: 0.48,
                  ease: gentleEase,
                }}
              >
                <h3 className="text-[0.82rem] font-semibold uppercase tracking-[0.18em] text-muted">
                  Export and access
                </h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {exportIndicators.map((item, index) => (
                    <motion.span
                      key={item.id}
                      className="rounded-full border border-primary/14 bg-primary/[0.05] px-3 py-1 text-[0.76rem] font-medium text-primary"
                      initial={{ opacity: 0, y: rowTravelY }}
                      animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: rowTravelY }}
                      transition={{
                        delay: timing.metaDelay + 0.32 + index * 0.05,
                        duration: 0.36,
                        ease: gentleEase,
                      }}
                    >
                      {item.label}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            }
          />
        </motion.div>
      )}

      {shouldReduceMotion ? (
        <ResearchReadingFeatures />
      ) : (
        <ResearchReadingFeatures
          itemsSlot={researchReadingFeatures.map(({ title, description, icon: Icon }, index) => (
            <motion.div
              key={title}
              initial="hidden"
              animate={isActive ? "visible" : "hidden"}
              variants={featureItem}
              transition={{
                delay: timing.featureDelay + index * timing.featureStagger,
                duration: 0.58,
                ease: gentleEase,
              }}
              className="flex gap-4"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[1rem] border border-primary/12 bg-primary/[0.045] text-primary">
                <Icon aria-hidden="true" className="size-5" strokeWidth={1.85} />
              </div>
              <div>
                <h3 className="text-[1.35rem] font-medium tracking-[-0.04em] text-foreground sm:text-[1.5rem]">
                  {title}
                </h3>
                <p className="mt-3 max-w-[30rem] text-[0.98rem] leading-7 text-muted sm:text-[1.02rem]">
                  {description}
                </p>
              </div>
            </motion.div>
          ))}
        />
      )}
    </div>
  );
}
